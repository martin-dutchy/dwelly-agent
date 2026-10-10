# Run summary

Command: `pnpm cases --in "HackatonPublicCases/Property Management" --out runs/loop/dev-cursor-2026-10-10T12-43-45-642Z/HackatonPublicCases-Property-Management --only 003,008,012,017,021,026 --concurrency 6 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 6 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit d2bb18ac with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 003 | needs_info | 3 | 0 | 0.063 | 18 |  |
| 008 | action_taken | 3 | 0 | 0.084 | 19 |  |
| 012 | action_taken | 4 | 0 | 0.057 | 24 |  |
| 017 | action_taken | 3 | 0 | 0.035 | 17 |  |
| 021 | action_taken | 7 | 2 | 0.060 | 21 |  |
| 026 | action_taken | 4 | 0 | 0.062 | 24 |  |

- Done in 25s · total cost $0.36 · decisions 6/6 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 6 autonomous · 0 escalated · 22 verified write actions (local mock environment) · $0.060 and 21 s per case · ~2.4 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
