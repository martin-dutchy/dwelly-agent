# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider reports the shower mixer was cleaned and greased and works, but the attachments did not arrive. I told the landlord the invoice is not yet seen, asked the provider to resend it, asked the tenant to confirm the fix, and set a follow-up for 4 June.

## Where the case stands
Ticket at mp_time in the system, but the provider says in event 010 that it attended on 2025-06-01 and fixed the mixer. Photos and invoice were not readable, so the work is unverified and no result or invoice is recorded. Waiting on the provider for the invoice and photos, and on the tenant for confirmation. The landlord has been answered.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the provider to resend the invoice and photos and confirm the visit date and time | Meadow Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm the visit happened and the shower works | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Tell the landlord the provider reports the job done, that the invoice has not been seen so no amount can be given, and when they will next hear from us | Kendall, landlord | email | A1 ✅ |
| 4 | WAIT | Follow up on 2025-06-04 for the invoice and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, Meadow Works emailed today to say they attended the shower at Willowmere Road, found a problem with the mixer, cleaned and greased it, and that hot and cold are now both running. They say photos and an invoice were attached, but the attachments did not reach us, so we haven't seen the invoice or the amount and can't tell you the cost yet. We have asked them to resend it and are checking with the tenant that the shower works. We'll update you once we have the invoice, by Wednesday 4 June.

**A2 · send_message → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> Hi, thanks for your update on the shower at Flat 9, 9 Willowmere Road. The photos and invoice did not come through. Please resend them as PDF or image files, or put the invoice total and the photo details in the body of a reply. Please also confirm the date and time you attended.

**A3 · send_message → Ava Fletcher (tenant) via email, tenant email on file (event 006)** (verified)

> Dear Ava, Meadow Works tell us they attended today and cleaned and greased the shower mixer, and that hot and cold are now both running. Can you confirm that the cold side now works and the temperature mixes properly, and that they visited today? If anything is still wrong, let us know and we'll arrange a return visit. We'll be in touch again by Wednesday 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the repair worked, the visit date or the cost.
- No work result, invoice or close has been recorded.
- The landlord has not been given any amount.

## Remaining work
- Agency: get the invoice and photos, then record the work result and the invoice (check it against the assigned provider).
- Agency: get the tenant's confirmation.
- Agency: send the landlord the invoice amount, then close.

## Missing or unavailable information
- Invoice amount and photos (attachments unreadable)
- Tenant confirmation
- Exact visit time

## Conflicts between sources
- The system stage shows the visit not booked, but the provider says it attended today.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the job done on 2025-06-01. The invoice, photos and tenant confirmation are outstanding, and the system stage has not moved on from mp_time.

**2. What is the next action, who is it for, and through which channel?**

Ask Meadow Works to resend the invoice and photos by email. Ask the tenant to confirm the fix by email. Update the landlord by email, saying no amount can be given yet.

**3. Does anything need a human decision, and why?**

No. This is routine work and there is no invoice discrepancy yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-034-attachmen… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 006)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-04","purpose":"Check provider has resent invoice/photos and tenan… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
