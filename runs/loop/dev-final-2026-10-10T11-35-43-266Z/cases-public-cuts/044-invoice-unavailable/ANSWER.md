# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes says the window handle job is complete but the invoice attachment did not arrive. I recorded the landlord's approval and the provider-reported completion, asked the provider for the invoice, asked the tenant to confirm, and set a follow-up for 13 Feb. No human decision is needed yet.

## Where the case stands
Stage: result (completed per provider). Landlord approved (event 012). Waiting on Cedar Homes for the invoice PDF and on the tenant to confirm the fix. Not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as PDF/plain text and confirm the attendance date | Noah Ellis, provider | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Ask tenant to confirm the window handle is fixed and the window opens | Harriet/Nora Quinn, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up 2025-02-13 for invoice and tenant confirmation before final checks | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - Thanks for confirming the window handle is done. The invoice did not come through on our side - please resend it as a PDF or in plain text in the email.
> - Please confirm the date you attended.
> 
> Why: Invoice attachment unavailable; needed for final checks and to match against approval.

**A4 · send_message → Harriet / Nora Quinn (tenant) via email, existing thread (event 007 email)** (verified)

> Hi, our contractor Cedar Homes tells us the handle on the window at the top of your stairs has now been repaired. Could you confirm the window now opens and closes properly? If it doesn't, let us know and we'll get them back. Thanks, Grace

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the work as completed relies only on the provider's statement; it does not confirm the fix or the cost.
- Invoice not seen: amount, issuer and date unchecked.
- Landlord 'Please go ahead' has no cap recorded; no quote existed.
- Landlord has not yet been told of completion.

## Remaining work
- Obtain and record invoice, check issuer/amount/date against the visit (agency, ops)
- Tenant confirmation
- Inform landlord of completion
- Then close_ticket final_checks

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Tenant confirmation
- 2 referenced photos at event 015 unavailable

## Conflicts between sources
- Tenant addressed as Harriet in thread but job names Nora Quinn.
- Two different tenant phone numbers given to the contractor (07700 900307 vs 07700 900251).
- Stage hint says visit not booked, but provider says complete.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved; provider reports the work complete (11 Feb). Invoice unseen, tenant confirmation and landlord notification outstanding; no visit date on record.

**2. What is the next action, who is it for, and through which channel?**

Ask Noah Ellis (Cedar Homes) by email to resend the invoice as PDF/plain text; ask the tenant by email to confirm the fix.

**3. Does anything need a human decision, and why?**

No. This is routine; escalate only if the invoice is flagged (different issuer, above expectations, dated before the visit) or the tenant says it is not fixed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-044-1849","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 09/02 from landlord (Palmer… | 1 | ❌ failed | Ticket NBL-044-1849 not found on read-back |
| A2 | `record_work_result` | {"ticket_ref":"NBL-044-1849","outcome":"completed","evidence":"Cedar Homes (Noah Ellis) email 11/02 (event 019): \"This is complete, invoice… | 1 | ❌ failed | Ticket NBL-044-1849 not found on read-back |
| A3 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Harriet / Nora Quinn","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_r… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `add_note` | {"entity":"NBL-044-1849","note":"Conflicts: tenant addressed as Harriet (events 005/007) but job names Nora Quinn; tenant numbers differ (07… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-044-invoice-unavailable","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 09/02 from l… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_landlord_decision |
| A7 | `record_work_result` | {"ticket_ref":"NBL-044-invoice-unavailable","outcome":"completed","evidence":"Cedar Homes (Noah Ellis) email 11/02 (event 019): \"This is co… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_work_result |
| A8 | `schedule_follow_up` | {"ticket_ref":"NBL-044-invoice-unavailable","due_on":"2025-02-13","purpose":"Check invoice PDF received from Cedar Homes and tenant confirme… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
- A1: Wrong ticket ref used (NBL-044-1849); retried with correct ref NBL-044-invoice-unavailable as A6.
- A2: Wrong ticket ref; retried with correct ref as A7.
