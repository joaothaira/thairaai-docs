---
title: Google Integration Overview
description: How ThairaAI connects to Gmail and Google Calendar.
---

ThairaAI integrates with Google services so the AI agent can read your emails, check your calendar, and take actions on your behalf.

## What's supported

| Service         | Capabilities                                              |
| --------------- | --------------------------------------------------------- |
| Gmail           | Read emails, search inbox, summarize threads, draft replies |
| Google Calendar | View events, check availability, create and update events |

## How it works

Authentication uses Google OAuth 2.0. When you sign in with Google:

1. You authorize ThairaAI to access your Gmail and Calendar scopes
2. ThairaAI receives an access token — stored locally, never sent to any server
3. The built-in agent can then call Gmail and Calendar APIs on your behalf

All data stays on your machine. ThairaAI does not have a backend that stores your Google data.

## Two ways to authenticate

### Signed-in users (pre-built app)

Download ThairaAI from Releases and click **Sign in with Google**. The OAuth credentials are bundled in the app.

### Developers (building from source)

You need to provide your own Google OAuth credentials via `.env`. See [OAuth Setup](/google/oauth-setup/).
