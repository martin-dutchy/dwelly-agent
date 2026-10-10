# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a second quote for comparison. I recorded the first estimate, moved the job to double_quotation, told the landlord by email, and put the job on hold until 9 April.

## Where the case stands
Stage double_quotation, on hold to 2025-04-09. First estimate (Alder Compliance, £1,370, no VAT itemised) sent to landlord; landlord asked for a second comparison quote. Nothing approved or booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved ticket to double_quotation and told landlord a second quote is being sourced, with update by 9 April | Landlord | email | A3 ✅ |
| 2 | WAIT | Hold until 2025-04-09 for the second quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we'll get a second quote for comparison on the same scope, with the check-out inspection report. The job has moved to the second-quote stage while we source another contractor. Nothing is approved or booked in the meantime. Please note the first estimate (£1,370, no VAT itemised) says the bedroom carpet can stay, whereas the original request was to replace it; we'll ask the second contractor to price it separately. If you have a contractor you'd prefer us to approach, please tell us. We'll update you by Wednesday 9 April.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the quote does not approve it
- Moving to double_quotation does not mean a second contractor has been instructed yet
- No work or visit is booked

## Remaining work
- Source a second provider for the same scope (ops, by 9 April)
- Landlord decision after comparing quotes
- Ask the second contractor to price the carpet separately

## Missing or unavailable information
- No second contractor named in the case
- Landlord's preferred contractor, if any
- The first estimate omits carpet replacement and includes a tap replacement, which the inspection report does not clearly support

## Conflicts between sources
- Inspection report is dated 5 January 2026, but the signature and estimate are dated April 2025. The estimate says the carpet can stay, which conflicts with the original request to replace it. The report calls the carpet burn pre-existing.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A routine check-out works estimate of £1,370 has gone to the landlord. The landlord wants a second quote. The job is at double_quotation and on hold until 9 April. The second quote and the landlord's decision are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote is being obtained (done). The job is on hold with a review on 9 April.

**3. Does anything need a human decision, and why?**

No. Asking for a second quote is routine. The landlord decides on approval once both quotes are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_quote` | {"ticket_ref":"NBL-008-3466","provider":"Alder Compliance","amount_gbp":1370,"vat":"none","items":["Sand, fill and paint bathroom with damp … | 1 | ✅ verified | Ticket NBL-008-3466 read back after record_quote |
| A2 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, email) asked for one other subcontractor to quote for comparis… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second contractor quote (comparison) requested by landlo… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
