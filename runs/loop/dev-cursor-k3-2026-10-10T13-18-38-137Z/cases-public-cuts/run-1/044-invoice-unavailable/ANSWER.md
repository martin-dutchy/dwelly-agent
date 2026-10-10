# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes reported the handle repair complete but the invoice attachment is unavailable and no visit is recorded. I recorded the landlord's approval, asked Cedar for the invoice, visit date and photos, asked the tenant to confirm, and set a follow-up for 14 Feb. No human decision is needed yet.

## Where the case stands
Provider assigned (Cedar Homes), landlord approved. Cedar says work is complete but no visit date, readable invoice or photos are on file. Waiting on Cedar and the tenant; review 2025-02-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as PDF/plain text, give the visit date and send photos | Noah Ellis, Cedar Homes (contractor) | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm the handle was fitted and the window works | Nora Quinn, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up on 2025-02-14 for evidence, then record result/invoice and close | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - The invoice attachment did not reach us. Please resend it as a PDF or put the amount in a plain-text reply.
> - What date did you attend Flat 21, 129 Juniper Mews?
> - Please send photos of the new window handle fitted at the top of the stairs.
> 
> Why: Provider says the job is complete but no visit date is recorded and the invoice is unreadable; we need these before anything is paid or closed.

**A3 · send_message → Nora Quinn (tenant) via email, existing thread (event 007 email)** (verified)

> Hello, Cedar Homes have told us the window handle at the top of your stairs has been fixed. Has someone been to fit it, and does the window open and close properly now? If anything is still wrong, please let us know. We are checking the details with Cedar Homes and will update you by 14 February.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the work was done, the cost, or that the invoice is valid.
- Work result not recorded, ticket not closed, no payment approved.
- Landlord approval 'Please go ahead' set no spend cap.

## Remaining work
- Receive readable invoice, visit date and photos from Cedar Homes
- Tenant confirmation
- Record work result and invoice, check against approval, tell landlord, close

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Photos of work
- Tenant confirmation

## Conflicts between sources
- Tenant is called Harriet (events 005/007) but Nora Quinn in the provider emails (014-016).
- Two tenant phone numbers: 07700 900307 (event 015) and 07700 900251 (event 016).
- Stage shows 'visit not yet booked' while the provider says the work is complete.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and Cedar Homes assigned. Cedar says the job is done, but the invoice is unreadable, there is no visit date or photos, and the tenant has not confirmed. The ticket remains open.

**2. What is the next action, who is it for, and through which channel?**

Email to Cedar Homes (Noah Ellis) asking for the invoice, visit date and photos, and email to the tenant asking her to confirm the fix. Follow-up on 2025-02-14.

**3. Does anything need a human decision, and why?**

No. This is routine evidence-gathering. It escalates only if the invoice is above approval, from another company, or dated before the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-044-1849","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 2025-02-09","conditions":"R… | 1 | ❌ failed | Ticket NBL-044-1849 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Nora Quinn","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","body":"Hello, Ceda… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-044-1849","due_on":"2025-02-14","party":"Cedar Homes / tenant","purpose":"Check for invoice, visit date, photos and tenan… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"NBL-044-1849","note":"Cedar Homes said 'complete, invoice attached' (event 019) but attachment unavailable and no visit recorded.… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-044-invoice-unavailable","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 2025-02-09",… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_landlord_decision |
| A7 | `add_note` | {"entity":"NBL-044-invoice-unavailable","note":"Cedar Homes said 'complete, invoice attached' (event 019) but attachment unavailable and no … | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
- A1: Used the wrong ticket ref; retried with the correct ref NBL-044-invoice-unavailable (A6 verified).
- A5: Note was verified but filed under the wrong ref; repeated under the correct ref as A7.
