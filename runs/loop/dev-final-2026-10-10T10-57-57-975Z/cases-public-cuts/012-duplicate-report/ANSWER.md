# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's new email repeats an issue already being handled in an open job, with the visit booked for 29 April 8-12. I did not create a duplicate ticket. I replied to the tenant with the booking, logged the provider-name inconsistencies in a note, returned the ticket to auto mode and set a follow-up for 29 April.

## Where the case stands
Ticket at visit stage. Landlord agreed, provider assigned, visit booked 29/04/2026 8-12. Tenant's 28 Apr email is a duplicate chase. Waiting on the visit and result.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the existing visit is tomorrow 8-12, no new job opened, and how to rearrange. | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Follow up on 29 April to check the visit happened and record the result. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting back to us. You don't need to do anything new: an engineer is already booked to look at the dishwasher door tomorrow, Wednesday 29 April, between 8am and 12pm. Please make sure someone is home to let them in. If that doesn't work for you, call the provider on 07700 900410 to rearrange. Your existing request covers this, so we haven't opened a second one. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not confirm the cause of the fault, the cost or who pays.
- It does not confirm the visit will happen; the provider's attendance is not yet verified.
- No new ticket was created.

## Remaining work
- Visit on 29/04 8-12, then record the result
- Quote and landlord approval if a repair is needed
- Ops to confirm which provider holds the booking

## Missing or unavailable information
- Which provider is actually attending: Riverside Compliance, Cedar Utilities or Harbour Homes

## Conflicts between sources
- Provider named as Riverside Compliance, Cedar Utilities (call) and Harbour Homes (SMS)
- Tenant surname Turner vs Kendall in event 016
- Event 004 note says the dishwasher link is uncertain, but the tenant's later replies confirm the dishwasher

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

The job is at the visit stage. The landlord agreed, a provider is assigned, and the visit is booked for 29/04 8-12. The visit result, and any quote, are still outstanding.

**2. What is the next action, for whom, through which channel?**

Reply to Leo Turner (tenant) by email confirming the existing booking. This is done. After that we wait for the visit.

**3. Does anything need a human decision?**

No. This is a routine duplicate chase. The provider-name inconsistency is noted for ops to check, not a decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant's 28 Apr email duplicates this open job; visit already booked 29/04 8-12. Records name t… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |
| A4 | `schedule_follow_up` | {"due_on":"2026-04-29","purpose":"Check the dishwasher visit happened (8-12) and record the result or quote","ticket_ref":"NBL-012-duplicate… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
