---
title: Gmail
description: Using ThairaAI with Gmail.
---

Once connected, the AI agent can read and search your Gmail inbox as part of any conversation.

## What you can ask

```
Summarize my unread emails from today
```
```
Find emails from Stripe in the last 7 days
```
```
What did João say in his last email?
```
```
Draft a reply to the email about the project deadline
```

## Permissions

ThairaAI requests the following Gmail scopes:

| Scope                | Purpose                        |
| -------------------- | ------------------------------ |
| `gmail.readonly`     | Read and search emails         |
| `gmail.compose`      | Draft and send replies         |

You can revoke access at any time from [Google Account Permissions](https://myaccount.google.com/permissions).

## Privacy

Emails are fetched on demand when the agent needs them for a task. Nothing is stored remotely — all data stays in your local SQLite database.
