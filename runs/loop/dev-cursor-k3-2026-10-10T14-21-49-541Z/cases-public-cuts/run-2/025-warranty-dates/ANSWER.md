# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating; Harbour Services assigned. Provider claims out of warranty and gave conflicting visit dates. Recorded landlord's conditional (charge-free only) decision, asked provider for date and warranty evidence, updated tenant and landlord, held to 23 May.

## Where the case stands
Stage mp_time: Harbour Services assigned, on hold (Waiting for Provider) to 2024-05-23. Visit NOT confirmed: date conflict. Warranty status disputed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Harbour Services to confirm exact visit date/time, give install date and warranty terms, and not to do chargeable work without approval | Harbour Services (Clara), contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant visit is unconfirmed, warranty being checked, ask if waiting is acceptable | Leo Bennett, tenant | email | A3 ✅ |
| 3 | REQUEST_INFORMATION | Update landlord: provider says out of warranty (their claim, being verified), record conflicts, no chargeable spend without approval | Felix, landlord | email | A4 ✅ |
| 4 | WAIT | Hold and follow-up until 23 May for provider reply | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Harbour Services (Clara) (contractor) via email, existing thread (event 020 email)** (verified)

> Hello, thanks for your emails. Three things please: 1) Your emails say the visit is "tomorrow, 21st June", but tomorrow is 22 May and your call with the tenant said 2:30pm tomorrow. Please confirm the exact date and time. 2) You say the oven is out of warranty. Manufacturer warranties often run longer than 12 months, so please send the purchase/install date you hold and the warranty terms (manufacturer and workmanship). Our records conflict on when it was fitted (the tenant says last year; one note says March 2025). 3) The landlord has approved a charge-free warranty service only. Please do not carry out chargeable work; if a repair is needed, send a quote and wait for our approval. Please reply by 23 May.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, Harbour Services say they spoke to you about a visit tomorrow (22 May) at 2:30pm, but their emails give the date as "21st June", so we are asking them to confirm the exact date. Please treat the visit as not yet confirmed until we message you again. We're also checking with them whether the oven is still under warranty. Is it ok to be without the oven for a few days? If not, tell us and we'll ask for a sooner slot. We'll update you by 23 May at the latest.

**A4 · send_message → Felix (landlord) via email, agency landlord record** (verified)

> Hello Felix, an update on the oven. Harbour Services have told us they believe the oven is no longer under warranty. That is their claim and we are checking it: we've asked for the purchase/install date and warranty terms, as manufacturer warranties often run longer than 12 months. Our records conflict on who fitted it (your note mentions Keystone Works; our notes say Harbour Services) and when (last year vs March 2025), so please confirm if you can. The visit date is also unconfirmed: the provider's emails say "21st June" but their call with the tenant said 22 May at 2:30pm; we're getting the actual date. Nothing chargeable will be done without your approval first. We'll update you by 23 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked via set_visit; the date is unconfirmed
- Provider's out-of-warranty statement is unverified and not accepted as fact
- Landlord approval covers charge-free warranty service only, not paid repair or quote

## Remaining work
- Harbour Services to confirm date, install date and warranty terms (agency ops, by 23 May)
- If out of warranty, get quote and landlord approval before any paid work
- Record visit result after attendance

## Missing or unavailable information
- Actual visit date (22 May vs 21 June)
- Oven install date and warranty terms
- Who fitted the oven (Keystone Works vs Harbour Services)
- Referenced attachments unavailable (events 003, 013)

## Conflicts between sources
- Visit date: 22/05/2024 (call event 018) vs 21/06/2024 (emails 019, 020); trusted neither until provider confirms
- Installer: Keystone Works (landlord, event 006) vs Harbour Services (notes 007, 014)
- Install date: 'last year' (tenant) vs March 2025 (event 014, a future date)
- Warranty: landlord says covered; provider says not

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, on hold awaiting provider. Outstanding: confirmed visit date, install date/warranty terms, quote and landlord approval if chargeable.

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour Services to confirm date and warranty evidence, plus updates by email to tenant and landlord; follow-up 23 May.

**3. Does anything need a human decision, and why?**

No. Routine; a human is needed only if paid work arises beyond landlord's approval or the records stay unresolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Contractor to be contacted for a charge-free warranty service … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Harbour Services (Clara)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-025-warranty-da… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting from Harbour Services: confirmed visit date (22/0… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-23","party":"Harbour Services","purpose":"Chase visit date confirmation, install da… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
