# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes reported the handle repair complete but the invoice was unavailable and no visit is on record. I recorded the landlord's approval, asked the provider for the invoice, visit date and photos, asked the tenant to confirm the fix, and set a review for 14 Feb.

## Where the case stands
Provider assigned (Cedar Homes). Landlord approved. Provider says work complete but no visit is recorded and the invoice attachment was unavailable. Waiting on Cedar Homes (invoice, visit date, photos) and tenant confirmation. Follow-up set for 2025-02-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as PDF or in the email body, with the attendance date and photos | Noah Ellis, Cedar Homes (contractor) | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm the visit happened and the window works; next update by 14 Feb | Nora Quinn, tenant | email | A3 ✅ |
| 3 | WAIT | Wait for the provider and tenant; review 2025-02-14 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - The invoice did not come through on our side. Please resend it as a PDF or in the body of an email.
> - What date did you attend the property?
> - Please send photos of the repaired window handle.
> 
> Why: Cedar Homes says the job is complete but no visit is recorded and the invoice attachment is unavailable. We need these before closing or paying.

**A3 · send_message → Nora Quinn (tenant) via email, existing thread (event 014 email)** (verified)

> Hello, Cedar Homes have told us the window handle at the top of your stairs has been repaired. Could you please confirm whether they came and whether the window now opens and closes properly? We are waiting on their invoice and photos, and will update you by 14 February at the latest. Thank you.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Provider's 'complete' is a claim, not verified: no visit date, photos or invoice seen.
- No invoice has been recorded, approved or paid, and the ticket is not closed.
- The landlord's 'Please go ahead' set no spend cap.

## Remaining work
- Cedar Homes: invoice, attendance date, photos
- Tenant confirmation that the fix works
- Record work result, invoice check, tell landlord, then close (agency, after 14 Feb review)

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Photos of the work
- Which tenant name/phone is correct

## Conflicts between sources
- Tenant is called Harriet in events 005/007 but Nora Quinn in events 014-016.
- Two tenant phone numbers on file (07700 900307 and 07700 900251). I used the existing email thread.
- The stage shows mp_time and the hint says visit not booked, but the provider says the work is complete.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved and Cedar Homes was assigned. Cedar Homes says the job is complete, but there is no recorded visit, no invoice seen and no tenant confirmation. All three are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email Cedar Homes (Noah Ellis) for the invoice, attendance date and photos. Email the tenant to confirm the fix. Both are sent; review on 14 Feb.

**3. Does anything need a human decision, and why?**

No. This is routine evidence gathering. A human is needed only if the invoice is above any approval, from a different company, or dated before the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-044-1849","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 09/02"} | 1 | ❌ failed | Ticket NBL-044-1849 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Nora Quinn","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-044-1849","note":"Conflicts: tenant named as Harriet (events 005/007) vs Nora Quinn (014-016); two tenant numbers on file (07… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-044-1849","due_on":"2025-02-14","purpose":"Check Cedar Homes has sent invoice, visit date and photos, and tenant has conf… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-044-invoice-unavailable","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 09/02"} | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_landlord_decision |
| A7 | `resume_auto` | {"ticket_ref":"NBL-044-invoice-unavailable"} | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after resume_auto |

## Failed or unverified actions
- A1: First attempt used the wrong ticket ref (NBL-044-1849). Retried with the correct ref from list_tickets as A6, which verified.
