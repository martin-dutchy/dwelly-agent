# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The solar meter photo was sent to the landlord, who replied that the next reading is due 15 September. I acknowledged this to both landlord and tenant, set a follow-up for 10 September and noted the date change. No human decision is needed.

## Where the case stands
Current reading photo sent to landlord (17 Jan 2025); landlord replied that next reading is needed 15 September. Nothing outstanding until the September reminder.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait until the 10 Sept 2025 follow-up, then ask tenant for next meter photo and pass it to landlord | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thank tenant and say we will ask again around 10 September | Miles Fletcher, tenant | email | A4 ✅ |
| 3 | OTHER | Acknowledge landlord's 15 September date | Ava, landlord | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September, and will ask the tenant for a photo shortly beforehand (we have a reminder set for 10 September). Please tell us if you need it at a different time. Kind regards, Northbridge Lettings

**A4 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading. Nothing more is needed now. We will email you around 10 September to ask for the next photo of the meter reading. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging the date does not confirm a repeating quarterly schedule beyond 15 September.
- The reading (appears to be 16845) is from the PDF; its accuracy is not independently verified.

## Remaining work
- Send tenant photo request around 10 Sept 2025 and forward to landlord by 15 Sept (agency).

## Missing or unavailable information
- Tenant's email (event 012) shows no visible photo attachment; the source of the photo is unclear.
- Whether readings continue every 3 months after 15 September.

## Conflicts between sources
- Original request said next due mid June; landlord's latest email says 15 September. Trusted the landlord's latest statement.
- Event 013 email said the photo was 'for mid June', but the photo is a January reading.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This round is complete: the photo went to the landlord and the landlord gave 15 September as the next due date. Only the September reminder is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Done now: emails to the landlord and the tenant acknowledging the date. Next: ask the tenant for the photo by email on 10 Sept 2025 (FUP-101).

**3. Does anything need a human decision, and why?**

No. This is routine, and the date conflict (mid June vs 15 September) is settled by the landlord's latest statement.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-10","purpose":"Ask tenant (Miles Fletcher) for a clear photo of the solar panel meter reading, as landlord needs it by 15… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `add_note` | {"entity":"Flat 10, 180 Alder Lane, Cedarford, ZZ3 4ZZ","note":"Solar reading job: photo (meter display appears to read 16845) sent to landl… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
