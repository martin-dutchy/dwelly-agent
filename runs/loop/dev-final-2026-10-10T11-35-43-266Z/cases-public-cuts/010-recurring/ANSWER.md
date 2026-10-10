# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's solar reading was sent to the landlord, who replied that the next one is needed on 15 September. I acknowledged this to both parties and set a dated follow-up. No human decision needed.

## Where the case stands
Reading received from tenant and sent to landlord on 2025-01-17. Landlord acknowledged and said next reading needed 15 September. Follow-up set for that date. Nothing outstanding now.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait until 15 Sept 2025, then ask tenant for a clear solar meter photo and send to landlord | Tenant / Ava, landlord | internal | A1 ✅ |
| 2 | OTHER | Acknowledged landlord's 15 September date | Ava, landlord | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Thanked tenant and told them the next reading is wanted around 15 September | Miles Fletcher, tenant | email | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hi Ava, thank you. We have noted that you need the next solar panel reading on 15 September, and we will ask the tenant for a photo ahead of then and send it on. Kind regards, Northbridge Lettings

**A4 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Miles, thank you for the solar panel reading, it has gone to the landlord. They will next need a reading on 15 September, so we will get in touch with you shortly before then. Nothing else is needed for now. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the 15 September date applies to later quarters; the landlord only gave one date.
- Does not confirm the meter reading value beyond what the attachment shows (display appears to read 16845).

## Remaining work
- Next reading request around 15 Sept 2025 (agency, FUP-101).

## Missing or unavailable information
_None._

## Conflicts between sources
- Original request said next due mid June; the landlord's latest message says 15 September. I used the landlord's latest statement.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This cycle is complete: the photo was sent to the landlord and the landlord confirmed the next date, 15 September. Only the next request is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Follow-up on 2025-09-15 to ask the tenant (email) for the next photo and pass it to the landlord. Acknowledgements went to the landlord and tenant by email.

**3. Does anything need a human decision, and why?**

No. It is routine and the landlord gave a clear date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-15","purpose":"Landlord needs next solar panel meter reading photo on 15 September: ask tenant for a clear photo shortly … | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `add_note` | {"entity":"Flat 10, 180 Alder Lane, Cedarford, ZZ3 4ZZ","note":"Solar reading (display 16845) sent to landlord 2025-01-17. Landlord's latest… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hi Ava, thank yo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hi Mile… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `resume_auto` | {"ticket_ref":"010-recurring"} | 1 | ❌ failed | Ticket 010-recurring not found on read-back |

## Failed or unverified actions
- A5: resume_auto failed because no ticket with that reference exists (the case id is not a ticket ref). Not retried; the follow-up and note record the state.
