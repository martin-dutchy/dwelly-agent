# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider says it fixed the shower on 1 June, but the attachments did not arrive. I asked the provider to resend, asked the tenant to confirm the fix, and told the landlord the status without quoting any amount. A follow-up is set for 4 June.

## Where the case stands
Ticket at mp_time with landlord approval confirmed. Meadow Works reports the shower fixed on 1 June, but the invoice and photos are not visible. Waiting on provider (resend invoice) and tenant (confirm fix). Landlord asked about invoice and has been answered.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend invoice and photos as PDF or give the total, date and company name, and confirm the visit date | Meadow Works, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Ask Ava to confirm the shower works, noting this is the provider's claim | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | WAIT | Review on 4 June for invoice and tenant confirmation, then record result and invoice and close | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> Hi Meadow Works, thanks for the update on the shower at Flat 9, 9 Willowmere Road. The photos and invoice didn't reach us. Please could you resend them as PDFs, or reply with the invoice total (including VAT), the invoice date and the company name on it? Please also confirm the date of your visit.

**A2 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, Meadow Works emailed on 1 June to say they attended the shower at Willowmere Road, cleaned and greased the mixer, and that hot and cold are now both running. That is their report; we are confirming it with the tenant. Their invoice and photos did not come through on the email, so I can't yet tell you the amount. I've asked them to resend. We'll pass it on as soon as we have it, and nothing will be paid before then. I'll update you by 4 June at the latest.

**A3 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Dear Ava, Meadow Works tell us they visited on 1 June, cleaned and greased the shower mixer, and that hot and cold are now both working. Could you let us know whether the shower is working properly now, with water from both sides and a comfortable temperature? If not, tell us and we'll arrange for them to come back. We'll be in touch again by 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The provider's email does not prove the fix; the tenant has not confirmed.
- No invoice amount is known, so nothing is approved or paid.
- No work result recorded and no close; the visit date was not stated by the provider.

## Remaining work
- Obtain invoice and photos from provider
- Tenant confirmation of the fix
- Record work result and invoice, check invoice against approval and contractor
- Tell the landlord the amount, then close (agency follow-up 4 June)

## Missing or unavailable information
- Invoice and photos (attachments not visible)
- Exact visit date
- Tenant confirmation

## Conflicts between sources
- Hint says visit not booked, but the provider email says it already attended on 1 June; the provider's email is the later source, though unconfirmed by the tenant.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider reports the work done (mixer cleaned and greased). Invoice and photos unseen, tenant confirmation outstanding, work result and invoice not yet recorded.

**2. What is the next action, who is it for, and through which channel?**

Email to Meadow Works for the invoice/photos, email to the tenant to confirm the fix, and email to the landlord with a status update. All done; follow-up on 4 June.

**3. Does anything need a human decision, and why?**

No. This is routine and nothing needs authority yet. It would only be escalated if the invoice is flagged on checking.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-034-attachmen… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-04","purpose":"Check provider resent invoice/photos and tenant co… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks"} | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after resume_auto |

## Failed or unverified actions
_None._
