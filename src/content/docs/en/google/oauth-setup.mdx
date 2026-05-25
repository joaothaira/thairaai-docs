---
title: OAuth Setup
description: Configure Google OAuth credentials for local development.
---

import { Steps, Aside } from '@astrojs/starlight/components';

If you are building ThairaAI from source, you need your own Google OAuth credentials. The credentials bundled in the release builds are not available in the open-source repo.

<Aside type="note">
  This is only required when running from source. Downloaded releases include credentials.
</Aside>

## Create OAuth credentials

<Steps>

1. **Open Google Cloud Console**

   Go to [console.cloud.google.com](https://console.cloud.google.com) and create a new project (or select an existing one).

2. **Enable APIs**

   Navigate to **APIs & Services → Library** and enable:
   - Gmail API
   - Google Calendar API

3. **Configure the OAuth consent screen**

   Go to **APIs & Services → OAuth consent screen**.
   - User Type: **External**
   - Fill in the app name, support email, and developer contact
   - Add scopes: `gmail.readonly`, `calendar.readonly`, `calendar.events`
   - Add your Google account as a test user

4. **Create credentials**

   Go to **APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID**.
   - Application type: **Desktop app**
   - Name: anything (e.g. `ThairaAI Dev`)
   - Click **Create**

5. **Copy the credentials**

   Copy the **Client ID** and **Client Secret** from the dialog.

</Steps>

## Add to your environment

```bash
cp .env.example .env
```

Edit `.env`:

```ini
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

Then start the app:

```bash
bun run start
```

<Aside type="caution">
  Never commit `.env` to git. It is listed in `.gitignore` and the pre-commit hook will block it, but double-check before pushing.
</Aside>
