# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Meadow Works say they fixed the shower mixer on 1 June, but the invoice and photos did not arrive. I recorded the result, asked the provider to resend, asked the tenant to confirm, and told the landlord the amount is not known yet. A follow-up is set for 3 June.

## Where the case stands
Result stage: provider reports the shower fixed on 1 June. Invoice and photos were not received. Waiting on the provider's resend and the tenant's confirmation. The landlord has been told the invoice amount is not yet known.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend the invoice PDF and photos and confirm the visit date | Meadow Works, provider | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm the shower works | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Answer the landlord's questions with what we know; invoice amount not yet known | Kendall, landlord | email | A4 ✅ |
| 4 | WAIT | Follow up on 2025-06-03 for the invoice and tenant confirmation, then do invoice checks and close | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Thanks for the update. The photos and invoice did not reach us. Please resend the invoice as a PDF and the photos, or reply with the invoice total including VAT.
> - Please confirm the date of the visit.
> 
> Why: Attachments were not received; needed to file the invoice and answer the landlord.

**A3 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Dear Ava, Meadow Works have told us they attended on 1 June, cleaned and greased the shower mixer, and that hot and cold are now both running. Could you let us know whether the shower is working properly for you, with both sides running and the temperature mixing OK? Thank you.

**A4 · send_message → Kendall (landlord) via email, existing thread (event 011 email)** (verified)

> Hi Kendall, yes. Meadow Works emailed today to say they attended Willowmere Road, cleaned and greased the shower mixer, and that hot and cold are now both running. Their email mentioned an invoice and photos, but the attachments did not reach us, so I can't yet tell you the amount. I've asked them to resend, and I'm checking with the tenant that it's working. I'll send you the invoice figure as soon as I have it, before any payment is made.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the result as completed rests on the provider's word only; the tenant has not confirmed.
- Nothing here establishes the invoice amount, that it matches any approval, or that payment is due.
- The ticket is not closed.

## Remaining work
- Provider to resend the invoice and photos (owner: Meadow Works, agency chases).
- Tenant to confirm the fix.
- Record and check the invoice, tell the landlord the amount, then close (owner: agency).

## Missing or unavailable information
- Invoice and photos (attachments not received)
- Visit date confirmed by the provider
- Tenant confirmation

## Conflicts between sources
- The system hint says the visit is not yet booked, but the provider says they attended on 1 June. I trusted the provider's statement as to the work and am asking them to confirm the date.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the work done. The invoice, photos, visit date and tenant confirmation are outstanding, and the landlord is waiting for the amount.

**2. What is the next action, who is it for, and through which channel?**

Ask Meadow Works by email to resend the invoice and photos. Also email the tenant to confirm the fix, and reply to the landlord by email. All three are sent.

**3. Does anything need a human decision, and why?**

No. This is routine follow-up. Escalate only if the invoice is flagged on checking.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","outcome":"completed","evidence":"Provider email 2025-06-01 (event 010): mixer clea… | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-03… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-03","purpose":"Check provider has resent invoice/photos and tenan… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
