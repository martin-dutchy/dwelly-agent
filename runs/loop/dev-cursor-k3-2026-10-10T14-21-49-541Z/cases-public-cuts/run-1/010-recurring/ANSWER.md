# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The January reading was collected and sent to the landlord, who acknowledged it and named 15 September as the next date. That differs from the standing mid June instruction, so I asked the landlord to confirm. I also thanked the tenant and set a recurring quarterly follow-up.

## Where the case stands
This round's reading is done: the photo (meter display appears to read 16845) was sent to the landlord, who acknowledged it and gave 15 September as the next date. The recurring quarterly task stays open. Waiting on the landlord to confirm whether mid June is still wanted.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm whether mid June is still wanted alongside 15 September, reply by 31 Jan | Ava, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Thank tenant and say next request is around mid June | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | WAIT | Recurring 3-monthly follow-up starting 9 June 2025 to request the next reading | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you, I've noted 15 September. Our standing instruction for Flat 10, 180 Alder Lane is a reading every 3 months, with the next due mid June. Do you want the mid June reading as well as 15 September, and then every 3 months? Unless you tell us otherwise by 31 January, we'll keep to every 3 months from mid June and include 15 September. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading, it has been passed to the landlord. We'll be in touch again around mid June to ask for the next photo, so there is nothing you need to do until then. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reading is recorded as the photo's apparent display only; not independently verified.
- Landlord's 15 September does not by itself cancel the mid June schedule.

## Remaining work
- Agency to settle the cadence once the landlord answers, then send tenant requests on schedule (FUP-101).

## Missing or unavailable information
- Whether the landlord wants mid June plus 15 September, or 15 September only.

## Conflicts between sources
- Standing instruction says every 3 months with next due mid June; landlord says next needed 15 September. Treated as unresolved and asked the landlord.
- Tenant email (event 012) contained no photo, yet a photo was sent to the landlord; the source of the photo is unclear. The attachment itself was read and is a meter photo for this property.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current reading was supplied and the landlord acknowledged it. Outstanding: the cadence (mid June vs 15 September) and the recurring requests to the tenant.

**2. What is the next action, who is it for, and through which channel?**

The landlord has been emailed to confirm the cadence, the tenant has been thanked by email, and a recurring follow-up is scheduled from 9 June 2025.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord's clarification can settle the date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-06-09","purpose":"Request quarterly solar panel meter reading photo from tenant (Flat 10, 180 Alder Lane) for landlord; firs… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
