# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The solar meter photo was sent to the landlord, who asked for the next one on 15 September. I confirmed this to the landlord and tenant, scheduled a recurring 3-monthly follow-up from 15 Sept, and put the ticket on hold with that review date.

## Where the case stands
Reading (16845 per attachment) sent to landlord 17 Jan 2025; landlord replied next needed 15 Sept. Ticket NBL-010-recurring on hold until 2025-09-15, recurring every 3 months. Nobody is waiting on us.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold until 15 Sept 2025, then ask tenant for next meter photo; repeat every 3 months | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thanked tenant and said when we will next ask | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Confirmed 15 September date and 3-monthly repeat to landlord | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September. We will ask the tenant for the photo ahead of that date and send it on, and then repeat every 3 months unless you tell us otherwise. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading, it has been passed to the landlord. We will email you again around 15 September to ask for the next photo, and then roughly every 3 months. Nothing is needed from you until then. Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not establish the reading is accurate beyond the photo's apparent 16845
- Does not close the job: it is recurring
- Does not confirm whether the landlord wants the 3-monthly cadence after 15 Sept

## Remaining work
- Request tenant photo on 15 Sept 2025 then every 3 months (agency, FUP-101)
- Forward each reading to landlord

## Missing or unavailable information
- Tenant's email 012 contained only a signature; how the photo reached us is not shown
- Attachment-80-document named in event 013 differs from file attachment-01 present

## Conflicts between sources
- Original brief said next due mid June; landlord's latest statement says 15 September; trusted the landlord's latest
- Event 008 caller named as Oakfield Compliance, though the call was with the tenant; treated as the tenant
- Event 013 names attachment-80-document but the file present is attachment-01

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This cycle's reading is delivered and the landlord has acknowledged it. Outstanding: next tenant photo request on 15 Sept 2025, then every 3 months.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant on 15 Sept 2025 for the next photo (FUP-101, recurring). Landlord and tenant were emailed now to confirm.

**3. Does anything need a human decision, and why?**

No. It is routine and the landlord has given the date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-15","purpose":"Ask tenant for a clear photo of the solar panel meter reading for the landlord (landlord asked 17 Jan 2025… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"010-recurring","reason":"Other","comment":"Reading sent to landlord 17 Jan 2025. Waiting for next due date 15 Sept 2025 (land… | 1 | ❌ failed | Ticket 010-recurring not found on read-back |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-010-recurring","reason":"Other","comment":"Reading sent to landlord 17 Jan 2025. Waiting for next due date 15 Sept 2025 (… | 1 | ✅ verified | Ticket NBL-010-recurring read back after put_on_hold |

## Failed or unverified actions
- A4: First hold used wrong ticket ref 010-recurring; retried with NBL-010-recurring and verified as A5
