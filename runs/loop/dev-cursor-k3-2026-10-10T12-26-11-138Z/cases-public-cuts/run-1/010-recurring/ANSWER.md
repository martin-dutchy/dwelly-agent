# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The reading photo was sent to the landlord, who replied that the next one is needed on 15 September. I acknowledged this to the landlord, thanked the tenant, and scheduled a follow-up for 2025-09-08.

## Where the case stands
Current reading photo sent to landlord (event 013); landlord replied (event 015) that the next one is needed on 15 September. Waiting on the follow-up dated 2025-09-08.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Thank tenant, say nothing more is needed now and we'll ask again in early September | Miles Fletcher, tenant | email | A2 ✅ |
| 2 | WAIT | Follow-up on 2025-09-08 to request next reading from tenant before landlord's 15 September date | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hi Ava, thank you. We've noted that you next need the solar panel reading photo on 15 September, and we'll ask the tenant for it ahead of that date. Kind regards, Northbridge Lettings

**A2 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Miles, thank you for the solar panel reading photo, it has gone to the landlord. Nothing more is needed from you now. We'll email you again around early September to ask for the next one. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging the landlord's date does not confirm the tenant will supply the photo in time
- I have not read the figure in the photo beyond the attachment's stated display of 16845, and made no judgement on its accuracy

## Remaining work
- Request next reading from tenant around 2025-09-08 and forward it to the landlord by 15 September (agency ops)

## Missing or unavailable information
- Tenant's event 012 email shows only a signature and no visible attachment, so how the photo reached us is not recorded

## Conflicts between sources
- The original instruction said readings every 3 months with the next due mid June, but the landlord's latest message says 15 September. I followed the landlord's most recent statement.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This round is complete: the photo went to the landlord and they gave the next date, 15 September. Outstanding: the next request to the tenant and forwarding to the landlord.

**2. What is the next action, who is it for, and through which channel?**

Acknowledgements are already sent by email to the landlord and tenant. The next action is an internal follow-up on 2025-09-08 to email the tenant for the next photo.

**3. Does anything need a human decision, and why?**

No. This is routine and fully handled.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hi Ava, thank yo… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hi Mile… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant (Flat 10, 180 Alder Lane) for a clear photo of solar panel readings; landlord needs it by 15 Se… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
