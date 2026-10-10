# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** action_taken · **Severity:** routine

The case is at documents stage, but the system marked it completed with no quote amount, invoice file or completion evidence on record. I asked Bennett for the estimate, the invoice and proof of work, put the job on hold until 2025-07-29, and escalated to accounts (ESC-102) for the approval basis and the report date problems. The job should not be closed or paid yet.

## Where the case stands
Ticket NBL-003-2766 (Flat 30, 30 Harbour View) is at 'documents' stage and was marked completed by the system (event 019), but the record does not support that. Contractor Bennett has sent no estimate amount and no invoice file; only the email 'invoice sent to Theo' (event 017) exists. The job is on hold for the provider until 2025-07-29.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Bennett for the estimate amount (with VAT status), the invoice as a file with its total, and confirmation of which items were completed and when | Bennett, contractor | email | A1 ✅ |
| 2 | WAIT | Keep the job on hold for the provider, review 2025-07-29, and do not close it until the evidence arrives | internal | internal | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | Escalate to accounts (P3) to confirm who approved the estimate, check the invoice once received, and resolve the report date problems | Accounts team (internal) | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> - What is the total amount of your estimate for the checkout clean, dumped item removal and carpet clean at Flat 30, 30 Harbour View (including or plus VAT)?
> - Please re-send the invoice you mentioned (event 017, 23 July) as a file, with its total amount and date.
> - Has the work been carried out? If so, on what date, and which items (cleaning, dumped items removal, carpet clean) are complete?
> 
> Why: Case NBL-003-2766 is marked completed but there is no quote amount, no invoice amount on file and no completion evidence. We cannot check or pay the invoice, or close the job, without these.

## Escalation
- **P3 → accounts** (verified): Case NBL-003-2766 was moved to Result and marked completed (events 018-019) and the agency is asked to run final checks, but the record holds no quote amount, no invoice amount or file, and no evidence the cleaning or carpet work was done. The checkout report also has date problems. Needs a human to confirm the approval basis before any payment or close.
  - Known: Estimate request sent to contractor Bennett 22 Jul 2025 with checkout report (event 004). Bennett's reply 'Received :) Please proceed' (event 009); internal note 'Estimate approved' (event 010) with no amount and no named approver. Bennett emailed 23 Jul 'invoice sent to Theo' (event 017) but no invoice is on file. Property record has no landlord, spend limit or preferences. Ticket now at 'documents' stage; hold placed pending contractor reply.
  - Missing: Estimate amount and VAT status; who approved the estimate and under what spend authority; invoice amount and file; proof that work was done; whether the flat is tenanted or void and who the landlord is. Checkout report dated 16 March 2026 and signed 22 July 2025 with a 29 Nov 2024 comparison, which does not fit today's date of 24 July 2025; the report also says it may not be shared without written permission but was sent to the contractor.
  - Options: Confirm the estimate amount and who approved it, then record it and let accounts review the invoice; Reopen the job to the visit stage if the work is not done; Ask the report owner to check the report dates and sharing permission
  - Recommendation: Do not close or pay. Obtain the estimate and invoice from Bennett, confirm the approver, and check the report date errors before final checks.

## What this does not establish
- The estimate 'approved' note does not establish an amount or who approved it.
- Marking the job completed does not establish that the cleaning, dumped item removal or carpet clean was done.
- No invoice has been recorded or checked, so nothing is confirmed as payable.
- Nothing here confirms the tenancy status or the landlord, because the property record holds neither.
- The request to the contractor does not establish the estimate amount.

## Remaining work
- Bennett to reply with estimate amount, invoice file and completion evidence (review 2025-07-29).
- Accounts/management (ESC-102) to confirm the estimate approval basis and spend authority.
- Verify the checkout report: it is dated 16 March 2026 and signed 22 July 2025 against a 24 July 2025 'today', and its sharing with the contractor needs checking.
- Record the quote and invoice, obtain tenant/landlord confirmation, then run final checks and close.

## Missing or unavailable information
- Estimate amount and VAT status
- Invoice amount and file
- Evidence the work was completed
- Who approved the estimate and their spend limit
- Landlord and tenancy status of the flat

## Conflicts between sources
- Event 019 marks the request completed, but there is no completion evidence, quote amount or invoice file. I trusted the absence of evidence over the system status.
- The checkout report is dated 16 March 2026 with a current signature of 22 July 2025, while today is 24 July 2025. I could not resolve this; it is flagged for accounts.
- Event 010 'Estimate approved' has no amount or named approver, so I did not treat it as approved spend.

## Answers to the case questions
**1. 1. Where does the case stand and what is outstanding?**

Ticket at documents stage, marked completed by system at event 019 without evidence. Outstanding: estimate amount, invoice file, completion evidence, approval basis, landlord/tenancy confirmation, tenant confirmation, and the checkout report date conflict.

**2. 2. What is the next action, for whom and via what channel?**

Email Bennett (existing thread, event 017) asking for the estimate amount, invoice file and completion confirmation. Keep the hold on the job until 2025-07-29. Internal escalation to accounts (ESC-102).

**3. 3. Does anything need a human decision and why?**

Yes. Accounts must confirm who approved the estimate and whether the spend is authorised, and resolve the report date and sharing issues, before any invoice is paid or the job is closed. This is a financial decision outside the agent's remit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["What… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-003-2766","reason":"Waiting for Provider","comment":"Waiting for Bennett to provide the estimate amount, the invoice file… | 1 | ✅ verified | Ticket NBL-003-2766 read back after put_on_hold |
| A3 | `escalate_to_human` | {"priority":"P3","team":"accounts","reason":"Case NBL-003-2766 was moved to Result and marked completed (events 018-019) and the agency is a… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Failed or unverified actions
_None._
