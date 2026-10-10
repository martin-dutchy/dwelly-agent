# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor reports the works done but invoiced about 40% over the approved quote. I recorded the invoice, held payment (HOLD-101), asked the contractor to explain and send photos, told the landlord, and set a follow-up for 10 Oct. I have not yet escalated; I will if the answer doesn't settle it.

## Where the case stands
Stage Result, on hold waiting for provider. Works reported done by Clarke; invoice 2311 is £333.26 inc VAT (£277.72 + VAT) against approved £198.37 + VAT. Payment held. Waiting on Clarke's explanation, photos and attendance date; landlord told. Property is void.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Clarke to explain the invoice overage in writing, and send photos and the attendance date | Clarke, contractor | email | A3 ✅ |
| 2 | OTHER | Tell the landlord about the invoice overage and the payment hold | Landlord | email | A4 ✅ |
| 3 | WAIT | Review on 2025-10-10; escalate to accounts if the provider's answer does not settle it | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for letting us know the works are done. Invoice 2311 (£277.72 + VAT) is higher than the approved quote of £198.37 + VAT for two spotlights and one ceiling board. No extra work was approved. Please can you explain the difference in writing, itemised, and send the photos of the completed work and the date you attended? Payment is on hold until this is settled. Regards, Maya

**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Good afternoon. Clarke says the lounge works (two spotlights and a ceiling board) are done. His invoice is £277.72 + VAT (£333.26 inc VAT), against the £198.37 + VAT you approved. We have put payment on hold and asked him to explain the difference and send photos. We will not pay more than you approved without your say-so, and will update you once he replies. Regards, Maya

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice does not approve it
- The payment hold does not decide whether the extra is justified
- Work completion is the provider's claim only, with no photos yet
- Nothing here closes the job

## Remaining work
- Provider explanation, photos and attendance date (Clarke)
- Landlord decision on any amount above £198.37 + VAT
- Accounts escalation (P2) if the explanation does not settle it, on 2025-10-10 review
- Close after completion evidence, invoice resolved, landlord informed; no tenant to confirm (void)

## Missing or unavailable information
- Reason for the 40% overage
- Completion photos
- Date of attendance
- The ticket's attachment-07 was not seen

## Conflicts between sources
- The invoice tool reported no flags and said it matched the approval, but the figures show about 40% over the quote; I trusted the figures.
- The report dates the check-out as August 2026 while the case is October 2025, and the provider says 'studio' for a flat; neither affects the action.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Works reported done; invoice £333.26 inc VAT exceeds approved £198.37 + VAT. Outstanding: explanation, photos, attendance date, landlord decision on the extra, and closure.

**2. What is the next action, who is it for, and through which channel?**

Email to Clarke asking him to explain the overage and send photos and the date; email to the landlord informing them. Payment held.

**3. Does anything need a human decision, and why?**

Not yet. A human (accounts, P2) is needed if Clarke's answer doesn't justify the overage; the landlord decides on any amount above the approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor), invoice no. 2311","amount_gbp":333.26,"who_pays":"agency","source":"Provider ema… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311, NBL-007-0235","reason":"Invoice £277.72 + VAT is about 40% above approved quote £198.37 + VAT; … | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-007-0235","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke","purpose":"Chase explanation of invoice 2311 overage, photos and attenda… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
