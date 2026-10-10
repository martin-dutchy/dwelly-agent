# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider says oven is out of warranty and gave conflicting visit dates. I asked the landlord to decide on a chargeable diagnosis, asked the provider to confirm the date and warranty basis, updated the tenant, and held to 24 May.

## Where the case stands
Provider assigned (Harbour Services), on hold awaiting landlord decision on chargeable work and provider confirmation of visit date. Visit not booked. Review 2024-05-24.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve diagnose-and-quote visit (repairs need quote approval) now the oven is said to be out of warranty, and clarify which firm fitted it | Felix, landlord | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask Harbour Services to confirm visit date (22 May vs 21 June), evidence of out-of-warranty, and diagnose/quote only | Harbour Services, contractor | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Tell tenant the visit time is not yet confirmed, warranty/cost being checked, next update by 24 May | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Hold until 2024-05-24 for landlord and provider replies | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services have told us the oven is no longer under warranty (their statement, not yet checked). You asked for a charge-free service only. Do you approve Harbour Services attending to diagnose and quote, with any repair cost coming back to you for approval before work starts? Please also confirm which firm fitted the oven: you named Keystone Works, but our notes show Harbour Services. Please ignore the "March 2025" date in our earlier email, as that was an error. The fit date is unconfirmed (tenant says sometime last year). Reply by 2024-05-24.
> 
> Options: Yes: Harbour Services attend to diagnose and quote; no repair work until you approve the quote (recommended); You arrange your own contractor (please give name and date); Check warranty paperwork first: please send any invoice or warranty document you hold

**A2 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Thank you for the update. Two things please: 1) Your emails say the visit is "tomorrow, 21st June", but tomorrow is 22 May and the tenant was told 22 May at 2:30pm on your call. Please confirm the exact date and time. 2) Please confirm in writing how you established the oven is out of warranty (fit date and warranty term). As it is out of warranty, please only diagnose on the visit and send us a quote; do not start chargeable work until we confirm landlord approval. Please reply by tomorrow morning.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, thanks for speaking to Harbour Services. They mentioned a visit tomorrow (22 May) at 2:30pm, but their email to us gives a different date, so we are asking them to confirm. Please treat the time as not yet confirmed; we will write once they confirm. Harbour Services say the oven is out of warranty, so we are checking with your landlord before any repair work. Any cost would need landlord approval first. We will update you by 24 May at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms a visit date or booking
- Out-of-warranty status is the provider's claim, unverified
- Landlord's approval covered only a charge-free warranty service, not paid work
- No cost approved

## Remaining work
- Landlord to decide on chargeable diagnosis/own contractor (agency chases by 24 May)
- Harbour Services to confirm visit date and warranty evidence
- Then set_visit if confirmed, quote loop if needed

## Missing or unavailable information
- Confirmed visit date
- Which firm fitted the oven and when; warranty terms
- Referenced PDF attachments unavailable (events 003, 013)

## Conflicts between sources
- Keystone Works (landlord) vs Harbour Services (agency note) as the firm that fitted the oven
- Event 014 says March 2025, which is after today's date
- Visit date 22/05/2024 (call) vs 21/06 (provider emails saying 'tomorrow')

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Harbour Services is assigned and says the oven is out of warranty. The visit date is unconfirmed (22 May per call; 21 June per emails). The landlord has only approved a free warranty service, so there is no approval for paid work. Which firm fitted the oven is also disputed.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord for a decision on diagnose-and-quote, email the provider to confirm date and warranty evidence, and email the tenant that the time is unconfirmed. All sent.

**3. Does anything need a human decision, and why?**

No escalation. The spend decision belongs to the landlord and has been requested; the rest is routine.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services have told us the oven is no longer under warra… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","body":"T… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: landlord (ev006) says Keystone Works replaced oven; note ev007 says Harbour Services. … | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on chargeable diagnosis/quote (… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
_None._
