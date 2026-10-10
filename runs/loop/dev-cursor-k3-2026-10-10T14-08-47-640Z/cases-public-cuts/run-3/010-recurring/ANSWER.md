# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The solar reading photo was sent to the landlord, who replied that they next need it on 15 September. I scheduled a recurring follow-up for 8 Sept, confirmed with the landlord and tenant, added a note and returned the job to auto mode.

## Where the case stands
Current reading sent to landlord; landlord replied wanting next one 15 Sept. Recurring ticket stays open; next tenant request due 8 Sept 2025 (FUP-101). Nobody is waiting on us.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait until 8 Sept 2025, then ask tenant for next solar reading photo, repeating every 3 months | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thanked tenant and told them when we will next ask | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Confirmed the 15 Sept date and the 3-monthly cycle to the landlord | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Thank you, Ava. Noted: you next need the solar panel reading on 15 September. We will ask the tenant for a photo a week beforehand and send it to you. Our original instruction was a reading every 3 months, so we will keep to that cycle after September unless you tell us otherwise. Please let us know if you would prefer a different schedule.

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading. We have passed it to the landlord and nothing more is needed now. We will email you again around 8 September to ask for the next photo, as the landlord needs it by 15 September. After that we will ask every 3 months.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not verify the meter reading itself, only that the photo document was sent
- Does not change the 3-monthly cycle; landlord asked to say if they want a different one
- Does not close the ticket as it is recurring

## Remaining work
- Request next photo from tenant on 8 Sept 2025 and send to landlord by 15 Sept; repeat every 3 months (agency)

## Missing or unavailable information
- Tenant email event 012 contained no photo, so how the agency obtained the attached photo is not shown
- Whether landlord wants quarterly readings after 15 Sept

## Conflicts between sources
- Original note said next due mid June; landlord's latest email (event 015) says 15 Sept. Trusted the landlord's latest statement.
- Event 008 call summary names an Oakfield Compliance caller, not the tenant; treated as the tenant's contact on this job.
- Event 012 tenant email had no photo, yet a photo was sent to the landlord in event 013.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This round is complete: the reading (display 16845) went to the landlord on 17 Jan 2025 and the landlord replied. Outstanding is the next reading, due 15 Sept 2025, then every 3 months.

**2. What is the next action, who is it for, and through which channel?**

Follow-up on 8 Sept 2025 to email the tenant (Miles Fletcher) for a photo. Today I emailed the landlord to confirm the date and the tenant to thank them and say when we will ask next.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord's date is clear.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant for clear photo of solar panel reading so it reaches landlord by 15 Sept 2025 (landlord's email… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Thank you, Ava. … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-010-recurring","note":"Reading (display 16845) sent to landlord 17 Jan 2025 (event 013). Tenant email event 012 had no readab… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |

## Failed or unverified actions
_None._
