# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Meadow Works reported the shower mixer cleaned and greased, but the attachments were unreadable. I told the landlord I haven't seen the invoice, asked the provider for a PDF, photos and the visit date, and asked the tenant to confirm the fix. Follow-up set for 4 June.

## Where the case stands
Provider reports the shower fixed on 1 June (mixer cleaned and greased). Invoice and photos not readable by us, no visit date recorded, tenant has not confirmed. Waiting on Meadow Works (PDF invoice, photos, visit date) and the tenant (confirmation). Landlord told. Ticket back in auto mode; follow-up 4 June.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works for the invoice as a PDF or plain-text total, the photos and the visit date/time | Meadow Works, provider | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm the shower now works | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up on 4 June, then forward the invoice to the landlord and close once the checks are met | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, yes: Meadow Works emailed today (1 June) to say they attended Flat 9 and cleaned and greased the shower mixer, and that hot and cold are now both running. They said photos and an invoice were attached, but the attachments did not come through to us in a readable form, so I haven't seen the invoice and can't give you the amount yet. I'm asking Meadow Works to resend it as a PDF and will pass it to you as soon as I have it. I'm also checking with the tenant that the shower is working. You'll hear from us by Wednesday 4 June.

**A2 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Please resend the invoice as a PDF (or the total in plain text), as the attachments did not reach us.
> - Please resend the photos of the work.
> - Please confirm the date and time you attended Flat 9, 9 Willowmere Road.
> 
> Why: Your email of 1 June reported the shower fixed, but the invoice and photos were not readable and no visit date was recorded. We need them before payment and closing.

**A3 · send_message → Ava Fletcher (tenant) via email, tenant email on file (event 006)** (verified)

> Hi Ava, Meadow Works tell us they visited today, cleaned and greased the shower mixer, and that hot and cold are now both running. Could you let us know whether the shower is now working properly, with both hot and cold coming out and the temperature mixing well? If anything is still wrong, tell us and we'll arrange a return visit. We'll check back with you by Wednesday 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the repair worked; this is the provider's claim until the tenant confirms.
- No invoice amount has been seen, recorded or approved for payment.
- The visit date and the photos are not verified.

## Remaining work
- Meadow Works to resend the invoice, photos and visit date (provider).
- Tenant to confirm the fix (tenant).
- Agency to record the work result and invoice, send the invoice to the landlord, and close (agency, by 4 June).

## Missing or unavailable information
- Invoice amount and issuer
- Photos
- Actual visit date and time
- Tenant confirmation

## Conflicts between sources
- System stage shows provider assigned/visit not booked, but the provider says they attended on 1 June.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the work done on 1 June. The invoice, photos, visit date and tenant confirmation are all outstanding. The system still shows the stage as provider assigned.

**2. What is the next action, who is it for, and through which channel?**

Ask Meadow Works by email for a readable invoice, photos and the visit date. Ask the tenant by email to confirm the fix. Update the landlord by email, saying the invoice has not been seen.

**3. Does anything need a human decision, and why?**

No. This is routine and nothing is above a limit or in dispute. If the invoice later looks wrong, it goes to accounts.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-034-attachmen… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 006)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-04","purpose":"Chase Meadow Works for readable invoice, photos an… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks"} | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after resume_auto |

## Failed or unverified actions
_None._
