# Run summary

Command: `pnpm cases --in cases/practice --out runs/loop/dev-cursor-k3-2026-10-10T14-08-47-640Z/cases-practice/run-2 --only 13 --concurrency 3 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1`

- Running 1 cases with claude-sonnet-5-5, thinking medium (concurrency 3, Jev off) at commit 88a94bce with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 13 | action_taken | 7 | 0 | 0.070 | 28 |  |

- Done in 28s · total cost $0.07 · decisions 1/1 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 3 · next run: keep --concurrency 3
- Value (estimate): 1 autonomous · 0 escalated · 7 verified write actions (local mock environment) · $0.070 and 28 s per case · ~46 human minutes if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
