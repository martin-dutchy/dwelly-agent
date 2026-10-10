# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The job is paused on a void property while the landlord decides between two quotes. The landlord's last reply named other properties, so it is not approval. I asked on the existing thread which property they meant and for a yes/no on the £1,370 quote, and set a hold with review on 2025-05-09.

## Where the case stands
Paused (void property), on hold waiting for landlord. Two quotes (£1,370.00 and £1,700.00+VAT) are with the landlord. No approval on record. Review 2025-05-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm the reply was about Flat 5, 55 Lantern Quay and give a yes/no on the £1,370 quote | Langley, landlord | email | A3 ✅ |
| 2 | WAIT | Hold for landlord, review 2025-05-09 | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A3 · request_information → Langley (landlord) via email, existing thread (event 023 email)** (verified)

> - Your last email seemed to be about other properties. Did you mean to reply about Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ?
> - For Flat 5, 55 Lantern Quay only: do you approve the £1,370.00 quote (no VAT shown) to go ahead? Yes or no please. It says the bedroom carpet can stay, whereas the original request was to replace it. The other quote is £1,700.00 + VAT.
> 
> Why: Landlord reply names different properties so cannot be treated as approval; no contractor can be instructed yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The request does not approve any quote or assign a contractor
- Nothing here settles which quote is chosen, the scope (carpet, tap) or who pays
- The landlord's question about the previous refurb invoice is not answered

## Remaining work
- Landlord to confirm property and approve a quote; then record decision and assign contractor (agency, review 2025-05-09)
- Check whether the previous refurb invoice was paid (accounts)
- Clarify scope: carpet replacement and tap replacement differ from the original request
- No tenant messages as property is void

## Missing or unavailable information
- Landlord approval for this property
- Quote documents: provider name mismatch (Eliza Bennett vs Alder Compliance) and Kendall quote not seen
- attachment-04 invoice not visible

## Conflicts between sources
- Landlord email and our chase name other properties, not Flat 5, 55 Lantern Quay; not treated as about this job
- Quote supplier: email says Eliza Bennett, attached estimate says Alder Compliance
- Inspection report dated 5 Jan 2026 but signed 3 Apr 2025
- Estimate leaves the carpet and replaces the tap, against the original request

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

On hold for the landlord. Two quotes (£1,370.00 and £1,700.00+VAT) are sent and no valid approval exists, because the landlord's reply and one earlier chase named other properties. Scope questions and the previous invoice query remain open.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord (Langley) on the existing thread asking them to confirm the property and say yes or no to the £1,370 quote. Already sent (A3). Hold review 2025-05-09.

**3. Does anything need a human decision, and why?**

Not yet. The landlord must decide on the quote. If there is no answer by the review date, chase on a second channel. The previous refurb invoice question may need accounts.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Waiting for landlord to confirm which property their last email mean… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A2 | `add_note` | {"entity":"NBL-008-3466","note":"Events 021 and 023 name other addresses, not this property; not treated as approval. Quote conflict: email … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `request_information` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 023 email)","questions":["Your l… | 1 | ✅ verified | REQ-102 found in the request_information log |

## Failed or unverified actions
- first request_information attempt: Blocked by policy for naming other addresses; resent without them (A3).
