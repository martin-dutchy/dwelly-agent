# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes reported the window handle job complete with an invoice that did not arrive, and no visit is on record. I recorded the landlord's earlier approval, asked the provider for the invoice, visit date and photos, asked the tenant to confirm the fix, and set a follow-up for 13 Feb. Nothing has been closed or paid.

## Where the case stands
Provider assigned (landlord approved 9 Feb). Cedar Homes say the work is complete, but no visit is recorded and the invoice attachment is unavailable. Waiting on the provider for the invoice, visit date and photos, and on the tenant to confirm the fix. Follow-up set for 2025-02-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as a PDF or in plain text, give the date they attended, and send photos of the fitted handle | Noah Ellis, Cedar Homes (contractor) | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask the tenant to confirm whether the window handle is fixed and the window works, and on what date | Tenant (Harriet / Nora Quinn) | email | A3 ✅ |
| 3 | WAIT | Wait for the provider's evidence and the tenant's confirmation; review 2025-02-13 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - The invoice did not come through. Please resend it as a PDF, or in plain text in your reply.
> - What date did you attend, and who let you in?
> - Please send photos of the new handle fitted on the window at the top of the stairs.
> 
> Why: Provider says the job is complete, but no visit is recorded and the invoice attachment is unavailable. We need these before recording the result or closing.

**A3 · request_information → Harriet / Nora Quinn (tenant) (tenant) via email, existing thread (event 007 email)** (verified)

> - Cedar Homes say the window handle at the top of the stairs has been fixed. Has someone been, and does the window now open and close properly?
> - If so, what date did they come?
> 
> Why: We have no visit on record and want to confirm the repair before closing. We'll check back with you by 2025-02-13.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Cedar Homes' 'complete' is a claim only. It does not establish that a visit took place or what the invoice says.
- No work result has been recorded, no invoice recorded and nothing paid.
- The ticket is not closed.
- The landlord has not yet been told the work is reported complete.

## Remaining work
- Receive and record the invoice, and check it matches the approval and the contractor (agency ops)
- Record the work result once the visit date and tenant confirmation are in (agency ops)
- Tell the landlord of the outcome, then close (agency ops)

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Photos of the work (the two photos on the original job email were also unavailable)
- Tenant confirmation
- Correct tenant name and phone number

## Conflicts between sources
- Tenant is named Harriet in events 005/007 but Nora Quinn in events 014-016.
- Tenant phone is 07700 900307 in event 015 but 07700 900251 in event 016.
- Cedar Homes say the job is complete, but the system holds no visit or appointment.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved and Cedar Homes were assigned. Cedar Homes now say it is complete, but there is no recorded visit, no readable invoice, no photos and no tenant confirmation. All of these are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email Noah Ellis at Cedar Homes for the invoice as a PDF or plain text, the attendance date and photos. Email the tenant to confirm the fix. Both were sent, and a follow-up is set for 2025-02-13.

**3. Does anything need a human decision, and why?**

No. This is a routine evidence chase. A human is needed only if the invoice is later flagged, for example above the approval, from a different company, or dated before the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-044-1849","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 2025-02-09, in reply to eve… | 1 | ❌ failed | Ticket NBL-044-1849 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_information` | {"recipient_name":"Harriet / Nora Quinn (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)",… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `add_note` | {"entity":"NBL-044-1849","note":"Event 019: Cedar Homes say complete, invoice unavailable, no visit date or photos; no visit recorded in sys… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-044-1849","due_on":"2025-02-13","purpose":"Check provider has sent invoice PDF, visit date and photos, and tenant has con… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-044-invoice-unavailable","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 2025-02-09, … | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_landlord_decision |
| A7 | `add_note` | {"entity":"NBL-044-invoice-unavailable","note":"Event 019: Cedar Homes say complete, invoice unavailable, no visit date or photos; no visit … | 1 | ✅ verified | NOTE-105 found in the add_note log |
| A8 | `resume_auto` | {"ticket_ref":"NBL-044-invoice-unavailable"} | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after resume_auto |

## Failed or unverified actions
- A1: Not applied: I used the wrong ticket ref (NBL-044-1849). I found the correct ref NBL-044-invoice-unavailable with list_tickets and repeated the action as A6. A4 (note on the wrong ref) is a separate entry that verified, and A7 repeats it on the correct ticket.
