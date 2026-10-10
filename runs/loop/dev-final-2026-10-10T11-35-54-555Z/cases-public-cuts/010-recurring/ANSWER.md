# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's meter photo reached the landlord, who confirmed she next needs a reading on 15 September. I acknowledged this to the landlord and tenant, scheduled a follow-up for 15 September and returned the job to auto mode.

## Where the case stands
Photo of the solar meter reading received and sent to the landlord (event 013). Landlord replied that she next needs it on 15 September. Follow-up scheduled. Nothing outstanding until then.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait until 15 Sept 2025, then ask tenant for the next meter photo and send it to the landlord | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thank tenant, confirm nothing more needed now, say we will ask again around 15 September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Acknowledge landlord's 15 September date | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We've noted that you next need the solar panel reading on 15 September, and we'll ask the tenant for a photo ahead of that date and send it to you. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for the solar panel reading photo, it has gone to the landlord. Nothing more is needed now. We'll be in touch around 15 September to ask for the next one. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging the date does not confirm the reading's accuracy; the agency only forwarded the photo.
- The follow-up is not a booking and does not guarantee the tenant will respond.

## Remaining work
- Next reading request to the tenant around 15 September 2025 (agency ops, FUP-101).

## Missing or unavailable information
_None._

## Conflicts between sources
- Ticket says next due mid June; landlord's latest email says 15 September. I trusted the landlord's most recent statement.
- Tenant email (event 012) had only a signature, but a photo went to the landlord. I verified the attached PDF shows a meter reading, but could not confirm from the history that the tenant supplied it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current reading has been supplied and sent to the landlord. The next one is due 15 September 2025, per the landlord. Nothing else is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Wait for the follow-up on 15 Sept 2025, then email the tenant for a photo. Replies acknowledging the date have already gone to the landlord and tenant by email.

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord has given a clear date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-15","purpose":"Landlord needs next solar panel reading photo on 15 September (per landlord email 17 Jan 2025). Request cl… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","ticket_ref":"NBL-010-re… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |

## Failed or unverified actions
_None._
