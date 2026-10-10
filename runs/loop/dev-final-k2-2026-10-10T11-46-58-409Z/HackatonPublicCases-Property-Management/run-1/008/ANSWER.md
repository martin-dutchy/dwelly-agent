# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord's recent replies and our chasers named other properties, so no valid approval exists for this flat. I asked the landlord one clear question for this property, noted the scope gaps, and put the job on hold to 9 May.

## Where the case stands
Void property, paused at provider/quote stage. Two quotes exist; no valid landlord decision. Waiting on landlord, review 2025-05-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to choose a quote for Flat 5, 55 Lantern Quay only, and confirm carpet scope | Langley, landlord | email | A1 ✅ |
| 2 | WAIT | Hold until 2025-05-09 for landlord reply | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Langley (landlord)** (verified)

> Your last two emails named other properties (Juniper Mews, Meadow Row, Alder Lane, Willowmere Road), so we can't treat them as a decision for Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ. For this flat only: do you approve one of the two quotes for the check-out works? Quote 1: £1,370.00 (no VAT shown), but it says the bedroom carpet can stay, so it does not replace the burnt carpet you asked for, and it includes replacing the bath tap. Quote 2: £1,700.00 + VAT. We haven't confirmed that the scopes match. Please also confirm if you want the burnt carpet replaced. On your invoice question, we'll check it with accounts and come back to you separately.
> 
> Options: Approve the £1,370.00 quote (carpet stays as is); Approve the £1,700.00 + VAT quote; Ask the contractor to re-quote including carpet replacement; Use your own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no quote approved
- Request does not establish that the quotes are like-for-like
- Invoice-paid question not answered

## Remaining work
- Landlord decision on quote
- Check the earlier refurb invoice status with accounts
- Obtain the second quote document and confirm scope incl. carpet
- Chase landlord on second channel after 2025-05-09 if silent

## Missing or unavailable information
- Landlord decision for this property
- Second (£1,700+VAT) quote document
- Contents of attachment-04-invoice.pdf

## Conflicts between sources
- Events 021 and 023 name other properties, not this one
- Quote supplier named Eliza Bennett in event 024 but Alder Compliance in the attachment
- Inspection report dated 5 Jan 2026 but signed April 2025
- Quote includes tap replacement and leaves the carpet, against the original request

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Paused (void property). Two quotes (£1,370 and £1,700+VAT) await a landlord decision; none given for this property. The cheaper quote excludes carpet replacement.

**2. What is the next action, who is it for, and through which channel?**

Approval request to the landlord by email (via agency record), hold to 2025-05-09.

**3. Does anything need a human decision?**

No; the decision is the landlord's. Nothing to escalate yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Langley","ticket_ref":"NBL-008-3466","decision_needed":"Your last two emails named other properties (Juniper Mews, Meadow Row, … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Waiting for landlord decision on quotes for this property; earlier r… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-008-3466","note":"Events 021 and 023 name other addresses; not treated as approval. Quote £1,370 (attachment-02, Alder Compli… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Failed or unverified actions
_None._
