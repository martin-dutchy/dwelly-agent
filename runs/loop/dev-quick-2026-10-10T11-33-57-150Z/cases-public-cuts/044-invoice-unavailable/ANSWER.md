# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved the handle repair (event 012) and Cedar Homes reported it complete on 2025-02-11 (event 019), but the invoice is unavailable and there is no visit date, photo or tenant confirmation on record. I recorded the approval and the provider's report, asked Cedar for the invoice PDF, visit date and photo, asked the tenant to test the window, told the landlord, and placed the job on hold until 2025-02-13.

## Where the case stands
Ticket NBL-044-invoice-unavailable (Flat 21, 129 Juniper Mews). Landlord approved the repair (event 012, "Please go ahead"). Cedar Homes reported on 2025-02-11 13:22 UTC that the job is complete (event 019), but the invoice attachment is unavailable and no visit date, photos or tenant confirmation are on record. Now on hold, waiting for provider, review 2025-02-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Cedar Homes to resend the invoice as a PDF, give the attendance date and send a photo of the fitted handle | Noah Ellis, Cedar Homes | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to test the handle and confirm the window opens and closes, or report if not | Nora Quinn (signed Harriet), tenant | email | A5 ✅ |
| 3 | CHASE_LANDLORD | Tell the landlord the work is reported complete and the invoice and visit date are being requested | Palmer, landlord | email | A6 ✅ |
| 4 | WAIT | Hold until 2025-02-13 for provider documents and tenant confirmation | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> Hi Noah,
> 
> Thank you for letting us know the window handle job at Flat 21, 129 Juniper Mews is complete.
> 
> The invoice did not come through to us (the attachment shows as unavailable). Could you please resend it as a PDF?
> 
> Could you also reply with the date you attended and a photo of the fitted handle? We have no visit date on our record for this job.
> 
> Thanks,
> Grace
> Northbridge Lettings

**A5 · send_message → Nora Quinn (Harriet) (tenant) via email, existing thread (event 007 email)** (verified)

> Hello,
> 
> Our contractor, Cedar Homes, has told us the repair to the window handle at the top of the stairs is complete. We are checking their paperwork with them.
> 
> Could you please try the handle and let us know whether the window now opens and closes properly? If it does not, please reply to this email and we will arrange for the contractor to return.
> 
> Thanks,
> Grace
> Northbridge Lettings

**A6 · send_message → Palmer, landlord (landlord) via email, existing thread (event 012 email)** (verified)

> Hello Palmer,
> 
> Thank you for approving the window handle repair at Flat 21, 129 Juniper Mews. Cedar Homes reports the work is complete. We have asked them for their invoice as a PDF and for the visit date, and we are confirming with the tenant that the window works. We will send you the invoice once we have it.
> 
> Kind regards,
> Grace
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Provider's 'complete' message is not verified work: the tenant has not confirmed the window works.
- No invoice amount is known, so nothing is approved or paid.
- No visit date is on record, so the visit date is unconfirmed.
- Ticket is not closed: no readable invoice, no tenant confirmation, no visit evidence.
- The landlord's approval covers the handle repair; no spend cap was given.

## Remaining work
- Obtain PDF invoice from Cedar Homes and check it against the approved repair (no amount on file yet).
- Obtain visit date and photo from Cedar Homes.
- Get tenant confirmation the window opens and closes; if not, reopen with Cedar Homes.
- Send landlord the invoice once received, then final checks and close.
- Review 2025-02-13.

## Missing or unavailable information
- Invoice PDF (attachment unavailable at event 019).
- Attendance date and photo of the fitted handle.
- Tenant confirmation the handle works.
- Confirmation of tenant name: system says Nora Quinn, emails signed Harriet.
- Which tenant phone number is correct: 07700 900307 (event 015) or 07700 900251 (event 016).

## Conflicts between sources
- Tenant name: system record says Nora Quinn, but the tenant's emails (event 007) are signed Harriet. Not resolved; flagged for confirmation.
- Tenant phone: 07700 900307 (event 015 job email) vs 07700 900251 (event 016 contractor email). Not resolved; no phone was used for messages.
- Completion vs record: Cedar says complete (event 019), but no visit date or photos are on record, and the agency's reminders on 2025-02-10 and 2025-02-11 were still asking for a booking. Treated the completion as provisional.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

Provider assigned and reported complete, but not verified. Outstanding: a readable invoice, the visit date and photo, tenant confirmation that the window works, and final checks before close.

**2. 2. What is the next action, who is it for, and through which channel?**

Email Noah Ellis at Cedar Homes for the PDF invoice, visit date and photo (A4). Email the tenant on the existing thread to test the handle and confirm (A5). Email landlord Palmer on the existing thread with the status (A6). Hold until 2025-02-13 (A7).

**3. 3. Does anything need a human decision, and why?**

No. The landlord approval is recorded and no spend is known yet. A decision is only needed once the invoice arrives and is checked against the approval. Escalation is not needed now.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-044-1849","decision":"approved","evidence_quote":"Good afternoon Grace Please go ahead Regards Palmer","source":"history.… | 1 | ❌ failed | Ticket NBL-044-1849 not found on read-back |
| A2 | `record_landlord_decision` | {"ticket_ref":"NBL-044-invoice-unavailable","decision":"approved","evidence_quote":"Good afternoon Grace Please go ahead Regards Palmer","so… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_landlord_decision |
| A3 | `record_work_result` | {"ticket_ref":"NBL-044-invoice-unavailable","outcome":"completed","evidence":"Cedar Homes (Noah Ellis) email 2025-02-11 13:22 UTC, event 019… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_work_result |
| A4 | `send_message` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","t… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Nora Quinn (Harriet)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_r… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Palmer, landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 012 email)","ticket_ref… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-044-invoice-unavailable","reason":"Waiting for Provider","comment":"Cedar Homes says complete (event 019) but the invoice… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after put_on_hold |

## Failed or unverified actions
- A1: record_landlord_decision failed because I used the wrong ticket ref (NBL-044-1849 is the contractor's job reference, not the ticket). Retried with NBL-044-invoice-unavailable, verified as A2.
