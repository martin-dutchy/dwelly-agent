# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes reported the window handle fixed with an invoice that did not come through. I asked the provider for the invoice and visit date, asked the tenant to confirm the fix, noted record conflicts and set a follow-up for 14 Feb. No human decision needed yet.

## Where the case stands
Provider assigned (Cedar Homes); provider says work complete (event 019) but invoice not seen. Waiting on Cedar Homes for invoice and on tenant to confirm fix. Not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as PDF or plain text and confirm the attendance date | Noah Ellis, Cedar Homes (contractor) | email | A1 ✅ |
| 2 | CHASE_TENANT | Ask tenant to confirm the handle is fixed and window works | Nora Quinn, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up 2025-02-14 on invoice and tenant confirmation, then record result/invoice, tell landlord, close | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - Thanks for confirming the window handle is done. The invoice attachment did not reach us - please resend it as a PDF or put the amount, invoice date and company name in a plain-text reply.
> - Please confirm the date you attended.
> 
> Why: Invoice attachment unavailable; needed to check against approval and file before closing.

**A2 · send_message → Nora Quinn (tenant) via email, existing thread (event 014 email)** (verified)

> Hi, our contractor Cedar Homes says the window handle at the top of the stairs has now been fixed. Could you let us know whether the handle is back on and the window opens and closes properly? If anything is still wrong, tell us and we will get them back. We'll check in with you again within 3 working days if we haven't heard. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing yet establishes the work was done properly, the cost, or that it is within the landlord's approval.
- Landlord's 'please go ahead' had no spend cap; invoice amount unknown.
- No work result, invoice or closure recorded.

## Remaining work
- Receive and record invoice; check against approval and assigned contractor (agency)
- Tenant confirmation (tenant)
- Tell landlord outcome, then close (agency)

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Tenant confirmation
- Ticket lookup by ref NBL-044-1849 returned not_found; ref taken from provider email ext

## Conflicts between sources
- Tenant called Harriet (events 005/007) vs Nora Quinn (014/015); two different tenant phone numbers (events 015, 016). Treated as unresolved; noted.
- Stage hints say visit not booked, but provider says work complete.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Work reported complete by provider; invoice unseen, tenant confirmation and landlord notification outstanding; not closed.

**2. What is the next action, who is it for, and through which channel?**

Request invoice PDF/text from Cedar Homes by email, and ask tenant by email to confirm the fix; follow-up 2025-02-14.

**3. Does anything need a human decision, and why?**

No. Escalate only if the invoice is above approval, from another company or pre-dates the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Nora Quinn","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","body":"Hi, our con… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-044-1849","note":"Cedar Homes reported job complete (event 019) with invoice attachment unavailable; not seen. Tenant confirm… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2025-02-14","purpose":"Check invoice PDF received from Cedar Homes and tenant confirmation of fix; then record result, invoice, i… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
