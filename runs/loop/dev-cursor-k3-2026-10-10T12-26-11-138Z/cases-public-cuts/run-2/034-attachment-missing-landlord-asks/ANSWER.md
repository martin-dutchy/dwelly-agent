# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor says they fixed the shower mixer, but the attachments were unreadable. The landlord asked for the invoice amount. I told the landlord what we know and that the amount is not yet available. I asked the contractor for a readable invoice and asked the tenant to confirm the fix. The ticket is on hold until 4 June.

## Where the case stands
Stage mp_time with landlord approval confirmed. Meadow Works reports the visit was done (event 010) and the mixer was cleaned and greased. The invoice and photos are not visible to us. Tenant confirmation is outstanding. The ticket is on hold until 2025-06-04.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Meadow Works to resend the invoice and photos as a PDF or plain text with the total | Meadow Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask Ava to confirm the shower now works | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Answer the landlord: the visit is reported done, the invoice amount is not yet known, and an update follows by 4 June | Kendall, landlord | email | A1 ✅ |
| 4 | WAIT | Hold until 2025-06-04 for the invoice and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, Meadow Works emailed today to say they visited Willowmere Road, found a problem with the shower mixer, cleaned and greased it, and that hot and cold are now both running. That is their report; we are confirming with the tenant. They say photos and an invoice were attached, but we haven't been able to see the attachments, so we can't yet tell you the amount. We have asked Meadow Works to resend the invoice, and will pass the figure on as soon as we have it, before anything is paid. We will update you by 4 June.

**A2 · send_message → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> Hi, thanks for your update on the shower at Flat 9, 9 Willowmere Road. The photos and invoice didn't come through on our side. Could you please resend them as a PDF, or reply in plain text with the invoice total (and whether VAT is included), the invoice date and the company name on it? Thanks.

**A3 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Dear Ava, Meadow Works tell us they attended today and cleaned and greased the shower mixer, and that hot and cold are now both running. Could you let us know whether the shower is now working properly, with the cold side giving water and the temperature mixing well? If not, tell us and we will send them back. We will check in with you again by 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the fix, which is only the contractor's claim until the tenant confirms.
- The invoice amount, payee and date are unverified, so no invoice was recorded and no payment was approved.
- The work result has not been recorded yet.

## Remaining work
- Get the invoice and photos from Meadow Works, then record the invoice and check it against the approval and contractor.
- Get the tenant's confirmation.
- Tell the landlord the amount.
- Record the work result, then close the ticket.

## Missing or unavailable information
- Invoice amount, date and issuer
- Photos
- Tenant confirmation
- The visit date is not stated; the email only says 'today'.

## Conflicts between sources
- The system hint says the visit is not booked, but the contractor says they attended. I treated the contractor's email as an unconfirmed claim.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The contractor reports the work is done. The invoice, photos and tenant confirmation are outstanding, and the landlord is waiting for the amount.

**2. What is the next action, who is it for, and through which channel?**

Email Meadow Works for a readable invoice, email the tenant to confirm the fix, and email the landlord an update. All three were sent. Then wait until 4 June.

**3. Does anything need a human decision, and why?**

No. Everything here is routine and a dated hold covers the wait.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-034-attachmen… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","reason":"Waiting for Provider","comment":"Awaiting readable invoice/photos from Me… | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after put_on_hold |

## Failed or unverified actions
_None._
