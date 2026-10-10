# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider reports the shower mixer was cleaned and greased and is working, but the attachments did not arrive. I asked the provider to resend them, asked the tenant to confirm the fix, and told the landlord the status, without quoting an amount. A follow-up is set for 4 June.

## Where the case stands
Landlord approved, Meadow Works assigned. Provider emailed (event 010) saying the shower was fixed today, but the invoice and photos are not visible. The ticket still shows stage mp_time with no visit recorded. Waiting on the provider for the invoice, photos and visit date, and on the tenant to confirm the fix. Review on 2025-06-04.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend the invoice as a PDF or plain-text total, plus the photos and the visit date | Meadow Works, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Ask Ava to confirm the shower is working, with a check-back date of 4 June | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Tell the landlord the provider reports the visit done, that the invoice amount is not yet seen and has been requested, and that we will update by 4 June | Kendall, landlord | email | A2 ✅ |
| 4 | WAIT | Follow up on 4 June for the invoice and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Thanks for the update. The photos and invoice did not come through on our side. Please resend the invoice as a PDF (or put the total, VAT and invoice date in a plain-text reply) and the photos.
> - Please confirm the date and time of your visit.
> 
> Why: Attachments not visible; needed for invoice check and final checks.

**A2 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, Meadow Works emailed today to say they attended the shower at Willowmere Road, found a problem with the mixer, cleaned and greased it, and report hot and cold both running fine. Their invoice and photos did not come through to us, so I can't yet tell you the amount. I've asked them to resend. We're also checking with the tenant that it's fixed. I'll update you once we have the invoice, and by Wednesday 4 June at the latest.

**A3 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ava, Meadow Works tell us they visited today, cleaned and greased the shower mixer, and that hot and cold are now both running. Can you let us know whether the cold side is working properly and the temperature is now OK? If not, we'll arrange a return visit. We'll check back with you by Wednesday 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The provider's claim of a fix is unverified until the tenant confirms.
- No invoice amount has been seen or stated, and no payment has been approved.
- No visit has been booked or recorded in the system.
- The ticket is not closed.

## Remaining work
- Get the invoice and photos from the provider, then record the invoice and check it.
- Get the tenant's confirmation.
- Confirm the visit date and record the work result.
- Update the landlord with the invoice amount, then close.

## Missing or unavailable information
- Invoice amount, VAT and date
- Photos
- Visit date and time
- Tenant confirmation

## Conflicts between sources
- The system stage shows provider assigned with no visit booked, but the provider says they attended today. I treated the provider's claim as unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the work is done. The invoice, photos, visit date and tenant confirmation are all outstanding, and the landlord is waiting to hear the invoice amount.

**2. What is the next action, who is it for, and through which channel?**

Ask Meadow Works by email to resend the invoice and photos. Ask the tenant by email to confirm the fix. Update the landlord by email.

**3. Does anything need a human decision, and why?**

No. This is routine follow-up. An escalation is only needed if the invoice is flagged or the provider doesn't answer.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-034-attachmen… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-04","purpose":"Check provider resent invoice/photos and tenant co… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"NBL-034-attachment-missing-landlord-asks","note":"Event 010: provider reports visit and fix (mixer cleaned/greased); attachments … | 1 | ✅ verified | NOTE-105 found in the add_note log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks"} | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after resume_auto |

## Failed or unverified actions
_None._
