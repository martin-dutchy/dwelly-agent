# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The reading photo went to the landlord, who replied that the next one is due 15 September. I acknowledged this to the landlord, scheduled a tenant photo request for 8 Sept 2025 and noted the record. No human decision is needed.

## Where the case stands
Current reading sent to landlord on 17 Jan 2025; landlord replied that the next reading is needed 15 September. The job stays open as a recurring task; follow-up set for 8 Sept 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Acknowledge to the landlord that the next reading is needed 15 September | Ava, landlord | email | A1 ✅ |
| 2 | WAIT | Wait until 8 Sept 2025, then ask the tenant for the next meter photo | Tenant | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading for Flat 10, 180 Alder Lane on 15 September. We will ask the tenant for a clear photo ahead of that date and send it to you. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging the date does not confirm the tenant will supply future photos.
- The reading figure 16845 comes from the attachment text and is not independently checked.

## Remaining work
- Agency: ask the tenant for a photo from 8 Sept 2025 and send it to the landlord by 15 Sept.

## Missing or unavailable information
- Tenant's email (event 012) showed no attachment, so how the photo reached us is not visible.
- Role of the Oakfield Compliance caller in event 008 is unclear.

## Conflicts between sources
- The original note said the next reading is due mid June, but the landlord's latest message says 15 September. I trusted the landlord's most recent statement.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

The reading was sent to the landlord and the landlord replied with the next due date, 15 September. Only the next cycle is outstanding.

**2. What is the next action, who is it for, and through which channel?**

I acknowledged the date to the landlord by email (done, A1). The next step is a tenant photo request by email on 8 Sept 2025 (follow-up A2).

**3. Does anything need a human decision?**

No. This is routine, so I did not escalate.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant (Flat 10, 180 Alder Lane) for a clear photo of the solar panel meter reading, so it can be sent… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A3 | `add_note` | {"entity":"Flat 10, 180 Alder Lane, Cedarford, ZZ3 4ZZ","note":"Solar reading sent to landlord 17 Jan 2025 (meter display appears to read 16… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
