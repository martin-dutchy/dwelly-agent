# Run summary

Command: `pnpm cases --in "HackatonPublicCases/Property Management" --out runs/loop/dev-cursor-2026-10-10T13-12-53-675Z/HackatonPublicCases-Property-Management --only 003,008,012,017,021,026 --concurrency 8 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 6 cases with claude-sonnet-5-5, thinking medium (concurrency 8, Jev off) at commit 1b65376b with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 003 | action_taken | 3 | 0 | 0.087 | 18 |  |
| 008 | action_taken | 3 | 0 | 0.104 | 22 |  |
| 012 | action_taken | 5 | 0 | 0.085 | 24 |  |
| 017 | action_taken | 4 | 0 | 0.067 | 18 |  |
| 021 | action_taken | 5 | 1 | 0.077 | 19 |  |
| 026 | action_taken | 4 | 0 | 0.084 | 22 |  |

- Done in 24s · total cost $0.50 · decisions 6/6 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 8 · next run: keep --concurrency 8
- Value (estimate): 6 autonomous · 0 escalated · 23 verified write actions (local mock environment) · $0.084 and 20 s per case · ~2.5 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
