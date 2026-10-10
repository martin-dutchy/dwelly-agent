# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's reading photo went to the landlord, who confirmed receipt and said she next needs it on 15 September. I acknowledged to both parties, scheduled a follow-up for 8 September and returned the ticket to auto mode.

## Where the case stands
Current reading photo sent to landlord (event 013); landlord acknowledged and gave next date 15 Sept (event 015). Ticket back in auto mode with follow-up FUP-101 on 2025-09-08.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait until 2025-09-08, then ask the tenant for the next solar meter photo for the landlord's 15 September date | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thank tenant, say next request comes early September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Acknowledge landlord's next date of 15 September | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We've noted that you next need the solar panel reading on 15 September. We'll ask the tenant for a photo ahead of that date and send it on to you.
> 
> Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for the solar panel reading photo, it has gone to the landlord. We'll be in touch in early September to ask for the next one. Nothing else is needed from you until then.
> 
> Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledgements do not confirm the tenant will supply the next photo.
- The reading figure (16845) is as described in the attachment and was not independently verified.
- The original request said every 3 months; the landlord's stated next date (15 Sept) was followed, and any intermediate readings were not scheduled.

## Remaining work
- Send tenant the photo request around 8 Sept 2025 and forward to landlord by 15 Sept (agency).

## Missing or unavailable information
_None._

## Conflicts between sources
- Event 008 mentions a caller from Oakfield Compliance, which does not match the tenant; it was not relied on. The tenant's email (event 012) had no text, but the meter photo was sent on to the landlord, so I treated it as supplied.
- Event 013's attachment tag appears as attachment-80-document, while the file present is attachment-01. I used the file present.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This round is complete: the photo was supplied and sent to the landlord, who replied. Outstanding is the next reading, due 15 September.

**2. What is the next action, who is it for, and through which channel?**

Follow-up FUP-101 on 2025-09-08 to ask the tenant for the photo by email. Landlord and tenant have been acknowledged by email now.

**3. Does anything need a human decision, and why?**

No. It is routine and nothing needs authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant for a clear photo of the solar panel meter reading so it reaches landlord by 15 September 2025 … | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |

## Failed or unverified actions
_None._
