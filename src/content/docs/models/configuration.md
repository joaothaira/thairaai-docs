---
title: Model Configuration
description: How to configure AI models in ThairaAI.
---

import { Steps } from '@astrojs/starlight/components';

## Add a model

<Steps>

1. Open **Settings → Models**
2. Click **Add Platform**
3. Select your provider from the list
4. Paste your API key
5. Click **Save**

</Steps>

The model is now available in the model selector in the chat header.

## Switch models mid-conversation

Click the model name in the chat header to open the model selector. Switching models mid-conversation is safe — the context carries over.

## Per-conversation model

Each conversation can use a different model. The default model is set in **Settings → Models → Default**.

## Per-task model (scheduled tasks)

Scheduled tasks can override the global default. Set it in the task configuration under **Model**.

## Reasoning effort

For models that support it (o1, o3, Claude with extended thinking), you can set reasoning effort per conversation:

- **Low** — faster, cheaper, good for simple tasks
- **Medium** — balanced
- **High** — slower, more thorough, best for complex reasoning

Set it in the chat settings panel.
