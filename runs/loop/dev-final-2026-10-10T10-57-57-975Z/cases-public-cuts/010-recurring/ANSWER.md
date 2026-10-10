# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The reading photo went to the landlord and she replied with the next due date of 15 Sept. I acknowledged her, set a follow-up for 8 Sept 2025, noted the record anomalies, and put the ticket on hold until then. No human decision is needed.

## Where the case stands
Current reading photo (display 16845) sent to landlord Ava. She replied that she next needs it on 15 Sept 2025. Ticket is on hold until 8 Sept 2025 to request the next photo. It stays open as a recurring job.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledge the landlord's reply, confirm the 15 September date and ask whether she still wants 3-monthly readings afterwards | Ava, landlord | email | A3 ✅ |
| 2 | WAIT | Hold the ticket and follow up on 8 Sept 2025 to ask the tenant for the next photo | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September. We will ask the tenant for a photo beforehand and send it on. Please tell us if you would still like readings every 3 months after that.
> 
> Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The follow-up and hold do not mean the tenant has agreed to future readings.
- The photo shows a display of about 16845; it does not verify that the reading is accurate or who took it.
- Landlord's 15 Sept date does not confirm whether the 3-monthly cycle continues.

## Remaining work
- Ask tenant for the next photo around 8 Sept 2025 (agency).
- Get landlord's confirmation of the cadence after 15 Sept (agency).

## Missing or unavailable information
- Tenant's event 012 email shows no attachment, so the source of the photo is unconfirmed.
- The 'Oakfield Compliance' caller in event 008 is unexplained.

## Conflicts between sources
- Original instruction said every 3 months with the next due mid June; the landlord's latest email says 15 September. I used the landlord's latest statement.
- The tenant's email (event 012) had no photo, yet a photo was sent to the landlord. The photo's origin is unclear.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This cycle is complete: the photo was sent to the landlord. The ticket stays open as a recurring job. The next reading is due 15 Sept 2025 and the tenant request is outstanding until then.

**2. What is the next action, who is it for, and through which channel?**

Done now: an acknowledgement email to the landlord Ava on the existing thread, and a follow-up on 8 Sept 2025 to email the tenant, Miles Fletcher, for the next photo.

**3. Does anything need a human decision, and why?**

No. It is routine and the landlord's instruction is clear. The minor record anomalies are noted on the ticket.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant (Miles Fletcher) for a clear photo of the solar panel meter reading so it can go to landlord Av… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `add_note` | {"entity":"NBL-010-recurring","note":"17 Jan 2025: Reading photo (display 16845) sent to landlord; landlord replied next needed 15 Sept (lat… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-010-recurring","reason":"Other","comment":"Current reading delivered. Waiting for next due date, 15 Sept 2025, to request… | 1 | ✅ verified | Ticket NBL-010-recurring read back after put_on_hold |

## Failed or unverified actions
_None._
