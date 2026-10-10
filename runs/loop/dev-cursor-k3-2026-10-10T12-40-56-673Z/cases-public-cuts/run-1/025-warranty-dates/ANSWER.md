# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating; Harbour Services say it is out of warranty, which undercuts the landlord's free-service approval. Recorded the approval as conditional, asked the landlord for a decision, asked the provider to confirm the date and warranty evidence, and updated the tenant. No human decision needed yet.

## Where the case stands
Provider (Harbour Services) assigned, visit NOT booked (date conflict 22 May vs 21 June). Provider says oven out of warranty; landlord approval covered only a free warranty service. Held waiting for landlord, review 2024-05-23.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Felix whether Harbour Services should inspect/quote at his cost or he arranges his own contractor, and for warranty paperwork | Felix, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask Harbour Services to confirm the visit date and warranty status in writing, inspect/quote only | Harbour Services, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the visit is not yet confirmed and warranty/approval is being checked; next update by 23 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold until landlord decision, review 2024-05-23 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, not yet checked against purchase paperwork). You asked for a charge-free warranty service. Do you want Harbour Services to inspect and quote at your cost (nothing to be done without your approval of the quote), or would you prefer to arrange your own contractor? Please also send any warranty paperwork you hold, as records differ on who fitted the oven (Keystone Works vs Harbour Services) and when (our note says March 2025).
> 
> Options: Harbour Services inspect and quote; we come back to you for approval before any work; You arrange your own contractor; Ask Harbour Services to confirm warranty status in writing first

**A3 · request_information → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say the visit is tomorrow, 21st June, but the call with the tenant suggests tomorrow 22 May 2024 at 2:30pm. Which date and time is confirmed?
> - Please confirm in writing the oven's warranty status: purchase/install date and why it is out of warranty.
> - Please attend for inspection and quote only; do not start chargeable work until we confirm landlord approval.
> 
> Why: Appointment date conflict; landlord approval covered only a warranty (free) service.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, thanks for your patience. Harbour Services have told us they plan to visit about the oven, but we have two different dates from them (22 May at 2:30pm from your call, and 21 June in their emails), so please treat the visit as not yet confirmed. We're checking with them and will confirm the date. They also say the oven is out of warranty, so we are checking with the landlord how to proceed. You'll hear from us again by 23 May. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked via set_visit; dates are unconfirmed
- The warranty status is the provider's claim, not verified
- Landlord has not approved any chargeable work or spend
- Recording the conditional decision does not authorise a quote

## Remaining work
- Landlord to decide on chargeable inspection/quote or own contractor (agency chases after 23 May)
- Harbour Services to confirm date and warranty evidence
- Book visit once provider confirms a date; quote needs landlord approval

## Missing or unavailable information
- Confirmed visit date
- Warranty paperwork and installer identity/date
- Landlord spend limit (none on file)

## Conflicts between sources
- Installer: landlord says Keystone Works, internal note says Harbour Services
- Install date 'March 2025' is later than today and conflicts with 'last year'
- Visit date 22/05/2024 (call) vs 21 June (emails 019/020)
- System says 'landlord approval confirmed' but landlord's words only cover a warranty service; treated as conditional

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, visit unconfirmed (22 May 2:30pm per call vs '21 June' in emails). Provider says no warranty; landlord approval was only for free warranty service, so landlord decision on chargeable work is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Felix (landlord) asking for a decision; email to Harbour Services to confirm date and warranty status, inspect/quote only; email to Leo Bennett with status. Hold to 2024-05-23.

**3. Does anything need a human decision, and why?**

Not yet. The landlord's decision is theirs and has been requested; escalate only if he stays silent past the chase cadence or the records conflict can't be settled.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","evidence_quote":"Felix requests that the contractor used by Keystone Works … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say the oven is no longer under warranty (thei… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","question… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on chargeable inspection/quote … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |
| A6 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: landlord named Keystone Works as the oven installer, our note says Harbour Services; i… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
