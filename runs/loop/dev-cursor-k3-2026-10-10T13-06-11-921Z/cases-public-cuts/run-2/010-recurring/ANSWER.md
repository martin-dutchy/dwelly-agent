# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The solar meter reading photo was sent to the landlord, who thanked us and said the next one is needed on 15 September. I acknowledged this, set a follow-up for 8 Sept 2025 and noted the conflict with the original mid-June date.

## Where the case stands
Reading photo supplied to landlord on 17 Jan 2025; landlord replied, next reading needed 15 September. Nothing outstanding until the follow-up on 8 Sept 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledge landlord's date by email and confirm we will ask tenant for the next photo ahead of 15 Sept | Ava, landlord | email | A1 ✅ |
| 2 | WAIT | Follow-up on 8 Sept 2025 to request next reading photo from tenant | Miles Fletcher, tenant | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hi Ava, thank you. We've noted that you next need the solar panel reading for Flat 10, 180 Alder Lane on 15 September. We'll ask the tenant for a photo ahead of that date and send it on. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The photo's reading (16845 per the attachment) is not verified by us beyond the document; the tenant's email had no visible attachment.
- Acknowledging the date does not commit the tenant to anything yet.

## Remaining work
- Request next photo from tenant around 8 Sept 2025 and send to landlord by 15 Sept (agency ops).

## Missing or unavailable information
- Tenant's email (event 012) contained no visible photo, so how the photo reached us is not shown; the ticket reference was not available to close the job.

## Conflicts between sources
- Original request said next reading due mid June; landlord's latest message says 15 September. Trusted the landlord's most recent statement.
- Event 008 says a caller from Oakfield Compliance agreed to send the photo, which does not match the tenant being the sender; noted, no action needed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This round is complete: the photo has gone to the landlord, who replied with 15 September as the next date. Only the next reading request is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Acknowledgement email to the landlord Ava (sent), then a follow-up on 8 Sept 2025 to ask the tenant for the next photo by email.

**3. Does anything need a human decision, and why?**

No. This is routine and needs no authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hi Ava, thank yo… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant (Miles Fletcher) for a clear photo of the solar panel meter reading; landlord needs it by 15 Se… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A3 | `add_note` | {"entity":"Flat 10, 180 Alder Lane","note":"Solar reading photo sent to landlord 17 Jan 2025 (event 013). Tenant's email (event 012) had no … | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
