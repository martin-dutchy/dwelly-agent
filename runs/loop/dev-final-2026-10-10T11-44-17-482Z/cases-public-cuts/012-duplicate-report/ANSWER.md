# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's latest email repeats an existing request. A visit is already booked for 29/04 8-12, so I created no new job. I told the tenant about the booking, noted the record inconsistencies, set a follow-up for 30/04 and returned the job to auto mode.

## Where the case stands
Ticket at visit stage. Engineer visit booked 29/04/2026 08:00-12:00. Tenant's 28/04 email is a duplicate request for the same issue. Waiting on the visit and its result.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the visit is already booked for 29 April 8am-12pm and gave the provider's number. | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Follow-up on 30 April to check the visit happened and get the result or quote. | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting back to us. An engineer is already booked to look at the dishwasher door: tomorrow, Wednesday 29 April, between 8am and 12pm. Our record shows the provider as Riverside Compliance, and you can reach them on 07700 900410 if you need to change the time. Please make sure someone is home to let them in. If the slot doesn't work or the visit doesn't happen, reply here and we'll sort it. We'll check in after the visit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not confirm the provider's identity or that they will attend.
- It does not establish the cause of the fault, a quote, or who pays.

## Remaining work
- Visit on 29/04 and a result or quote, owned by the provider.
- Agency follow-up on 30/04.
- Landlord approval if a quote is needed.

## Missing or unavailable information
- Which provider is actually attending: Riverside Compliance, Cedar Utilities or Harbour Homes.
- No provider confirmation of the 29/04 slot in the history beyond the system booking.

## Conflicts between sources
- Provider named as Riverside Compliance in the emails, but the call log says Cedar Utilities and the SMS says Harbour Homes. I trusted the system assignment.
- Tenant is Leo Turner in most records but Leo Kendall in the call log.
- The tenant's 28/04 request ignores the booked visit.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A provider has been assigned and a visit is booked for 29/04/2026 08:00-12:00. The tenant's 28/04 email is a duplicate. The visit result and any quote are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email reply to the tenant (done) confirming the existing visit, then a follow-up on 30/04 to check the result.

**3. Does anything need a human decision, and why?**

No. This is a routine duplicate. The name inconsistencies are noted and can be checked with the provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email 28/04 (event 021) asks for a visit; duplicate of open job, visit already booked 29… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-30","party":"Riverside Compliance / tenant","purpose":"Check visit on 29/04 happe… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
