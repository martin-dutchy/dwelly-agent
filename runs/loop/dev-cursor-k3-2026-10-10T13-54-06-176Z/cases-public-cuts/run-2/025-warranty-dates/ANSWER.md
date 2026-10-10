# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven not heating; landlord asked for a warranty claim, Harbour says out of warranty. Visit date conflicts across provider messages. I asked Harbour to confirm in writing, asked the landlord for approval of a chargeable inspect and quote, updated the tenant, and held with review on 24 May.

## Where the case stands
Provider assigned (Harbour Services), on hold awaiting provider confirmation of visit date and warranty dates, and landlord decision on chargeable inspect/quote. Visit not booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Asked Harbour to confirm the actual visit date (22 May 2:30pm vs 21 June) and warranty dates; inspect and quote only. | Harbour Services, contractor | email | A1 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Asked landlord to approve chargeable inspect and quote now warranty is reportedly void, and to clarify Keystone vs Harbour. | Felix, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Told tenant visit date is unconfirmed, warranty claim reportedly unavailable, next update by 24 May. | Leo Bennett, tenant | email | A3 ✅ |
| 4 | WAIT | Hold and follow-up review 24 May. | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Hello Harbour Services, thank you for your updates. Two quick points on Flat 2, 176 Lantern Quay:
> 1. Date: your emails say "tomorrow, 21st June", but the call with the tenant suggests tomorrow, 22 May 2024 at 2:30pm. Please confirm the exact date and time in writing. We have not booked it until you do.
> 2. Warranty: you say the oven is no longer under warranty. Please confirm the date you fitted it (our notes are unclear) and the warranty end date.
> As it is not covered, please attend only to inspect and send a quote with photos. Do not start any chargeable work until we confirm landlord approval.
> Kind regards

**A2 · request_landlord_approval → Felix (landlord)** (verified)

> Harbour Services (the contractor who fitted the oven) say it is no longer under warranty, so a charge-free repair is not available (their claim; we are asking them for the fitting and warranty dates). Do you approve them inspecting and quoting for a chargeable repair, with the quote coming back to you for approval before any work? Note: your email names Keystone Works, but our records show Harbour Services fitted the oven; please confirm which is right. Please reply by 24 May 2024. A visit is pencilled with Harbour but the date is being confirmed with them.
> 
> Options: Yes, Harbour Services to inspect and quote, quote returned to you for approval; You arrange your own contractor; Tenant not to be offered a repair for now

**A3 · send_message → Leo Bennett (tenant) via email, tenant email on file (event 012)** (verified)

> Dear Leo, an update on your oven. Harbour Services spoke to you about a visit tomorrow at 2:30pm, but their emails give a different date (21 June), so we are confirming the correct date with them. Please don't treat the visit as booked until we confirm. They have told us the oven is no longer under warranty, so we are checking the next step with your landlord. We will update you by 24 May.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit has been booked; set_visit not used because the provider's dates conflict.
- Landlord's email was a request to pursue warranty, not approval of chargeable work; no spend approved.
- Warranty status is Harbour's claim, not verified.

## Remaining work
- Harbour to confirm date and warranty dates (agency, review 24 May)
- Landlord to answer approval request (by 24 May)
- Quote loop if repair needed

## Missing or unavailable information
- Actual visit date
- Fitting date and warranty end date
- Which contractor fitted the oven (Keystone vs Harbour)
- Attachments unavailable (events 003, 013)

## Conflicts between sources
- Visit date: 22/05/2024 2:30pm (call, event 018) vs 21 June (emails 019/020, which also say 'tomorrow').
- Landlord names Keystone Works as the fitter; record says Harbour Services.
- Event 014 says oven replaced March 2025, after today's date, and the tenant says 'last year'.
- Warranty: landlord believes it is covered; Harbour says it is not.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Harbour assigned and on hold; the warranty route reportedly failed; visit date unconfirmed (22 May per call vs 21 June per emails); landlord has not approved chargeable work.

**2. What is the next action, who is it for, and through which channel?**

Email to Harbour to confirm the date and warranty dates; email approval request to the landlord; email to the tenant; follow-up 24 May.

**3. Does anything need a human decision, and why?**

No. The landlord's decision on chargeable work is theirs and has been requested; nothing needs escalation yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","ticket_r… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Felix","ticket_ref":"NBL-025-warranty-dates","decision_needed":"Harbour Services (the contractor who fitted the oven) say it is… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 012)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-025-warranty-dates","reason":"Waiting for Provider","comment":"Waiting for Harbour to confirm visit date (22 May 2:30pm p… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-24","purpose":"Chase Harbour for confirmed date/warranty dates and landlord for app… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
