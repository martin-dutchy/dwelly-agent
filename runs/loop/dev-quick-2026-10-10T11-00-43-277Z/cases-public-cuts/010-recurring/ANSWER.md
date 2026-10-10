# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The mid-June reading was obtained and sent to the landlord on 2025-01-17. The landlord then set the next reading for 15 September 2025, which replaces the earlier mid-June date. The job is on hold with a follow-up on 2025-09-01 to request the next photo, and both the landlord and tenant have been messaged.

## Where the case stands
Recurring solar-reading job NBL-010-recurring (Flat 10, 180 Alder Lane). The mid-June reading was received from the tenant and sent to the landlord on 2025-01-17 (event 013). The landlord has since set the next reading for 15 September 2025 (event 015). The job is on hold until 2025-09-01, when the tenant should be asked for the next photo.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Confirm to landlord Ava that the next solar reading is due 15 September 2025 and that the tenant will be asked for a photo in good time. | Ava, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant Miles Fletcher that the photo was received and passed on, and that the next reading is due 15 September. | Miles Fletcher, tenant | sms | A4 ✅ |
| 3 | WAIT | On 2025-09-01, ask tenant Miles Fletcher for a clear photo of the solar meter reading ahead of the 15 September due date, then send it to the landlord. | Miles Fletcher, tenant | email | A2 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava,
> 
> Thank you for your message. We have noted that the next solar panel reading for Flat 10, 180 Alder Lane, Cedarford, ZZ3 4ZZ is due on 15 September 2025. We will ask the tenant for a clear photo in good time before then and send it to you.
> 
> Kind regards,
> Northbridge Lettings

**A4 · send_message → Miles Fletcher (tenant) via sms, 07700 900978** (verified)

> Hello Miles, thank you for sending the solar panel meter photo for Flat 10, 180 Alder Lane. It has been passed to the landlord. No further photo is needed now. We will be in touch in early September about the next reading, which is due on 15 September. Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the 2025-01-17 photo does not confirm the reading against any earlier reading.
- Setting the next date does not confirm the tenant will send the September photo.
- The landlord's 15 September date supersedes the original every-3-months schedule; the recurrence after September is not confirmed.

## Remaining work
- On 2025-09-01 (FUP-101): ask the tenant for the 15 September solar photo and chase if needed.
- Send the September photo to the landlord before 15 September 2025.
- Confirm the ongoing recurrence with the landlord, since their note gives only one date.

## Missing or unavailable information
- Landlord's ongoing recurrence after September 2025 (the original request said every 3 months).

## Conflicts between sources
- The original request and the ticket say 'every 3 months' with the next reading due mid-June. The landlord's latest message (event 015, 2025-01-17) says the next reading is 15 September. I trusted the landlord's latest instruction.
- Event 008 says the call came from 'Oakfield Compliance', but the job is logged under Northbridge Lettings. Not material to this task, but noted.
- The tenant's reply (event 012) has no email address, so the tenant was messaged by SMS on the phone number from his own signature. The landlord email uses the existing thread (event 015).

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

The current reading was received and sent to the landlord (event 013). The landlord has set the next reading for 15 September 2025 (event 015). Nothing is due until 1 September 2025, when the next photo should be requested from the tenant. The recurrence after September is not yet confirmed.

**2. 2. What is the next action, who is it for, and through which channel?**

Email landlord Ava to confirm the 15 September date (MSG-102, verified). SMS tenant Miles Fletcher to thank him and say the next reading is due 15 September (MSG-103, verified). Follow-up FUP-101 on 2025-09-01 asks the tenant for the September photo by email. The job is on hold until then.

**3. 3. Does anything need a human decision, and why?**

No. The landlord has given a clear instruction, the photo has been received, and the action is routine. The only open point (recurrence after September) can be confirmed with the landlord when the September cycle starts, so no escalation is needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `put_on_hold` | {"ticket_ref":"010-recurring","reason":"Other","comment":"Mid-June solar reading received 2025-01-17 (event 013 to landlord). Landlord Ava (… | 1 | ❌ failed | Ticket 010-recurring not found on read-back |
| A2 | `schedule_follow_up` | {"ticket_ref":"010-recurring","due_on":"2025-09-01","purpose":"Ask tenant Miles Fletcher for a clear photo of the solar panel meter reading … | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A3 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"010-recurr… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"sms","contact":"07700 900978","ticket_ref":"010-recurring","body":"H… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-010-recurring","reason":"Other","comment":"Mid-June solar reading received 2025-01-17 (event 013 to landlord). Landlord A… | 1 | ✅ verified | Ticket NBL-010-recurring read back after put_on_hold |

## Failed or unverified actions
- A1: put_on_hold failed because I used the case id '010-recurring' instead of the real ticket ref. I listed tickets, found NBL-010-recurring, and re-applied the hold, which verified as A5.
