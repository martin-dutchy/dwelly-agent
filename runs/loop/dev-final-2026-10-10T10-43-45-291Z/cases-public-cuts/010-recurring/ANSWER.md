# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The January reading was sent to the landlord, who replied with a new due date of 15 September. I acknowledged this, set a follow-up for 8 September to collect the next photo, and noted the oddities on the ticket.

## Where the case stands
Current reading (16845) sent to landlord Ava on 17 Jan; she replied that she next needs it on 15 Sept. Ticket stays open at init for the recurring cycle; nobody is waiting on anyone now. Follow-up set for 8 Sept 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledged landlord's date and confirmed we will request the photo beforehand | Ava, landlord | email | A2 ✅ |
| 2 | WAIT | Follow-up to ask tenant for the next meter photo before 15 Sept | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September, and we will ask the tenant for a photo beforehand and send it on. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the photo does not verify who took it or that the reading is accurate
- The follow-up does not confirm the cycle continues every 3 months after 15 Sept
- Acknowledging the landlord does not contact the tenant

## Remaining work
- On 8 Sept 2025 ask tenant for a clear meter photo and forward it to landlord by 15 Sept (agency)
- Confirm with landlord whether 3-monthly cadence continues (agency)

## Missing or unavailable information
- Whether the tenant actually supplied the photo (their email held only a signature)
- Who Oakfield Compliance in event 008 is

## Conflicts between sources
- Original 'mid June' due date vs landlord's latest 'next 15 Sept': trusted the landlord's most recent statement.
- Tenant email had no photo, yet a photo was sent to the landlord; call note mentions 'Oakfield Compliance' rather than the tenant.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The reading request is done for now: the photo (16845) went to the landlord, who confirmed she next needs it on 15 Sept. Outstanding: collecting the next reading from the tenant before then.

**2. What is the next action, who is it for, and through which channel?**

Acknowledgement emailed to landlord Ava (done). Next, on 8 Sept 2025, an email request to the tenant for a photo (follow-up FUP-101).

**3. Does anything need a human decision, and why?**

No. It is routine. A human could optionally check the unexplained 'Oakfield Compliance' reference and the provenance of the photo.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant (Miles Fletcher) for a clear photo of solar panel meter readings, to send to landlord Ava by 15… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-010-recurring","note":"Landlord (event 015, 17 Jan 2025) says next reading needed 15 Sept, superseding 'mid June'. Reading 16… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
