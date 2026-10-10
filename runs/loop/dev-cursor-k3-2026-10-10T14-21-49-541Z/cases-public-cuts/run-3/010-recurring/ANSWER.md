# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The January reading was sent to the landlord, who asked for the next one on 15 September. I set a dated recurring follow-up, told the landlord and tenant, and asked the landlord to confirm the cadence. No human decision is needed.

## Where the case stands
January reading photo delivered to landlord, who replied asking for the next one on 15 September. Follow-up scheduled; the landlord was asked to confirm the cadence by 24 Jan. Nothing is awaited from the tenant.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow-up set for 15 Sept 2025 to request the next reading, repeating every 3 months | internal | internal | A1 ✅ |
| 2 | REQUEST_INFORMATION | Confirmed the 15 Sept date to the landlord and asked whether quarterly collection continues, reply by 24 Jan | Ava, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Thanked the tenant and said the next request will come around 15 Sept | Miles Fletcher, tenant | email | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September and have set a reminder for that date. Our original instruction was for readings every 3 months. Please could you reply by 24 January to confirm whether you would like us to keep collecting every 3 months after 15 September, or only on dates you give us? Until we hear, we will keep to every 3 months. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading. It has been passed to the landlord and nothing more is needed now. We will email you again around 15 September to ask for the next photo. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reminder does not confirm the quarterly cadence; it awaits the landlord's answer.
- Sending the photo does not verify the reading figure (16845 appears on the meter) or who took the photo.

## Remaining work
- Landlord to confirm cadence by 24 Jan; the agency reviews it.
- 15 Sept: request photo from tenant and forward to landlord.
- Job stays open as a recurring task.

## Missing or unavailable information
- Landlord's confirmation of whether readings stay every 3 months or follow dates she gives
- Source of the photo: the tenant's event 012 email has no visible attachment

## Conflicts between sources
- Original instruction: every 3 months, next mid June. Landlord's latest message: next 15 Sept. I treated the landlord's latest as current and asked her to confirm.
- Event 008 names the caller as Oakfield Compliance, but the job is with the tenant; treated as the tenant.
- Event 013 sent an attachment, but the tenant's email in event 012 has no photo.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This round is complete: the reading was sent to the landlord, who acknowledged it. Outstanding: the next reading on 15 Sept, and the landlord's confirmation of whether the 3-month cycle continues.

**2. What is the next action, who is it for, and through which channel?**

A reminder for 15 Sept (FUP-101). The landlord was emailed to confirm the cadence, and the tenant was emailed to say the next request is coming.

**3. Does anything need a human decision, and why?**

No. The cadence question is routine and has gone to the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-15","purpose":"Request solar panel meter reading photo from tenant and send to landlord (landlord asked for 15 September)… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"Flat 10, 180 Alder Lane","note":"Recurring solar reading job. Reading photo (display 16845) sent to landlord 17 Jan. Landlord say… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `resume_auto` | {"ticket_ref":"010-recurring"} | 1 | ❌ failed | Ticket 010-recurring not found on read-back |

## Failed or unverified actions
- A5: resume_auto failed because ticket ref 010-recurring does not exist in the system. Not retried, as no valid ref is known; the hold state is left as is and noted in the submission.
