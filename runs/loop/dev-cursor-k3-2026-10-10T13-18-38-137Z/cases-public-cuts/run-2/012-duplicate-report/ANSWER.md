# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant asked again for someone to come out, but a visit is already booked for 29/04 8-12. Replied to the tenant confirming it, treated the message as a duplicate with no new job, noted the record inconsistencies, set a follow-up for 30/04 and returned the job to auto.

## Where the case stands
Stage: visit. Engineer visit booked 29/04/2026 08:00-12:00 (event 017). Tenant's 28/04 message is a duplicate of the open job. Waiting for the visit and result.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the visit is already booked for 29/04 8-12, no new job opened, and provider's number is available to rearrange | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Follow up on 30/04 for visit result or quote and to confirm provider name | Riverside Compliance / tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting back to us. An engineer is already booked to look at the dishwasher door: tomorrow, Wednesday 29/04/2026, between 8am and 12pm. Please make sure someone can give access. If that no longer works, call the provider on 07700 900410 to rearrange. We haven't opened a second job as this one already covers it. If the engineer needs a quote for the repair, we'll take it to the landlord and keep you updated. We'll check in with you after the visit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply does not establish the cause of the fault or who pays
- No quote or repair approved; a quote would go to the landlord
- Provider identity discrepancy not yet resolved

## Remaining work
- Visit on 29/04 and record result
- Quote to landlord if needed
- Confirm which company is attending
- Invoice and close after completion

## Missing or unavailable information
- Which company is attending (Riverside Compliance vs Cedar Utilities vs Harbour Homes)

## Conflicts between sources
- Provider named Riverside Compliance (events 014/015/018/019), Cedar Utilities (event 016) and Harbour Homes (SMS, event 020); tenant surname Turner vs Kendall in event 016. Treated the assignment record (Riverside Compliance, Leo Turner) as current.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit booked for 29/04/2026 08:00-12:00. Outstanding: the visit result, any quote and landlord approval, and the invoice.

**2. What is the next action, who is it for, and through which channel?**

Reply to Leo Turner (tenant) by email confirming the existing visit (done, MSG-101); follow up on 30/04 for the result.

**3. Does anything need a human decision, and why?**

No. It is a duplicate of a booked visit and the landlord's engineer instruction is already on record. The provider name discrepancy is handled by a note and a follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email 28/04 (event 021) asks for someone to come out: duplicate of open job, visit alrea… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-30","party":"Riverside Compliance / tenant","purpose":"Check visit on 29/04 happe… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
