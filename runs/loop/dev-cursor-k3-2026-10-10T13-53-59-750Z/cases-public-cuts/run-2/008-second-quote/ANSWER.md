# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote after receiving the £1,370 estimate. Recorded the first quote, moved the job to double_quotation, told the landlord, set a follow-up for 10 April and returned the job to auto mode.

## Where the case stands
Stage double_quotation. First quote (Alder Compliance, £1,370) recorded, not approved. Landlord asked for a second quote; we are sourcing a second provider and will update by 2025-04-10.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told landlord a second quote is being sourced, first on hold, update by 10 April | Landlord | email | A3 ✅ |
| 2 | WAIT | Follow-up to report on second quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we're sourcing a second contractor to quote for comparison on the same check-out works at Flat 5, 55 Lantern Quay. The first estimate stays on hold and nothing is approved or booked until you decide. Note the first estimate quotes the main-room carpet staying rather than being replaced, and doesn't itemise VAT; we'll ask the second contractor to price the full original list and clarify VAT. If you have a preferred contractor, tell us their name. We'll update you by Thursday 10 April.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved; no work is booked
- Recording the quote does not mean it is acceptable
- No second contractor is yet instructed

## Remaining work
- Source second contractor for a quote only (scope: full original list) - agency ops, by 10 April
- Landlord decision between quotes after both are in

## Missing or unavailable information
- No second contractor named in the case
- VAT status of first estimate unclear
- attachment-04-invoice.pdf was not visible in history

## Conflicts between sources
- Estimate says carpet can stay and tap replaced, versus the original request to replace the carpet and repair the tap
- Inspection report dated Jan 2026 and signed 3 April 2025; the estimate is dated 3 April 2025
- Event 006 says estimate attached, but the attachments are inspection reports

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A first estimate of £1,370 is with the landlord, who asked for one more quote for comparison. Outstanding: sourcing the second quote and then the landlord's decision.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote is being sourced (sent). Job moved to double_quotation so a second provider is sourced.

**3. Does anything need a human decision, and why?**

No. A second quote is routine. The landlord decides later on which quote to approve.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-04-10","party":"Landlord","purpose":"Report on second quote status to landlord; source second pr… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-008-3466"} | 1 | ✅ verified | Ticket NBL-008-3466 read back after resume_auto |

## Failed or unverified actions
_None._
