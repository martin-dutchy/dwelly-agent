# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for one other contractor to quote for comparison. Moved ticket to double_quotation, told the landlord (including the first estimate's differences and that the earlier email mis-attached the report), and held to 2025-04-10.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. Landlord asked for a second comparison quote; first estimate (Alder Compliance £1,370) not approved. Second provider being sourced.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | SEND_QUOTE_FOR_APPROVAL | Told landlord a second quote is being obtained, with first estimate details and report back date 2025-04-10 | Landlord | email | A2 ✅ |
| 2 | WAIT | Hold until 2025-04-10 for second quote | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, yes, we will get a second quote for comparison for Flat 5, 55 Lantern Quay, using the same scope (repaint, burnt bedroom carpet, bathroom flooring, plug, bath tap, bathroom shelf). We are sourcing another contractor now and the first estimate is on hold, nothing is approved. Apologies: our earlier email attached the inspection report twice instead of the estimate. The first estimate is from Alder Compliance for £1,370.00 (no VAT shown); note it leaves the bedroom carpet in place and includes replacing the bath tap, which differs from our request. We will update you by 2025-04-10 with the second quote. If you have a contractor you would like us to use, please tell us.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved; no spend committed
- Moving to double_quotation does not name or instruct a second contractor
- Estimate not checked for VAT or scope match

## Remaining work
- Agency to source second contractor and obtain quote on same scope
- Review 2025-04-10 and report to landlord
- Landlord to decide between quotes

## Missing or unavailable information
- No second contractor named in the case
- Landlord's contractor preference

## Conflicts between sources
- Event 006 said estimate attached but attached the inspection report twice
- Estimate omits carpet replacement and includes tap replacement, unlike the request
- Inspection report dated 5 Jan 2026 but signed 3 April 2025

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Estimate from Alder Compliance (£1,370, not approved) went to the landlord, who asked for a second quote. Outstanding: second quote, then landlord decision.

**2. What is the next action, who is it for, and through which channel?**

Source the second quote (ticket moved to double_quotation); landlord told by email; review 2025-04-10.

**3. Does anything need a human decision, and why?**

No. The routine second-quote step is handled; the landlord decides on spend later.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, email) asked for one other subcontractor to quote for comparis… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Second comparison quote being sourced at landlord's request (event 0… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
