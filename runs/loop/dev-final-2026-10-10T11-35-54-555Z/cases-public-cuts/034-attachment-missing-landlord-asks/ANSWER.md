# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Meadow Works say they fixed the shower mixer on 2025-06-01, but the invoice and photos did not arrive. I answered the landlord's question without inventing an amount, asked the provider to resend, asked the tenant to confirm, and set a follow-up.

## Where the case stands
Stage: result recorded as completed on the provider's word. Waiting on Meadow Works to resend the invoice and photos, and on the tenant to confirm the fix. The landlord has been told the status but not an amount. Follow-up is set for 2025-06-03.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend the invoice (PDF or amount in the email body) and the photos | Meadow Works, provider | email | A5 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm the shower works | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | WAIT | Wait for the invoice and tenant confirmation, review 2025-06-03 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Kendall (landlord) via email, existing thread (event 011 email)** (verified)

> Hi Kendall, yes. Meadow Works emailed today to say they attended Flat 9, 9 Willowmere Road, found a problem with the shower mixer, cleaned and greased it, and that hot and cold are both running fine now. They said photos and an invoice were attached, but nothing readable came through on our side, so I can't yet tell you what the invoice says or the amount. I've asked them to resend it and will pass the figure on as soon as we have it. I'm also checking with the tenant that the shower is working properly. Please don't pay anything until we've confirmed the invoice with you.

**A3 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Dear Ava, Meadow Works tell us they visited today, cleaned and greased the shower mixer, and that hot and cold are now both running. Could you let us know whether the shower is working properly for you, with both sides running and the temperature mixing well? If anything is still wrong, tell us and we'll get it put right.

**A5 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Please resend the invoice as a PDF, or state the total and VAT in the email body
> - Please resend the photos of the work
> 
> Why: Thanks for attending Flat 9, 9 Willowmere Road. The attachments did not come through on our side and the landlord is asking for the invoice amount.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The work result is recorded on the provider's say-so. The tenant has not confirmed.
- No invoice has been seen, so its amount, payee and date are unchecked.
- Nothing here approves payment or closes the job.

## Remaining work
- Provider to resend the invoice and photos
- Tenant to confirm the fix
- Record and check the invoice, pass the amount to the landlord, file documents, then close
- Landlord reply (A2) sent; the agency owns the next update

## Missing or unavailable information
- Invoice and photos (attachments not readable)
- Tenant confirmation
- No visit date recorded in the system, only 'today' per the provider

## Conflicts between sources
- Stage hints say visit not yet booked, but the provider reports attending today. No visit date was recorded in the system. I trusted the provider's email and still need the tenant to confirm.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the work is done. The invoice and photos are unseen and the tenant has not confirmed. The landlord wants the invoice amount.

**2. What is the next action, who is it for, and through which channel?**

Ask Meadow Works by email to resend the invoice and photos. Ask the tenant by email to confirm the fix. The landlord has been updated by email, without an amount.

**3. Does anything need a human decision, and why?**

No. This is routine. Escalate only if the invoice is above the approved amount, from a different company, or dated before the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","outcome":"completed","evidence":"Meadow Works email 2025-06-01 (event 010): mixer … | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after record_work_result |
| A2 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"existing thread (event 011 email)","body":"Hi Kendall, … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Dear Ava,… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-03","purpose":"Check invoice received from Meadow Works and tenan… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-104 found in the request_information log |

## Failed or unverified actions
_None._
