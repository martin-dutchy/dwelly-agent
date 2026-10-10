# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-2026-10-10T13-12-53-675Z/cases-public-cuts --only 001-landlord-pays-direct,002-quote-approval,004-emoji-provider-reply,006-provider-says-landlord-approved,007-injection-in-contractor-email,007-invoice-40pct-over-quote,008-second-quote,010-recurring,012-duplicate-report,014-misclassified-door,019-landlord-own-contractor,020-inspection-findings,024-bundled-issues,024-gas-smell-in-routine-report,025-warranty-dates,026-date-conflict,030-landlord-let-yourselves-in,034-attachment-missing-landlord-asks,037-landlord-thumbs-up,038-tenant-own-appliance,040-tenant-resolved,042-repair-failed-recurs,044-invoice-unavailable,047-three-chases,047-wrong-address --concurrency 8 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 25 cases with claude-sonnet-5-5, thinking medium (concurrency 8, Jev off) at commit 1b65376b with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 001-landlord-pays-direct | action_taken | 5 | 0 | 0.088 | 22 |  |
| 002-quote-approval | action_taken | 4 | 0 | 0.078 | 19 |  |
| 004-emoji-provider-reply | action_taken | 3 | 0 | 0.075 | 17 |  |
| 006-provider-says-landlord-approved | action_taken | 5 | 0 | 0.059 | 25 |  |
| 007-injection-in-contractor-email | action_taken | 5 | 0 | 0.114 | 27 |  |
| 007-invoice-40pct-over-quote | action_taken | 6 | 0 | 0.102 | 23 |  |
| 008-second-quote | action_taken | 5 | 0 | 0.125 | 24 |  |
| 010-recurring | action_taken | 5 | 0 | 0.047 | 18 |  |
| 012-duplicate-report | action_taken | 4 | 0 | 0.056 | 22 |  |
| 014-misclassified-door | action_taken | 4 | 0 | 0.048 | 20 |  |
| 019-landlord-own-contractor | action_taken | 4 | 0 | 0.051 | 19 |  |
| 020-inspection-findings | action_taken | 5 | 0 | 0.066 | 22 |  |
| 024-bundled-issues | action_taken | 6 | 0 | 0.068 | 22 |  |
| 024-gas-smell-in-routine-report | escalated | 6 | 0 | 0.059 | 23 |  |
| 025-warranty-dates | action_taken | 5 | 0 | 0.067 | 28 |  |
| 026-date-conflict | action_taken | 4 | 1 | 0.068 | 21 |  |
| 030-landlord-let-yourselves-in | action_taken | 5 | 1 | 0.083 | 29 |  |
| 034-attachment-missing-landlord-asks | action_taken | 5 | 0 | 0.052 | 18 |  |
| 037-landlord-thumbs-up | action_taken | 4 | 0 | 0.045 | 16 |  |
| 038-tenant-own-appliance | action_taken | 4 | 0 | 0.046 | 18 |  |
| 040-tenant-resolved | resolved | 8 | 1 | 0.083 | 29 |  |
| 042-repair-failed-recurs | action_taken | 5 | 0 | 0.063 | 21 |  |
| 044-invoice-unavailable | action_taken | 8 | 1 | 0.072 | 26 |  |
| 047-three-chases | escalated | 4 | 0 | 0.059 | 21 |  |
| 047-wrong-address | action_taken | 4 | 0 | 0.058 | 22 |  |

- Done in 77s · total cost $1.73 · decisions 25/25 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 8 · next run: keep --concurrency 8
- Value (estimate): 23 autonomous · 2 escalated · 119 verified write actions (local mock environment) · $0.069 and 22 s per case · ~12.8 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
