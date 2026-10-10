# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** action_taken · **Severity:** routine

The cleaning job was marked completed and the provider says the invoice was sent. No invoice figures, visit date or photos are visible on the record, so I could not record the invoice or close the job. I asked the provider for them, put the job on hold and set a follow-up for 2025-07-28.

## Where the case stands
Stage: documents/final checks. The provider (Bennett) says the work is done and the invoice has been sent to Theo. We are waiting on the provider for the invoice details, visit date, photos and estimate figure. Hold review date is 2025-07-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the provider to resend the invoice as a PDF with the total, and to confirm the attendance date, completion photos and the estimate figure | Bennett, contractor | email | A1 ✅ |
| 2 | WAIT | Hold the job and chase on 2025-07-28 | Bennett, contractor | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> - Please resend the invoice as a PDF (or plain-text reply) with the total including VAT and the company name on it, as it has not reached this job.
> - What date did you attend and complete the clean, dumped-item removal and carpet clean?
> - Please send photos of the finished work.
> - Please confirm the estimate figure you gave, so we can match the invoice to it.
> 
> Why: Job NBL-003-2766 is at final checks. No visit date, photos, invoice figures or estimate amount are on the job record, so we cannot check or close it.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking for documents does not confirm the work was done or the invoice is correct.
- The job was marked completed by the system. That is not evidence of the work, and nothing has been paid or closed.

## Remaining work
- Provider to send the invoice PDF, visit date, photos and estimate figure.
- Then record the invoice, check it against the approved estimate and contractor, and file the documents.
- Tell the landlord the outcome, then close the job.

## Missing or unavailable information
- Invoice file (attachment-02-cleaning-invoice.pdf) is not readable in the case text: no amount or issuer seen.
- Estimate amount: the history only says 'Estimate approved' with no figure.
- Visit date and completion photos.
- Landlord approval or contact: none visible in the case.
- The checkout report is dated 16 March 2026, but was signed 22 July 2025 and the case is dated July 2025.

## Conflicts between sources
- The checkout report says the inspection was on 16 March 2026 but was signed on 22 July 2025. I treated the date conflict as a data quality issue and did not rely on it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is at final checks. Still outstanding: a readable invoice with the total, the attendance date, completion photos, the estimate figure, and the landlord being told.

**2. What is the next action, who is it for, and through which channel?**

An email to Bennett, the contractor, asking for the invoice PDF, visit date, photos and estimate figure. The job is on hold with a review on 2025-07-28.

**3. Does anything need a human decision, and why?**

Not yet. If the invoice turns out higher than the approved estimate, from a different company or dated before the visit, it goes to accounts.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Plea… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-003-2766","reason":"Waiting for Provider","comment":"Waiting for invoice PDF with total, attendance date, completion phot… | 1 | ✅ verified | Ticket NBL-003-2766 read back after put_on_hold |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-003-2766","due_on":"2025-07-28","purpose":"Chase provider for invoice, visit date, photos, estimate; then record invoice … | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
