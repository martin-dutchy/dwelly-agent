# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider reports the shower mixer was cleaned and greased and both sides now run, but the attachments never arrived. I told the landlord the work is reported done and the invoice is not yet seen. I asked the provider to resend it and the tenant to confirm the fix, and set a follow-up for 3 June.

## Where the case stands
Landlord approval confirmed, Meadow Works assigned. Provider reports the shower fixed on 2025-06-01, but the invoice and photos did not arrive. Invoice amount, visit date and tenant confirmation are outstanding. The system still shows stage mp_time (visit not recorded).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend the invoice (PDF or plain text) and photos, and confirm the visit date/time | Meadow Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask Ava Fletcher to confirm the shower works | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Answer the landlord: provider reports the work done, invoice not yet seen, will pass on the amount | Kendall, landlord | email | A1 ✅ |
| 4 | WAIT | Follow up on 2025-06-03 for the invoice and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Kendall (landlord) via email, existing thread (event 011 email)** (verified)

> Hi Kendall, Meadow Works emailed today to say they attended the shower at Flat 9, 9 Willowmere Road, found a problem with the mixer, cleaned and greased it, and that hot and cold are now both running. They said photos and an invoice were attached, but nothing came through on our side, so I can't yet tell you the amount. I've asked them to resend it and will pass the figure on as soon as I have it. I'm also checking with the tenant that the shower is working properly. Thanks.

**A2 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Thanks for your update. The photos and invoice did not arrive with your email. Please resend the invoice as a PDF (or put the total, VAT and invoice date in a plain-text reply), plus the photos.
> - Please confirm the date and time of your visit at Flat 9, 9 Willowmere Road.
> 
> Why: Attachments missing; needed to record the invoice and visit and answer the landlord.

**A3 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ava, Meadow Works have told us they visited today and fixed the shower mixer, so hot and cold should both be running. Could you let us know whether the shower is now working properly, with both sides running and the temperature mixing OK? If anything is still wrong, tell us and we'll get them back. Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The provider's email does not prove the fix; the tenant has not confirmed.
- No invoice amount has been seen or recorded, and none was given to the landlord.
- Visit date is only stated as 'today' by the provider; no visit was recorded or booked.
- Nothing here approves payment or closes the job.

## Remaining work
- Provider to resend invoice and photos (owner: Meadow Works; agency chases)
- Tenant confirmation of fix
- Record invoice, check against approval, tell landlord the amount and how payment works
- Record work result and close the ticket

## Missing or unavailable information
- Invoice amount and date
- Photos
- Exact visit date/time
- Tenant confirmation

## Conflicts between sources
- System hints show the visit as not booked, while the provider says they attended today; the provider's claim is unverified, with no date confirmed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider says the work is done (2025-06-01). The invoice, photos, visit date and tenant confirmation are outstanding; the ticket is not yet closed.

**2. What is the next action, who is it for, and through which channel?**

Ask Meadow Works by email to resend the invoice and photos. Update the landlord (Kendall) by email and ask the tenant to confirm the fix, also by email. Follow up on 3 June.

**3. Does anything need a human decision, and why?**

No. This is routine chasing. Escalate only if the invoice is flagged against the approval or the provider stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-03… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-03","purpose":"Check provider has resent invoice/photos and tenan… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
