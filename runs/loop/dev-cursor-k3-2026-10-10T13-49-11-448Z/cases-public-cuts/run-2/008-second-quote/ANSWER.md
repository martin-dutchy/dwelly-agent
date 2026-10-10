# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord replied to the estimate asking for one other subcontractor to quote. Recorded the £1,370 estimate, moved the job to double_quotation, told the landlord, and held until 2025-04-10.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First quote (Alder Compliance £1,370) recorded, not approved. Landlord asked for a second comparison quote; no other contractor named yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved job to double_quotation so a second provider is sourced for a quote only | internal | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told landlord a second quote is being obtained, first held, update by 2025-04-10, and asked for a preferred contractor | Landlord | email | A3 ✅ |
| 3 | WAIT | Hold until 2025-04-10 for the second quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, thanks for your reply. Yes, we will get a second quote for Flat 5, 55 Lantern Quay for comparison, using the same scope and the check-out inspection report. The first estimate (£1,370, no VAT itemised) stays on hold and nothing will go ahead until you approve. If you have a contractor you would like us to use for the second quote, please tell us. We will update you by 2025-04-10.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval of any quote or spend; no contractor instructed for works
- Second provider not yet sourced or contacted
- No tenant to message: tenant has vacated

## Remaining work
- Source second provider and obtain quote for the same scope (owner: agency, by 2025-04-10)
- Send both quotes to landlord for decision
- Clarify the first quote's scope differences and VAT

## Missing or unavailable information
- Second contractor's identity
- Whether Alder's £1,370 includes VAT

## Conflicts between sources
- Estimate omits carpet replacement and includes tap replacement, differing from the original request; the inspection report is dated 5 January 2026 yet signed 3 April 2025. Estimate treated as the provider's scope; flagged for comparison.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A first estimate of £1,370 (Alder Compliance) went to the landlord, who wants a second quote. Outstanding: second quote, then landlord decision.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote, plus a move to double_quotation to source the second provider; review 2025-04-10.

**3. Does anything need a human decision, and why?**

No. Sourcing a second quote is routine; the landlord makes the approval decision later.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hello, thanks for your… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Second quote being sourced at landlord's request; first quote held, … | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
