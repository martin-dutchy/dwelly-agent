# Case 06: Contractor assignment fails, then no-show: ANSWER

**Decision:** escalated · **Severity:** emergency

Treated no heating/hot water for a vulnerable tenant as an emergency. Assigned HeatRight (first attempt failed, retry verified); they no-showed, so I recorded it, reassigned to Swift, told tenant, landlord and Swift, and escalated P1.

## Where the case stands
Stage visit, Swift assigned for 11 Oct 14:00-18:00, awaiting their confirmation; P1 escalated; follow-up FUP-105.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Reassigned to Swift Plumbing & Heating after no-show | Swift Plumbing & Heating, contractor | internal | A4 ✅ |
| 2 | REPLY_TO_TENANT | Apologised, explained reassignment, said slot is requested not confirmed, next update by 4pm | Jonah Okafor, tenant | email | A5 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation for confirmation/stopgap heating | internal maintenance | internal | A9 ✅ |
| 4 | WAIT | Follow-up to confirm Swift by 4pm | Swift | internal | A8 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, sorry you've no heating or hot water. We've booked HeatRight Ltd to visit tomorrow (Sunday 11 Oct) between 8am and 12pm. We'll email you as soon as we hear anything more, and we'll update you again tomorrow either way. If you smell gas, leave the property and call 0800 111 999.

**A5 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, I'm really sorry, HeatRight didn't turn up (their engineer was off sick) and you lost your morning. We've now reassigned the job to Swift Plumbing & Heating, with a requested slot of 2-6pm today. They haven't confirmed yet, so please treat it as requested, not booked. We're treating this as an emergency and I'll email you again by 4pm today with their confirmation or another plan. If you smell gas, leave and call 0800 111 999.

**A6 · send_message → Swift Plumbing & Heating (contractor) via phone_call, +447700900312** (verified)

> Emergency job R-4820, 27 Bethnal Green Road E1 6LA: no heating or hot water, tenant vulnerable (anxiety). Previous contractor no-showed. Please attend today 2-6pm if you can and confirm to us. Tenant Jonah Okafor, +447700900102, prefers email.

**A7 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Hi Margaret, update on 27 Bethnal Green Road: no heating/hot water, tenant has anxiety. HeatRight missed today's visit (engineer sick), so we've reassigned to Swift Plumbing & Heating for a same-day attendance. Treated as an emergency per your instructions. Any quote above £250 will come to you.

## Escalation
- **P1 → maintenance** (verified): No heating/hot water for vulnerable tenant; first contractor no-show; replacement unconfirmed
  - Known: R-4820, 27 Bethnal Green Road. Tenant Jonah Okafor (anxiety). HeatRight no-show 11 Oct (engineer sick). Reassigned to Swift 14:00-18:00 today (A4), tenant, landlord and Swift told. Lows 3-5C. Landlord approves emergencies without asking.
  - Missing: Swift's confirmation of attendance today
  - Options: Phone Swift to confirm attendance; If Swift cannot attend, find another Gas Safe out-of-hours engineer or supply temporary heaters
  - Recommendation: Phone Swift now; arrange stopgap heaters if no confirmed arrival by 4pm.

## What this does not establish
- Assignment does not mean Swift has confirmed attendance
- Cause of the heating fault is unknown; no cost approved

## Remaining work
- Human/maintenance: confirm Swift or arrange stopgap heaters (ESC-106)
- Record visit result and invoice after the visit

## Missing or unavailable information
- Swift's confirmation of the visit
- Cause of fault

## Conflicts between sources
- Ticket marked urgent, but no heating for a vulnerable occupant is an emergency under policy; treated as emergency.

## Answers to the case questions
**1. What happened when you assigned the contractor and how did you verify it?**

First assign_contractor attempt returned HTTP 500 and the ledger showed NOT APPLIED (ticket still at init). I retried once; read-back showed stage visit with HeatRight, 11 Oct 08:00-12:00 (A1 verified). I told the tenant only after that.

**2. What do you tell the tenant at each point?**

After verified assignment: HeatRight booked 11 Oct 8-12, next update tomorrow, gas safety number. After no-show: apology, reassigned to Swift with requested 2-6pm slot not yet confirmed, update by 4pm, gas number. Email used as tenant prefers it.

**3. After the no-show, what do you do?**

Recorded missed appointment, reassigned to Swift (Gas Safe, out of hours), phoned/messaged Swift, informed the landlord, set a follow-up, and escalated P1 for confirmation or stopgap heating.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `record_work_result` | {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight no_show, \"Engineer off sick, no cov… | 1 | ✅ verified | Ticket R-4820 read back after record_work_result |
| A4 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 14:00-18:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A5 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"phone_call","contact":"+447700900312","ticket_ref":"R-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A7 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A8 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-11","purpose":"By 4pm: confirm Swift attendance; if unconfirmed, phone them and escalate P1 for sto… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A9 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"No heating/hot water for vulnerable tenant; first contractor no-show; replacement unconfirme… | 1 | ✅ verified | ESC-106 found in the escalate_to_human log |

## Failed or unverified actions
- A1 attempt 1: HTTP 500, not applied; retried once, verified
- A5: Reported error but read-back confirmed delivered; not retried
