# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider's emails give conflicting visit dates and say the oven is out of warranty, while the landlord only authorised a free warranty service. I asked the provider to confirm the date and warranty position, told the tenant nothing is booked yet, asked the landlord how to proceed, and set a hold to 22 May.

## Where the case stands
Provider assigned (Harbour Services), visit NOT confirmed (22/05 vs 21/06 conflict). Provider says oven out of warranty. Landlord only authorised a charge-free warranty service; no spend approved. On hold to 22 May.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Harbour Services to confirm exact visit date/time, fitting date and warranty position, and quote before any chargeable work | Harbour Services, provider | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant visit date is unconfirmed, don't treat any date as booked, next update by tomorrow morning | Leo Bennett, tenant | email | A3 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Tell landlord provider says no warranty; ask whether Harbour may inspect/quote or he'll use his own contractor, reply by 24 May | Felix, landlord | email | A4 ✅ |
| 4 | WAIT | Hold and follow up 22 May | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Thanks for your emails. Your two emails say "tomorrow, 21st June", but tomorrow is 22 May, and the tenant call (event 018) mentions 2:30pm tomorrow. Please confirm the exact date and time of the visit. Please also confirm the date you fitted the oven and what the warranty position is. Since you say it is out of warranty, please do not carry out any chargeable work: send a quote with photos and estimated time for the landlord's approval first. Please reply by 10am tomorrow.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, Harbour Services have told us they spoke to you about a visit, but their emails give two different dates (tomorrow 22 May at 2:30pm, and 21 June). We are asking them to confirm the right one, so please don't treat any date as booked yet. We'll let you know once it is confirmed, by tomorrow morning. Please also don't use the oven in the meantime. We're sorry for the confusion. Any repair cost needs the landlord's approval first, and we will keep you updated.

**A4 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services say the oven is no longer under warranty (their claim, which we are verifying). Apologies: our earlier email gave the fitting date as March 2025, which can't be right; the tenant says it was fitted last year and your note names Keystone Works, so we are checking. Please confirm whether we may have Harbour Services inspect and quote for a paid repair (you would approve any quote before work starts), or whether you will arrange your own contractor. Please reply by 24 May.
> 
> Options: Harbour Services inspect and quote; you approve before work (recommended); You arrange your own contractor; Do nothing for now

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit booked via set_visit; the provider's date is unclear.
- Warranty status is the provider's claim, not verified.
- No spend approved; landlord's reply only covered a charge-free warranty service.

## Remaining work
- Provider to confirm visit date and warranty/fitting facts (agency, 22 May)
- Landlord decision on paid repair or own contractor (by 24 May)
- Update tenant once date confirmed

## Missing or unavailable information
- Confirmed visit date
- Who fitted the oven (Harbour vs Keystone Works) and when
- Missing attachments (events 003, 013)
- Landlord spend limit not on file

## Conflicts between sources
- Visit date 22/05 (event 018) vs 21/06 (events 019/020, which say 'tomorrow').
- Fitter Harbour Services (event 007) vs Keystone Works (event 006).
- Fitting date 'last year' vs 'March 2025' (event 014, a future date).
- Landlord expects warranty cover; provider says none.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, on hold. Visit date unconfirmed (22/05 per call vs 21/06 per emails). Provider says no warranty. Landlord decision on paid repair outstanding.

**2. What is the next action, who is it for, and through which channel?**

Emails to Harbour Services (confirm date, quote first), the tenant (date unconfirmed), and the landlord (approval request, reply by 24 May).

**3. Does anything need a human decision, and why?**

No escalation now. The only decision is the landlord's on spend or own contractor, which is requested; escalate if the provider cannot confirm the date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"Flat 2, 176 Lantern Quay","decision":"conditional","conditions":"Only a charge-free warranty service by the contractor who fi… | 1 | ❌ failed | Ticket Flat 2, 176 Lantern Quay not found on read-back |
| A2 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","body":"T… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"Flat 2, 176 Lantern Quay","decision_needed":"Harbour Services say the oven is no longer under warranty (th… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A5 | `add_note` | {"entity":"Flat 2, 176 Lantern Quay","note":"Conflicts: visit 22/05 (event 018) vs 21/06 (events 019/020, both say 'tomorrow'); fitter Harbo… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `schedule_follow_up` | {"ticket_ref":"Flat 2, 176 Lantern Quay","due_on":"2024-05-22","party":"Harbour Services","purpose":"Confirm visit date/time and warranty po… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A7 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Only a charge-free warranty service by the fitting contractor.… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A8 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting Harbour Services' confirmed visit date (22/05 vs … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |

## Failed or unverified actions
- A1: First attempt used the address instead of the ticket ref; retried successfully as A7.
