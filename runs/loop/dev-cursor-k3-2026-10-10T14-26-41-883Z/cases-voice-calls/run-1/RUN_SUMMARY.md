# Run summary

Command: `pnpm cases --in cases/voice-calls --out runs/loop/dev-cursor-k3-2026-10-10T14-26-41-883Z/cases-voice-calls/run-1 --only 105,110 --concurrency 4 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at none`

- Running 2 cases with claude-sonnet-5-5, thinking medium (concurrency 4, Jev off) at commit aa41815f with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 105 | action_taken | 5 | 0 | 0.098 | 25 |  |
| 110 | action_taken | 6 | 1 | 0.108 | 28 |  |

- Done in 28s · total cost $0.21 · decisions 2/2 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 4 · next run: keep --concurrency 4
- Value (estimate): 2 autonomous · 0 escalated · 10 verified write actions (local mock environment) · $0.103 and 26 s per case · ~1.1 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
