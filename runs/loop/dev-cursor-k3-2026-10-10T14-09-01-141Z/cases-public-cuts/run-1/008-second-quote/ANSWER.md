# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for one other quote for comparison. Moved the job to double_quotation, recorded the Alder Compliance £1,370 estimate, told the landlord (including that the earlier email lacked the estimate and the carpet is excluded), and put the job on hold to 10 April.

## Where the case stands
Stage double_quotation. First estimate (Alder Compliance £1,370) recorded and with landlord, who asked for a second comparison quote. Second provider being sourced; ticket on hold, review 2025-04-10. No approval, no work booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Email landlord confirming second quote is being sourced and giving first estimate details | Langley, landlord | email | A3 ✅ |
| 2 | WAIT | Hold until 10 April while second quote is sourced | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi Langley, yes, we'll get a second quote for comparison. We have no other contractor on file for this, so we're sourcing one now for the same scope, and will update you by 10 April. Apologies: our earlier email attached the inspection report twice rather than the estimate. The first estimate is from Alder Compliance: £1,370.00 total (no VAT itemised) for repainting the bathroom and main-room walls/ceiling, replacing the bathroom lino, and repairing the plug socket and shelf, plus a replacement bath tap. It says the main-room carpet can stay, so it does not include replacing the burnt carpet you asked about. Nothing is approved yet and no work is booked. If you have a preferred contractor for the second quote, please tell us.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it or the spend
- Moving to double_quotation does not name or instruct a second contractor
- Nothing is booked

## Remaining work
- Agency to source second provider and obtain quote by 10 April
- Landlord decision between quotes after both are received
- Landlord to confirm whether carpet replacement is still wanted

## Missing or unavailable information
- No second contractor named in case
- Event 006 did not actually attach the estimate

## Conflicts between sources
- Estimate omits the carpet replacement and includes a tap replacement, against the original scope
- Inspection report dated Jan 2026 versus an April 2025 case
- Event 006 said estimate attached but attached the inspection report twice

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Estimate of £1,370 received from Alder Compliance and with the landlord; landlord requested a second quote. Second quote outstanding; no approval or booking.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote is being sourced and giving the first estimate details; ticket moved to double_quotation and held to 10 April.

**3. Does anything need a human decision, and why?**

No. A second quote is routine. The landlord decides on the quotes once both are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, 6 Apr) asked for one other subcontractor to quote for comparis… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A3 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","bo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Second quote being sourced (same scope) at landlord's request; first… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
