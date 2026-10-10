# Run summary

Command: `pnpm cases --in cases/voice-calls --out runs/voice-calls --at none`

- Running 2 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit 91e728f0 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| V011-contractor-extra-part-s4gv7h | action_taken | 5 | 0 | 0.062 | 20 |  |
| V025-contractor-oven-warranty-gdyhaf | action_taken | 5 | 0 | 0.072 | 24 |  |

- Done in 24s · total cost $0.13 · decisions 2/2 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 2 autonomous · 0 escalated · 10 verified write actions (local mock environment) · $0.067 and 22 s per case · ~1.1 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
