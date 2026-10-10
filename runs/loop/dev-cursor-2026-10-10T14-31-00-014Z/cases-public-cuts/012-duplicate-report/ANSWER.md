# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's 28/04 email is a repeat of the open dishwasher job, so no new ticket was opened. I told the tenant the visit is booked for 29/04 08:00-12:00 and how to rearrange. I added a note and set a follow-up for 30/04.

## Where the case stands
Stage: visit. Riverside Compliance is booked for Wed 29/04/2026, 08:00-12:00. The tenant's latest email (event 021) repeats the open report. Waiting on the visit result; follow-up set for 30/04.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told the tenant the job is already open and the engineer is booked for 29/04 08:00-12:00, with how to rearrange and when they will next hear from us | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Wait for the 29/04 visit outcome; check on 30/04 | Riverside Compliance, provider | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo,
> 
> Thanks for getting back in touch. Your dishwasher door repair is already booked, so we haven't opened a second job. The engineer from Riverside Compliance is due tomorrow, Wednesday 29 April, between 8am and 12pm, to look at the door and repair it if they can. Please make sure someone is home to let them in. If that doesn't suit, call them on 07700 900410 to rearrange, and let us know too.
> 
> If they need a quote or a return visit, we'll update you. We'll be in touch after the visit, or on Thursday 30 April if you haven't heard from us.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reply does not confirm the cause of the fault or that it will be fixed on the visit.
- It does not approve any quote or cost.
- The provider has not been re-confirmed since event 016; the booking rests on the system record.

## Remaining work
- Record the visit result after 29/04
- If a quote is needed, send it to the landlord for approval
- Invoice and final checks, then close

## Missing or unavailable information
_None._

## Conflicts between sources
- The provider is named as Riverside Compliance, Cedar Utilities (Grant) and Harbour Homes (SMS), and the tenant as Leo Turner or Leo Kendall. I treated them as the same provider, tenant and agency.
- Event 004 says it was unclear whether 'door won't close' meant the dishwasher. The tenant has since confirmed it does.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A visit is booked for 29/04/2026 08:00-12:00 with Riverside Compliance. The tenant's latest message is a duplicate chase. The visit result is outstanding, plus any quote or invoice.

**2. What is the next action, who is it for, and through which channel?**

Reply to Leo Turner (tenant) by email confirming the existing booking, then wait for the visit result and follow up on 30/04.

**3. Does anything need a human decision, and why?**

No. This is a routine duplicate with a visit already booked and landlord agreement noted in event 008.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email 28/04 (event 021) is a repeat of the open job, not a new issue. Linked, no new tic… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-30","party":"Riverside Compliance / tenant","purpose":"Check outcome of 29/04 dis… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
