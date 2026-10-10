# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating; Harbour Services assigned, but visit date conflicts (22 May per call vs '21 June' in emails) and they claim out of warranty without install date or terms. Asked provider to clarify, updated tenant and landlord, added note and a dated hold.

## Where the case stands
Provider assigned (Harbour Services), on hold waiting for provider, review 2024-05-22. Visit date unconfirmed; warranty status unverified; no spend approved.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour Services to confirm the exact visit date/time and give the oven install date and warranty terms; no chargeable work without approval | Clara, Harbour Services, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the visit date is unconfirmed (22 May vs 21 June) and when they will next hear | Leo Bennett, tenant | email | A2 ✅ |
| 3 | OTHER | Update landlord: provider claims out of warranty (being checked), Keystone vs Harbour question, any charge returns for approval | Felix, landlord | email | A3 ✅ |
| 4 | WAIT | Hold until 22 May for provider reply | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Clara, Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Which date is the visit: your call with the tenant said tomorrow (22 May) at 2:30pm, but your emails say 'tomorrow, 21st June'? Please confirm the exact date and time.
> - You say the oven is out of warranty: what was the install date and what are the warranty terms (length, parts/labour)? Our records say it was replaced last year, but our note says March 2025, so please confirm the date.
> - Please do not carry out chargeable work without a written quote and our approval first.
> 
> Why: Visit date conflicts and warranty claim needs install date and terms before we accept it; landlord expects a charge-free warranty service.

**A2 · send_message → Leo Bennett (tenant) via email, tenant email on file (event 012)** (verified)

> Dear Leo, Harbour Services have told us they spoke to you about visiting tomorrow (22 May) at 2:30pm, but their emails give a different date (21 June). We have asked them to confirm the exact date, so please treat the visit as not yet confirmed until you hear from us. If you can, tell us roughly when the oven was replaced. We will update you by 22 May. Kind regards, Northbridge Lettings

**A3 · send_message → Felix (landlord) via email, agency landlord record** (verified)

> Dear Felix, an update on the oven at Flat 2, 176 Lantern Quay. Harbour Services say the oven is no longer under warranty. That is their claim and we are checking it: we have asked for the install date and warranty terms. Your note mentioned Keystone Works, but our record shows Harbour Services replaced the oven, so please tell us if Keystone Works was involved. The visit date is also being confirmed with them. If there is a charge, we will come back to you for approval before any work starts. We will update you by 22 May. Kind regards

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed.
- Warranty status is not established; the provider's out-of-warranty claim is unverified.
- Landlord has not approved any chargeable work.

## Remaining work
- Provider to confirm visit date and warranty details (agency, review 22 May)
- Landlord decision on any quote if out of warranty
- Record visit once provider confirms

## Missing or unavailable information
- Actual visit date
- Oven install date and warranty terms
- Who fitted the oven: Keystone Works or Harbour Services

## Conflicts between sources
- Landlord says Keystone Works fitted the oven; notes say Harbour Services.
- Install date: tenant 'last year' vs note 'March 2025' (after today).
- Visit: 22 May 2:30pm (call, event 018) vs '21st June' described as tomorrow (events 019, 020).
- Landlord expects warranty cover; provider says out of warranty.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned and on hold. Outstanding: confirmed visit date, warranty install date and terms, landlord decision on any charge.

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour Services asking for visit date confirmation and warranty details; updates sent to tenant and landlord by email.

**3. Does anything need a human decision, and why?**

No. Routine clarification is under way; the landlord decides on any quote if it proves chargeable.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 012)","body":"Dear Leo, H… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Dear Felix, an update on … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"ticket Flat 2, 176 Lantern Quay oven","note":"Conflicts: landlord says Keystone Works fitted oven, notes say Harbour Services. In… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"Flat 2, 176 Lantern Quay oven","reason":"Waiting for Provider","comment":"Awaiting provider confirmation of visit date and wa… | 1 | ❌ failed | Ticket Flat 2, 176 Lantern Quay oven not found on read-back |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting Harbour Services: confirmed visit date (22 May vs… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |
| A7 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: landlord says Keystone Works fitted oven, notes say Harbour Services. Install date: te… | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
- A5: Hold used wrong ticket ref; retried with NBL-025-warranty-dates and verified (A6). A4 note was on a non-ticket entity; repeated on ticket as A7.
