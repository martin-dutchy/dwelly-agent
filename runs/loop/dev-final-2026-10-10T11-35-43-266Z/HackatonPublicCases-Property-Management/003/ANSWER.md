# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** needs_info · **Severity:** routine

The checkout cleaning job is marked completed and is at final checks. I could not read the invoice or the estimate, so I asked the provider to resend the invoice as a PDF and confirm the estimate. The ticket is on hold with a review on 28 July.

## Where the case stands
Final checks stage (documents). Job marked completed 24 Jul. Invoice reportedly sent by provider but its amount and issuer are not visible to me; no estimate figure in the record. On hold, waiting for provider, review 2025-07-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the provider to resend the invoice as a PDF with total, company and date, and confirm the estimate figure | Bennett, contractor | email | A1 ✅ |
| 2 | WAIT | Hold for provider reply, review 2025-07-28 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> - Please resend your invoice for the checkout clean, dumped-item removal and carpet clean at Flat 30, 30 Harbour View as a PDF to this thread, showing the company name, invoice date and total including VAT.
> - Please confirm the estimate figure you gave, so we can check the invoice matches it.
> 
> Why: The invoice amount and the approved estimate are not readable in the case record, so the invoice cannot be recorded or checked yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the invoice amount, that it matches the estimate, or who pays.
- The ticket is not closed.
- No landlord decision or spend limit is on file.

## Remaining work
- Record the invoice and check it against the estimate and assigned contractor
- Confirm work completion with tenant or evidence
- Inform landlord and establish who pays (deposit deduction is a separate decision)
- Then close the ticket

## Missing or unavailable information
- Invoice contents (attachment-02 not visible to me)
- Estimate figure
- Landlord approval record (only a note 'Estimate approved')
- Property tenancy status and landlord details not on file

## Conflicts between sources
- Inspection report is dated 16 March 2026 and signed 22 July 2025, which is inconsistent with the case dates; it was treated as context only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At final checks. Work is marked complete. The invoice figure is unverified and the estimate figure is unknown. Landlord informed and closing checks are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Ask Bennett (provider) by email on the existing thread for a readable invoice PDF and the estimate figure. Hold until 2025-07-28.

**3. Does anything need a human decision, and why?**

Not now. A human is needed only if the invoice is above the estimate or from another company, or if the cost is to be deducted from the tenant's deposit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Plea… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-003-2766","reason":"Waiting for Provider","comment":"Waiting for readable invoice (PDF with total, company, date) and con… | 1 | ✅ verified | Ticket NBL-003-2766 read back after put_on_hold |

## Failed or unverified actions
_None._
