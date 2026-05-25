---
title: Configuração OAuth
description: Configure as credenciais OAuth do Google para desenvolvimento local.
---

import { Steps, Aside } from '@astrojs/starlight/components';

Se você está compilando o ThairaAI a partir do código fonte, precisa das suas próprias credenciais OAuth do Google. As credenciais das versões publicadas não estão disponíveis no repositório open source.

<Aside type="note">
  Isso só é necessário ao rodar a partir do código fonte. As versões baixadas já incluem as credenciais.
</Aside>

## Criar credenciais OAuth

<Steps>

1. **Abra o Google Cloud Console**

   Acesse [console.cloud.google.com](https://console.cloud.google.com) e crie um novo projeto (ou selecione um existente).

2. **Ative as APIs**

   Vá em **APIs e Serviços → Biblioteca** e ative:
   - API do Gmail
   - API do Google Agenda

3. **Configure a tela de consentimento OAuth**

   Vá em **APIs e Serviços → Tela de consentimento OAuth**.
   - Tipo de usuário: **Externo**
   - Preencha o nome do app, e-mail de suporte e contato do desenvolvedor
   - Adicione escopos: `gmail.readonly`, `calendar.readonly`, `calendar.events`
   - Adicione sua conta Google como usuário de teste

4. **Crie as credenciais**

   Vá em **APIs e Serviços → Credenciais → Criar Credenciais → ID do cliente OAuth 2.0**.
   - Tipo de aplicativo: **App para computador**
   - Nome: qualquer coisa (ex: `ThairaAI Dev`)
   - Clique em **Criar**

5. **Copie as credenciais**

   Copie o **ID do cliente** e o **Segredo do cliente** da janela que aparecer.

</Steps>

## Adicionar ao ambiente

```bash
cp .env.example .env
```

Edite o `.env`:

```ini
GOOGLE_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu-client-secret
```

Em seguida inicie o app:

```bash
bun run start
```

<Aside type="caution">
  Nunca faça commit do `.env`. Ele está listado no `.gitignore` e o hook de pré-commit irá bloqueá-lo, mas verifique antes de fazer push.
</Aside>
