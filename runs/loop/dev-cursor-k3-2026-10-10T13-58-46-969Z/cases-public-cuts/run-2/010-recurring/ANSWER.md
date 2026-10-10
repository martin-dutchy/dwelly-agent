# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The solar reading photo was sent to the landlord, who replied that the next one is needed on 15 September. I scheduled a follow-up for 8 September, added a note, updated tenant and landlord, and returned the job to auto mode.

## Where the case stands
Current reading photo delivered to landlord; landlord replied next needed 15 September. Ticket open as a recurring job, follow-up FUP-101 set for 2025-09-08. Nobody is waiting on us.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait until 8 Sept 2025, then ask tenant for the next solar reading photo for the landlord's 15 Sept date | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thanked tenant and told them we will ask again in early September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Acknowledged landlord's 15 September date and said when we will request the photo | Ava, landlord | email | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading. We've passed it to your landlord. They next need a reading around 15 September, so we'll email you in early September to ask for a clear photo. Nothing is needed from you before then.

**A4 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We've noted that you next need the solar panel reading on 15 September and will ask the tenant for the photo in early September (follow-up set for 8 September).

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the reading value (16845 is only as described in the attachment) or how the photo was obtained
- Does not close the recurring job
- No human decision made

## Remaining work
- Request photo from tenant on 2025-09-08 (agency ops)
- Confirm following cadence with landlord after the September reading

## Missing or unavailable information
- Tenant's email (event 012) had no attachment, so the source of the photo is not shown
- Who the 'Oakfield Compliance' caller in event 008 was

## Conflicts between sources
- Early holds said next reading due 'mid June'; landlord's latest email says 15 September. Trusted the landlord's latest statement.
- Tenant email (event 012) had no photo attached, yet a photo was sent to the landlord; the source is unrecorded.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This quarter's reading has been delivered to the landlord. The only thing outstanding is the next reading, needed by 15 September, which is now scheduled for request on 8 September.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant (Miles Fletcher) on 8 Sept 2025 for a clear photo (FUP-101). Tenant and landlord were both updated by email today.

**3. Does anything need a human decision, and why?**

No. It is routine and the landlord has given the next date. The loose ends (photo provenance, Oakfield Compliance caller) are noted but do not block anything.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant for clear photo of solar panel meter reading; landlord needs it by 15 September 2025 (per landl… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `add_note` | {"entity":"NBL-010-recurring","note":"Reading photo (meter display appears 16845) sent to landlord 2025-01-17 (event 013). Landlord replied … | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |

## Failed or unverified actions
_None._
