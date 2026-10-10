# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider claims completion with an unreadable invoice and no recorded visit. I recorded the landlord's approval, asked the provider for the invoice, date and photos, asked the tenant to confirm the fix, and put the ticket on hold until 14 Feb. No human decision is needed yet.

## Where the case stands
Provider Cedar Homes (assigned 9 Feb on landlord's "Please go ahead") says the job is complete, but no visit is recorded and the invoice attachment is unavailable. Ticket on hold awaiting the provider's invoice, visit date and photos, and the tenant's confirmation. Review 14 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes for a readable invoice, attendance date and photos of the repair, reply by 14 Feb | Noah Ellis, Cedar Homes, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm whether the visit happened and the window handle works | Nora Quinn, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 14 Feb for provider and tenant replies | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - The invoice attachment did not reach us. Please resend it as a PDF or plain text, including the total.
> - What date did you attend Flat 21, 129 Juniper Mews, and who let you in?
> - Please send photos of the repaired window handle at the top of the stairs.
> 
> Why: Cedar Homes says the job is complete but no visit is recorded and the invoice is unreadable. We need these before anything is closed or paid. Please reply by 14 Feb.

**A3 · send_message → Nora Quinn (tenant) via email, existing thread (event 014 email)** (verified)

> Hi, Cedar Homes have told us the window handle at the top of the stairs has been repaired. We have no visit date on record, so could you tell us whether they came, when, and whether the handle is fixed and the window now opens and closes properly? If it isn't sorted, let us know and we'll get them back. We'll check in with you again by 14 February. Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is closed, paid or invoiced: the 'complete' claim is unverified.
- The recorded landlord approval covers fitting a handle only; no spend cap was given and no amount is known.
- The invoice contents are unseen.

## Remaining work
- Cedar Homes to send invoice, visit date and photos
- Tenant to confirm the fix
- Then record the work result and invoice, check the invoice against the approval and the assigned contractor, tell the landlord, and close
- Landlord is not yet told of the outcome; tell them once it is verified

## Missing or unavailable information
- Readable invoice and amount
- Date of attendance and who gave access
- Photos of the repair
- Tenant confirmation

## Conflicts between sources
- Tenant is addressed as Harriet (events 005/007) but is Nora Quinn on the job emails; treated as the same tenant.
- Two tenant phone numbers: 07700 900307 (events 015/017) and 07700 900251 (event 016).
- The hint says 'visit not yet booked', yet the provider says the work is done.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider says the job is done, but there is no visit record, no readable invoice, no photos and no tenant confirmation. Approval is recorded. The ticket is on hold until 14 Feb.

**2. What is the next action, who is it for, and through which channel?**

Email to Noah Ellis at Cedar Homes asking for the invoice, visit date and photos. Email to the tenant asking her to confirm the fix.

**3. Does anything need a human decision, and why?**

Not yet. This is routine evidence gathering. Escalate to accounts only if the invoice is above approval, from a different company or dated before the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-044-1849","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 09/02/2025"} | 1 | ❌ failed | Ticket NBL-044-1849 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Nora Quinn","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-044-1849","reason":"Waiting for Provider","comment":"Cedar Homes says complete (event 019) but no visit recorded; invoice… | 1 | ❌ failed | Ticket NBL-044-1849 not found on read-back |
| A5 | `record_landlord_decision` | {"ticket_ref":"NBL-044-invoice-unavailable","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 09/02/2025"} | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_landlord_decision |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-044-invoice-unavailable","reason":"Waiting for Provider","comment":"Cedar Homes says complete (event 019) but no visit re… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after put_on_hold |

## Failed or unverified actions
- A1: Wrong ticket ref used; retried with the correct ref from list_tickets (A5)
- A4: Wrong ticket ref used; retried with the correct ref (A6)
