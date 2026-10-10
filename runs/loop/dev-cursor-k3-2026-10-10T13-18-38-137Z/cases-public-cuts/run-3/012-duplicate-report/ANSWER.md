# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's latest email duplicates an open job whose visit is already booked for 29/04 8-12. I linked it rather than opening a new job, replied to the tenant with the existing booking, noted the record inconsistencies, set a follow-up for 30/04 and returned the job to auto.

## Where the case stands
Stage: visit. Engineer visit booked 29/04/2026 08:00-12:00 (Riverside Compliance). Tenant's latest email is a duplicate of the open job. Waiting for the visit and result.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the existing visit is 29/04 8-12 with Riverside Compliance, no duplicate job, reschedule number given | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Review on 30/04 whether the visit happened and what the result was | Riverside Compliance / tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for your message. An engineer is already booked to look at the dishwasher door: tomorrow, Wednesday 29/04/2026, between 8am and 12pm, with our provider Riverside Compliance. You don't need to do anything else, and we haven't opened a second job. If that time no longer works, please call the provider on 07700 900410. If the door is still not fixed after the visit, let us know and we'll follow up. We'll check in with you after the visit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply does not confirm the repair cause, cost or that the engineer will fix it on the day
- Provider attendance has not been confirmed by the provider in writing in the record

## Remaining work
- Visit result, quote if needed, and landlord approval of any quote (owner: agency ops)
- Follow-up 2026-04-30

## Missing or unavailable information
- Provider written confirmation of the 29/04 slot; consistent provider and tenant names

## Conflicts between sources
- Provider named as Riverside Compliance, Cedar Utilities (call) and Harbour Homes (SMS); trusted the assigned provider Riverside Compliance
- Tenant named Leo Turner vs Leo Kendall in event 016; trusted Leo Turner
- Event 012 note is addressed to Imogen Oakley, who is not otherwise in the case; treated as the agency's internal landlord-agreement record

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit stage; engineer visit booked 29/04/2026 08:00-12:00. Outstanding: the visit, result, and any quote with landlord approval.

**2. What is the next action, who is it for, and through which channel?**

Reply to Leo Turner by email with the existing booking (done), then follow up on 30/04 with provider and tenant for the result.

**3. Does anything need a human decision, and why?**

No. It is a routine duplicate; the landlord already agreed to an engineer. Quote approval would go to the landlord if one arises.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email event 021 duplicates open job; visit 29/04/2026 08:00-12:00 stands. Record inconsi… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-30","party":"Riverside Compliance / tenant","purpose":"Check visit on 29/04 happe… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
