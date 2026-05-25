---
title: Development Setup
description: How to set up ThairaAI for local development.
---

import { Steps, Aside } from '@astrojs/starlight/components';

## Prerequisites

- [Bun](https://bun.sh) 1.0+
- Node.js 18+
- Git
- A Google Cloud project with OAuth credentials (for Google integration)

## Setup

<Steps>

1. **Clone the repo**

   ```bash
   git clone https://github.com/joaothaira/ThairaAI.git
   cd ThairaAI
   ```

2. **Configure environment**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your Google OAuth credentials. See [OAuth Setup](/google/oauth-setup/) for how to get them.

3. **Install dependencies**

   ```bash
   bun install
   ```

4. **Start the dev server**

   ```bash
   bun run start
   ```

</Steps>

## Available scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `bun run start`     | Start in dev mode                    |
| `bun run test`      | Run unit tests (Vitest)              |
| `bun run lint:fix`  | Auto-fix lint issues                 |
| `bun run format`    | Auto-format source files             |
| `bun run dist:mac`  | Build macOS release                  |
| `bun run dist:win`  | Build Windows release                |
| `bun run dist:linux`| Build Linux release                  |

## Pre-commit hook

The repo includes a pre-commit hook that blocks commits containing sensitive patterns (API keys, OAuth secrets, private keys). It runs automatically with every `git commit`.

If you hit a false positive: `git commit --no-verify`.

## Testing

```bash
bun run test
```

Coverage target is ≥ 80%. Run tests before every PR.

<Aside type="note">
  The project uses three separate process types — main process (`src/process/`), renderer (`src/renderer/`), and workers (`src/process/worker/`). Never mix their APIs. Cross-process communication must go through the IPC bridge.
</Aside>
