# Case 008: Check-Out Works: ANSWER

**Decision:** action_taken · **Severity:** routine

The job is waiting on the landlord to choose between two quotes (£1,370.00 from Eliza Bennett and £1,700.00 + VAT from Kendall) and to confirm the carpet scope. I emailed the landlord on the existing thread to ask, said payment is not yet confirmed, and held the job until 2025-05-08.

## Where the case stands
Ticket NBL-008-3466 is on hold (stage mp_time) waiting on the landlord, Langley. The property is void (not tenanted). No landlord decision is recorded and no contractor is instructed. The landlord's latest email (event 024) asks for a choice between two quotes and an invoice check, and has not been answered.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord which quote to proceed with (Eliza Bennett £1,370.00 or Kendall £1,700.00 + VAT), whether the bedroom carpet replacement is included, and answer the invoice question (no paid invoice on record; checking). | Langley, landlord | email | A1 ✅ |
| 2 | WAIT | Hold the job for the landlord's answer with a review date of 2025-05-08. | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Langley (landlord) via email, existing thread (event 024 email)** (verified)

> Hi Langley,
> 
> Thank you for your message about Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ.
> 
> We have not yet instructed anyone for this job, so we are waiting for your decision.
> 
> Two different figures are on file. The estimate we hold (3 April 2025, from Alder Compliance) is £1,370.00 and does not include the bedroom carpet replacement. Your email lists Eliza Bennett at £1,370.00 and Kendall at £1,700.00 + VAT. Please confirm which quote you would like us to proceed with, and whether the bedroom carpet replacement should be included.
> 
> On the invoice: we have no paid invoice recorded for this job, so we cannot yet confirm whether the contractor has been paid. We are checking our records and will come back to you.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the question does not approve any quote or spend.
- No contractor has been assigned, and none should be until the landlord gives a clear yes.
- The £1,370 estimate excludes the bedroom carpet replacement, so it does not cover the full original scope.
- Nothing has been established about whether any invoice was paid, the cause of the carpet burn damage, or who should pay for it.

## Remaining work
- Landlord to choose the quote and confirm scope (owner: Langley). Review 2025-05-08.
- Check the payment status of the contractor invoice (attachment-04-invoice.pdf is listed but not in the inputs).
- Once approved, instruct the chosen contractor, book the visit, and record the work result.
- Decide deposit or tenant recharge for the check-out damage once costs are known.

## Missing or unavailable information
- Landlord's decision on which quote to use.
- Whether the bedroom carpet replacement is in scope.
- Invoice attachment-04 is not in the inputs, so no payment status can be given.
- No spend limit is recorded on the property file.

## Conflicts between sources
- Event 024 names Eliza Bennett at £1,370.00 and Kendall at £1,700.00 + VAT. The attachment estimate is from Alder Compliance at £1,370.00 and excludes the bedroom carpet. The contractor names do not match.
- Event 024 says 'I assume you wish to proceed with the cheaper option', which is not an approval.
- The inspection reports are dated 5 January 2026, but the request and signature are April 2025, and today is 2025-05-06.
- Events 021, 023 and 024 mention other addresses and roof works. These are not this property, so I did not act on them.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Paused at mp_time, waiting on the landlord. No approval is recorded and no contractor has been instructed. Outstanding: the landlord's choice of quote, confirmation of the carpet scope, and the invoice payment question.

**2. What is the next action, who is it for, and through which channel?**

Email to Langley (landlord) asking which quote to proceed with and whether the bedroom carpet is included (ledger A1). The job is held until 2025-05-08 (ledger A2). No contractor is being assigned yet.

**3. Does anything need a human decision, and why?**

Not yet. The choice belongs to the landlord, who was asked this run. Escalate only if the landlord stays silent past the chase window (after a second-channel chase).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 024 email)","ticket_ref":"NBL-00… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord to confirm which quote to proceed with (Eliza Bennett £1,37… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |

## Failed or unverified actions
_None._
