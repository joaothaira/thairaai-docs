---
title: Arquitetura do Canal WhatsApp
description: Design interno da integração WhatsApp para contribuidores.
---

Esta página cobre o design interno da integração WhatsApp para contribuidores.

## Fluxo de mensagens

```
Usuário envia mensagem no WhatsApp
  → whatsapp-api armazena no Postgres, dispara POST /channels/whatsapp/webhook
  → whatsappWebhookHandler (Express) responde 200 imediatamente
  → WhatsAppPlugin.handleInboundWebhook()
      → WhatsAppAdapter.toUnifiedIncomingMessage() → IUnifiedIncomingMessage
      → messageHandler() (definido pelo ChannelManager)
  → ActionExecutor.handleIncomingMessage()
      → verificação de pareamento (PairingService)
      → ActionExecutor.handleChatMessage()
          → sendMessage("⏳ Thinking...")         # placeholder enviado ao WhatsApp
          → ChannelMessageService.sendMessage()
              → injeção de histórico se tarefa for nova
              → workerTaskManager.getOrBuildTask()  # inicia Claude Code (ACP)
              → callback de stream ACP por chunk
                  → editMessage() → WhatsApp descarta chunks intermediários
          → editMessage final ({ replyMarkup: __aionuiFinal })
              → WhatsAppPlugin.editMessage()        # replyMarkup verdadeiro → envia
              → WhatsAppPlugin.sendMessage()        # HTTP POST para o whatsapp-api
  → whatsapp-api entrega a resposta ao usuário
```

## Arquivos fonte

**Novos arquivos:**

| Arquivo | Papel |
|---|---|
| `src/process/channels/plugins/whatsapp/WhatsAppAdapter.ts` | Conversão pura: mapeia uma linha `Message` do whatsapp-api para `IUnifiedIncomingMessage`. Filtra mensagens de eco (`fromMe`) e eventos de sincronização histórica (`info.type !== 'notify'`). |
| `src/process/channels/plugins/whatsapp/WhatsAppPlugin.ts` | Plugin principal. Estende `BasePlugin`. Gerencia JWT, registro de webhook, envio/recebimento e rastreamento de estado. |
| `src/process/channels/plugins/whatsapp/index.ts` | Re-exporta plugin + acessores singleton. |
| `src/process/webserver/routes/whatsappChannelRoutes.ts` | Rota Express para `POST /channels/whatsapp/webhook`. Responde 200 imediatamente (o whatsapp-api não tenta novamente), depois despacha para o singleton do plugin ativo. |

**Arquivos modificados:**

| Arquivo | Mudança |
|---|---|
| `src/process/channels/types.ts` | Adicionado `'whatsapp'` a `BuiltinPluginType`, `isBuiltinChannelPlatform`, `hasPluginCredentials` e `getChannelConversationName`. |
| `src/process/channels/core/ChannelManager.ts` | Plugin registrado; adicionado a `builtinStartableTypes`; extração de credenciais; resolução de nome/ID. |
| `src/process/webserver/routes/apiRoutes.ts` | Chama `registerWhatsAppChannelRoutes(app)`. |
| `src/process/webserver/setup.ts` | Adicionado `/channels/whatsapp/webhook` à lista de exclusão CSRF. |
| `src/process/channels/gateway/ActionExecutor.ts` | Correções em `finalReplyMarkup` e `lastMessageContent` (veja abaixo). |
| `src/process/channels/agent/ChannelMessageService.ts` | Injeção de histórico + correção de `yoloMode`. |

## Decisões de design

### Auto-inicialização do servidor HTTP

O servidor Express do ThairaAI só inicia quando o usuário ativa a funcionalidade Desktop WebUI. Sem ela, os POSTs de webhook do whatsapp-api receberiam "connection refused".

`WhatsAppPlugin.onStart()` chama `ensureWebServerRunning()` antes de registrar o webhook. Isso inicia automaticamente o servidor HTTP pelo mesmo caminho de código do WebUI — sem ação do usuário:

```ts
private async ensureWebServerRunning(): Promise<void> {
  if (getWebServerInstance()) return;
  const instance = await startWebServerWithInstance(SERVER_CONFIG.DEFAULT_PORT, false);
  setWebServerInstance(instance);
}
```

### JWT e ciclo de vida da instância

O whatsapp-api retorna um JWT ao criar uma instância. Se ela já existe, a API retorna HTTP 400/403. `fetchOrCreateJwt()` lida com ambos os casos: em conflito, cai para `GET /instance/fetchInstances` para recuperar o JWT existente. O ThairaAI pode reiniciar livremente sem perder a sessão do whatsapp-api.

### `editMessage` envia em vez de editar

Todos os plugins de canal implementam `editMessage` para plataformas que suportam atualização de mensagens no lugar (ex: Telegram). O WhatsApp não tem API de edição.

`WhatsAppPlugin.editMessage` ignora todas as chamadas exceto quando `message.replyMarkup` está definido. O `replyMarkup` é o sinal de "stream completo" definido apenas na mensagem final pelo `ActionExecutor`. Chunks intermediários do stream são descartados silenciosamente; somente a resposta final da IA é entregue.

Para isso funcionar, `ActionExecutor` precisa definir `replyMarkup` na mensagem final. O código original fazia isso apenas para o WecomPlugin — `'whatsapp'` foi adicionado ao mesmo guard:

```ts
const finalReplyMarkup =
  responseMarkup ??
  (context.platform === 'wecom' || context.platform === 'whatsapp'
    ? ({ __aionuiFinal: true } as unknown)
    : undefined);
```

### Supressão de mensagens de status intermediárias

O motor de streaming chama `context.sendMessage` (não `editMessage`) para eventos `agent_status` como `⏳ claude`, que sinalizam qual backend de IA iniciou. Esses eventos apareceriam como mensagens separadas no WhatsApp.

`WhatsAppPlugin` rastreia um conjunto por chat (`thinkingChats`) para saber quando `⏳ Thinking...` foi enviado mas a resposta final ainda não chegou. Qualquer mensagem adicional com prefixo `⏳` nessa janela é suprimida:

```ts
if (isStatusMsg && this.thinkingChats.has(chatId)) {
  return `whatsapp-suppressed-${Date.now()}`;
}
```

### Guard de tipo em `lastMessageContent`

O evento `agent_status` pode chegar *após* a resposta de texto no stream ACP. O `ActionExecutor` rastreava todo evento de stream como o "último conteúdo de mensagem", então a chamada final de `editMessage` podia receber `{ text: '⏳ claude' }` em vez da resposta real da IA — que era então suprimida, resultando em nenhuma entrega.

Corrigido atualizando `lastMessageContent` apenas para `message.type === 'text'`:

```ts
if (message.type === 'text') {
  lastMessageContent = streamOutgoing;
}
```

### Injeção de histórico de conversa

As sessões de IA do ThairaAI vivem em memória. Após reinicialização ou 5 minutos de inatividade, a tarefa ACP em memória é removida. A próxima mensagem iniciaria um novo processo Claude Code sem contexto.

`ChannelMessageService.sendMessage` detecta uma tarefa nova (`workerTaskManager.getTask()` retornando undefined antes de `getOrBuildTask`) e consulta a tabela `messages` do SQLite próprio do ThairaAI para as últimas 30 trocas armazenadas. Essas são adicionadas como prefixo de contexto à mensagem do usuário:

```
[Previous conversation:
User: Olá, tudo bem?
Assistant: Tudo certo! O que precisa?
]

<mensagem atual>
```

Apenas mensagens `type === 'text'` são incluídas; placeholders `⏳` são filtrados. O histórico vem do SQLite interno do ThairaAI — sem dependência do Postgres do whatsapp-api.

### `yoloMode` para WhatsApp

`'whatsapp'` estava ausente da verificação `isFromChannel` no `ChannelMessageService`, fazendo o Claude Code aguardar aprovação manual de permissões na UI em vez de aprovar automaticamente. Adicionado ao lado de Telegram, Lark, DingTalk, WeChat e WeCom.
