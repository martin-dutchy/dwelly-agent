# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for one other subcontractor to quote for comparison. I recorded the first estimate (£1,370), moved the job to double_quotation, told the landlord, and held the job with a review on 2025-04-10.

## Where the case stands
Stage double_quotation, on hold until 2025-04-10. First estimate (Alder Compliance £1,370) recorded, not approved. Landlord asked for a second quote and has been told. Second contractor still to be sourced.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told landlord a second quote is being obtained, the first stays on hold, and they will hear by 2025-04-10 | Landlord | email | A3 ✅ |
| 2 | WAIT | Hold until 2025-04-10 for the second contractor's quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, thank you for your reply. Yes, we are getting a second quote from another contractor for the same works, so you can compare. The first estimate (£1,370, no VAT itemised) stays on hold and nothing is approved or booked until you decide. Please note it leaves the bedroom carpet in place and includes a new bath tap, which differs from our original request; we will ask the second contractor to price the full list. We will update you by 2025-04-10 with what we have.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Moving to double_quotation does not approve any spend or assign a contractor
- The first estimate is recorded but not approved
- No second contractor has been instructed yet, as none is named in the case

## Remaining work
- Source and brief a second contractor with the same scope and inspection report (quote only), owner: agency, by 2025-04-10
- Send both quotes to the landlord for decision
- Tidy-up: estimate omits carpet replacement and includes the tap replacement that the original request did not ask for

## Missing or unavailable information
- No second contractor named in the case
- Estimate has no VAT detail
- attachment-04-invoice.pdf listed in hints but not provided; no visit has happened

## Conflicts between sources
- The estimate says the carpet can stay and includes a tap replacement, while the original request and inspection report asked for carpet replacement and a tap repair. Flagged to the landlord.
- Inspection report dated 5 January 2026 (signed 3 April 2025) is later than the case date. Treated as a date anomaly and not relied on.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The first estimate (Alder Compliance, £1,370) is with the landlord. They have asked for a second quote, so the job is now in double_quotation on hold. Outstanding: the second quote, then the landlord's decision.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote is being obtained (sent). Next, a second contractor is sourced at the double_quotation stage, with a review on 2025-04-10.

**3. Does anything need a human decision, and why?**

No. A second-quote request is routine. The landlord decides on approval once both quotes are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hello, thank you for y… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second contractor quote for comparison, as requested by … | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
