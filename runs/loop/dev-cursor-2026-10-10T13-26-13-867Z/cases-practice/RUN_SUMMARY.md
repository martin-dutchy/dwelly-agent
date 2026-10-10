# Run summary

Command: `pnpm cases --in cases/practice --out runs/loop/dev-cursor-2026-10-10T13-26-13-867Z/cases-practice --only 23,24 --concurrency 8 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1`

- Running 2 cases with claude-sonnet-5-5, thinking medium (concurrency 8, Jev off) at commit 80572f78 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 23 | action_taken | 6 | 0 | 0.085 | 32 |  |
| 24 | action_taken | 4 | 0 | 0.062 | 24 |  |

- Done in 32s · total cost $0.15 · decisions 2/2 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 8 · next run: keep --concurrency 8
- Value (estimate): 2 autonomous · 0 escalated · 10 verified write actions (local mock environment) · $0.073 and 28 s per case · ~1.1 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
