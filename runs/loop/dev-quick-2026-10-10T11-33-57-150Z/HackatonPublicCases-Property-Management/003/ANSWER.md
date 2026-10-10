# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** action_taken · **Severity:** routine

The case is at final checks, but the job cannot close: the invoice is not in the files, no estimate figure or landlord approval is recorded, and no work result is on file. I asked Bennett by email for the invoice PDF, the estimate and proof of completed work, and put the ticket on hold until the 2025-07-28 review.

## Where the case stands
Stage shows "documents" (final checks). Event 019 says "Request marked as completed", but no work result, invoice, quote or landlord decision is recorded in the case. The provider (Bennett) wrote on 23 July (event 017) saying an invoice was sent to Theo. That invoice is not in the case files. Ticket is on hold, waiting for the provider, with review on 2025-07-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Bennett by email (existing thread, event 017) for the invoice as a readable PDF, his written estimate figure, and confirmation of the completed work and its date. | Bennett, contractor | email | A1 ✅ |
| 2 | WAIT | Hold the ticket as Waiting for Provider, with review on 2025-07-28. | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> Hi Bennett,
> 
> Thanks for your email about Flat 30, 30 Harbour View, Northbridge, ZZ9 0ZZ (job NBL-003-2766). The invoice you mentioned has not come through to us as a readable attachment. Could you please send:
> 
> 1. The invoice as a PDF, with the total including VAT.
> 2. Your written estimate for the checkout clean, the removal of dumped items and the carpet clean, with the figure you quoted.
> 3. A short confirmation of what work was completed on site, and the date it was done.
> 
> Once we have these we can finish the job checks. Thank you.
> 
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the request does not establish that the cleaning, dumped-item removal or carpet clean was done.
- No invoice amount is confirmed; the attachment is not in the case files, so its contents are unknown.
- The estimate figure is not recorded, so no approval amount can be checked.
- Closing the job is not possible yet: no work evidence, invoice or tenant confirmation is on record.
- Event 010 'Estimate approved' has no named approver or source, so landlord authority is not established.

## Remaining work
- Provider to send the invoice PDF, the estimate figure and the completion evidence (owner: Bennett; review 2025-07-28).
- Confirm who approved the estimate (event 010) and the approved spend. If the landlord did not approve it, request landlord approval for the quoted amount.
- Record the work result, the invoice (checked against the approved figure) and the landlord notification, then run final checks and close.
- Tenancy status and landlord contact are not on the property record; confirm before any tenant or landlord message.

## Missing or unavailable information
- Invoice PDF (attachment-02-cleaning-invoice.pdf is referenced but absent).
- Written estimate figure and whether it includes VAT.
- Source and approver of the 'Estimate approved' note (event 010).
- Landlord decision on the spend, if required.
- Confirmation of the completed work and date.
- Tenancy status (tenanted or void) and landlord contact; the property record only shows the address.

## Conflicts between sources
- Event 010 'Estimate approved' has no named approver or source; no landlord decision is recorded, so it is not treated as landlord authority.
- The inspection report's appointment date is 16 March 2026, and its signature time is 22 July 2025 11:39:13. Today is 24 July 2025, so the 2026 date is inconsistent with the case.
- Event 017 says the invoice was sent, but the attachment is not in the files (hints list attachment-02-cleaning-invoice.pdf, which is absent). Its contents were not used.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Stage is documents/final checks after event 019 marked it completed. Outstanding: the invoice (referenced by the provider on 23 July but not in the files), the estimate figure, an approval source for the 'Estimate approved' note, a work result, and the landlord and tenant confirmations needed to close.

**2. What is the next action, who is it for, and through which channel?**

Email Bennett (contractor) on the existing thread asking for the invoice PDF, the written estimate figure, and confirmation of completed work and date (A1). Ticket held as Waiting for Provider, review 2025-07-28 (A2).

**3. Does anything need a human decision, and why?**

Not yet. The routine chase comes first. If the estimate has no recorded landlord approval, or the invoice is above the approved figure, that needs a human decision (accounts or landlord approval) once the figures arrive.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-003-2766","reason":"Waiting for Provider","comment":"Waiting for Bennett to send the invoice as a readable PDF, the writt… | 1 | ✅ verified | Ticket NBL-003-2766 read back after put_on_hold |

## Failed or unverified actions
_None._
