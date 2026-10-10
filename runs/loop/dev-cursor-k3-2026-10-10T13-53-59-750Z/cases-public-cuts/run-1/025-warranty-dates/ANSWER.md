# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider says the oven is out of warranty and its visit date is inconsistent. I asked the provider to confirm the date and fit details. I asked the landlord to decide on chargeable work, updated the tenant, recorded the conditional approval and set a hold to 24 May.

## Where the case stands
Provider (Harbour Services) assigned, stage mp_time. Visit NOT booked: the call says 22 May 2:30pm, the emails say "21st June". The provider says the oven is out of warranty. Landlord approval covered charge-free service only. On hold, review 2024-05-24.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services to confirm the exact visit date/time and warranty/fit date, and to quote before any chargeable work | Harbour Services, contractor | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Tell the landlord the oven is reported out of warranty and ask whether Harbour should attend and quote, or he will use his own contractor, by 24 May | Felix, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell the tenant the visit date is unconfirmed, the warranty is being checked, and when they will next hear from us | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold until 24 May for the landlord's decision and the provider's confirmation | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say 'tomorrow, 21st June' but today is 21 May and the call with the tenant said tomorrow 2:30pm. Is the visit Wednesday 22 May 2024 at 2:30pm? Please confirm the exact date and time.
> - Please confirm the oven is out of warranty: what date did you fit it (our notes conflict, and the landlord named Keystone Works)?
> - If there is a charge for the visit or repair, please send a quote and do not start work until we confirm approval.
> 
> Why: Visit date is inconsistent and cannot be booked until the provider confirms; warranty status changes who pays.

**A3 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty, so a repair would be chargeable. Do you want us to let them attend and quote (no work until you approve), or will you arrange your own contractor? Please reply by 24 May 2024.
> 
> Options: Harbour Services attend and quote; no work without your approval (recommended); You arrange your own contractor; Tenant not to be offered a repair

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Dear Leo, Harbour Services have spoken to you about a visit tomorrow (22 May) at 2:30pm, but their email gives a different date, so I'm confirming with them and will let you know once it's confirmed. Please don't rely on the time until then. They've also said the oven may not be under warranty, so I'm checking with the landlord about any repair cost. You'll hear from us by 24 May at the latest. Sorry for the confusion.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked in the system; set_visit was not used because the provider's date is inconsistent.
- The warranty status is only the provider's claim.
- The landlord has not approved any chargeable work.
- No human decision is needed yet.

## Remaining work
- Provider to confirm the visit date/time and the fit date.
- Landlord to decide on a chargeable repair or his own contractor.
- Book the visit with set_visit once the provider confirms.
- Review on 2024-05-24.

## Missing or unavailable information
- Confirmed visit date.
- Who fitted the oven, and when (Keystone Works or Harbour Services; March 2025 is impossible).
- The attachments referenced at events 003 and 013 were unavailable.

## Conflicts between sources
- Landlord names Keystone Works as the fitter; the agency note says Harbour Services.
- Event 014 says replaced March 2025, but the tenant says last year and today is May 2024.
- Visit date: 22 May (call) vs '21st June' (emails). The record is treated as unconfirmed.
- The landlord expected warranty cover; the provider says there is none.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A provider is assigned but the visit is unconfirmed (22 May per the call vs '21 June' in emails). The oven is reported out of warranty, so the landlord's charge-free approval no longer covers the work. Outstanding: the provider's confirmation, the landlord's decision, and the visit booking.

**2. What is the next action, who is it for, and through which channel?**

Email Harbour Services to confirm the date and fit details; email the landlord Felix for a decision by 24 May; the tenant Leo has been told the date is unconfirmed. Hold until 24 May.

**3. Does anything need a human decision, and why?**

Not yet. The landlord must decide on spend, which is routine, and no escalation trigger is met.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works for the oven re… | 1 | ❌ failed | Ticket NBL-025 not found on read-back |
| A2 | `request_information` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","question… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Felix","decision_needed":"Harbour Services say the oven is no longer under warranty, so a repair would be chargeable. Do you wa… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","ticket_ref":"NBL-025","body":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `add_note` | {"entity":"NBL-025","note":"Conflicts: landlord names Keystone Works as the fitter; agency note says Harbour Services; event 014 says replac… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-025","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on chargeable repair and provider confirmation… | 1 | ❌ failed | Ticket NBL-025 not found on read-back |
| A7 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A8 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on chargeable repair and provid… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A1: I used a wrong ticket ref. I retried with the correct ref and it verified as A7.
- A6: I used a wrong ticket ref. I retried with the correct ref and it verified as A8.
