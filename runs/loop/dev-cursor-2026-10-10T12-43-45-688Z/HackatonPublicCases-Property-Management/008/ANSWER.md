# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Void property awaiting landlord approval of one of two quotes. The landlord's replies and our chaser named other addresses, so they are not approval. I asked a single yes/no question on this property, noted the discrepancies and held to 2025-05-09.

## Where the case stands
Stage mp_time, property void. Two quotes (£1,370 and £1,700+VAT) with the landlord. No usable approval: the landlord's last reply named other properties. Held for landlord until 2025-05-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the landlord a yes/no question: approve the £1,370 quote for Flat 5, 55 Lantern Quay (other quote £1,700+VAT); flag that the carpet is left in place | Langley, landlord | email | A4 ✅ |
| 2 | WAIT | Hold for landlord, review 2025-05-09, chase on a second channel then | Langley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A4 · request_information → Langley (landlord) via email, agency landlord record** (verified)

> - Your last reply and our earlier chase referred to other properties, so we can't treat them as an answer for this job. For Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ only: do you approve the £1,370.00 quote (no VAT itemised) so we can instruct that contractor - yes or no? The other quote is £1,700.00 + VAT. Note the £1,370 estimate leaves the burnt bedroom carpet in place, unlike the original request.
> 
> Why: No usable approval on record for this property.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The question does not approve any quote or assign a contractor.
- Nothing is decided on scope, carpet, or who pays (tenant deposit vs landlord).
- The invoice attachment-04 and Kendall's quote document were not seen.

## Remaining work
- Landlord yes/no needed, then record the decision and assign the contractor (owner: agency).
- Confirm who quoted £1,370, and the scope (carpet, tap).
- Check whether the earlier-refurb invoice mentioned in event 024 has been paid; it is not seen here.
- Fix cross-property wording in the chasers.

## Missing or unavailable information
- Landlord approval for this property
- Kendall quote document
- Invoice attachment-04 contents

## Conflicts between sources
- Events 021 and 023 name other properties; not treated as about this job.
- The £1,370 quoter is named Eliza Bennett in event 024 but Alder Compliance in the estimate; I trusted the document for the name.
- Inspection report dated 5 Jan 2026 vs ticket April 2025.
- The estimate leaves the carpet and replaces the tap, differing from the request.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Paused and held for the landlord. Two quotes exist, £1,370 and £1,700+VAT. Landlord approval for this property is outstanding, because the replies named other properties.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval question went to the landlord by email (REQ-103). Chase by SMS or phone on 2025-05-09 if there is no reply (follow-up FUP-102).

**3. Does anything need a human decision?**

No. Routine hold awaiting the landlord. Escalate only if the landlord stays silent after the second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"NBL-008-3466","note":"Events 021 and 023 name other addresses; not treated as approval. Event 024 names the £1,370 quoter as Eliz… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Waiting for landlord to confirm approval of a quote for this propert… | 1 | ❌ failed | Ticket NBL-008-3466: hold reason is none |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-05-09","purpose":"Chase landlord on second channel (SMS/phone) if no yes/no on quote for Flat 5,… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A4 | `request_information` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your last reply a… | 1 | ✅ verified | REQ-103 found in the request_information log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Waiting for landlord yes/no on quote for this property","review_on":… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
- A2: First hold was not applied; retried and verified as A5.
- A3: Follow-up call timed out but read-back shows FUP-102 in place; not retried.
