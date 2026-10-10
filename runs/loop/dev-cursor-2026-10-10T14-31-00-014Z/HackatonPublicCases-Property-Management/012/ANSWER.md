# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's troubleshooting failed and the property manager instructed an engineer. The visit is booked for Wed 29/04 8-12, and I confirmed it to the tenant. A follow-up is set for 30/04 to check the result.

## Where the case stands
Provider assigned; visit recorded by system for Wed 29/04/2026, 8am–12pm; tenant now informed. Awaiting visit and result or quote.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Confirm the 29 April 8-12 visit, offer a sooner or different slot, explain quote approval comes before repairs | Leo Turner, tenant | email | A1 ✅ |
| 2 | WAIT | Follow up on 30 April for visit result or quote | Riverside Compliance, provider | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Leo, thanks for running the checks. The engineer's visit for the dishwasher door is booked for this Wednesday, 29 April, between 8am and 12pm, and the engineer's call to you on 26 April agreed that slot. Please let us know if that doesn't suit and we can ask them for a different slot or a sooner one if one is available. The engineer will look at it first and, if a quote is needed, we will get the landlord's approval before any repair work starts. We will update you after the visit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not establish the cause of the fault or who pays
- The landlord has not approved any quote; note says only that the landlord agreed an engineer could attend
- The tenant's earlier checks do not confirm the fault is the appliance rather than the door fitting

## Remaining work
- Visit on 29/04
- Record result; if a quote arrives, send it to the landlord for approval
- Invoice and final checks, landlord and tenant confirmation before closing

## Missing or unavailable information
- Ticket reference not found in the system lookup
- Landlord spend limit not shown on the property record

## Conflicts between sources
- Call summary names Cedar Utilities / 'Leo Kendall' but the record says Riverside Compliance / Leo Turner; treated as the assigned provider and tenant (same job and address).
- Earlier note says the tenant 'Ruben' did not respond, while the tenant is Leo; the tenant replied on 23/04.
- Event 001 refers to an email of 16 Sept 2025, so the fault may be long-standing.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider is assigned and the visit is booked for 29/04/2026, 8am to 12pm. The visit result, any quote and landlord approval are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Confirm the visit to the tenant by email (sent), then follow up with the provider on 30/04 for the result.

**3. Does anything need a human decision, and why?**

No. This is routine and nothing needs authority yet. Any quote goes to the landlord when it arrives.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","body":"Hi Leo, tha… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"due_on":"2026-04-30","purpose":"Visit was due 29/04 8-12 (Riverside Compliance). Check result with provider and tenant; if quote needed, s… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
