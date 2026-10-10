# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Window handle job: landlord approved, Cedar Homes reports complete but the invoice was not attached. Recorded landlord approval, asked the contractor for the invoice and the tenant for confirmation, and set a follow-up for 14 Feb.

## Where the case stands
Provider assigned (Cedar Homes), landlord approved 'Please go ahead'. Contractor says the work is complete but invoice attachment unavailable. Tenant has not confirmed. Not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as PDF or plain text | Noah Ellis, contractor | email | A3 ✅ |
| 2 | CHASE_TENANT | Ask tenant to confirm handle fixed and window opens | Nora Quinn, tenant | email | A4 ✅ |
| 3 | WAIT | Review 14 Feb for invoice and tenant confirmation, then final checks | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - Thanks for confirming the work is complete. The invoice didn't come through - could you resend it as a PDF or put the amount and date in a plain-text reply?
> 
> Why: Attachment was unavailable; we need the invoice to complete final checks.

**A4 · request_information → Nora Quinn (tenant) via email, existing thread (event 007 email)** (verified)

> - Cedar Homes say the window handle repair at the top of the stairs is complete. Can you confirm the handle is fixed and the window now opens?
> 
> Why: We need your confirmation before closing the job. We'll check back with you by 14 February.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Contractor's 'complete' is their claim only; not yet confirmed by tenant
- Invoice not seen: amount, payee and date unknown
- No visit date was ever recorded in the history

## Remaining work
- Receive and record invoice, check vs approval and contractor
- Tenant confirmation, record work result
- Inform landlord, then close

## Missing or unavailable information
- Invoice from Cedar Homes
- Tenant confirmation
- Visit date

## Conflicts between sources
- Tenant name: Harriet (event 005/007) vs Nora Quinn (event 014/015); tenant contact number differs between events 015 and 016 (07700 900307 vs 07700 900251). Not resolved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned; contractor says complete. Outstanding: invoice (unseen), tenant confirmation, landlord update, closure.

**2. What is the next action, who is it for, and through which channel?**

Email Cedar Homes (Noah Ellis) for the invoice, and email tenant Nora Quinn for confirmation of the fix.

**3. Does anything need a human decision, and why?**

No; routine follow-up only.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-044-invoice-unavailable","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 2025-02-09"} | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_landlord_decision |
| A2 | `schedule_follow_up` | {"ticket_ref":"NBL-044-invoice-unavailable","due_on":"2025-02-14","purpose":"Check invoice received from Cedar Homes and tenant confirmation… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A3 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `request_information` | {"recipient_name":"Nora Quinn","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","questions":["Cedar… | 1 | ✅ verified | REQ-103 found in the request_information log |

## Failed or unverified actions
_None._
