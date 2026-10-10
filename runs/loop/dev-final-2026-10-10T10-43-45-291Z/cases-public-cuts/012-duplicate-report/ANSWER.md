# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's new email duplicates the open dishwasher job, which already has a visit booked for 29/04 8-12. I replied to the tenant with the booking details, noted the record inconsistencies and returned the job to auto mode. No new ticket was created.

## Where the case stands
Ticket at visit stage. Engineer visit booked Wed 29/04/2026 8-12. Tenant's latest email is a duplicate chase. Waiting on the visit result.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the job is already open and the visit is tomorrow 8-12, with the rescheduling number | Leo Turner, tenant | email | A1 ✅ |
| 2 | OTHER | Noted the duplicate and the name inconsistencies on the ticket, and returned it to auto mode | internal | internal | A2 ✅ |
| 3 | WAIT | Wait for the 29/04 visit result, then record it | internal | internal | — |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting back to us. Your dishwasher job is already open and an engineer is booked to look at it tomorrow, Wednesday 29 April, between 8am and 12pm. You don't need to do anything else, just make sure someone can give access. If that time no longer works, call the engineer on 07700 900410 to rearrange. If the engineer can't fix it on the day, they will tell us and we'll arrange the next step.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not confirm the cause of the fault, a repair, cost or who pays.
- No new ticket was created, as the issue is already open.
- The visit is not confirmed as attended.

## Remaining work
- Visit tomorrow 29/04 8-12, then record the result
- A quote and landlord approval may be needed if the engineer finds a repair is required
- Ops to confirm which contractor is attending

## Missing or unavailable information
- Property record has no landlord, spend limit or contractor details
- Contractor identity is inconsistent across messages

## Conflicts between sources
- The contractor is named as Riverside Compliance, Cedar Utilities (Grant) and Harbour Homes (SMS sender). I trusted the assignment and booking emails, which name Riverside Compliance.
- The tenant is named as Leo Turner and Leo Kendall. I used Leo Turner, as in the agency emails.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The troubleshooting failed, the landlord agreed an engineer, and the visit is booked for 29/04 8-12. The visit result, and any quote or approval that follows, is outstanding.

**2. What is the next action, who is it for, and through which channel?**

I emailed the tenant, Leo Turner, to confirm the existing booking. No new job was raised.

**3. Does anything need a human decision, and why?**

No. This is a routine duplicate and the visit is already booked. The contractor name mismatch is noted for ops.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email 28 Apr (event 021) duplicates open job; visit already booked 29/04 8-12. No new ti… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
