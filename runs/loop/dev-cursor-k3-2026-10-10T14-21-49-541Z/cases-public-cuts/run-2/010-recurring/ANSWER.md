# Case 010: Solar panel readings photo request: ANSWER

**Decision:** action_taken · **Severity:** routine

The reading was passed to the landlord, who replied asking for the next one on 15 September. I set a recurring follow-up from mid June, asked the landlord to confirm the frequency, updated the tenant, added a note and returned the ticket to auto mode. No human decision is needed.

## Where the case stands
Current reading (16845) was sent to the landlord on 17 Jan and the landlord replied. The job stays open as a recurring task. Next request is scheduled for mid June. We are waiting on the landlord to confirm whether they want quarterly readings or only 15 September.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm quarterly vs 15 September only, reply by 24 Jan | Ava, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Thank tenant and say next request is mid June, then about every 3 months | Miles Fletcher, tenant | email | A3 ✅ |
| 3 | WAIT | Recurring follow-up to request the reading from tenant, from 15 June 2025, every 3 months | Tenant | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Ava (landlord) via email, existing thread (event 015 email)** (verified)

> Hello Ava, thank you, we've noted 15 September. Our instruction is to collect the solar reading every 3 months (next mid June, then 15 September and quarterly), so we have set reminders on that basis. Please reply yes if quarterly is right, or tell us if you only need the 15 September reading, by 24 January. Kind regards, Northbridge Lettings

**A3 · send_message → Miles Fletcher (tenant) via email, existing thread (event 012 email)** (verified)

> Hello Miles, thank you for your help with the solar panel reading. Nothing more is needed now. We'll email you again around mid June to ask for a new clear photo of the meter, and then roughly every 3 months. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The reading and photo are not independently verified; the meter display 'appears to show' 16845.
- Scheduling does not confirm the landlord's preferred frequency.

## Remaining work
- Landlord to confirm frequency (agency)
- Recurring reading requests from mid June (agency)

## Missing or unavailable information
- Landlord confirmation of frequency
- Where the photo came from: tenant's email had no visible attachment, and the call named Oakfield Compliance

## Conflicts between sources
- Landlord says next reading 15 September; original instruction says every 3 months with the next in mid June. Asked landlord to confirm.
- Call event 008 names Oakfield Compliance, not the tenant. Tenant email event 012 has no visible attachment, yet a photo was sent to the landlord.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The current reading has been delivered to the landlord. Outstanding: the landlord's confirmation of frequency, and the recurring requests from mid June.

**2. What is the next action, who is it for, and through which channel?**

Ask the landlord to confirm the frequency (email); tell the tenant about future requests (email); recurring follow-up scheduled from 15 June 2025.

**3. Does anything need a human decision, and why?**

No. This is routine. The unclear source of the photo is noted for awareness only.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-06-15","purpose":"Request solar panel meter reading with clear photo from tenant for landlord (Flat 10, 180 Alder Lane). Rep… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Miles Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 012 email)","body":"Hello M… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"Flat 10, 180 Alder Lane","note":"Recurring solar reading job. Reading 16845 sent to landlord 17 Jan (event 013). Tenant's event 0… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `resume_auto` | {"ticket_ref":"R-010"} | 1 | ❌ failed | Ticket R-010 not found on read-back |
| A6 | `resume_auto` | {"ticket_ref":"NBL-010-recurring"} | 1 | ✅ verified | Ticket NBL-010-recurring read back after resume_auto |

## Failed or unverified actions
- A5: resume_auto used the wrong ticket ref R-010; retried with NBL-010-recurring and it verified (A6).
