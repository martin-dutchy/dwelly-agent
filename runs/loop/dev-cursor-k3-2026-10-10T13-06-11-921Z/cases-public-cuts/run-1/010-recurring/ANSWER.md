# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's photo reached the landlord, and the landlord replied that the next reading is due 15 September. I acknowledged this to the landlord, thanked the tenant, scheduled a follow-up for 8 Sept and noted the record.

## Where the case stands
Current reading photo delivered to landlord; landlord acknowledged and gave next date 15 Sept 2025. Ticket remains open as a recurring job, waiting on the 8 Sept follow-up.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow up 8 Sept 2025 to ask tenant for next meter photo for landlord's 15 Sept date | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thanked tenant, said we will ask again in early September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Acknowledged landlord's 15 Sept date | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hi Ava, thank you. We have noted that you next need the solar panel reading on 15 September. We will ask the tenant for a photo beforehand and send it to you. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Miles, thank you for the solar panel reading photo, it has gone to the landlord. We will email you again in early September to ask for the next one. Nothing else is needed from you for now. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not verify the meter reading beyond what the attachment shows (display appears to read 16845)
- Does not close the recurring job

## Remaining work
- Request next reading from tenant around 8 Sept 2025 and send to landlord by 15 Sept (agency)
- Confirm whether the 3-monthly cycle continues after September

## Missing or unavailable information
_None._

## Conflicts between sources
- Earlier holds said next reading mid June; the landlord's latest statement (15 Sept) is treated as current.
- Tenant email event 012 contained no photo or readable reading, yet the agency sent a photo to the landlord; the attachment is present and was read.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current reading was sent to the landlord, who confirmed receipt. Outstanding: the next reading, due 15 Sept 2025.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant, Miles Fletcher, on 8 Sept 2025 to request the next photo (follow-up FUP-101). The landlord and tenant have been acknowledged by email now.

**3. Does anything need a human decision, and why?**

No. This is routine and nothing needs authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant for a clear photo of solar panel meter reading, to send to landlord by 15 September 2025 (landl… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-010-recurring","note":"Reading photo (meter display appears to show 16845) sent to landlord 17 Jan. Landlord says next needed… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
