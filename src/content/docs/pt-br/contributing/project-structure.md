---
title: Estrutura do Projeto
description: Como o código do ThairaAI está organizado.
---

## Estrutura de alto nível

```
ThairaAI/
├── src/
│   ├── process/        # Processo principal (Node.js + Electron, sem DOM)
│   ├── renderer/       # Processo de renderização (React, sem APIs Node.js)
│   └── common/         # Código compartilhado (sem APIs específicas de processo)
├── resources/          # Ícones e assets estáticos
├── scripts/            # Scripts de build e utilitários
├── tests/              # Testes de integração
├── locales/            # Arquivos de tradução i18n
└── docs/               # Documentação de arquitetura e contribuição
```

## Três tipos de processo

O ThairaAI é um app Electron com três ambientes de processo isolados. **Nunca misture suas APIs.**

| Processo   | Caminho                 | APIs disponíveis            |
| ---------- | ----------------------- | --------------------------- |
| Principal  | `src/process/`          | Node.js, Electron — sem DOM |
| Renderer   | `src/renderer/`         | React, DOM — sem Node.js    |
| Worker     | `src/process/worker/`   | Node.js — sem Electron      |

A comunicação entre processos passa pelo bridge IPC em `src/preload.ts`.

## Estrutura do renderer

```
src/renderer/
├── components/     # Componentes de UI compartilhados
├── hooks/          # React hooks
├── pages/          # Componentes de página
├── styles/         # Estilos globais
└── utils/          # Funções utilitárias
```

## Convenções de nomenclatura

| Tipo         | Convenção                  | Exemplo              |
| ------------ | -------------------------- | -------------------- |
| Componentes  | PascalCase                 | `Button.tsx`         |
| Utilitários  | camelCase                  | `formatDate.ts`      |
| Hooks        | camelCase + `use`          | `useTheme.ts`        |
| Constantes   | arquivo camelCase, valores `UPPER_SNAKE_CASE` | `constants.ts` |
| Estilos      | `ComponentName.module.css` |                      |

## Aliases de caminho

| Alias          | Resolve para           |
| -------------- | ---------------------- |
| `@/*`          | `src/*`                |
| `@process/*`   | `src/process/*`        |
| `@renderer/*`  | `src/renderer/*`       |
| `@worker/*`    | `src/process/worker/*` |
