# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approved the handle fix and Cedar Homes now reports it complete, but the invoice did not arrive and the tenant has not confirmed. I recorded the approval and the claimed result, asked the provider for the invoice and the tenant for confirmation, and set a follow-up for 2025-02-14.

## Where the case stands
Result stage: Cedar Homes says the handle repair is complete (event 019). Invoice not seen (attachment unavailable). Tenant has not confirmed. Landlord approved the work ("Please go ahead"). Not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as a PDF or plain-text amount, and confirm the visit date | Noah Ellis, Cedar Homes, contractor | email | A3 ✅ |
| 2 | REQUEST_INFORMATION | Ask the tenant to confirm the window handle is fixed | Nora Quinn, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up 2025-02-14 on the invoice and tenant confirmation, then run final checks | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - Thanks for confirming the window handle is done. The invoice did not come through on our side. Could you resend it as a PDF, or put the amount (with VAT) and the date of the visit in a plain-text reply?
> - Please also confirm the date you attended.
> 
> Why: Invoice attachment unavailable; needed to check against approval and file before closing.

**A4 · request_information → Nora Quinn (tenant) (tenant) via email, existing thread (event 014 email)** (verified)

> - Cedar Homes say the window handle at the top of the stairs has been repaired. Is it fixed and does the window open and close properly now?
> 
> Why: Need tenant confirmation before closing. We will check back with you by 2025-02-14.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the work as completed rests on the provider's claim only; it does not confirm the fix, the invoice amount or who pays.
- No invoice recorded or filed; contents unseen.
- Landlord approval had no spend cap and was given before any price was known.

## Remaining work
- Obtain and record the invoice, checking it against the approval and contractor (agency)
- Tenant confirmation of the fix (agency, awaiting tenant)
- Tell the landlord the outcome, then close (agency)

## Missing or unavailable information
- Invoice (attachment unavailable)
- Tenant confirmation
- Visit date (never recorded in the history)

## Conflicts between sources
- Tenant is addressed as Harriet (events 005/007) but named Nora Quinn on the job; contact numbers differ (07700 900307 in the provider job email, 07700 900251 in event 016). The two phone numbers were not resolved. I used the existing email threads.
- Hint says visit not booked, yet the provider says it is complete; the visit date is unrecorded.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the job complete. The invoice is unseen, the tenant has not confirmed, and the landlord has not been told the outcome. The ticket is not closed.

**2. What is the next action, who is it for, and through which channel?**

Email Cedar Homes (Noah Ellis) for the invoice as a PDF or plain text, and email the tenant to confirm the fix. Both requests are sent.

**3. Does anything need a human decision, and why?**

No. Everything outstanding is routine chasing.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-044-invoice-unavailable","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 09/02"} | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_landlord_decision |
| A2 | `record_work_result` | {"ticket_ref":"NBL-044-invoice-unavailable","outcome":"completed","evidence":"Cedar Homes (Noah Ellis) email 2025-02-11 event 019 says the j… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_work_result |
| A3 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A4 | `request_information` | {"recipient_name":"Nora Quinn (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","questions… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-044-invoice-unavailable","due_on":"2025-02-14","purpose":"Chase Cedar Homes for invoice and tenant for confirmation; then… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
