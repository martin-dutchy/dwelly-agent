# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** needs_info · **Severity:** routine

The cleaning job has been marked completed and is at final checks. The invoice and estimate amount can't be seen, so I asked the provider to resend them and confirm completion. I noted the gaps and set a follow-up for 2025-07-28. I did not close the ticket.

## Where the case stands
Ticket at documents/final checks. Estimate marked approved (event 010) but no amount recorded. Provider says an invoice was sent (event 017) but it isn't readable here. Waiting on the provider; follow-up 2025-07-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the provider for a readable invoice PDF, the estimate figure and written completion confirmation | Bennett, contractor | email | A1 ✅ |
| 2 | WAIT | Chase on 2025-07-28 if no reply, then record invoice, inform landlord and close | Bennett, contractor | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> - Please resend your invoice for Flat 30, 30 Harbour View as a PDF (or plain text) showing the total, VAT and company name. We cannot see the attachment.
> - Please confirm the estimate figure you gave and that the cleaning, removal of dumped items and carpet clean are all complete, with the completion date.
> 
> Why: Job NBL-003-2766 is at final checks. We hold no readable invoice, no recorded estimate amount and no written completion confirmation, so we cannot check the invoice or close.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The request does not confirm the work is done, the invoice amount or that it matches the approval.
- Nothing is recorded as paid, approved or closed.

## Remaining work
- Obtain and record the invoice, checking amount and issuer against the approved estimate
- Confirm completion with the provider
- Tell the landlord of the outcome (no landlord message is on file)
- Close the ticket once the checks are met

## Missing or unavailable information
- Readable invoice and its amount
- Estimate amount and who approved it
- Written completion confirmation
- Whether the property is void (tenant message not needed)

## Conflicts between sources
- Inspection report: appointment dated 16 March 2026, but signed 22 July 2025 and the previous report is dated 29 Nov 2024. Treated as a report inconsistency.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is at final checks. Outstanding: a readable invoice, the estimate amount, the provider's completion confirmation, and telling the landlord. Then close.

**2. What is the next action, who is it for, and through which channel?**

I emailed the provider (Bennett) asking for the invoice PDF, the estimate figure and completion confirmation. Follow-up is set for 2025-07-28.

**3. Does anything need a human decision, and why?**

No. This is a routine information gap. A human is needed only if the invoice exceeds the approved amount or comes from a different company.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Plea… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"NBL-003-2766","note":"Final checks: \"Estimate approved\" (event 010) has no amount or landlord decision recorded; invoice from p… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-003-2766","due_on":"2025-07-28","party":"Bennett, contractor","purpose":"Chase readable invoice, estimate figure and comp… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
