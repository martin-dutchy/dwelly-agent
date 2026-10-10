# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Meadow Works reported fixing the shower mixer, but we couldn't see their invoice or photos. I recorded the result as the provider's report, told the landlord what we know (no amount yet), asked the provider to resend, and asked the tenant to confirm. Follow-up set for 4 June.

## Where the case stands
Provider reports the work done (event 010) but attachments (invoice, photos) were not visible. Tenant has not confirmed. Landlord asked for status and amount; told what we know. Waiting on provider and tenant; follow-up 2025-06-04.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant to confirm the shower works | Ava Fletcher, tenant | email | A4 ✅ |
| 2 | REQUEST_INFORMATION | Ask Meadow Works to resend invoice as PDF or with total in the body, plus photos and attendance date | Meadow Works, contractor | email | A3 ✅ |
| 3 | OTHER | Answer landlord: visit reported, amount not yet known, will update by 4 June | Kendall, landlord | email | A2 ✅ |
| 4 | WAIT | Follow up on invoice and tenant confirmation | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, yes: Meadow Works emailed today to say they attended Flat 9, 9 Willowmere Road, found a problem with the shower mixer, cleaned and greased it, and that hot and cold are both running fine now. That is their report; we are confirming with the tenant. They say an invoice and photos were attached, but we could not see the attachments, so we can't yet tell you the amount. We have asked them to resend it and will pass it on as soon as we have it, so you can arrange payment. We'll update you by 4 June.

**A3 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Thanks for the update. The invoice and photos did not reach us. Please resend the invoice as a PDF (or put the total, VAT and invoice date in the email body) and the photos.
> - Please confirm the date and time you attended.
> 
> Why: Attachments not received; needed before payment and closing.

**A4 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ava, Meadow Works say they visited today, cleaned and greased the shower mixer, and that hot and cold are now both running. Can you let us know whether the shower is working properly for you, with both sides running and the temperature mixing OK? If not, we'll arrange a return visit. We'll check back with you by 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the result does not confirm the fix; it rests on the provider's word only.
- No invoice amount is known or approved; payment not authorised.
- Attachments were not seen, so their contents are not stated.

## Remaining work
- Obtain invoice and photos from Meadow Works (agency)
- Tenant confirmation of fix
- Send landlord the invoice amount, then record invoice and close

## Missing or unavailable information
- Invoice amount, VAT, date and photos (attachments not visible)
- Exact visit date/time
- Tenant confirmation

## Conflicts between sources
- Case-state hint says visit not booked, but the provider email says they attended on 2025-06-01; no visit was recorded in the system. I treated the provider's email as the latest statement, unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider says the work is done. The invoice and photos were not visible to us and the tenant hasn't confirmed. Outstanding: invoice, photos, tenant confirmation, landlord payment info, closing.

**2. What is the next action, who is it for, and through which channel?**

Email Meadow Works for the invoice and photos, email the tenant for confirmation, and email the landlord a status update. All three are sent.

**3. Does anything need a human decision, and why?**

No. This is routine; nothing is above the limit and no invoice discrepancy has been seen yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","outcome":"completed","evidence":"Meadow Works email (event 010, 2025-06-01): atten… | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after record_work_result |
| A2 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-034-attachmen… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-04","purpose":"Check invoice/photos received from Meadow Works an… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks"} | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after resume_auto |

## Failed or unverified actions
_None._
