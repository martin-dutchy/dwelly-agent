# Case 06: Contractor assignment fails, then no-show: ANSWER

**Decision:** escalated · **Severity:** emergency

Urgent no-heating job, treated as emergency because the tenant is vulnerable and temperatures are 3-5C. HeatRight was assigned (first attempt failed, retry verified), then no-showed; I recorded the missed appointment, reassigned to Swift for the same day, informed tenant and landlord and escalated P1.

## Where the case stands
Stage visit; Swift Plumbing & Heating assigned 11 Oct 15:00-19:00 but not yet confirmed by Swift. Escalated P1 to confirm attendance. Follow-up FUP-104 set.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 handover: phone Swift to confirm today's attendance; arrange temporary heating if not | internal maintenance | internal | A8 ✅ |
| 2 | ASSIGN_PROVIDER | Reassigned to Swift Plumbing & Heating after HeatRight no-show | Swift Plumbing & Heating, contractor | portal | A4 ✅ |
| 3 | REPLY_TO_TENANT | Apologised, explained reassignment, said window is unconfirmed, promised update by 5pm | Jonah Okafor, tenant | email | A5 ✅ |
| 4 | WAIT | Follow-up to confirm Swift attendance 11 Oct | Swift Plumbing & Heating | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, sorry you're without heating and hot water. We've booked HeatRight Ltd (Gas Safe registered) to visit tomorrow, Sunday 11 October, between 8am and 12pm. Please let us know if that doesn't work. If you smell gas, leave the property and call 0800 111 999. We'll email you again tomorrow once the visit has happened.

**A5 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, I'm really sorry. HeatRight's engineer was off sick and they didn't tell us, so you lost your morning. We've moved the job to Swift Plumbing & Heating (Gas Safe registered) and our target is to get them out to you today, with a 3pm-7pm window set on the job. They haven't confirmed that yet, so I'll email you as soon as they do, and by 5pm at the latest. If you can't be in, tell us what suits. If you smell gas, leave and call 0800 111 999.

**A6 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Hi Margaret, update on 27 Bethnal Green Road: no heating or hot water since Friday evening, tenant has anxiety. HeatRight missed today's visit (engineer sick), so we've reassigned to Swift Plumbing & Heating for this afternoon. Per your note on emergencies we're proceeding; we'll send any quote over £250 for your approval.

## Escalation
- **P1 → maintenance** (verified): No heating/hot water for vulnerable tenant, contractor no-show; second contractor needs same-day confirmation
  - Known: R-4820, 27 Bethnal Green Road. Tenant Jonah Okafor, anxiety, vulnerable. Lows 3-5C. HeatRight no-show 11 Oct (engineer sick). Swift assigned 15:00-19:00 same day (A4), tenant and landlord emailed. First assignment needed a retry after HTTP 500.
  - Missing: Swift has not confirmed the window or attendance; I have no phone-call tool route to them here.
  - Options: Phone Swift (+447700900312) to confirm attendance today; Use out-of-hours alternative or emergency heaters if Swift can't attend
  - Recommendation: Phone Swift now to confirm; if they can't attend, arrange temporary heating and another engineer today.

## What this does not establish
- Assignment does not mean Swift has confirmed the window or will fix the fault.
- Cause and cost are unknown; any quote over £250 needs landlord approval (landlord's emergency note covers urgent work).

## Remaining work
- Maintenance human: confirm Swift attendance today, provide temporary heating if needed
- Record visit result and invoice after the visit
- Email tenant by 17:00 11 Oct

## Missing or unavailable information
- Swift's confirmation of the window
- Cause of the fault

## Conflicts between sources
- Ticket urgency 'urgent' vs policy: no heating with a vulnerable occupant is an emergency; treated as emergency.

## Answers to the case questions
**1. What happened when you assigned the contractor and how did you verify it?**

First assign_contractor attempt returned HTTP 500 and the ledger said NOT APPLIED (ticket still at init). I retried once; the read-back verified stage visit with HeatRight, 11 Oct 08:00-12:00 (A1 attempt 2). I told the tenant only after verification.

**2. What do you tell the tenant at each point?**

After booking: HeatRight visiting 11 Oct 8-12, gas smell advice and 0800 111 999 (MSG-101). After no-show: apology, reassigned to Swift, target same day, window unconfirmed, update by 5pm (send timed out but read-back shows it was sent, MSG-102, not retried). All by email, his preference.

**3. After the no-show, what do you do?**

Recorded missed_appointment, reassigned to Swift Plumbing & Heating (15:00-19:00), emailed landlord, scheduled follow-up, escalated P1 for phone confirmation and temporary heating fallback.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `record_work_result` | {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight (C-11) no_show, \"Engineer off sick,… | 1 | ✅ verified | Ticket R-4820 read back after record_work_result |
| A4 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 15:00-19:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A5 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-11","purpose":"Confirm Swift (C-12) has accepted the 15:00-19:00 window and attended; email tenant … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A8 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"No heating/hot water for vulnerable tenant, contractor no-show; second contractor needs same… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
- A1 attempt 1: HTTP 500, not applied; retried once, verified.
- A5: API timeout error but read-back showed MSG-102 sent; not retried.
