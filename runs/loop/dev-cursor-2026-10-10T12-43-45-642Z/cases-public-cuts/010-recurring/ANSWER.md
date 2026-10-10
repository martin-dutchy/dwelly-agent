# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The reading photo went to the landlord, who confirmed they next need it on 15 September. I acknowledged this to the landlord and tenant, scheduled the next tenant request for 8 September and returned the ticket to auto mode.

## Where the case stands
Current reading (meter display appears to read 16845) was sent to the landlord. The landlord replied that they next need it on 15 September. The ticket stays open as a recurring job; the next tenant request is scheduled for 8 September 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait until 2025-09-08, then ask the tenant for the next solar reading photo, which the landlord needs by 15 September. | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thank the tenant and say when we will next ask. | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Acknowledge the landlord's date of 15 September. | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hi Ava, thank you. We've noted that you next need the solar panel reading on 15 September. We'll ask the tenant for it in the week before and send it on to you.

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Miles, thank you for sending the solar panel reading photo. We've passed it to the landlord. You don't need to do anything now. We'll email you around 8 September to ask for the next one.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The photo was sent to the landlord; this does not verify the reading itself.
- The ticket is not closed because the readings recur.
- Nothing here changes the landlord's schedule beyond the date they gave.

## Remaining work
- Request the next reading from the tenant around 8 September 2025 and forward it to the landlord by 15 September (agency).

## Missing or unavailable information
- The tenant's event 012 email shows only a signature, so I could not see whether it carried the photo. Event 013's attachment link was not visible in the original; the PDF on file shows the meter photo.
- The landlord's 15 September date differs from the original 'mid June' note. The quarterly cadence is not confirmed.

## Conflicts between sources
- Original request says next due mid June; landlord's latest statement says 15 September. I trusted the landlord's latest message.
- Event 008 describes a caller from Oakfield Compliance, but the tenant is Miles Fletcher. I did not act on it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current reading has been delivered to the landlord. The only open item is the next reading, due by 15 September 2025.

**2. What is the next action, who is it for, and through which channel?**

Ask the tenant (Miles Fletcher) by email around 8 September for a new photo (follow-up FUP-101). The landlord and tenant have both been told by email.

**3. Does anything need a human decision, and why?**

No. This is a routine job and the landlord's date is clear.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant for a clear photo of solar panel readings; landlord needs it by 15 September. Recurring quarter… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |

## Failed or unverified actions
_None._
