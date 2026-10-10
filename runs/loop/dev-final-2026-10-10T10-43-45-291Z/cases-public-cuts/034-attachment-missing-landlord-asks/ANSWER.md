# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Meadow Works attended on 1 June and says the shower mixer is fixed. The invoice attachment was unreadable, so the landlord's question about the amount can't be answered yet. I told the landlord what is known, asked the contractor to resend, asked the tenant to confirm, and set a follow-up for 3 June.

## Where the case stands
Ticket at result stage. Meadow Works reports the shower mixer fixed on 1 June. Invoice and photos did not extract, so the amount is unknown. Tenant confirmation is pending. Landlord approval was confirmed earlier. Ticket is not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Landlord told the visit happened, invoice amount not yet seen, and asked not to pay yet | Kendall, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Asked contractor to resend invoice and photos with total and issuer | Meadow Works, contractor | email | A3 ✅ |
| 3 | CHASE_TENANT | Asked tenant to confirm the shower works | Ava Fletcher, tenant | email | A4 ✅ |
| 4 | WAIT | Follow-up on 3 June to chase the invoice and tenant confirmation | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Kendall (landlord) via email, existing thread (event 011 email)** (verified)

> Hi Kendall, yes, Meadow Works attended Flat 9 on 1 June. They report the shower mixer was cleaned and greased and hot and cold are both running fine now. They say photos and an invoice were attached, but the attachment didn't come through on our system, so I can't yet see the amount and don't want to quote you a figure I haven't seen. I've asked them to resend it and will pass it on as soon as we have it. I'm also checking with the tenant that the shower is working properly. Please don't pay anything until we've confirmed the invoice.

**A3 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Please resend the invoice and photos for Flat 9, 9 Willowmere Road; the attachments did not reach us.
> - Please state the total including VAT and the company name on the invoice.
> 
> Why: Attachments missing; landlord is asking for the invoice amount and we must check it before payment.

**A4 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ava, Meadow Works tell us they visited on 1 June and cleaned and greased the shower mixer, and that hot and cold are both now running. Could you let us know whether the shower is working properly, with the cold side running and the temperature steady? If anything is still wrong, tell us and we'll get it looked at. Thanks!

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the work result rests on the contractor's email only; it does not confirm the fix to the tenant's satisfaction.
- No invoice has been recorded or checked; nothing says what it costs or who pays.
- Nothing here authorises payment.

## Remaining work
- Obtain invoice and photos from Meadow Works, then record and check the invoice and file the documents (agency ops)
- Get tenant confirmation
- Send the landlord the invoice amount once verified
- Close the ticket after the closing checks

## Missing or unavailable information
- Invoice amount, issuer and photos (attachment not extracted)
- Tenant confirmation the shower works

## Conflicts between sources
- Contractor says an invoice and photos are attached, but the system could not extract them (event 009); no amount is available.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The work is reported complete by the contractor. Outstanding: the invoice and photos (unreadable), tenant confirmation, invoice check, landlord update and closing.

**2. What is the next action, who is it for, and through which channel?**

Landlord updated by email (invoice not yet seen). Contractor asked by email to resend the invoice. Tenant asked by email to confirm the fix.

**3. Does anything need a human decision, and why?**

No. Nothing exceeds authority yet. If the resent invoice is flagged against the approval or the contractor, that would then need review.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","outcome":"completed","evidence":"Meadow Works email 2025-06-01 (event 010): mixer … | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after record_work_result |
| A2 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-03… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-03","party":"Meadow Works / tenant","purpose":"Chase resent invoi… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
