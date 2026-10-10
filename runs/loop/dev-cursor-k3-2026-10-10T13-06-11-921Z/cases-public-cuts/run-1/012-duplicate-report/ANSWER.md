# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's 28/04 email asks for an engineer, but the one open job already has a visit booked for 29/04 8-12. I linked it to the open job rather than creating a duplicate, replied to the tenant, noted the record inconsistencies, and set a follow-up for 30/04.

## Where the case stands
Stage: visit. Engineer visit booked for 29/04/2026 08:00-12:00 (event 017). The tenant's latest email is a duplicate chase. We are waiting for the visit and its result.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told the tenant the visit is already booked for 29/04 8-12 and that no second job was opened | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Follow up on 30/04 for the visit result or quote and to confirm the provider's identity | Riverside Compliance / tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo,
> 
> Thanks for getting back to us. An engineer is already booked to look at your dishwasher door: Wednesday 29/04/2026, between 8am and 12pm, with Riverside Compliance (07700 900410 if you need to change anything). You don't need to do anything further, and we haven't opened a second job. If the visit is missed or the door still won't close afterwards, just reply here and we'll follow it up. We'll check the outcome after the visit on 29 April.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not confirm the cause of the fault, a repair, a quote or who pays.
- The visit is not confirmed as attended until the provider or tenant reports on it.
- No landlord approval for any quote has been sought or given yet.

## Remaining work
- The visit on 29/04, then record the result and any quote, and send the quote to the landlord for approval.
- Follow-up on 30/04 (agency).

## Missing or unavailable information
_None._

## Conflicts between sources
- The provider is named as Riverside Compliance in the system emails but as Cedar Utilities (Grant) in the call record, and the SMS is signed Harbour Homes. I trusted the system assignment, Riverside Compliance.
- The tenant is Leo Turner in most records but Leo Kendall in the call record.
- The visit is recorded as 08:00 in the system and as a 8-12 window in the emails. I treated it as an 8-12 window.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A visit is booked for 29/04/2026 8-12. The tenant's latest email is a duplicate chase. The visit result and any quote are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Leo Turner, the tenant, confirming the existing booking (done). Then a follow-up on 30/04 to check the visit outcome.

**3. Does anything need a human decision, and why?**

No. This is a routine duplicate. The name inconsistencies are noted and can be checked at the follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","body":"Hi Leo,\n\n… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email 28/04 13:52 is a duplicate chase of the open job; visit 29/04/2026 08:00-12:00 alr… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-30","party":"Riverside Compliance / tenant","purpose":"Check the visit on 29/04 h… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
