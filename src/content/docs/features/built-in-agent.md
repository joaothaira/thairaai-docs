---
title: Built-in Agent
description: The built-in AI agent that ships with ThairaAI.
---

ThairaAI ships with a complete AI agent engine. You do not need to install Claude Code, Gemini CLI, or any other CLI tool to get started.

## Capabilities

| Capability        | Details                                              |
| ----------------- | ---------------------------------------------------- |
| File read/write   | Read, create, edit, and delete files on your machine |
| Web search        | Search the web and retrieve page content             |
| Image generation  | Generate images via Gemini                           |
| MCP tools         | Use any Model Context Protocol server                |
| Code execution    | Run scripts and commands                             |
| Document output   | Generate PPT, Word, and Excel via built-in skills    |

## How to use it

Just type in the chat. The agent decides which tools to use based on your message.

```
Read the CSV file in my Downloads folder and give me a summary
```
```
Search the web for the latest Claude API pricing
```
```
Create a Word document with a project proposal for a mobile app
```

## Assistants

The agent can run in different modes via **Assistants** — pre-configured personas optimized for specific tasks:

- **Cowork** — general autonomous task execution
- **PPT Creator** — presentation generation with Morph animations
- **Word Creator** — structured document writing
- **Excel Creator** — spreadsheet generation and analysis
- **Academic Paper Writer** — research paper structure and writing
- **UI/UX Pro Max** — interface design in 57 styles

Switch assistants from the assistant selector in the chat header.

## MCP tools

ThairaAI supports Model Context Protocol. Add any MCP server in **Settings → Tools → MCP** and it becomes available to the agent automatically. One configuration applies to all agents.
