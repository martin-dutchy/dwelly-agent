# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Landlord replied with only a 👍 to the question of who arranges the shower repair. I recorded it as unclear, asked for a clear yes/no, updated the tenant and put the job on hold until 2024-03-29.

## Where the case stands
Intake/landlord gate. No provider assigned. Landlord's reply was only a 👍, not usable approval. On hold until 2024-03-29 awaiting landlord's clear answer; tenant photos also outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord a clear yes/no: may we instruct our contractor (or will they arrange their own)? | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: waiting on landlord, photos still wanted, next update by 2024-03-29 | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 2024-03-29 for landlord answer | Freya, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Thanks Freya, we got your 👍 but need a clear answer before we act. Yes or no: may we instruct our own contractor to replace the leaking shower cable/hose at Flat 14, 44 Lantern Quay? (If you'd rather arrange it yourself, just say so.)
> 
> Options: Yes, instruct your contractor; No, I will arrange my own contractor

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting on the landlord to confirm how the repair will be arranged; their reply so far wasn't a clear yes, so we've asked again. Photos of the damaged cable and the leak would still help. Meanwhile, please avoid using the shower if the leak is near any electrics. We'll update you by 2024-03-29 at the latest. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 does not authorise assigning a contractor or any spend
- No visit is booked and no timescale is promised to the tenant

## Remaining work
- Landlord clear decision (agency chases after 2024-03-29 on a second channel)
- Tenant photos
- Assign contractor once approved

## Missing or unavailable information
- Landlord's clear yes/no
- Photos of damaged cable and leak
- Spend limit not on property record

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At landlord approval stage; no provider assigned. Landlord's 👍 is not valid approval. Outstanding: clear landlord decision and tenant photos.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval question to the landlord by email (A2), plus a tenant update by email (A3); hold to 2024-03-29 (A4).

**3. Does anything need a human decision, and why?**

No. The landlord is slow or unclear, which is routine. Escalate only if they stay silent after a second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"NBL-037-landlord-thumbs-up","decision_needed":"Thanks Freya, we got your 👍 but need a clear answer before… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-037-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied 👍 only; clear yes/no asked on whethe… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
