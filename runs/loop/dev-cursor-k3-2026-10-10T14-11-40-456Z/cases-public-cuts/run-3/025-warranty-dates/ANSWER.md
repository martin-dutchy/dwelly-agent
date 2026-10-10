# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven is not heating. The landlord approved only a charge-free warranty service. Harbour Services now says the oven is out of warranty and gave conflicting visit dates. I recorded the conditional decision, asked the provider to confirm the date and warranty details, asked the landlord about a paid inspect-and-quote, told the tenant, and held until 23 May.

## Where the case stands
Stage mp_time, provider Harbour Services assigned, on hold (Waiting for Provider, review 23 May). Visit date unconfirmed. Provider says oven out of warranty; landlord's approval was only for a charge-free service, so a paid repair needs their approval, which has been requested.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Harbour Services to confirm the visit date (22 May vs 21 June) and warranty dates; diagnosis and quote only | Harbour Services, contractor | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask Felix to approve inspect-and-quote now that warranty is denied; reply by 24 May | Felix, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the visit is not confirmed and a paid repair needs landlord approval; next update by 23 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold until 23 May for provider and landlord replies | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Thanks for your emails. Two things please. 1) Your emails say the visit is "tomorrow, 21st June", but your call with the tenant said tomorrow (22 May) at 2:30pm. Please confirm the exact date and time. 2) You say the oven is no longer under warranty. Please tell us the install date and warranty end date you hold. The landlord only asked for a charge-free service, so please attend for diagnosis only and send a quote with photos before doing any chargeable work. We will need the landlord's approval first.

**A3 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty. Are you happy for them to inspect and quote for a paid repair, with no work until you approve the quote?
> 
> Options: Yes, inspect and quote (recommended); no work until you approve the quote; You arrange your own contractor; Ask Harbour Services to confirm the warranty dates in writing first
> 
> Update: Harbour Services (reported as the installer) have told us by email that the oven is no longer under warranty. That is their claim and we have asked for the install and warranty dates. Our earlier note said it was replaced in March 2025, which cannot be right as that is in the future, so we are checking the date. The visit is not yet confirmed: their emails say 21 June but their call with the tenant said 22 May at 2:30pm. We have asked them to confirm. Please reply by 24 May.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, Harbour Services told you on the phone about a visit tomorrow (22 May) at 2:30pm, but their emails to us say 21 June. Sorry for the confusion. We have asked them to confirm the date, so please don't treat it as booked until we write again. They have also told us the oven may not be under warranty, so we are checking with the landlord before any paid work. We will update you by 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked in the system; the date is unconfirmed.
- The warranty status is Harbour Services' claim, not verified.
- No spend is approved; a paid repair needs landlord approval of a quote.

## Remaining work
- Provider to confirm date and warranty dates (agency, review 23 May)
- Landlord to decide on paid inspect-and-quote (by 24 May)
- Then set_visit once the provider confirms, record quote, and seek approval

## Missing or unavailable information
- Confirmed visit date
- Warranty start and end dates
- Which contractor installed the oven (Keystone Works vs Harbour Services)
- Landlord spend limit (none on file)

## Conflicts between sources
- Visit date: call event 018 says 22 May 2:30pm; emails 019/020 say 'tomorrow, 21st June'.
- Landlord names Keystone Works as installer; record says Harbour Services.
- Landlord email says replaced March 2025, a future date; the tenant says last year.
- Landlord says oven should be under warranty; provider says it is not.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, visit unconfirmed (22 May per call, 21 June per emails). Warranty denied by the provider. The landlord's approval covered only a charge-free fix, so a paid repair needs fresh approval.

**2. What is the next action, who is it for, and through which channel?**

Email Harbour Services to confirm date and warranty dates; email the landlord for approval to inspect and quote; email the tenant that the visit is unconfirmed. All sent.

**3. Does anything need a human decision, and why?**

No escalation. The landlord decides on paid work, and that is already requested. A human is needed only if the date or warranty conflict stays unresolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Only as a charge-free warranty service by the original install… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty. Are … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting Harbour Services' confirmed visit date (22 May vs… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
