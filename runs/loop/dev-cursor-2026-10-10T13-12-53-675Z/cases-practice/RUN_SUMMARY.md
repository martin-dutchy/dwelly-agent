# Run summary

Command: `pnpm cases --in cases/practice --out runs/loop/dev-cursor-2026-10-10T13-12-53-675Z/cases-practice --only 01,02,03,05,06,07,08,10,11,12,13,15,16,17,18,20,21 --concurrency 8 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1`

- Running 17 cases with claude-sonnet-5-5, thinking medium (concurrency 8, Jev off) at commit 1b65376b with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 01 | escalated | 5 | 0 | 0.082 | 23 |  |
| 02 | action_taken | 5 | 0 | 0.083 | 27 |  |
| 03 | escalated | 8 | 0 | 0.104 | 33 |  |
| 05 | action_taken | 7 | 0 | 0.102 | 29 |  |
| 06 | action_taken | 7 | 0 | 0.102 | 27 |  |
| 07 | action_taken | 4 | 0 | 0.066 | 17 |  |
| 08 | escalated | 4 | 0 | 0.077 | 25 |  |
| 10 | escalated | 4 | 1 | 0.084 | 28 |  |
| 11 | escalated | 4 | 0 | 0.044 | 21 |  |
| 12 | escalated | 5 | 0 | 0.057 | 24 |  |
| 13 | action_taken | 5 | 0 | 0.060 | 26 |  |
| 15 | action_taken | 3 | 0 | 0.044 | 21 |  |
| 16 | escalated | 6 | 0 | 0.063 | 28 |  |
| 17 | escalated | 5 | 0 | 0.062 | 27 |  |
| 18 | action_taken | 3 | 0 | 0.041 | 19 |  |
| 20 | escalated | 6 | 0 | 0.068 | 32 |  |
| 21 | action_taken | 2 | 0 | 0.038 | 15 |  |

- Done in 65s · total cost $1.18 · decisions 17/17 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 8 · next run: keep --concurrency 8
- Value (estimate): 8 autonomous · 9 escalated · 82 verified write actions (local mock environment) · $0.069 and 25 s per case · ~8.4 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
