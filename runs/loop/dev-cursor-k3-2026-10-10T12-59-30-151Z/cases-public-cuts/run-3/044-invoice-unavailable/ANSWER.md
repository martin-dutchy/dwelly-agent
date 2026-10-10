# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes reports the window handle repair complete, but the invoice did not come through and the tenant has not confirmed. I recorded the result, asked the contractor for the invoice and visit date, asked the tenant to confirm, and set a follow-up for 2025-02-13. No human decision is needed yet.

## Where the case stands
Stage result: Cedar Homes says the window handle job is complete. The invoice attachment was unavailable and has not been seen. Tenant has not confirmed. Landlord approved sending a contractor ("Please go ahead") but no cost is on record. Not ready to close.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as a PDF or plain text with amount, date and VAT, and state the visit date | Noah Ellis, Cedar Homes (contractor) | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm the window now works | Nora Quinn, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up 2025-02-13 on the invoice and tenant confirmation, then do final checks and tell the landlord | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - Thanks for confirming the window handle is done. The invoice attachment didn't come through to us - please resend it as a PDF or put the amount, date and VAT in a plain-text reply.
> - What date did you attend?
> 
> Why: Invoice attachment unavailable; needed to check it and complete final checks.

**A3 · send_message → Nora Quinn (tenant) via email, existing thread (event 014 email)** (verified)

> Hello, Cedar Homes have told us the window handle at the top of the stairs has now been fixed. Could you let us know whether the window opens and closes properly now? If anything is still wrong, tell us and we'll get them back. We'll check in with you again within the next few days if we haven't heard.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the work as completed rests only on the provider's word and does not confirm the fix or the tenant's satisfaction.
- Nothing is known about the invoice amount, date or issuer, or whether it matches what the landlord approved.
- The landlord has not yet been told the outcome.

## Remaining work
- Obtain and check the invoice (amount, issuer Cedar Homes, date on or after visit) and record it, owner: agency ops
- Get tenant confirmation
- Tell the landlord the outcome and cost, then close the ticket
- Add the visit date once Cedar Homes gives it

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Tenant confirmation
- Spend limit and landlord approval amount not on file

## Conflicts between sources
- Tenant is addressed as Harriet (events 005/007) but Nora Quinn elsewhere; tenant phone is 07700 900307 in the provider job email but 07700 900251 in event 016. Treated as the same household; to verify.
- Stage on the ticket record is mp_time while history shows the provider assigned; the provider says the work is complete without a recorded visit.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The contractor says the work is done. The invoice is unseen, the tenant has not confirmed, and the landlord has not been told the outcome. The ticket is not ready to close.

**2. What is the next action, who is it for, and through which channel?**

Ask Cedar Homes (Noah Ellis) by email for the invoice as PDF or plain text plus the visit date, and ask the tenant by email to confirm the fix. Both are sent.

**3. Does anything need a human decision, and why?**

No. This is routine chasing. It would only go to accounts if the invoice turns out to be above the approval, from a different company, or dated before the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-044-invoice-unavailable","outcome":"completed","evidence":"Cedar Homes (Noah Ellis) email 2025-02-11 13:22 (event 019): \… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Nora Quinn","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","body":"Hello, Ceda… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-044-invoice-unavailable","due_on":"2025-02-13","purpose":"Check invoice received from Cedar Homes and tenant confirmation… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
