# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's meter photo was sent to the landlord, who replied that the next reading is needed on 15 September. I set a recurring follow-up from 10 Sept 2025 every 3 months, noted the record, thanked the tenant, confirmed the plan to the landlord and returned the job to auto.

## Where the case stands
Current cycle complete: tenant's photo sent to landlord, landlord replied next reading needed 15 Sept. Ticket stays open as a recurring job; waiting on the dated follow-up of 10 Sept 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Recurring follow-up from 10 Sept 2025 (every 3 months) to request next meter photo from tenant for the landlord's 15 Sept date | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thanked tenant and said when we will next ask | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Confirmed to landlord the 15 Sept date and the plan | Ava, landlord | email | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for sending the solar panel reading photo, it has been passed to the landlord. We'll ask you for the next one around 10 September 2025, as the landlord needs it by 15 September. Nothing is needed from you before then. Kind regards, Northbridge Lettings

**A4 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thanks for confirming. We've noted that you next need the solar panel reading on 15 September, and we'll ask the tenant for the photo around 10 September. We'll then continue every 3 months unless you tell us otherwise. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The photo only shows a display that appears to read 16845; I have not verified the reading's accuracy or that it was taken recently.
- Does not establish the cadence beyond 15 Sept; the 3-monthly repeat follows the original instruction and the landlord can change it.

## Remaining work
- Agency: request next photo from tenant around 10 Sept 2025 (FUP-101), then every 3 months, confirming the date with the landlord.

## Missing or unavailable information
_None._

## Conflicts between sources
- Original 'next due mid June' (and holds 'waiting for mid june') vs landlord's 15 September (event 015): trusted the landlord's latest statement.
- Event 008 names caller 'Oakfield Compliance' while the record shows the agency/tenant; same property and job, so carried on.
- Event 013 attachment ref 'attachment-80-document' vs file attachment-01 photo; the file matches the described photo.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This cycle is done: the photo was supplied and sent to the landlord, who gave 15 September as the next date. Outstanding is only the recurring request to the tenant from 10 Sept 2025.

**2. What is the next action, who is it for, and through which channel?**

Recurring follow-up (FUP-101) to ask the tenant, Miles Fletcher, for the next photo by email around 10 Sept 2025. Tenant and landlord were both told by email now.

**3. Does anything need a human decision, and why?**

No. It is routine and the landlord has given clear instructions.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-10","purpose":"Ask tenant for a clear photo of the solar panel meter reading so the landlord has it by 15 September 2025;… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `add_note` | {"entity":"NBL-010-recurring","note":"Reading photo (display appears to read 16845) sent to landlord 17 Jan 2025 (event 013). Landlord repli… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |

## Failed or unverified actions
_None._
