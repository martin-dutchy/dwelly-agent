# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's "Please go ahead" is now recorded as approval. Cedar Homes reports the handle job complete but the invoice did not arrive. I asked the contractor for the invoice and visit date, asked the tenant to confirm the fix, and set a follow-up for 13 Feb.

## Where the case stands
Provider assigned (landlord approved 9 Feb). Cedar Homes says the job is complete (event 019) but the invoice attachment is unavailable. No visit date or tenant confirmation is on record. Waiting on Cedar Homes (invoice PDF, visit date) and the tenant (confirmation). Follow-up set for 2025-02-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as a PDF or plain text and confirm the visit date | Noah Ellis, Cedar Homes (contractor) | email | A2 ✅ |
| 2 | CHASE_TENANT | Ask the tenant to confirm the handle is replaced and the window opens | Tenant (Nora Quinn / Harriet) | email | A3 ✅ |
| 3 | WAIT | Review 2025-02-13, then record result and invoice and close if confirmed | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - Thanks for confirming the job is complete. The invoice did not come through on our side. Please resend it as a PDF or put the amount in a plain-text reply.
> - Please confirm the date you attended and that the handle on the window at the top of the stairs was replaced.
> 
> Why: Attachment unavailable; need the invoice and visit date to complete final checks.

**A3 · request_information → Tenant (Nora Quinn / Harriet) (tenant) via email, existing thread (event 007 email)** (verified)

> - Cedar Homes say the window handle at the top of the stairs has been replaced. Can you confirm it is fixed and the window now opens?
> 
> Why: Tenant confirmation needed before closing. We will check back by 2025-02-13.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the landlord's approval does not set a cost; no invoice amount has been seen.
- The contractor's word that the job is complete is not yet confirmed by the tenant, so no work result has been recorded.
- The ticket is not closed.

## Remaining work
- Cedar Homes: invoice PDF and visit date
- Tenant: confirm the fix
- Agency: record work result and invoice, tell landlord, close (review 2025-02-13)

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Tenant confirmation

## Conflicts between sources
- Tenant is called Harriet in the agency emails but Nora Quinn in the job emails.
- Two different tenant phone numbers appear (07700 900307 and 07700 900251).
- The system stage shows no visit, but the provider says the job is complete.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The job is approved and assigned. The contractor claims it is complete. The invoice, visit date and tenant confirmation are outstanding, then final checks and closing.

**2. What is the next action, who is it for, and through which channel?**

Ask Cedar Homes (Noah Ellis) by email for the invoice as PDF or plain text and the visit date. Ask the tenant by email to confirm the fix.

**3. Does anything need a human decision, and why?**

No. This is routine; no spend above limits or other high-stakes issue has arisen.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-044-invoice-unavailable","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 2025-02-09, … | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_information` | {"recipient_name":"Tenant (Nora Quinn / Harriet)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)",… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `add_note` | {"entity":"NBL-044-invoice-unavailable","note":"Tenant name conflict: emails address Harriet, job emails say Nora Quinn; two tenant numbers … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-044-invoice-unavailable","due_on":"2025-02-13","purpose":"Check invoice PDF received from Cedar Homes and tenant confirma… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
