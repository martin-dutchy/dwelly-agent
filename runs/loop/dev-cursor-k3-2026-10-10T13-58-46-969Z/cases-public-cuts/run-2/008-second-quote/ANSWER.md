# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for one other subcontractor to quote for comparison. I recorded the first quote, moved the job to double_quotation, told the landlord, and put the job on hold to 10 April. No human decision is needed.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First quote (Alder Compliance £1,370, no VAT shown) recorded but not approved. Landlord asked for a second comparison quote. We are waiting for a second provider to be sourced.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told landlord a second quote is being obtained, first quote on hold, will update by 10 April, and asked for any preferred contractor | Landlord | email | A4 ✅ |
| 2 | WAIT | Hold until 10 April for the second quote | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, yes, we'll get a second quote for comparison on the check-out works at Flat 5, 55 Lantern Quay (same scope plus the inspection report). We're moving the job to the second-quote stage now and will update you once it arrives, or by Thursday 10 April at the latest. Nothing is approved yet and the first quote (£1,370, Alder Compliance, no VAT shown) is on hold. Our earlier email attached the inspection report twice rather than the estimate, sorry. We'll resend the estimate with the update. Note it leaves the burnt carpet in place and replaces the bathroom tap, unlike the original request. If you have a preferred contractor for the second quote, please tell us.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Moving to double_quotation does not approve any spend or choose a contractor
- The first quote is not approved
- No second contractor has been instructed yet

## Remaining work
- Source second contractor and send same scope plus inspection report for a quote only (ops, by 10 April)
- Resend the estimate to landlord (the earlier email attached the report twice)
- Ask for VAT status and clarify carpet and tap scope differences

## Missing or unavailable information
- No second contractor named in the case
- VAT status of first quote
- Whether landlord saw the estimate

## Conflicts between sources
- Estimate leaves the carpet while the request asked to replace it; it replaces the tap where the request said repair
- Inspection report dated 5 Jan 2026 but signed 3 Apr 2025
- Event 006 attached the inspection report twice, not the estimate

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A first quote of £1,370 from Alder Compliance exists and is unapproved. The landlord wants a second comparison quote, which is still to be sourced. The estimate scope differs from the request: it leaves the carpet and replaces the tap.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote is being obtained (sent). The job is moved to double_quotation, because no other contractor is named in the case. Review on 10 April.

**3. Does anything need a human decision, and why?**

No. Obtaining a second quote is routine. The landlord's approval will be needed later once the quotes are compared.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `add_note` | {"entity":"NBL-008-3466","note":"Conflicts: estimate omits carpet replacement requested and includes tap replacement (request said repair); … | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hi, yes, we'll get a s… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second comparison quote (landlord request event 009); fi… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
