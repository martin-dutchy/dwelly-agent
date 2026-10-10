# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's photo reached the landlord on 17 Jan and the landlord replied that the next reading is needed on 15 September. I scheduled a recurring tenant request from 8 Sept, confirmed with landlord and tenant, and noted the record.

## Where the case stands
Current reading delivered to landlord; landlord gave next date 15 Sept. Recurring tenant request scheduled from 8 Sept. Ticket kept open for the recurring task, back in auto mode.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Ask tenant for next solar meter photo from 8 Sept 2025, repeating every 3 months | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thank tenant, say next request is early September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Confirm to landlord the 15 Sept date and the 3-monthly cadence | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September. We will ask the tenant for a photo about a week before and send it on. Unless you tell us otherwise, we will carry on asking every 3 months after that. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading; it has gone to the landlord. We will ask you for the next photo in early September, and then about every 3 months. Nothing is needed from you until then. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the meter reading is accurate beyond the photo's apparent 16845
- Does not set dates after 15 Sept other than 3-monthly assumption
- Not closed: it is a recurring task

## Remaining work
- Agency: ask tenant for photo from 8 Sept 2025 (FUP-101), send to landlord by 15 Sept, then repeat every 3 months

## Missing or unavailable information
- Whether landlord wants 3-monthly requests after 15 Sept (assumed yes, told them)

## Conflicts between sources
- Ticket said next due mid June; landlord's latest email says 15 September; trusted the landlord's latest.
- Tenant email event 012 contained only a signature, no visible attachment; the photo record on file is attachment-01.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current reading is done and with the landlord. Outstanding: the next reading due 15 Sept, then every 3 months.

**2. What is the next action, who is it for, and through which channel?**

Request a photo from tenant Miles Fletcher by email from 8 Sept (follow-up FUP-101, recurring). Confirmations already sent to landlord and tenant by email.

**3. Does anything need a human decision, and why?**

No. It is routine and the landlord has given the date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant for a clear photo of solar panel meter reading, due to landlord 15 September; then repeat every… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-010-recurring","note":"Reading (16845 per attached photo record) sent to landlord 17 Jan. Landlord (event 015) says next need… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |

## Failed or unverified actions
_None._
