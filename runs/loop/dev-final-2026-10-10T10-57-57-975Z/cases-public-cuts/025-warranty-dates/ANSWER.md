# Case 025: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven is not heating. Harbour Services say it is out of warranty, so the landlord's request for a charge-free repair can't be met. I logged the 22 May 2:30pm visit and told the tenant, landlord and contractor. Any chargeable work needs a quote and landlord approval first.

## Where the case stands
Stage: visit booked. Landlord approval confirmed (to instruct; no spend cap recorded). Harbour Services assigned, visit with tenant agreed by phone for 22 May 2:30pm. Contractor says the oven is out of warranty. Waiting on the inspection result and any quote.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Logged the visit for 22 May 2:30pm (tenant at home) and confirmed it to the tenant | Leo Bennett, tenant | email | A4 ✅ |
| 2 | REQUEST_INFORMATION | Asked Harbour to confirm the visit date (their emails say 21 June) and the fitting date, and to quote before any chargeable work | Harbour Services, contractor | email | A3 ✅ |
| 3 | OTHER | Told the landlord the oven is out of warranty, that any cost will come as a quote for his approval, and asked about a spend limit | Felix, landlord | email | A2 ✅ |
| 4 | WAIT | Follow up on 22 May for the visit outcome and quote | Harbour Services | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Felix (landlord) via email, existing thread (event 014 email)** (verified)

> Good afternoon Felix, Harbour Services have told us the oven is no longer under warranty, so a charge-free repair isn't available. They are visiting the tenant tomorrow (22 May, 2:30pm) to inspect it. If a repair or replacement costs anything, they will send a quote and we will not go ahead until you have approved it. Please let us know if you have a spend limit in mind. Also, we have noted differing dates for last year's replacement (March 2025 in our earlier email, which can't be right), so we are checking this. Kind regards

**A3 · send_message → Harbour Services (contractor) via email, existing thread (event 020 email)** (verified)

> Thanks for confirming. We have logged the visit for tomorrow, Wednesday 22 May, 2:30pm, as agreed with the tenant by phone. Your emails say "21st June", so please confirm 22 May is right. Since the oven is out of warranty, please do not carry out chargeable work before we approve it: send a quote with photos and the estimated completion time after the inspection. Please also confirm the date you fitted the oven. Kind regards

**A4 · send_message → Leo Bennett (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Leo, Harbour Services have told us they will visit tomorrow, Wednesday 22 May, at 2:30pm to look at your oven. Please make sure someone is home. If it needs a part or a quote, we will talk to your landlord first and keep you updated. If the date doesn't match what you agreed with them, please let us know. Kind regards

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking the visit does not mean the repair is approved or who pays.
- The warranty status rests on the contractor's email only, with no document seen.
- Nothing yet shows the cause of the fault or the cost.

## Remaining work
- Record the work result after the visit (agency, 22 May).
- If a quote comes in, record it and request landlord approval (agency).
- Landlord to reply on spend limit and approve any quote.
- Confirm the visit date and the fitting date with Harbour Services.

## Missing or unavailable information
- Landlord spend limit (property record has none)
- Warranty paperwork and the actual fitting date
- Confirmation of the visit date (22 May vs '21st June')

## Conflicts between sources
- The contractor emails say the visit is 'tomorrow, 21st June', but today is 21 May and the call says the next day at 2:30pm. I trusted the call and treated it as 22 May, and asked for confirmation.
- Our event 014 email says the oven was replaced in March 2025, which is in the future. The tenant says 'last year'. The fitting date is unverified and I asked the contractor.
- The landlord assumed the oven was under warranty. The contractor says it isn't. I trusted the contractor, subject to paperwork.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Contractor is assigned and the visit is booked for 22 May 2:30pm. The oven is reported out of warranty. Outstanding: the inspection result, a quote if needed, landlord approval of any spend, and confirming the dates.

**2. What is the next action, who is it for, and through which channel?**

Done now: the visit was logged and emailed to the tenant. Harbour Services were emailed to confirm the dates and to quote before any chargeable work. The landlord was emailed about the warranty outcome. Next: follow up with Harbour Services on 22 May.

**3. Does anything need a human decision, and why?**

No human decision is needed now. A human or the landlord will only be needed if a quote exceeds authority; the landlord decides on any spend.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `set_visit` | {"ticket_ref":"NBL-025-warranty-dates","datetime":"2024-05-22 14:30","slot_text":"Wednesday 22 May, 2:30pm (as agreed by phone between Harbo… | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after set_visit |
| A2 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"existing thread (event 014 email)","body":"Good afternoon… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 020 email)","body":"T… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Dear Leo, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-025-warranty-dates","due_on":"2024-05-22","party":"Harbour Services","purpose":"Check visit outcome/quote after 2:30pm vi… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-025-warranty-dates"} | 1 | ✅ verified | Ticket NBL-025-warranty-dates read back after resume_auto |

## Failed or unverified actions
_None._
