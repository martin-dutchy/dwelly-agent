# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider reports attending on 1 June and fixing the mixer, but the invoice and photos were not readable in the case. I told the landlord the visit happened and that the amount is pending, asked the provider to resend the invoice and photos as PDFs, and asked the tenant to confirm the shower works; the job is on hold until 2 June and is not closed.

## Where the case stands
Provider Meadow Works attended on 1 June 2025 and reports the mixer temperature fault was cleaned and greased and both hot and cold now run (event 010). The invoice and photos were referenced as attached but are not readable in the case, so the amount and contents are unknown. Tenant has not confirmed the fix. Ticket is on hold for the provider's resent invoice and tenant confirmation, review 2025-06-02. Not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Answer the landlord's questions: the visit happened on 1 June, the provider reports the fix, and the invoice amount is pending because the attachment could not be opened. | Kendall, landlord | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Ask Meadow Works to resend the invoice and photos as PDF and confirm the visit date and work done. | Meadow Works, contractor | email | A3 ✅ |
| 3 | CHASE_TENANT | Ask Ava Fletcher to check the shower and confirm both sides work. | Ava Fletcher, tenant | email | A4 ✅ |
| 4 | WAIT | Hold the job until 2 June for the invoice and tenant confirmation. | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Kendall (landlord) via email, existing thread (event 011 email)** (verified)

> Hi Kendall,
> 
> Yes, Meadow Works attended Flat 9, 9 Willowmere Road today (1 June). They report they found a temperature issue with the mixer, cleaned and greased it, and say hot and cold are both now running.
> 
> Their email said the invoice and photos were attached, but we cannot open them, so I can't tell you the amount yet. I have asked Meadow Works to resend them. I will send you the amount once I have it. No payment will be approved until then.
> 
> Kind regards,
> Northbridge Lettings

**A3 · send_message → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> Hi Meadow Works,
> 
> Thank you for your email today about Flat 9, 9 Willowmere Road. The invoice and photos did not come through in a form we can open. Please resend both as PDF attachments, and confirm the visit date and the work carried out.
> 
> Thanks,
> Northbridge Lettings

**A4 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ava,
> 
> Meadow Works have told us they visited your flat today and fixed the shower mixer, with hot and cold now both running. Could you check the shower and let us know whether both sides work properly? If anything is still wrong, please tell us and we will arrange a follow-up.
> 
> Thanks,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The provider's report that the fault is fixed is not yet confirmed by the tenant.
- The invoice amount and contents are not established; the attachment was not visible.
- Sending the landlord a reply does not approve any spend or payment.
- Nothing has been closed or paid.

## Remaining work
- Obtain the readable invoice and photos from Meadow Works (provider, review 2025-06-02).
- Get the tenant's confirmation the shower works on both sides (tenant).
- Send the landlord the invoice amount and ask for payment approval if it is above any limit on file (agency, after invoice received).
- Final checks and close the job once these are in (agency).

## Missing or unavailable information
- Readable invoice and photos (attachment not visible).
- Invoice amount.
- Tenant confirmation that the shower works.
- Visit date as stated by the provider (only the provider's email of 1 June is on file).

## Conflicts between sources
- Provider email says invoice and photos are attached, but no readable attachment is in the case. Trusted the written report only; no amount stated.

## Answers to the case questions
**1. Has Meadow Works been out to the shower yet?**

Yes, according to Meadow Works' email of 1 June 2025 (event 010). They say they cleaned and greased the mixer and that hot and cold now both run. The tenant has not yet confirmed this.

**2. What does the invoice say and how much is it?**

Unknown. The invoice was referred to as attached but is not readable in the case, so I cannot state its amount or contents. I have asked Meadow Works to resend it as PDF.

**3. Where does the case stand?**

Provider assigned and visit reported done on 1 June. Awaiting the readable invoice, photos and tenant confirmation. On hold, review 2025-06-02.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","outcome":"completed","evidence":"Provider Meadow Works email, 2025-06-01 17:13 (ev… | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after record_work_result |
| A2 | `send_message` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","co… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contac… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","reason":"Waiting for Provider","comment":"Waiting for Meadow Works to resend the i… | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after put_on_hold |

## Failed or unverified actions
_None._
