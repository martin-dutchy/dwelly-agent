# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Dishwasher door still won't close after tenant checks; Riverside Compliance assigned and a visit is set for 29/04 8-12. The booking call came from 'Cedar Utilities', so I asked Riverside to confirm who attends, noted the conflict and set a follow-up.

## Where the case stands
Ticket NBL-012 at visit stage. Tenant troubleshooting failed; provider assigned; visit booked Wed 29/04/2026 8am-12pm. Waiting on Riverside to confirm which company attends; follow-up 28/04.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Riverside Compliance to confirm whether Cedar Utilities (Grant) is attending on their behalf for the 29/04 visit | Riverside Compliance, contractor | email | A1 ✅ |
| 2 | WAIT | Follow up 28/04 on provider confirmation; after visit record result/quote | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Riverside Compliance (contractor) via email, existing thread (event 018 email)** (verified)

> - Our record shows a call from Grant at Cedar Utilities booking Wednesday 29/04/2026, 8am-12pm, but the job was assigned to Riverside Compliance. Is Cedar Utilities attending on your behalf? Please confirm who will attend.
> 
> Why: Contractor name on the booking call differs from the assigned provider; we need to confirm the right company attends and is paid.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Booking does not confirm cause, cost or who pays
- Landlord agreement noted covers the engineer inspection, not any quote
- Contractor identity not yet verified

## Remaining work
- Confirm attending company
- Visit 29/04 then record result
- Quote to landlord if repair needed
- Invoice and closing checks

## Missing or unavailable information
- Whether Cedar Utilities is Riverside's subcontractor/trading name
- Tenant surname discrepancy (Turner vs Kendall)

## Conflicts between sources
- Provider Riverside Compliance (assignment) vs Cedar Utilities (call, event 016); trusted assignment record pending confirmation
- Tenant Leo Turner vs Leo Kendall (event 016); treated as a transcription error

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At visit stage: visit booked 29/04/2026 08:00-12:00; outstanding are provider identity confirmation, the visit result, any quote/approval, invoice and closing.

**2. What is the next action, who is it for, and through which channel?**

Email Riverside Compliance (existing thread) to confirm whether Cedar Utilities attends; follow-up on 28/04.

**3. Does anything need a human decision, and why?**

No. The provider name mismatch is a single question to the provider; escalate only if unresolved before the visit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ques… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"NBL-012","note":"Conflicts: assigned provider Riverside Compliance vs booking call from 'Cedar Utilities' (event 016); tenant nam… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012","due_on":"2026-04-28","party":"Riverside Compliance","purpose":"Confirm which company attends on 29/04 before the vi… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
