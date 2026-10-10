# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for one other subcontractor to quote for comparison. No other contractor is named in the case, so the job moved to double_quotation, the landlord was told by email, and the job is on hold with a review date of 10 April.

## Where the case stands
Ticket at double_quotation, on hold to 2025-04-10. First estimate (Alder Compliance £1,370) sent to landlord; landlord asked for a second quote. Waiting on second provider being sourced.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Email landlord confirming a second comparison quote is being obtained, first quote on hold, update by 10 April | Landlord | email | A2 ✅ |
| 2 | WAIT | Hold until second quote is sourced; review 2025-04-10 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, thank you for your reply. Yes, we will get a second quote from another contractor for comparison, for the same works (repaint, bedroom carpet, bathroom flooring, plug, bath tap and shelf). It is a quote only, nothing will be started. The first estimate stays on hold meanwhile. For information, it says the bedroom carpet can stay and includes replacing the bathroom tap, so it differs slightly from our original list. We will update you when the second quote arrives, and by Thursday 10 April at the latest with progress.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved; no work or spend authorised.
- Moving to double_quotation does not yet instruct a second contractor; no one is named in the case.
- Estimate contents are only what attachment-02 states; its figure is not verified as VAT-inclusive.

## Remaining work
- Source a second contractor for a quote only (double_quotation stage).
- Report both quotes to landlord for decision; review 2025-04-10.

## Missing or unavailable information
- No second contractor named; first estimate scope differs from request (carpet kept, tap replaced), VAT unclear. Attachment-04 invoice not seen in history.

## Conflicts between sources
- Estimate says carpet can stay and includes tap replacement, versus the original request; inspection report dates (5 Jan 2026) are after the case date. Treated as data inconsistencies.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

First estimate (£1,370, Alder Compliance) has gone to the landlord, who wants a second comparison quote. Job is at double_quotation and on hold; the second quote is outstanding and no approval has been given.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming a second quote is being obtained (sent). The second provider will be sourced via the double_quotation stage, with review on 10 April.

**3. Does anything need a human decision, and why?**

No. A second quote is a routine request. The landlord decides on the quotes once both are in.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. Fir… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second contractor quote (comparison) requested by landlo… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
