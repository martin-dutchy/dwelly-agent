# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

Reading photo was delivered to the landlord, who said she next needs it on 15 September. I confirmed to landlord and tenant, set a recurring quarterly follow-up from 8 Sept, and noted the record oddities. No human decision needed.

## Where the case stands
Current reading photo sent to landlord (event 013); landlord replied (event 015) that next reading is needed 15 Sept. Recurring quarterly request stays open; next tenant request scheduled 8 Sept 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Thank tenant and say we will ask for the next photo about a week before 15 Sept | Miles Fletcher, tenant | email | A2 ✅ |
| 2 | OTHER | Confirm to landlord that 15 Sept is noted and quarterly asks continue | Ava, landlord | email | A1 ✅ |
| 3 | WAIT | Follow-up 8 Sept 2025, recurring every 3 months, to request next photo from tenant | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading photo by 15 September. We will ask the tenant for it ahead of that date and send it on. Unless you tell us otherwise, we will then carry on asking every 3 months. Kind regards, Northbridge Lettings

**A2 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading. We have passed it to the landlord. They will need another clear photo of the meter display around 15 September, so we will email you a week or so before to ask for it. Nothing needed from you until then.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not verify who took the photo or that the reading 16845 is correct
- Does not close the recurring job
- Landlord's reply does not change the quarterly cadence beyond the 15 Sept date

## Remaining work
- Request next reading from tenant on 8 Sept 2025 and forward to landlord by 15 Sept; repeat quarterly (agency)

## Missing or unavailable information
- Origin of the photo: tenant email event 012 had no visible attachment; call event 008 names Oakfield Compliance

## Conflicts between sources
- Original request said next due mid June; landlord's latest statement says 15 Sept; treated the landlord's as current (consistent with quarterly cadence).
- Tenant email (event 012) has no photo, call event 008 names Oakfield Compliance rather than the tenant; photo origin unclear.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This round is done: the photo went to the landlord and she replied. Outstanding is the next reading, needed by 15 Sept, then quarterly.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant around 8 Sept 2025 for the next meter photo (follow-up FUP-103, recurring); confirmations already emailed to landlord and tenant.

**3. Does anything need a human decision, and why?**

No. It is routine; the photo-origin oddity is noted but the landlord accepted the reading.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"","body":"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant for a clear photo of solar panel meter reading; landlord needs it by 15 Sept 2025. Then send to… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"Flat 10, 180 Alder Lane","note":"Solar readings: Jan 2025 reading (16845 per attached photo record) sent to landlord; landlord (A… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
