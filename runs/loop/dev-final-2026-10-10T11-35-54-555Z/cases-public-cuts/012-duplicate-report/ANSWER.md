# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant chased the dishwasher repair, but a visit is already booked for 29/04 8-12. I treated it as a duplicate, replied to the tenant with the booked slot, noted the record inconsistencies, returned the ticket to auto mode and set a 30/04 follow-up.

## Where the case stands
Stage: visit. Engineer visit booked 29/04/2026 08:00-12:00 (event 017). Tenant's 28/04 email is a duplicate chase. Awaiting the visit and its result; follow-up set for 30/04.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the visit is already booked for 29/04 8-12, no new job opened, and how to rearrange | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Wait for the visit; review on 30/04 for the result and which company attended | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting back to us. An engineer is already booked for your dishwasher: tomorrow, Wednesday 29/04/2026, between 8am and 12 noon. You don't need to do anything else, and we haven't opened a second job. Please make sure someone can let them in. If that time no longer works, call the provider on 07700 900410 to rearrange. Once they've looked at it, we'll update you on any next steps.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Replying does not confirm the cause of the fault, the cost, or who pays.
- The visit is not guaranteed attended; the provider identity discrepancy is unresolved.

## Remaining work
- Visit 29/04 08:00-12:00 by provider; record result afterwards.
- If a quote is needed, record it and send it to the landlord.
- Check the provider name mismatch (Riverside Compliance vs Cedar Utilities).

## Missing or unavailable information
- Which company actually attends (Riverside Compliance vs Cedar Utilities); tenant surname (Turner vs Kendall).

## Conflicts between sources
- Provider named Riverside Compliance in assignment but call log says Grant from Cedar Utilities; SMS signed Harbour Homes; tenant named Leo Turner vs Leo Kendall. Trusted the system record of the visit (event 017).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord has agreed the engineer attends; provider assigned; visit booked 29/04/2026 08:00-12:00. Outstanding: the visit, the result, and any quote or invoice.

**2. What is the next action, who is it for, and through which channel?**

Reply to the tenant by email that the visit is already booked (done, MSG-101), then wait for the visit result.

**3. Does anything need a human decision, and why?**

No. It is a routine duplicate chase with the visit already booked. The name inconsistencies are noted on the ticket for follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email 28/04 (event 021) is a duplicate chase; visit 29/04 08:00-12:00 already booked. No… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-30","purpose":"Check visit result from 29/04 with provider and tenant; confirm wh… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
