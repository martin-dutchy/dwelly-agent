# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Check-out works estimate for a void flat. Both quotes were sent to the landlord on 6 May and we are waiting for a decision. I set a hold with a review date of 9 May, scheduled a chase and noted the record conflicts. Nothing was approved.

## Where the case stands
Ticket in mp_time, property void. Two quotes obtained (£1,370.00 and £1,700.00 + VAT). Quote email sent to landlord 6 May, hold set; waiting on landlord decision. No approval, assignment or spend made.

## Next action
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold for landlord decision on the quotes, review 9 May, with chase follow-up FUP-101 | Langley, landlord | internal | A1 ✅ |

## Messages sent (verbatim)
_None._

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The hold and follow-up do not approve either quote or any spend
- Nothing here confirms the scope, VAT or which contractor is chosen
- The landlord's question about the earlier refurb invoice is unanswered

## Remaining work
- Landlord to choose a quote; then record the decision, approve and assign
- Confirm scope: the £1,370 quote leaves the burnt carpet in place, while the request was to replace it
- Accounts to confirm whether the previous refurb invoice was paid
- Fix the contractor name and address discrepancies in the records

## Missing or unavailable information
- Landlord decision
- Confirmation of the contractor behind the £1,370 quote (Alder Compliance vs Eliza Bennett)
- Previous refurb invoice payment status

## Conflicts between sources
- The estimate is from Alder Compliance, but event 024 names Eliza Bennett
- The inspection is dated 5 Jan 2026 but signed 3 Apr 2025
- Events 021 and 023 mention other properties; I treated them as template errors
- The £1,370 quote excludes carpet replacement and includes tap replacement, which differs from the request

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

It is waiting on the landlord to choose between £1,370.00 and £1,700.00 + VAT. Scope, VAT and contractor identity need confirming, and the old invoice query is open.

**2. What is the next action, for whom, via which channel?**

Wait on the landlord (Langley). The hold and chase on 9 May are logged internally. The quote email was already sent by email on 6 May, so a duplicate is not needed.

**3. Does anything need a human decision?**

No human decision is needed now; the decision is the landlord's. Accounts should answer the previous invoice question.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on two quotes (£1,370.00 vs £1,700.00 + V… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A2 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-05-09","party":"Langley, landlord","purpose":"Chase landlord decision on the two quotes; check s… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A3 | `add_note` | {"entity":"NBL-008-3466","note":"Record conflicts: estimate attachment is from \"Alder Compliance\" at £1,370 (no VAT, carpet excluded, tap … | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Failed or unverified actions
_None._
