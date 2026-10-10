# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider reports the oven is out of warranty, and the landlord had only asked for a warranty-covered service. I asked the landlord for a decision on paid work, asked the provider to confirm the conflicting visit date and quote only, updated the tenant, and held to 24 May.

## Where the case stands
Provider assigned (Harbour Services), visit date unconfirmed (conflict), provider says oven out of warranty. Landlord's only reply asked for a warranty-covered service, not paid work; new approval requested. On hold until 2024-05-24.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Felix whether Harbour should inspect and quote (no work until quote approved) or he arranges his own contractor; confirm who installed the oven | Felix, landlord | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask Harbour to confirm visit date (22 May vs 21 June), inspect and quote only, and send warranty paperwork | Harbour Services, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the date is being confirmed, no chargeable work without landlord approval, next update by 24 May | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Hold until 2024-05-24 for landlord decision and provider date confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say (their claim, not yet checked) the oven is no longer under warranty, so there would be a charge. Do you want us to have Harbour Services inspect and quote, with no work done until you approve the quote, or would you rather arrange your own contractor? Please also confirm who fitted the oven: your note says Keystone Works, our records say Harbour Services.
> 
> Options: Yes, Harbour Services to inspect and quote; no work until you approve the quote (recommended); You arrange your own contractor; Ask the installer again about warranty before anything else

**A2 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Thanks for confirming the warranty position. Two points please: 1) Your emails give the visit as "tomorrow, 21st June", but your call with the tenant set it for tomorrow, 22 May 2024 at 2:30pm. Please confirm the correct date and time. 2) Please attend to inspect and provide a quote only, with photos and the model/serial number. Do not carry out chargeable work until we confirm landlord approval. Could you also send the date and paperwork from the original oven installation that shows the warranty end date?

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, Harbour Services say they spoke to you about a visit tomorrow (22 May) at 2:30pm, but their email gives a different date, so we are confirming the exact date with them and will let you know. The visit is to look at the oven and quote if needed. The provider has said the oven is not under warranty; we are checking with the landlord about next steps and no chargeable work will go ahead without their approval. You will hear from us by 24 May at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked via set_visit: the date is unconfirmed
- Landlord approval for paid work is not established
- Warranty status is only the provider's claim and is unverified
- Nothing here establishes who installed the oven

## Remaining work
- Landlord decision (agency, review 2024-05-24)
- Provider to confirm visit date and give quote (Harbour)
- Record quote, get landlord approval before any work

## Missing or unavailable information
- Confirmed visit date
- Who installed the oven and warranty end date
- Landlord spend limit/approval for paid work
- Attachments at events 003 and 013 unavailable

## Conflicts between sources
- Visit date 22/05 (call) vs 21/06 (provider emails)
- Installer Keystone Works (landlord) vs Harbour Services (notes)
- Install date March 2025 in a 2024 case
- System says approval confirmed but landlord only asked for warranty service

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Harbour Services assigned; visit date conflicting (22 May vs 21 June); provider says no warranty; landlord decision on paid work outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Felix by email; date confirmation request to Harbour by email; tenant update by email.

**3. Does anything need a human decision, and why?**

No escalation. The landlord's decision is requested and held with a review date; a human only if he stays silent past review.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services say (their claim, not yet checked) the oven is… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","body":"T… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on paid repair/own contractor, … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: landlord says installer Keystone Works, notes say Harbour Services; install dated Marc… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
