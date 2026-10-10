# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Meadow Works say they fixed the shower mixer, but their attachments did not arrive. I told the landlord the amount isn't known yet, asked the contractor to resend, asked the tenant to confirm the fix, and set a follow-up for 3 June.

## Where the case stands
Stage mp_time in system; the provider reports the visit done on 1 June and the mixer fixed. Attachments (photos, invoice) not received. Waiting on Meadow Works for invoice and on tenant for confirmation. Landlord is asking about amount.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Landlord told the status, that the invoice has not arrived and no amount is known | Kendall, landlord | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask Meadow Works to resend photos and invoice and confirm visit date | Meadow Works, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Ask tenant to confirm the shower works | Ava Fletcher, tenant | email | A3 ✅ |
| 4 | WAIT | Follow up on 3 June for invoice and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, yes. Meadow Works emailed today to say they attended the shower at Willowmere Road, found a problem with the mixer, cleaned and greased it, and say hot and cold are both running again. They said photos and an invoice were attached, but the attachments have not come through to us, so I can't tell you the amount yet. I've asked them to resend it, and I'm asking the tenant to confirm the shower works. I'll send you the invoice figure once I have it, and will update you by 4 June at the latest. Please don't pay anything until you hear from us.

**A2 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Thanks for attending today. The photos and invoice did not arrive. Please resend them as PDF/JPG attachments, or reply in plain text with the invoice total, VAT and date.
> - Please confirm the date of the visit.
> 
> Why: Attachments missing; landlord is asking for the invoice amount and we need it for final checks.

**A3 · send_message → Ava Fletcher (tenant) via email, tenant email on file (event 006)** (verified)

> Dear Ava, Meadow Works tell us they visited today, cleaned and greased the shower mixer, and that hot and cold are now both running. Could you let us know whether the shower is working properly for you, and whether the temperature is now OK? If anything is still wrong, tell us and we'll get them back. We'll be in touch again by 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing confirms the fix, the invoice amount or who pays; the contractor's claim is unverified
- Visit date not confirmed beyond contractor's 'today'; no result recorded or ticket closed

## Remaining work
- Get invoice and photos from Meadow Works (agency)
- Get tenant confirmation
- Record result and invoice, check against approval, tell landlord the amount, then close

## Missing or unavailable information
- Invoice amount, issuer and date, and photos (attachments not received)
- Tenant confirmation the shower works

## Conflicts between sources
- System stage says provider assigned/visit not booked, but contractor says visit already happened; trusted the contractor email as a claim pending tenant confirmation.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the work was done on 1 June. Invoice and photos are unseen, tenant confirmation is missing, and the landlord has not been told the amount.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the landlord (status), Meadow Works (resend invoice and photos) and the tenant (confirm fix); follow-up set for 3 June.

**3. Does anything need a human decision, and why?**

No. This is routine chasing; escalate only if the invoice is above the approval or otherwise flagged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-034-attachmen… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 006)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-03","purpose":"Check invoice/photos received from Meadow Works an… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
