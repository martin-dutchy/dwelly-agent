# Run summary

Command: `pnpm cases --in cases/practice --only 23 --out runs/voice-cases`

- Running 1 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit 15a623c6 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 23 | action_taken | 8 | 1 | 0.106 | 33 |  |

- Done in 33s · total cost $0.11 · decisions 1/1 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 1 autonomous · 0 escalated · 7 verified write actions (local mock environment) · $0.106 and 33 s per case · ~46 human minutes if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
