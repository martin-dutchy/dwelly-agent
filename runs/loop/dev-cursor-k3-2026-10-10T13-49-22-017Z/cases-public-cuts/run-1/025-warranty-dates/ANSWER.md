# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Harbour says the oven is out of warranty and gave contradictory visit dates. I recorded the landlord's approval as conditional on a charge-free warranty service, asked Harbour to confirm the date and warranty evidence, asked the landlord whether to proceed to diagnose and quote, updated the tenant, and held to 24 May.

## Where the case stands
Provider (Harbour Services) assigned, ticket at mp_time on hold. Visit not booked: date conflicts. Provider says warranty has ended (unverified). Waiting on Harbour for date/warranty evidence/charges, and on landlord for a yes/no on chargeable diagnosis.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Harbour to confirm exact visit date/time, install date and warranty evidence, and any call-out charge | Harbour Services (Clara), contractor | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask Felix to approve diagnose-and-quote now that warranty is reported ended, by 24 May | Felix, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Tell Leo the visit time is unconfirmed, warranty being checked, next update by 24 May | Leo Bennett, tenant | email | A4 ✅ |
| 4 | WAIT | Hold with review 24 May | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Harbour Services (Clara) (contractor) via email, existing thread (event 020 email)** (verified)

> - Your emails say the visit is 'tomorrow, 21st June', but they were sent on 21 May and the call with the tenant said tomorrow 2:30pm (22 May). Please confirm the exact date and time slot.
> - Please confirm the date the oven was fitted and how you established the warranty has ended (e.g. warranty period or install date). Our notes show both 'last year' and March 2025.
> - Is there a call-out or diagnosis charge for this visit? Please do not carry out chargeable work without our written approval; send a quote with photos if needed.
> 
> Why: Visit date is contradictory so it cannot be booked; warranty status affects who pays.

**A3 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services (who fitted the oven) report it is no longer under warranty (their claim, not yet verified; our records show conflicting install dates). Do you approve them attending to diagnose and quote, with any repair coming back to you for approval before work starts? Please reply yes or no by 24 May 2024.
> 
> Options: Yes: Harbour Services diagnose and quote; no work without your approval (recommended); No: you arrange your own contractor; Ask Harbour to evidence the warranty position first

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file (event 012)** (verified)

> Dear Leo, thanks for your patience. Harbour Services say they spoke to you about visiting tomorrow (22 May) at 2:30pm, but their emails give a different date, so we are confirming it with them and please don't treat the time as booked until we confirm. They also say the oven is no longer under warranty, so we are checking with your landlord about the repair. We will update you by 24 May at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the oven is out of warranty; that is Harbour's claim.
- No visit is booked; the tenant's 22 May 2:30pm is unconfirmed by the provider in writing.
- No chargeable work or spend is approved.

## Remaining work
- Harbour to confirm date, warranty evidence, charges (agency chases by 24 May)
- Landlord yes/no on APR-102
- set_visit once provider confirms a date
- Quote loop if repair needed

## Missing or unavailable information
- Actual visit date (22 May vs 21 June)
- Oven install date (last year vs March 2025) and warranty terms
- Whether a call-out fee applies
- Landlord email names Keystone Works though Harbour fitted the oven

## Conflicts between sources
- Visit date 22/05 (event 018) vs 21 June (events 019/020) described as tomorrow; trusted neither, asked provider.
- Landlord email names Keystone Works; oven fitted by Harbour Services.
- Install: last year (tenant) vs March 2025 (event 014), which is after today's date.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but visit unbooked due to date conflict (22 May per call vs 21 June per emails). Warranty reportedly ended (unverified). Landlord approval covered charge-free warranty work only; fresh approval needed for chargeable work.

**2. What is the next action, who is it for, and through which channel?**

Email Harbour to confirm date and warranty evidence; email landlord Felix for yes/no on diagnose-and-quote; email tenant Leo with status. All done, hold to 24 May.

**3. Does anything need a human decision, and why?**

No. The landlord's decision is theirs and has been requested; the date conflict is a question to the provider. Escalate only if no reply by the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-025-warranty-dates","decision":"conditional","conditions":"Approved only for the oven replacement contractor to attend as… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Harbour Services (Clara)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services (who fitted the oven) report it is no longer u… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 012)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Awaiting Harbour to confirm visit date (22 May vs 21 June … | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |
| A6 | `add_note` | {"entity":"NBL-025-warranty-dates","note":"Conflicts: visit date 22/05 (call, event 018) vs \"tomorrow, 21st June\" (events 019/020); landlo… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
