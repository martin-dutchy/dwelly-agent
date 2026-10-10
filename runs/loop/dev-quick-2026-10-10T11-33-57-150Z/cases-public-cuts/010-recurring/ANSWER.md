# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** n/a

The January reading was received and sent to the landlord, who has now said the next reading is due 15 September rather than mid June. I acknowledged this with the landlord, thanked the tenant, returned the job to auto mode and put it on hold with a follow-up on 1 September to request the next photo.

## Where the case stands
Recurring solar-panel reading job for Flat 10, 180 Alder Lane. The January reading (16845) was received from the tenant and sent to the landlord (event 013). The landlord confirmed on 17 Jan that the next reading is due 15 September (event 015). The ticket is on hold until 2025-09-01 for the next photo request.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Acknowledged the landlord's reply and confirmed the next reading is due 15 September, with the photo to be requested in good time. | Ava, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thanked the tenant for the reading, said it has been passed to the landlord, and said the next reading is due 15 September. | Miles Fletcher, tenant | email | A2 ✅ |
| 3 | WAIT | Scheduled a follow-up on 2025-09-01 to request the tenant's photo ahead of 15 September. | Miles Fletcher, tenant | email | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Good morning Ava,
> 
> Thank you for confirming. We have noted that the next solar panel reading for Flat 10, 180 Alder Lane is due on 15 September. We will ask the tenant for a clear photo of the reading in good time before then and send it to you.
> 
> Kind regards,
> Northbridge Lettings

**A2 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Good morning Miles,
> 
> Thank you for sending the solar panel reading for Flat 10, 180 Alder Lane. We have passed it on to the landlord, so there is nothing more you need to do for now.
> 
> The next reading is due on 15 September. We will be in touch nearer the time to ask for a clear photo.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the landlord's reading does not confirm the reading is correct beyond what the photo shows.
- Having the next date does not confirm the tenant will send the photo in September.
- The ticket is not closed: it is a recurring job.

## Remaining work
- On 2025-09-01, request a clear photo of the solar reading from the tenant ahead of the 15 September reading date, then send it to the landlord. Owner: agency operations.

## Missing or unavailable information
- The tenant's and landlord's email addresses are not in the case files; replies used the existing threads.

## Conflicts between sources
- Initial request said the next reading was due mid June; the landlord's latest message (event 015, 17 Jan) says 15 September. I followed the landlord's later instruction.
- Event 013 refers to attachment-80-document, but the file on the case is attachment-01 (the solar meter photo). The landlord acknowledged receipt in event 015, so I treated the photo as delivered. The reading 16845 is taken from the file on the case.
- The ticket reference in the system is NBL-010-recurring, not 010-recurring.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The January reading was received and sent to the landlord. The landlord has confirmed the next reading is due 15 September 2025. Outstanding: the tenant's photo for the September reading, to be requested on 1 September 2025.

**2. What is the next action, who is it for, and through which channel?**

Acknowledge the landlord (Ava) and thank the tenant (Miles Fletcher) by email on the existing threads. Then wait until 1 September and request the tenant's photo by email.

**3. Does anything need a human decision, and why?**

No. The landlord's change of date is a scheduling update from the entitled party, not a spend or policy decision, so it is recorded and acted on without escalation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Good morning Ava… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Good mo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `resume_auto` | {"ticket_ref":"010-recurring"} | 1 | ❌ failed | Ticket 010-recurring not found on read-back |
| A4 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-010-recurring","due_on":"2025-09-01","purpose":"Request a clear photo of the solar panel reading from the tenant (Miles F… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-010-recurring","reason":"Other","comment":"Recurring reading. Landlord confirmed (event 015) next reading is due 15 Septe… | 1 | ✅ verified | Ticket NBL-010-recurring read back after put_on_hold |

## Failed or unverified actions
- A3: First resume_auto used the case label 010-recurring, which was not found. Retried with the real ref NBL-010-recurring from list_tickets, which verified as A4.
