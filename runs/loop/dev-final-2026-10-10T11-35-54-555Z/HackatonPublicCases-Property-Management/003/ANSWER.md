# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** action_taken · **Severity:** routine

Job is at final checks after the contractor said the invoice was sent. I could not see the invoice or any approved figure, so I asked the contractor to resend the invoice and confirm completion, and set a follow-up for 28 July.

## Where the case stands
Final checks (ticket stage: documents). Estimate marked approved (event 010, no figure recorded), contractor said invoice sent (event 017), system marked completed (event 019). Waiting on the contractor for a readable invoice and completion confirmation.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the contractor to resend the invoice as a PDF or plain text with total and confirm the estimate figure and that work is complete | Bennett, contractor | email | A1 ✅ |
| 2 | WAIT | Follow-up on 2025-07-28 to chase, then record the invoice, check it against the estimate, file it and close | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> - Please resend your invoice for Flat 30, 30 Harbour View (job NBL-003-2766) as a PDF or in plain text, showing the company name, invoice date and total including VAT.
> - Please confirm the estimate figure you gave and that the cleaning, dumped-items removal and carpet clean are all finished.
> 
> Why: We are on final checks but I cannot see the invoice contents or any recorded estimate figure to check it against, and there is no written completion confirmation.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking for the invoice does not approve payment or confirm the work was done to standard.
- Ticket not closed; invoice not recorded or checked.

## Remaining work
- Obtain a readable invoice and record it, checking it against the approved estimate and the assigned contractor.
- Get written completion confirmation.
- Check the landlord has been told the outcome, and whether the work is a deposit deduction (needs a human if disputed).
- Then close.

## Missing or unavailable information
- Invoice contents (attachment not readable to me)
- Approved estimate figure
- Written completion evidence
- Landlord or tenancy details are not on the property record

## Conflicts between sources
- The inspection report is dated 16 March 2026 with a signature of 22 July 2025, which is after the case date. The report's dates are inconsistent. I treated it as context only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At final checks. Outstanding: a readable invoice checked against the approved estimate, completion confirmation, landlord informed, and then closing.

**2. What is the next action, who is it for, and through which channel?**

Email to Bennett (contractor) asking for the invoice as PDF or plain text and a completion confirmation, with a follow-up on 28 July.

**3. Does anything need a human decision, and why?**

Not yet. A human is needed only if the invoice exceeds the estimate or comes from a different company, or if the cost is disputed as a deposit deduction.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Plea… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `schedule_follow_up` | {"ticket_ref":"NBL-003-2766","due_on":"2025-07-28","purpose":"Chase Bennett for readable invoice and completion confirmation; then record in… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
