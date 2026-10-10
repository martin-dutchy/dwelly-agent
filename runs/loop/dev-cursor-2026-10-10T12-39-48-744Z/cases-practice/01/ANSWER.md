# Case 01: Funny smell from the boiler (hidden gas emergency): ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant described a rotten-egg smell from the boiler as "not urgent", but this is a suspected gas leak with an 82-year-old in the flat. I sent evacuation and gas-line advice, opened emergency job JOB-102, assigned HeatRight, informed the landlord and escalated P1.

## Where the case stands
Emergency job JOB-102 at visit stage, HeatRight assigned (window not yet confirmed by contractor). P1 escalated. Waiting on tenant evacuation and engineer attendance.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 escalation to phone HeatRight and tenant tonight | internal maintenance | internal | A4 ✅ |
| 2 | REPLY_TO_TENANT | Safety advice: evacuate, boiler off, no switches/flames, call 0800 111 999 | Amelia Clarke, tenant | whatsapp | A1 ✅ |
| 3 | ASSIGN_PROVIDER | Assign HeatRight Ltd for emergency make-safe | HeatRight Ltd, contractor | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Amelia Clarke (tenant) via whatsapp, +447700900101** (verified)

> Hi Amelia, a rotten-egg smell from a boiler can mean a gas leak, so please treat this as urgent, even though it's late. Please: 1) turn the boiler off and don't use it, 2) don't use switches, flames or lighters, 3) open the windows and get everyone out of the flat, including your flatmate's mum, 4) call the National Gas Emergency line on 0800 111 999 (free, 24 hours) from outside. If anyone feels dizzy, sick or unwell, or you're in immediate danger, call 999. We're arranging a Gas Safe engineer and will update you. Please don't go back in until you're told it's safe.

**A5 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, tonight the tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We've told them to leave, turn it off and call the Gas Emergency line, and have raised an emergency job (JOB-102) with HeatRight Ltd to make it safe. Emergency make-safe doesn't need prior approval; we'll come back to you before any repair work above your £300 limit.

## Escalation
- **P1 → maintenance** (verified): Suspected gas leak at P-201, out of hours; tenant said "not urgent"
  - Known: Amelia Clarke (T-1001), Flat 4, 12 Mare St. WhatsApp 22:40: eggy smell when boiler fires. Elderly (82) guest staying. CO alarm in kitchen. Evacuation/999 gas line advice sent (MSG-101). Emergency job JOB-102 created; HeatRight Ltd (out-of-hours, Gas Safe) assigned. Unrelated open job R-4801 (tap).
  - Missing: Whether tenant has evacuated and called the gas line; HeatRight confirmation of attendance time.
  - Options: Phone HeatRight on +447700900311 to confirm attendance tonight; Fall back to Swift Plumbing & Heating +447700900312; Phone tenant to confirm evacuation
  - Recommendation: Phone HeatRight now to confirm attendance; phone tenant to confirm they are outside; tell landlord Ben.
  - Deadline: Immediately

## What this does not establish
- Assignment does not confirm HeatRight has accepted or will attend at that time
- Nothing confirms a leak exists or the cause
- No repair spend approved beyond emergency make-safe

## Remaining work
- Human to phone HeatRight and tenant tonight
- Quote/approval for any repair over £300 goes to Ben
- Dripping tap job R-4801 unchanged (15 Oct)
- Gas safety record to follow after repair

## Missing or unavailable information
- Tenant confirmation of evacuation
- Contractor confirmation of attendance

## Conflicts between sources
- Tenant says not urgent; symptoms indicate emergency. Trusted symptoms.

## Answers to the case questions
**1. 1. Severity and why?**

Emergency: rotten-egg smell from a gas boiler is a suspected gas leak regardless of the tenant calling it not urgent; an 82-year-old is also present.

**2. 2. What to tell the tenant?**

Boiler off, no switches or flames, open windows, everyone leaves, call 0800 111 999 from outside, 999 if unwell, don't re-enter until cleared; engineer being arranged.

**3. 3. Actions tonight?**

Created emergency job JOB-102, assigned HeatRight (out-of-hours Gas Safe), emailed landlord Ben, escalated P1 (ESC-103). Did not move the tap job.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, a rotten-egg s… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","tenant":"T-1001","description":"Tenant reports rotten-egg (gas) smell from Worc… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:30-2026-10-10 02:00 emergency make-safe (target: same day… | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at P-201, out of hours; tenant said \"not urgent\"","known":"Amelia Clark… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, ton… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
