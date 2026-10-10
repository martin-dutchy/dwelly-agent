# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second quote after receiving the £1,370 Alder Compliance estimate. I moved the job to double_quotation, told the landlord, flagged the scope differences in the first estimate, and set a hold to 9 April.

## Where the case stands
Stage double_quotation, on hold to 2025-04-09. First estimate (Alder Compliance £1,370) awaits landlord decision; landlord asked for a comparison quote. Second provider being sourced.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved job to double_quotation so a second provider is sourced, and told the landlord | Landlord | email | A2 ✅ |
| 2 | WAIT | Hold until 9 April for second quote and any preferred contractor from landlord | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply (event 009). Yes, we will get a second quote for Flat 5, 55 Lantern Quay for comparison, using the same scope and the check-out inspection report. The first estimate stays on hold and nothing is approved yet. One point to be aware of: the first estimate says the bedroom carpet can stay and includes replacing the bath tap, whereas our request was to replace the burnt carpet and repair the tap, so we will ask the second contractor to price the original scope. If you have a preferred contractor, please tell us their name. We will update you by 9 April 2025.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved; no spend committed
- Moving to double_quotation does not mean a second contractor has been instructed or has quoted
- The first estimate has not been accepted or rejected

## Remaining work
- Source second contractor quote on original scope (agency maintenance team)
- Send both quotes to landlord for decision
- Chase landlord for any preferred contractor

## Missing or unavailable information
- No second contractor named in case
- Estimate has no VAT itemised
- attachment-04-invoice.pdf listed but not in history; not seen

## Conflicts between sources
- Estimate says carpet can stay and replaces the tap, but the request was to replace the carpet and repair the tap
- Inspection report is dated 5 January 2026 but was signed 3 April 2025

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Estimate received and sent to landlord; landlord wants a comparison quote. Outstanding: second quote, then landlord decision.

**2. What is the next action, who is it for, and through which channel?**

Email to landlord confirming the second quote is being obtained (done); job moved to double_quotation; review 9 April.

**3. Does anything need a human decision, and why?**

No. The routine second-quote step is handled; the landlord decides between quotes later.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, 6 Apr) asked for one other subcontractor to quote for comparis… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Second quote being sourced for comparison at landlord's request; fir… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
