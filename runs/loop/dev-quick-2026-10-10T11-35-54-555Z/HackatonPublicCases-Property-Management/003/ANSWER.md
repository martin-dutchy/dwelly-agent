# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** action_taken · **Severity:** routine

The job was marked completed at event 019, but there is no estimate amount, no recorded landlord approval, no work evidence, and the invoice is not in the case files. I recorded a note correcting the record, asked Bennett for the invoice PDF, amount, completion confirmation and photos, and put the job on hold until 2025-07-25. Final checks and closure are not possible yet.

## Where the case stands
Ticket NBL-003-2766 (Flat 30, 30 Harbour View) is a checkout clean, dumped item removal and carpet clean estimate with contractor Bennett. The ticket was marked completed at event 019 and moved toward final checks, but the record does not support closing it. There is no quote amount, no recorded landlord decision, no visit date or work result, and the invoice is not in the case files. The job is on hold, waiting for the provider, with a review on 2025-07-25.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Bennett to resend the invoice as a PDF, confirm the total including VAT and whether it matches the estimate, confirm the work was completed, and send photos. | Bennett, contractor | email | A2 ✅ |
| 2 | OTHER | Correct the record: add a note that completion was premature and the job still needs evidence (ticket stage reads documents). | internal | internal | A1 ✅ |
| 3 | WAIT | Hold the job until the provider replies, with a review on 2025-07-25. | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> - Please resend the invoice (event 017) as a PDF attachment. The file did not reach us.
> - Please confirm the total amount including VAT, and whether it matches your estimate for the checkout clean, dumped item removal and carpet clean at Flat 30, 30 Harbour View.
> - Please confirm the date the work was done and whether the dumped items were removed and the carpet cleaned.
> - Please send photos of the finished work if you have them.
> 
> Why: We have your invoice message but no PDF and no amount on file, so we cannot check it or pay it. We also need the work completion details before the job can close.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the information request does not confirm that the estimate was approved by the landlord.
- The note and hold do not establish the work was done or what it cost.
- No invoice amount has been recorded, so nothing is approved for payment.
- Closing the job is not supported by the record.

## Remaining work
- Bennett to resend the invoice PDF and confirm the amount and completion (owner: provider, review 2025-07-25).
- Find the source of the 'Estimate approved' note at event 010 and record the landlord decision with their exact words, or obtain it. No landlord contact is on the property record.
- Record the quote and invoice once received, check them against the approval, and file them.
- Verify the checkout report dates (16 March 2026 vs today 2025-07-24).

## Missing or unavailable information
- Invoice PDF and amount (event 017 refers to it; attachment-02-cleaning-invoice.pdf is not in the case files).
- Written estimate amount.
- Source and approver of the 'Estimate approved' note (event 010).
- Landlord decision and spend limit; property record has no landlord or spend-limit details.
- Confirmation the work was done and the date.
- Photos of the finished work.

## Conflicts between sources
- Event 019 marks the request completed, but there is no work result, quote, landlord decision or invoice on the record. I trust the record over the status change.
- Event 010 says 'Estimate approved' with no source or approver. Event 009 is an agency message to the contractor saying 'Please proceed'. Neither is a landlord decision, so I did not treat it as one.
- The checkout report says the appointment date is 16 March 2026 and the previous report is 29 Nov 2024, but the report was signed on 22 July 2025 and today is 24 July 2025. The report's dates do not agree with each other or with today.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

Stage is documents, on hold for the provider. The estimate was requested and Bennett's email says the invoice was sent, but the invoice file and amount are not in the case. Completion was marked prematurely. Outstanding: invoice PDF and amount, estimate source and landlord approval, work completion evidence, and the checkout report date check.

**2. 2. What is the next action, who is it for, and through which channel?**

Email to Bennett (contractor) on the existing thread (event 017) asking for the invoice PDF, amount, completion confirmation and photos (REQ-102, A2). Internal note correcting the record (A1). Hold until 2025-07-25 (A3).

**3. 3. Does anything need a human decision, and why?**

Not yet. The records gap can be filled by the provider's reply. If the provider cannot confirm the estimate, or the 'Estimate approved' note has no valid source, a manager should decide on landlord approval. I did not escalate because one question to the provider can move this forward.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"NBL-003-2766","note":"Completion was marked at event 019 but the record does not support final checks: no quote amount recorded, … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Plea… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-003-2766","reason":"Waiting for Provider","comment":"Waiting for Bennett to resend the invoice as a PDF with the amount, … | 1 | ✅ verified | Ticket NBL-003-2766 read back after put_on_hold |

## Failed or unverified actions
_None._
