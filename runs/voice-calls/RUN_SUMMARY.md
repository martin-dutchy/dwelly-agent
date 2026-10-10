# Run summary

Command: `pnpm cases --in cases/voice-calls --out runs/voice-calls --at none`

- Running 16 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit a20f01eb with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 101 | action_taken | 4 | 0 | 0.061 | 19 |  |
| 102 | action_taken | 7 | 1 | 0.090 | 27 |  |
| 103 | action_taken | 3 | 0 | 0.058 | 20 |  |
| 104 | action_taken | 6 | 0 | 0.081 | 30 |  |
| 105 | action_taken | 4 | 0 | 0.062 | 22 |  |
| 106 | action_taken | 5 | 0 | 0.061 | 18 |  |
| 107 | action_taken | 4 | 0 | 0.073 | 22 |  |
| 108 | action_taken | 5 | 0 | 0.063 | 20 |  |
| 109 | action_taken | 8 | 1 | 0.089 | 30 |  |
| 110 | action_taken | 5 | 0 | 0.071 | 25 |  |
| 111 | action_taken | 6 | 0 | 0.087 | 26 |  |
| 112 | action_taken | 6 | 0 | 0.081 | 22 |  |
| 113 | action_taken | 3 | 0 | 0.054 | 18 |  |
| 114 | action_taken | 5 | 0 | 0.074 | 26 |  |
| 115 | action_taken | 5 | 1 | 0.078 | 25 |  |
| 116 | action_taken | 4 | 0 | 0.054 | 19 |  |

- Done in 72s · total cost $1.14 · decisions 16/16 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 16 autonomous · 0 escalated · 77 verified write actions (local mock environment) · $0.071 and 23 s per case · ~8.3 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
