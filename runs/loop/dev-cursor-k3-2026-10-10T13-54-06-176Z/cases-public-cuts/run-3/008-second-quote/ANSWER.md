# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote after receiving the first. Recorded Alder's £1,370 estimate, moved job to double_quotation, told landlord, and held to 10 April.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First quote (Alder Compliance £1,370) recorded, not approved. Landlord asked for a second comparison quote; we are sourcing one. No tenant (vacated).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved job to double_quotation to source a second provider (none named in case) | internal | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told landlord the second quote is being obtained, first quote on hold, flagged scope differences, asked for preferred contractor, report back by 10 April | Landlord | email | A3 ✅ |
| 3 | WAIT | Hold until 2025-04-10 for second quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we are now sourcing a second quote for comparison for Flat 5, 55 Lantern Quay, using the same scope and check-out inspection report. The first quote (Alder Compliance, £1,370, no VAT itemised) is on hold and nothing is approved. Please note our first email attached the inspection report twice rather than the estimate, so we'll resend the estimate with the comparison. Two points to be aware of: that estimate says the bedroom carpet can stay (we asked for replacement) and includes replacing the bathroom tap (we asked for a repair). If you have a preferred contractor for the second quote, please tell us. We'll report back by Thursday 10 April.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved; recording the quote does not accept it
- Second quote not yet requested from a named contractor
- Does not establish whether the £1,370 includes VAT

## Remaining work
- Source second contractor and send same scope plus report for quote only
- Resend estimate to landlord (event 006 attached inspection report twice)
- Review on 2025-04-10 and put both quotes to landlord
- Clarify carpet and tap scope differences

## Missing or unavailable information
- Second contractor name
- Whether Alder's £1,370 includes VAT
- Original provider never replied directly; estimate came via attachment

## Conflicts between sources
- Estimate omits carpet replacement and includes tap replacement vs original request
- Event 006 said estimate attached but attached the inspection report twice
- Inspection report dated 5 Jan 2026 and signed 3 April 2025, after/before the case dates inconsistently; carpet burn described as pre-existing in one version

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote stage: one estimate (£1,370) received, landlord wants a second for comparison. Second quote, and then the landlord decision, are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Source a second contractor (stage double_quotation); landlord told by email (MSG-102); hold review 2025-04-10.

**3. Does anything need a human decision, and why?**

No. Second quote is routine; the landlord decides on the quotes later.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second comparison quote (landlord request, event 009); f… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
