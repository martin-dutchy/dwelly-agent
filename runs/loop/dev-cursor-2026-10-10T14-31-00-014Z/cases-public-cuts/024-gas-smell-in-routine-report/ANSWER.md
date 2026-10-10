# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant's oven repair follow-up mentioned a gassy smell as "not urgent". I treated it as an emergency: sent safety advice, opened emergency job JOB-102, requested a Gas Safe make-safe, informed the landlord and escalated P1.

## Where the case stands
Original oven ticket at provider selection, returned to auto. Tenant's reply disclosed a gas smell, so emergency job JOB-102 was opened with a Gas Safe make-safe request (no firm named). The tenant has been sent safety advice and is awaiting reply. P1 escalation ESC-103 raised.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Send gas safety instructions and ask about CO alarm, symptoms and vulnerable occupants | Imogen, tenant | email | A1 ✅ |
| 2 | ASSIGN_PROVIDER | Assign Gas Safe engineer emergency make-safe, window 5 Aug 08:00-12:00 | Gas Safe engineer (no firm named) | internal | A3 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation for gas smell | internal maintenance | internal | A4 ✅ |
| 4 | OTHER | Tell landlord of gas report and make-safe | Oliver, landlord | email | A5 ✅ |
| 5 | WAIT | Follow-up today to confirm tenant safe and engineer attended | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for telling us. A gas smell needs treating as an emergency, so please do this now: do not use the oven, any switches, or flames. Open doors and windows, and leave the flat with everyone in it. Call the National Gas Emergency line on 0800 111 999 (or 999 if anyone feels unwell) from outside. Please also tell us: is any CO alarm sounding, and does anyone have a headache, dizziness, nausea or drowsiness? And please reply to confirm everyone is out. We are sending a Gas Safe engineer to make it safe, with a target of today (within 24 hours), and will update you as soon as we have a time. If you can, please also tell us if anyone in the flat is elderly, very young, pregnant or unwell, so they get out first.

**A5 · send_message → Oliver (landlord) via email, agency landlord record** (verified)

> Hi Oliver, Imogen replied that your suggested settings didn't help and the oven still isn't cooking. She also reports an occasional gassy smell near it. We've treated this as an emergency: told her to leave, avoid switches/flames and call 0800 111 999, and we're sending a Gas Safe engineer to make safe without waiting for approval. The oven repair itself will follow once the engineer has checked; we'll come back to you for approval if cost is involved. We'll update you once the engineer's visit is confirmed.

## Escalation
- **P1 → maintenance** (verified): Tenant reports gassy smell near oven, buried in routine oven repair
  - Known: Flat 6, 56 Juniper Mews. Tenant Imogen email (event 006, 5 Aug 01:12): oven still not cooking, plus gassy smell near it sometimes. Landlord Oliver had suggested settings (event 003). Emergency ticket JOB-102 created; safety advice and gas emergency number sent to tenant (MSG-101); generic Gas Safe engineer requested for make-safe.
  - Missing: Whether tenant and others are out; CO alarm/symptoms; named Gas Safe firm and confirmed time; vulnerable occupants.
  - Options: Dispatch named Gas Safe engineer now to make safe; Confirm tenant safe by phone
  - Recommendation: Dispatch a Gas Safe engineer today, phone tenant to confirm safety, then deal with oven fault after.
  - Deadline: Same day, ASAP

## What this does not establish
- No firm is named and the visit window is a target, not confirmed by an engineer
- Nothing establishes the cause of the smell or the oven fault
- Oven repair not yet approved or assigned

## Remaining work
- Human: dispatch/confirm named Gas Safe engineer and confirm tenant is safe (ESC-103)
- Oven fault: after make-safe, quote/approval via landlord on the original ticket
- Tenant reply on safety awaited

## Missing or unavailable information
- Whether tenant has left and called 0800 111 999
- CO alarm/symptoms
- Vulnerable occupants
- Oven manual attachment unseen
- Landlord reply

## Conflicts between sources
- Tenant calls the smell 'not urgent' but any gas smell is treated as an emergency per policy

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Oven fault is awaiting provider selection and landlord decision; the tenant's reply adds a possible gas leak, now handled as emergency JOB-102. Outstanding: engineer attendance, tenant safety confirmation, oven repair approval.

**2. What is the next action, who is it for, and through which channel?**

Gas safety instructions emailed to Imogen (tenant); emergency Gas Safe engineer assigned; landlord Oliver informed by email; P1 escalation to maintenance.

**3. Does anything need a human decision, and why?**

Yes, P1: gas smell needs a named Gas Safe engineer dispatched and the tenant's safety confirmed. Oven repair cost decisions come later via the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant reports intermitte… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"Gas Safe registered engineer, emergency call-out (no firm named yet)","visit_window":"2026-08-05 08:00… | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant reports gassy smell near oven, buried in routine oven repair","known":"Flat 6, 56 Jun… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Oliver","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"JOB-102","body":"H… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report"} | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after resume_auto |
| A7 | `schedule_follow_up` | {"due_on":"2026-08-05","purpose":"Confirm tenant is out and safe, engineer attended JOB-102; then progress oven repair on main ticket","tick… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
