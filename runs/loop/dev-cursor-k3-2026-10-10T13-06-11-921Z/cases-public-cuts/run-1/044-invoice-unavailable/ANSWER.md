# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes reports the handle job complete but the invoice is unavailable and no visit is on record. I recorded the landlord's approval, asked the provider for the invoice, date and photos, asked the tenant to confirm, and put the job on hold to 14 Feb.

## Where the case stands
Provider assigned (Cedar Homes), landlord approved 9 Feb. Provider says complete on 11 Feb but no visit is recorded, the invoice attachment is unavailable, and the tenant has not confirmed. On hold until 14 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes for the invoice as PDF or text, attendance date and photos | Noah Ellis, Cedar Homes (contractor) | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask the tenant to confirm the window handle is fixed and the window works | Nora Quinn, tenant | email | A3 ✅ |
| 3 | WAIT | Hold awaiting provider and tenant, review 2025-02-14 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - The invoice did not come through. Please resend it as a PDF or plain text, with the total and VAT.
> - What date did you attend the property?
> - Please send photos of the finished window handle.
> 
> Why: Cedar Homes says the job is complete, but no visit is recorded and the invoice attachment is unavailable. We cannot close or pay without these.

**A3 · request_information → Nora Quinn (tenant) (tenant) via email, existing thread (event 007 email)** (verified)

> - Cedar Homes says the window handle at the top of the stairs has been fixed. Has someone attended, and does the window now open and close properly?
> 
> Why: We need your confirmation before we close the job. We'll check back with you by 2025-02-14.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing recorded confirms the work was done, the cost or who pays.
- No invoice seen, so nothing is approved for payment.
- Work result not recorded and ticket not closed.

## Remaining work
- Receive and record the invoice, visit date and photos (agency, review 14 Feb)
- Get tenant confirmation
- Record work result, tell the landlord, then close with final checks

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Photos
- Tenant confirmation

## Conflicts between sources
- Tenant is named Harriet in events 005/007 but Nora Quinn in events 014/015; tenant phone numbers differ (07700 900307 vs 07700 900251). Used the thread's address for the email and flagged the mismatch.
- The case hints say 'visit not yet booked', but the provider says the work is complete.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider claims completion, but the invoice, visit date, photos and tenant confirmation are outstanding. The job is on hold, review 14 Feb.

**2. What is the next action, who is it for, and through which channel?**

Emails to Cedar Homes (invoice, date, photos) and to the tenant (confirm fix).

**3. Does anything need a human decision, and why?**

No. It is routine and waiting on information. Escalate only if the invoice is flagged on arrival.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-044-1849","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 2025-02-09"} | 1 | ❌ failed | Ticket NBL-044-1849 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_information` | {"recipient_name":"Nora Quinn (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","questions… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-044-1849","reason":"Waiting for Provider","comment":"Cedar Homes says complete; need invoice (unavailable), visit date, p… | 1 | ❌ failed | Ticket NBL-044-1849 not found on read-back |
| A5 | `record_landlord_decision` | {"ticket_ref":"NBL-044-invoice-unavailable","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 2025-02-09"} | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_landlord_decision |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-044-invoice-unavailable","reason":"Waiting for Provider","comment":"Cedar Homes says complete; need invoice (unavailable)… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after put_on_hold |

## Failed or unverified actions
- A1: Wrong ticket ref used; retried with the correct ref from list_tickets (A5).
- A4: Wrong ticket ref used; retried with the correct ref (A6).
