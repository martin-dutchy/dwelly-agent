# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven reported not heating. Provider says out of warranty, which changes the landlord's charge-free instruction. I asked the landlord for a decision, asked the provider to confirm the conflicting visit date and to quote only, updated the tenant and held with a review date.

## Where the case stands
Provider assigned (Harbour Services), ticket on hold. Provider says oven is out of warranty. Landlord approval covers only a charge-free warranty service, not paid work. Visit date unconfirmed (22 May vs 21 June). Waiting on landlord and provider; review 2024-05-23.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve attend-and-quote (or use own contractor) now the oven is out of warranty | Felix, landlord | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask provider to confirm the visit date and warranty dates, and to diagnose and quote only | Harbour Services, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the date is being confirmed and the landlord is being consulted | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Hold with review date 2024-05-23 for landlord decision and provider date | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty, so a repair would be chargeable. Your earlier reply only asked for a charge-free warranty service. Do you approve Harbour Services attending to diagnose and quote (no work beyond that without your approval), or would you prefer to arrange your own contractor? Please also note we hold different details on who fitted the oven and when (Harbour Services vs Keystone Works), so please confirm if you have the original invoice or warranty paperwork.
> 
> Options: Approve Harbour Services to attend and quote; any repair comes back to you for approval (recommended); You arrange your own contractor; Send us the warranty paperwork if you believe it is still valid

**A2 · request_information → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Please confirm the exact date and time of the visit: your emails say 'tomorrow, 21st June' but tomorrow is 22 May, and the tenant call mentioned 2:30pm tomorrow.
> - Please confirm the warranty end date and the date you fitted the oven, as our records are unclear.
> - Please attend only to diagnose and quote for now. Do not carry out chargeable work until we confirm landlord approval.
> 
> Why: Visit date conflicts and the landlord has only asked for warranty (charge-free) work so far.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, thanks for your patience. Harbour Services have been in touch about your oven and mentioned a visit tomorrow afternoon, but their emails give conflicting dates, so we are confirming the exact date with them and will let you know once it is confirmed. They have said the oven is no longer under warranty, so we are checking with your landlord about next steps. Please don't pay anyone directly. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed.
- Landlord has not approved chargeable work; no quote or spend approved.
- Nothing establishes whether the warranty is actually expired; only the provider's statement.

## Remaining work
- Landlord decision on chargeable work or own contractor (agency, chase after 3 days)
- Provider to confirm visit date and warranty dates
- Quote approval loop if a repair is needed

## Missing or unavailable information
- Confirmed visit date
- Warranty end date and install date
- Landlord decision on paid work
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date: 22/05/2024 (event 018 call) vs 21/06/2024 (events 019, 020), both described as 'tomorrow'. Not booked.
- Oven fitter: landlord says Keystone Works' contractor; note says Harbour Services.
- Event 014 says replaced March 2025, which is after today's date; the tenant says last year. Unclear.
- Landlord email asked for charge-free warranty service, but approval stage shows 'confirmed'; I treated it as approval for warranty work only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, on hold. Oven reported out of warranty. Outstanding: landlord decision on paid work, confirmed visit date, quote if needed.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email to Felix; date and warranty confirmation request by email to Harbour Services; holding update by email to tenant Leo Bennett.

**3. Does anything need a human decision, and why?**

No human escalation. The decision on paid work belongs to the landlord and has been requested. Escalate only if the landlord stays silent past the chase cadence.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty, so a… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `request_information` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","question… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Oven out of warranty per provider; awaiting landlord decis… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
