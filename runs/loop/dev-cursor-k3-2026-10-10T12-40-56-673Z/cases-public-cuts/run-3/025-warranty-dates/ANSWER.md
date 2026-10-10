# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approved only a free warranty service; Harbour Services now says the oven is out of warranty and gave conflicting visit dates. I recorded the conditional approval, asked the landlord for a decision on a paid inspection/quote, asked the provider to confirm the date and quote only, updated the tenant, and held with a review date.

## Where the case stands
Provider (Harbour Services) assigned, ticket on hold. Landlord approval covered only a charge-free warranty service; provider now says no warranty, so no spend approved. Visit date unconfirmed (22 May 2:30pm per call vs "21 June" per emails). Waiting on landlord and provider; review 2024-05-24.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether Harbour Services may inspect/quote at his cost now warranty is claimed void, and which firm fitted the oven | Felix, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider to confirm the visit date (22 May vs 21 June), warranty details, and to quote only without chargeable work | Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant visit date is not yet confirmed, warranty status being checked, next update by 24 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold awaiting landlord and provider; review 2024-05-24 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, not yet checked). Your approval was for a charge-free warranty visit only. Do you approve Harbour Services inspecting and quoting for the oven repair at your cost? Any quote will come to you before work starts. Please also confirm which firm fitted the oven, as records show both Harbour Services and Keystone Works.
> 
> Options: Yes, Harbour Services may inspect and quote (recommended); I will arrange my own contractor; Tenant to arrange it themselves

**A3 · request_information → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say the visit is 'tomorrow, 21st June', but your call with the tenant booked tomorrow 22 May at 2:30pm. Which date is correct?
> - Please confirm the oven replacement date and warranty end date you checked.
> - Please do not carry out any chargeable work: inspect and send a quote only, until the landlord approves.
> 
> Why: Visit date is inconsistent and the landlord has only approved a warranty (free) repair.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, thanks for your patience. Harbour Services say they have arranged a visit with you for tomorrow at 2:30pm, but their emails give a different date (21 June), so we are confirming the exact date with them and it is not yet confirmed from our side. They also say the oven is no longer under warranty, so we are checking with your landlord who pays for any repair. We will update you by 24 May. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked via set_visit; the date is unconfirmed.
- Warranty status is the provider's claim, not verified.
- No spend or paid repair approved; nothing here decides who pays.

## Remaining work
- Landlord to decide on paid repair/own contractor (agency chases by 2024-05-24)
- Provider to confirm visit date and warranty facts
- Quote, if any, to go to landlord before work
- Book visit once provider confirms

## Missing or unavailable information
- Confirmed visit date
- Which firm fitted the oven and the date (Keystone Works vs Harbour Services; March 2025 is impossible)
- Landlord spend limit (none on file)
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Landlord names Keystone Works as oven fitter; agency note says Harbour Services.
- Event 014 says replaced March 2025, which is after today and contradicts 'last year'.
- Visit date: 22/05/2024 2:30pm (call, event 018) vs 21 June (emails 019/020); neither provider email is trusted until clarified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, on hold. Warranty route failed per provider; landlord has not approved paid work; visit date unconfirmed (22 May vs 21 June).

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Felix (email), date/warranty confirmation request to Harbour Services (email), tenant update (email); review 24 May.

**3. Does anything need a human decision, and why?**

Not an escalation: the decision is the landlord's and has been requested. No human escalation needed now.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty (thei… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","question… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on paid repair (warranty claim … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |
| A6 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: landlord names Keystone Works as oven fitter; note 007 says Harbour Services; event 01… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
