# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The reading was delivered to the landlord, who replied that the next one is needed 15 September. I acknowledged this to the landlord, thanked the tenant, scheduled a 1 September follow-up and noted the record. No human decision needed.

## Where the case stands
Current reading sent to landlord, who acknowledged and gave next due date 15 September. Ticket stays open as a recurring task, waiting on the early-September tenant request (FUP-101).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow-up 1 Sept 2025 to ask tenant for next meter photo, due to landlord 15 Sept | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thanked tenant, said we will ask again in early September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Acknowledged landlord's 15 September date | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September, and we will ask the tenant for a photo ahead of then. We will send it to you once we have it.
> 
> Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading. It has gone to the landlord. We will email you again in early September to ask for the next photo, so there is nothing you need to do until then.
> 
> Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the reading figure 16845 beyond what the photo record states
- Does not set cadence beyond landlord's stated 15 September
- Ticket not closed: it is a recurring job

## Remaining work
- Ask tenant for photo on 1 Sept 2025 and send to landlord by 15 Sept (agency)
- Check cadence after September with landlord

## Missing or unavailable information
- Tenant's email (event 012) shows no visible photo attached; source of the photo not confirmed
- Ticket ref is the only record; no later cadence stated by landlord

## Conflicts between sources
- Original request said next due mid June; landlord's latest email says 15 September. Treated landlord's latest as current.
- Event 013 says attachment missing from files, but the PDF is present; treated the PDF as the record.
- Event 012 tenant email has no visible attachment, yet the photo was sent on to the landlord.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This round is complete: photo sent to landlord, who confirmed next due 15 September. Outstanding: ask tenant for the next photo in early September and send it on.

**2. What is the next action, who is it for, and through which channel?**

Follow-up FUP-101 on 1 Sept 2025 to email the tenant for the photo; acknowledgements already sent by email to landlord and tenant.

**3. Does anything need a human decision, and why?**

No. It is routine. The only oddity (an unexplained 'Oakfield Compliance' caller in event 008) is noted, with no data shared.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Ask tenant for a clear photo of solar panel meter reading, to send to landlord by 15 September 2025 (landl… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-010-recurring","note":"Reading photo (display 16845) sent to landlord 17/01. Landlord says next needed 15 September; supersed… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
