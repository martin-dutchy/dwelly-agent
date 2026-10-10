# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider says they fixed the shower mixer, but the invoice and photos were not visible. I asked the provider to resend them and confirm the visit date, asked the tenant to confirm the fix, and told the landlord the amount is not yet known. A follow-up is set for 4 June.

## Where the case stands
Ticket at mp_time in the system, but the provider says (event 010) they attended on 1 June and fixed the mixer. The invoice and photos were not readable, the visit date is not confirmed, and the tenant has not confirmed the fix. The landlord is asking for the invoice amount.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend the invoice as PDF and photos and confirm the visit date | Meadow Works, provider | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm the shower works | Ava Fletcher, tenant | email | A2 ✅ |
| 3 | OTHER | Reply to landlord: provider reports the work done, invoice not yet seen so no amount given | Kendall, landlord | email | A3 ✅ |
| 4 | WAIT | Follow up on 4 June for invoice, visit date and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Thanks for your email. The photos and invoice did not come through on our side. Please resend the invoice as a PDF (and the photos), with the total, the invoice date and the company name on it.
> - Please confirm the date and time you attended Flat 9, 9 Willowmere Road.
> 
> Why: Attachments not visible; need invoice and visit date to record the result and check the invoice.

**A2 · send_message → Ava Fletcher (tenant) via email, tenant email on file** (verified)

> Hi Ava, Meadow Works have told us they attended today and cleaned and greased the shower mixer, and that hot and cold are both running now. Could you let us know whether the shower is working properly, with both hot and cold and a comfortable mix? If anything is still wrong, tell us and we will arrange a return visit. We will check back with you by 4 June.

**A3 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, yes. Meadow Works emailed today to say they attended the shower at Willowmere Road, found a problem with the mixer, cleaned and greased it, and say hot and cold now run fine. They said an invoice and photos were attached, but the attachments did not reach us, so we can't yet tell you the amount. We have asked them to resend it, and we are confirming with the tenant that the shower works. We will send you the invoice details once we have them. Please don't pay anything direct until then.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No work result recorded: completion rests on the provider's word only until the tenant confirms.
- No invoice recorded or approved; the amount is unknown.
- Nothing here confirms the visit date or that the invoice is valid.

## Remaining work
- Provider to resend the invoice and confirm the visit date
- Tenant to confirm the fix
- Then record the work result and invoice, check them, tell the landlord the amount, file documents and close (agency)

## Missing or unavailable information
- Invoice amount, issuer and date (attachment unreadable)
- Photos
- Visit date
- Tenant confirmation

## Conflicts between sources
- System stage says provider assigned/visit not booked, but the provider says they have already attended.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the work done on 1 June. Outstanding: the invoice and photos (unreadable), the visit date, tenant confirmation, and the landlord's question about the amount.

**2. What is the next action, who is it for, and through which channel?**

Email Meadow Works for the invoice PDF and visit date. Email the tenant to confirm the fix. Email the landlord a status update.

**3. Does anything need a human decision, and why?**

No. Everything here is routine, so no escalation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"tenant email on file","ticket_ref":"NBL-034-attachme… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-034-attachmen… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-04","party":"Meadow Works / tenant","purpose":"Check invoice and … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
