# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider says the shower was fixed on 1 June, but the invoice and photos did not arrive. I asked the provider to resend them, asked the tenant to confirm the fix, and told the landlord what is known. I did not give an amount because none has been seen.

## Where the case stands
Ticket at mp_time in system, but the provider reports the visit done on 1 June (cleaned and greased mixer). Invoice and photos not received. Tenant has not confirmed the fix. Landlord has asked for the invoice amount.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend invoice PDF and photos, with total in the email text, and confirm the visit date | Meadow Works, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Ask tenant to confirm the shower is fixed | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Answer landlord: visit reported done, invoice not seen, amount unknown, update by 4 June | Kendall, landlord | email | A2 ✅ |
| 4 | WAIT | Follow up 4 June on invoice and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Your email says photos and invoice are attached, but nothing came through on our side. Please resend the invoice as a PDF and the photos, and state the total amount including VAT in the email text.
> - Please confirm the date of the visit.
> 
> Why: Attachments not received; needed to record the invoice and answer the landlord.

**A2 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, yes: Meadow Works emailed today (1 June) to say they attended the shower at Willowmere Road, found a problem with the mixer, cleaned and greased it, and that hot and cold are now both running. That is the contractor's report; we haven't yet confirmed it with the tenant. Their email said an invoice and photos were attached, but nothing came through to us, so we haven't seen the invoice or the amount and can't quote a figure. We've asked them to resend it. We'll send you the invoice and amount as soon as we have them, and will update you by 4 June at the latest.

**A3 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ava, Meadow Works tell us they visited today and cleaned and greased the shower mixer, and that hot and cold are now both running. Could you let us know whether the cold side is working properly now and the temperature mixes OK? If not, tell us and we'll arrange a return visit. We'll be in touch again by 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing confirms the fix, the invoice amount, or who pays
- Work result, invoice and closure not recorded because attachments are unseen and tenant has not confirmed
- The visit date is not confirmed

## Remaining work
- Receive invoice and photos, then record the invoice and check it against approval
- Get tenant confirmation
- Send landlord the invoice amount
- Record work result and close

## Missing or unavailable information
- Invoice and photos (attachments not received)
- Visit date
- Tenant confirmation

## Conflicts between sources
- System stage shows provider assigned, visit not booked, but the provider says the visit already happened.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the work done on 1 June. The invoice and photos are missing and the tenant has not confirmed. The landlord is waiting for the invoice amount.

**2. What is the next action, who is it for, and through which channel?**

Email Meadow Works to resend the invoice and photos. Email the tenant for confirmation. Email the landlord a status update with no figure.

**3. Does anything need a human decision, and why?**

No. Everything outstanding is routine. Escalate only if the invoice is flagged on arrival.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hi Kendall, yes: Meadow… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi Ava, M… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-04","party":"Meadow Works / tenant","purpose":"Check invoice and … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
