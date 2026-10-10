# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** action_taken · **Severity:** routine

Checkout clean job was approved and the contractor says the invoice was sent to Theo. The system has moved the ticket to completed and final checks, but no invoice, amount or completion evidence is visible. I asked the contractor to resend and put the job on hold with review on 28 July.

## Where the case stands
Ticket at documents stage, marked completed for final checks. On hold waiting for contractor to resend invoice, estimate figure and completion confirmation. Not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask contractor to resend invoice, confirm estimate figure/VAT and completion date | Bennett, contractor | email | A1 ✅ |
| 2 | WAIT | Hold until 2025-07-28 for contractor reply, then record work result and invoice and close | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> - Please resend the invoice for job NBL-003-2766 (Flat 30, 30 Harbour View) as an attachment on this thread, as we can't see it on the job.
> - Please confirm the date the clean, dumped items removal and carpet clean were completed.
> - Please confirm the estimate figure and whether it includes VAT.
> 
> Why: Job was marked completed, but no invoice, estimate figure or completion evidence is on the record, so final checks can't be done.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the work was done, the cost, or who pays
- No approval of the invoice
- Ticket is not closed

## Remaining work
- Obtain and record invoice and estimate amount, then check against approval
- Record work result with evidence
- Decide who pays (landlord or tenant deposit deduction; the deposit decision needs a human)
- Tell landlord and close

## Missing or unavailable information
- Invoice document and amount
- Estimate figure and approver
- Completion evidence
- Landlord and property details are not on the record

## Conflicts between sources
- Inspection report appointment date (16 March 2026) and signed date (22 July 2025) are inconsistent with each other and with the case dates; treat the report as indicative only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Work approved and reportedly done, ticket in documents/final checks. Outstanding: invoice and amount, estimate figure, completion evidence, who pays, landlord informed.

**2. What is the next action, who is it for, and through which channel?**

Request invoice and completion details from contractor Bennett by email on the existing thread (done, REQ-101).

**3. Does anything need a human decision, and why?**

Not yet. A human is needed only if the invoice exceeds the estimate or a deposit deduction is proposed, as deposit decisions need authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Plea… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-003-2766","reason":"Waiting for Provider","comment":"Waiting for contractor to resend invoice, estimate figure and comple… | 1 | ✅ verified | Ticket NBL-003-2766 read back after put_on_hold |

## Failed or unverified actions
_None._
