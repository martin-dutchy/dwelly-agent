# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** needs_info · **Severity:** routine

The checkout clean job is marked complete and is at final checks. I couldn't read the invoice and there is no recorded estimate figure to check it against. I asked the contractor to resend the invoice and confirm completion, and set a follow-up for 28 July.

## Where the case stands
Ticket at documents/final checks. Contractor says the invoice was sent (event 017). I can't read the invoice and no estimate figure is on record. Waiting on the contractor for a readable invoice.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the contractor to resend the invoice as a PDF with the total including VAT, and to confirm the completion date and scope | Bennett, contractor | email | A1 ✅ |
| 2 | WAIT | Follow up on 2025-07-28 for the invoice, then record it, check it against the approved estimate, tell the landlord and close | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> - Please resend your invoice for the checkout clean at Flat 30, 30 Harbour View as a PDF, showing the total including VAT and the company name.
> - Please confirm the date the work was completed and that it covered the clean, removal of dumped items and the carpet clean.
> 
> Why: The invoice content is not readable on our side, and we have no recorded estimate figure to check it against.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is recorded as paid, invoiced or closed.
- The request does not confirm the work was done to standard or the amount is correct.
- The 'Estimate approved' note has no amount or landlord decision attached.

## Remaining work
- Receive and record the invoice, and check it against the approved estimate and the contractor
- Confirm the work was completed
- Tell the landlord
- Close the ticket
- Check whether the tenant needs to be told (the tenancy appears to have ended)

## Missing or unavailable information
- Invoice content and amount (attachment-02 not readable to me)
- Approved estimate figure and the landlord's recorded decision
- Contractor's completion confirmation

## Conflicts between sources
- The inspection report is dated 16 March 2026 but is signed 22 July 2025. The history is dated July 2025, so the report date looks wrong. I did not rely on it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At final checks. The contractor reports the invoice sent and the job is marked complete. Outstanding: a readable invoice, a check against the approved estimate, confirmation of completion, telling the landlord, and closing.

**2. What is the next action, who is it for, and through which channel?**

Ask Bennett (contractor) by email to resend the invoice as a PDF and confirm completion. Follow up on 28 July.

**3. Does anything need a human decision, and why?**

Not yet. Escalate to accounts only if the invoice exceeds the approved estimate or comes from a different company.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Plea… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `schedule_follow_up` | {"due_on":"2025-07-28","purpose":"Chase Bennett for readable invoice and completion confirmation; then record invoice, check against approve… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
