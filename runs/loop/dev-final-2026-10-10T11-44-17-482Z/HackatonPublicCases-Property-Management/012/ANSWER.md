# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The dishwasher job is at the visit stage with a recorded visit on 29/04 8am-12pm. The call log names a different company (Cedar Utilities) and a different tenant surname (Kendall) from the assignment, so I asked the provider to confirm, updated the tenant, resumed auto mode and set a follow-up for 28/04.

## Where the case stands
Stage: visit. Troubleshooting failed (tenant, 23/04). Landlord had already agreed to an engineer (event 008, and the property manager's 25/04 note). Riverside Compliance assigned 25/04. Visit recorded by the system for Wed 29/04/2026 8am-12pm. Waiting on the provider to confirm the company name and slot; follow-up set for 28/04.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Riverside Compliance to confirm that Grant (who said he was from Cedar Utilities) is attending for them and that the 29/04 8-12 slot stands. Quote and photos are needed before any repair. | Riverside Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Confirm the visit on Wed 29/04 8-12 to the tenant and say when they will next hear from us (by 28/04). | Leo Turner, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on 28/04 for the provider's confirmation of the company and slot. | Riverside Compliance, contractor | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Riverside Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Hello, a quick check on the dishwasher job at Flat 9, 89 Juniper Mews. Our record shows a call from "Grant from Cedar Utilities" agreeing Wednesday 29/04/2026, 8am-12pm with the tenant. The job was assigned to Riverside Compliance. Please confirm Grant is attending for Riverside Compliance and that the Wednesday 8-12 slot is confirmed. If it is a different company, please tell us so we can correct the record. As per the job email, please send a quote with photos before any repair work, and don't start until we confirm approval. Thank you.

**A2 · send_message → Leo Turner (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Leo, thanks for running the checks. We have an engineer visit down for Wednesday 29 April, between 8am and 12pm, for them to look at the dishwasher door. Please make sure someone is home. We are just confirming the engineer's company details with them and will tell you if anything changes. If any repair needs a quote, we will get the landlord's approval first. You will next hear from us by Tuesday 28 April, or sooner if anything changes.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages sent do not confirm that the provider has accepted the slot or that the company name is correct.
- No cost, cause or repair approval is established. Any quote still needs landlord approval or the spend limit.
- I did not call set_visit because the system already recorded the visit.

## Remaining work
- Provider confirmation of company and slot (agency, by 28/04)
- Visit on 29/04, then record the result
- If a quote is needed: record it and get landlord approval before work
- Invoice and final checks, then close

## Missing or unavailable information
- Whether Cedar Utilities and Riverside Compliance are the same company
- Spend limit and landlord's decision on any quote (none visible)

## Conflicts between sources
- The call log names Cedar Utilities, but the assigned provider is Riverside Compliance.
- The call log names the tenant as Leo Kendall, but the records say Leo Turner. Treated as a typo; the tenant was reached on the number on file.
- Event 001 refers to an email from Sept 2025, and event 004 says it was unclear whether a later reply was about this dishwasher. The current tenant email of 23/04 settles that the fault persists.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A visit is booked for Wed 29/04/2026, 8am-12pm with Riverside Compliance. Outstanding: confirmation of the provider's identity and slot, the visit result, any quote and landlord approval, then the invoice and close.

**2. What is the next action, who is it for, and through which channel?**

Email Riverside Compliance to confirm the company name and slot (done), and email tenant Leo Turner confirming the visit (done). Follow-up on 28/04.

**3. Does anything need a human decision, and why?**

No. The name mismatch can be settled by asking the provider. Nothing in this case needs a human decision at the moment.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","tick… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-012"} | 1 | ✅ verified | Ticket NBL-012 read back after resume_auto |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-012","due_on":"2026-04-28","party":"Riverside Compliance","purpose":"Check provider has confirmed the 29/04 8-12 slot and… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
