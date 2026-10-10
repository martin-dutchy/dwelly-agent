# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's photo of the solar meter went to the landlord, who replied that she next needs it on 15 September. I replied to both parties, scheduled a recurring 3-monthly follow-up from mid June plus 15 Sept, and asked the landlord to confirm the cadence. No human decision needed.

## Where the case stands
Current reading photo sent to landlord, who replied with next date 15 Sept. Recurring request continues; follow-ups scheduled; cadence confirmation awaited from landlord.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm whether the June reading is still wanted alongside 15 September | Ava, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Thank tenant, say nothing more needed now, next requests mid June and ~15 Sept | Miles Fletcher, tenant | email | A4 ✅ |
| 3 | WAIT | Recurring follow-up every 3 months from 15 June 2025 (plus 15 Sept) to request next photo | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you, noted that you next need the reading on 15 September. We had on file that readings are every 3 months, with the next due mid June. Do you want the June reading as well, or only 15 September? Unless you tell us otherwise we will ask the tenant for a photo in mid June and again on 15 September. Kind regards, Northbridge Lettings

**A4 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading. The landlord has it and nothing more is needed now. We will email you again in mid June, and around 15 September, to ask for a new photo of the meter display. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the reading value independently; the figure comes from the attached report only
- Does not settle whether June is still required
- Scheduling does not mean the tenant has agreed to future requests

## Remaining work
- Landlord to confirm cadence (June vs 15 Sept)
- Request photo from tenant on each due date (follow-ups FUP-101, FUP-102)

## Missing or unavailable information
- Landlord confirmation of reading cadence
- Clarity on who supplied the photo (tenant email event 012 showed no attachment)

## Conflicts between sources
- Original instruction: next due mid June; landlord now says 15 September. Treated landlord's latest statement as current for 15 Sept but kept June pending confirmation.
- Event 008 call names a caller from Oakfield Compliance rather than the tenant; treated as the tenant.
- Tenant email event 012 contained only a signature, yet a photo was sent to the landlord.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This cycle's reading is delivered to the landlord. Outstanding: the landlord's confirmation of whether the mid-June reading is still wanted, and the next reading requests.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord (Ava) to confirm cadence, email to the tenant (Miles) with thanks and the next timing, and a recurring follow-up for mid June / 15 Sept.

**3. Does anything need a human decision, and why?**

No. It is routine and the open point is a single question to the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-06-15","purpose":"Request solar panel meter reading photo from tenant for landlord (original standing instruction: every 3 m… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `schedule_follow_up` | {"due_on":"2025-09-15","purpose":"Landlord's stated next date for solar reading (email 17 Jan 2025): ask tenant for photo and send to landlo… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A3 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `add_note` | {"entity":"ticket Case 010 Flat 10, 180 Alder Lane","note":"Reading photo (meter display appears 16845, per attachment) sent to landlord 17 … | 1 | ✅ verified | NOTE-105 found in the add_note log |

## Failed or unverified actions
_None._
