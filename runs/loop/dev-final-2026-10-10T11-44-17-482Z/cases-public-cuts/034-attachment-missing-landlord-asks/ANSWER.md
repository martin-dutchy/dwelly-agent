# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Meadow Works reported the shower mixer fixed, but the invoice and photos did not arrive. I recorded the result, asked the provider to resend the invoice, asked the tenant to confirm the fix, and told the landlord the amount is not yet known. A follow-up is set for 2025-06-04.

## Where the case stands
Work reported done by Meadow Works (event 010), recorded as completed. Invoice and photos not received. Waiting on provider for invoice, tenant for confirmation. Landlord told. Review 2025-06-04.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend invoice as PDF or give the amount in plain text, and confirm attendance date | Meadow Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask Ava to confirm the shower works | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell landlord the work is reported done and the invoice amount is not yet known | Kendall, landlord | email | A4 ✅ |
| 4 | WAIT | Follow up on invoice and tenant confirmation | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Thanks for the update. The photos and invoice did not come through to us. Please resend the invoice as a PDF, or reply with the total amount, VAT and invoice date in plain text.
> - Please confirm the date and time you attended.
> 
> Why: Attachments not received; needed for invoice checks and to answer the landlord.

**A3 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ava, Meadow Works say they have attended and cleaned and greased the shower mixer, and that hot and cold are now both running. Could you let us know whether the shower is working properly for you now? If not, tell us and we will get them back. We will check in with you again in 2 working days if we haven't heard.

**A4 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, yes: Meadow Works emailed today to say they attended Willowmere Road, found a problem with the shower mixer, cleaned and greased it, and that hot and cold now run fine. That is their report; we are confirming with the tenant. They said an invoice and photos were attached, but these did not reach us, so I can't tell you the amount yet. I have asked them to resend it and will pass the figure on once I have it, before anything is paid.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the result rests on the provider's report only; the fix is not tenant-confirmed.
- Nothing here approves payment; the invoice has not been seen or checked.
- No amount was given to the landlord.

## Remaining work
- Get invoice; record_invoice and check it; tell landlord the amount
- Tenant confirmation
- Close ticket afterwards

## Missing or unavailable information
- Invoice and photos (attachments not received)
- Visit date
- Tenant confirmation

## Conflicts between sources
- Hints say the visit is not booked, but the provider reports having attended on 2025-06-01. I trusted the provider's email and am asking for the date.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider says the work is done. The invoice and photos are not seen, the tenant has not confirmed, and the visit date is unknown. The ticket still showed stage mp_time before I recorded the result.

**2. What is the next action, who is it for, and through which channel?**

Ask Meadow Works by email to resend the invoice. Ask the tenant by email to confirm the fix. Reply to the landlord by email. All three are sent.

**3. Does anything need a human decision, and why?**

No. This is routine. It would need escalation only if the invoice turns out to be above any approval, from a different company, or dated before the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","outcome":"completed","evidence":"Meadow Works email 2025-06-01 (event 010): mixer … | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after record_work_result |
| A2 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi Ava, M… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hi Kendall, yes: Meadow… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-04","purpose":"Check Meadow Works resent invoice and tenant confi… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
