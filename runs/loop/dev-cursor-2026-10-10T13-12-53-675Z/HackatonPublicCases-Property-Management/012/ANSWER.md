# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's troubleshooting failed and the visit is booked for 29/04 08:00-12:00. The call log names a different company (Cedar Utilities) and tenant surname than the records, so I asked the provider to confirm, updated the tenant, set a follow-up for 29/04 and noted the conflicts. No human decision is needed yet.

## Where the case stands
Stage: visit. Visit recorded by system for 29/04/2026 08:00 (8-12 slot). Landlord already agreed an inspection; any quote needs landlord approval. Waiting on provider to confirm company identity and attendance; review 29/04.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask provider to confirm which company attends (Riverside vs Cedar Utilities) and the 29/04 8-12 slot | Riverside Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the visit is booked 29 April 8-12, company being confirmed, approval needed before any repair | Leo Turner, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on 29/04 for visit outcome and provider confirmation | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Riverside Compliance (contractor) via email, existing thread (event 018 email / event 015)** (verified)

> Hello, a quick check please on the dishwasher job at Flat 9, 89 Juniper Mews. A call logged on 26 April was from "Grant from Cedar Utilities", but we assigned Riverside Compliance. Please confirm by reply which company is attending, and that you will visit on Wednesday 29/04/2026 between 8 and 12. The tenant is Leo Turner. If a quote is needed, please send it with photos and do not start work until we confirm approval.

**A2 · send_message → Leo Turner (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Leo, thanks for running the checks. An engineer is booked to look at the dishwasher on Wednesday 29 April between 8am and 12. We are just confirming the engineer's company details with them, and will tell you if anything changes. If they find it needs a repair, we will get the landlord's approval before any work starts. Please let us know if that slot stops working for you. We'll update you after the visit, or by 30 April if you haven't heard.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not confirm the provider's identity or that the fault will be fixed
- No repair spend approved; a quote would need landlord approval
- Does not establish the cause of the fault

## Remaining work
- Provider confirms company and attendance
- Record visit result after 29/04
- Quote to landlord if repair is needed
- Invoice and closing checks

## Missing or unavailable information
- Confirmation of which company is attending
- Tenant surname discrepancy (Turner vs Kendall) in call log

## Conflicts between sources
- Provider: assigned Riverside Compliance vs call log from Cedar Utilities; trusted assignment, asked for confirmation
- Tenant name: Leo Turner vs Leo Kendall in call log; trusted Leo Turner
- Event 004 note suggests the dishwasher link to an older email was uncertain; tenant has since confirmed the dishwasher door still fails

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine job at visit stage; inspection booked 29/04/2026 8-12 after the tenant's checks failed. Outstanding: provider identity confirmation, visit result, a possible quote needing landlord approval, and the invoice.

**2. What is the next action, who is it for, and through which channel?**

Provider confirmation request to Riverside Compliance by email (A1), tenant update by email (A2), follow-up on 29/04 (A3).

**3. Does anything need a human decision, and why?**

No. The provider name mismatch can be settled by asking the provider; escalate only if it stays unresolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email / event… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012","due_on":"2026-04-29","party":"Riverside Compliance","purpose":"Confirm which company attends; check visit outcome/q… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-012","note":"Conflicts: assigned Riverside Compliance vs call log from 'Cedar Utilities'; tenant named Leo Turner vs 'Leo Ken… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-012"} | 1 | ✅ verified | Ticket NBL-012 read back after resume_auto |

## Failed or unverified actions
_None._
