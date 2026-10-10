# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a comparison quote after receiving the first estimate. I recorded the £1,370 Alder Compliance quote, asked the landlord for a preferred contractor, and put the job on hold with a review on 2025-04-09. Nothing is approved and no human decision is needed.

## Where the case stands
Ticket at mp_time, on hold waiting for landlord. Alder Compliance quote £1,370 recorded (Q-101) but not approved. Landlord asked for a second quote for comparison. We asked whether they have a preferred contractor. Review 2025-04-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord for a preferred contractor for the comparison quote, otherwise we approach another contractor | Landlord | email | A2 ✅ |
| 2 | WAIT | Hold until 2025-04-09, then chase or send scope to another contractor | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Landlord (landlord) via email, agency landlord record** (verified)

> - Do you have a preferred contractor we should ask for a comparison quote? If not, we will ask another contractor to quote for the same scope.
> 
> Why: You asked for a second quote. The first estimate is £1,370 (VAT not itemised) from Alder Compliance. It covers bathroom and main-room decorating, bathroom lino, plug socket, shelf and tap, and leaves the main-room carpet in place. Our earlier email attached the inspection report rather than the estimate, so we will resend the estimate. No decision on the first quote is needed yet, and nothing will be instructed until you approve.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or any spend
- No second contractor has been instructed and no visit is booked
- The estimate's VAT status is unknown (none itemised)

## Remaining work
- Get the second quote (the landlord's preferred contractor, or another from us)
- Resend the estimate to the landlord, as event 006 attached only the inspection report
- Landlord decision on the quotes
- Clarify the estimate scope: carpet replacement not included though requested; tap replaced rather than repaired
- The inspection report is dated 5 Jan 2026 but signed April 2025; date anomaly to check

## Missing or unavailable information
- Landlord's preferred contractor
- VAT status of the estimate
- Landlord's contact details are in the system only

## Conflicts between sources
- Estimate leaves the carpet in place and replaces the tap, differing from the request
- Event 006 attached the inspection report instead of the estimate
- Inspection report date (Jan 2026) is after the case date (Apr 2025)
- Hint lists an invoice attachment that is not in the history

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A routine post-tenancy works job. One quote (£1,370, Alder Compliance) is recorded and not approved. The landlord wants a second quote. Outstanding: the comparison quote and the landlord's decision.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for a preferred contractor, otherwise we approach another one (A2). Hold and follow-up are set for 2025-04-09.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord holds the approval decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `request_information` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Do you have a pr… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord wants a second quote; asked for preferred contractor. First… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-04-09","party":"Landlord","purpose":"Chase for preferred contractor; otherwise send scope to ano… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
