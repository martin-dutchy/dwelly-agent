# Case 06: Contractor assignment fails, then no-show: ANSWER

**Decision:** escalated · **Severity:** emergency

Assigned HeatRight for 11 Oct morning after a failed first attempt; HeatRight then no-showed. Recorded the missed appointment, reassigned to Swift for the afternoon, informed tenant and landlord, and escalated P1 because the vulnerable tenant is still without heat.

## Where the case stands
Ticket R-4820 at stage visit with Swift Plumbing & Heating, window 11 Oct 14:00-18:00 unconfirmed by provider. Waiting on Swift; follow-up FUP-104; P1 escalation ESC-105 open.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 escalation to phone Swift / arrange fallback engineer and heaters | internal maintenance | internal | A8 ✅ |
| 2 | REPLY_TO_TENANT | Emailed apology, reassignment, safety advice, next update by 4pm | Jonah Okafor, tenant | email | A4 ✅ |
| 3 | WAIT | Await Swift confirmation; chase by end of day | Swift Plumbing & Heating | internal | A7 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, I'm sorry nobody came this morning, especially after you took time off work. HeatRight's engineer was off sick with no cover. We have moved your job to Swift Plumbing & Heating and asked them to attend today between 2pm and 6pm. They have not yet confirmed that slot, so I will email you as soon as they do. Because it's an emergency for you, the target is to get heating and hot water sorted today. Meanwhile, if you can, use warm layers and blankets; if you feel unwell or unsafe, call 999. If you smell gas, leave the property and call 0800 111 999. You'll next hear from us by 4pm today.

**A5 · send_message → Swift Plumbing & Heating (contractor) via phone_call, +447700900312** (verified)

> Urgent no heating/hot water at 27 Bethnal Green Road E1 6LA, vulnerable tenant (anxiety, prefers email). Previous contractor no-showed. Please confirm you can attend today 14:00-18:00 and reply with arrival time. Quote anything over £250 to us before work.

**A6 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Hi Margaret, 27 Bethnal Green Road has had no heating or hot water since Friday evening; the tenant has anxiety. HeatRight missed today's morning visit (engineer sick). We've reassigned to Swift Plumbing & Heating for this afternoon, pending their confirmation. Any repair over your £250 limit will come to you for approval. We'll update you once the result is in.

## Escalation
- **P1 → maintenance** (verified): No heating/hot water for vulnerable tenant; first contractor no-showed; replacement unconfirmed
  - Known: R-4820, 27 Bethnal Green Road. Tenant Jonah Okafor (anxiety, email preferred) no heat since Fri evening, lows 3-5C. HeatRight (C-11) no-show 11 Oct 12:30, engineer sick. Reassigned to Swift (C-12) 14:00-18:00 today (A3), unconfirmed by Swift. Tenant and landlord emailed.
  - Missing: Swift confirmation of attendance; whether the fault is repairable same day.
  - Options: Phone Swift to confirm slot; Fall back to emergency out-of-hours engineer; Temporary heaters for tenant
  - Recommendation: Phone Swift now; if no confirmation by 4pm, use another out-of-hours engineer and provide heaters.
  - Deadline: 2026-10-11 16:00

## What this does not establish
- Assigning Swift does not confirm they will attend; the visit is not booked via set_visit
- No cause, cost or payer established
- No approval of spend above £250

## Remaining work
- Swift to confirm and attend; record result
- Quote over £250 to landlord
- Update tenant by 4pm
- Ops to handle ESC-105

## Missing or unavailable information
- Swift confirmation of visit
- Fault diagnosis

## Conflicts between sources
- Ticket urgency 'urgent' but vulnerable tenant with no heating/hot water is an emergency under policy; treated as emergency.

## Answers to the case questions
**1. What happened when you assigned the contractor and how did you verify it?**

First assign attempt returned HTTP 500 and was NOT APPLIED (ticket still init). I retried once; it succeeded and read-back showed stage visit with HeatRight, 11 Oct 08:00-12:00 (A1 attempt 2).

**2. What do you tell the tenant at each point?**

Email (his preference). After the no-show: apology, explanation (engineer sick), reassigned to Swift for 2-6pm today but not yet confirmed, same-day target as emergency, warmth/999/gas advice, next update by 4pm. I did not claim the visit was booked. Note the send to Swift reported an error but read-back showed it sent (A5).

**3. After the no-show, what do you do?**

Recorded missed_appointment (A2), reassigned to Swift (A3), emailed tenant (A4) and landlord (A6), scheduled follow-up (A7), escalated P1 (A8).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `record_work_result` | {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight no_show, \"Engineer off sick, no cov… | 1 | ✅ verified | Ticket R-4820 read back after record_work_result |
| A3 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 14:00-18:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"phone_call","contact":"+447700900312","ticket_ref":"R-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-11","party":"Swift Plumbing & Heating","purpose":"Confirm Swift attendance 14:00-18:00 today; updat… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A8 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"No heating/hot water for vulnerable tenant; first contractor no-showed; replacement unconfir… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
- A1: Attempt 1 NOT APPLIED (HTTP 500); retried once, verified.
- A5: Reported error but read-back confirmed sent; not retried.
