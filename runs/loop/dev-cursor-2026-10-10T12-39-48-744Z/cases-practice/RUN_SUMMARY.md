# Run summary

Command: `pnpm cases --in cases/practice --out runs/loop/dev-cursor-2026-10-10T12-39-48-744Z/cases-practice --only 01,02,03,05,06,07,08,10,11,12,13,15,16,17,18,20,21 --concurrency 8 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1`

- Running 17 cases with claude-sonnet-5-5, thinking medium (concurrency 8, Jev off) at commit 1083c00c with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 01 | escalated | 5 | 0 | 0.053 | 22 |  |
| 02 | action_taken | 5 | 0 | 0.059 | 27 |  |
| 03 | escalated | 7 | 0 | 0.070 | 32 |  |
| 05 | action_taken | 5 | 0 | 0.049 | 22 |  |
| 06 | escalated | 7 | 0 | 0.086 | 34 |  |
| 07 | action_taken | 2 | 0 | 0.029 | 13 |  |
| 08 | escalated | 3 | 0 | 0.060 | 26 |  |
| 10 | escalated | 3 | 0 | 0.047 | 22 |  |
| 11 | action_taken | 4 | 0 | 0.042 | 21 |  |
| 12 | escalated | 5 | 0 | 0.064 | 29 |  |
| 13 | action_taken | 6 | 0 | 0.059 | 26 |  |
| 15 | escalated | 3 | 0 | 0.046 | 23 |  |
| 16 | escalated | 7 | 0 | 0.063 | 28 |  |
| 17 | escalated | 4 | 0 | 0.050 | 23 |  |
| 18 | action_taken | 3 | 0 | 0.039 | 20 |  |
| 20 | escalated | 9 | 0 | 0.083 | 37 |  |
| 21 | action_taken | 2 | 0 | 0.037 | 18 |  |

- Done in 72s · total cost $0.94 · decisions 17/17 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 8 · next run: keep --concurrency 8
- Value (estimate): 7 autonomous · 10 escalated · 80 verified write actions (local mock environment) · $0.055 and 25 s per case · ~8.2 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
