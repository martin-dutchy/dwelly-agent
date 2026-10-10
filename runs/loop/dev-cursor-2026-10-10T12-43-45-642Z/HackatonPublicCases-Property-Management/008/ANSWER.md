# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Void flat check-out works awaiting landlord choice between two quotes. Landlord's recent emails and our chaser named other properties and the "assume cheaper" line isn't approval, so I sent a clear approval request for this flat, noted the conflicts and set a chase for 9 May.

## Where the case stands
Stage mp_time, property void, paused on hold for landlord. Two quotes (£1,370.00 Alder Compliance; £1,700+VAT Kendall) awaiting landlord decision. No contractor assigned; no approval recorded.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a clear decision and cap on the two quotes, naming Flat 5, 55 Lantern Quay, and which property the old invoice relates to | Langley, landlord | email | A1 ✅ |
| 2 | WAIT | Chase landlord on second channel on 2025-05-09 | Langley, landlord | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Langley (landlord)** (verified)

> Check-out works at Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ only. Two quotes: (A) £1,370.00 from Alder Compliance (no VAT itemised; includes painting, bathroom lino, plug socket, shelf, tap replacement; says bedroom carpet can stay, so the burnt carpet isn't replaced); (B) £1,700.00 + VAT from Kendall (scope not confirmed to us). Please reply yes/no to proceeding with a named option and a spend cap. Your last two emails named other addresses, so a reply naming this flat is needed before we instruct anyone. A "cheaper option" assumption isn't approval. Separately: the earlier refurb invoice query is not about this job; please tell us which property it relates to.
> 
> Options: Approve Option A (£1,370.00) with cap, noting carpet stays; Approve Option B (£1,700.00 + VAT); Ask contractor to re-quote including the burnt carpet; Use your own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The approval request does not approve either quote or instruct a contractor
- Does not establish scope equivalence between quotes or whether VAT applies to the £1,370

## Remaining work
- Landlord decision and cap (owner: landlord)
- Chase 2025-05-09
- Confirm Kendall quote scope/document and clarify carpet and tap items
- Assign contractor after recorded approval

## Missing or unavailable information
- Landlord's explicit decision naming this property
- Kendall's quote document and scope (not in case files)
- Which property the earlier refurb invoice relates to

## Conflicts between sources
- Events 021 and 023 name other properties than the case property; treated as not about this job
- Inspection report dated 5 Jan 2026 but signed 3 April 2025; carpet burn described as pre-existing in one report; estimate says carpet can stay and replaces tap, contrary to the request
- Event 024 mentions an 'assumed' choice, not approval

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Paused, void property, awaiting landlord decision on two quotes (£1,370.00 and £1,700+VAT) with differing scope; no approval, no contractor assigned.

**2. What is the next action, who is it for, and through which channel?**

Approval request to landlord Langley by email (APR-101), follow-up chase 2025-05-09 on another channel.

**3. Does anything need a human decision, and why?**

No human escalation now; the decision is the landlord's. Escalate only if silence continues after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Langley","ticket_ref":"NBL-008-3466","decision_needed":"Check-out works at Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ only. Tw… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-05-09","purpose":"Chase landlord on a second channel (SMS/phone) for decision on the two quotes … | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A3 | `add_note` | {"entity":"NBL-008-3466","note":"Events 021 and 023 name other addresses (Juniper Mews, Meadow Row, Alder Lane, Willowmere Rd) so are not ap… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
