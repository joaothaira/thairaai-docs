---
title: Configuração de Desenvolvimento
description: Como configurar o ThairaAI para desenvolvimento local.
---

import { Steps, Aside } from '@astrojs/starlight/components';

## Pré-requisitos

- [Bun](https://bun.sh) 1.0+
- Node.js 18+
- Git
- Um projeto Google Cloud com credenciais OAuth (para integração com Google)

## Configuração

<Steps>

1. **Clone o repositório**

   ```bash
   git clone https://github.com/joaothaira/ThairaAI.git
   cd ThairaAI
   ```

2. **Configure o ambiente**

   ```bash
   cp .env.example .env
   ```

   Edite o `.env` com suas credenciais OAuth do Google. Veja [Configuração OAuth](/pt-br/google/oauth-setup/) para saber como obtê-las.

3. **Instale as dependências**

   ```bash
   bun install
   ```

4. **Inicie o servidor de desenvolvimento**

   ```bash
   bun run start
   ```

</Steps>

## Scripts disponíveis

| Script               | Descrição                             |
| -------------------- | ------------------------------------- |
| `bun run start`      | Iniciar em modo desenvolvimento       |
| `bun run test`       | Rodar testes unitários (Vitest)       |
| `bun run lint:fix`   | Corrigir problemas de lint            |
| `bun run format`     | Formatar arquivos fonte               |
| `bun run dist:mac`   | Build para macOS                      |
| `bun run dist:win`   | Build para Windows                    |
| `bun run dist:linux` | Build para Linux                      |

## Hook de pré-commit

O repositório inclui um hook de pré-commit que bloqueia commits com padrões sensíveis (chaves de API, segredos OAuth, chaves privadas). Ele roda automaticamente a cada `git commit`.

Se você tiver um falso positivo: `git commit --no-verify`.

## Testes

```bash
bun run test
```

A meta de cobertura é ≥ 80%. Rode os testes antes de cada PR.

<Aside type="note">
  O projeto usa três tipos de processo separados — processo principal (`src/process/`), renderer (`src/renderer/`) e workers (`src/process/worker/`). Nunca misture suas APIs. A comunicação entre processos deve passar pelo bridge IPC.
</Aside>
