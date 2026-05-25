---
title: Modo Multi-Agente
description: Use múltiplos agentes de IA por uma interface unificada.
---

Se você já tem agentes CLI instalados, o ThairaAI os detecta automaticamente e permite usar todos eles pela mesma interface — junto com o agente integrado.

## Agentes suportados

- Agente Integrado (zero configuração)
- Claude Code
- Codex (OpenAI)
- Gemini CLI
- Qwen Code
- Hermes Agent
- Goose AI
- Kiro
- Cursor Agent
- Snow CLI
- E mais — qualquer agente com suporte a MCP stdio é detectado automaticamente

## Como funciona

O ThairaAI varre seu `PATH` em busca de agentes CLI conhecidos na inicialização. Os agentes detectados aparecem em **Configurações → Agentes**.

Cada agente roda em sua própria sessão independente com contexto, diálogo de permissão e indicador na barra lateral próprios.

## Modo Equipe

O Modo Equipe permite que múltiplos agentes trabalhem juntos em uma única tarefa:

- Um agente **Líder** recebe suas instruções e divide em subtarefas
- Agentes **Companheiros** executam as subtarefas em paralelo
- Os resultados fluem de volta ao Líder por uma caixa de entrada assíncrona compartilhada
- Todos os agentes compartilham a mesma pasta de trabalho

Ative o Modo Equipe pelo seletor de agentes no cabeçalho do chat.

## Modo YOLO / Automático Total

Por padrão, cada ação do agente requer sua aprovação. Ative o **Modo YOLO** para aprovar automaticamente todas as ações de uma sessão — útil para tarefas longas sem supervisão.

Ative por conversa nas configurações do chat.
