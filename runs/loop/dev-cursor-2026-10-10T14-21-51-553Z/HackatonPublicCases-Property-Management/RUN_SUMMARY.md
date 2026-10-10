# Run summary

Command: `pnpm cases --in "HackatonPublicCases/Property Management" --out runs/loop/dev-cursor-2026-10-10T14-21-51-553Z/HackatonPublicCases-Property-Management --only 003,008,012,017,021,026 --concurrency 4 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 6 cases with claude-sonnet-5-5, thinking medium (concurrency 4, Jev off) at commit 1ed596ae with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 003 | action_taken | 4 | 0 | 0.075 | 23 |  |
| 008 | action_taken | 3 | 0 | 0.081 | 22 |  |
| 012 | action_taken | 4 | 1 | 0.059 | 24 |  |
| 017 | action_taken | 3 | 0 | 0.040 | 14 |  |
| 021 | action_taken | 5 | 0 | 0.055 | 21 |  |
| 026 | action_taken | 8 | 2 | 0.080 | 25 |  |

- Done in 46s · total cost $0.39 · decisions 6/6 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 4 · next run: keep --concurrency 4
- Value (estimate): 6 autonomous · 0 escalated · 24 verified write actions (local mock environment) · $0.065 and 21 s per case · ~2.6 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
