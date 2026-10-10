# Run summary

Command: `pnpm cases --in cases/practice --out runs/loop/dev-cursor-k3-2026-10-10T14-15-22-678Z/cases-practice/run-1 --only 13 --concurrency 3 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1`

- Running 1 cases with claude-sonnet-5-5, thinking medium (concurrency 3, Jev off) at commit d4430887 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 13 | action_taken | 8 | 0 | 0.111 | 31 |  |

- Done in 31s · total cost $0.11 · decisions 1/1 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 3 · next run: keep --concurrency 3
- Value (estimate): 1 autonomous · 0 escalated · 8 verified write actions (local mock environment) · $0.111 and 31 s per case · ~52 human minutes if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
