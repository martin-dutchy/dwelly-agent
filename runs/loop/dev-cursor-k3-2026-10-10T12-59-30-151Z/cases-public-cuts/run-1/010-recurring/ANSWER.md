# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The solar reading photo went to the landlord on 17 January. The landlord thanked us and said the next one is needed on 15 September. I set a follow-up for that date, added a note recording the date change, and told the tenant and landlord. No human decision is needed.

## Where the case stands
The reading has been sent to the landlord, who has acknowledged it and said the next one is due 15 September. The job is back to waiting, with a follow-up set for that date.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait until 15 September 2025, then ask the tenant for the next solar reading photo and pass it to the landlord | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thank the tenant and say the next photo will be requested shortly before 15 September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Acknowledge the landlord's 15 September date | Ava, landlord | email | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading. The landlord has it and doesn't need another until around 15 September. We'll be in touch shortly before then to ask for a fresh photo. Nothing more is needed from you for now.

**A4 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We've noted that you next need the solar panel reading on 15 September and will ask the tenant for it ahead of that date.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the reading does not confirm it is the tenant's own photo or that the 16845 figure is accurate.
- The 15 September date is a single request, not a confirmed recurring schedule.
- The follow-up only schedules the reminder; the tenant request has not been sent yet.

## Remaining work
- Ask the tenant for the reading shortly before 15 September 2025 and forward it to the landlord (agency, FUP-101)
- Ask the landlord whether readings should continue every 3 months after September

## Missing or unavailable information
- Where the photo sent to the landlord came from: the tenant's email (event 012) shows no attachment.
- Who the 'Oakfield Compliance' caller in event 008 was.

## Conflicts between sources
- The original request says 'next due mid June' and the earlier holds say 'waiting for mid june', but the landlord's latest message says 15 September. I trusted the landlord's latest statement.
- The tenant's email (event 012) has no photo, yet a photo was sent to the landlord at event 013. I recorded this in a note and did not act on it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This round is complete: the reading (display 16845) went to the landlord, who acknowledged it. The next reading is due 15 September 2025 and has not been requested yet.

**2. What is the next action, who is it for, and through which channel?**

Wait for the 15 September follow-up (FUP-101), then email the tenant for a fresh photo. I have already emailed the tenant and the landlord to confirm the date.

**3. Does anything need a human decision, and why?**

No. It is routine. The photo's source and the Oakfield Compliance call are noted as open points but do not need a decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-15","purpose":"Landlord (Ava) needs the next solar panel reading photo from the tenant on 15 September. Request it from t… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `add_note` | {"entity":"Flat 10, 180 Alder Lane, Cedarford, ZZ3 4ZZ","note":"Solar reading sent to landlord 17 Jan 2025 (meter display 16845 per attachme… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
