# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The January reading was sent to the landlord, who asked for the next one on 15 Sept. I scheduled a recurring 3-monthly follow-up from 15 Sept, a mid-June check with the landlord, and told both landlord and tenant.

## Where the case stands
Current reading photo sent to landlord (event 013); landlord replied (event 015) that next reading is needed 15 Sept. Recurring follow-ups now scheduled; nothing awaiting a reply.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Recurring follow-up from 15 Sept 2025, every 3 months, to ask tenant for a meter photo and forward to landlord | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REQUEST_INFORMATION | Check with landlord around 10 June whether a mid-June reading is still wanted | Ava, landlord | internal | A2 ✅ |
| 3 | REPLY_TO_TENANT | Thank tenant and say next request is mid September | Miles Fletcher, tenant | email | A4 ✅ |
| 4 | OTHER | Confirm to landlord the 15 Sept date and 3-monthly repeat | Ava, landlord | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We've noted that you next need the solar panel reading on 15 September, and we'll ask the tenant for a photo ahead of then and repeat every 3 months after that unless you tell us otherwise. Our original instruction had mid June as the next date, so we'll check with you around 10 June whether you still want a June reading as well. Kind regards, Northbridge Lettings

**A4 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading, which we've passed to the landlord. Nothing more is needed now. We'll be in touch around mid September to ask for the next photo, and then every 3 months. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Scheduling does not confirm the landlord wants readings beyond 15 Sept; the 3-monthly rule comes from the original agency instruction
- The photo shows the meter display appearing to read 16845; not independently verified

## Remaining work
- Agency: send tenant photo request from 15 Sept 2025 and repeat every 3 months
- Agency: check mid-June need with landlord around 10 June 2025

## Missing or unavailable information
- Whether a mid-June 2025 reading is still wanted
- How the photo reached the agency: tenant's email (event 012) had no visible attachment

## Conflicts between sources
- Original instruction said next due mid June; landlord's latest message says 15 Sept. Treated landlord's latest as current and scheduled a check on June.
- Event 008 names the caller as Oakfield Compliance, while the call was with the tenant; treated as a name mismatch.
- Tenant's email (event 012) has no photo, yet a photo was sent to the landlord; provenance unclear.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current reading is delivered and the landlord has replied. Outstanding is the recurring cycle: next request 15 Sept 2025, then every 3 months, plus a mid-June query.

**2. What is the next action, who is it for, and through which channel?**

Confirmations emailed to landlord and tenant; follow-ups scheduled internally (FUP-101 recurring from 15 Sept, FUP-102 10 June check).

**3. Does anything need a human decision, and why?**

No. It is routine and handled with dated follow-ups.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-15","purpose":"Ask tenant for a clear photo of the solar panel meter reading and send to landlord (landlord's stated next… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `schedule_follow_up` | {"due_on":"2025-06-10","purpose":"Check with landlord whether a mid-June reading is still wanted, given she has now said next is 15 Sept (or… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A3 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
