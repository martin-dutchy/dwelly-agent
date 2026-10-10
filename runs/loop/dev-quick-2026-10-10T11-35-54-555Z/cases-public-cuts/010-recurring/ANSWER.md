# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The June solar reading was supplied, sent to the landlord, and acknowledged. The landlord has moved the next required date to 15 September 2025, which supersedes the original mid-June schedule. I recorded this, set a follow-up for 1 September 2025, resumed auto mode, and informed the landlord and tenant.

## Where the case stands
Recurring solar-panel reading task for Flat 10, 180 Alder Lane (ticket NBL-010-recurring, stage init). The June reading request is complete: the tenant (Miles Fletcher) supplied a reading photo, which was sent to the landlord (Ava) at event 013, and she replied at event 015. Nothing is outstanding for the current cycle. The next reading is due 15 September 2025, and a follow-up is set for 1 September 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the landlord the next reading is needed by 15 September 2025 and will be requested from the tenant in early September. | Ava, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the reading was received, no action is needed now, and the next reading is due by 15 September 2025. | Miles Fletcher, tenant | email | A5 ✅ |
| 3 | WAIT | Request the reading photo from the tenant in early September, then send it to the landlord before 15 September. | Miles Fletcher, tenant | email | A2 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Dear Ava,
> 
> Thank you for your reply. We have noted that the next solar panel reading is needed by 15 September 2025, and we will request it from the tenant in early September.
> 
> Kind regards
> Northbridge Lettings

**A5 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Dear Miles,
> 
> Thank you for sending the solar panel reading for Flat 10, 180 Alder Lane. It has been passed to the landlord, so no further action is needed from you for now.
> 
> The next reading is due by 15 September 2025. We will be in touch in early September to ask for a photo.
> 
> Kind regards
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The photo on file was sent to the landlord, but the attachment named in event 013 (attachment-80-document) is not in the case files. Only attachment-01 is visible, so I have not confirmed the exact file the landlord received.
- Sending the landlord's date does not confirm the tenant will supply the photo in time.
- The ticket stays open as a recurring job; it is not closed.

## Remaining work
- Early September 2025: request the reading photo from the tenant and send it to the landlord before 15 September 2025 (owner: operations, follow-up FUP-101).

## Missing or unavailable information
- Whether the landlord received the same file as attachment-01 (event 013 attachment-80-document is missing).
- The tenant's email address is not in the case; I used the existing thread from event 012.

## Conflicts between sources
- The original request and event 013 say the next reading is due mid-June 2025. The landlord's latest message (event 015, 2025-01-17) says the next reading is needed 15 September. I trusted the landlord's most recent statement.
- Event 008 names Oakfield Compliance as the caller, but the call is logged under Northbridge Lettings. I did not act on it; the tenant's own email thread was used for contact.
- Event 013 cites attachment-80-document, but the file in the case is attachment-01. The contents of the photo were not restated beyond what the file shows.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

The June cycle is complete: the reading was received from the tenant, sent to the landlord at event 013, and acknowledged at event 015. Outstanding is the September cycle: the landlord needs the next reading by 15 September 2025. The next step is a tenant request in early September.

**2. 2. What is the next action, who is it for, and through which channel?**

Confirmation to the landlord (Ava) by email (A4) and to the tenant (Miles Fletcher) by email (A5) that the next reading is due by 15 September 2025. A follow-up (FUP-101) on 1 September 2025 will request the photo from the tenant by email, then send it to the landlord.

**3. 3. Does anything need a human decision, and why?**

No. This is routine recurring work. The landlord's stated date supersedes the original mid-June schedule, and no spend, approval or dispute is involved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-010-recurring","note":"Solar reading photo received from tenant and sent to landlord (event 013, 2025-01-17). Landlord confirmed… | 1 | ✅ verified | Ticket NBL-010-recurring read back at stage init |
| A2 | `schedule_follow_up` | {"ticket_ref":"NBL-010-recurring","due_on":"2025-09-01","party":"Tenant (Miles Fletcher) and landlord (Ava)","purpose":"Request the solar pa… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A3 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |
| A4 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
