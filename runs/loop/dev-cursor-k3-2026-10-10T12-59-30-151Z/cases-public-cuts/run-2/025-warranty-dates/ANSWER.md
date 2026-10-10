# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approved only a charge-free warranty service; Harbour Services say the oven is out of warranty and gave conflicting visit dates. I recorded the conditional decision, asked the landlord for approval of paid work, asked the provider to confirm the date and quote first, updated the tenant, and put the job on hold to 23 May.

## Where the case stands
Provider assigned (Harbour Services), on hold waiting for landlord until 2024-05-23. Landlord only approved a charge-free warranty service; provider says no warranty. Visit date unconfirmed (22 May per call vs "21st June" in emails).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Felix to approve a paid diagnosis/repair by Harbour Services or arrange own contractor, now warranty is denied | Felix, landlord | email | A2 ✅ |
| 2 | CHASE_PROVIDER | Ask Harbour Services to confirm the exact visit date/time and to quote before any chargeable work | Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the visit is not yet confirmed, the repair cost is being checked, next update by 23 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold until 2024-05-23 for landlord decision and provider date confirmation | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, not yet checked against paperwork). You asked for a charge-free service only. Do you approve Harbour Services attending to diagnose and repair at your cost, or will you arrange your own contractor? Please also send the warranty or purchase paperwork if you have it.
> 
> Options: Approve Harbour Services to attend and quote before any paid repair (recommended); Landlord arranges own contractor; Landlord supplies warranty paperwork to dispute

**A3 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Thanks for confirming. Two points: 1) Your emails say "tomorrow, 21st June" but the tenant call was booked for tomorrow 22 May at 2:30pm. Please confirm the exact date and time. 2) As the oven is not under warranty, the landlord has only approved a charge-free service so far. Please attend for diagnosis only and send us a quote with photos before any chargeable work; do not proceed without our approval. We have asked the landlord and will update you.

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Hi Leo, Harbour Services have told us they plan to visit tomorrow (22 May) at about 2:30pm. We are confirming the exact date with them and will tell you once it is confirmed. They have said the oven is no longer under warranty, so we are checking with the landlord about any repair cost. You'll hear from us by 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; date is unconfirmed
- The warranty claim is the provider's and unverified
- The landlord has not approved any paid work
- Nothing here says the oven fault is diagnosed or who pays

## Remaining work
- Landlord decision on paid repair or own contractor (agency, review 23 May)
- Provider to confirm visit date; then set_visit
- Quote and approval if repair needed
- Post-visit result, invoice, closing

## Missing or unavailable information
- Confirmed visit date
- Warranty paperwork and who fitted the oven
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date: call says 22 May 2:30pm; emails say 'tomorrow, 21st June'. Not booked until provider confirms.
- Landlord names Keystone Works as the oven contractor; agency note says Harbour Services.
- Event 014 says oven replaced March 2025, which is after today's date; tenant says last year.
- System says landlord approval confirmed, but the landlord's words only cover a charge-free warranty service.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, on hold. Outstanding: landlord decision on paid repair since warranty is denied, and confirmation of the visit date.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Felix by email; date confirmation and quote-first instruction to Harbour Services by email; tenant update by email.

**3. Does anything need a human decision, and why?**

No escalation. The landlord decides on spend. Routine follow-up is scheduled by hold review on 23 May.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"R-025","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works for the oven repl… | 1 | ❌ failed | Ticket R-025 not found on read-back |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"R-025","decision_needed":"Harbour Services say the oven is no longer under warranty (their claim, not yet … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","body":"T… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","body":"Hi Leo, Harbour Service… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"R-025","reason":"Waiting for Landlord","comment":"Waiting for landlord decision on paid repair now warranty denied, and provi… | 1 | ❌ failed | Ticket R-025 not found on read-back |
| A6 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Waiting for landlord decision on paid repair now warranty … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A1: Wrong ticket ref R-025; retried with NBL-025-warranty-dates as A6
- A5: Wrong ticket ref; retried as A7
