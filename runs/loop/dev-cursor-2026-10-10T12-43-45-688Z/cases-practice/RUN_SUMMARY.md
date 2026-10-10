# Run summary

Command: `pnpm cases --in cases/practice --out runs/loop/dev-cursor-2026-10-10T12-43-45-688Z/cases-practice --only 01,02,03,05,06,07,08,10,11,12,13,15,16,17,18,20,21 --concurrency 6 --model claude-sonnet-5-5 --thinking medium --chaos 0.15 --seed 1`

- Running 17 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off, chaos 0.15 seed 1) at commit d2bb18ac with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 01 | escalated | 5 | 0 | 0.070 | 28 |  |
| 02 | action_taken | 5 | 0 | 0.069 | 30 |  |
| 03 | escalated | 8 | 1 | 0.097 | 40 |  |
| 05 | action_taken | 7 | 1 | 0.076 | 30 |  |
| 06 | escalated | 9 | 0 | 0.105 | 37 |  |
| 07 | action_taken | 2 | 0 | 0.034 | 13 |  |
| 08 | escalated | 3 | 0 | 0.063 | 28 |  |
| 10 | escalated | 4 | 1 | 0.055 | 26 |  |
| 11 | action_taken | 2 | 0 | 0.033 | 18 |  |
| 12 | escalated | 5 | 0 | 0.065 | 28 |  |
| 13 | action_taken | 4 | 0 | 0.048 | 22 |  |
| 15 | escalated | 4 | 0 | 0.062 | 30 |  |
| 16 | escalated | 6 | 0 | 0.066 | 26 |  |
| 17 | escalated | 4 | 0 | 0.052 | 23 |  |
| 18 | action_taken | 4 | 0 | 0.042 | 21 |  |
| 20 | escalated | 6 | 0 | 0.069 | 36 |  |
| 21 | action_taken | 2 | 0 | 0.033 | 15 |  |

- Done in 94s · total cost $1.04 · decisions 17/17 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 7 autonomous · 10 escalated · 77 verified write actions (local mock environment) · $0.061 and 27 s per case · ~7.8 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
