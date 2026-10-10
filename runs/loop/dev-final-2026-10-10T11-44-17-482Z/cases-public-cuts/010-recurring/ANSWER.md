# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The photo of the solar meter reading went to the landlord, who replied that the next one is needed on 15 September. I acknowledged this to the landlord and tenant, scheduled a follow-up for 2025-09-15 and noted the record. No human decision is needed.

## Where the case stands
Reading photo sent to landlord; landlord replied that the next reading is needed 15 Sept. Job stays open (recurring) with a follow-up scheduled for 2025-09-15.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow-up on 15 Sept 2025 to ask tenant for next meter photo and pass to landlord | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thanked tenant and said we will ask again in early September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Acknowledged landlord's 15 September date | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15 September, and we will ask the tenant for a photo ahead of that date and send it on to you. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for helping with the solar panel reading. The landlord has it now. We will be in touch around early September to ask for the next photo, which is needed by 15 September. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledgements do not confirm the meter reading is accurate (display 'appears' to read 16845)
- Does not establish the reading frequency beyond the landlord's stated 15 Sept date

## Remaining work
- Collect next reading photo around 15 Sept 2025 (agency, FUP-101)
- Confirm with landlord whether 3-monthly cadence continues after 15 Sept

## Missing or unavailable information
- Whether the tenant sent the photo (event 012 had only a signature)
- Whether the cadence after 15 Sept is still every 3 months

## Conflicts between sources
- Original brief said next due mid June; landlord's latest message says 15 September. Trusted the landlord's latest statement.
- The call at event 008 mentions Oakfield Compliance, not clearly the tenant; the source of the photo is unclear.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

This cycle is done: the reading photo was sent to the landlord. The next reading is due 15 Sept 2025 per the landlord, and that is outstanding.

**2. What is the next action, for whom, via which channel?**

Acknowledgement emails to the landlord (A2) and tenant (A3) are sent. The 15 Sept follow-up (A1) will trigger a photo request to the tenant by email.

**3. Does anything need a human decision?**

No. It is routine.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"ticket_ref":"NBL-010-recurring","due_on":"2025-09-15","purpose":"Landlord (Ava) needs next solar panel meter reading photo on 15 September… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-010-recurring","note":"Reading photo (display appears 16845) sent to landlord event 013. Landlord event 015 says next needed … | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
