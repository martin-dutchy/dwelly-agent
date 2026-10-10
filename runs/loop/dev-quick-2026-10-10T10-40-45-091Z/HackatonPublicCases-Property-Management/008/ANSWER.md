# Case 008: ANSWER

**Outcome:** action_taken · **Severity:** routine

The case is at the landlord-decision stage. Two quotes are on file (Eliza Bennett £1,370.00; Kendall £1,700.00 + VAT), but neither covers the full inspection scope, and the landlord has not chosen one. I requested landlord approval (APR-101) for the choice, with scope questions attached, and escalated the Kendall invoice query to accounts (ESC-102).

## Answers
**1. Where does this case stand right now, and what is outstanding?**

Quotes were sent to the landlord on 2 May 2025 and chased on 4 May. On 6 May the agency asked which quote to proceed with. Outstanding: the landlord's choice of contractor, confirmation that the chosen quote covers the full scope, the status of Kendall's earlier invoice, and the deposit treatment of any chargeable damage. No system ticket for NBL-008-3466 exists in the ticket list, so the case is tracked only through the history.

**2. What is the next action, who is it for, and through which channel?**

Landlord Langley: decision request APR-101 (raised in the system) to choose between the quotes, after confirming scope. Accounts: escalation ESC-102 to check the Kendall invoice and payment status. No contractor is approved yet, so no visit is booked. The Eliza Bennett and Kendall contact details are not in the records, so I did not message them.

**3. Does anything need a human decision, and why?**

Yes. (1) The landlord must choose the contractor and approve spend, because no quote has been approved and spend above the landlord's limit is theirs to decide. (2) Accounts must confirm whether Kendall's earlier invoice was paid, because payment requests cannot be actioned on a chase. (3) Any deduction from the tenant's deposit for the burn damage, stains and bathroom works needs a deposit decision by a human.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Langley","ticket_ref":"NBL-008-3466","decision_needed":"Choose a contractor for the check-out works at Flat 5, 55 Lantern Quay,… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `escalate_to_human` | {"priority":"P3","team":"accounts","reason":"Kendall is chasing an unpaid invoice on this job. No Kendall invoice is on the record, and no p… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Escalations
- **P3 → accounts** (verified): Kendall is chasing an unpaid invoice on this job. No Kendall invoice is on the record, and no payment decision has been made. Do not pay or change bank details on a chase request. Please confirm whether any earlier Kendall invoice (from the previous refurb) was paid and to which account.
  - Known: Event 024 (6 May 2025, Northbridge Lettings to landlord Langley): Kendall is chasing an invoice and asks whether it has been paid. Kendall's new quote is £1,700 + VAT for this job. No invoice or payment record for Kendall is in the case history, and the system has no ticket for NBL-008-3466.
  - Missing: Whether Kendall's earlier invoice was paid, the amount, and the payment date. No invoice is attached.
  - Options: Confirm payment status from the accounts ledger and reply to Kendall and the landlord; Place a hold on any Kendall payment until the invoice is checked against the job; Ask Kendall for the invoice number and bank details through the existing contact on file, not by email or phone request
  - Recommendation: Check the ledger first. Hold any new payment to Kendall until the invoice is matched to a completed job and the bank details are verified against records.

## Failed or unverified actions
_None._
