---
title: Canal WhatsApp
description: Converse com seu assistente ThairaAI pelo WhatsApp.
---

import { Aside } from '@astrojs/starlight/components';

O canal WhatsApp permite que usuários enviem mensagens para o ThairaAI pelo WhatsApp e recebam respostas da IA — usando os mesmos backends de IA disponíveis no app desktop.

## Arquitetura

O ThairaAI se conecta ao WhatsApp através de um servidor **whatsapp-api** separado (baseado no [CodeChat](https://github.com/code-chat-br/whatsapp-api) / Baileys). O ThairaAI nunca se conecta diretamente ao WhatsApp.

```
WhatsApp ↔ whatsapp-api (:8084) ↔ ThairaAI (:25809)
```

- **Entrada**: o whatsapp-api encaminha mensagens recebidas ao ThairaAI via webhook
- **Saída**: o ThairaAI chama a API REST do whatsapp-api para enviar respostas

## Pré-requisitos

1. Uma instância do **whatsapp-api** em execução (porta padrão 8084)
2. Uma conta WhatsApp conectada a essa instância
3. O app desktop ThairaAI

## Configuração

Vá em **Configurações → Canais → WhatsApp** e preencha:

| Campo | Descrição | Padrão |
|---|---|---|
| URL do Servidor | URL base do seu servidor whatsapp-api | `http://localhost:8084` |
| Nome da Instância | Nome da instância WhatsApp no whatsapp-api | `thairaai` |
| Chave API Global | `AUTHENTICATION_GLOBAL_AUTH_TOKEN` do `.env` do whatsapp-api | descoberta automática |

<Aside type="tip">
  Se o whatsapp-api estiver em um diretório irmão ao ThairaAI, a chave API é descoberta automaticamente no arquivo `.env` — sem necessidade de configuração manual.
</Aside>

Clique em **Salvar e Ativar**. O ThairaAI irá:
1. Iniciar automaticamente seu servidor HTTP interno (se ainda não estiver rodando para o WebUI)
2. Criar ou retomar a instância no whatsapp-api
3. Registrar a URL do webhook no whatsapp-api automaticamente

## Pareamento de usuários

Usuários do WhatsApp precisam ser aprovados antes que a IA responda.

1. Envie qualquer mensagem para o número do WhatsApp
2. O ThairaAI responde com um código de pareamento de 6 dígitos
3. Abra **Configurações → Canais → WhatsApp → Solicitações Pendentes** no app desktop
4. Clique em **Aprovar**

Após aprovação, todas as mensagens desse número recebem respostas da IA.

## Comportamento das conversas

- **Respostas**: o ThairaAI envia respostas como novas mensagens no WhatsApp (o WhatsApp não suporta edição de mensagens)
- **Indicador de processamento**: uma mensagem `⏳ Thinking...` é enviada enquanto a IA processa; a resposta final chega como uma mensagem separada
- **Histórico**: o contexto da conversa é preservado durante a sessão. Se o ThairaAI reiniciar ou a sessão ficar inativa por mais de 5 minutos, as mensagens anteriores são injetadas automaticamente como contexto na próxima requisição
- **Somente texto**: o WhatsApp exibe apenas texto simples — formatação HTML é removida automaticamente

## Selecionando o backend de IA

Em **Configurações → Canais → WhatsApp**, escolha o agente de IA e o modelo usado nas conversas do WhatsApp. Essa configuração é independente do chat no app desktop.

## Desativando

Desative o canal nas Configurações. O ThairaAI irá cancelar o registro do webhook no whatsapp-api automaticamente.

---

Para detalhes de implementação interna, consulte [Arquitetura do Canal WhatsApp](/pt-br/architecture/whatsapp).
