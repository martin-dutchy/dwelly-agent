# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider says the works are done but invoiced £277.72 + VAT (£333.26 inc VAT) against the approved £198.37 + VAT. I recorded the invoice, held payment, asked the provider to explain and send photos, told the landlord, and set a chase for 2025-10-10.

## Where the case stands
Work reported done by provider (event 031). Invoice 2311 recorded at £333.26 inc VAT and payment held. Waiting on Clarke for an explanation and photos. Landlord informed. The property is void, so there is no tenant to message.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to explain the £79.35 + VAT difference line by line and to send photos and the attendance date | Clarke, contractor | email | A3 ✅ |
| 2 | OTHER | Placed payment hold HOLD-101 on invoice 2311 | internal | internal | A2 ✅ |
| 3 | OTHER | Told the landlord about the over-quote invoice and the hold, and asked them not to pay yet | Landlord | email | A4 ✅ |
| 4 | WAIT | Chase Clarke on 2025-10-10. Escalate to accounts if the explanation doesn't settle it. | Clarke, contractor | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> - Invoice 2311 is £277.72 + VAT against your approved quote of £198.37 + VAT. Please explain the difference line by line and say whether extra work was done beyond the two spotlights and one ceiling board.
> - Please send the photos of the completed work and the date you attended.
> 
> Why: Invoice is above the approved quote; payment is on hold until explained.

**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Hello, an update on Flat 8, 168 Alder Lane. Clarke says the spotlights and ceiling board are replaced. His invoice is £277.72 + VAT (£333.26 inc VAT), but the quote you approved was £198.37 + VAT. We have put payment on hold and asked him to explain the difference and send photos. Please don't pay anything until you hear from us. We will update you once he replies, or by 2025-10-10 at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice does not approve it or confirm the work was done.
- The hold does not decide whether the extra amount is valid.
- Nothing yet confirms the visit date, the work completion evidence or the keys being returned.

## Remaining work
- Provider to explain the invoice difference and send photos.
- If the explanation doesn't settle it, escalate to accounts (P2), or get the landlord's decision on a variation.
- Confirm the caretaker keys are back, then close once the invoice is resolved and the landlord is informed.
- Record the work result once the photos are received.

## Missing or unavailable information
- Reason for the invoice being about 40% over quote
- Completion photos
- Visit date
- The quote attachment was not in the case files

## Conflicts between sources
- The invoice checker said the invoice matches the approval, but it is about 40% above the quoted £198.37 + VAT. The landlord's 'Pls go ahead' had no cap, but it was given against the quote. I trusted the quote figures.
- Event 023 names Harriet and event 027 names Clarke as the provider contact. Event 025 says 'studio' for a flat. Treated as the same job.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the work done. The invoice is about 40% over the approved quote, and photos are still to come. Payment is held. No work result or visit date is recorded, and the keys have not been confirmed returned.

**2. What is the next action, who is it for, and through which channel?**

Email to Clarke asking him to explain the difference and send photos (done). Landlord emailed with an update (done). Chase on 2025-10-10.

**3. Does anything need a human decision, and why?**

Not yet. The provider's explanation is pending. If it doesn't settle the difference, escalate to accounts at P2, or ask the landlord to approve a variation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor), invoice no. 2311","amount_gbp":333.26,"who_pays":"landlord_direct","source":"Pro… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor), invoice 2311, NBL-007-0235","reason":"Invoice £277.72 + VAT is about 40% above approved quote £198.37 + VAT w… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `request_information` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","questions":["Invoi… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-007-0235","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke","purpose":"Chase explanation of invoice 2311 over quote and photos; esca… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
