# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's troubleshooting failed and an engineer was assigned. A visit is recorded for 29 April 8-12. The provider named on the booking call differs from the assigned one, so I asked Riverside to confirm, updated the tenant, noted the conflicts and set a follow-up for 28 April.

## Where the case stands
Stage: visit. Inspection recorded by system for 29/04/2026 08:00-12:00. Waiting on Riverside Compliance to confirm attendance and company identity. No quote or spend yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Riverside Compliance to confirm the 29/04 8-12 visit and whether Cedar Utilities is them | Riverside Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the 29 April 8-12 slot is on record, details being confirmed, and next update by 29 April | Leo Turner, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on provider confirmation on 28 April | Riverside Compliance, contractor | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Riverside Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> - Please confirm you will attend Flat 9, 89 Juniper Mews on Wednesday 29/04/2026 between 8 and 12.
> - Our record shows the call to the tenant came from 'Grant from Cedar Utilities'. Is that your engineer, or a different company?
> 
> Why: Job was assigned to Riverside Compliance but the booking call names Cedar Utilities; need to confirm the right company is attending.

**A2 · send_message → Leo Turner (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Leo, thanks for running the checks. An engineer has called to book a dishwasher inspection for Wednesday 29 April, between 8 and 12, and our records show that slot. We're just confirming the engineer's details with the company, and will tell you if anything changes. Please make sure someone is home for access. If they find a repair is needed, we'll need the landlord's approval for any quote before work starts. We'll update you by Wednesday 29 April at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the cause of the fault or who pays.
- Does not approve any quote or spend.
- Provider attendance is not yet confirmed by the provider in writing.

## Remaining work
- Provider confirmation and identity check (agency, by 28 April)
- Visit on 29 April, then record the result
- If a quote is needed: record it and send to the landlord for approval
- Invoice, tenant confirmation and landlord informed before closing

## Missing or unavailable information
- Whether Cedar Utilities and Riverside Compliance are the same provider
- Provider's written confirmation of the date

## Conflicts between sources
- Assigned provider Riverside Compliance vs call from 'Cedar Utilities'; trusted system assignment pending confirmation.
- Tenant is Leo Turner in records but Leo Kendall in the call log; trusted Leo Turner.
- Event 004 note says the origin was an old Sept 2025 email, while the current request is consistent with the tenant's April report.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

A visit is booked for 29/04/2026 8-12 for inspection. Outstanding: provider confirmation and identity check (Riverside vs Cedar Utilities), the visit result, and any quote needing landlord approval.

**2. What is the next action, who is it for, and through which channel?**

Ask Riverside Compliance to confirm the visit and company by email (done), and update the tenant by email (done). Follow up on 28 April.

**3. Does anything need a human decision, and why?**

No. The name mismatch can be settled by asking the provider. Escalate only if it stays unresolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ques… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012","due_on":"2026-04-28","party":"Riverside Compliance","purpose":"Check provider confirmed 29/04 8-12 visit and compan… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-012","note":"Conflicts: assigned provider Riverside Compliance vs call logged from 'Grant from Cedar Utilities'; tenant named… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
