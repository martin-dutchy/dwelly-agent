# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for one other subcontractor to quote for comparison. No other contractor is named, so the job moved to double_quotation, the first estimate was recorded and held, and the landlord was told by email. No human decision is needed.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First estimate (Alder Compliance £1,370) recorded, not approved. Second quote being sourced at landlord's request.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | SPLIT_NEW_REQUEST | Moved job to double_quotation to source a second contractor for the same scope | internal | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told landlord a second quote is being obtained, nothing approved, scope gaps in first estimate flagged, update by 10 April | Landlord | email | A3 ✅ |
| 3 | WAIT | Hold until second quote arrives; review 2025-04-10 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, yes, we will get a second quote for Flat 5, 55 Lantern Quay for comparison. We have moved the job to the second-quote stage and are sourcing another contractor, using the same list of works and the check-out inspection report. Nothing is approved yet, and the first estimate stays on hold. Please note the first estimate (Alder Compliance, £1,370, no VAT shown) leaves the burnt bedroom carpet in place and replaces the bathroom tap rather than repairing it, so the second quote will be asked to price those items as originally requested. We will update you when the second quote arrives, and by Thursday 10 April at the latest on progress.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or any spend
- No second contractor has been instructed by name yet; stage change only
- Does not decide who pays or tenant deposit deductions

## Remaining work
- Source second contractor quote (maintenance team via double_quotation stage)
- Send both quotes to landlord for decision
- Clarify carpet and tap scope with quotes

## Missing or unavailable information
- Second contractor quote
- Whether first estimate includes VAT
- attachment-04-invoice.pdf present in files but not referenced in history

## Conflicts between sources
- Inspection report appointment date 5 January 2026 vs signature 3 April 2025 (before case date)
- Estimate omits carpet replacement and replaces the tap instead of repairing it, against the request
- Landlord email says 'Morning' but was logged at 19:37

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A routine job awaiting quotes. The first estimate (Alder Compliance, £1,370) was sent to the landlord, who wants a second quote for comparison. The second quote is outstanding and nothing is approved.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote is being obtained (sent). The job moved to double_quotation and is on hold with a review on 2025-04-10.

**3. Does anything need a human decision, and why?**

No. A second quote is routine. The landlord decides between quotes once both arrive.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, 6 Apr) asked for one other subcontractor to quote for comparis… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second contractor quote (same scope) requested by landlo… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
