# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor says they cleaned and greased the shower mixer on 1 June and that hot and cold now run. The invoice and photos never arrived. I asked the provider to resend them, asked the tenant to confirm the fix, and told the landlord that no amount is known yet and not to pay. A follow-up is set for 4 June.

## Where the case stands
Landlord approval confirmed, Meadow Works assigned. Provider reports the work done on 1 June but the invoice and photos did not arrive. No visit is recorded in the system, and the ticket is still at mp_time. Waiting on the provider for the invoice, photos and visit date, and on the tenant to confirm the fix. Follow-up set for 2025-06-04.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend the invoice (PDF or amount in the email), the photos and the attendance date | Meadow Works, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Ask Ava to confirm whether the shower now works, and say when she will next hear from us | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Answer the landlord: contractor reports the work done, invoice not yet seen so no amount given, please don't pay yet, update by 4 June | Kendall, landlord | email | A2 ✅ |
| 4 | WAIT | Wait for the invoice, photos and tenant confirmation; review on 2025-06-04 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> - Your email said photos and invoice were attached, but nothing came through on our side. Please resend the invoice as a PDF (or put the total, VAT and invoice date in the email) and the photos.
> - Please confirm the date you attended Flat 9, 9 Willowmere Road.
> 
> Why: Attachments not received; invoice amount and visit date needed before anything is paid or closed.

**A2 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, Meadow Works emailed today to say they attended the shower at Willowmere Road, found a problem with the mixer, cleaned and greased it, and that hot and cold are now both running. That is the contractor's report; we are checking it with the tenant. They said an invoice and photos were attached, but they did not reach us, so I can't yet tell you the amount. I've asked them to resend it and will pass on the figure as soon as we have it. Please don't pay anything until you hear from us. We'll update you by Wednesday 4 June.

**A3 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Dear Ava, Meadow Works have told us they attended today and cleaned and greased the shower mixer, and that hot and cold are now both running. Can you let us know whether the cold side is working properly now, and whether the water is no longer too hot? If it isn't fixed, tell us and we'll arrange a return visit. We'll be in touch again by Wednesday 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the shower is fixed; that is the contractor's claim until the tenant confirms.
- No invoice amount is known, and no invoice has been recorded or approved for payment.
- No work result recorded and the ticket is not closed.

## Remaining work
- Get the invoice, photos and attendance date from Meadow Works (agency).
- Get the tenant's confirmation.
- Record the work result and the invoice, check the invoice against the approval, tell the landlord the amount, then run final checks and close.

## Missing or unavailable information
- Invoice amount and issuer
- Photos
- Date of attendance
- Tenant confirmation

## Conflicts between sources
- Derived hint says the visit is not yet booked, but the provider says they attended on 1 June. Treated as an unverified claim pending evidence.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider reports the repair done on 1 June. The attachments were not received, the visit is not recorded in the system, and the tenant has not confirmed. Outstanding: the invoice, photos, visit date and tenant confirmation, then the work result, invoice and close.

**2. What is the next action, who is it for, and through which channel?**

Email to Meadow Works asking for the invoice, photos and visit date. Emails to the tenant (confirm the fix) and to the landlord (status, no amount yet, don't pay yet). Follow-up set for 4 June.

**3. Does anything need a human decision, and why?**

No. This is routine chasing and nothing needs authority yet. It escalates only if the invoice is above approval or the provider doesn't respond.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","questions":[… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-034-attachmen… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-04","party":"Meadow Works / tenant","purpose":"Check invoice, pho… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `add_note` | {"entity":"NBL-034-attachment-missing-landlord-asks","note":"Event 010: provider says attended 1 June, mixer cleaned/greased, photos and inv… | 1 | ✅ verified | NOTE-105 found in the add_note log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks"} | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after resume_auto |

## Failed or unverified actions
_None._
