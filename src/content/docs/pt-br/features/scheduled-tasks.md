---
title: Tarefas Agendadas
description: Automatize trabalho recorrente com agendamento baseado em cron.
---

As tarefas agendadas permitem que o agente de IA rode automaticamente em um horário — sem precisar de acionamento manual.

## Criando uma tarefa

Vá em **Configurações → Tarefas Agendadas → Nova Tarefa** e configure:

| Campo            | Opções                                                            |
| ---------------- | ----------------------------------------------------------------- |
| Tipo de agendamento | Expressão cron, intervalo fixo (a cada N min/horas), uma vez só |
| Fuso horário     | Qualquer fuso IANA (ex: `America/Sao_Paulo`)                      |
| Modo de execução | Continuar na conversa existente, ou criar uma nova a cada vez     |
| Modelo           | Substituir o modelo para esta tarefa                              |
| Pasta de trabalho| Diretório específico para esta tarefa                             |

### Exemplos de agendamento

```
0 9 * * 1-5     # 9h de segunda a sexta
0 */6 * * *     # a cada 6 horas
30 8 1 * *      # 8h30 no dia 1 de cada mês
```

## Modos de execução

**Continuar na conversa existente** — a tarefa é adicionada a uma conversa vinculada. O agente mantém todo o histórico e contexto entre as execuções. Bom para projetos contínuos.

**Criar nova conversa a cada vez** — abre uma sessão nova a cada acionamento. Bom para relatórios periódicos independentes.

## Exemplos práticos

```
Todo dia útil às 9h: "Verifique meus e-mails e resuma qualquer coisa urgente"
Todo domingo às 19h: "Revise minha agenda da próxima semana e aponte conflitos"
Todo dia 1 do mês: "Gere um relatório resumo das atividades deste mês em ~/relatorios/"
```

## Prevenção de suspensão

O ThairaAI evita que o sistema suspenda enquanto há tarefas agendadas ativas. Se o sistema suspender e perder um acionamento, o ThairaAI detecta a execução perdida ao acordar e pode reexecutá-la se configurado para isso.
