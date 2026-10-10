# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord only authorised a free warranty service; the provider says the oven is out of warranty and gave conflicting visit dates. I recorded the conditional decision, asked the provider to confirm the date, asked the landlord for a decision on a paid inspection/quote, updated the tenant and set a hold until 23 May.

## Where the case stands
Provider assigned (Harbour Services), ticket on hold (review 2024-05-23). Landlord's only authority was a charge-free warranty service; provider says out of warranty, so paid work is not approved. Visit date unconfirmed (22/05 vs 21/06).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether Harbour Services may inspect and quote now warranty is denied, or whether he will use his own contractor; also which firm fitted the oven | Felix, landlord | email | A3 ✅ |
| 2 | CHASE_PROVIDER | Ask provider to confirm exact visit date (22 May vs 21 June), warranty details, and not to start chargeable work without an approved quote | Harbour Services, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit date is not yet confirmed, warranty is in question, next update by 23 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold until 2024-05-23 for landlord reply and provider date confirmation | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Hello, thanks for your emails. Two points please. 1) Your emails say the visit is "tomorrow, 21st June", but tomorrow is 22 May and the tenant was told 22 May at 2:30pm on your call. Please confirm the exact date and time. 2) You say the oven is out of warranty: please confirm when it was fitted and the warranty end date. Please do not carry out chargeable work. If it needs repair, send a quote (with photos) after the inspection and we will get landlord approval first.

**A3 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, not yet checked). Do you approve Harbour Services inspecting it and sending a quote for repair, which we would bring back to you for approval before any work? Or would you prefer to arrange your own contractor? Please also confirm which firm fitted the oven, as your note named Keystone Works but our records show Harbour Services.
> 
> Options: Yes, Harbour Services to inspect and quote; quote comes back to you for approval; I will arrange my own contractor; Other instruction

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Dear Leo, Harbour Services told you on the phone they would visit tomorrow (22 May) at 2:30pm, but their emails to us give a different date (21 June). We're confirming the right date with them and will tell you as soon as it's confirmed. Please don't treat the visit as booked until then. They have also said the oven may be out of warranty, so we're checking with the landlord about next steps. You'll hear from us by 23 May at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed.
- The out-of-warranty claim is the provider's and unchecked.
- No spend or contractor work approved; nothing establishes cause or who pays.

## Remaining work
- Landlord decision on paid inspection/quote or own contractor (agency chases after review date)
- Provider to confirm visit date and warranty facts
- Record quote and obtain landlord approval if repair needed

## Missing or unavailable information
- Confirmed visit date
- Warranty end date and fitting date
- Landlord spend limit (none on file)
- Referenced PDF attachments unavailable

## Conflicts between sources
- Visit date: 22/05/2024 (call, event 018) vs 21/06/2024 (emails, events 019-020); treated as unconfirmed.
- Landlord names Keystone Works as the fitter, but the agency note says Harbour Services; asked the landlord.
- Event 014 says the oven was replaced in March 2025, which is after today (2024); the warranty dates are unreliable.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but visit unconfirmed, and no paid work is authorised because landlord approval covered only a warranty repair. Outstanding: the landlord's decision, the visit date and the warranty facts.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email to Felix (A3), date/warranty confirmation request by email to Harbour Services (A2), tenant update by email (A4).

**3. Does anything need a human decision, and why?**

No human escalation. The decision on paid work belongs to the landlord and has been requested; it is not an agency-human matter.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Only a charge-free warranty service. Provider now says the ove… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty (thei… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","ticket_ref":"NBL-025-warranty-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on paid inspection/quote now wa… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
