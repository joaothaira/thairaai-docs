---
title: WhatsApp Channel Architecture
description: Internal design of the WhatsApp integration for contributors.
---

This page covers the internal design of the WhatsApp integration for contributors.

## Message flow

```
User sends WhatsApp message
  → whatsapp-api stores in Postgres, fires POST /channels/whatsapp/webhook
  → whatsappWebhookHandler (Express) responds 200 immediately
  → WhatsAppPlugin.handleInboundWebhook()
      → WhatsAppAdapter.toUnifiedIncomingMessage() → IUnifiedIncomingMessage
      → messageHandler() (set by ChannelManager)
  → ActionExecutor.handleIncomingMessage()
      → pairing check (PairingService)
      → ActionExecutor.handleChatMessage()
          → sendMessage("⏳ Thinking...")         # placeholder sent to WhatsApp
          → ChannelMessageService.sendMessage()
              → history injection if task is fresh
              → workerTaskManager.getOrBuildTask()  # starts Claude Code (ACP)
              → ACP stream callback per chunk
                  → editMessage() → WhatsApp drops streaming chunks
          → final editMessage({ replyMarkup: __aionuiFinal })
              → WhatsAppPlugin.editMessage()        # replyMarkup truthy → sends
              → WhatsAppPlugin.sendMessage()        # HTTP POST to whatsapp-api
  → whatsapp-api delivers reply to user
```

## Source files

**New files:**

| File | Role |
|---|---|
| `src/process/channels/plugins/whatsapp/WhatsAppAdapter.ts` | Pure conversion: maps a raw whatsapp-api `Message` row to `IUnifiedIncomingMessage`. Filters outgoing echoes (`fromMe`) and historical sync events (`info.type !== 'notify'`). |
| `src/process/channels/plugins/whatsapp/WhatsAppPlugin.ts` | Main plugin. Extends `BasePlugin`. JWT management, webhook registration, send/receive, active-user and thinking-state tracking. |
| `src/process/channels/plugins/whatsapp/index.ts` | Re-exports plugin + singleton accessors. |
| `src/process/webserver/routes/whatsappChannelRoutes.ts` | Express route for `POST /channels/whatsapp/webhook`. Responds 200 immediately (whatsapp-api does not retry), then dispatches to the active plugin singleton. |

**Modified files:**

| File | Change |
|---|---|
| `src/process/channels/types.ts` | Added `'whatsapp'` to `BuiltinPluginType`, `isBuiltinChannelPlatform`, `hasPluginCredentials`, and `getChannelConversationName`. |
| `src/process/channels/core/ChannelManager.ts` | Registered plugin; added to `builtinStartableTypes`; credential extraction; name/ID resolution. |
| `src/process/webserver/routes/apiRoutes.ts` | Calls `registerWhatsAppChannelRoutes(app)`. |
| `src/process/webserver/setup.ts` | Added `/channels/whatsapp/webhook` to CSRF exclusion list. |
| `src/process/channels/gateway/ActionExecutor.ts` | `finalReplyMarkup` and `lastMessageContent` fixes (see below). |
| `src/process/channels/agent/ChannelMessageService.ts` | History injection + `yoloMode` fix. |

## Design decisions

### Auto-starting the HTTP server

ThairaAI's Express server only starts when the user enables the Desktop WebUI feature. Without it, whatsapp-api webhook POSTs would get connection refused.

`WhatsAppPlugin.onStart()` calls `ensureWebServerRunning()` before registering the webhook. This auto-starts the HTTP server through the same code path as the WebUI feature — no user action required:

```ts
private async ensureWebServerRunning(): Promise<void> {
  if (getWebServerInstance()) return;
  const instance = await startWebServerWithInstance(SERVER_CONFIG.DEFAULT_PORT, false);
  setWebServerInstance(instance);
}
```

### JWT and instance lifecycle

whatsapp-api returns a JWT when creating an instance. If the instance already exists, the API returns HTTP 400/403. `fetchOrCreateJwt()` handles both cases: on conflict it falls back to `GET /instance/fetchInstances` to retrieve the existing JWT. ThairaAI can restart freely without losing the whatsapp-api session.

### `editMessage` sends instead of editing

All channel plugins implement `editMessage` for platforms that support in-place message updates (e.g., Telegram). WhatsApp has no edit API.

`WhatsAppPlugin.editMessage` ignores all calls unless `message.replyMarkup` is set. `replyMarkup` is the "stream complete" signal set only on the final message by `ActionExecutor`. Intermediate streaming chunks are silently dropped; only the final AI reply is delivered.

For this to fire, `ActionExecutor` must set `replyMarkup` on the final message. The original code only did this for WecomPlugin — `'whatsapp'` was added to the same guard:

```ts
const finalReplyMarkup =
  responseMarkup ??
  (context.platform === 'wecom' || context.platform === 'whatsapp'
    ? ({ __aionuiFinal: true } as unknown)
    : undefined);
```

### Suppressing intermediate status messages

The streaming engine calls `context.sendMessage` (not `editMessage`) for `agent_status` events like `⏳ claude` that signal which AI backend started. These would appear as separate WhatsApp messages.

`WhatsAppPlugin` tracks a per-chat set (`thinkingChats`) to know when `⏳ Thinking...` was sent but the final reply has not yet arrived. Any additional `⏳`-prefixed message during that window is suppressed:

```ts
if (isStatusMsg && this.thinkingChats.has(chatId)) {
  return `whatsapp-suppressed-${Date.now()}`;
}
```

### `lastMessageContent` type guard

The `agent_status` event can arrive *after* the text response in the ACP stream. `ActionExecutor` was tracking every stream event as the "last message content", so the final `editMessage` call could receive `{ text: '⏳ claude' }` instead of the real AI answer — which was then suppressed, resulting in no delivery.

Fixed by only updating `lastMessageContent` for `message.type === 'text'`:

```ts
if (message.type === 'text') {
  lastMessageContent = streamOutgoing;
}
```

### Conversation history injection

ThairaAI's AI sessions live in memory. After a restart or a 5-minute idle timeout, the in-memory ACP task is evicted. The next message would start a fresh Claude Code process with no context.

`ChannelMessageService.sendMessage` detects a fresh task (`workerTaskManager.getTask()` returning undefined before `getOrBuildTask` is called) and queries ThairaAI's own SQLite `messages` table for the last 30 stored turns. These are prepended to the user's message as a context block:

```
[Previous conversation:
User: Hello, how are you?
Assistant: All good! What do you need?
]

<current message>
```

Only `type === 'text'` messages are included; `⏳` placeholder messages are filtered out. History is sourced from ThairaAI's internal SQLite DB — no dependency on whatsapp-api's Postgres.

### `yoloMode` for WhatsApp

`'whatsapp'` was missing from the `isFromChannel` check in `ChannelMessageService`, causing Claude Code to wait for manual UI permission approval instead of auto-approving. Added alongside Telegram, Lark, DingTalk, WeChat, and WeCom.
