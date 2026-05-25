---
title: Acesso Remoto (WebUI)
description: Acesse o ThairaAI por qualquer navegador ou celular.
---

import { Aside } from '@astrojs/starlight/components';

O modo WebUI roda o ThairaAI como um servidor HTTP local para que você possa usá-lo de qualquer dispositivo na sua rede — celular, tablet ou outro computador.

## Ativar WebUI

Vá em **Configurações → WebUI** e ative o WebUI. O ThairaAI exibirá:

- Uma URL local (ex: `http://192.168.1.10:3000`)
- Um QR code para escanear pelo celular

## Métodos de acesso

| Método         | Uso                                          |
| -------------- | -------------------------------------------- |
| URL local      | Mesma rede (casa, escritório)                |
| QR code        | Acesso rápido pelo celular na mesma rede     |
| Túnel (ngrok)  | Acesso de qualquer lugar pela internet       |

## Bots em plataformas de chat

Você também pode acessar o ThairaAI por apps de mensagens configurando um token de bot em **Configurações → WebUI → Canais**:

- Telegram
- Lark (Feishu)
- DingTalk
- WeChat
- WeCom (WeChat Empresarial)
- WhatsApp
- Slack (em breve)

<Aside type="note">
  Cada canal requer um token de bot da plataforma correspondente. As instruções de configuração estão no diálogo de configuração do canal dentro do app.
</Aside>

## Segurança

O WebUI usa autenticação por senha por padrão. Defina uma senha em **Configurações → WebUI → Senha** antes de expô-lo fora da sua rede local.
