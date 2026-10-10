# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes say the window handle repair is complete but the invoice attachment did not arrive. I recorded the result as completed and asked the provider for the invoice and visit date. I asked the tenant to confirm the fix, and set a follow-up for 2025-02-14.

## Where the case stands
Stage: result recorded as completed per provider claim. Waiting on Cedar Homes for the invoice and visit date, and on the tenant to confirm the fix. Landlord not yet told of completion. Follow-up set for 2025-02-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as a PDF or plain text, and confirm the visit date | Noah Ellis, Cedar Homes, contractor | email | A2 ✅ |
| 2 | CHASE_TENANT | Ask the tenant to confirm the window now opens and closes properly | Harriet / Nora Quinn, tenant | email | A3 ✅ |
| 3 | WAIT | Wait for the invoice and tenant confirmation, review 2025-02-14 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - Thanks for confirming the work is complete. The invoice did not come through on our side. Please could you resend it as a PDF or put the amount, date and invoice number in a plain-text reply?
> - Please also confirm the date of the visit.
> 
> Why: Invoice attachment unavailable; needed to check against the landlord's approval before final checks.

**A3 · request_information → Harriet / Nora Quinn, tenant (tenant) via email, existing thread (event 007 email)** (verified)

> - Cedar Homes say the window handle at the top of your stairs has been fixed. Can you open and close the window properly now?
> 
> Why: Need the tenant's confirmation before closing the job. We will check back with you by 2025-02-14.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the result as completed rests on the provider's word only and does not confirm the repair worked.
- No invoice has been seen, so its amount, issuer and date are unchecked and nothing is approved for payment.
- The landlord's 'Please go ahead' had no spend cap; it is not confirmation of any amount.
- The ticket is not closed.

## Remaining work
- Receive and record the invoice, then check it against the approval and the assigned contractor (agency)
- Get the tenant's confirmation (agency)
- Tell the landlord the work is done, then close the ticket (agency)

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Tenant confirmation
- Photos referenced in event 015 were never seen

## Conflicts between sources
- Tenant name: Harriet (event 007) vs Nora Quinn (provider emails)
- Tenant phone: 07700 900307 (events 015/017) vs 07700 900251 (event 016)
- The hint says no visit was booked, yet the provider reports completion with no date

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the work complete. Still outstanding: the invoice (unseen), the visit date, the tenant's confirmation and telling the landlord. Then final checks and closing.

**2. What is the next action, who is it for, and through which channel?**

Ask Cedar Homes (Noah Ellis) by email for the invoice as a PDF or plain text and the visit date. Ask the tenant by email to confirm the fix.

**3. Does anything need a human decision, and why?**

No. Everything here is routine chasing. Escalate only if the invoice comes in above the approval, from a different company, or dated before the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-044-invoice-unavailable","outcome":"completed","evidence":"Cedar Homes (Noah Ellis) email 2025-02-11 event 019: \"This is… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_information` | {"recipient_name":"Harriet / Nora Quinn, tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `add_note` | {"entity":"NBL-044-invoice-unavailable","note":"Record conflicts: tenant signs as Harriet (event 007) but provider emails name Nora Quinn; t… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-044-invoice-unavailable","due_on":"2025-02-14","party":"Cedar Homes and tenant","purpose":"Chase invoice copy and tenant … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
