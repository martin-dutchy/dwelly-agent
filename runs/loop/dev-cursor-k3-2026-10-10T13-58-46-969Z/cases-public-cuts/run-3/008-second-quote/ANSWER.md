# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a second comparison quote. I recorded the first quote (£1,370), moved the job to double_quotation, told the landlord by email, and set a hold with a review date of 9 April.

## Where the case stands
Stage double_quotation, on hold to 2025-04-09. First quote (Alder Compliance £1,370) recorded, unapproved. Landlord asked for a second comparison quote; no other contractor is named, so the second provider is being sourced.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Emailed landlord confirming a second quote is being obtained; job moved to double_quotation | Langley, landlord | email | A3 ✅ |
| 2 | WAIT | Hold for second quote, review 2025-04-09 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi Langley, yes, we'll get a second quote for comparison. No other contractor is named on our file, so the job has moved to our second-quote stage and we'll source another provider using the same scope and the check-out report. The first estimate (£1,370, covering bathroom and main-room decorating, bathroom lino, plug, shelf and tap, with the bedroom carpet left in place) is on hold and nothing is approved. If you'd like a particular contractor to quote, please tell us. We'll update you by 9 April 2025.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Moving to double_quotation does not approve any quote or appoint a contractor.
- The £1,370 quote is recorded only, not approved.

## Remaining work
- Agency to source a second provider and send them the same scope and report, quote only.
- Report both quotes to the landlord by 2025-04-09.
- Landlord decision on which quote, if any, to approve.

## Missing or unavailable information
- No second contractor is named in the case.
- The attached estimate leaves the burnt carpet and replaces the tap, which differs from the request.
- Inspection report is dated 5 Jan 2026, after the request.

## Conflicts between sources
- The estimate scope differs from the request: it leaves the carpet and replaces the tap.
- The inspection report is dated 5 Jan 2026 but was signed 3 April 2025.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A quote from Alder Compliance (£1,370) is recorded but not approved. The landlord wants one more quote for comparison. A second provider is still to be sourced.

**2. What is the next action, who is it for, and through which channel?**

Reply to the landlord by email, which is done. The job has moved to double_quotation so a second provider is sourced, and the case is held to 2025-04-09.

**3. Does anything need a human decision, and why?**

No. A second quote is routine. The landlord decides on approval once both quotes are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","bo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second comparison quote (same scope) requested by landlo… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
