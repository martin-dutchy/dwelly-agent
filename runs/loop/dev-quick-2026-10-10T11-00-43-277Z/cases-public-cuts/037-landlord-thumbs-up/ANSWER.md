# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's 👍 is not a usable answer to the question of who should arrange the shower cable repair, so it was recorded as unclear. The landlord was asked again in writing, the tenant was updated and asked for photos, and the ticket was placed on hold with a 2024-03-29 review. No contractor has been instructed.

## Where the case stands
Ticket NBL-037-landlord-thumbs-up is at init. Landlord was asked (event 003) whether they will arrange the shower cable repair themselves or have the agency organise it. Their only reply is a 👍 (event 007), which is unclear. No contractor has been approved or assigned. The ticket is on hold, waiting for the landlord, with a review on 2024-03-29. Tenant photos (requested in event 004) are also outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask the landlord to confirm in writing: arrange their own contractor, or have the agency organise the repair. Explain that the emoji alone does not say which. | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the repair is waiting on the landlord's decision, and ask for photos of the damaged cable and leak. | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Review the hold and chase the landlord if no written answer has arrived. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Freya (landlord) via email, existing thread (event 007 email)** (verified)

> Hi Freya,
> 
> Thank you for your reply. Could you please let us know in writing which you would prefer for the shower cable repair at Flat 14, 44 Lantern Quay:
> 
> 1. You arrange the repair yourself with your own contractor, or
> 2. We organise the repair on your behalf through our usual contractor.
> 
> Once we have your answer, we will move things forward straight away.
> 
> Kind regards,
> Northbridge Lettings

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza,
> 
> Thank you for reporting the leaking shower at Flat 14, 44 Lantern Quay. We are waiting for the landlord to confirm how they would like the repair arranged. We will update you as soon as we hear back.
> 
> If you can, please send a few photos of the damaged shower cable and where the leak is coming from. This will help the contractor prepare.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 does not establish which option the landlord chose, so no contractor was approved or assigned.
- Sending these messages does not mean the landlord has agreed to any spend or to a contractor.
- No cost, contractor or visit date has been confirmed.

## Remaining work
- Landlord to give a written choice (own contractor or agency-organised). Owner: agency ops, review 2024-03-29.
- If agency-organised: get landlord spend approval, then assign a contractor and book a visit.
- Tenant to send photos of the cable and leak (requested, not yet received).

## Missing or unavailable information
- Landlord's written choice between own contractor and agency-organised repair.
- Spend limit or approval for the repair (not on the property record).
- Tenant photos of the damaged cable and leak.

## Conflicts between sources
- Event 002 asks for approval of a provider and category, but event 005 says the landlord still needs to approve a contractor. Event 003 is the question actually put to the landlord, so I used it as the basis for the decision.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The ticket is at init and on hold, waiting for the landlord. The landlord's only reply is a 👍, which does not say whether they will arrange the repair themselves or have the agency organise it. No contractor is approved. Tenant photos are also outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord Freya (existing thread, event 007) asking for a written choice between their own contractor and an agency-organised repair. Email the tenant Eliza (existing thread, event 004) with an update and a request for photos. Review the hold on 2024-03-29.

**3. Does anything need a human decision, and why?**

Not yet. The decision belongs to the landlord, and it cannot be taken from an emoji. Escalate only if the landlord does not reply by the review date or if the repair turns out to be urgent (no emergency is reported).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"\"👍\" (email, 2024-03-27 11:21:48 UTC, event 007), in rep… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-037-… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-037-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord's 👍 (event 007) is unclear. Need a written c… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |
| A5 | `resume_auto` | {"ticket_ref":"NBL-037-landlord-thumbs-up"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after resume_auto |

## Failed or unverified actions
_None._
