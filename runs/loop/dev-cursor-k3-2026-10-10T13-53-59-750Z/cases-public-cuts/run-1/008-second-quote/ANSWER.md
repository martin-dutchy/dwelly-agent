# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for a comparison quote after receiving the £1,370 estimate. I moved the job to double_quotation, told the landlord, and held to 10 April. No human decision needed yet.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First estimate (Alder Compliance, £1,370) sent to landlord, not approved. Landlord asked for a second quote; a second provider is still to be sourced.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved ticket to double_quotation so a second provider is sourced for the same scope | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told landlord a second quote is being obtained, first is on hold, update by 10 April | Landlord | email | A2 ✅ |
| 3 | WAIT | Hold until 2025-04-10 for second quote | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we'll get one more contractor to quote the same works at Flat 5, 55 Lantern Quay for comparison. The first estimate is on hold and nothing will go ahead until you tell us. We'll update you on the second quote by Thursday 10 April. If you'd like a particular contractor used, just let us know.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or committed; the first estimate is not accepted.
- No second contractor has been instructed yet; none is named in the case.

## Remaining work
- Source second provider and send the same scope plus inspection report (agency ops)
- Send both quotes to landlord for decision
- Chase the provider on the first job, which has never replied

## Missing or unavailable information
- Second contractor not named
- Attachment-04 invoice not seen in history

## Conflicts between sources
- Estimate says the carpet can stay and includes replacing the tap, while the request asked for carpet replacement and only a tap repair. The inspection report says the carpet burn was pre-existing. The second quote should use the original scope.

## Answers to the case questions
**1. Where does this case stand?**

First estimate sent to landlord and on hold. Landlord wants a second quote, so the job is in double_quotation. Nothing is approved and no visit is booked.

**2. Next action, recipient, channel?**

Email to the landlord confirming a second quote is being obtained (done). The job is at double_quotation for a second provider to be sourced. Hold review is 10 April.

**3. Does anything need a human decision?**

No. Second quotes are routine. The landlord decides later between the quotes.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009) asked for one other subcontractor to quote for comparison. No … | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hi, thanks for your re… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second contractor quote (same scope) requested by landlo… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
