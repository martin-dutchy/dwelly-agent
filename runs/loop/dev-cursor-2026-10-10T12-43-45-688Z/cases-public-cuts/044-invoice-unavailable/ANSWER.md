# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes reported the window handle repair complete, but the invoice did not arrive. I asked the provider to resend it and asked the tenant to confirm the fix. I set a follow-up for 14 Feb and added a note on the record conflicts. Nothing needs a human yet.

## Where the case stands
Provider assigned (Cedar Homes). Provider says work complete (event 019) but the invoice attachment was unavailable. No visit date or tenant confirmation on record. Waiting on provider for invoice and on tenant for confirmation; follow-up set for 2025-02-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as PDF or plain text, and confirm the attendance date | Noah Ellis, Cedar Homes (contractor) | email | A1 ✅ |
| 2 | CHASE_TENANT | Ask the tenant to confirm the handle is fixed and the window works | Tenant (Nora Quinn / Harriet) | email | A2 ✅ |
| 3 | WAIT | Follow-up 2025-02-14 to check invoice and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> Hi Noah, thanks for letting us know the window handle job is complete. The invoice didn't come through on our side. Could you resend it as a PDF, or put the amount, date and company name in a plain-text reply? Please also confirm the date you attended. Thanks, Grace

**A2 · send_message → Nora Quinn (tenant) (tenant) via email, existing thread (event 007 email)** (verified)

> Hi, Cedar Homes have told us the window handle at the top of your stairs has been repaired. Could you let us know whether the handle is back on and the window now opens and closes properly? If anything is still wrong, tell us and we'll put it right. We'll check back with you in 3 working days if we haven't heard. Thanks, Grace

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Provider's 'complete' is not yet verified by the tenant, so no work result recorded
- Nothing is known about the invoice amount, date or issuer
- No payment approved or closure done
- The landlord's 'go ahead' set no amount

## Remaining work
- Receive and record the invoice and check it against the landlord's approval
- Tenant confirmation, then record_work_result
- Tell the landlord the outcome and close the ticket
- Fix the tenant name and phone record conflict

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Tenant confirmation
- Photos referenced in event 015 not available

## Conflicts between sources
- Tenant is called Harriet in events 005/007 but Nora Quinn in events 014-016
- Two tenant phone numbers: 07700 900307 and 07700 900251
- get_ticket for NBL-044-1849 returned not_found, so the reference is unconfirmed

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider says the work is done. The invoice has not been seen, the tenant has not confirmed, and no visit date or work result is recorded. Landlord approval was a plain 'Please go ahead' with no amount.

**2. What is the next action, who is it for, and through which channel?**

Email Cedar Homes (Noah Ellis) for the invoice as PDF or plain text plus the visit date. Email the tenant to confirm the fix. Follow-up set for 2025-02-14.

**3. Does anything need a human decision, and why?**

No. This is routine and waiting on replies. The invoice will need an escalation to accounts only if it is flagged once it arrives.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","t… | 2 | ✅ verified | MSG-104 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Nora Quinn (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-044-1849","note":"Event 019: Cedar Homes says complete, invoice attachment unavailable (not seen). No visit date recorded. Te… | 1 | ❌ failed | No add_note record on read-back |
| A4 | `schedule_follow_up` | {"due_on":"2025-02-14","purpose":"Check invoice received from Cedar Homes and tenant confirmation of window handle fix; then record result, … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"NBL-044-1849","note":"Event 019: Cedar Homes says complete, invoice attachment unavailable (not seen). No visit date recorded. Te… | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
- A1: Attempt 1 was not applied; retried once and verified as MSG-104
- A3: add_note attempt 1 was not applied; retried and verified as A5
