# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The meter photo was sent to the landlord, who acknowledged it and asked for the next reading on 15 September. I replied to confirm the date, noted the record and set a follow-up for 8 September 2025 to ask the tenant for the next photo.

## Where the case stands
The January reading has been sent to the landlord, who replied that the next one is needed on 15 September. Nothing is waiting on the tenant now. A follow-up is set for 8 September 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait until 8 Sept 2025, then ask the tenant for the next meter photo ahead of the landlord's 15 Sept date | Tenant, Miles Fletcher | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledged the landlord's date and confirmed we will request the next photo the week before | Ava, landlord | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September. We will ask the tenant for a photo the week before and send it on to you. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The note and follow-up do not confirm how the photo was obtained from the tenant.
- The reading of 16845 is as described in the attachment; it has not been independently verified.
- Nothing has been requested from the tenant yet for September.

## Remaining work
- Ask the tenant for a photo on or around 8 Sept 2025 and forward it to the landlord by 15 Sept (agency).

## Missing or unavailable information
- The tenant's email (event 012) has no photo in the history, so the source of the photo sent to the landlord is not shown.
- Event 008 mentions a caller from Oakfield Compliance, which is not explained.

## Conflicts between sources
- The original request and hold notes say 'mid June'. The landlord's latest message (event 015) says 15 September. I treated the landlord's message as current.
- The tenant's reply (event 012) contained no photo, yet a photo was sent to the landlord (event 013). The photo's origin is unclear.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current reading has been delivered to the landlord and the landlord has replied. The only outstanding work is the next reading, due 15 September, for which a follow-up is now set.

**2. What is the next action, who is it for, and through which channel?**

The next action is to ask the tenant, Miles Fletcher, for a clear meter photo on 8 Sept 2025 (FUP-101). I have already emailed the landlord, Ava, to confirm the date.

**3. Does anything need a human decision, and why?**

No. This is routine work. I noted the unexplained photo source and the Oakfield Compliance reference on the record for information only.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant (Miles Fletcher) for a clear photo of the solar panel meter reading, so it reaches landlord Ava… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `add_note` | {"entity":"Flat 10, 180 Alder Lane, Cedarford, ZZ3 4ZZ","note":"Solar reading sent to landlord 17 Jan 2025 (event 013; meter display appears… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
