---
title: WhatsApp Channel
description: Chat with your ThairaAI assistant via WhatsApp.
---

import { Aside } from '@astrojs/starlight/components';

The WhatsApp channel lets users send messages to ThairaAI through WhatsApp and receive AI replies back — using the same AI backends available in the desktop app.

## Architecture

ThairaAI connects to WhatsApp through a separate **whatsapp-api** server (based on [CodeChat](https://github.com/code-chat-br/whatsapp-api) / Baileys). ThairaAI never connects to WhatsApp directly.

```
WhatsApp ↔ whatsapp-api (:8084) ↔ ThairaAI (:25809)
```

- **Inbound**: whatsapp-api forwards received messages to ThairaAI via webhook
- **Outbound**: ThairaAI calls whatsapp-api's REST API to send replies

## Prerequisites

1. A running **whatsapp-api** instance (default port 8084)
2. A WhatsApp account connected to that instance
3. ThairaAI desktop app

## Configuration

Go to **Settings → Channels → WhatsApp** and fill in:

| Field | Description | Default |
|---|---|---|
| Server URL | Base URL of your whatsapp-api server | `http://localhost:8084` |
| Instance Name | Name of the WhatsApp instance in whatsapp-api | `thairaai` |
| Global API Key | `AUTHENTICATION_GLOBAL_AUTH_TOKEN` from whatsapp-api's `.env` | auto-discovered |

<Aside type="tip">
  If whatsapp-api lives in a sibling directory to ThairaAI, the API key is discovered automatically from its `.env` file — no manual entry needed.
</Aside>

Click **Save & Enable**. ThairaAI will:
1. Auto-start its internal HTTP server (if not already running for WebUI)
2. Create or resume the whatsapp-api instance
3. Register the webhook URL with whatsapp-api automatically

## User pairing

WhatsApp users must be approved before the AI responds to them.

1. Send any message to the WhatsApp number
2. ThairaAI replies with a 6-digit pairing code
3. Open **Settings → Channels → WhatsApp → Pending Pairings** in the desktop app
4. Click **Approve**

After approval, all messages from that number receive AI replies.

## Conversation behavior

- **Replies**: ThairaAI sends AI replies as new WhatsApp messages (WhatsApp does not support message editing)
- **Thinking indicator**: A `⏳ Thinking...` message is sent while the AI processes; the final reply follows as a separate message
- **History**: Conversation context is preserved within a session. If ThairaAI restarts or the session is idle for more than 5 minutes, the previous messages are automatically injected as context into the next request
- **Plain text only**: WhatsApp renders plain text — HTML formatting is stripped automatically

## Selecting an AI backend

In **Settings → Channels → WhatsApp**, choose the AI agent and model used for WhatsApp conversations. This is independent of your desktop chat configuration.

## Disabling

Toggle the channel off in Settings. ThairaAI will deregister the webhook from whatsapp-api automatically.

---

For internal implementation details, see [WhatsApp Channel Architecture](/en/architecture/whatsapp).
