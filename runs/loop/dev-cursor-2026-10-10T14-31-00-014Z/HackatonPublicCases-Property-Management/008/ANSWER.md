# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

Check-out works job awaiting landlord's choice between two quotes. The landlord's recent emails name other properties, and our "I assume cheaper" message is not approval, so I sent a clear request for this flat, noted the conflicts and scheduled a chase for 9 May.

## Where the case stands
Paused/on hold for landlord. Property empty. Two quotes in (£1,370; £1,700+VAT), no landlord decision for this flat, no contractor assigned, no spend approved.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to choose a quote for Flat 5, 55 Lantern Quay explicitly, by 9 May, flagging scope differences and the invoice query | Langley, landlord | email | A1 ✅ |
| 2 | WAIT | Follow-up 9 May to chase landlord on a second channel and check previous invoice with accounts | Langley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Langley (landlord)** (verified)

> Which quote to proceed with for the check-out works at Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ (empty property). Your email of 4 May referred to other addresses (Alder Lane, Willowmere Road), so we can't treat it as a decision on this flat. Please reply by 9 May. (£1370)
> 
> Options: Proceed with the £1,370.00 quote (no VAT shown on the estimate we hold). Note it keeps the burnt bedroom carpet and replaces the bath tap, which differs from our original request; Proceed with the £1,700.00 + VAT quote from Kendall (we have not yet checked its scope against the request); Use your own contractor; Ask us to get the quotes re-scoped like-for-like first
> 
> Update: Nobody is living at the flat so no tenant is affected. Our 6 May email asked whether to proceed with the cheaper option; we need your explicit answer for this property before instructing anyone. You also asked whether the previous refurb contractor's invoice has been paid; we are checking this with accounts and will report back. Separately, the roof works/inspection you mention relate to another address and are not covered here.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking for a decision does not approve any quote or spend
- No contractor assigned; scopes of the quotes are not like-for-like
- Nothing is established about whether the previous refurb invoice was paid

## Remaining work
- Landlord decision on quote (landlord)
- Obtain and check Kendall's quote document and the supplier name on the £1,370 estimate (agency)
- Check status of previous refurb invoice with accounts (agency)
- Assign contractor after approval

## Missing or unavailable information
- Landlord's explicit decision for this property
- Kendall quote document/scope
- Whether the previous invoice was paid
- Contents of attachment-04 invoice

## Conflicts between sources
- Events 021/023 name other properties, so not about this job
- Estimate headed Alder Compliance vs Eliza Bennett in event 024
- Estimate says carpet can stay and tap replaced, contrary to the request
- Inspection report dated 5 Jan 2026 but signed 3 Apr 2025

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Empty property, on hold for the landlord. Two quotes received; the landlord's decision on this flat is outstanding, plus the scope comparison and invoice query.

**2. What is the next action, for whom, via which channel?**

Landlord approval request APR-101 to Langley by email, reply wanted by 9 May; follow-up FUP-103 on 9 May.

**3. Does anything need a human decision?**

Not yet. The landlord owns the quote decision; no escalation needed unless they stay silent after the 9 May chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Langley","ticket_ref":"NBL-008-3466","decision_needed":"Which quote to proceed with for the check-out works at Flat 5, 55 Lante… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-008-3466","note":"Route: our contractors quoting, landlord decision pending. Events 021 and 023 name other properties (Junipe… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-05-09","party":"Langley, landlord","purpose":"Chase landlord for explicit decision on Flat 5, 55… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
