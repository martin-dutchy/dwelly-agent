# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes reported the window handle job complete on 2025-02-11 but the invoice did not come through and no visit date is recorded. I logged the completion as reported by the provider, put the job on hold until 2025-02-12, and asked the provider for a PDF invoice and visit date, the tenant for confirmation the window works, and the landlord was told of completion with payment pending their confirmation of the amount.

## Where the case stands
Window handle repair at Flat 21, 129 Juniper Mews. Provider Cedar Homes (Noah Ellis) reported the work complete on 2025-02-11 with an invoice, but the invoice attachment is unavailable and no visit date is recorded. Job is on hold for the provider's invoice and visit date and for the tenant's confirmation. Not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Cedar Homes to resend the invoice as a PDF, and to give the date of the visit and confirm the work covered the window handle. | Noah Ellis, Cedar Homes (contractor) | email | A3 ✅ |
| 2 | CHASE_TENANT | Ask the tenant to check the window now opens and closes, and to report back if the handle is loose or the window still will not open. | Nora Quinn, tenant | email | A4 ✅ |
| 3 | CHASE_LANDLORD | Tell the landlord the work is reported complete, the invoice is being resent, and no payment will be made until the amount is confirmed with them. | Palmer, landlord | email | A5 ✅ |
| 4 | WAIT | Hold the job for provider invoice and visit date, and tenant confirmation; review 2025-02-12. | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> Hi Noah,
> 
> Thanks for letting us know the window handle job at Flat 21, 129 Juniper Mews is complete.
> 
> The invoice did not come through with your email; the attachment shows as unavailable. Please resend it as a PDF. Please also tell us the date you attended the property, and confirm the work covered the window handle at the top of the stairs.
> 
> Thanks
> Grace, Northbridge Lettings

**A4 · send_message → Nora Quinn (tenant) via email, existing thread (event 007 email)** (verified)

> Hello,
> 
> Cedar Homes have told us they have finished the work on the window handle at the top of the stairs. Could you check the window now opens and closes properly, and let us know? If the handle is still loose or the window won't open, please tell us straight away.
> 
> Thanks
> Grace, Northbridge Lettings

**A5 · send_message → Palmer (landlord) via email, existing thread (event 012 email)** (verified)

> Good afternoon,
> 
> Thank you for approving the window handle repair at Flat 21, 129 Juniper Mews. Cedar Homes have reported the work complete and have sent an invoice. The invoice did not come through as a readable file, so we have asked them to resend it. We will confirm the amount with you before any payment is made. We are also checking the tenant has the window working.
> 
> Kind regards
> Grace, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The provider's 'complete' claim is not yet confirmed by the tenant and no visit date is on record.
- The invoice amount, date and payee are unknown because the attachment is unavailable. Nothing has been approved or paid.
- The landlord gave no spend cap; the approval was only 'Please go ahead' for a handle fit, so any invoice must be checked against the scope before payment.
- Sending messages does not establish that the repair works.

## Remaining work
- Provider (Cedar Homes): resend invoice as PDF and give visit date; owner: agency ops, review 2025-02-12.
- Tenant: confirm window handle works; owner: agency ops, review 2025-02-12.
- Landlord: informed of completion; confirm invoice amount if required before payment.
- Verify tenant phone number (900251 vs 900307) and occupant name (Nora Quinn vs 'Harriet') before any further contact by phone.
- Then final checks and close_ticket with a landlord message on record.

## Missing or unavailable information
- Invoice contents (attachment unavailable).
- Visit date (none recorded).
- Tenant confirmation the handle is fixed.
- Correct tenant phone number and confirmation of occupant name.

## Conflicts between sources
- Tenant phone: 07700 900251 (event 016, sent to contractor) vs 07700 900307 (events 015, 017 contact line). Not resolved; used email, not phone.
- Occupant name: tenant email of 2025-02-01 signed 'Harriet' vs tenant on record Nora Quinn. Not resolved; flagged in note.
- Provider reminders (events 017, 018, 2025-02-10 and 02-11) were sent before the provider's completion email (event 019). Treated the completion as the latest status.

## Answers to the case questions
**1. Where does the case stand right now, and what is outstanding?**

Provider assigned and reported complete (event 019). Result recorded as completed on the provider's word. Outstanding: readable invoice, visit date, tenant confirmation, landlord notified of amount, then final checks and close. Job on hold until 2025-02-12.

**2. What is the next action, who is it for, and through which channel?**

Email to Noah Ellis (Cedar Homes) asking for the invoice as PDF and visit date (A3). Email to tenant Nora Quinn asking her to confirm the window works (A4). Email to landlord Palmer that completion is reported and payment awaits the confirmed amount (A5).

**3. Does anything need a human decision, and why?**

No. The work is routine and within the landlord's go-ahead. The only decision (payment) waits for the invoice, which is not yet readable. Escalate only if the invoice is above the approved scope or the tenant reports the fault remains.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-044-1849","outcome":"completed","evidence":"Provider Noah Ellis, Cedar Homes, email 2025-02-11 13:22 UTC (event 019): \"T… | 1 | ❌ failed | Ticket NBL-044-1849 not found on read-back |
| A2 | `add_note` | {"entity":"NBL-044-1849","note":"Record conflicts: (1) Tenant contact numbers differ. Event 016 gives 07700 900251 (tenant's number as passe… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","t… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Nora Quinn","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Palmer","recipient_role":"landlord","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-044… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `record_work_result` | {"ticket_ref":"NBL-044-invoice-unavailable","outcome":"completed","evidence":"Provider Noah Ellis, Cedar Homes, email 2025-02-11 13:22 UTC (… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_work_result |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-044-invoice-unavailable","reason":"Waiting for Provider","comment":"Waiting for Cedar Homes to resend the invoice as a PD… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after put_on_hold |

## Failed or unverified actions
- A1: record_work_result first failed because I used a reference from the event text (NBL-044-1849) that is not the ticket ref. Listed tickets, found NBL-044-invoice-unavailable, and retried; the retry verified as A6.
