# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating. The landlord asked only for a charge-free warranty service, and Harbour Services now says the oven is out of warranty. I recorded the landlord's conditional decision, asked the landlord about a paid repair, asked the provider to confirm the visit date and warranty details, updated the tenant, and set a hold and follow-up for 24 May.

## Where the case stands
Provider (Harbour Services) assigned, ticket on hold to 2024-05-24. Visit date not booked: conflicting dates. Provider says oven out of warranty; landlord only approved a charge-free warranty service, so paid work is unapproved.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Felix whether Harbour Services may inspect and quote for a paid repair, or he arranges his own contractor | Felix, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask Harbour Services to confirm exact visit date/time and replacement/warranty dates, and not to do chargeable work without an approved quote | Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the visit date is not yet confirmed, no paid work without landlord approval, next update by 24 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold and follow-up to 2024-05-24 for provider and landlord replies | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services says the oven is no longer under warranty (their statement, not yet verified; our records also disagree on when it was replaced). Do you want Harbour Services to inspect and quote for a paid repair, or will you arrange your own contractor? Any quote will come to you before work starts.
> 
> Options: Harbour Services inspect and send a quote for your approval (recommended); You arrange your own contractor; Ask Harbour Services for proof of the warranty position first

**A3 · request_information → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Please confirm the exact visit date and time: your emails say 'tomorrow, 21st June' but the call with the tenant suggests 22 May at 2:30pm.
> - Please confirm the date the oven was replaced and the warranty period, as our notes disagree.
> - Please do not carry out chargeable work: if repair is needed, send a quote with photos and estimated completion time for landlord approval first.
> 
> Why: Visit date is ambiguous so it cannot be booked; warranty has ended per provider and landlord has not approved paid work.

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Dear Leo,
> 
> Thanks for your patience. Harbour Services have told us they spoke with you about a visit, but their emails give conflicting dates (tomorrow 22 May at 2:30pm, or 21 June), so we are confirming the exact date with them and it is not yet confirmed from our side. They also say the oven is no longer under warranty, so we are checking with the landlord about the next step; the visit is to look at the oven and quote if needed, and no paid work will go ahead without landlord approval. We will update you by 24 May at the latest.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit was booked via set_visit; the date is unconfirmed.
- The warranty ending is the provider's claim, not verified.
- The landlord has not approved any paid spend.
- Nothing here establishes the cause of the fault or who pays.

## Remaining work
- Provider to confirm visit date and warranty/replacement dates (agency chases by 24 May)
- Landlord decision on paid repair (APR-101)
- Quote loop if repair needed; then visit, result, invoice, close

## Missing or unavailable information
- Exact visit date/time confirmed by provider
- Oven replacement date and warranty terms
- Landlord decision on paid repair
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date: call says 22/05/2024 2:30pm (event 018); provider emails say 'tomorrow, 21st June' (events 019, 020). Not booked until the provider confirms.
- Replacement date: agency email says March 2025 (event 014), which is after today; tenant says 'last year'.
- Landlord's message names Keystone Works as the replacement contractor; agency notes say Harbour Services.
- The system shows 'landlord approval confirmed', but the landlord only asked for a warranty service.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned. The visit date is conflicting (22 May 2:30pm per the call, 21 June per the emails) and so unconfirmed. The oven is reportedly out of warranty. Landlord approval for paid work is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking for a decision on a paid repair or quote. Email to Harbour Services to confirm the date and warranty details. Email update to the tenant. Follow-up on 24 May.

**3. Does anything need a human decision, and why?**

No escalation. The landlord decides on spend, and that has been requested. Escalate only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Authorises contacting the previous oven contractor for a charg… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services says the oven is no longer under warranty (the… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","question… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","ticket_ref":"NBL-025-warranty-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-24","party":"Harbour Services / landlord","purpose":"Chase visit date confirmation … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Warranty reportedly ended; awaiting landlord decision on p… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
