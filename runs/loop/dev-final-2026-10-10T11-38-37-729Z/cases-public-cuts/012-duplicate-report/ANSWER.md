# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant asked again for someone to look at the dishwasher door, but a visit is already booked for 29/04 8-12. I replied to the tenant with that, noted the record inconsistencies, set a follow-up for 30/04 and returned the job to auto mode.

## Where the case stands
Stage: visit. Engineer visit booked for 29/04/2026, 8am-12pm. Tenant's latest email (event 021) is a duplicate chase for the same job. Waiting on the visit result.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the visit is already booked for 29 April 8-12, no new request needed, and gave the provider's rearrange number | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Follow up on 30 April: visit outcome, and confirm which provider attends | Riverside Compliance / tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting back to us. An engineer is already booked to look at the dishwasher door tomorrow, Wednesday 29 April, between 8am and 12pm, so there's no need for a new request. If that doesn't suit, please call the provider on 07700 900410 to rearrange. If the engineer can't fix it on the day, we'll let you know the next steps.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not confirm the repair will succeed or who pays.
- No new ticket was created; the tenant's message is a duplicate of the open job.
- The provider's identity is not settled.

## Remaining work
- Visit on 29/04 and its result, then a quote or invoice if needed (agency/provider)
- Confirm provider identity and tenant surname in the records (agency)

## Missing or unavailable information
- Whether the attending firm is Riverside Compliance or Cedar Utilities

## Conflicts between sources
- Provider: Riverside Compliance (events 014-019) vs Cedar Utilities (event 016 call). I trusted the system assignment and flagged it.
- Tenant surname: Turner vs Kendall in event 016.
- Event 020 SMS is signed Harbour Homes, not Northbridge.
- Visit time: 08:00 in the system line vs the 8-12 slot in the emails. I used the 8-12 slot.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A provider is assigned and the visit is booked for 29/04/2026 8-12. Troubleshooting failed. The visit result, and any quote or approval that follows, is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Reply to Leo, the tenant, by email that the visit is already booked (done). Follow up on 30/04 on the visit result.

**3. Does anything need a human decision, and why?**

No. This is a duplicate chase on a booked job. The provider-name mismatch is noted for checking at follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email event 021 duplicates open job; visit 29/04/2026 8-12 already booked. Record confli… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-30","party":"Riverside Compliance / tenant","purpose":"Check visit on 29/04 happe… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
