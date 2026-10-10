# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider says the handle repair is complete but the invoice did not arrive. I asked the provider to resend it and give the visit date, asked the tenant to confirm the fix, and set a follow-up for 14 Feb. No human decision needed yet.

## Where the case stands
Stage mp_time; landlord approved (event 012); Cedar Homes reports work complete (019) but invoice unseen. Waiting on provider for invoice PDF/visit date and on tenant for confirmation. Not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as PDF or plain text, with visit date | Noah Ellis, Cedar Homes (provider) | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Ask tenant to confirm the handle is fixed | Tenant | email | A2 ✅ |
| 3 | WAIT | Review 14 Feb for invoice and tenant confirmation | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - Thanks for letting us know. The invoice attachment didn't reach us - please resend it as a PDF or put the amount, date of visit and invoice number in a plain-text reply.
> - What date did you attend, and was the window handle replaced?
> 
> Why: Invoice unavailable; needed to file the invoice and complete final checks. Visit date not recorded.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 007 email)** (verified)

> Hello, Cedar Homes have told us the window handle at the top of your stairs has now been repaired. Could you please let us know whether the handle is fixed and the window opens and closes properly? If anything is still wrong, tell us and we'll get it put right. We'll check back with you if we haven't heard by 14 February.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the work was done, its cost, or the visit date; the provider's claim is unverified
- No work result recorded, no invoice recorded, ticket not closed
- Landlord has not yet been told of completion

## Remaining work
- Cedar Homes: send invoice and visit date
- Tenant: confirm fix
- Agency: record work result and invoice, check against landlord approval (no figure given), tell landlord, close

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Tenant confirmation

## Conflicts between sources
- Tenant called Harriet (event 007) vs Nora Quinn (events 014/015)
- Tenant phone 07700 900307 (015) vs 07700 900251 (016)
- Case hints say visit not booked, yet provider reports complete
- Ticket ref in system is NBL-044-invoice-unavailable, not the extension code NBL-044-1849

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved; Cedar Homes claims completion on 11 Feb with an unavailable invoice. Outstanding: invoice, visit date, tenant confirmation, landlord update, closure.

**2. What is the next action, who is it for, and through which channel?**

Email Cedar Homes (Noah Ellis) for the invoice PDF/plain text and visit date; email the tenant to confirm the fix.

**3. Does anything need a human decision, and why?**

No. Routine; escalate only if the invoice is above expectation or from a different company, or the tenant disputes the fix.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-044-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-044-invoice-unavailable","due_on":"2025-02-14","purpose":"Check provider's invoice PDF and tenant confirmation received; … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-044-invoice-unavailable","note":"Event 019: Cedar Homes says complete, invoice attachment unavailable - amount/date unseen. W… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
