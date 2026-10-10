# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approved the window handle repair and Cedar Homes reports it complete, but the invoice attachment did not come through and the tenant has not confirmed the fix. I recorded the contractor's completion claim, asked Cedar Homes to resend the invoice, asked the tenant to confirm, informed the landlord, and put the job on hold until 2025-02-14.

## Where the case stands
Ticket NBL-044-invoice-unavailable (Flat 21, 129 Juniper Mews) is at result stage. Landlord Palmer approved the repair (event 012, "Please go ahead", 2025-02-09). Cedar Homes (Noah Ellis) reported the work complete on 2025-02-11 13:22 UTC, but the invoice attachment is unavailable and no amount, visit date or tenant confirmation is on file. Job is on hold for the provider and the tenant.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Cedar Homes to resend the invoice with the amount including VAT and the visit date. | Noah Ellis, Cedar Homes | email | A2 ✅ |
| 2 | CHASE_TENANT | Ask the tenant to confirm the window opens and closes properly, and to report any remaining fault. | Harriet (Nora Quinn on record), tenant | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell the landlord the work is reported complete, the invoice is awaited, and the tenant check is pending. | Palmer, landlord | email | A4 ✅ |
| 4 | WAIT | Review the job on 2025-02-14 if the invoice or tenant confirmation has not arrived. | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> Hi Noah,
> 
> Thanks for letting us know the window handle job at Flat 21, 129 Juniper Mews is complete. The invoice attachment did not come through to us. Could you please resend the invoice, and tell us the date the work was done and the visit details? Please also confirm the total amount including VAT.
> 
> Thanks,
> Grace
> Northbridge Lettings

**A3 · send_message → Harriet (Nora Quinn on record) (tenant) via email, existing thread (event 007 email)** (verified)

> Hi Harriet,
> 
> Our contractor, Cedar Homes, has told us the repair to the window handle at the top of your staircase is complete. Could you please check the window opens and closes properly and let us know? If anything is still wrong, reply here and we will arrange a return visit.
> 
> Thanks,
> Grace
> Northbridge Lettings

**A4 · send_message → Palmer (landlord) via email, existing thread (event 012 email)** (verified)

> Hi Palmer,
> 
> Thank you for approving the window handle repair at Flat 21, 129 Juniper Mews. Cedar Homes has reported the work as complete. We are waiting for their invoice, which did not come through, and we have asked them to resend it. We will confirm with the tenant that the window works, and we will send you the invoice once it is received.
> 
> Kind regards,
> Grace
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The contractor's 'complete' message is not yet confirmed by the tenant or a visit record.
- Recording the work result does not establish the invoice amount or who pays.
- No invoice has been filed, so the job cannot be closed or paid.
- The landlord's approval has no spend cap on record, so the cost is unverified against any limit.

## Remaining work
- Obtain and file the Cedar Homes invoice (provider, owed by agency to landlord account; who_pays to be confirmed).
- Get tenant confirmation that the window works.
- Confirm correct tenant name and phone number on the record.
- Close the job once invoice and tenant confirmation are in and the landlord has been told.

## Missing or unavailable information
- Cedar Homes invoice (attachment unavailable).
- Invoice amount and VAT treatment.
- Actual visit date.
- Tenant confirmation the window works.
- Correct tenant name and phone number.

## Conflicts between sources
- Tenant name: system records say Nora Quinn (events 014-016); tenant's own emails are signed Harriet (event 007). I addressed the message to both via the existing thread.
- Tenant phone: 07700 900307 (events 015, 017) vs 07700 900251 (event 016). I did not phone; messages went by email on the existing thread.
- Ticket reference: the contractor and agency references show NBL-044-1849, but the system ticket is NBL-044-invoice-unavailable. I used the system ticket.
- Landlord approval (event 012) has no spend cap, so the cost limit is unknown.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At result stage, on hold for the provider and tenant. Work reported complete by Cedar Homes, but the invoice is unavailable, there is no visit date, and the tenant has not confirmed the fix. Landlord approval was given without a spend cap.

**2. What is the next action, who is it for, and through which channel?**

Email Noah Ellis at Cedar Homes to resend the invoice and visit date; email the tenant (existing thread) to confirm the window works; email landlord Palmer with the status. Review on 2025-02-14.

**3. Does anything need a human decision, and why?**

No decision is needed now. The work is routine and within the landlord's approval. Escalate only if the invoice is disputed or the tenant reports the fault is not fixed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-044-invoice-unavailable","outcome":"completed","evidence":"Contractor-reported only: Noah Ellis, Cedar Homes, email 2025-… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_work_result |
| A2 | `send_message` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","b… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Harriet (Nora Quinn on record)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Palmer","recipient_role":"landlord","channel":"email","contact":"existing thread (event 012 email)","body":"Hi Palmer,\n\… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `add_note` | {"entity":"NBL-044-invoice-unavailable","note":"Record conflicts: tenant named Nora Quinn in system (events 014-016) but emails from tenant … | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-044-invoice-unavailable","reason":"Waiting for Provider","comment":"Waiting for Cedar Homes (Noah Ellis) to resend the in… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after put_on_hold |

## Failed or unverified actions
_None._
