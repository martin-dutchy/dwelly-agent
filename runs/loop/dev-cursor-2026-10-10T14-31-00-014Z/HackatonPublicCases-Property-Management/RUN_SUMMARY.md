# Run summary

Command: `pnpm cases --in "HackatonPublicCases/Property Management" --out runs/loop/dev-cursor-2026-10-10T14-31-00-014Z/HackatonPublicCases-Property-Management --only 003,008,012,017,021,026 --concurrency 6 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 6 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit 404c3763 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 003 | action_taken | 3 | 0 | 0.068 | 20 |  |
| 008 | action_taken | 3 | 0 | 0.085 | 23 |  |
| 012 | action_taken | 2 | 0 | 0.049 | 18 |  |
| 017 | action_taken | 3 | 0 | 0.040 | 15 |  |
| 021 | action_taken | 6 | 1 | 0.065 | 23 |  |
| 026 | action_taken | 8 | 1 | 0.088 | 29 |  |

- Done in 30s · total cost $0.39 · decisions 6/6 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 6 autonomous · 0 escalated · 23 verified write actions (local mock environment) · $0.066 and 21 s per case · ~2.5 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
