# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord's replies referred to other properties and the agency's own message only assumed the cheaper quote, so no approval exists. I sent one clear approval request for this flat, held the job to 2025-05-09 and noted the conflicts.

## Where the case stands
Paused/mp_time, property void. Two quotes (£1,370.00; £1,700.00 + VAT) with the landlord. No valid approval for this property. Held for landlord to 2025-05-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm, for Flat 5 Lantern Quay only, which quote to proceed with, and whether the earlier refurb invoice is paid | Langley, landlord | email | A1 ✅ |
| 2 | WAIT | Hold for landlord, review 2025-05-09 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Langley (landlord)** (verified)

> Your last two emails named other properties, so I can't treat them as an answer for Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ (empty). For this flat only, please confirm which quote to proceed with: £1,370.00 (no VAT shown; the estimate says the bedroom carpet can stay and includes replacing the bathroom tap) or £1,700.00 + VAT (Kendall). Please also say whether the earlier refurb invoice mentioned has been paid. (£1370)
> 
> Options: Proceed with the £1,370.00 quote (our recommendation is to confirm its scope first: it leaves the burnt carpet); Proceed with the £1,700.00 + VAT quote; Use your own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The approval request does not approve any quote or assign a contractor
- No spend committed
- Quotes not yet formally recorded; attachment-04 invoice not seen

## Remaining work
- Landlord to choose quote; then record decision, assign/approve
- Clarify quote scopes (carpet, tap) and the provider name mismatch
- Chase on second channel after 2025-05-09 if no reply

## Missing or unavailable information
- Landlord decision for this property
- Whether previous refurb invoice paid
- Contents of invoice attachment

## Conflicts between sources
- Landlord messages (events 021, 023) name other properties
- Inspection report dated Jan 2026 but signed Apr 2025
- Quote provider names differ (Alder Compliance estimate vs Eliza Bennett/Kendall in event 024)
- Estimate leaves carpet and replaces tap, differing from request

## Answers to the case questions
**1. Where does this case stand?**

Void property, paused, two quotes awaiting the landlord's decision. Nothing approved or assigned.

**2. Next action?**

Email to landlord Langley asking for explicit choice for this property (done, APR-101); wait until 2025-05-09.

**3. Human decision needed?**

No. Routine landlord approval; escalate only if the landlord stays silent after a chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Langley","ticket_ref":"NBL-008-3466","decision_needed":"Your last two emails named other properties, so I can't treat them as a… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Awaiting landlord's explicit choice of quote for Flat 5, 55 Lantern … | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-008-3466","note":"Events 021 and 023 name other addresses; not approval for this job. Event 024 'I assume cheaper option' is … | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Failed or unverified actions
_None._
