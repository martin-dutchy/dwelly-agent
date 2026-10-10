# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for one other subcontractor to quote. No other contractor is named, so I recorded the first quote, moved the job to double_quotation, sent operations the scope to source a quote, told the landlord, and set a hold to 10 April.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First quote (Alder Compliance £1,370) recorded and with landlord; landlord asked for a second comparison quote; operations asked to source it.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Ask operations to source a second contractor quote on the same scope, reply by 10 April | Operations team, internal | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell landlord a second quote is being obtained, report back by 10 April, no work until approved | Langley, landlord | email | A4 ✅ |
| 3 | WAIT | Hold until 10 April for second quote | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Operations team (internal) via email, operations team** (verified)

> Please source one additional contractor (not Alder Compliance) to quote, quote only, for Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ (NBL-008-3466). Scope, itemised price per item: 1) repaint bedroom (and other rooms if needed); 2) replace burnt bedroom carpet; 3) replace bathroom flooring; 4) repair broken plug; 5) repair dripping bath tap; 6) repair damaged bathroom shelf. Also state VAT. Attachment: attachment-01-check-out-inspection-report.pdf (also attachment-03). Please reply by 2025-04-10. For comparison, the first quote is Alder Compliance (attachment-02-estimate.pdf), which proposes leaving the carpet; the landlord wants a like-for-like comparison.

**A4 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi Langley, yes, we're arranging one other contractor to quote for comparison, using the same scope and the check-out report. We'll aim to come back to you with the comparison by 10 April. The first estimate is on hold and no work will start until you approve. One note: it proposes leaving the bedroom carpet, whereas the original request was to replace it, so we've asked for a like-for-like quote.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor approved or spend committed
- Recording the quote does not approve it
- Second contractor not yet identified or instructed

## Remaining work
- Operations to source second quote by 10 April
- Then send both quotes to landlord for decision
- Ask Alder Compliance for readable VAT position and carpet price if needed

## Missing or unavailable information
- Second contractor's quote
- VAT position on first estimate
- Estimate is dated 3 April but sent to landlord 6 April; inspection report dated 5 January 2026 is after today's date

## Conflicts between sources
- Inspection report dated 5 January 2026 but signed 3 April 2025 (after today); estimate says carpet can stay despite request to replace it; estimate replaces tap although tap only dripping
- Landlord email says 'Morning' but sent 19:37

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote from Alder Compliance (£1,370, no VAT shown) is with the landlord, who asked for a comparison quote. Outstanding: the second quote, then the landlord's decision.

**2. What is the next action, who is it for, and through which channel?**

Operations team (internal email) to source the second quote by 10 April; landlord told by email.

**3. Does anything need a human decision, and why?**

No. Sourcing a second quote is routine; the landlord decides on the quotes once both are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord asked (event 009) for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Operations team","recipient_role":"internal","channel":"email","contact":"operations team","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","bo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Awaiting second quote being sourced by operations for landlord compa… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
