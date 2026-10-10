# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The January solar meter photo was sent to the landlord, who replied that the next reading is needed on 15 September. I acknowledged this to the landlord and thanked the tenant. I set a follow-up for 1 September and added a note recording the conflicts. No human decision is needed.

## Where the case stands
This quarter's reading is done: the tenant's photo went to the landlord (event 013) and the landlord acknowledged it and gave the next date, 15 September (event 015). Nothing is outstanding now. The next reading is due for 15 September 2025, and a follow-up is set for 1 September.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow up on 1 Sept 2025 to ask the tenant for the next meter photo, due to the landlord by 15 Sept | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thank the tenant and say we will be in touch in early September | Miles Fletcher, tenant | email | A4 ✅ |
| 3 | OTHER | Acknowledge the landlord's 15 September date | Ava, landlord | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hi Ava, thank you. We've noted that you next need the solar panel reading on 15 September. We'll ask the tenant for the photo ahead of that date and send it on. Kind regards, Northbridge Lettings

**A4 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Miles, thank you for the solar panel reading photo. We've passed it to the landlord. We'll be in touch again around early September for the next one. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The photo shows a display that appears to read 16845; we have not checked this against any prior reading.
- Nothing here establishes that the reading is accurate or that the tenant sent the photo directly.
- The follow-up is a reminder only, not a booking.

## Remaining work
- Agency: on 1 Sept 2025, request the next photo from the tenant and forward it to the landlord by 15 Sept 2025.
- Ticket stays open as a recurring task. The landlord should confirm whether quarterly readings continue after September.

## Missing or unavailable information
- The tenant's event 012 email contained only a signature, so how the photo arrived is not recorded.
- Landlord's cadence beyond 15 September is not confirmed.

## Conflicts between sources
- The ticket says the next reading is due in mid June, but the landlord's latest email says 15 September. I used the landlord's date.
- Event 013 says 'for mid June' although it is a January reading. This was loose wording.
- Event 008 names a caller from 'Oakfield Compliance' on a call to the tenant. This is unexplained and I did not act on it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current reading has been delivered to the landlord and acknowledged. Nothing is outstanding until the next cycle, which the landlord says is 15 September.

**2. What is the next action, who is it for, and through which channel?**

The next action is a tenant reminder for the next photo on 1 September 2025 (follow-up FUP-101). Today I emailed the landlord (acknowledging the date) and emailed the tenant (thanks, and when they will next hear from us).

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord has given the date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Ask tenant for a clear photo of the solar panel meter reading; landlord needs it by 15 September 2025 (lan… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `add_note` | {"entity":"NBL-010-recurring","note":"Jan 2025 reading (display appears 16845) sent to landlord event 013. Landlord (event 015) says next ne… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hi Ava, thank yo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hi Mile… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
