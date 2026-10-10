# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor reports the shower mixer was cleaned and greased and works. Their attachments were not received, so I asked them to resend. I updated the landlord without quoting an amount, asked the tenant to confirm the fix, and set a follow-up for 4 June.

## Where the case stands
Provider assigned (Meadow Works), landlord approved. Provider emailed saying the work was done on 1 June, but the invoice and photos did not come through and no visit is recorded. Tenant has not confirmed the fix. Landlord has asked about the invoice amount.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend the invoice (PDF or plain text) and photos, and confirm the attendance date | Meadow Works, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Ask Ava to confirm the shower now works with hot and cold | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | WAIT | Follow up on 4 June for the invoice, photos and tenant confirmation, then tell the landlord the amount | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - The photos and invoice did not reach us. Please resend the invoice as a PDF (or state the total, VAT and invoice date in plain text) and the photos.
> - Please confirm the date and time you attended Flat 9, 9 Willowmere Road, as no visit was booked on our record.
> 
> Why: Attachments not visible; need invoice, photos and visit date before closing or payment.

**A2 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, Meadow Works emailed today to say they attended the shower, cleaned and greased the mixer, and that hot and cold are now both running. Their invoice and photos were attached but did not come through to us, so I can't yet tell you the amount. I've asked them to resend, and I'm checking with the tenant that it's fixed. I'll send you the invoice details as soon as we have them, aiming for within 2-3 working days (by 4 June).

**A3 · send_message → Ava Fletcher (tenant) via email, tenant email on file (event 006)** (verified)

> Hi Ava, Meadow Works tell us they attended today and cleaned and greased the shower mixer, and that hot and cold are now both running. Can you let us know whether the shower is working properly now, with both hot and cold coming through? If not, tell us and we'll arrange a return visit. We'll update you again by 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the work is complete or that the invoice is valid.
- No amount has been given to the landlord because the invoice has not been seen.
- The work result is not recorded yet, and the ticket is not closed or paid.

## Remaining work
- Provider to resend the invoice and photos and confirm the visit date.
- Tenant to confirm the fix.
- Then record the work result, record the invoice (checked against the approval), tell the landlord the amount, and close the ticket.

## Missing or unavailable information
- Invoice amount and date
- Photos
- Confirmed visit date
- Tenant confirmation

## Conflicts between sources
- The system stage shows no visit booked, but the provider says they attended today. The provider's claim is unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider says the work is done. The invoice, photos, visit date and tenant confirmation are all outstanding, and the landlord is waiting to hear the invoice amount.

**2. What is the next action, who is it for, and through which channel?**

Ask Meadow Works by email to resend the invoice and photos. Ask the tenant by email to confirm the fix. Update the landlord by email. A follow-up is set for 4 June.

**3. Does anything need a human decision, and why?**

No. All of this is routine and nothing needs authority yet. If the invoice later exceeds the approval or comes from a different company, that goes to accounts.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hi Kendall, Meadow Work… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 006)","body":"Hi Ava, Me… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-04","purpose":"Check provider resent invoice/photos and visit dat… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks"} | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after resume_auto |

## Failed or unverified actions
_None._
