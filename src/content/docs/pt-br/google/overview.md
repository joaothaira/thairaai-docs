---
title: Visão Geral da Integração com Google
description: Como o ThairaAI se conecta ao Gmail e ao Google Agenda.
---

O ThairaAI se integra aos serviços do Google para que o agente de IA possa ler seus e-mails, verificar sua agenda e realizar ações em seu nome.

## O que é suportado

| Serviço        | Funcionalidades                                                   |
| -------------- | ----------------------------------------------------------------- |
| Gmail          | Ler e-mails, pesquisar caixa de entrada, resumir threads, rascunhar respostas |
| Google Agenda  | Ver eventos, verificar disponibilidade, criar e atualizar eventos |

## Como funciona

A autenticação usa OAuth 2.0 do Google. Ao entrar com o Google:

1. Você autoriza o ThairaAI a acessar seus escopos de Gmail e Agenda
2. O ThairaAI recebe um token de acesso — armazenado localmente, nunca enviado a nenhum servidor
3. O agente integrado pode então chamar as APIs do Gmail e Agenda em seu nome

Todos os dados ficam na sua máquina. O ThairaAI não possui um backend que armazene seus dados do Google.

## Duas formas de autenticar

### Usuários do app (versão baixada)

Baixe o ThairaAI pelo Releases e clique em **Entrar com o Google**. As credenciais OAuth já vêm embutidas no app.

### Desenvolvedores (compilando do código fonte)

Você precisa fornecer suas próprias credenciais OAuth do Google via `.env`. Veja [Configuração OAuth](/pt-br/google/oauth-setup/).
