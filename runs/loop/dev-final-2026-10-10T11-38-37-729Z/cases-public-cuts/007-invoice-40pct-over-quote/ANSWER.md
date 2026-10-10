# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor says the works are done but invoiced about 40% over the approved quote. I recorded the invoice and held payment. I asked the contractor to explain and told the landlord. The ticket is on hold with a review on 2025-10-10. No human decision is needed yet.

## Where the case stands
Works reported done by Clarke (event 031) on a void property. Invoice 2311 (£277.72 + VAT, £333.26 inc) is about 40% above the approved £198.37 + VAT quote. Payment held (HOLD-101). Waiting on provider for an explanation, PDF invoice and photos; review 2025-10-10. Job not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to explain the invoice difference line by line, send PDF invoice and photos, confirm the attendance date | Clarke, contractor | email | A3 ✅ |
| 2 | OTHER | Tell the landlord about the over-quote invoice, payment held, nothing extra approved | Landlord | email | A4 ✅ |
| 3 | WAIT | Wait for the provider's explanation; review 2025-10-10, escalate to accounts if not settled | Clarke, contractor | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> - Your invoice 2311 is £277.72 + VAT against the approved quote of £198.37 + VAT. Please explain the difference line by line, and say whether extra work was done beyond two spotlights and one ceiling board.
> - Please send the invoice as a PDF and the photos of the completed work.
> - Please confirm the date you attended and how you accessed the property (caretaker keys).
> 
> Why: Invoice is about 40% above the approved quote; payment is on hold until explained.

**A4 · send_message → Landlord (landlord) via email, existing thread (event 011 email)** (verified)

> Hello, an update on the lounge works at Flat 8, 168 Alder Lane. Clarke says the two spotlights and ceiling board are replaced. However, his invoice is £277.72 + VAT (£333.26 inc VAT), compared with the £198.37 + VAT quote you approved. We have not approved the higher amount and have put payment on hold. We have asked Clarke to explain the difference and send photos. We will come back to you before anything extra is paid. No action needed from you yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Holding payment does not decide whether the extra is payable.
- The completion claim is unverified until photos arrive.
- The landlord has not approved anything above £198.37 + VAT.

## Remaining work
- Provider to explain the invoice and send the PDF and photos (owner: Clarke).
- If unexplained by 2025-10-10, escalate to accounts or seek landlord approval for the extra (owner: agency).
- Then close with the invoice filed and the landlord informed (owner: agency).

## Missing or unavailable information
- Reason for the extra £79.35 + VAT
- Invoice PDF
- Completion photos
- Attendance date

## Conflicts between sources
- record_invoice returned 'matches the approval' with no flags, but the invoice is £333.26 inc VAT against a £198.37 + VAT quote. I trusted the documents and held payment.
- The provider's emails say 'studio' but the property is Flat 8.
- The check-out report is dated 25 August 2026 but was signed 27 September 2025.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The works are reported complete. The invoice is £333.26 inc VAT against an approved £198.37 + VAT quote. The explanation, PDF invoice and photos are outstanding. Payment is held and the ticket is not closed.

**2. What is the next action, who is it for, and through which channel?**

Clarke (contractor) was asked by email to explain the difference and send the PDF and photos. The landlord was emailed about the held payment. Review is on 2025-10-10.

**3. Does anything need a human decision, and why?**

Not yet. If Clarke cannot justify the extra by the review date, escalate to accounts (P2) or ask the landlord to approve the variation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor, invoice no. 2311)","amount_gbp":333.26,"who_pays":"agency","source":"Provider ema… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor) invoice 2311, NBL-007-0235","reason":"Invoice £277.72 + VAT is about 40% above the approved quote of £198.37 +… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `request_information` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","questions":["Your … | 2 | ✅ verified | REQ-105 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke","purpose":"Check provider's explanation of invoice 2311 over quote; if u… | 2 | ✅ verified | FUP-106 found in the schedule_follow_up log |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-007-0235","reason":"Waiting for Provider","comment":"Awaiting explanation of invoice 2311 (£277.72 + VAT vs approved £198… | 1 | ✅ verified | Ticket NBL-007-0235 read back after put_on_hold |

## Failed or unverified actions
- A3: First attempt not applied; retried once and verified (REQ-105).
- A5: First attempt not applied; retried once and verified (FUP-106).
