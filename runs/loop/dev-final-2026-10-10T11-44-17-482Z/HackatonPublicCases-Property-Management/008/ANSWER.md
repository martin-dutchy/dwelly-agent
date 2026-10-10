# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord's recent emails and our own chasers named other addresses and the 'assume cheaper' message isn't approval. I asked the landlord for an explicit decision on this flat's quotes and held the job to 9 May.

## Where the case stands
Paused/mp_time, void property. Two quotes held (£1,370.00 and £1,700 + VAT). No valid landlord decision. On hold for landlord until 2025-05-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a yes/no on the £1,370.00 quote for Flat 5, 55 Lantern Quay, noting carpet and tap scope differences | Langley, landlord | email | A1 ✅ |
| 2 | WAIT | Hold until 2025-05-09, then chase on a second channel | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Langley (landlord)** (verified)

> Your recent emails mention other addresses, so we can't treat them as a decision on Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ. For this flat only, we hold two quotes: £1,370.00 (no VAT itemised; scope says the bedroom carpet can stay and includes replacing the bath tap) and £1,700.00 + VAT. Do you approve the £1,370.00 quote for Flat 5, 55 Lantern Quay? Please reply yes or no, and say if you want the carpet replaced. The question about an earlier invoice is being checked separately. (£1370)
> 
> Options: Approve the £1,370.00 quote (recommended, subject to scope check on carpet and tap); Approve the £1,700.00 + VAT quote; Use your own contractor; Decline

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved and no contractor is instructed
- The request does not settle scope (carpet, tap) or the invoice question
- Cheaper quote's VAT status is not itemised

## Remaining work
- Landlord decision, then record it and assign/approve
- Confirm scope with contractor (carpet replacement, tap)
- Check the earlier-invoice question
- Chase Kendall quote document if needed

## Missing or unavailable information
- Landlord's explicit decision for this property
- Kendall's quote document (not seen)
- Invoice attachment-04 not seen in case text

## Conflicts between sources
- Landlord and agency emails (events 021, 023) name other addresses than ZZ2 4ZZ; not treated as about this job
- Inspection report dated Jan 2026 but signed April 2025; estimate says tap replaced, request says repair; carpet burn described as pre-existing

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Void property, quotes gathered (£1,370.00 and £1,700+VAT), awaiting a valid landlord decision. Scope of cheaper quote differs from request (carpet stays, tap replaced).

**2. What is the next action, who is it for, and through which channel?**

Approval request to Langley (landlord) by email, naming this property; hold with review 2025-05-09.

**3. Does anything need a human decision, and why?**

No escalation now; the landlord's decision is the gate. Escalate if still silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Langley","ticket_ref":"NBL-008-3466","decision_needed":"Your recent emails mention other addresses, so we can't treat them as a… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord replies named other properties; asked for explicit decision… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
