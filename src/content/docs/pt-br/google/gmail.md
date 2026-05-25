---
title: Gmail
description: Usando o ThairaAI com o Gmail.
---

Após conectado, o agente de IA pode ler e pesquisar sua caixa de entrada como parte de qualquer conversa.

## O que você pode pedir

```
Resuma meus e-mails não lidos de hoje
```
```
Encontre e-mails da Stripe nos últimos 7 dias
```
```
O que o João disse no último e-mail dele?
```
```
Rascunhe uma resposta ao e-mail sobre o prazo do projeto
```

## Permissões

O ThairaAI solicita os seguintes escopos do Gmail:

| Escopo               | Finalidade                         |
| -------------------- | ---------------------------------- |
| `gmail.readonly`     | Ler e pesquisar e-mails            |
| `gmail.compose`      | Rascunhar e enviar respostas       |

Você pode revogar o acesso a qualquer momento em [Permissões da Conta Google](https://myaccount.google.com/permissions).

## Privacidade

Os e-mails são buscados sob demanda quando o agente precisa deles para uma tarefa. Nada é armazenado remotamente — todos os dados ficam no banco de dados SQLite local.
