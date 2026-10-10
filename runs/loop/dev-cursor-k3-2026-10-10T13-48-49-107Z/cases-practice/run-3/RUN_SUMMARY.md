# Run summary

Command: `pnpm cases --in cases/practice --out runs/loop/dev-cursor-k3-2026-10-10T13-48-49-107Z/cases-practice/run-3 --only 02,11,13,18 --concurrency 4 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1`

- Running 4 cases with claude-sonnet-5-5, thinking medium (concurrency 4, Jev off) at commit 4d59b652 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 02 | action_taken | 5 | 0 | 0.059 | 29 |  |
| 11 | action_taken | 3 | 0 | 0.037 | 18 |  |
| 13 | action_taken | 7 | 0 | 0.065 | 26 |  |
| 18 | action_taken | 4 | 0 | 0.044 | 21 |  |

- Done in 29s · total cost $0.21 · decisions 4/4 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 4 · next run: keep --concurrency 4
- Value (estimate): 4 autonomous · 0 escalated · 19 verified write actions (local mock environment) · $0.051 and 24 s per case · ~2.1 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
