# Run summary

Command: `pnpm cases --in cases/voice-calls --only V040-tenant-self-swapped-machine-gs2den,V014-tenant-door-already-fixed-fa514g,V038-landlord-tenant-own-washer-99vdh8,V011-contractor-extra-part-skmtff --out runs/voice-calls --at none`

- Running 4 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off) at commit dafa48c0 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| V011-contractor-extra-part-skmtff | action_taken | 5 | 0 | 0.084 | 20 |  |
| V014-tenant-door-already-fixed-fa514g | action_taken | 5 | 0 | 0.086 | 25 |  |
| V038-landlord-tenant-own-washer-99vdh8 | action_taken | 3 | 0 | 0.076 | 19 |  |
| V040-tenant-self-swapped-machine-gs2den | action_taken | 3 | 0 | 0.078 | 18 |  |

- Done in 25s · total cost $0.32 · decisions 4/4 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 4 autonomous · 0 escalated · 16 verified write actions (local mock environment) · $0.081 and 20 s per case · ~1.7 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
