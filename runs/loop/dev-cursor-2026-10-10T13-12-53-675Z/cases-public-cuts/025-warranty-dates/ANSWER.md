# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved only a charge-free warranty service. Harbour Services now say the oven is out of warranty and give conflicting visit dates. I recorded the conditional approval, asked the provider to confirm the date and warranty, asked the landlord about a paid route, updated the tenant and set a follow-up.

## Where the case stands
Provider (Harbour Services) assigned, ticket at mp_time on hold waiting for provider. Visit date unconfirmed (22 May per call vs "21st June" in emails). Provider says out of warranty; landlord only approved a charge-free warranty service, so paid work needs new approval, which is requested.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services to confirm the visit date/time and warranty dates in writing, and to diagnose and quote only | Clara, Harbour Services (contractor) | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask Felix whether Harbour Services may diagnose and quote for a paid repair, or he wants his own contractor, by 24 May | Felix, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit date is being confirmed, repair costs need landlord agreement, next update by 24 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Follow up on provider confirmation and landlord answer on 22 May / 24 May | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say the visit is 'tomorrow, 21st June', but tomorrow is 22 May 2024 and the call with the tenant said 2:30pm tomorrow. Please confirm the exact date and time.
> - Please confirm the warranty position in writing: the date you replaced the oven (our note says March 2025, which can't be right) and the warranty end date.
> - As you say it is out of warranty, please do not carry out chargeable repairs. Attend to diagnose only and send a quote with photos for landlord approval.
> 
> Why: Visit date is inconsistent so it cannot be booked; landlord only approved a charge-free warranty service.

**A3 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say (their claim, not yet confirmed in writing) the oven is no longer under warranty. You approved a charge-free warranty service only. Do you want Harbour Services to attend to diagnose and quote for a paid repair, which would come back to you for approval before any work, or would you prefer to arrange your own contractor? Please reply by 24 May 2024.
> 
> Options: Harbour Services diagnose and quote, quote comes to you for approval (recommended); You arrange your own contractor; Hold while you check the warranty paperwork

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, Harbour Services have told us they spoke to you about a visit tomorrow (22 May) at 2:30pm. Their emails to us give a different date, so we are confirming it with them and will let you know as soon as it is confirmed. Please don't rely on the time until then. Any repair cost still needs the landlord's agreement, so the first visit will be to look at the oven. We will update you by 24 May. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit was booked with set_visit: the provider's date is contradictory.
- Provider's no-warranty claim is not verified.
- Nothing approves chargeable work or any spend.
- Landlord approval line at event 009 covered only the charge-free warranty route.

## Remaining work
- Provider to confirm visit date and warranty evidence (agency, follow-up 22 May)
- Landlord to decide on paid repair or own contractor (reply by 24 May; chase on a second channel if silent)
- Record the visit and result, then quote/invoice and close

## Missing or unavailable information
- Confirmed visit date/time
- Warranty end date and written confirmation
- Who the original installer was (Keystone Works vs Harbour Services)
- Referenced attachments unavailable

## Conflicts between sources
- Visit date: 22 May 2024 (call, event 018) vs 21 June (events 019/020, which also say 'tomorrow'); not booked until provider confirms.
- Installer: landlord says Keystone Works' contractor; agency note says Harbour Services.
- Event 014 says oven replaced March 2025, which is after today's date and conflicts with 'last year' in the tenant's report.
- Warranty: landlord believes in warranty, provider says not; provider claim unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, visit not reliably booked (22 May vs 21 June). Provider says out of warranty, so landlord approval is needed for any paid work. Outstanding: date confirmation, written warranty position, landlord decision.

**2. What is the next action, who is it for, and through which channel?**

Email Harbour Services to confirm the date and warranty and to diagnose and quote only. Email Felix (landlord) for the paid-repair decision. Email tenant Leo Bennett with a status update.

**3. Does anything need a human decision, and why?**

No human escalation. The paid-repair decision belongs to the landlord and has been requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say (their claim, not yet confirmed in writing… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-22","party":"Harbour Services","purpose":"Check provider has confirmed visit date/t… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
