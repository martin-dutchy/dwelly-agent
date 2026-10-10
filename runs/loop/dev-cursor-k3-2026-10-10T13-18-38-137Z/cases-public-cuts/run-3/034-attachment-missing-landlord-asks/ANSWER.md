# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider emailed that it fixed the shower mixer, but the attachments could not be read. The landlord asked about the visit and the invoice amount. I asked the provider to resend, asked the tenant to confirm, told the landlord the status without inventing a figure, and set a follow-up for 4 June.

## Where the case stands
Ticket at stage mp_time; landlord approved; Meadow Works report the shower fixed on 1 June but photos and invoice were not visible to us. Waiting on the provider to resend them, and on the tenant to confirm. Follow-up 4 June.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend the invoice (PDF or figures in the email body) and photos, and confirm the attendance date | Meadow Works, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm the shower works | Ava Fletcher, tenant | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell the landlord the contractor reports attending and fixing it, that the invoice amount is not yet known, and when we will update | Kendall, landlord | email | A3 ✅ |
| 4 | WAIT | Follow up on 4 June for the invoice and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - The photos and invoice did not come through to us. Please resend the invoice as a PDF (or put the total, VAT and invoice date in the email body) and the photos.
> - Please confirm the date and time you attended Flat 9 and that the invoice is from Meadow Works.
> 
> Why: Attachments not readable; needed before the invoice can be recorded, the landlord told the amount, or the job closed.

**A2 · send_message → Ava Fletcher (tenant) via email, tenant email on file (event 006 thread)** (verified)

> Hi Ava, Meadow Works say they visited today, cleaned and greased the shower mixer, and that hot and cold are now both running. Could you let us know whether the shower is working properly, with both sides running and the temperature mixing OK? If anything is still wrong, tell us and we'll arrange a return visit. We'll check back with you by Wednesday 4 June. Thanks, Northbridge Lettings

**A3 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, yes: Meadow Works emailed today to say they attended Flat 9, found a problem with the shower mixer, cleaned and greased it, and that hot and cold are both running again. They said photos and an invoice were attached, but the attachments did not reach us, so I can't yet tell you the amount. I've asked them to resend it and will pass the figure on as soon as we have it. I'm also checking with the tenant that the shower is working. I'll update you by Wednesday 4 June. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not confirm the repair worked, the invoice amount, or that payment is due.
- No invoice recorded and no work result recorded yet, as the evidence is only the provider's email and the tenant has not confirmed.
- Ticket not closed.

## Remaining work
- Obtain the invoice and photos from Meadow Works (agency)
- Get the tenant's confirmation
- Record the invoice, check it against the approval, tell the landlord the amount, then close

## Missing or unavailable information
- Invoice amount, date and issuer
- Photos
- Tenant confirmation
- Visit time (the provider said 'today')

## Conflicts between sources
- The system stage shows provider assigned with no visit booked, but the provider says it attended today. Treated as a provider claim pending tenant confirmation.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the work done on 1 June. We have not seen the invoice or photos. The tenant has not confirmed. The invoice, tenant confirmation and landlord update are outstanding before close.

**2. What is the next action, who is it for, and through which channel?**

Ask Meadow Works by email to resend the invoice and photos; ask the tenant by email to confirm; reply to the landlord by email with the status and no amount.

**3. Does anything need a human decision, and why?**

No. This is routine, and nothing exceeds authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 006 thread)","body":"Hi … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hi Kendall, yes: Meadow… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-04","purpose":"Check Meadow Works resent invoice/photos and tenan… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks"} | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after resume_auto |

## Failed or unverified actions
_None._
