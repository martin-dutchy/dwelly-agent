# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord asked for another subcontractor quote. Moved the job to double_quotation, told the landlord by email that a second quote is being obtained with the first on hold, and set a hold with review on 11 April. No human decision needed.

## Where the case stands
Stage double_quotation. Landlord asked for a second quote for comparison; first estimate (Alder Compliance £1,370) on hold; no landlord approval; no contractor visit booked. Waiting on a second contractor quote, review 2025-04-11.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | SEND_QUOTE_FOR_APPROVAL | Told landlord a second quote is being sourced (same scope), report back by 11 April, no work until approved | Landlord | email | A2 ✅ |
| 2 | WAIT | Hold for second quote, review 2025-04-11 | internal | internal | A3 ✅ |
| 3 | OTHER | Moved ticket to double_quotation and noted the request | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hi, thanks for your reply. Yes, we'll get a second quote for comparison for Flat 5, 55 Lantern Quay, using the same scope as the first. We're sourcing another contractor now and will send you both quotes side by side, aiming to report back by 11 April. The first estimate (Alder Compliance, £1,370, no VAT shown) stays on hold, and no work will start until you approve. The email we sent earlier attached the inspection report twice rather than the estimate, so we'll include the estimate again with the comparison. If you'd rather suggest a contractor, just tell us their name.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not approve the first quote or any spend
- Does not confirm a second contractor has been found or priced
- Does not decide who pays (landlord vs tenant deposit)

## Remaining work
- Source second contractor and send same scope plus inspection report (agency ops)
- Send both quotes to landlord for decision
- Chase by 2025-04-11

## Missing or unavailable information
- No second contractor named in case
- Landlord may not have seen the estimate (event 006 attached the inspection report twice)
- First provider's own email not in history; estimate has no VAT itemised

## Conflicts between sources
- Inspection report dated 5 January 2026 and signed 3 April 2025, inconsistent with case dates
- Estimate includes tap replacement and leaves carpet, differing from the original request
- Event 006 said estimate attached but attached the inspection report twice

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Quote loop: one estimate (£1,370, Alder Compliance) is awaiting landlord decision, and the landlord wants a comparison quote. Outstanding: second quote, landlord approval, then work.

**2. What is the next action, for whom, via which channel?**

Landlord told by email (A2) that a second quote is being sourced; ticket moved to double_quotation (A1); hold to 11 April (A3). Next: send the scope to a second contractor.

**3. Does anything need a human decision?**

No. Second quote is routine; the approval decision belongs to the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-008-3466","stage":"double_quotation","note":"Landlord (event 009, email 06/04) asked for one other subcontractor to quote for co… | 1 | ✅ verified | Ticket NBL-008-3466 read back at stage double_quotation |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-008-3466","b… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Provider","comment":"Waiting for second contractor quote (same scope) for landlord compar… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A4 | `resume_auto` | {"ticket_ref":"NBL-008-3466"} | 1 | ✅ verified | Ticket NBL-008-3466 read back after resume_auto |

## Failed or unverified actions
_None._
