# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider reported the oven is out of warranty, which falls outside the landlord's charge-free-only request. I recorded that decision as conditional, asked the landlord how to proceed, asked the provider to confirm the date and quote only, told the tenant, and held the ticket for review on 23 May.

## Where the case stands
Provider (Harbour Services) assigned, ticket on hold. Provider says oven is out of warranty. Landlord's approval only covered a charge-free warranty service, so chargeable work is not authorised. Visit date unconfirmed (22 May vs 21 June). Waiting on landlord and provider; review 2024-05-23.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Felix whether Harbour Services should inspect and quote (approval needed before any work) or he will use his own contractor; also confirm install date | Felix, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask Harbour Services to confirm the correct visit date, to inspect and quote only, and to confirm install and warranty dates | Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the date is not yet confirmed, warranty has ended and landlord approval is pending | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold until 2024-05-23 for landlord decision and provider date | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty. Do you want them to inspect and quote for the repair (any work to be approved by you first), or would you prefer to arrange your own contractor? Please also confirm the oven installation date, as our notes say March 2025 but the tenant says last year.
> 
> Options: Yes, Harbour Services to inspect and send a quote for your approval before any work; I will arrange my own contractor

**A3 · request_information → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say tomorrow, 21st June, but the call with the tenant said tomorrow 22 May at 2:30pm. Which date is correct?
> - As the oven is out of warranty, please inspect and send a quote only. Do not start chargeable work until we confirm landlord approval.
> - Can you confirm the date the oven was installed and the warranty end date?
> 
> Why: Visit date conflicts and landlord approval covered only a free warranty service.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, thanks for your patience. Harbour Services have said they will visit about the oven, but we are still confirming the date with them (we have 22 May at 2:30pm from your call, but their email says 21 June). We'll confirm as soon as they reply. The oven is no longer under warranty, so we are checking with the landlord how to proceed with any repair. Any work will need the landlord's approval first. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed.
- No spend or quote approved; nothing here authorises chargeable work.
- Warranty status is the provider's statement only, with no document seen.

## Remaining work
- Landlord decision on chargeable repair or own contractor (agency, chase after 3 days)
- Provider to confirm visit date and warranty details; then set_visit
- Quote handling if one arrives

## Missing or unavailable information
- Confirmed visit date
- Spend limit not on file
- Oven install date and warranty end date
- Referenced attachments unavailable

## Conflicts between sources
- Visit date: 22/05/2024 (call, event 018) vs 21/06/2024 (emails, events 019-020); not treated as booked.
- Install date: agency note says March 2025 (event 014), which is in the future; the tenant says last year; the landlord names Keystone Works while records name Harbour Services.
- System says landlord approval confirmed (event 009) but the landlord's words only asked for a free warranty service.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but the visit is not confirmed: the call says 22 May 2:30pm, the emails say 21 June. The warranty has ended per the provider, so landlord approval for chargeable work is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email to Felix; date and scope clarification by email to Harbour Services; status update by email to Leo Bennett. All sent.

**3. Does anything need a human decision, and why?**

No human escalation is needed. The decision on paying for the repair is the landlord's, and it has been requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Only a charge-free warranty service by the original installer.… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty. Do y… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","question… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on chargeable repair/own contra… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
