# Run summary

Command: `pnpm cases --in cases/practice --out runs/loop/dev-cursor-k3-2026-10-10T13-58-46-969Z/cases-practice/run-1 --only 02,11,13,18 --concurrency 6 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1`

- Running 4 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit e0fc43d7 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 02 | action_taken | 5 | 0 | 0.090 | 27 |  |
| 11 | action_taken | 2 | 0 | 0.064 | 18 |  |
| 13 | action_taken | 7 | 0 | 0.096 | 29 |  |
| 18 | action_taken | 4 | 0 | 0.075 | 20 |  |

- Done in 29s · total cost $0.32 · decisions 4/4 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 4 autonomous · 0 escalated · 18 verified write actions (local mock environment) · $0.081 and 24 s per case · ~1.9 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
