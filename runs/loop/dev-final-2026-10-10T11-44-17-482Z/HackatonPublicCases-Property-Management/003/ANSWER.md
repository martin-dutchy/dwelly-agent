# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** action_taken · **Severity:** routine

The cleaning job is marked complete and is at final checks. I could not see the invoice or the estimate figure, so I asked the provider to resend the invoice and confirm completion. I also set a follow-up for 28 July and added a note. The ticket stays open.

## Where the case stands
Stage: documents/final checks. Work marked complete (event 019). The provider says the invoice was sent to Theo (event 017). I cannot see the invoice, the estimate figure or any landlord approval. Waiting on the provider; follow-up set for 2025-07-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the provider to resend the invoice as a PDF (or give the total, VAT and company name) and to confirm the work was completed | Bennett, contractor | email | A1 ✅ |
| 2 | WAIT | Follow-up on 2025-07-28 to chase the invoice, then record it, check it against the approved estimate, confirm who pays and close | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> - Please resend the invoice for NBL-003-2766 (Flat 30, 30 Harbour View) as a PDF, or reply with the total, whether VAT is included, and the company name on it.
> - Please confirm the cleaning, removal of dumped items and carpet clean were all completed, and the completion date.
> 
> Why: Job is at final checks. I cannot see the invoice or the estimate figure, so I cannot record or check it against the approval.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking for the invoice does not approve payment or establish the amount.
- Nothing here confirms the work was done to standard; that is the provider's claim plus the system's completed marker.
- Ticket not closed.

## Remaining work
- Obtain and record the invoice, then check it against the approved estimate and the assigned contractor.
- Confirm who pays (landlord, or deposit deduction, which needs a human).
- Confirm the landlord knows the outcome.
- Close the ticket.

## Missing or unavailable information
- Invoice document (attachment-02 is not visible in the case text) and its amount.
- Estimate figure and who approved it.
- Who pays.

## Conflicts between sources
- The inspection report is dated 16 March 2026 but signed 22 July 2025, and the case is in July 2025. I treated it as the checkout report attached to the job.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The work is marked complete (event 019). Outstanding: the invoice, which I cannot see, to be recorded and checked against the estimate; who pays; the landlord being told; and closing the ticket.

**2. What is the next action, who is it for, and through which channel?**

Email to Bennett, the contractor, asking for the invoice PDF and completion confirmation (ledger A1). Follow-up on 2025-07-28 (ledger A2).

**3. Does anything need a human decision, and why?**

Not yet. A human is needed only if the invoice does not match the estimate or the cost is to come out of the tenant's deposit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Plea… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `schedule_follow_up` | {"due_on":"2025-07-28","purpose":"Chase Bennett for invoice PDF and completion confirmation; then record invoice, check against approved est… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A3 | `add_note` | {"entity":"NBL-003-2766","note":"Final checks: invoice not visible to agent (provider said sent to Theo, event 017; no amount seen). Estimat… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
