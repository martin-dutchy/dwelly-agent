# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The dishwasher door still won't close after the tenant's troubleshooting. The property manager instructed an engineer, and the visit is confirmed for 29 April 8am-12pm. I emailed the tenant the confirmed slot, added a note on the record mismatches and set a follow-up for 30 April.

## Where the case stands
Provider assigned; visit booked for Wed 29/04/2026 08:00-12:00 (system event 017, provider call event 016). Waiting on the visit result. Any quote needs landlord approval before work.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | BOOK_OR_CONFIRM_APPOINTMENT | Confirm the 29 April 8am-12pm inspection to the tenant, explain that a quote needs landlord approval, and say when we will next be in touch | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Follow up on 30 April for the visit result, quote or invoice | Riverside Compliance / tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Leo, thanks for running the checks. The engineer is booked to inspect the dishwasher on Wednesday 29 April, between 8am and 12pm. Please make sure someone is home to let them in. If that no longer works, tell us or the engineer and we'll rearrange. If the engineer finds a repair that needs a quote, we'll need landlord approval first and will keep you updated. We'll check in with you after the visit, by 30 April.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Confirming the visit does not establish the cause, the cost, or landlord approval of any repair.
- Event 008 'LL already agreed for GS to go out' is ambiguous and is not treated as approval of a quote.
- The visit date is not yet in the past, so no work result can be recorded.

## Remaining work
- Visit on 29/04 and its result
- If a quote is needed: record it and send it to the landlord for approval
- Invoice and final checks, tenant confirmation, then close

## Missing or unavailable information
- Landlord spend limit is not on the property record
- Meaning of 'GS' in event 008

## Conflicts between sources
- Provider: Riverside Compliance is assigned, but the call summary names Cedar Utilities. Same address and job, so treated as the assigned provider.
- Tenant: Leo Turner on the record, but the call summary says Leo Kendall. Treated as the same tenant.
- Event 004 says it was unclear whether 'door won't close' meant the dishwasher, but event 011 and event 012 confirm the dishwasher issue persists.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The visit is booked for 29/04/2026 08:00-12:00 with the assigned provider. The visit result, any quote and its approval, the invoice and the closing checks are all still outstanding.

**2. What is the next action, who is it for, and through which channel?**

I emailed the tenant (Leo Turner) to confirm the slot. A follow-up is set for 30 April to get the result from the provider and tenant.

**3. Does anything need a human decision, and why?**

No. Nothing needs a human now. Any quote will go to the landlord for approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"012",… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"012","note":"Visit 29/04/2026 08:00-12:00 recorded by system (event 017) and agreed by provider by phone (event 016). Name mismat… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"012","due_on":"2026-04-30","party":"Riverside Compliance / tenant","purpose":"Check visit on 29/04 happened; get result, quot… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `resume_auto` | {"ticket_ref":"012"} | 1 | ❌ failed | Ticket 012 not found on read-back |

## Failed or unverified actions
- A4: resume_auto failed because ticket ref '012' was not found. It is not safety-critical, so I did not retry it. A human or the system should return the job to auto mode and clear hold event 009 if it is still active.
