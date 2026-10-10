# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The solar meter photo was sent to the landlord, who thanked us and said the next reading is needed on 15 September. I confirmed this to the landlord, thanked the tenant, scheduled a follow-up for 8 September, noted the ticket and returned it to auto mode.

## Where the case stands
Current round complete: reading photo sent to landlord, landlord acknowledged and gave next date 15 Sept 2025. Ticket returned to auto mode; next tenant request scheduled 2025-09-08.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Thank tenant, say nothing more needed now and we'll ask again in early September | Miles Fletcher, tenant | email | A2 ✅ |
| 2 | OTHER | Confirm to landlord the next date 15 Sept is noted | Ava, landlord | email | A1 ✅ |
| 3 | WAIT | Follow-up on 2025-09-08 to request next photo from tenant | Miles Fletcher, tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hi Ava, thank you. We've noted that you next need the solar panel reading on 15th September. We'll ask the tenant for a photo ahead of that date and send it on to you. Kind regards, Northbridge Lettings

**A2 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Miles, thank you for your help with the solar panel reading. We've passed it to the landlord and nothing more is needed now. We'll be in touch in early September to ask for the next photo.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the reading is accurate beyond what the photo shows (display appears to read 16845)
- Does not set the cadence beyond 15 Sept; the 3-monthly pattern after that is unconfirmed

## Remaining work
- Request tenant photo around 2025-09-08 for the landlord's 15 Sept deadline (agency)
- Confirm with landlord the cadence after September

## Missing or unavailable information
- Landlord's cadence after 15 Sept
- The tenant's email (event 012) showed no visible attachment, so how the photo was obtained is unclear

## Conflicts between sources
- Ticket text says next due mid June; landlord's latest statement says 15 September, which I treated as current.
- Event 008 refers to a caller from Oakfield Compliance agreeing to send the photo, which doesn't match the tenant; treated as unexplained.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This round is complete: the photo reached the landlord and the landlord gave the next date, 15 September. Outstanding is the next tenant photo request, due early September.

**2. What is the next action, who is it for, and through which channel?**

Confirm to the landlord by email (done) and thank the tenant by email (done). Then request the next photo from the tenant by email on 2025-09-08 (follow-up FUP-103).

**3. Does anything need a human decision, and why?**

No. This is routine and fully handled.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-010-recurring","due_on":"2025-09-08","purpose":"Ask tenant for a clear photo of solar panel reading; landlord needs it by… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-010-recurring","note":"Reading photo (display 16845) sent to landlord event 013. Landlord event 015: next needed 15 Sept (sup… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |

## Failed or unverified actions
_None._
