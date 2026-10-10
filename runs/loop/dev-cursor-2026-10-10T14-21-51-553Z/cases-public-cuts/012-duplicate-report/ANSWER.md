# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's 28/04 request is a duplicate of the open dishwasher job, which already has a visit booked for 29/04 8-12. I did not open a new ticket. I replied to the tenant with the booking, added a note recording the conflicting names and numbers, set a follow-up for 30/04 and returned the job to auto mode.

## Where the case stands
Single open ticket at visit stage. Provider visit booked for Wed 29/04/2026, 8am-12pm. Tenant's 28/04 email is a duplicate request. Awaiting visit outcome.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the repair is already booked for 29/04 8-12, how to rearrange, and that we will check in after the visit | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Follow up on 30/04 for the visit outcome from provider and tenant | Riverside Compliance / tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo,
> 
> Thanks for getting back in touch. Your dishwasher door repair is already booked, so we haven't opened a new job. An engineer from our maintenance provider is due tomorrow, Wednesday 29 April, between 8am and 12 noon, to look at the door and repair it if possible. If you can't make that slot, or need to change it, please call the provider on 07700 900410. If they find it needs a part or a quote, we'll come back to you. We'll check in with you after the visit, or sooner if anything changes.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not confirm the fix, the cause, any quote or who pays.
- The visit date comes from the system record; I did not re-confirm it with the provider in this run.

## Remaining work
- Visit on 29/04; record the result afterwards (agency ops, follow-up 30/04)
- If a quote is needed, record it and send it to the landlord for approval

## Missing or unavailable information
- Provider's own confirmation of the 29/04 slot
- Which provider name is correct

## Conflicts between sources
- Provider named as Riverside Compliance, Cedar Utilities and Harbour Homes. Treated as the same assigned provider because the address and job match.
- Tenant surname Turner vs Kendall (event 016). Treated as the same tenant.
- Contact number 07700 900763 (tenant, per the contractor email) vs 07700 900410 (provider, per the tenant email).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The ticket is at the visit stage. The visit is booked for 29/04/2026, 8am-12pm. The outcome, and any quote, are outstanding. The tenant's latest email repeats the original request.

**2. What is the next action, who is it for, and through which channel?**

Reply to the tenant by email confirming the existing booking (done). Then follow up on 30/04 for the visit result.

**3. Does anything need a human decision, and why?**

No. This is a routine duplicate on a job that is already booked. Nothing needs authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email 28/04 (event 021) is a duplicate of this open job; visit booked 29/04/2026 08:00-1… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-30","purpose":"Check visit outcome of 29/04 dishwasher visit with provider and te… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
