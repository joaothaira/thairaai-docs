---
title: Project Structure
description: How the ThairaAI codebase is organized.
---

## Top-level layout

```
ThairaAI/
├── src/
│   ├── process/        # Main process (Node.js + Electron, no DOM)
│   ├── renderer/       # Renderer process (React, no Node.js APIs)
│   └── common/         # Shared code (no process-specific APIs)
├── resources/          # App icons and static assets
├── scripts/            # Build and utility scripts
├── tests/              # Integration tests
├── locales/            # i18n translation files
└── docs/               # Architecture and contributing docs
```

## Three process types

ThairaAI is an Electron app with three isolated process environments. **Never mix their APIs.**

| Process    | Path                    | APIs available           |
| ---------- | ----------------------- | ------------------------ |
| Main       | `src/process/`          | Node.js, Electron — no DOM |
| Renderer   | `src/renderer/`         | React, DOM — no Node.js  |
| Worker     | `src/process/worker/`   | Node.js — no Electron    |

Cross-process communication goes through the IPC bridge in `src/preload.ts`.

## Renderer structure

```
src/renderer/
├── components/     # Shared UI components
├── hooks/          # React hooks
├── pages/          # Page-level components
├── styles/         # Global styles
└── utils/          # Utility functions
```

## Naming conventions

| Type         | Convention            | Example              |
| ------------ | --------------------- | -------------------- |
| Components   | PascalCase            | `Button.tsx`         |
| Utilities    | camelCase             | `formatDate.ts`      |
| Hooks        | camelCase + `use`     | `useTheme.ts`        |
| Constants    | camelCase file, `UPPER_SNAKE_CASE` values | `constants.ts` |
| Styles       | `ComponentName.module.css` |               |

## Path aliases

| Alias          | Resolves to         |
| -------------- | ------------------- |
| `@/*`          | `src/*`             |
| `@process/*`   | `src/process/*`     |
| `@renderer/*`  | `src/renderer/*`    |
| `@worker/*`    | `src/process/worker/*` |
