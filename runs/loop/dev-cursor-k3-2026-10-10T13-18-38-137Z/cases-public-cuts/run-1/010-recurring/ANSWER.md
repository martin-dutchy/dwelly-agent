# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's reading photo went to the landlord, who thanked us and said the next one is needed on 15 September. I acknowledged this to the landlord and tenant, set a follow-up for 8 Sept, and noted the cadence conflict. No human decision is needed.

## Where the case stands
The reading has been sent to the landlord and the landlord has acknowledged it. The current round is complete. The next reading is due 15 Sept 2025 per the landlord. Nothing is outstanding until the follow-up on 2025-09-08.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Thank the tenant, confirm nothing more is needed now, and say we will ask again in early September | Miles Fletcher, tenant | email | A2 ✅ |
| 2 | OTHER | Acknowledge the landlord's 15 Sept date and ask whether the 3-monthly cadence still applies | Ava, landlord | email | A1 ✅ |
| 3 | WAIT | Follow-up to request the next photo from the tenant on 8 Sept 2025 | Miles Fletcher, tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you. We have noted that you next need the solar panel reading on 15th September. We will ask the tenant for a photo shortly beforehand and send it on. If you would still like readings every 3 months, as originally set up, please let us know.

**A2 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for sending the solar panel reading photo. It has gone to the landlord and nothing more is needed now. We will be in touch again in early September to ask for the next one.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The messages do not change the cadence; the landlord has not confirmed whether 3-monthly readings still apply.
- Sending the photo does not verify the meter reading figure; the attachment says the display 'appears to show 16845'.
- The tenant's email contained no visible text or attachment, so the photo's origin is not confirmed.

## Remaining work
- Agency to request the next reading from the tenant around 2025-09-08 (FUP-103).
- Await landlord's answer on whether the 3-monthly cadence still applies.

## Missing or unavailable information
- Whether the landlord still wants 3-monthly readings or only the 15 Sept one.

## Conflicts between sources
- Original instruction said 3-monthly readings, next mid June; the landlord's latest email says 15 Sept. I treated the landlord's latest statement as current and asked them to confirm.
- Event 013 refers to the photo as 'for mid June', but the reading was taken in January.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The January reading was sent to the landlord (event 013) and they acknowledged it (event 015). Nothing is outstanding until the next request, due before 15 Sept 2025. The landlord has not yet confirmed whether the 3-monthly cadence still applies.

**2. What is the next action, who is it for, and through which channel?**

Done now: acknowledgement emailed to the landlord (A1) and a thank-you emailed to the tenant (A2). Next: ask the tenant for a photo on 2025-09-08 (follow-up A3).

**3. Does anything need a human decision, and why?**

No. This is routine and the landlord's latest instruction is clear. The cadence difference is a question to the landlord, not an escalation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2025-09-08","party":"Tenant (Miles Fletcher)","purpose":"Ask tenant for a clear photo of solar panel readings for landlord, neede… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"Flat 10, 180 Alder Lane","note":"Conflict: original instruction was readings every 3 months, next mid June; landlord's latest ema… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
