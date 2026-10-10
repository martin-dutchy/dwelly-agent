# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for one other subcontractor to quote for comparison. No other contractor is named in the case, so I moved the job to double_quotation, added a note with the scope and discrepancies, told the landlord, and held to 10 April.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First estimate (Alder Compliance) sent to landlord, not approved. Landlord asked for a second comparison quote. Waiting on sourcing a second provider.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved job to double_quotation and told landlord a second quote is being obtained, report back by 10 April | Landlord | email | A3 ✅ |
| 2 | WAIT | Hold until 2025-04-10 for second quote | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we'll get a second quote for comparison, using the same scope and the check-out inspection report. The first estimate stays on hold and nothing is approved until you tell us. One thing to flag: the first estimate says the bedroom carpet can stay and includes replacing the bath tap, which differs from our original request, so the second quote will help compare like for like. If you have a preferred contractor for the second quote, please tell us. We'll update you on the second quote by Thursday 10 April.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or committed; the first estimate is not accepted or rejected.
- No second contractor has been instructed yet; none is named in the case.
- The estimate figure and scope accuracy are not confirmed.

## Remaining work
- Source a second provider (ops, double_quotation stage) and send them the same scope and inspection report for a quote only.
- Compare quotes and send both to landlord for decision.
- Clarify the date and liability discrepancies in the inspection report.

## Missing or unavailable information
- No second contractor named
- Landlord's preferred contractor not given
- Landlord may not have received the estimate (event 006 attached only the inspection report)

## Conflicts between sources
- First estimate scope (carpet stays, tap replaced) differs from the original request.
- Inspection report dated 5 Jan 2026 but signed April 2025, and calls the carpet burn pre-existing.
- Event 006 attached the inspection report twice rather than the estimate.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A first estimate has gone to the landlord and is unapproved. The landlord wants a second comparison quote, which is outstanding. The property is vacant.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming a second quote is being obtained, with a report-back date of 10 April (A3). The job is at double_quotation and on hold (A1, A4).

**3. Does anything need a human decision, and why?**

No. A second quote is routine. The landlord decides later between the quotes.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `add_note` | {"entity":"NBL-008-3466","note":"Second quote requested by landlord 2025-04-06. Same scope to go to the new provider: repaint bedroom/other … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second provider quote (comparison) requested by landlord… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
