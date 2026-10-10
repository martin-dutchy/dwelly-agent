# Run summary

Command: `pnpm cases --in "HackatonPublicCases/Property Management" --out runs/loop/dev-cursor-2026-10-10T12-43-45-688Z/HackatonPublicCases-Property-Management --only 003,008,012,017,021,026 --concurrency 6 --model claude-sonnet-5-5 --thinking medium --chaos 0.15 --seed 1 --at auto`

- Running 6 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off, chaos 0.15 seed 1) at commit d2bb18ac with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 003 | needs_info | 2 | 0 | 0.061 | 17 |  |
| 008 | action_taken | 5 | 1 | 0.069 | 27 |  |
| 012 | action_taken | 5 | 0 | 0.058 | 24 |  |
| 017 | action_taken | 4 | 0 | 0.050 | 21 |  |
| 021 | action_taken | 3 | 0 | 0.041 | 16 |  |
| 026 | action_taken | 3 | 0 | 0.062 | 22 |  |

- Done in 27s · total cost $0.34 · decisions 6/6 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 6 autonomous · 0 escalated · 21 verified write actions (local mock environment) · $0.057 and 21 s per case · ~2.3 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
