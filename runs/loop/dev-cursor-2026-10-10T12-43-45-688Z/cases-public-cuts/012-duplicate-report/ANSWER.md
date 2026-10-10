# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's 28/04 email duplicates the open dishwasher job, which already has a visit booked for 29/04 8-12. I replied to the tenant with that, noted the record inconsistencies and returned the job to auto mode. No new ticket was created.

## Where the case stands
Ticket at visit stage. Engineer visit booked for 29/04/2026 08:00-12:00 (inspection/repair). Awaiting the visit and result; no quote yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Told tenant the existing job and 29/04 8-12 visit stand, and how to rearrange | Leo Turner, tenant | email | A1 ✅ |
| 2 | OTHER | Noted duplicate and name inconsistencies on the ticket, returned to auto mode | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo, thanks for getting back to us. You don't need to do anything new: your dishwasher job is already open and an engineer is booked to come this Wednesday, 29/04/2026, between 8am and 12pm to look at the door. If that time no longer works, please call the engineer on 07700 900410 to change it. If the door still isn't sorted after the visit, let us know and we'll follow up straight away.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reply does not confirm the repair or its cost
- No new ticket created; the duplicate was linked via note
- Does not resolve the provider name discrepancy

## Remaining work
- Visit on 29/04; then record the work result or quote (agency ops)
- If the visit is missed or no result is received by 30/04, ask provider and tenant what happened

## Missing or unavailable information
- Which company actually attends (Riverside Compliance vs Cedar Utilities) is unconfirmed

## Conflicts between sources
- Event 016 names Cedar Utilities/Grant and tenant 'Leo Kendall'; the assigned provider is Riverside Compliance and the tenant is Leo Turner. Trusted the system assignment.
- Event 020 SMS signed Harbour Homes rather than Northbridge Lettings.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit stage: engineer booked 29/04/2026 08:00-12:00. Outstanding: the visit, its result, and any quote needing landlord approval.

**2. What is the next action, who is it for, and through which channel?**

Reply to the tenant by email (sent) confirming the existing booking; then wait for the visit result.

**3. Does anything need a human decision, and why?**

No. It is a routine duplicate report with a visit already booked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-012-duplicate-report","note":"Tenant email 28/04 (event 021) is a duplicate of the open job; no new ticket. Visit 29/04 08:00… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-012-duplicate-report"} | 1 | ✅ verified | Ticket NBL-012-duplicate-report read back after resume_auto |

## Failed or unverified actions
_None._
