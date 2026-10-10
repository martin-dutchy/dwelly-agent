# Case 06: Contractor assignment fails, then no-show: ANSWER

**Decision:** escalated · **Severity:** emergency

Urgent no-heating job upgraded to emergency because the tenant is vulnerable. HeatRight was assigned after one failed attempt and a verified retry, the tenant was told, then HeatRight no-showed. I recorded the missed appointment, apologised to the tenant and informed the landlord, and escalated P1 to get a backup contractor today.

## Where the case stands
R-4820 at stage mp_time_force after missed appointment. HeatRight no-showed. P1 escalation ESC-105 open to get Swift (C-12) same day. Tenant and landlord informed by email. Follow-up FUP-104.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 escalation to secure backup Gas Safe engineer today | internal maintenance team | internal | A8 ✅ |
| 2 | REPLY_TO_TENANT | Apologised, explained no-show, committed to 24h target | Jonah Okafor, tenant | email | A5 ✅ |
| 3 | WAIT | Follow-up to confirm backup visit and heating restored | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, sorry you're without heating and hot water. We've booked a Gas Safe heating engineer from HeatRight Ltd to visit tomorrow, Sunday 11 October, between 8am and 12pm. Please make sure someone is home to let them in. If you smell gas, leave the property and call 0800 111 999 straight away. We'll email you as soon as we hear anything.

**A5 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, I'm really sorry. HeatRight's engineer was off sick and they didn't tell us in time, and you lost your morning because of it. We've treated this as an emergency and passed it to our team now to get another Gas Safe engineer to you today, as our target is within 24 hours. We'll email you as soon as a time is confirmed. If you smell gas, leave the property and call 0800 111 999.

**A6 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, the heating and hot water at 27 Bethnal Green Road has been out since Friday evening. The tenant is vulnerable. HeatRight missed today's visit (engineer sick), so we're moving to a backup Gas Safe contractor today under your emergency pre-approval. We'll update you once the repair is confirmed and will come back to you if costs look significant.

## Escalation
- **P1 → maintenance** (verified): Vulnerable tenant (anxiety), no heating/hot water since Fri evening, contractor no-show, overnight lows 3-5C
  - Known: R-4820 at 27 Bethnal Green Road. Assignment to HeatRight failed once (HTTP 500), verified on retry. HeatRight no-showed 11 Oct 8-12 (engineer sick). Tenant emailed 12:41. Backup C-12 Swift Plumbing & Heating (Gas Safe 551987, +447700900312, out of hours) on file. Landlord Margaret Ellison (overseas, email) pre-approves emergencies. Tenant and landlord informed by email.
  - Missing: Swift's confirmed availability today/tonight; whether any compensation is due (human decision).
  - Options: Phone Swift now, confirm same-day attendance, assign and set visit; If Swift can't, try other Gas Safe out-of-hours contractor or provide temporary heaters
  - Recommendation: Phone Swift immediately, secure a same-day slot, assign and notify tenant by email; review HeatRight's reliability.

## What this does not establish
- Assignment and visit booking do not confirm the fault cause or cost
- The tenant apology does not admit liability or offer compensation; that is a human decision
- No backup appointment has been booked yet

## Remaining work
- Maintenance team: book Swift Plumbing & Heating today and tell tenant by email
- Review HeatRight reliability and any compensation question
- Record invoice/quote, landlord update on completion

## Missing or unavailable information
- Swift's availability
- Cause of the original fault

## Conflicts between sources
- Ticket urgency is 'urgent' but the vulnerable tenant with no heating/hot water is an emergency under policy; treated as emergency
- Landlord spend limit £250 vs emergency pre-approval note; emergencies are pre-approved

## Answers to the case questions
**1. What happened when you assigned the contractor and how did you verify it?**

First attempt returned HTTP 500 and the ledger said NOT APPLIED (ticket still init). I retried once; ledger A1 attempt 2 read back stage visit with HeatRight, 2026-10-11 08:00-12:00. Then set_visit was verified (A2).

**2. What do you tell the tenant at each point?**

After booking: by email (his preference), the visit window Sunday 8am-12pm, someone needs to be home, gas helpline 0800 111 999. After no-show: apology, explanation, emergency handling with a target of within 24h, no invented appointment. The second email timed out, but the read-back showed it was sent (MSG-102), so I did not retry.

**3. After the no-show, what do you do?**

Recorded missed_appointment (A4), emailed the tenant, informed the landlord (emergencies pre-approved), set a follow-up, and escalated P1 (ESC-105) with Swift as the backup. I did not book Swift myself because no availability is confirmed and I won't invent an appointment.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `set_visit` | {"ticket_ref":"R-4820","datetime":"2026-10-11 08:00","slot_text":"Sunday 8am-12pm","access":"tenant_home"} | 1 | ✅ verified | Ticket R-4820 read back after set_visit |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `record_work_result` | {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight (C-11) no-show, \"Engineer off sick,… | 1 | ✅ verified | Ticket R-4820 read back after record_work_result |
| A5 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-11","purpose":"Confirm backup engineer attends today and heating restored; confirm with tenant by e… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A8 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Vulnerable tenant (anxiety), no heating/hot water since Fri evening, contractor no-show, ove… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
- A1 attempt 1: HTTP 500, not applied; retried once, verified
- A5: API error but read-back showed MSG-102 in place; not retried
