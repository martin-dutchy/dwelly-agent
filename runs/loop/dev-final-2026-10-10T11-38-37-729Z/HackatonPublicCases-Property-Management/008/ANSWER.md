# Case 008: Check-Out Works: ANSWER

**Decision:** needs_info · **Severity:** routine

Check-out works job is stuck at the landlord gate. The landlord's reply names other properties, so it is not approval. I asked the landlord to confirm the property and the decision, noted the discrepancies and set a chase.

## Where the case stands
Paused (property void). Quote loop: two quotes (£1,370.00; £1,700.00 + VAT) with landlord. Landlord's last reply names other properties, so no valid approval. Waiting on Langley; hold in place.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm the property, approve or decline the £1,370 quote, and say whether to add carpet replacement | Langley, landlord | email | A3 ✅ |
| 2 | WAIT | Chase landlord on a second channel on 2025-05-09 if no reply | Langley, landlord | internal | A2 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Langley (landlord) via email, existing thread (event 023 email)** (verified)

> - Your last email seems to be about other properties. Did you mean to reply about Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ?
> - For Flat 5, 55 Lantern Quay only: do you approve the £1,370.00 quote (no VAT shown), yes or no? The other quote is £1,700.00 + VAT.
> - The £1,370.00 scope leaves the burnt bedroom carpet in place. Do you want the carpet replacement added?
> 
> Why: Your reply cannot be treated as approval for this job until the property is confirmed; no spend is committed meanwhile.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval recorded and no contractor assigned or spend committed
- The question to the landlord does not decide which quote is chosen
- The unpaid previous-refurb invoice question is not resolved

## Remaining work
- Landlord decision on quote and carpet scope (owner: landlord/agency)
- Confirm provider identity for the £1,370 quote (Alder Compliance vs Eliza Bennett)
- Record quotes once confirmed; assign contractor after approval
- Obtain the invoice PDF (attachment-04) if needed
- Chase on 2025-05-09

## Missing or unavailable information
- Landlord's decision for this property
- Provider name on £1,370 quote
- Contents of attachment-04-invoice
- Whether the previous refurb invoice was paid

## Conflicts between sources
- Landlord emails (events 021 and 023) name other properties, not Flat 5, 55 Lantern Quay
- £1,370 quote: attachment is from Alder Compliance, event 024 says Eliza Bennett
- Inspection report dated 5 Jan 2026 but signed April 2025
- Quote scope omits the carpet replacement requested and includes a tap replacement

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Paused, void property, two quotes with the landlord. Outstanding: valid landlord decision (the reply named other addresses), carpet scope gap, provider name mismatch, and an invoice question.

**2. What is the next action, who is it for, and through which channel?**

Landlord Langley, by email on the existing thread (REQ-103): confirm the property, approve or decline the quote, and say whether to add the carpet. Chase on 2025-05-09 on a second channel.

**3. Does anything need a human decision, and why?**

Not at present. The landlord must decide; no escalation unless the chase on 2025-05-09 goes unanswered.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"NBL-008-3466","note":"Events 021 and 023 name other addresses, not Flat 5, 55 Lantern Quay; not treated as approval. Quote £1,370… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-05-09","party":"Langley, landlord","purpose":"Chase landlord on a second channel (SMS/phone) for… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A3 | `request_information` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 023 email)","questions":["Your l… | 1 | ✅ verified | REQ-103 found in the request_information log |

## Failed or unverified actions
- A2: API reported a timeout but read-back showed FUP-102 in place; not retried. A first request_information was blocked by policy for naming other addresses; resent with the address removed (A3).
