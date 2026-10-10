# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Meadow Works reports it cleaned and greased the shower mixer and that both hot and cold now run. The invoice and photos did not reach the system. I recorded the work result, asked the contractor to resend, updated the landlord without inventing a figure, asked the tenant to confirm, and put the ticket on hold.

## Where the case stands
Stage: result. Meadow Works reports the work done on 1 June. The invoice and photos were not received. The landlord is told the visit happened and that the amount is pending. The tenant has been asked to confirm. The ticket is on hold until 2025-06-03.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Meadow Works to resend the invoice and photos, with the total and the company name in the email body | Meadow Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm the shower now works | Ava Fletcher, tenant | email | A4 ✅ |
| 3 | OTHER | Answer the landlord: the visit happened, the invoice amount is not yet known, and they should not pay yet | Kendall, landlord | email | A3 ✅ |
| 4 | WAIT | Hold the ticket until the invoice and tenant confirmation arrive; review on 2025-06-03 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> Hi, thanks for attending Flat 9, 9 Willowmere Road. The photos and invoice didn't come through on our system. Please resend them as attachments, and state the total amount including VAT and the company name on the invoice in the email body. Thanks, Northbridge Lettings

**A3 · send_message → Kendall (landlord) via email, existing thread (event 011 email)** (verified)

> Hi Kendall, yes: Meadow Works attended on 1 June. They report the shower mixer was cleaned and greased and hot and cold are now both running fine. They said photos and an invoice were attached, but the attachments didn't reach us, so we can't yet tell you the amount. We've asked them to resend and will send you the invoice and total as soon as it arrives. Please don't pay anything until we confirm. We're also checking with the tenant that the shower is working. Thanks, Northbridge Lettings

**A4 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Dear Ava, Meadow Works say they visited today and fixed the shower mixer, so both hot and cold should now run. Could you let us know whether the shower is working properly, with water coming from both sides at a comfortable temperature? If not, tell us and we'll arrange a return visit. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The work result is based on the contractor's own email. The tenant has not confirmed it.
- No invoice has been recorded, so the amount and the payer are unknown and nothing is approved for payment.
- The landlord has been told nothing about cost.

## Remaining work
- Receive the invoice and photos, then record the invoice and file the documents (agency ops)
- Get the tenant's confirmation that the shower works
- Send the invoice amount to the landlord
- Close the ticket after the checks pass

## Missing or unavailable information
- Invoice amount, issuer and photos (attachments not extracted)
- Tenant confirmation
- Spend limit and landlord payment preference (property record is empty)

## Conflicts between sources
- The contractor says an invoice and photos were attached, but the system could not extract them.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The work is reported complete. The invoice and photos are missing, the tenant has not confirmed, and the landlord has not been told the cost.

**2. What is the next action, who is it for, and through which channel?**

Ask Meadow Works by email to resend the invoice. Update the landlord by email. Ask the tenant by email to confirm the shower works. All three are done.

**3. Does anything need a human decision, and why?**

No. Everything done so far is routine. It would only need escalating if the invoice is not received or is flagged against the approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","outcome":"completed","evidence":"Meadow Works email 2025-06-01 (event 010): mixer … | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after record_work_result |
| A2 | `send_message` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","body":"Hi, t… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"existing thread (event 011 email)","body":"Hi Kendall, … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Dear Ava,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","reason":"Waiting for Provider","comment":"Awaiting resent invoice and photos from … | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after put_on_hold |

## Failed or unverified actions
_None._
