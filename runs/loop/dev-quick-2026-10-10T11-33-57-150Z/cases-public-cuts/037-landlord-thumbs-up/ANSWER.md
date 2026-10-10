# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord replied to the repair question with only a 👍, which does not say whether they want our contractor or their own, so it is recorded as unclear. I asked the landlord a yes/no question and told the tenant that nothing is booked yet and asked for photos, then put the job on hold until 2024-03-28.

## Where the case stands
Ticket NBL-037-landlord-thumbs-up (Flat 14, 44 Lantern Quay) is at the landlord gate, still in init with no provider assigned. The landlord's only reply (event 007, 👍) is not usable approval. The ticket is on hold, waiting for the landlord, with a review date of 2024-03-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask the landlord a yes/no question: use our contractor (YES) or arrange the repair themselves (NO), since the 👍 does not say which. | Freya, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the landlord's decision is awaited, nothing is booked yet, and ask for photos of the damaged cable and leak. | Eliza, tenant | email | A4 ✅ |
| 3 | WAIT | Hold the job with a review date of 2024-03-28 to chase the landlord if no clear reply arrives. | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Freya (landlord) via email, existing thread (event 003 email)** (verified)

> Hi Freya,
> 
> Thank you for your reply. We received a thumbs-up, which doesn't tell us which option you'd like for the shower cable repair at Flat 14, 44 Lantern Quay.
> 
> Please reply YES if you would like us to arrange the repair through our contractor, or NO if you would prefer to arrange it yourself.
> 
> Kind regards,
> Northbridge Lettings

**A4 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza,
> 
> Thank you for reporting the shower problem at Flat 14, 44 Lantern Quay. We have asked the landlord how they would like the repair arranged. We will be in touch once we have their decision. Nothing is booked yet.
> 
> If you can, please send a few photos of the damaged shower cable and where the leak is coming from. This will help us arrange the right repair.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 is not approval, so no contractor has been instructed and no spend has been approved.
- Nothing is booked. No visit date exists.
- The landlord's preferred option (ours or their own) is not known.
- The tenant's photos have not been received, and the cause of the leak is not yet confirmed.

## Remaining work
- Landlord to answer YES (our contractor) or NO (own contractor). Owner: agency, chase on 2024-03-28 if no reply.
- If YES: assign a contractor, book the visit, and get the tenant's access arrangements. If NO: record own_contractor, tell the tenant, and ask for the contractor's name and date.
- Tenant photos outstanding (requested).

## Missing or unavailable information
- Landlord's clear decision on who does the repair (the 👍 is ambiguous).
- Tenant's photos of the damaged cable and leak.
- Spend limit and preferred contractor: get_property returned only the address, with no limit or contractor on file.

## Conflicts between sources
- The landlord's 👍 could be read as approval, but it does not say which option (our contractor or own). Treated as unclear, per policy.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Stage is provider selection, with no provider assigned. The landlord was asked at event 003 whether they want to arrange the repair or have the agency do it. Their only reply, the 👍 at event 007, is unclear and not approval. Outstanding: the landlord's clear decision, the tenant's photos, and the contractor and visit once approved.

**2. What is the next action, who is it for, and through which channel?**

Email to Freya (landlord) asking YES for our contractor or NO for their own (A3). Email to Eliza (tenant) saying nothing is booked and asking for photos (A4). Job on hold until 2024-03-28 for chasing (A5).

**3. Does anything need a human decision, and why?**

Not yet. The decision is the landlord's, and they have been asked a single clear question. Escalation is not warranted until they have had a chance to reply and the 2024-03-28 review has passed without an answer.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"037","decision":"unclear","evidence_quote":"👍","source":"history.md event 007, email from Landlord to Northbridge Lettings, … | 1 | ❌ failed | Ticket 037 not found on read-back |
| A2 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"history.md event 007, email from Landlord to… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A3 | `send_message` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"existing thread (event 003 email)","ticket_ref":"NBL-037-… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-037-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord's 👍 (event 007) is unclear. Asked a yes/no q… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
- A1: First record_landlord_decision used the wrong ticket ref '037'; not found. Retried with the correct ref NBL-037-landlord-thumbs-up (A2), which verified.
