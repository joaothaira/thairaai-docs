---
title: Configuração de Modelos
description: Como configurar modelos de IA no ThairaAI.
---

import { Steps } from '@astrojs/starlight/components';

## Adicionar um modelo

<Steps>

1. Abra **Configurações → Modelos**
2. Clique em **Adicionar Plataforma**
3. Selecione seu provedor na lista
4. Cole sua chave de API
5. Clique em **Salvar**

</Steps>

O modelo agora está disponível no seletor de modelos no cabeçalho do chat.

## Trocar modelos durante uma conversa

Clique no nome do modelo no cabeçalho do chat para abrir o seletor. Trocar de modelo durante uma conversa é seguro — o contexto é mantido.

## Modelo por conversa

Cada conversa pode usar um modelo diferente. O modelo padrão é definido em **Configurações → Modelos → Padrão**.

## Modelo por tarefa (tarefas agendadas)

Tarefas agendadas podem substituir o padrão global. Defina-o na configuração da tarefa em **Modelo**.

## Esforço de raciocínio

Para modelos que suportam (o1, o3, Claude com pensamento estendido), você pode definir o esforço de raciocínio por conversa:

- **Baixo** — mais rápido, mais barato, bom para tarefas simples
- **Médio** — equilibrado
- **Alto** — mais lento, mais profundo, melhor para raciocínio complexo

Defina no painel de configurações do chat.
