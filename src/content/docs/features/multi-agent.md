---
title: Multi-Agent Mode
description: Use multiple AI agents through one unified interface.
---

If you already have CLI agents installed, ThairaAI auto-detects them and lets you use all of them through the same interface — alongside the built-in agent.

## Supported agents

- Built-in Agent (zero setup)
- Claude Code
- Codex (OpenAI)
- Gemini CLI
- Qwen Code
- Hermes Agent
- Goose AI
- Kiro
- Cursor Agent
- Snow CLI
- And more — any agent with MCP stdio support is auto-detected

## How it works

ThairaAI scans your `PATH` for known CLI agents on startup. Detected agents appear in **Settings → Agents**.

Each agent runs in its own independent session with its own context, permission dialog, and sidebar indicator.

## Team Mode

Team Mode lets multiple agents work together on a single task:

- A **Leader** agent receives your instructions and breaks them into subtasks
- **Teammate** agents execute subtasks in parallel
- Results flow back to the Leader through a shared async mailbox
- All agents share the same workspace folder

Enable Team Mode from the chat header agent selector.

## YOLO / Full-Auto Mode

By default, each agent action requires your approval. Enable **YOLO Mode** to auto-approve all actions for a session — useful for long-running unattended tasks.

Toggle it per-conversation in the chat settings.
