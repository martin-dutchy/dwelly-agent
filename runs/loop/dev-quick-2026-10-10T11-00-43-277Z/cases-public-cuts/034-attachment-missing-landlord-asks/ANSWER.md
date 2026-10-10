# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Meadow Works visited on 1 June 2025 and reported that the mixer was cleaned and greased and that hot and cold water now run. Their invoice did not extract, so the amount is unknown. The landlord has been told the visit happened and that the figure is pending; the contractor, tenant and landlord have been messaged, and the ticket is on hold until 2025-06-03.

## Where the case stands
Repair visit reported done. Meadow Works attended on 1 June 2025 and reports the mixer fixed (hot and cold running). Their invoice could not be read by our system, so the amount is unknown. Tenant has not yet confirmed. Ticket is on hold for the provider until 2025-06-03.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Reply to the landlord that Meadow Works attended on 1 June and fixed the mixer, that the invoice amount is not yet available, and that payment waits for a checked invoice. | Kendall, landlord | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Ask Meadow Works to resend a readable invoice with the total and VAT basis, and confirm the completion photos. | Meadow Works, contractor | email | A3 ✅ |
| 3 | CHASE_TENANT | Ask the tenant to check the shower and report any remaining problem. | Ava Fletcher, tenant | sms | A4 ✅ |
| 4 | WAIT | Hold the ticket for provider and tenant replies, reviewing on 2025-06-03. | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Kendall (landlord) via email, existing thread (event 011 email)** (verified)

> Hi Kendall,
> 
> Yes, Meadow Works attended Flat 9, 9 Willowmere Road on 1 June 2025. They found a fault with the shower mixer, cleaned and greased it, and report that both hot and cold water are now running properly. We are waiting for the tenant to confirm this.
> 
> I'm sorry, but I can't give you the invoice amount yet. The invoice did not come through readably on our system, so I have asked Meadow Works to send it again. I will send you the figure as soon as I have it, and we will not release any payment until we have checked the invoice.
> 
> Thanks,
> Northbridge Lettings

**A3 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Please resend the invoice for the Flat 9, 9 Willowmere Road shower job as a readable PDF. Our system could not read the attachment.
> - Please confirm the invoice total, including or excluding VAT, and the work it covers.
> - Please confirm the photos of the completed mixer repair are attached.
> 
> Why: Your 1 June email reported the shower fixed, but the invoice attachment could not be read, so we cannot check or approve payment or answer the landlord's question about the amount.

**A4 · send_message → Ava Fletcher (tenant) via sms, 07700 900149** (verified)

> Hi Ava, this is Northbridge Lettings. Meadow Works say they visited your flat today and fixed the shower mixer, and that hot and cold water are now both running. Could you check it and let us know if there is still a problem? Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The contractor's report does not confirm the invoice amount, VAT or what was charged.
- The contractor's report is not yet confirmed by the tenant.
- Recording the visit as completed does not approve any spend or payment.
- No landlord spend limit is on file, so the invoice amount still needs checking against landlord approval before payment.

## Remaining work
- Get a readable invoice from Meadow Works and record it with the amount.
- Check the invoice against the landlord's approval (approval confirmed in event 004, no cap on file) and send the amount to the landlord.
- Get the tenant's confirmation that hot and cold water work.
- Close the ticket once the invoice is filed and the landlord is told.

## Missing or unavailable information
- Invoice amount and VAT treatment (attachment unreadable in event 009).
- Completion photos (not visible to us).
- Tenant confirmation that the shower is fixed.
- Landlord spend cap for this job (none on file).

## Conflicts between sources
- Event 010 says the invoice and photos are attached, but event 009 says the expected data could not be extracted. I trusted event 009 and treated the amount as unknown.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Work is reported done by the contractor (visit 1 June 2025). Outstanding: readable invoice and amount, tenant confirmation, and payment and closure after the invoice is checked.

**2. Has Meadow Works been out to the shower yet?**

Yes, according to Meadow Works' email of 1 June 2025 (event 010). The tenant has not yet confirmed.

**3. What does the invoice say and how much is it?**

Unknown. The invoice attachment could not be read (event 009). It has been requested again from Meadow Works, and the landlord has been told the amount is pending.

**4. What is the next action, who is it for, and through which channel?**

Email the landlord Kendall with the visit update (MSG-101). Email Meadow Works to resend the invoice (REQ-102). SMS the tenant Ava Fletcher to confirm the shower works (MSG-103). Hold the ticket until 2025-06-03.

**5. Does anything need a human decision?**

No for now. Routine repair, no emergency, and no spend has been approved beyond the existing landlord approval. Escalate if the invoice exceeds what the landlord approved or if the tenant reports the fault persists.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","outcome":"completed","evidence":"Meadow Works email, 2025-06-01 17:13 UTC (event 0… | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after record_work_result |
| A2 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-03… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"sms","contact":"07700 900149","ticket_ref":"NBL-034-attachment-missing… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","reason":"Waiting for Provider","comment":"Waiting for Meadow Works to resend a rea… | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after put_on_hold |

## Failed or unverified actions
_None._
