# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes says the window handle repair is done but the invoice did not arrive. I recorded the result as completed, asked the contractor to resend the invoice, asked the tenant to confirm the fix, and put the ticket on hold to review on 14 Feb.

## Where the case stands
Work reported complete by Cedar Homes (result stage). Invoice attachment missing; tenant confirmation not yet received; landlord not yet told outcome. Ticket on hold, review 2025-02-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice (PDF), visit date and photos | Noah Ellis, contractor | email | A2 ✅ |
| 2 | CHASE_TENANT | Ask tenant to confirm the window now opens and closes properly | Tenant (Harriet / Nora Quinn) | email | A3 ✅ |
| 3 | WAIT | Hold until 2025-02-14 for invoice and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> Hi Noah, thanks for letting us know the window handle at Flat 21, 129 Juniper Mews is done. The invoice attachment didn't come through on our side. Could you please resend it as a PDF, made out to the agency with the property address, and also confirm the date of the visit and whether the handle was replaced? Photos of the finished work would be helpful too. Thanks, Grace

**A3 · send_message → Tenant (Harriet / Nora Quinn) (tenant) via email, existing thread (event 007 email)** (verified)

> Hi, our contractor Cedar Homes says the window handle at the top of your stairs has now been repaired. Could you let us know whether the window now opens and closes properly? If anything is still wrong, tell us and we'll get it sorted. Thanks, Grace

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the result rests on the contractor's email only; it does not confirm the fix or the cost.
- No invoice has been recorded, checked or approved for payment.
- The ticket is not closed.

## Remaining work
- Receive and record the invoice, checking it against the approval (landlord said 'please go ahead' with no cap; no quote on file).
- Get tenant confirmation.
- Tell the landlord (Palmer) the outcome.
- Then close the ticket.

## Missing or unavailable information
- Invoice (attachment unavailable)
- Tenant confirmation
- Visit date and photos

## Conflicts between sources
- Tenant is addressed as Harriet in the agency email but named Nora Quinn on the contractor emails. The tenant phone numbers also differ (07700 900307 vs 07700 900251). Contractor email says ticket ref NBL-044-1849 but the system ref is NBL-044-invoice-unavailable. I used the system record.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and Cedar Homes was assigned. The contractor reports the work complete. Outstanding: the invoice, tenant confirmation, and telling the landlord, then closure.

**2. What is the next action, who is it for, and through which channel?**

Email Cedar Homes (Noah Ellis) to resend the invoice, and email the tenant to confirm the fix. Both are sent.

**3. Does anything need a human decision, and why?**

No. This is routine follow-up. A human is needed only if the invoice is flagged on recording or the contractor does not respond by the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-044-invoice-unavailable","outcome":"completed","evidence":"Email from Noah Ellis, Cedar Homes, 2025-02-11 13:22 (event 01… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_work_result |
| A2 | `send_message` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","t… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Tenant (Harriet / Nora Quinn)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)",… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-044-invoice-unavailable","reason":"Waiting for Provider","comment":"Invoice attachment unavailable; asked Cedar Homes to … | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after put_on_hold |

## Failed or unverified actions
_None._
