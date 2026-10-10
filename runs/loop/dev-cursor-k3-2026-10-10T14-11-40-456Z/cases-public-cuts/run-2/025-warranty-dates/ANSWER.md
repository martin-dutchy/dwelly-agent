# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Warranty was the landlord's condition for a free visit; the provider now says it has lapsed, so chargeable work needs fresh landlord approval, which I requested. I asked the provider to confirm the conflicting visit dates and give warranty evidence, told the tenant the visit is unconfirmed, recorded the conditional decision and put the ticket on hold to 23 May.

## Where the case stands
Provider assigned (Harbour Services), ticket on hold waiting for landlord. Landlord only approved a charge-free warranty visit; provider says no warranty. Visit date unconfirmed (22 May 2:30pm per call vs 21 June per emails). Review 2024-05-23.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Felix whether to approve Harbour Services to inspect/quote at his cost, or use his own contractor; reply by 24 May | Felix, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask Harbour Services to confirm the real visit date, supply warranty evidence, and not start chargeable work without approval | Clara, Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the visit date is unconfirmed, warranty is being checked, next update by 23 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold with review date 23 May for landlord decision and provider reply | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty. Do you approve them inspecting and quoting for the repair at your cost (quote to come back to you before any work), or would you prefer to arrange your own contractor?
> 
> Options: Approve Harbour Services to inspect and quote; quote returns to you for approval before work (recommended); You arrange your own contractor; Ask Harbour Services to evidence the warranty position first
> 
> Update: Your request was for a charge-free warranty visit. Harbour Services' email of 21 May says the oven is no longer under warranty; we are asking them for the warranty evidence. Records conflict on who fitted the oven (you named Keystone Works; our notes say Harbour Services) and when (our earlier message said March 2025, which cannot be right). Visit date is not confirmed: the provider's emails say 21 June, but the call summary says tomorrow 22 May 2:30pm; we are clarifying. Please reply by 24 May 2024.

**A3 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Which date and time is the visit actually booked for: 22 May 2:30pm (as discussed on the call) or 21 June (as in your emails)?
> - Please send the warranty evidence: who fitted the oven, install date and warranty end date.
> - Please do not start any chargeable work; send a quote first and wait for our approval.
> 
> Why: Dates conflict and the landlord only approved a charge-free warranty visit.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, thanks for your patience. Harbour Services have been in touch about your oven. On your call they mentioned a visit tomorrow (22 May) at 2:30pm, but their emails say 21 June, so we are confirming the real date with them. Please treat the visit as not yet confirmed. The provider has also said the oven is no longer under warranty, so we are checking this with them and with your landlord before any paid work. We will update you by 23 May at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit was booked via set_visit; date unconfirmed
- Landlord has not approved any chargeable spend
- Warranty status is the provider's claim, not verified
- Nothing yet establishes who fitted the oven or when

## Remaining work
- Landlord to decide on chargeable route or own contractor (agency chases after 24 May)
- Provider to confirm visit date and warranty evidence
- Quote, if any, to go to landlord before work
- Tenant update by 23 May

## Missing or unavailable information
- Actual visit date
- Warranty evidence, installer and install date
- Landlord decision on chargeable repair

## Conflicts between sources
- Installer: Keystone Works (landlord email) vs Harbour Services (notes)
- Install date: 'last year' vs 'March 2025' in event 014 (impossible)
- Visit date: 22 May 2:30pm (call) vs 21 June (emails saying 'tomorrow')
- Event 009 'landlord approval confirmed' vs landlord only asking for a charge-free warranty visit; trusted the landlord's own words

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, on hold. Outstanding: landlord decision on paying for the repair now warranty is denied, a confirmed visit date, and warranty evidence.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Felix by email (A2); information request to Harbour Services by email (A3); tenant update by email (A4).

**3. Does anything need a human decision, and why?**

No escalation needed. The landlord, not a human at the agency, must decide on chargeable work; if he is silent after 24 May, chase on a second channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"R-4815","decision":"conditional","conditions":"Contractor who fitted the oven to attend charge-free under warranty only. No a… | 1 | ❌ failed | Ticket R-4815 not found on read-back |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"R-4815","decision_needed":"Harbour Services say the oven is no longer under warranty. Do you approve them … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"R-48… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `add_note` | {"entity":"R-4815","note":"Conflicts: installer named Keystone Works (landlord) vs Harbour Services (notes); install date \"last year\" vs \… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `put_on_hold` | {"ticket_ref":"R-4815","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on chargeable repair now warranty denied, and p… | 1 | ❌ failed | Ticket R-4815 not found on read-back |
| A7 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Charge-free warranty service only. No approval for chargeable … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A8 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on chargeable repair now warran… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A1: Used a wrong ticket ref; retried with NBL-025-warranty-dates as A7, verified
- A6: Wrong ticket ref; retried with the correct ref as A8, verified
