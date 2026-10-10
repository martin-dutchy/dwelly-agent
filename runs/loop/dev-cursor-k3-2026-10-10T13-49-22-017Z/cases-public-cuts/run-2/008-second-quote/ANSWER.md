# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord asked for one more quote for comparison after receiving the first estimate. No other contractor is named, so I moved the job to double_quotation, told the landlord, and put it on hold until 2025-04-10.

## Where the case stands
Stage double_quotation, on hold to 2025-04-10. First estimate (Alder Compliance £1,370.00) sent to landlord, not approved. Landlord asked for a second quote. Waiting for a second provider to be sourced and quote.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Moved ticket to double_quotation so a second provider is sourced, and told the landlord a second quote is being obtained with an update by 2025-04-10 | Landlord | email | A2 ✅ |
| 2 | WAIT | Hold until 2025-04-10 for the second quote | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we're getting a second quote for comparison, using the same scope and the check-out inspection report. We'll hold the first estimate until we have it and nothing will go ahead without your approval. Please note the first estimate leaves the bedroom carpet in place and replaces the bath tap, which differs from the original request, so we'll ask the second contractor to price the original list. If you have a preferred contractor, tell us their name. We'll update you by 2025-04-10.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved and no spend is committed
- The second contractor has not yet been named or instructed
- The first estimate's scope is not confirmed as matching the request

## Remaining work
- Source the second provider and send the same scope plus inspection report, for a quote only (maintenance)
- Compare the quotes and send both to the landlord for a decision
- Review on 2025-04-10

## Missing or unavailable information
- No second contractor is named in the case
- Landlord's preferred contractor, if any
- Estimate has no VAT detail
- Scope mismatch: carpet and tap

## Conflicts between sources
- Estimate leaves the carpet and replaces the tap, against the original request
- Inspection report dated January 2026 but signed April 2025 and says carpet burn was pre-existing; treated as unreliable on dates
- Hint lists an invoice attachment not in the case text and not used

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A check-out works estimate (£1,370.00, Alder Compliance) is with the landlord, who wants a second quote. The second quote is outstanding, and no decision or approval exists.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord confirming the second quote is being obtained (done, A2). The ticket is at double_quotation and on hold to 2025-04-10 (A1, A3).

**3. Does anything need a human decision, and why?**

No. This is routine work. A human is needed only later if the landlord's choice goes beyond the limits.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009 email) asked for one other subcontractor to quote for compariso… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second contractor quote for comparison, requested by lan… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
