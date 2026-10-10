# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's meter photo went to the landlord, who replied that she next needs it on 15 September. I acknowledged this to the landlord and tenant, set a 1 Sept follow-up, noted the conflict with the old mid June date, and returned the ticket to auto mode.

## Where the case stands
Current reading photo delivered to landlord; landlord says next needed 15 September. Follow-up set for 1 Sept 2025. Ticket in auto mode; nothing outstanding now.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait until 1 Sept 2025, then ask tenant for next meter photo for landlord's 15 Sept date | Miles Fletcher, tenant | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Thank tenant, say nothing more needed now and we will ask again in early September | Miles Fletcher, tenant | email | A4 ✅ |
| 3 | OTHER | Acknowledge landlord's 15 Sept date and ask whether mid June readings are still wanted | Ava, landlord | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hi Ava, thank you. We have noted that you next need the solar panel reading on 15 September. We will ask the tenant for a photo ahead of that date and send it to you. Our earlier note said mid June, so please tell us if you also still want readings then. Kind regards, Northbridge Lettings

**A4 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hi Miles, thank you for the meter photo, it has gone to the landlord. Nothing more is needed now. We will email you around early September to ask for the next one.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the reading figure 16845 is correct beyond what the photo appears to show
- Does not establish whether the 3-monthly cadence or mid June date still applies
- Does not explain the Oakfield Compliance caller

## Remaining work
- Agency: request tenant photo around 1 Sept 2025 and send to landlord by 15 Sept
- Landlord to say whether mid June readings are still needed

## Missing or unavailable information
- Whether the 3-monthly / mid June schedule is superseded by 15 September
- Who the Oakfield Compliance caller was (event 008)

## Conflicts between sources
- Original request said every 3 months, next mid June; landlord's latest email says 15 September. Trusted the landlord's latest statement and asked her to confirm if June is also wanted.
- The landlord email attachment reference 'attachment-80-document' at event 013 is not in the files; the PDF present was read.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current photo is delivered and the landlord has replied. The only outstanding item is the next reading, due 15 September, and we need to confirm whether June readings are still wanted.

**2. What is the next action, who is it for, and through which channel?**

Acknowledge the landlord by email (done) and thank the tenant by email (done). On 1 Sept 2025 email the tenant for the next photo.

**3. Does anything need a human decision, and why?**

No. This is routine and fully handled with a dated follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-09-01","purpose":"Request solar panel meter reading photo from tenant, so it reaches landlord Ava by 15 September 2025 (land… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `add_note` | {"entity":"NBL-010-recurring","note":"Reading photo (display 16845) sent to landlord 17 Jan. Landlord replied (event 015): next needed 15 Se… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hi Ava, thank yo… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hi Mile… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |

## Failed or unverified actions
_None._
