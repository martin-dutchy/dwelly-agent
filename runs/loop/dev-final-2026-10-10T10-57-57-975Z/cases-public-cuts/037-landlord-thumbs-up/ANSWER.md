# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord answered an either/or question with a thumbs-up emoji, which is not a usable approval. I recorded it as unclear, asked again, updated the tenant with safety advice and a timescale, and put the job on hold. No human decision is needed yet.

## Where the case stands
Stage init, on hold (Waiting for Landlord, review 2024-03-29). Landlord's reply was only a thumbs-up emoji, recorded as unclear. No contractor assigned. Tenant photos outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to reply clearly: agency arranges (with any spend cap) or own contractor | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant on pending approval, 14-day routine target, interim safety advice, photos still wanted | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until landlord answers; review 2024-03-29 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Freya (landlord) via email, existing thread (event 007 email)** (verified)

> Hi Freya, thanks for your reply. We received a thumbs-up but want to be sure we do the right thing, as we asked a either/or question about the leaking shower cable. Please reply with either: (1) "Please arrange it" – we will instruct our contractor to replace the shower cable/hose (let us know a maximum spend if you have one), or (2) "I will arrange it myself". We'll go ahead as soon as we hear from you. Kind regards, Northbridge Lettings

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update: we're waiting for your landlord to confirm how the shower repair will be arranged, and we've asked them to reply. Our target for routine repairs is within 14 days, and we'll book a visit as soon as it's approved. In the meantime, please avoid using the shower if it is leaking, and keep any water away from sockets or electrics. If water is near electrics or you see sparks, switch off at the fuse box and call 999 if in danger. Photos of the cable and the leak would still help. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the emoji as unclear does not approve the repair or any spend
- No contractor assigned and no visit booked
- Does not confirm the cause or who pays

## Remaining work
- Landlord to give a clear decision; then assign a contractor and book a visit (agency)
- Tenant photos outstanding
- Chase landlord on 2024-03-29 if no reply

## Missing or unavailable information
- Clear landlord decision and any spend limit
- Photos of the cable and leak
- Property record has no landlord contact, spend limit or contractor details

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The ticket is at init. The landlord's decision is unclear (emoji only). The contractor is unassigned, and the tenant's photos and a clear landlord decision are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Ask the landlord (Freya) by email to choose clearly. The tenant (Eliza) has been updated by email. The job is on hold with a review on 2024-03-29.

**3. Does anything need a human decision, and why?**

No. This is routine and awaiting the landlord's answer. Escalate only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"Landlord email 2024-03-27 11:21 UTC: \"👍\" (emoji only, i… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"existing thread (event 007 email)","body":"Hi Freya, than… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hi Eliza, a quic… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with emoji only; clear decision reque… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
