# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant chased a dishwasher repair that already has a visit booked for 29/04 8am-12pm. I treated it as a duplicate, told the tenant about the booking, noted the record inconsistencies, returned the job to auto mode and set a follow-up for 30/04.

## Where the case stands
Stage: visit. Engineer visit recorded for 29/04/2026 08:00-12:00 (event 017). Tenant's latest email (event 021) duplicates the open job. Waiting on the visit and its result.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the visit is already booked for 29/04 8am-12pm, no new job opened, and how to rearrange | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Follow-up on 30/04 to record the visit result and chase provider and tenant if needed | Provider and tenant | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting back to us. An engineer is already booked to look at the dishwasher door: Wednesday 29/04/2026, between 8am and 12pm, with Riverside Compliance. You don't need to do anything else, and we haven't opened a second job. If the time doesn't suit, call the provider on 07700 900410 to rearrange. If it still isn't sorted after the visit, let us know. We'll be in touch after the visit, or sooner if anything changes.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply confirms the existing booking only; it does not confirm the cause, the cost or who pays.
- No quote or landlord approval for repair work exists yet.
- Nothing here confirms the visit will happen or has happened.

## Remaining work
- Visit on 29/04, then record the work result
- If a quote is needed, send it to the landlord for approval
- Check the provider and contact record inconsistencies

## Missing or unavailable information
- Which provider is actually attending (Riverside Compliance, Cedar Utilities or Harbour Homes)
- The correct provider contact number

## Conflicts between sources
- Provider named as Riverside Compliance, Cedar Utilities and Harbour Homes across events
- Tenant surname Turner vs Kendall (event 016)
- Provider/tenant contact numbers differ (07700 900763 vs 07700 900410)
- Trusted the system visit record (event 017) and the Riverside Compliance assignment.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A visit is booked for 29/04/2026 08:00-12:00. The visit result, any quote and landlord approval are outstanding. The landlord had already agreed an engineer could attend (event 008).

**2. What is the next action, who is it for, and through which channel?**

Reply to the tenant by email confirming the existing booking (sent), then follow up on 30/04 on the visit outcome.

**3. Does anything need a human decision, and why?**

No. This is a routine duplicate chase. The provider-name and number mismatches are noted and will be checked at follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email 28/04 (event 021) is a duplicate chase of the open job; visit 29/04 08:00-12:00 al… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-30","purpose":"Check visit on 29/04 happened; record work result, ask provider/te… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
