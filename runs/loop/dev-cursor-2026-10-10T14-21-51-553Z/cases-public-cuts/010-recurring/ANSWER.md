# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The reading photo was sent to the landlord, who said they next need it on 15 September. I set a recurring reminder starting 8 Sept, asked the landlord to confirm the cadence, and thanked the tenant. Resume_auto failed as the ticket ref was not found.

## Where the case stands
Reading delivered to landlord; landlord replied next needed 15 Sept 2025. Recurring reminder set. Waiting on landlord to confirm cadence after 15 Sept.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Tenant photo request due 8 Sept 2025, repeating every 3 months | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask landlord to confirm cadence after 15 Sept, reply by 31 Jan | Ava, landlord | email | A2 ✅ |
| 3 | REPLY_TO_TENANT | Thank tenant, say next contact early September | Miles Fletcher, tenant | email | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September, and we will ask the tenant for a photo a week beforehand. Our standing instruction says readings are needed every 3 months. Please could you confirm whether you want them every 3 months after 15 September, or a different schedule? A reply by 31 January would help us set the reminders correctly.

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading. We have passed it to the landlord and nothing more is needed now. We will be in touch in early September to ask for the next photo.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the photo came from the tenant or that the reading is accurate
- Does not settle the long-term reading cadence
- Reminder dates are follow-ups, not tenant appointments

## Remaining work
- Landlord to confirm cadence (agency ops, chase after 31 Jan)
- Send tenant photo request 8 Sept 2025
- Ticket hold/auto mode not cleared (see failed actions)

## Missing or unavailable information
- Landlord's cadence after 15 Sept
- Origin of the photo: tenant email event 012 contained only a signature

## Conflicts between sources
- Original instruction (every 3 months, mid June) vs landlord's 15 Sept; trusted the landlord's latest statement
- Event 008 names an Oakfield Compliance caller, while the tenant is Miles Fletcher; treated as the tenant

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The January reading was sent to the landlord, who replied that the next one is needed on 15 September. Outstanding: the reminder schedule and the landlord's confirmation of cadence.

**2. What is the next action, who is it for, and through which channel?**

Ask the tenant for the next photo on 8 Sept (follow-up FUP-101, recurring every 3 months). Meanwhile the landlord was asked by email to confirm the cadence.

**3. Does anything need a human decision, and why?**

No. This is routine recurring admin. A human only needs to look if the ticket mode cannot be resumed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant for clear photo of solar panel meter reading, to send to landlord by 15 Sept 2025 (landlord's s… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"ticket","note":"Reading photo (16845) sent to landlord event 013; landlord replied next needed 15 Sept (event 015). Conflicts: or… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `resume_auto` | {"ticket_ref":"010-recurring"} | 1 | ❌ failed | Ticket 010-recurring not found on read-back |

## Failed or unverified actions
- A5: resume_auto failed (ticket ref 010-recurring not found; real ref unknown). Not retried with an invented ref; noted in A4 and the holds remain to be cleared by the ops team.
