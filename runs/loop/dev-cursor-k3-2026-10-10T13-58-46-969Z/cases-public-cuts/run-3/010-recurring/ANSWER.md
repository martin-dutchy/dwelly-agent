# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The solar reading photo was sent to the landlord, who replied that they next need it on 15 September. I told the tenant nothing more is needed now, asked the landlord whether the 3-monthly cadence still applies, and set a follow-up for 1 September 2025. No human decision is needed.

## Where the case stands
Reading photo delivered to landlord; landlord replied with next date 15 September. Ticket NBL-010-recurring still at init; waiting only for the next cycle. Follow-up set for 1 Sept 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow-up set for 1 Sept 2025 to request next solar reading photo from tenant ahead of landlord's 15 Sept date | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thanked tenant, said nothing more needed now and we will contact them before 15 September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | REQUEST_INFORMATION | Acknowledged landlord's 15 Sept date and asked whether the 3-monthly interval still applies | Ava, landlord | email | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading. We have passed it to your landlord. They have asked for the next one on 15 September, so we will message you shortly before then. Nothing more is needed from you now.

**A4 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar reading on 15 September and will ask the tenant for it just before then. Our records said every 3 months, so please tell us if you still want readings at that interval rather than just this date.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not verify the meter reading 16845 or who took the photo
- Does not establish whether readings stay quarterly
- Sending the email does not mean the landlord's question is answered

## Remaining work
- Agency: request next reading from tenant around 1 Sept 2025
- Landlord: confirm whether quarterly cadence still applies

## Missing or unavailable information
- Whether the tenant actually sent the photo (event 012 has no visible attachment)
- Whether readings remain every 3 months

## Conflicts between sources
- Ticket says every 3 months/next mid June; landlord's latest (event 015) says 15 September; trusted the landlord's latest and asked about cadence.
- Event 013 says photo 'for mid June' though sent in January.
- Event 008 mentions a caller from Oakfield Compliance, unverified third party; nothing disclosed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This cycle is complete: the photo was sent to the landlord and the landlord acknowledged it, asking for the next one on 15 September. Outstanding: the next request to the tenant, and confirmation of the cadence.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant (Miles Fletcher) for the next reading around 1 September 2025 (FUP-101). Today I emailed the tenant and landlord to acknowledge the date.

**3. Does anything need a human decision, and why?**

No. This is routine and fully handled by follow-up. Minor record oddities are noted on the ticket.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Ask tenant for clear photo of solar panel meter reading, for landlord, needed by 15 September (landlord Av… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `add_note` | {"entity":"NBL-010-recurring","note":"17 Jan 2025: Reading photo (16845) sent to landlord (event 013); landlord replied next needed 15 Sept … | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
