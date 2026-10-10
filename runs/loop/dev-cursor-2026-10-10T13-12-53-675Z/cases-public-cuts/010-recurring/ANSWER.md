# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's photo reached the landlord, and she replied that she next needs the reading on 15 September. I acknowledged this to both parties, set a follow-up for 8 September, added a note and returned the job to auto mode.

## Where the case stands
Current reading sent to landlord; landlord acknowledged and gave next due date 15 Sept. Job stays open as a recurring task, follow-up set for 2025-09-08.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow up on 2025-09-08 to ask tenant for next solar reading photo, due to landlord 15 Sept | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thank tenant and say we will ask again in early September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Acknowledge landlord's 15 September date | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September. We will ask the tenant for a photo ahead of that date and send it on to you. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for the solar panel reading photo. It has gone to the landlord. We will contact you again in early September to ask for the next one. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not verify the meter reading figure beyond what the attachment states
- The 15 September date comes only from the landlord's email; the frequency of every 3 months is not reconciled with it
- Ticket not closed

## Remaining work
- Request next photo from tenant on 2025-09-08 and forward to landlord by 15 Sept (agency)

## Missing or unavailable information
_None._

## Conflicts between sources
- Original request said next due mid June; landlord's latest statement says 15 September, which I treated as current.
- Tenant email event 012 contained only a signature, yet a photo was forwarded; I relied on the attachment on file.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This round is complete: the reading was sent to the landlord, who confirmed receipt. The next reading is outstanding for 15 September.

**2. What is the next action, who is it for, and through which channel?**

The next action is the 8 September follow-up asking the tenant (email) for a photo. Acknowledgements have already gone to the landlord and tenant by email.

**3. Does anything need a human decision, and why?**

No. This is routine and nothing needs authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant for a clear photo of solar panel readings so it reaches landlord by 15 September 2025 (date giv… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-010-recurring","note":"Reading (16845 per attachment) sent to landlord event 013; landlord replied event 015: next needed 15 … | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |

## Failed or unverified actions
_None._
