# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote after receiving the £1,370 Alder Compliance estimate. I recorded the first quote, moved the job to double_quotation, told the landlord and put it on hold with review on 9 April.

## Where the case stands
Stage double_quotation, on hold until 2025-04-09. First quote (Alder Compliance £1,370) recorded but not approved. Landlord asked for a second quote; no second contractor is named in the case yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold until 9 April while a second contractor is sourced; then report to landlord | internal | internal | A4 ✅ |
| 2 | REPLY_TO_TENANT | Told landlord a second quote is being obtained, report back by 9 April | Landlord | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, thanks for your reply. Yes, we are getting a second quote for comparison. The job has moved to the stage where we source another contractor, using the same scope and check-out report. The first estimate is on hold and nothing has been approved. Please note it leaves the burnt bedroom carpet in place and includes a new bathroom tap, which differs from our original request, so we will ask the second contractor to price the original list. We will update you by 9 April 2025 with what we have.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved; no spend committed
- Second contractor not yet identified or instructed
- Quote VAT status unclear (none itemised)

## Remaining work
- Agency to source a second contractor and send the same scope and report for a quote only
- Compare quotes and report to landlord by 9 April

## Missing or unavailable information
- Name of a second contractor
- Whether the £1,370 includes VAT

## Conflicts between sources
- Inspection report dated 5 January 2026 but signed 3 April 2025; trusted as the report for this job.
- Estimate leaves carpet and replaces tap, differing from original request.
- Hints list an invoice attachment not referenced in the history; not seen.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A quote of £1,370 has been received and is unapproved. The landlord wants a comparison quote. The second quote is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Source a second contractor (job moved to double_quotation); the landlord has been emailed and the job is on hold until 9 April.

**3. Does anything need a human decision, and why?**

No. A second quote is routine. Approval of a quote stays with the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, email) asked for one other subcontractor to quote for comparis… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Second quote being sourced at landlord's request; first quote (Alder… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
