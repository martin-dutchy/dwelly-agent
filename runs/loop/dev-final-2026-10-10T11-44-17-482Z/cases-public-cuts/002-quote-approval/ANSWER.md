# Case 002: Blocked toilet at Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ: ANSWER

**Decision:** action_taken · **Severity:** urgent

The provider attended and says the toilet needs replacing, with a quote. The quote went to the landlord, but we haven't seen its amount. I asked the provider to resend it, updated the tenant, and put the job on hold with a review on 13 Aug.

## Where the case stands
Visit done; Riverside Works reports toilet needs replacing (quote, photos not visible to us). Quote sent to landlord at event 017, awaiting approval. Ticket on hold, review 2026-08-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Riverside Works to resend quote (amount, VAT, scope, timing) and photos; no work until approved | Riverside Works, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: quote with landlord, no work until approved, next update by 13 Aug | Noah Turner, tenant | email | A2 ✅ |
| 3 | WAIT | Hold awaiting landlord approval, review 13 Aug; chase on second channel if silent | Landlord (Quinn) | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Riverside Works (contractor) via email, existing thread (event 016 email)** (verified)

> - Thanks for the visit update. The quote and photos did not come through on our side. Please resend the quote as a PDF, or reply in plain text, with the total, whether it includes VAT, what it covers (new toilet and cistern, repiping) and the estimated completion time.
> - Please also resend the photos.
> 
> Why: We need the quote figure and scope to record it and to support the landlord's approval decision. Please do not start work until we confirm approval.

**A2 · send_message → Noah Turner (tenant) via email, existing thread (event 007 email)** (verified)

> Hello Noah, Riverside Works have visited about your blocked toilet. They report the toilet needs to be replaced, as removing it risks damaging it. They have sent a quote, which we have passed to your landlord for approval. We are also asking Riverside to resend the full details. No work will start until the landlord has approved. We will update you by 13 August at the latest. If you have no other working toilet, please tell us.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No quote recorded: amount and scope not seen.
- No approval of spend; landlord's earlier approval was only to attend.
- Visit date not independently reconciled (8 vs 9 Aug), though the provider reports attending.

## Remaining work
- Landlord decision on quote (agency awaiting)
- Riverside to resend quote and photos
- record_quote then approve_quote after landlord approval
- Record work result, then invoice and close

## Missing or unavailable information
- Quote amount, VAT and scope
- Photos and report
- Whether tenant has another working toilet

## Conflicts between sources
- Appointment date: event 009 says next day (9 Aug); events 010-013 say 8 Aug. The provider confirms attending but gives no date.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

The visit happened and the provider quoted for a new toilet and cistern. The landlord has been asked to approve (event 017) and has not replied. Outstanding: the landlord's decision, the quote details and photos, then the work, invoice and closing.

**2. What is the next action, who is it for, and through which channel?**

Ask Riverside Works by email to resend the quote and photos. Tell the tenant by email. Wait for the landlord, with a review on 13 Aug and a chase by SMS or phone if still silent.

**3. Does anything need a human decision?**

No. The landlord's approval is the pending decision and it is routine, so there is no escalation yet. Escalate as P2 if the landlord stays silent after the chase and the tenant has no working toilet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord event 017; awaiting approval. Quote… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |

## Failed or unverified actions
_None._
