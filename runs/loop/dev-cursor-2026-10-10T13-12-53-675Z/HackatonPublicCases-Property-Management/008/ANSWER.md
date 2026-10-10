# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Void property check-out works with two quotes awaiting landlord decision. The landlord's recent emails and our event 024 mixed in other addresses and 'I assume', so there is no usable approval. I sent a single clear approval request for Flat 5, 55 Lantern Quay, noted the conflicts and set a follow-up for 2025-05-09.

## Where the case stands
Paused (void property), waiting on landlord. Two quotes received; no valid landlord approval for this property; no contractor instructed for works.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a clear yes/no on the £1,370 quote for Flat 5, 55 Lantern Quay by 2025-05-09, flagging carpet exclusion and the Kendall alternative | Langley, landlord | email | A1 ✅ |
| 2 | WAIT | Chase landlord on a second channel on 2025-05-09 if no reply | Langley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Langley (landlord)** (verified)

> Check-out works at Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ only (empty property). Your last emails named other addresses, so we can't treat them as approval for this flat. Two quotes: (1) £1,370.00, no VAT itemised, per the estimate on file from Alder Compliance (our note says Eliza Bennett, which we are checking). Scope: bathroom sand/fill/damp paint, paint main-room walls and ceiling, replace bathroom lino, repair plug socket and shelf, replace bathroom tap. It says the bedroom carpet can stay, so the burnt carpet replacement you asked for is not included. (2) £1,700.00 + VAT from Kendall (we have not seen the itemised scope). Please reply with a clear yes/no: do you approve the cheaper £1,370.00 quote for Flat 5, 55 Lantern Quay? Or tell us if you want carpet replacement added or the Kendall quote instead. We need your reply by 2025-05-09. (£1370)
> 
> Options: Approve £1,370.00 quote (recommend, after confirming carpet scope); Approve £1,370.00 and ask for carpet replacement to be priced; Approve Kendall £1,700 + VAT; Arrange your own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking for approval does not approve spend or instruct a contractor
- Does not confirm who the £1,370 quote is from or that carpet replacement is covered
- Does not settle the landlord's question about the unpaid previous refurb invoice

## Remaining work
- Landlord decision (agency, awaiting reply)
- Confirm quote provider name and scope; obtain Kendall's itemised quote
- Accounts to check the previous refurb invoice query
- Record quote and assign contractor after approval

## Missing or unavailable information
- Landlord approval for this property
- Provider identity for £1,370 quote (Eliza Bennett vs Alder Compliance)
- Kendall quote document/scope
- Whether carpet replacement is wanted

## Conflicts between sources
- Events 021/023/024 name other properties; treated as not about this job.
- Quote provider: Eliza Bennett (event 024) vs Alder Compliance (attachment-02); trusted the document for the name but flagged it.
- Inspection report dated 5 Jan 2026 but signed April 2025.
- Estimate replaces the bathroom tap and keeps the carpet, differing from the original request.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Paused as the property is void; held for the landlord. Quotes of £1,370 and £1,700+VAT exist, with no valid approval. Outstanding: landlord decision, quote provider and scope confirmation, carpet scope, previous invoice query.

**2. What is the next action, who is it for, and through which channel?**

Approval request APR-101 to landlord Langley by email, reply wanted by 2025-05-09, with a second-channel chase scheduled that day.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides on spend. Accounts may need to look at the earlier refurb invoice query; no escalation raised now.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Langley","ticket_ref":"NBL-008-3466","decision_needed":"Check-out works at Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ only (em… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-008-3466","note":"Landlord emails events 021/023 and agency email 024 reference other properties (Juniper Mews, Meadow Row, A… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-05-09","party":"Langley (landlord)","purpose":"Chase landlord on second channel for approval of … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
