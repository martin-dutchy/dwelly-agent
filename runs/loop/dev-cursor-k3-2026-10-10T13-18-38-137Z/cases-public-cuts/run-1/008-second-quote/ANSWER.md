# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for one other subcontractor to quote for comparison. I recorded the first quote, moved the job to double_quotation, told the landlord, and held to 10 April. No human decision is needed.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First quote (Alder Compliance £1,370) recorded, not approved. Landlord asked for a second comparison quote; we are sourcing a second provider.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | RECLASSIFY | Moved job to double_quotation so a second provider is sourced (no other contractor named in case) | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told landlord a second quote is being obtained, first is on hold, and asked for any preferred contractor; update by 10 April | Landlord | email | A3 ✅ |
| 3 | WAIT | Hold until 2025-04-10 for second quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we'll get a second quote for comparison for Flat 5, 55 Lantern Quay, using the same scope and inspection report. The first estimate is on hold and nothing is approved yet. Note the first estimate (£1,370, no VAT shown) leaves the bedroom carpet in place and includes a tap replacement, which differs from the original request. If you have a preferred contractor, please tell us their name. We'll update you by Thursday 10 April.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved; no spend committed
- Moving to double_quotation does not mean a second contractor has been instructed or has quoted
- Recording the quote does not validate its scope

## Remaining work
- Source second provider and send same scope plus inspection report for quote only
- Send both quotes to landlord for decision by review date
- Alder quote scope mismatch (carpet left, tap replaced, no VAT shown) to be clarified

## Missing or unavailable information
- No second contractor named in case
- Alder quote VAT status unclear
- Inspection report dates (Jan 2026) inconsistent with case dates (Apr 2025)
- Attachment-04 invoice listed in hints but not visible in history

## Conflicts between sources
- Estimate leaves the bedroom carpet but the request was to replace it; the estimate includes a tap replacement while the request was to repair it
- Inspection report dated Jan 2026 but signed Apr 2025
- Report says carpet burn is pre-existing while the request treats it as damage

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A first estimate of £1,370 (Alder Compliance) went to the landlord, who asked for a second comparison quote. A second quote is outstanding, then the landlord's decision.

**2. What is the next action, who is it for, and through which channel?**

Landlord emailed that a second quote is being obtained (A3). The job moved to double_quotation (A1) and is on hold to 2025-04-10 (A4). The second provider is sourced from that stage.

**3. Does anything need a human decision, and why?**

No. A second quote request is routine. The spend decision is the landlord's once both quotes are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second quote (comparison) requested by landlord; first q… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
