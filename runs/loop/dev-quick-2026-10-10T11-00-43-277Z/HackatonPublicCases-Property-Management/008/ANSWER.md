# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The check-out works estimate is waiting on the landlord to choose between the £1,370 estimate and Kendall's £1,700 + VAT quote. Approval request APR-101 was raised and the job is on hold to 2025-05-09. No contractor has been instructed, and the landlord's question about the earlier invoice is still open.

## Where the case stands
Check-out works at Flat 5, 55 Lantern Quay (NBL-008-3466). Property is NOT TENANTED (void), so there is no tenant to contact. Two quotes are on file: £1,370 (Bennett / Alder Compliance estimate, 3 April 2025) and Kendall £1,700 + VAT. The landlord (Langley) has not chosen. The ticket is on hold for the landlord, review 2025-05-09.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord Langley to choose between the £1,370 estimate and Kendall's £1,700 + VAT quote, confirm whether the bedroom carpet should be replaced, and confirm the spend limit (approval APR-101 raised). | Langley, landlord | email | A1 ✅ |
| 2 | WAIT | Hold the job for the landlord's decision, with review on 2025-05-09. | internal | internal | A2 ✅ |
| 3 | OTHER | Check with accounts whether Kendall's invoice from the previous refurb has been paid, then answer the landlord's question. No invoice is on file. | internal (accounts) | internal | — |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Langley (landlord, Flat 5, 55 Lantern Quay) (landlord)** (verified)

> Choose which check-out works quote to approve for Flat 5, 55 Lantern Quay. Note the scopes differ: the £1,370 estimate (Alder Compliance, 3 April 2025) leaves the burnt/stained bedroom carpet in place, and includes replacing the bath tap, which the report describes as dripping (repair). The £1,700 + VAT quote from Kendall has no scope on file. Also confirm whether you want the bedroom carpet replaced, since the original request asked for it. Please also confirm the spend limit you want applied.
> 
> Options: Approve the £1,370 Bennett/Alder Compliance estimate, after we confirm its scope covers the bathroom flooring, plug, shelf and tap repair, and decide on the bedroom carpet separately; Approve Kendall at £1,700 + VAT, if you want the same contractor who did the previous refurb; Ask for a fresh quote covering the full original request including bedroom carpet replacement

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Approval request APR-101 does not mean the landlord has approved anything yet.
- No contractor has been instructed and no spend committed.
- The payment status of Kendall's earlier invoice is not established by any record here.
- Nothing confirms the bedroom carpet, bathroom flooring, shelf or plug scopes are covered by either quote.

## Remaining work
- Landlord to choose a quote and confirm the carpet scope (owner: landlord, review 2025-05-09).
- Confirm scope with the chosen contractor before instruction (owner: agency).
- Answer the landlord's invoice-payment question once accounts confirm (owner: accounts/agency).
- Check the Kendall quote scope and VAT treatment (owner: agency).
- Record the mis-filed emails (events 021, 023, 024) that mention other addresses and roof works, and get them corrected (owner: agency).

## Missing or unavailable information
- Landlord's decision on which quote to approve and the spend limit (none recorded on the property).
- Scope of Kendall's £1,700 + VAT quote.
- Whether Kendall's previous invoice was paid (no invoice on file).
- Whether the bedroom carpet should be replaced (the estimate excludes it).

## Conflicts between sources
- The property is recorded as NOT TENANTED, but the request talks about a tenant vacating. The void status was taken as current.
- The inspection report is dated 5 January 2026, but it was signed 3 April 2025 and today is 6 May 2025. The date is treated as an error and the report is treated as the check-out record.
- The estimate is from Alder Compliance (attachment) but the history says Bennett quoted £1,370. Both are treated as the same £1,370 quote, but the issuer needs confirming.
- The estimate says the bathroom tap is replaced, but the report says the tap is dripping (repair).
- Events 021, 023 and 024 mention other addresses (Juniper Mews, Alder Lane, Willowmere Road) and roof works. These appear to be misfiled, so they were not used for this job.
- The Kendall quote is recorded as £1,700 + VAT, and the VAT treatment of Bennett's £1,370 is not itemised.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Check-out inspection and estimates are complete. The landlord has not chosen between two quotes, so the job is on hold for landlord response. Outstanding: landlord decision on the quote and carpet scope, the spend limit, the invoice-payment question, and scope checks on both quotes.

**2. What is the next action, who is it for, and through which channel?**

Approval request APR-101 to landlord Langley (email, existing thread from event 009) asking them to choose a quote, confirm the carpet scope and state the spend limit. Internal check with accounts on whether Kendall's invoice was paid. Review the hold on 2025-05-09.

**3. Does anything need a human decision, and why?**

Yes, the landlord must choose the quote and approve spend, since no spend limit is recorded and the quotes exceed nothing we can approve alone. The bedroom carpet replacement and any tenant deposit deduction are also decisions for the landlord or a manager, as the property is void and the tenant has left.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"ticket_ref":"NBL-008-3466","landlord":"Langley (landlord, Flat 5, 55 Lantern Quay)","decision_needed":"Choose which check-out works quote … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord (Langley) to choose between the £1,370 estimate and Kendall… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
