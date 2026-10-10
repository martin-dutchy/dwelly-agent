# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider attended on 1 June and reports the mixer is fixed, but the invoice and photos did not reach us, so the cost is unknown. I recorded the work as completed on the provider's report, asked Meadow Works to resend the invoice, told the landlord the amount is pending, asked the tenant to confirm the shower works, and put the ticket on hold until 2 June.

## Where the case stands
Provider Meadow Works attended on 2025-06-01 and reports the mixer was cleaned and greased and hot and cold now run (event 010). The invoice and photos were said to be attached but are not in the case file, so the amount is unknown. Work is recorded as completed on the provider's report, pending tenant confirmation. Ticket is on hold at result stage (review 2025-06-02), not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Meadow Works to resend the invoice as a PDF, the photos, and the total including VAT | Meadow Works, contractor | email | A2 ✅ |
| 2 | OTHER | Tell landlord Kendall the work is reported done, the invoice amount is not yet visible, and it will be sent before any payment | Kendall, landlord | email | A3 ✅ |
| 3 | CHASE_TENANT | Ask tenant Ava Fletcher to confirm hot and cold water are running properly | Ava Fletcher, tenant | sms | A4 ✅ |
| 4 | WAIT | Hold ticket until 2025-06-02 to check the invoice and tenant confirmation | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> Hello Meadow Works,
> 
> Thank you for attending Flat 9, 9 Willowmere Road today. Your email said the photos and invoice were attached, but we could not open any attachments on our side. Please resend the invoice as a PDF, and the photos, to this thread. Please also reply with the total amount including VAT and the work carried out.
> 
> Thanks,
> Northbridge Lettings

**A3 · send_message → Kendall (landlord) via email, existing thread (event 011 email)** (verified)

> Hi Kendall,
> 
> Thanks for your message about Flat 9, 9 Willowmere Road.
> 
> Yes, Meadow Works attended today (1 June). They report they cleaned and greased the shower mixer, and that hot and cold are both now running. Their email says the invoice is attached, but the attachment did not come through to us, so I cannot yet tell you the amount. I have asked them to resend the invoice as a PDF and confirm the total including VAT. Once I have it, I will send it to you before any payment is made.
> 
> We are also asking the tenant to confirm the shower is working properly.
> 
> Kind regards,
> Northbridge Lettings

**A4 · send_message → Ava Fletcher (tenant) via sms, 07700 900149** (verified)

> Hi Ava, this is Northbridge Lettings about the shower at Flat 9, 9 Willowmere Road. Meadow Works say they visited today and cleaned and greased the mixer. Could you check that both hot and cold water are now running properly, and let us know if anything is still wrong?

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The provider's report does not confirm the tenant's experience or that the fault is permanently fixed.
- The invoice amount, validity and payee are not established.
- Sending these messages does not approve any payment or spend.

## Remaining work
- Obtain and check the invoice and photos from Meadow Works (agency). Review 2025-06-02.
- Get tenant confirmation from Ava Fletcher (agency). Review 2025-06-02.
- Send landlord the invoice amount once known, then close if all checks pass (agency).

## Missing or unavailable information
- Invoice PDF and amount
- Photos
- Tenant confirmation that hot and cold water work

## Conflicts between sources
- System line 'landlord approval confirmed' (event 004) has no landlord wording on file. I did not treat it as a new spend approval; no spend is committed in this run.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider visited 1 June and reports the fault fixed. Work recorded as completed on the provider's report. Outstanding: invoice amount and PDF, photos, tenant confirmation. Ticket on hold until 2025-06-02, not closed.

**2. Has Meadow Works been out to the shower yet?**

Yes. Per the provider's email of 1 June 2025 (event 010), they attended on 1 June, cleaned and greased the mixer, and report hot and cold running. Tenant confirmation is still needed.

**3. What does the invoice say and how much is it?**

Unknown. The provider said the invoice was attached, but no attachment is in the case file, so I cannot state the amount or contents. I have asked Meadow Works to resend it.

**4. Does anything need a human decision?**

No. The invoice is the only open question and it is routine to obtain. No spend is approved or being approved in this run. Escalate only if the invoice is above what the landlord approved or the tenant reports the fault is still there.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","outcome":"completed","evidence":"Provider Meadow Works email, 2025-06-01 17:13 (ev… | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after record_work_result |
| A2 | `send_message` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-03… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"sms","contact":"07700 900149","ticket_ref":"NBL-034-attachment-missing… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","reason":"Waiting for Provider","comment":"Waiting for Meadow Works to resend the i… | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after put_on_hold |

## Failed or unverified actions
_None._
