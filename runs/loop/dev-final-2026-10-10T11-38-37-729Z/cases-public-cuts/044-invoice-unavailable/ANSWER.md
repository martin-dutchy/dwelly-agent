# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes say the window handle job is complete but the invoice attachment did not arrive. I recorded the result, asked the provider to resend the invoice and asked the tenant to confirm the fix. A follow-up is set for 2025-02-14.

## Where the case stands
Stage: work result recorded as completed on provider's word only (event 019). Invoice not seen (attachment unavailable). Tenant confirmation outstanding. Landlord approved on 2025-02-09 ("Please go ahead") and has not yet been told the outcome.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as a PDF or plain text, and confirm the attendance date | Noah Ellis, Cedar Homes, contractor | email | A2 ✅ |
| 2 | CHASE_TENANT | Ask the tenant to confirm the handle is fixed and the window works | Harriet / Nora Quinn, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up on 2025-02-14 for the invoice and tenant confirmation, then tell the landlord and close | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - Thanks for confirming the job is complete. The invoice did not come through on our side. Please could you resend it as a PDF, or put the total, invoice date and company name in a plain-text reply?
> - Please also confirm the date you attended.
> 
> Why: Invoice attachment unavailable; needed for final checks and payment.

**A3 · request_information → Harriet / Nora Quinn (tenant) via email, existing thread (event 007 email)** (verified)

> - Cedar Homes tell us the window handle at the top of the stairs has been fixed. Can you confirm it is fixed and the window now opens and closes properly?
> 
> Why: Need tenant confirmation before closing the job.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the result does not confirm the repair worked; only the provider has said so.
- Nothing is known about the invoice amount, issuer or date, so it is not yet checked against the approval.
- The ticket is not closed and the landlord has not yet been told.

## Remaining work
- Obtain a readable invoice, then record and check it (agency)
- Obtain tenant confirmation (agency/tenant)
- Tell the landlord the outcome, then close the ticket (agency)

## Missing or unavailable information
- Invoice (attachment unavailable)
- Tenant confirmation
- Visit date
- Two photos referenced at event 015 were never visible

## Conflicts between sources
- Hints say the visit is not booked, yet the provider says the work is complete. I treated the provider's statement as unverified until the tenant confirms.
- The tenant is named Harriet in the agency emails and Nora Quinn in the job record. I did not resolve this.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the work complete, with no visit booking recorded. The invoice has not been seen, the tenant has not confirmed, and the landlord has not been told the outcome.

**2. What is the next action, who is it for, and through which channel?**

Email Cedar Homes (Noah Ellis) for a readable invoice and the attendance date. Email the tenant to confirm the fix. Follow up on 2025-02-14.

**3. Does anything need a human decision, and why?**

No. This is routine and the next steps are information requests. Escalate only if the invoice is above approval, from a different company or dated before the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-044-invoice-unavailable","outcome":"completed","evidence":"Cedar Homes (Noah Ellis) email 2025-02-11 13:22, event 019: \"… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_information` | {"recipient_name":"Harriet / Nora Quinn","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","question… | 2 | ✅ verified | REQ-104 found in the request_information log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-044-invoice-unavailable","due_on":"2025-02-14","purpose":"Chase Cedar Homes for readable invoice and tenant for confirmat… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
- A3: Attempt 1 was NOT APPLIED; retried once and attempt 2 verified (REQ-104).
- A4: The API reported a timeout but read-back showed FUP-103 in place; not retried.
