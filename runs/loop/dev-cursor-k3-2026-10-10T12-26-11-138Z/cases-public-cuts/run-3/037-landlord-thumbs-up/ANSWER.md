# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The landlord answered the approval request with only a 👍. I recorded that as unclear and emailed one yes/no question. I updated the tenant and put the job on hold until 2024-03-29.

## Where the case stands
Intake/landlord gate. No provider assigned. Landlord replied with a 👍 only, recorded as unclear. Ticket on hold awaiting landlord's clear yes/no, review 2024-03-29.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord one yes/no question: may we instruct our contractor? | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant on pending approval, safety advice, next update by 2024-03-29, photos still wanted | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 2024-03-29 for landlord answer | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Freya (landlord) via email, agency landlord record** (verified)

> - Thanks for your reply. A thumbs-up isn't enough for us to commit to the repair. Yes or no: may we instruct our own contractor to repair the leaking shower cable/hose at Flat 14, 44 Lantern Quay? (If you would rather arrange it yourself, just say so.)
> 
> Why: Landlord reply was an emoji only, which is not clear approval.

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We've asked the landlord to confirm that we can send a contractor and are waiting for a clear yes. We'll chase again by 2024-03-29 and update you then. Photos of the damaged cable and the leak would still help. Until then, if you can, please keep water off the damaged part. If water reaches any electrics or sockets, switch off the power at the fuse box and call us straight away. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 is not approval; no contractor assigned and no spend committed.
- Nothing is booked; no visit date promised to the tenant.

## Remaining work
- Landlord clear answer (owner: landlord); then record decision and assign contractor
- Tenant photos outstanding
- Chase landlord on a second channel if no reply by 2024-03-29

## Missing or unavailable information
- Clear landlord decision
- Photos of the damaged cable and leak

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate with no provider assigned. The landlord's 👍 isn't valid approval. Outstanding: a clear landlord decision and the tenant's photos.

**2. What is the next action, who is it for, and through which channel?**

Email Freya (landlord) asking for a yes/no on using our contractor (A2). The tenant has been updated by email (A3).

**3. Does anything need a human decision, and why?**

No. This is routine. If the landlord stays silent past the chase on a second channel, escalate then.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Freya","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Thanks for your rep… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hi Eliza, a quic… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with emoji only; asked yes/no whether… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
