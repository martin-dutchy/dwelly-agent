# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for a second quote after receiving the first estimate. With no other contractor named, I moved the job to double_quotation, told the landlord it is under way (report back by 10 April), and put the job on hold with a review date of 10 April.

## Where the case stands
Ticket NBL-008-3466 at double_quotation, on hold until 2025-04-10. First estimate (Alder Compliance £1,370) awaits a landlord decision; landlord asked for a comparison quote. Property is vacant, so no tenant messages.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved ticket to double_quotation so a second provider is sourced | internal | internal | A1 ✅ |
| 2 | REQUEST_INFORMATION | Emailed landlord confirming the second quote, report-back date 10 April, and the first estimate's details | Langley, landlord | email | A2 ✅ |
| 3 | WAIT | Hold for second quote, review 2025-04-10 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Langley (landlord) via email, agency landlord record** (verified)

> Hi Langley, yes, we'll get a second quote for comparison. We're sourcing another contractor now, using the same scope (repaint bedroom and other rooms if needed, replace burnt bedroom carpet, replace bathroom flooring, repair plug, bath tap and bathroom shelf) plus the check-out report. We'll report back by 10 April. Apologies: our earlier email appears to have carried the inspection report twice rather than the estimate itself. The first estimate is from Alder Compliance for £1,370.00 (no VAT shown). It leaves the bedroom carpet in place and replaces the bath tap rather than repairing it, so it differs from the original scope. We'll resend it with the second quote. Nothing is approved or booked yet, and please don't treat the first estimate as accepted.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved, assigned or booked
- The second quote is not yet obtained; no contractor is named
- Moving the stage does not decide which quote is accepted or who pays (landlord or deposit)

## Remaining work
- Source a second contractor for the same scope and obtain a quote (agency operations, review 2025-04-10)
- Resend the first estimate to the landlord with the second quote and ask for a decision

## Missing or unavailable information
- Second contractor not named anywhere in the case
- Estimate PDF was not attached to the landlord's email (event 006)
- attachment-04-invoice.pdf is in the case files but not in the history; not reviewed

## Conflicts between sources
- Event 006 says an estimate is attached but the attachments are the inspection report twice
- Estimate scope (carpet stays, tap replaced) differs from the original request
- Inspection report dated 5 Jan 2026 yet signed 3 Apr 2025; it also says the carpet burn was pre-existing

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The first estimate (£1,370, Alder Compliance) is with the landlord, who asked for a comparison quote. The job is now at double_quotation; the second quote is outstanding and nothing is approved.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote (sent, MSG-101), and sourcing a second contractor via the double_quotation stage. Review on 10 April.

**3. Does anything need a human decision, and why?**

No. A second quote is routine, so no escalation. The landlord will decide between quotes once both are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, 6 Apr) asked for one other subcontractor to quote for comparis… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","bo… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second quote from another contractor, requested by landl… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
