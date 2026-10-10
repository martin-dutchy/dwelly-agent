# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's troubleshooting failed, the property manager instructed an engineer, and a visit is recorded for 29/04 8-12. I told the tenant and asked the provider to confirm the slot and the company name mismatch.

## Where the case stands
Stage: visit. Provider assigned (Riverside Compliance); visit 29/04/2026 08:00-12:00 recorded by system. Waiting on provider to confirm company/attendance, then the visit result and any quote.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell tenant the recorded visit slot 29 April 8-12 and that any repair needs landlord approval | Leo Turner, tenant | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask Riverside to confirm attendance and resolve the Cedar Utilities name discrepancy; no repair before approval | Riverside Compliance, contractor | email | A2 ✅ |
| 3 | WAIT | Follow up on provider confirmation 28 April | Riverside Compliance | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Leo, thanks for running the checks. Our record shows an engineer visit to look at the dishwasher door on Wednesday 29 April, between 8am and 12pm. Please make sure someone is home to let them in. If that time no longer works, tell us and we will rearrange. If the engineer needs to quote for a repair, we will need the landlord's approval before any work starts, and we will keep you updated.

**A2 · send_message → Riverside Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> Hello, please confirm you will attend Flat 9, 89 Juniper Mews on Wednesday 29/04/2026, 8am-12pm. Our log shows a call from "Grant from Cedar Utilities" arranging this, but the job is assigned to Riverside Compliance, so please confirm who is attending and that they are with you. This visit is to inspect, and quote if needed. Please do not start any repair until we confirm landlord approval.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not confirm the provider has accepted the slot
- Landlord agreement covers sending an engineer to investigate only, not a repair cost
- Does not establish the fault cause or who pays

## Remaining work
- Provider to confirm company and attendance (follow-up 28/04)
- After visit: record result, quote to landlord for approval if needed
- Invoice, tenant confirmation, close

## Missing or unavailable information
- Provider confirmation that Cedar Utilities/Grant is Riverside's engineer
- Landlord spend limit not on file

## Conflicts between sources
- Event 016: Cedar Utilities caller and 'Leo Kendall' vs assigned Riverside Compliance and tenant Leo Turner; trusted the system record and asked the provider
- Event 001 references a Sept 2025 email; event 004 notes it was unclear whether it concerned the dishwasher

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit booked for 29/04/2026 08:00-12:00 per system. Outstanding: provider confirmation of identity/attendance, visit result, possible quote and landlord approval, invoice, closure.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant with the visit slot, and email to Riverside Compliance asking for confirmation; follow-up set for 28/04.

**3. Does anything need a human decision, and why?**

No. The name discrepancy can be settled by asking the provider; escalate only if it is unresolved by the follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","tick… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-012","note":"Event 016 names Grant from Cedar Utilities calling \"Leo Kendall\"; tenant is Leo Turner and assigned provider i… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-012","due_on":"2026-04-28","party":"Riverside Compliance","purpose":"Check provider confirmed attendance and company iden… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
