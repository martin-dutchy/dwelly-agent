# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The check-out works estimate is waiting on the landlord, who has not chosen between Eliza Bennett (£1,370.00, scope excludes bedroom carpet) and Kendall (£1,700.00 + VAT). I asked the landlord that one question on the email thread, asked whether their 4 May email was meant for this flat, and put the job on hold until 2025-05-08.

## Where the case stands
Paused on landlord decision (Waiting for Landlord, review 2025-05-08). Property Flat 5, 55 Lantern Quay is void (not tenanted), so no tenant messages. Two quotes are on file, and the landlord has not chosen one.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked the landlord (Langley) to choose between Eliza Bennett £1,370.00 and Kendall £1,700.00 + VAT, or decline, and noted that the £1,370 scope excludes replacing the burnt bedroom carpet. Also asked whether the 4 May email about other addresses was meant for this flat. | Langley, landlord | email | A1 ✅ |
| 2 | WAIT | Waiting for the landlord's decision; review on 2025-05-08 and chase by SMS or phone if still silent. | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Langley (landlord) via email, existing thread (event 023 email)** (verified)

> Hi Langley,
> 
> Re: check-out works at Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ (job NBL-008-3466).
> 
> We have two quotes on file for this flat:
> - Eliza Bennett: £1,370.00
> - Kendall: £1,700.00 + VAT
> 
> Please note the £1,370.00 estimate does not include replacing the burnt bedroom carpet, which was part of the original request. It says the main-room carpet can stay.
> 
> Could you reply with one of the following?
> 1. Yes, proceed with Eliza Bennett at £1,370.00.
> 2. Yes, proceed with Kendall at £1,700.00 + VAT.
> 3. No, do not proceed yet.
> 
> We are also checking whether the previous refurbishment invoice has been paid and will come back to you on that.
> 
> Your email of 4 May also mentioned other addresses. Could you confirm whether it was meant for this flat? Thank you.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor has been assigned or approved; no landlord approval exists yet.
- The £1,370 estimate is not confirmed to include the bedroom carpet, the bathroom flooring or the tap as the inspection describes them; scope is unverified.
- Whether the previous refurbishment invoice was paid is not established; the invoice attachment is listed but was not provided, so its contents are unknown.
- The inspection report's 5 January 2026 appointment date conflicts with its 3 April 2025 signature and today's date; the date is not verified.

## Remaining work
- Landlord to choose a quote or decline (owner: landlord, review 2025-05-08).
- Check internally whether the previous refurbishment invoice was paid and answer the landlord.
- Confirm the inspection report date and obtain the invoice file if it is needed.
- Once approved, assign the contractor, book the visit and record the result (owner: agency ops).
- Clarify the scope of the carpet and bath tap with the contractor if the landlord approves.

## Missing or unavailable information
- Landlord's decision on which quote, if any.
- Status of the previous refurbishment invoice (attachment-04 not supplied).
- Correct inspection date (report says 5 January 2026; signed 3 April 2025).

## Conflicts between sources
- The £1,370 estimate (attachment-02, Alder Compliance) excludes the bedroom carpet replacement that the request asked for, and it says the carpet can stay. The agency's 6 May email calls the same £1,370 quote from 'Eliza Bennett'. The provider name differs.
- The bath tap: the estimate includes replacing it, but the inspection describes a dripping tap needing repair.
- The inspection report is dated 5 January 2026 as its appointment date, but it was signed 3 April 2025, which is before today (2025-05-06). Taken as a date error to verify, not as fact.
- The 4 May and 23 May landlord-related emails name other addresses (Juniper Mews, Meadow Row, Alder Lane, Willowmere Road). They are not about this flat and are not approval.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

Paused at the landlord gate. The estimate was sent on 6 April, a second quote was requested, and two quotes exist (£1,370.00 and £1,700.00 + VAT). The landlord has not approved either. Outstanding: the landlord's choice, the invoice query, and the date and scope checks listed in the boundaries.

**2. 2. What is the next action, who is it for, and through which channel?**

Email to the landlord, Langley (ledger A1), asking which quote to proceed with or whether to decline, and whether their 4 May email was about this flat. Hold recorded until 2025-05-08 (ledger A2). No tenant message, because the flat is void.

**3. 3. Does anything need a human decision, and why?**

Not yet. The choice of contractor and spend belongs to the landlord, who has not answered. Escalate only if the landlord stays silent after the 2025-05-08 review and a second-channel chase, or if the invoice query needs accounts input.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 023 email)","ticket_ref":"NBL-00… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord to choose between Eliza Bennett £1,370.00 (scope excludes b… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
