---
title: Scheduled Tasks
description: Automate recurring work with cron-based scheduling.
---

Scheduled tasks let the AI agent run automatically on a schedule — no manual trigger needed.

## Creating a task

Go to **Settings → Scheduled Tasks → New Task** and configure:

| Field            | Options                                                      |
| ---------------- | ------------------------------------------------------------ |
| Schedule type    | Cron expression, fixed interval (every N min/hours), one-time |
| Timezone         | Any IANA timezone (e.g. `America/New_York`)                  |
| Execution mode   | Continue in existing conversation, or create new each time   |
| Model            | Override the model for this task                             |
| Workspace        | Specific directory for this task                             |

### Schedule examples

```
0 9 * * 1-5     # 9am Monday–Friday
0 */6 * * *     # every 6 hours
30 8 1 * *      # 8:30am on the 1st of each month
```

## Execution modes

**Continue in existing conversation** — the task appends to a bound conversation. The agent retains full history and context across runs. Good for ongoing projects.

**Create new conversation each time** — opens a fresh session on each trigger. Good for independent periodic reports.

## Practical examples

```
Every weekday at 9am: "Check my emails and summarize anything urgent"
Every Sunday at 7pm: "Review my calendar for next week and flag any conflicts"
1st of each month: "Generate a summary report of this month's activity in ~/reports/"
```

## Keep-awake

ThairaAI prevents system sleep while scheduled tasks are active. If the system sleeps and misses a trigger, ThairaAI detects the missed run on wake and can re-execute if configured to do so.
