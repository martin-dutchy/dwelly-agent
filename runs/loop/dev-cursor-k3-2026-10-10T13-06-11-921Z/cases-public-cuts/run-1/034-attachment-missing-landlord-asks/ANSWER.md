# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Meadow Works report the shower mixer was cleaned and greased on 2025-06-01, but the attachments did not come through. I asked the provider to resend the invoice, photos and visit date. I told the landlord the status and that no amount is known yet. I asked the tenant to confirm the fix, and put the job on hold to 2025-06-04.

## Where the case stands
Ticket at stage mp_time, landlord approval confirmed, on hold to 2025-06-04. Provider says the work was done on 2025-06-01 but no visit is recorded and the invoice and photos were not visible. Tenant has not yet confirmed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend the invoice as a PDF or in the email body, plus photos and the attendance date | Meadow Works, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm the shower now works | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | WAIT | Hold to 2025-06-04 for the invoice and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - The photos and invoice did not come through on our side. Please resend the invoice as a PDF (or put the total, VAT and invoice date in the email body) and the photos.
> - Please confirm the date and time you attended Flat 9, 9 Willowmere Road.
> 
> Why: Attachments not visible; need invoice, attendance date and photos before the job can be checked, closed or paid.

**A2 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, Meadow Works emailed today to say they attended the shower at Willowmere Road, cleaned and greased the mixer, and that hot and cold are now running. That is their report; we are confirming it with the tenant. Their email mentioned an invoice and photos, but nothing came through on our side, so I can't tell you the amount yet. I've asked them to resend it and will pass on the figure as soon as we have it. Nothing has been paid.

**A3 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Dear Ava, Meadow Works tell us they visited today and fixed the shower mixer so hot and cold both run. Could you let us know whether that's right, and whether the shower is now working properly, including the cold side and the temperature? If anything is still wrong, tell us and we'll arrange a return visit. We'll check in again within a few days.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the fix, the invoice amount or that the visit happened as stated; these are the provider's claims only.
- No work result recorded, no invoice recorded, nothing paid, ticket not closed.

## Remaining work
- Provider to resend invoice, photos and visit date
- Tenant to confirm the fix
- Then record the work result and invoice, tell the landlord the amount, and close the ticket (agency)

## Missing or unavailable information
- Invoice amount, issuer and date (attachment not visible)
- Photos
- Confirmed visit date and time
- Tenant confirmation

## Conflicts between sources
- Ticket stage is mp_time (no visit recorded) but the provider says the visit happened on 2025-06-01.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the work was done on 2025-06-01. The visit is not recorded in the system, the invoice and photos are unseen, and the tenant has not confirmed. The landlord is asking for the invoice amount.

**2. What is the next action, who is it for, and through which channel?**

Email Meadow Works for a readable invoice, photos and the visit date. Email the landlord a status update with no amount, and email the tenant for confirmation. All three are sent.

**3. Does anything need a human decision, and why?**

No. This is routine follow-up. An escalation would only be needed if the invoice comes in above the approval or from a different company.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hi Kendall, Meadow Work… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Dear Ava,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","reason":"Waiting for Provider","comment":"Awaiting readable invoice, photos and at… | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after put_on_hold |

## Failed or unverified actions
_None._
