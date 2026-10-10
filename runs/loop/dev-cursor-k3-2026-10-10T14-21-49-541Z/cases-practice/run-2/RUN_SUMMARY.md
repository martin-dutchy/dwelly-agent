# Run summary

Command: `pnpm cases --in cases/practice --out runs/loop/dev-cursor-k3-2026-10-10T14-21-49-541Z/cases-practice/run-2 --only 02,11,13,18 --concurrency 4 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1`

- Running 4 cases with claude-sonnet-5-5, thinking medium (concurrency 4, Jev off) at commit 1ed596ae with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 02 | action_taken | 5 | 0 | 0.059 | 24 |  |
| 11 | escalated | 4 | 0 | 0.045 | 22 |  |
| 13 | action_taken | 8 | 0 | 0.080 | 31 |  |
| 18 | action_taken | 4 | 0 | 0.044 | 20 |  |

- Done in 31s · total cost $0.23 · decisions 4/4 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 4 · next run: keep --concurrency 4
- Value (estimate): 3 autonomous · 1 escalated · 21 verified write actions (local mock environment) · $0.057 and 24 s per case · ~2.2 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
