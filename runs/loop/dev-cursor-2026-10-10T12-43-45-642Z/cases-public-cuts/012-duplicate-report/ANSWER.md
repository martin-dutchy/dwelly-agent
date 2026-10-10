# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's latest email duplicates an open job that already has a visit booked for 29 April 8am-12pm. I linked it to the existing ticket, replied to the tenant with the booking, noted the record conflicts, set a follow-up for 30 April and returned the job to auto mode.

## Where the case stands
Stage: visit booked for 29/04/2026 08:00-12:00 (system record). Tenant's new email is a duplicate chase. Waiting on the visit result; follow-up set for 2026-04-30.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the existing visit is on 29 April 8am-12pm, no new job opened, quote approval needed if repair required | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Wait for visit result; review 30 April | Riverside Compliance / tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo,
> 
> Thanks for getting in touch. Someone is already booked to look at the dishwasher door: our records show a visit tomorrow, Wednesday 29 April, between 8am and 12pm. The engineer's contact number is 07700 900410 if you need to change the time. We haven't opened a new job, as this one is already in hand. If they find it needs a repair, we'll need the landlord's approval for any quote before work starts. We'll check in with you after the visit, and if it's still not sorted by Friday 1 May, please reply here.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not confirm the engineer will fix the door or who pays.
- It does not resolve the provider and tenant name discrepancies.

## Remaining work
- Visit result and any quote to landlord for approval (agency)
- Confirm provider identity and tenant surname in records (agency)

## Missing or unavailable information
- Whether the provider is Riverside Compliance or Cedar Utilities

## Conflicts between sources
- Provider: Riverside Compliance (events 014-019) vs Cedar Utilities (event 016 call); trusted system record.
- Tenant surname Turner vs Kendall (event 016).
- SMS event 020 signed Harbour Homes vs Northbridge Lettings.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned and visit booked for 29/04/2026 08:00-12:00. The tenant's 28/04 email is a duplicate chase. The visit result, and any quote needing landlord approval, are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Reply to the tenant by email confirming the existing booking (done), then follow up with the provider and tenant on 30 April.

**3. Does anything need a human decision, and why?**

No. It is a routine duplicate and the visit is already booked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email event 021 duplicates open job; no new ticket. Record conflicts: provider named Riv… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-30","party":"Riverside Compliance / tenant","purpose":"Check visit on 29/04 happe… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
