# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes reported the window handle job complete but the invoice did not arrive. I recorded the landlord's earlier approval, asked the provider for the invoice and visit date, asked the tenant to confirm the fix, and set a follow-up for 13 Feb.

## Where the case stands
Landlord approved; Cedar Homes assigned 9 Feb and say the work is complete (11 Feb) but the invoice attachment was unavailable. No visit date, tenant confirmation or invoice yet. Ticket at mp_time stage in system.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as PDF or plain text, and give the visit date | Noah Ellis, Cedar Homes, contractor | email | A2 ✅ |
| 2 | CHASE_TENANT | Ask tenant to confirm the handle is fixed and the window works | Tenant (Harriet / Nora Quinn) | email | A3 ✅ |
| 3 | WAIT | Review 13 Feb for invoice and tenant confirmation, then final checks and inform landlord | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - Thanks for confirming the work is complete. The invoice did not come through - please resend it as a PDF or put the amount in a plain-text reply.
> - What date did you attend?
> 
> Why: Invoice attachment unavailable; needed for final checks.

**A3 · request_information → Tenant (tenant) via email, existing thread (event 007 email)** (verified)

> - Cedar Homes say the window handle at the top of the stairs has been fixed. Can you confirm the handle is on and the window now opens and closes properly?
> 
> Why: Tenant confirmation needed before closing.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Provider's word that the work is complete is not verified by the tenant
- No invoice has been seen, so no amount or payee is established and nothing is approved for payment
- Ticket not closed; landlord not yet told of completion

## Remaining work
- Receive and record invoice (check payee is Cedar Homes and amount)
- Tenant confirmation
- Record work result, tell landlord, close ticket

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Tenant confirmation
- Original photos unavailable

## Conflicts between sources
- Tenant named Harriet in the agency emails but Nora Quinn on the provider job; two different phone numbers (07700 900307 and 07700 900251) given to the provider. Not resolved; ask the tenant for the best number.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned; provider says complete. Outstanding: invoice, visit date, tenant confirmation, landlord update, closure.

**2. What is the next action, who is it for, and through which channel?**

Ask Cedar Homes (Noah Ellis) by email for the invoice PDF and visit date; ask the tenant by email to confirm the fix.

**3. Does anything need a human decision, and why?**

No. This is routine follow-up. Escalate only if the invoice is above expectations or from another company.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-044-invoice-unavailable","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 2025-02-09"} | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","questions":["Cedar Hom… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-044-invoice-unavailable","due_on":"2025-02-13","purpose":"Chase Cedar Homes for invoice PDF and tenant for confirmation; … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
