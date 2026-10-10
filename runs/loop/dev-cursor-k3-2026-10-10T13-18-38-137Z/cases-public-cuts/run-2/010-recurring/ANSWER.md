# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's reading photo was sent to the landlord, who thanked us and said the next one is needed on 15 September. I thanked the tenant, logged a note and set a follow-up for 8 September.

## Where the case stands
Current reading photo sent to landlord and acknowledged; landlord says next reading due 15 September. Job waiting on a dated follow-up.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow-up set for 2025-09-08 to request next reading photo from the tenant ahead of 15 September | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thanked tenant, said the next photo will be requested in early September | Miles Fletcher, tenant | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for the solar panel reading photo. We have passed it to the landlord. They will next need a reading around 15 September, so we will be in touch in early September to ask for a new photo. Nothing is needed from you until then.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the reading value beyond what the photo appears to show (16845)
- Does not confirm any recurring cadence after 15 September

## Remaining work
- Request next photo in early September and send to landlord; confirm cadence with landlord then

## Missing or unavailable information
_None._

## Conflicts between sources
- Original instruction: every 3 months, next mid June; landlord's latest email says next 15 September. Trusted the landlord's latest statement.
- Tenant email event 012 contained only a signature, yet a photo was sent to the landlord; the attachment on file is attachment-01.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This reading cycle is complete: photo supplied and sent to the landlord, who replied. Outstanding is the next reading, due 15 September per the landlord.

**2. What is the next action, who is it for, and through which channel?**

Tenant (Miles Fletcher) was thanked by email and told we will ask again in early September; internal follow-up FUP-101 set for 2025-09-08.

**3. Does anything need a human decision, and why?**

No. It is routine. The only discrepancy is the cadence (original every 3 months, mid June versus the landlord's 15 September), and the latest landlord statement is being used.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant (Flat 10, 180 Alder Lane) for a clear photo of solar panel readings; landlord Ava needs it by 1… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"Flat 10, 180 Alder Lane","note":"Reading photo (display 16845) sent to landlord 17 Jan 2025. Landlord's latest reply says next re… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
