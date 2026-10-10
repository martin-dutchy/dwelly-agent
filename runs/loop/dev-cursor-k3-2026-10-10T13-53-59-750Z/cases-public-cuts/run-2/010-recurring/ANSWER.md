# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's reading photo went to the landlord, who replied that the next one is needed on 15 September. I acknowledged this to her, scheduled a tenant request for 8 September and noted the record. No human decision needed.

## Where the case stands
Current reading photo sent to landlord; landlord replied next needed 15 Sept. Ticket remains open (recurring), waiting on follow-up 2025-09-08.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow up on 2025-09-08 to ask tenant for next solar reading photo, due to landlord by 15 September | Miles Fletcher, tenant | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledged landlord's date and confirmed we will request the next reading ahead of it | Ava, landlord | email | A1 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Thank you, Ava. We have noted that you next need the solar panel reading on 15 September. We will ask the tenant for a photo ahead of that date and send it on. Nothing further is needed from you meanwhile.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not verify the meter reading beyond what the photo appears to show (16845)
- Does not confirm the tenant will supply the next photo
- Does not decide the recurring cadence beyond the landlord's stated date

## Remaining work
- Request next photo from tenant around 2025-09-08 and forward to landlord (agency)

## Missing or unavailable information
_None._

## Conflicts between sources
- Original request said next due mid June; landlord's latest statement says 15 September. Treated the landlord's latest as current.
- Event 013 attachment label 'attachment-80-document' is not in the case files; the PDF photograph record is present.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current reading was delivered to the landlord. Outstanding: the next reading, due to the landlord by 15 September 2025.

**2. What is the next action, who is it for, and through which channel?**

Done: confirmation emailed to the landlord (MSG-101). Next: follow-up on 2025-09-08 to ask the tenant for a photo by email.

**3. Does anything need a human decision, and why?**

No. It is routine and the landlord has given the date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"ticket_ref":"NBL-010-recurring","due_on":"2025-09-08","party":"Tenant","purpose":"Ask tenant for a clear photo of solar panel readings; la… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A3 | `add_note` | {"entity":"NBL-010-recurring","note":"Reading photo (display appears 16845) sent to landlord event 013. Landlord (event 015) says next neede… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
