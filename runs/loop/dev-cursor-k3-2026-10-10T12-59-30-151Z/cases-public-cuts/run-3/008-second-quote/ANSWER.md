# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for another subcontractor to quote for comparison. I recorded the first quote, moved the job to double_quotation, told the landlord, and held the job to 9 April.

## Where the case stands
Stage double_quotation, on hold to 2025-04-09. Landlord asked for a comparison quote; first quote (Alder Compliance £1,370) recorded but not approved. Waiting on a second provider being sourced.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved job to double_quotation so a second provider is sourced for the same scope | internal | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told landlord a second quote is being obtained, first stays on hold, update by 9 April | Landlord | email | A3 ✅ |
| 3 | WAIT | Hold until 2025-04-09 for second quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we'll get a second quote for comparison from another contractor, using the same scope and the check-out inspection report. The first estimate (£1,370, from Alder Compliance) stays on hold and nothing is approved or booked until you decide. If you have a preferred contractor you'd like us to use, let us know. We'll update you by 9 April 2025.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not approve the £1,370 quote or any spend
- Does not assign or book any contractor
- Second quote not yet requested from a named contractor (none named in case)

## Remaining work
- Source second provider and send same scope plus inspection report for quote only (maintenance team)
- Report both quotes to landlord by 2025-04-09 and await decision

## Missing or unavailable information
- No second contractor named in the case; landlord preferred contractor not known
- Estimate omits the burnt carpet replacement and includes a tap replacement, differing from the request

## Conflicts between sources
- Inspection report dated 5 Jan 2026 but signed/issued April 2025
- Estimate leaves carpet in place, contrary to the request; includes tap replacement though request was a repair
- Landlord reply says 'Morning' but arrived 19:37

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Check-out works estimate (£1,370, Alder Compliance) sent to landlord; landlord wants a second quote. Outstanding: second quote, then landlord decision.

**2. Next action, recipient, channel?**

Email to the landlord confirming a second quote is being obtained (done, A3), and the job moved to double_quotation (A2). Held to 2025-04-09 (A4).

**3. Does anything need a human decision?**

No. Second-quote sourcing is routine. The landlord decides on spend later. The quote scope mismatch (carpet left, tap replaced) should be clarified in the second quote.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second comparison quote (same scope) requested by landlo… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
