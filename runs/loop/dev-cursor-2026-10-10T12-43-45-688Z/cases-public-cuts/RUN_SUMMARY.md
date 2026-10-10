# Run summary

Command: `pnpm cases --in cases/public-cuts --out runs/loop/dev-cursor-2026-10-10T12-43-45-688Z/cases-public-cuts --only 001-landlord-pays-direct,002-quote-approval,004-emoji-provider-reply,006-provider-says-landlord-approved,007-injection-in-contractor-email,007-invoice-40pct-over-quote,008-second-quote,010-recurring,012-duplicate-report,014-misclassified-door,019-landlord-own-contractor,020-inspection-findings,024-bundled-issues,024-gas-smell-in-routine-report,025-warranty-dates,026-date-conflict,030-landlord-let-yourselves-in,034-attachment-missing-landlord-asks,037-landlord-thumbs-up,038-tenant-own-appliance,040-tenant-resolved,042-repair-failed-recurs,044-invoice-unavailable,047-three-chases,047-wrong-address --concurrency 6 --model claude-sonnet-5-5 --thinking medium --chaos 0.15 --seed 1 --at auto`

- Running 25 cases with claude-sonnet-5-5, thinking medium (concurrency 6, Jev off, chaos 0.15 seed 1) at commit d2bb18ac with uncommitted changes…
- Toolset: local mock environment (no organiser API configured)

| Case | Outcome | Actions | Failed | Cost (USD) | Seconds | Error / note |
|---|---|---|---|---|---|---|
| 001-landlord-pays-direct | action_taken | 4 | 0 | 0.051 | 23 |  |
| 002-quote-approval | action_taken | 6 | 1 | 0.060 | 25 |  |
| 004-emoji-provider-reply | action_taken | 4 | 1 | 0.065 | 20 |  |
| 006-provider-says-landlord-approved | action_taken | 5 | 1 | 0.076 | 30 |  |
| 007-injection-in-contractor-email | action_taken | 8 | 1 | 0.073 | 26 |  |
| 007-invoice-40pct-over-quote | action_taken | 7 | 1 | 0.074 | 27 |  |
| 008-second-quote | action_taken | 3 | 0 | 0.060 | 20 |  |
| 010-recurring | action_taken | 4 | 0 | 0.039 | 19 |  |
| 012-duplicate-report | action_taken | 3 | 0 | 0.038 | 17 |  |
| 014-misclassified-door | escalated | 5 | 1 | 0.061 | 27 |  |
| 019-landlord-own-contractor | action_taken | 5 | 0 | 0.046 | 20 |  |
| 020-inspection-findings | action_taken | 5 | 0 | 0.059 | 25 |  |
| 024-bundled-issues | action_taken | 6 | 0 | 0.058 | 23 |  |
| 024-gas-smell-in-routine-report | escalated | 5 | 0 | 0.051 | 21 |  |
| 025-warranty-dates | action_taken | 6 | 0 | 0.059 | 26 |  |
| 026-date-conflict | action_taken | 4 | 0 | 0.052 | 22 |  |
| 030-landlord-let-yourselves-in | action_taken | 8 | 2 | 0.077 | 31 |  |
| 034-attachment-missing-landlord-asks | action_taken | 4 | 0 | 0.045 | 20 |  |
| 037-landlord-thumbs-up | action_taken | 5 | 1 | 0.051 | 18 |  |
| 038-tenant-own-appliance | action_taken | 5 | 1 | 0.048 | 19 |  |
| 040-tenant-resolved | resolved | 8 | 1 | 0.081 | 30 |  |
| 042-repair-failed-recurs | action_taken | 5 | 0 | 0.065 | 26 |  |
| 044-invoice-unavailable | action_taken | 5 | 1 | 0.060 | 26 |  |
| 047-three-chases | action_taken | 5 | 1 | 0.062 | 23 |  |
| 047-wrong-address | needs_info | 5 | 1 | 0.059 | 22 |  |

- Done in 105s · total cost $1.47 · decisions 25/25 · resumed 0 · budget-skipped 0
- Rate-limit retries: 0 across 0 cases (max 0 in one case) at concurrency 6 · next run: keep --concurrency 6
- Value (estimate): 23 autonomous · 2 escalated · 116 verified write actions (local mock environment) · $0.059 and 23 s per case · ~12.5 human hours if a person did the same actions (6.5 min per verified write action, less 3 min of human review per escalation, Dwelly's published figures)
