# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Meadow Works reported the shower mixer cleaned and working, but the attachments were not received. I recorded the result, answered the landlord without inventing an amount, asked the provider to resend, asked the tenant to confirm, and set a follow-up for 3 June.

## Where the case stands
Work reported done by Meadow Works (event 010). Invoice and photos not seen. Tenant has not confirmed. Landlord has been asked nothing yet and wants the invoice amount. Ticket at result stage, back in auto mode.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend invoice (PDF or plain-text total) and photos, and confirm the visit date | Meadow Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask Ava to confirm the shower works | Ava Fletcher, tenant | email | A4 ✅ |
| 3 | WAIT | Follow up on 2025-06-03 for invoice and tenant confirmation, then give landlord the amount and move to final checks | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Thanks for the update. The photos and invoice did not reach us. Please resend the invoice as a PDF, or reply in plain text with the total including VAT, and resend the photos.
> - Please confirm the date of the visit.
> 
> Why: Attachments not received; needed for the landlord's payment question and final checks.

**A3 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, yes: Meadow Works emailed today to say they attended the shower. They report the mixer was cleaned and greased and hot and cold are now both running. Their invoice and photos did not come through to us, so I can't yet tell you the amount. I've asked them to resend, and I'm checking with the tenant that it's fixed. I'll send you the invoice total as soon as we have it, and will update you by 4 June at the latest.

**A4 · send_message → Ava Fletcher (tenant) via email, tenant email on file (event 006)** (verified)

> Hi Ava, Meadow Works tell us they attended today and cleaned and greased the shower mixer, so hot and cold should both run now. Could you let us know whether the shower is working properly, with both sides running and the temperature mixing OK? If not, tell us and we'll send them back. We'll be in touch again by 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the result rests on the provider's word only; it does not confirm the fix or the invoice.
- No amount has been stated or approved; invoice not seen.
- Nothing here approves payment or closes the job.

## Remaining work
- Obtain the invoice and photos, then check them against the assigned provider and approval
- Tenant confirmation
- Tell the landlord the invoice amount
- Final checks and close

## Missing or unavailable information
- Invoice amount and photos (attachments not received)
- Visit date
- Tenant confirmation the shower works

## Conflicts between sources
- Stage hint said visit not booked, but provider says the visit already happened; I trusted the provider's email.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider reports the work is done. Invoice, photos, visit date and tenant confirmation are outstanding. The landlord is waiting for the amount.

**2. What is the next action, who is it for, and through which channel?**

Ask Meadow Works by email to resend the invoice and photos. Ask the tenant by email to confirm the fix. The landlord has been updated by email, with no amount given.

**3. Does anything need a human decision, and why?**

No. This is routine and awaiting documents. Escalate only if the invoice is above approval, from another company, or dated before the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","outcome":"completed","evidence":"Provider email event 010 (2025-06-01): mixer clea… | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hi Kendall, yes: Meadow… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 006)","body":"Hi Ava, Me… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-03","purpose":"Check invoice/photos received from Meadow Works an… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks"} | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after resume_auto |

## Failed or unverified actions
_None._
