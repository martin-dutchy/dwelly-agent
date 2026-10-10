# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** needs_info · **Severity:** routine

The cleaning job was marked completed and the contractor says the invoice has been sent. I can't see the invoice amount or an estimate figure, so I can't check the invoice or close the job. I asked the contractor for a readable invoice, the estimate figure and completion confirmation, and set a follow-up for 28 July.

## Where the case stands
Ticket at documents/final checks. Cleaning marked completed (event 019); contractor says invoice sent to Theo (event 017). No estimate amount, readable invoice, landlord decision or work evidence in the visible record. Waiting on provider.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Bennett to resend the invoice as a PDF or type the totals, confirm completion date and the estimate figure | Bennett, contractor | email | A1 ✅ |
| 2 | WAIT | Follow-up on 2025-07-28 to chase the provider, then record the invoice, tell landlord and close | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> - Please resend your invoice for Flat 30, 30 Harbour View as a PDF (or type the total, VAT and company name in a reply), as we can't read the amount on our side.
> - Please confirm the cleaning, dumped-item removal and carpet clean are all finished, and the date you attended.
> - Please confirm the estimate figure you gave so we can match the invoice to it.
> 
> Why: Job is at final checks but no estimate amount or readable invoice is on our record, so we cannot check the invoice or close.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The request does not confirm the work was done to standard or the invoice amount.
- Nothing is approved, paid or closed.
- No view is taken on deposit deductions.

## Remaining work
- Provider to supply readable invoice, estimate figure and completion confirmation (owner: agency, chase 2025-07-28)
- Record invoice and check it against the approved estimate
- Landlord to be told the outcome before closing
- Close ticket once checks are met

## Missing or unavailable information
- Estimate amount (the 'Estimate approved' note has no figure)
- Invoice contents: the attachment is not visible to me
- Who approved the estimate and under what limit
- Landlord decision/contact response

## Conflicts between sources
- Event 004 references attachment-54-document, which is not in the case files. The invoice attachment is listed in the hints but not shown to me. The inspection report is dated 16 March 2026 and signed 22 July 2025, which is after the case date, so I treated it as context only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At final checks. Work is marked completed and the contractor says the invoice was sent. Outstanding: readable invoice and estimate figure, check of the invoice against the estimate, landlord informed, then close.

**2. What is the next action, who is it for, and through which channel?**

Request for the invoice, estimate figure and completion confirmation, sent to Bennett (contractor) by email on the existing thread. Follow-up set for 2025-07-28.

**3. Does anything need a human decision, and why?**

Not yet. This is routine information gathering. It would escalate to accounts only if the invoice is above the estimate or from a different company.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Plea… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `schedule_follow_up` | {"due_on":"2025-07-28","purpose":"Chase Bennett for readable invoice, estimate figure and completion confirmation; then record invoice, tell… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
