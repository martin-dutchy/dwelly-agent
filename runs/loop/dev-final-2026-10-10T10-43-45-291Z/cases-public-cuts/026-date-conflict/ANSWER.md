# Case 026: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The system booked the visit for 30/08 but the tenant says she agreed 8 Sept. I could not verify either, so I asked the contractor to confirm, told the tenant it is not final yet, and put the job on hold with a review on 2 Sept.

## Where the case stands
Ticket at visit stage, landlord approved (event 009). Visit recorded as 30/08/2025 10-12; tenant says 8 Sept was agreed. Held waiting on Keystone Compliance to confirm the date; review 2025-09-02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Keystone Compliance to confirm the actual agreed visit date and not treat today as no-access | Keystone Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant 8 Sept is not yet confirmed, date being checked, no missed visit, routine 14-day target | Clara, tenant | email | A2 ✅ |
| 3 | WAIT | Hold and follow-up on 2025-09-02 for provider reply | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Keystone Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, regarding the oven repair at Flat 3, 3 Willowmere Road. Our record shows a visit on 30/08/2025 (10-12), but the tenant says she agreed 8 September 2025 with your engineer and was not expecting anyone today. Please do not treat today as a no-access visit. Please reply today to confirm the date and time slot you actually agreed with the tenant, and who you spoke to. We will confirm the final date to the tenant once we hear from you.

**A2 · send_message → Clara (tenant) (tenant) via email, existing thread (event 021 call)** (verified)

> Hi Clara, thanks for letting us know, and sorry for the confusion. Our booking shows 30 August, but you've told us you agreed 8 September with the engineer. We haven't yet been able to confirm 8 September, so please don't take it as final just yet. We've asked the engineers to confirm the date they agreed with you today, and we'll come back to you as soon as we hear. You won't be marked as missing today's visit. Your oven repair is a routine job, and we're aiming to get it sorted within 14 days of your report.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing confirms 8 September or 30 August as the real date.
- No visit was rebooked and no work result recorded.
- Nothing establishes the oven fault cause or cost.

## Remaining work
- Keystone to confirm date; then set_visit with future date and confirm to tenant (agency ops)
- Record work result after visit, invoice, tenant confirmation, tell landlord, close

## Missing or unavailable information
- Actual agreed visit date from the contractor
- No tenant/landlord contact details or property record on file; used existing threads

## Conflicts between sources
- Visit date: system 30/08/2025 vs tenant's 8 Sept 2025; 30/08/2025 is a Saturday though described as Monday.
- Contractor name varies: Keystone Compliance, Riverside Works, Keystone Utilities, Lantern Utilities.
- Tenant name varies: Clara, Ruben Oakley, Grace Mercer, Harriet Fletcher.
- Contact numbers differ between events 014, 018 and 020.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved and provider assigned. The visit date is disputed (30/08 in the system vs 8 Sept per tenant). The contractor must confirm the date. Then the visit, result, invoice and closure are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Keystone Compliance asking for the agreed date (done), and an email to the tenant explaining it is being checked (done). Chase on 2025-09-02.

**3. Does anything need a human decision, and why?**

Not yet. This is routine and the contractor can resolve the date. Escalate if there is no reply by the review date or the record inconsistencies persist.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Keystone Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticke… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Clara (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 call)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-026-date-conflict","reason":"Waiting for Provider","comment":"Waiting for Keystone Compliance to confirm the agreed visit… | 1 | ✅ verified | Ticket NBL-026-date-conflict read back after put_on_hold |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-026-date-conflict","due_on":"2025-09-02","party":"Keystone Compliance","purpose":"Chase provider for confirmed visit date… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
