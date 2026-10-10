# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

Tenant asked for an oven visit and mentioned a gassy smell as "not urgent". Treated as an emergency: gave safety advice, opened JOB-101, assigned a same-day Gas Safe call-out, told the landlord and escalated P1.

## Where the case stands
Oven ticket at intake with no provider. Tenant's reply reveals a gas smell, so a linked emergency job JOB-101 was opened and a same-day Gas Safe call-out assigned (no firm named). Escalated P1.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Gas safety advice (leave, no switches/flames, call 0800 111 999) and same-day target for engineer | Imogen, tenant | email | A2 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation for gas smell | internal maintenance | internal | A3 ✅ |
| 3 | ASSIGN_PROVIDER | Assign Gas Safe emergency call-out for JOB-101 today | Gas Safe engineer (unnamed) | internal | A4 ✅ |
| 4 | OTHER | Inform landlord of the gas report and call-out | Oliver, landlord | email | A5 ✅ |
| 5 | WAIT | Follow up today on engineer attendance | internal | internal | A8 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for getting back to us. Please treat the gassy smell as urgent. Please don't use the oven or hob, and don't use any switches, flames or sockets near it. Open windows if you can, leave the flat, and call the National Gas Emergency line on 0800 111 999 (free, 24 hours). Call 999 if you are in immediate danger. Please don't go back in until they say it is safe. We are arranging a Gas Safe registered engineer to attend as an emergency, with a same-day target, and we'll update you once we have a time. The oven not heating will be looked at as part of that visit. Please don't use the previous settings advice any more. We'll be in touch again today.

**A5 · send_message → Oliver (landlord) via email, agency landlord record** (verified)

> Hello, the tenant of Flat 6, 56 Juniper Mews says the oven still isn't cooking after trying your settings, and also reports an occasional gassy smell near it. We have treated the smell as an emergency: she has been told to leave, avoid switches and flames and call the gas emergency line (0800 111 999). We are arranging a Gas Safe engineer call-out today (target same day; no firm confirmed yet). The oven fault will be reviewed at that visit and we'll update you.

## Escalation
- **P1 → maintenance** (verified): Gas smell reported near oven by tenant inside a routine oven-repair job
  - Known: Tenant Imogen emailed (event 006, 2026-08-05) that oven still doesn't cook after following landlord's settings advice, and there is "a bit of a gassy smell near it sometimes". Tenant told to leave, avoid switches/flames, call 0800 111 999. Emergency ticket opened linked to NBL-024. No landlord reply on file; no contractor named in the case.
  - Missing: Whether tenant has left and called the gas line; Gas Safe engineer name and arrival time; landlord not yet informed; gas safety record status unknown.
  - Options: Dispatch Gas Safe engineer emergency call-out now; Confirm with National Gas Emergency outcome
  - Recommendation: Dispatch a Gas Safe registered engineer same day, make safe first, inform landlord, then handle the oven fault.
  - Deadline: Now

## What this does not establish
- Assigning an unnamed engineer does not confirm a firm or arrival time
- The oven fault cause is not established and landlord has not approved oven repair spend
- Tenant has not confirmed she has left or called the gas line

## Remaining work
- Human to name and dispatch the Gas Safe firm and confirm attendance (maintenance)
- Oven fault repair and landlord approval after gas check
- Update tenant with a confirmed time

## Missing or unavailable information
- Manual attachment unseen
- Gas safety record status
- Engineer name and time

## Conflicts between sources
- Tenant calls the smell 'not urgent' but any gas smell is an emergency under policy; treated as emergency.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Oven ticket still at intake with no provider. The tenant's reply says the landlord's settings advice failed and reports a gassy smell. The gas emergency is now JOB-101 with a call-out assigned; the oven repair and landlord approval remain outstanding.

**2. What is the next action, who is it for, and through which channel?**

Emergency gas safety email to the tenant (done), same-day Gas Safe engineer for JOB-101, landlord informed by email, P1 escalation ESC-103.

**3. Does anything need a human decision, and why?**

Yes, P1: gas smell is a safety emergency, and a human needs to name and dispatch the engineer and confirm the property is safe. The oven repair can follow.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant (Imogen) reports a… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Gas smell reported near oven by tenant inside a routine oven-repair job","known":"Tenant Imo… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Gas Safe registered engineer, emergency call-out (no firm named yet)","visit_window":"2026-08-05 08:00… | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A5 | `send_message` | {"recipient_name":"Oliver","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"JOB-101","body":"H… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `update_ticket` | {"ref":"NBL-024-gas-smell-in-routine-report","note":"Tenant reply handled (event 006). Gas smell split to emergency JOB-101; oven fault stay… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back at stage init |
| A7 | `resume_auto` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report"} | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after resume_auto |
| A8 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-08-05","purpose":"Confirm gas engineer attended and flat is safe; update tenant and landlord"} | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
