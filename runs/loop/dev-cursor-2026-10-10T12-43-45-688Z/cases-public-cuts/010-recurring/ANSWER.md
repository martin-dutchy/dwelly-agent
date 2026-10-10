# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The reading was sent to the landlord, who replied that the next one is needed on 15 September. I acknowledged this to the landlord, thanked the tenant, set a follow-up for 2025-09-08 and added a note on the record. No escalation needed.

## Where the case stands
Current reading photo (display 16845) sent to landlord; landlord replied that next reading is needed 15 September. Waiting until follow-up on 2025-09-08.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Follow up 2025-09-08 to request next meter photo from tenant, then send to landlord for 15 Sept | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thank tenant, say photo sent and next request comes early September | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Acknowledge landlord's 15 September date | Ava, landlord | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you, noted: you next need the solar panel reading on 15 September. We will ask the tenant for the photo a week or so beforehand and send it on. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for the solar meter photo. It has gone to the landlord. We will ask you for the next one in early September, so there is nothing you need to do until then. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Acknowledging the date does not confirm the tenant will supply the next photo
- The reading value comes from the attachment's own description and has not been independently verified
- No human decision is established or needed

## Remaining work
- Request next photo from tenant around 2025-09-08 and forward to landlord by 15 Sept (agency)
- Confirm the cadence after September with landlord

## Missing or unavailable information
- Source of the photo is unclear: tenant email at event 012 had no visible attachment
- The agency's copy of the attachment sent at event 013 shows as a reference only, but the matching file is present

## Conflicts between sources
- Original request said next due mid June; landlord's latest message says 15 September. Trusted the landlord's most recent statement.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

This cycle is complete: the photo went to the landlord on 17 Jan. Outstanding is the next reading, due 15 September per the landlord's latest message, which replaces the earlier 'mid June' note.

**2. What is the next action, who is it for, and through which channel?**

Request the next photo from the tenant by email around 8 Sept (follow-up FUP-101), then send it to the landlord. Landlord and tenant were already acknowledged by email in this run.

**3. Does anything need a human decision, and why?**

No. It is routine and the landlord has given clear instructions.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Landlord (Ava) needs next solar panel reading photo by 15 Sept 2025. Ask tenant for a clear photo of the m… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"Flat 10, 180 Alder Lane, Cedarford, ZZ3 4ZZ","note":"Solar reading (16845 per attached photo) sent to landlord 2025-01-17. Landlo… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
