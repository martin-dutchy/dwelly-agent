# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for one other subcontractor to quote for comparison. I recorded the first estimate, moved the job to double_quotation, told the landlord, and held the job until 9 April.

## Where the case stands
Stage double_quotation, on hold to 2025-04-09. First quote Q-101 (£1,370, Alder Compliance) with landlord, not approved. Second provider still to be sourced; landlord waiting on the comparison.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Email landlord confirming a second quote is being sourced, update by 9 April | Langley, landlord | email | A3 ✅ |
| 2 | WAIT | Hold until 2025-04-09 for second quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we are now sourcing a second contractor to quote the same scope for comparison, and we will send you their figure when we have it. The first estimate (Alder Compliance, £1,370, no VAT shown) stays on hold and nothing is approved or booked. Please note it says the bedroom carpet can stay, whereas the original request was to replace the burnt carpet, and it includes replacing the bath tap rather than repairing it. We will update you by 9 April 2025. Regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval or booking of works; the first quote is not approved
- Moving to double_quotation does not name or instruct a second contractor yet

## Remaining work
- Source a second contractor for the same scope and inspection report (agency maintenance)
- Report both quotes to the landlord by 2025-04-09
- Clarify the carpet and tap scope differences

## Missing or unavailable information
- No second contractor named in the case
- attachment-04-invoice.pdf listed but not in the history, not seen
- Inspection report dates (Jan 2026) conflict with the 2025 case dates

## Conflicts between sources
- Estimate omits carpet replacement and includes tap replacement, against the original request
- Inspection report dated Jan 2026 but signed April 2025

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A check-out works estimate (£1,370, Alder Compliance) has gone to the landlord, who wants a second comparison quote. Outstanding: second quote, then the landlord's decision.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming a second quote is being sourced, with an update by 9 April; the job moved to double_quotation and held.

**3. Does anything need a human decision, and why?**

No. Getting a second quote is routine. The landlord decides on the quotes later.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","bo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Other","comment":"Waiting for second contractor quote (comparison requested by landlord); first quote… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
