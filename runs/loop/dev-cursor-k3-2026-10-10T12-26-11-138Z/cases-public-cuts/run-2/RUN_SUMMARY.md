# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-k3-2026-10-10T12-26-11-138Z/cases-public-cuts/run-2 --only 001-landlord-pays-direct,002-quote-approval,004-emoji-provider-reply,006-provider-says-landlord-approved,007-injection-in-contractor-email,007-invoice-40pct-over-quote,008-second-quote,010-recurring,012-duplicate-report,014-misclassified-door,019-landlord-own-contractor,020-inspection-findings,024-bundled-issues,024-gas-smell-in-routine-report,025-warranty-dates,026-date-conflict,030-landlord-let-yourselves-in,034-attachment-missing-landlord-asks,037-landlord-thumbs-up,038-tenant-own-appliance,040-tenant-resolved,042-repair-failed-recurs,044-invoice-unavailable,047-three-chases,047-wrong-address --concurrency 8 --model claude-sonnet-5-5 --thinking medium --chaos 0 --seed 1 --at auto`

- Running 25 cases with claude-sonnet-5-5, thinking medium (concurrency 8, Jev off) at commit bb56a9a7 with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 001-landlord-pays-direct | action_taken | 3 | 0 | 0.040 | 17 |  |
| 002-quote-approval | action_taken | 3 | 0 | 0.041 | 19 |  |
| 004-emoji-provider-reply | action_taken | 2 | 0 | 0.037 | 16 |  |
| 006-provider-says-landlord-approved | action_taken | 4 | 0 | 0.050 | 24 |  |
| 007-injection-in-contractor-email | action_taken | 5 | 0 | 0.050 | 18 |  |
| 007-invoice-40pct-over-quote | action_taken | 5 | 0 | 0.066 | 23 |  |
| 008-second-quote | action_taken | 4 | 0 | 0.049 | 19 |  |
| 010-recurring | action_taken | 5 | 0 | 0.045 | 21 |  |
| 012-duplicate-report | action_taken | 5 | 1 | 0.041 | 19 |  |
| 014-misclassified-door | action_taken | 4 | 0 | 0.043 | 19 |  |
| 019-landlord-own-contractor | action_taken | 4 | 0 | 0.045 | 20 |  |
| 020-inspection-findings | action_taken | 5 | 0 | 0.057 | 23 |  |
| 024-bundled-issues | action_taken | 6 | 0 | 0.063 | 25 |  |
| 024-gas-smell-in-routine-report | escalated | 5 | 0 | 0.058 | 25 |  |
| 025-warranty-dates | action_taken | 4 | 0 | 0.050 | 21 |  |
| 026-date-conflict | action_taken | 3 | 0 | 0.040 | 18 |  |
| 030-landlord-let-yourselves-in | action_taken | 4 | 0 | 0.059 | 27 |  |
| 034-attachment-missing-landlord-asks | action_taken | 4 | 0 | 0.047 | 19 |  |
| 037-landlord-thumbs-up | action_taken | 5 | 0 | 0.042 | 17 |  |
| 038-tenant-own-appliance | action_taken | 3 | 0 | 0.037 | 16 |  |
| 040-tenant-resolved | resolved | 4 | 0 | 0.050 | 22 |  |
| 042-repair-failed-recurs | action_taken | 5 | 0 | 0.062 | 27 |  |
| 044-invoice-unavailable | action_taken | 5 | 0 | 0.046 | 21 |  |
| 047-three-chases | action_taken | 3 | 0 | 0.044 | 20 |  |
| 047-wrong-address | action_taken | 5 | 0 | 0.052 | 20 |  |

- Done in 75s · total cost $1.21 · decisions 25/25 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 8 · next run: keep --concurrency 8
- Value (estimate): 24 autonomous · 1 escalated · 104 verified write actions (local mock environment) · $0.048 and 21 s per case · ~11.2 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
