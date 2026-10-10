# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote for comparison. Recorded the first quote, moved the job to double_quotation, told the landlord, and held to 2025-04-10.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First quote (Alder Compliance £1,370) sent to landlord, not approved. Landlord asked for a second comparison quote; second provider still to be sourced.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Emailed landlord confirming a second quote is being sourced; job moved to double_quotation | Landlord | email | A3 ✅ |
| 2 | WAIT | Hold until 2025-04-10 for second quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, thanks for your reply. Yes, we'll get a second quote for comparison. As no other contractor is named on this job, we're sourcing another one now, using the same list of works and the check-out report. The first estimate (Alder Compliance, £1,370, no VAT shown) stays on hold and nothing is approved or booked. Please note that estimate leaves the bedroom carpet in place and replaces the bathroom tap, which differs from the original request; we'll make sure the second quote covers the original list. If you have a contractor you'd prefer us to ask, please tell us. We'll update you by 2025-04-10.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved, assigned or booked.
- The recorded quote does not mean the landlord accepts it.
- Second quote not yet obtained.

## Remaining work
- Source second contractor for the same scope (agency maintenance); review 2025-04-10
- Landlord decision after comparing quotes

## Missing or unavailable information
- No second contractor named in the case
- Whether Alder Compliance quote includes VAT
- Attachment-04 invoice not seen in history

## Conflicts between sources
- Estimate leaves carpet and replaces tap, differing from the original request
- Inspection report dated 5 Jan 2026 but signed April 2025

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The first quote of £1,370 (Alder Compliance) has gone to the landlord. The landlord wants one other subcontractor to quote for comparison. The second quote and the landlord's decision are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming a second quote is being sourced (A3), with the job moved to double_quotation (A2) and held to 2025-04-10 (A4).

**3. Does anything need a human decision, and why?**

No. Getting a second quote is routine. The landlord decides later which quote to take.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, email 06/04) asked for one other subcontractor to quote for co… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Second comparison quote being sourced at landlord's request (event 0… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
