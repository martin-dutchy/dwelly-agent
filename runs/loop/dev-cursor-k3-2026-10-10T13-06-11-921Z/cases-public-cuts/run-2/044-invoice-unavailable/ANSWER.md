# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes reported the window handle job complete, but the invoice was unavailable and no visit is on record. I recorded the landlord's approval, asked the provider for the invoice, date and photos, asked the tenant to confirm the fix, and set a follow-up for 14 Feb. No human decision is needed yet.

## Where the case stands
Provider assigned (Cedar Homes), landlord approved. Provider says the job is complete, but no visit date is recorded and the invoice and photos are unavailable. Waiting on Cedar Homes (invoice, date, photos) and the tenant (confirmation). Follow-up set for 2025-02-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as a PDF or in plain text, give the attendance date and send photos of the repair | Noah Ellis, Cedar Homes (contractor) | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm the handle is fixed and the window works, and say when they will next hear from us (14 Feb) | Tenant | email | A3 ✅ |
| 3 | WAIT | Wait for the invoice, visit date, photos and tenant confirmation; review 2025-02-14 | internal | internal | A10 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - Your invoice did not come through on our side. Please resend it as a PDF or in plain text.
> - What date did you attend the property?
> - Please send photos of the finished window handle.
> 
> Why: Provider says the job is complete but no visit is recorded and the invoice attachment is unavailable; we need these before closing or paying.

**A3 · send_message → Tenant (tenant) via email, existing thread (event 007 email)** (verified)

> Hi, Cedar Homes have told us the window handle at the top of your stairs has been repaired. Could you let us know whether this is right, and whether the window now opens and closes properly? We are waiting on their invoice and photos, and will be in touch again by 14 February.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the work was done: it rests on the provider's say-so only.
- The invoice has not been seen, so no amount is recorded, approved or paid.
- The ticket is not closed.
- The landlord has not yet been told the outcome.

## Remaining work
- Cedar Homes to supply invoice, attendance date and photos.
- The tenant to confirm the fix.
- Record the work result and invoice, tell the landlord, then close (agency, after 14 Feb review).

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Photos of the completed work
- Tenant confirmation

## Conflicts between sources
- Tenant signs as Harriet (event 007) but job emails name Nora Quinn.
- Two tenant phone numbers: 07700 900307 (event 015) and 07700 900251 (event 016).
- The hint says the visit is not booked, but the provider says the job is complete with no visit recorded.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved the work on 9 Feb and Cedar Homes was assigned. Cedar Homes now says the work is complete, but no visit is recorded and the invoice and photos are missing. Still outstanding: the invoice, visit date, photos, tenant confirmation and informing the landlord, then closing.

**2. What is the next action, who is it for, and through which channel?**

Email Noah Ellis at Cedar Homes for the invoice (PDF or plain text), attendance date and photos. Email the tenant to confirm the fix. Both messages were sent; follow-up on 14 Feb.

**3. Does anything need a human decision, and why?**

No. This is routine evidence gathering; escalate only if the provider does not answer by the review date or the invoice is flagged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-044-1849","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 09/02/2025"} | 1 | ❌ failed | Ticket NBL-044-1849 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-044-1… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-044-1849","note":"Conflicts: tenant signs as Harriet (event 007) but job/provider emails name Nora Quinn; two tenant numbers … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-044-1849","due_on":"2025-02-14","party":"Cedar Homes and tenant","purpose":"Check invoice, visit date, photos received an… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-044-1849"} | 1 | ❌ failed | Ticket NBL-044-1849 not found on read-back |
| A7 | `record_landlord_decision` | {"ticket_ref":"NBL-044-invoice-unavailable","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 09/02/2025"} | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_landlord_decision |
| A8 | `resume_auto` | {"ticket_ref":"NBL-044-invoice-unavailable"} | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after resume_auto |
| A9 | `add_note` | {"entity":"NBL-044-invoice-unavailable","note":"Provider reports done (event 019) but no visit date recorded; invoice and photos unavailable… | 1 | ✅ verified | NOTE-105 found in the add_note log |
| A10 | `schedule_follow_up` | {"ticket_ref":"NBL-044-invoice-unavailable","due_on":"2025-02-14","party":"Cedar Homes and tenant","purpose":"Check invoice, visit date, pho… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
- A1: First attempt used the wrong ticket reference (the provider's ext code). Retried with the correct ref from list_tickets as A7, which verified.
- A6: Same wrong reference. Retried as A8, which verified.
- A4: Note was filed against the wrong reference; repeated correctly as A9.
- A5: Follow-up was filed against the wrong reference; repeated correctly as A10.
