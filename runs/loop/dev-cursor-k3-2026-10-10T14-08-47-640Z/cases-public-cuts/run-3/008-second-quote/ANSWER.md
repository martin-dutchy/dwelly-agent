# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a second comparison quote. No other contractor is named, so the job moved to double_quotation, the landlord was told, and a hold with review on 9 April was set.

## Where the case stands
Stage double_quotation, on hold until 2025-04-09 awaiting a second quote. First estimate (Alder Compliance) not approved. Void property after tenant left, so no tenant to message.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told landlord a second quote is being sourced, nothing approved, update by 9 April | Landlord | email | A2 ✅ |
| 2 | OTHER | Moved job to double_quotation so a second provider is sourced | internal | internal | A1 ✅ |
| 3 | WAIT | Hold for second quote, review 9 April | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we're getting a second quote for comparison on the same works at Flat 5, 55 Lantern Quay (repaint, burnt bedroom carpet, bathroom flooring, plug, bath tap, bathroom shelf). The job has moved to the second-quote stage and we'll update you once it arrives, or by 9 April at the latest. Please also note our event 6 email attached the inspection report twice rather than the estimate itself, so I'm re-sending the first estimate with the next update. Nothing is approved yet. If you have a contractor you'd prefer us to ask, let us know. Sorry for the confusion.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Moving to double_quotation does not approve the first estimate or name the second contractor
- No quote has been approved and no spend committed
- Estimate figure £1,370 was read from the attachment but not recorded via record_quote

## Remaining work
- Ops/provider sourcing: second contractor to be found and sent same scope plus inspection report, quote only
- Review 9 April; then send both quotes to the landlord for a decision
- Ask provider Alder Compliance to clarify scope: the estimate leaves the burnt carpet and replaces the tap against the brief, and shows no VAT

## Missing or unavailable information
- No second contractor named in case
- No VAT detail on first estimate

## Conflicts between sources
- Inspection report dated 5 Jan 2026 but signed 3 Apr 2025 and the case is April 2025; date inconsistent
- Estimate says carpet can stay and replaces the tap, against the brief
- Event 006 email attached the inspection report twice, not the estimate
- I promised the landlord the estimate would be re-sent; that has not been done yet

## Answers to the case questions
**1. Where does this case stand?**

Routine check-out works job. The first estimate (£1,370 from Alder Compliance) went to the landlord, who asked for a second quote. The job is now at double_quotation, on hold, with nothing approved.

**2. Next action, recipient, channel?**

Email to the landlord confirming the second quote (sent), with a review on 9 April. A second provider still needs sourcing.

**3. Does anything need a human decision?**

No. The landlord's decision comes after both quotes are in. No escalation is needed now.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, email 6 Apr) asked for one other subcontractor to quote for co… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second comparison quote (landlord request); first estima… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
