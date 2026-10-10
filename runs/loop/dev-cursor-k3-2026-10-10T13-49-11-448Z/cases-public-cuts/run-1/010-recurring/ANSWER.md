# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's solar meter photo was sent to the landlord, who said the next one is needed on 15 September. I told both parties, set a follow-up for 1 September and returned the ticket to auto mode. No human decision is needed.

## Where the case stands
Current reading sent to landlord; landlord replied that next one is needed 15 Sept. Ticket in auto mode, waiting on the follow-up dated 2025-09-01.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow-up 2025-09-01 to ask tenant for next solar meter photo ahead of landlord's 15 Sept date | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thanked tenant, said nothing more is needed now and that we will email in early September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | REQUEST_INFORMATION | Confirmed 15 Sept with landlord and asked whether 3-monthly readings continue after that | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September. We will ask the tenant for a photo ahead of that date and send it to you. Our original note said mid June, so please tell us if you also want readings every 3 months after September. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for the solar meter photo, it has been passed to the landlord. Nothing more is needed now. We will email you in early September to ask for the next reading. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The follow-up does not confirm the tenant will supply the next photo.
- The reading value 16845 comes from the attached report; it is not independently verified.
- Whether readings continue every 3 months after September is not confirmed.

## Remaining work
- Email tenant on 2025-09-01 for the next photo and forward it to landlord by 15 Sept (agency).
- Act on landlord's answer about ongoing cadence.

## Missing or unavailable information
- Whether the landlord wants readings every 3 months after 15 Sept.
- Who 'Oakfield Compliance' in event 008 is.

## Conflicts between sources
- Original request said next due mid June; landlord's latest says 15 Sept. Trusted the landlord's latest statement.
- Event 008 names the caller as Oakfield Compliance, not the tenant; unexplained.
- Event 013 attachment is listed as missing, but a matching PDF is in the case files.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This cycle is complete: the photo went to the landlord and the landlord acknowledged it. The next reading is due 15 Sept. Outstanding: ask the tenant in early Sept, and clarify whether the 3-monthly cadence continues.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant on 2025-09-01 (follow-up FUP-101) for the next photo. Today's replies to the landlord and tenant are already sent by email.

**3. Does anything need a human decision, and why?**

No. It is routine and the landlord's date is clear.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Ask tenant for a clear photo of the solar panel meter reading; landlord needs it by 15 September 2025. The… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-010-recurring","note":"Reading (display 16845) sent to landlord 17 Jan 2025. Landlord says next needed 15 Sept; earlier note … | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |

## Failed or unverified actions
_None._
