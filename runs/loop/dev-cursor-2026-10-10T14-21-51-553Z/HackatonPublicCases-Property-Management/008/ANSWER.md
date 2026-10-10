# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The check-out works job is waiting on the landlord to choose between two quotes. His replies named other properties and the agency's "I assume" is not approval, so I sent a clear approval request for this flat, noted the conflicts and set a 9 May follow-up.

## Where the case stands
Quote loop, paused (property void). Two quotes received; landlord decision outstanding. No contractor instructed for the works.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm the property and choose a quote, noting scope differences, reply by 9 May | Langley, landlord | email | A1 ✅ |
| 2 | WAIT | Follow-up to chase landlord on 9 May on a second channel | Langley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Langley (landlord)** (verified)

> Which quote to proceed with for the check-out works at Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ. Your last reply (4 May) named other addresses (Alder Lane, Willowmere Road), so we cannot treat it as approval for this flat. Please confirm which flat you meant and which quote you approve, by 9 May. (£1370)
> 
> Options: Approve the £1,370.00 quote (no VAT shown; the estimate says the burnt bedroom carpet can stay, and it includes replacing the bathroom tap, so it is not like-for-like with the original request); Approve the £1,700.00 + VAT quote (we are confirming whether it covers carpet replacement); Ask us to get the scopes aligned and re-quote before deciding; Arrange your own contractor
> 
> Update: Flat is empty, so no tenant to inform. No work is booked and no contractor will be instructed until you reply clearly for this flat. Our earlier email asked about a contractor's unpaid invoice from the previous refurb; we are checking which property that relates to. Roof works are a separate matter.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The request does not approve any quote or spend
- Nothing is booked
- Does not confirm which contractor's quote covers carpet or VAT
- Does not settle the invoice query

## Remaining work
- Landlord decision on quote (owner: landlord, chase 9 May)
- Get readable copy of Kendall's quote and the invoice (attachment-04) and check which property it relates to
- Align scope (carpet, tap) between quotes
- Assign contractor after approval

## Missing or unavailable information
- Landlord's clear decision for this flat
- Kendall quote document and whether it includes carpet
- Invoice attachment-04 not seen
- VAT status of the £1,370 quote

## Conflicts between sources
- Events 021 and 023 name other addresses than the case property
- Estimate supplier is Alder Compliance but event 024 names Eliza Bennett
- Quote scopes differ (carpet excluded, tap replaced though it only drips)
- Inspection report dated 5 Jan 2026 but signed 3 Apr 2025
- Report says carpet burn is pre-existing while the request treats it as damage

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Paused as the property is empty. Two quotes (£1,370 and £1,700+VAT) are with the landlord and no valid decision exists for this flat. Outstanding: the decision, scope alignment, the invoice query and the unseen documents.

**2. What is the next action, who is it for, and through which channel?**

Approval request APR-101 sent to the landlord, Langley, by email. Follow-up set for 9 May to chase on a second channel.

**3. Does anything need a human decision, and why?**

No human escalation is needed now. The decision belongs to the landlord, and it is not time-critical.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Langley","ticket_ref":"NBL-008-3466","decision_needed":"Which quote to proceed with for the check-out works at Flat 5, 55 Lante… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-008-3466","note":"Route: quote loop, awaiting landlord decision. Events 021 and 023 name other properties, so they are not ap… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-05-09","party":"Landlord (Langley)","purpose":"Chase decision on which quote for Flat 5, 55 Lant… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
