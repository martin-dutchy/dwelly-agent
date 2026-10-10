# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's reading photo was sent to the landlord, who acknowledged it and said they next need it on 15 September. I acknowledged this to the landlord and the tenant, set a follow-up for 8 September and left the recurring ticket open.

## Where the case stands
Reading photo sent to landlord; landlord replied that next reading is needed 15 September. Ticket NBL-010-recurring open as a recurring task, in auto mode, with follow-up set for 2025-09-08.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait until 2025-09-08, then ask tenant for next solar reading photo for the landlord's 15 Sept date | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thanked tenant, said photo passed on and they will hear again in early September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Acknowledged landlord's 15 September date and asked whether 3-monthly readings continue after that | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September. We will ask the tenant for a photo in early September and send it on. If you would still like readings every 3 months after that, just let us know.

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for the solar panel reading photo. It has been passed to the landlord. We will email you again in early September to ask for the next one. Nothing else is needed from you until then.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the photo does not confirm the reading is accurate; the attachment says the display 'appears to show 16845'.
- Follow-up does not confirm the cadence after 15 September; landlord has been asked.

## Remaining work
- Agency: ask tenant for next photo around 2025-09-08 and forward to landlord by 15 Sept
- Agency: clarify with landlord whether quarterly readings continue

## Missing or unavailable information
- Whether the landlord wants readings every 3 months after 15 September (original request said every 3 months; landlord gave a single date).

## Conflicts between sources
- Original request says next due mid June; the landlord's latest statement says 15 September. I trusted the landlord's most recent statement.
- Tenant email (event 012) has no visible photo, but the photo file is on the case and was sent to the landlord.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current reading has been delivered and the landlord has acknowledged it. The only outstanding item is the next reading, due 15 September, with the cadence after that to be confirmed.

**2. What is the next action, who is it for, and through which channel?**

Wait for the follow-up on 2025-09-08, then email the tenant, Miles Fletcher, for a photo. Both parties have already been acknowledged by email.

**3. Does anything need a human decision, and why?**

No. This is routine and fully handled. The odd details (the 'Oakfield Compliance' call and the tenant email with no visible attachment) are noted on the ticket and need no decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant for clear photo of solar panel reading, to send to landlord by 15 September 2025 (landlord's st… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-010-recurring","note":"Reading photo (meter display appears 16845) sent to landlord 17 Jan. Landlord says next needed 15 Sept… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |

## Failed or unverified actions
_None._
