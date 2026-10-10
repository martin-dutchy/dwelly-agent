# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair with Harbour Services assigned. The provider's visit date is contradictory and its out-of-warranty claim is unverified. I recorded the landlord's conditional (charge-free) decision, asked the provider for the date and warranty evidence, corrected the earlier date error with the landlord, updated the tenant, and set a follow-up for 22 May.

## Where the case stands
Provider (Harbour Services) assigned, ticket at mp_time, on hold waiting for provider. Visit date unconfirmed (22 May 2:30pm per call vs "21st June" per emails). Warranty status disputed: provider says out of warranty, unverified. Landlord approval is conditional on a charge-free service.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Harbour Services to confirm exact visit date/time and send oven install date, model and warranty terms, by 22 May; no chargeable work without approval | Harbour Services, provider | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the date is unconfirmed, warranty being checked, ask if tomorrow is acceptable | Leo Bennett, tenant | email | A4 ✅ |
| 3 | REQUEST_INFORMATION | Update landlord, correct the March 2025 error, ask to confirm Keystone vs Harbour and supply purchase paperwork | Felix, landlord | email | A3 ✅ |
| 4 | WAIT | Follow up with provider on 22 May | Harbour Services | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Harbour Services (Clara) (contractor) via email, existing thread (event 020 email)** (verified)

> Hello, thanks for your emails. Two things please, for Flat 2, 176 Lantern Quay:
> 1) Visit date: your emails of today say "tomorrow, 21st June", but today is 21 May and the call summary says tomorrow (22 May) at 2:30pm. Please confirm the exact date and time. Until you do, we are treating it as unconfirmed.
> 2) Warranty: you say the oven is out of warranty. Manufacturer warranties often run longer than 12 months, so please send the install/purchase date, the warranty terms and the manufacturer/model. Our records are also unclear on when the oven was replaced (tenant says last year), so please confirm your date. The landlord has asked for a charge-free warranty service. Please do not carry out any chargeable work without a written quote approved by us first.
> Please reply by end of tomorrow, 22 May.

**A3 · send_message → Felix (landlord) via email, agency landlord record** (verified)

> Hello Felix, an update on the oven at Flat 2, 176 Lantern Quay. Sorry, my earlier email gave the replacement date as March 2025, which can't be right; the tenant says it was replaced last year and we are confirming the date. Your note named Keystone Works, but our records show Harbour Services replaced it, so we've asked them to check the warranty. Harbour Services have said, by email, that the oven is no longer under warranty. We are treating that as their claim, not fact, and have asked for the install date, model and warranty terms, as warranties often run longer than 12 months. The visit date is also being confirmed with them. We won't approve any charge without coming back to you first. Could you confirm whether Keystone Works is correct and, if you have it, send the oven's purchase paperwork? We'll update you by 23 May.

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Leo, Harbour Services say they've arranged a visit with you, but their messages give conflicting dates (tomorrow 22 May at 2:30pm, and "21st June"). We've asked them to confirm the exact date, so please don't treat it as booked until we confirm. We're also checking whether the oven is covered by warranty, so there should be no cost to you. Since you're without an oven, is tomorrow afternoon OK for you? If not, tell us and we'll ask for an earlier slot. We'll update you by 22 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked: set_visit not used because the provider's date is contradictory.
- Warranty status not established; the provider's claim is unverified.
- No spend approved; the landlord only asked for a charge-free service.

## Remaining work
- Provider to confirm visit date and warranty evidence (agency, by 22 May)
- Landlord to confirm contractor (Keystone vs Harbour) and any paperwork
- If chargeable, quote goes to landlord for approval
- Record work result, invoice and closure after the visit

## Missing or unavailable information
- Actual visit date
- Oven install/purchase date and warranty terms
- Whether Keystone Works or Harbour Services fitted the oven

## Conflicts between sources
- Visit date: 22/05 2:30pm (event 018) vs 21/06 (events 019, 020, which also say 'tomorrow'); treated as unconfirmed.
- Oven replaced 'last year' (tenant) vs 'March 2025' (event 014, impossible); treated as unknown.
- Landlord named Keystone Works; agency note says Harbour Services replaced it.
- Provider says no warranty; landlord says should be under warranty; unresolved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, on hold awaiting the provider. Outstanding: confirmed visit date, warranty evidence, and landlord confirmation of who fitted the oven.

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour Services asking for the visit date and warranty details; emails to the tenant and landlord with updates. Follow-up on 22 May.

**3. Does anything need a human decision, and why?**

No. This is routine and waiting on information. Any chargeable quote goes to the landlord, not a human at the agency.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Charge-free warranty service only; any charge must come back t… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Harbour Services (Clara)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-025-warranty-da… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: visit date 22/05 2:30pm (event 018 call) vs \"21st June\" (events 019, 020 emails, bot… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-22","party":"Harbour Services","purpose":"Confirm visit date/time and warranty evid… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
