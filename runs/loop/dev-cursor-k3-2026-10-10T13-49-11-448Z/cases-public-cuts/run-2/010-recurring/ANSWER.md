# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's meter photo went to the landlord, who replied that the next reading is needed on 15 September. I acknowledged this to her and set a follow-up for 8 Sept to request the next photo. No human decision needed.

## Where the case stands
Current reading sent to landlord; landlord replied next needed 15 Sept. Waiting until follow-up 8 Sept 2025 to ask tenant for next photo. Recurring job stays open.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledge landlord's reply and the 15 Sept date by email | Ava, landlord | email | A1 ✅ |
| 2 | WAIT | Wait until 8 Sept 2025, then ask tenant for next meter photo | Tenant | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15th September. We will ask the tenant for a photo ahead of that date and send it to you. We will be in touch before then. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the reading does not confirm the meter figure (display appears to read 16845) beyond the photo.
- Does not settle whether the 3-monthly cadence still applies.

## Remaining work
- Ask tenant for next meter photo on 2025-09-08 (agency ops)
- Confirm with landlord whether 3-monthly cadence continues

## Missing or unavailable information
- Whether the cadence is still every 3 months; landlord only gave 15 September

## Conflicts between sources
- Original brief: every 3 months, next mid June; landlord's latest says 15 September. Trusted landlord's latest statement.
- Event 008 call attributed to 'Oakfield Compliance' while addressed to the tenant.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The January reading was delivered to the landlord, who gave 15 September as the next date. Outstanding: ask the tenant for the next photo before then.

**2. What is the next action, who is it for, and through which channel?**

Landlord acknowledged by email (done). Next: email the tenant for a photo on 8 Sept 2025 (follow-up FUP-102).

**3. Does anything need a human decision, and why?**

No. It is routine and the landlord has given the date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant (Flat 10, 180 Alder Lane) for a clear photo of solar panel meter reading; landlord needs it by … | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A3 | `add_note` | {"entity":"Flat 10, 180 Alder Lane","note":"Jan 2025 reading (display ~16845) sent to landlord 17 Jan. Landlord replied next needed 15 Sept … | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
