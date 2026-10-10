# Case 06: Contractor assignment fails, then no-show: ANSWER

**Decision:** action_taken · **Severity:** emergency

Vulnerable tenant with no heating or hot water, treated as emergency. First assignment to HeatRight failed once and succeeded on retry; HeatRight then no-showed, so I recorded the missed visit, reassigned to Swift for the same afternoon, emailed tenant and landlord and escalated for monitoring.

## Where the case stands
R-4820 at stage visit with Swift Plumbing & Heating, window 11 Oct 14:00-18:00. Waiting on Swift attendance and tenant confirmation; follow-up FUP-103; escalation ESC-104 open.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Reassigned to Swift Plumbing & Heating for 11 Oct 14:00-18:00 after HeatRight no-show | Swift Plumbing & Heating, contractor | internal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Apologised, gave new window as target, asked to confirm access, gas safety line | Jonah Okafor, tenant | email | A4 ✅ |
| 3 | ESCALATE_TO_HUMAN | P2 handover to phone Swift and monitor, fallback emergency heating | internal | internal | A7 ✅ |
| 4 | WAIT | Follow-up to confirm attendance and heating restored | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, I'm very sorry. HeatRight's engineer was off sick and nobody told us or you, and I know you took time off work. We've moved your job to Swift Plumbing & Heating, a Gas Safe registered firm, with a visit window today (Sunday 11 October) 14:00-18:00. Please reply to confirm someone will be home. I'll chase them and update you by email. If you smell gas, leave the property and call 0800 111 999. Please also use warm layers or blankets in the meantime.

**A5 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Hi Margaret, an update on 27 Bethnal Green Road: the tenant has had no heating or hot water since Friday evening and is vulnerable, so we treated it as an emergency. Our first contractor, HeatRight, missed the visit today (engineer sick). We've reassigned to Swift Plumbing & Heating for 14:00-18:00 today. We'll send any quote if repairs go beyond your £250 limit.

## Escalation
- **P2 → maintenance** (verified): Vulnerable tenant, no heating/hot water since Fri evening; first contractor no-show; first assignment hit a 500 error.
  - Known: R-4820, 27 Bethnal Green Rd. Tenant Jonah Okafor (anxiety, email). HeatRight no-show 11 Oct 08-12 (engineer sick). Reassigned to Swift 14:00-18:00 (A3). Tenant and landlord emailed.
  - Missing: Swift has not been confirmed by phone as attending; tenant has not confirmed being home.
  - Options: Phone Swift (+447700900312) to confirm attendance; If Swift fails, emergency alternative heating or accommodation
  - Recommendation: Phone Swift now to confirm attendance and monitor; fallback to emergency heaters/accommodation if no fix today. Also review HeatRight's reliability.
  - Deadline: 2026-10-11 14:00

## What this does not establish
- Assignment does not confirm Swift will attend or the cause/cost of the fault
- Not a confirmed appointment from the provider; tenant has not confirmed access

## Remaining work
- Human to phone Swift and monitor visit
- Record result, invoice and landlord approval if quote over £250
- Review HeatRight reliability

## Missing or unavailable information
- Swift's confirmation of window
- Tenant's confirmation of access

## Conflicts between sources
- Ticket urgency 'urgent' vs policy: no heating/hot water for a vulnerable occupant is an emergency; treated as emergency.

## Answers to the case questions
**1. What happened when you assigned the contractor and how did you verify it?**

The first attempt returned HTTP 500 and the ledger said NOT APPLIED (ticket still at init). I retried once; it succeeded and read-back showed stage visit with HeatRight, window 11 Oct 08:00-12:00 (A1).

**2. What do you tell the tenant at each point?**

Only verified facts. I did not email the tenant after the first assignment in this run, because the assignment was unverified at the first attempt and the visit log came straight after. After the no-show I apologised, gave the Swift window as a target, asked for confirmation, gave the gas line, kept to email as preferred (MSG-101).

**3. After the no-show, what do you do?**

Recorded missed_appointment (A2), reassigned to Swift as an emergency for a vulnerable occupant (A3), emailed tenant (A4) and landlord (A5, tool errored but read-back showed MSG-102 sent), set follow-up (A6), escalated P2 (A7).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `record_work_result` | {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11: HeatRight (C-11) no-show for 08:00-12:00 window, not… | 1 | ✅ verified | Ticket R-4820 read back after record_work_result |
| A3 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 14:00-18:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-11","party":"Swift Plumbing & Heating / tenant","purpose":"Confirm Swift attended 14:00-18:00 and h… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A7 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Vulnerable tenant, no heating/hot water since Fri evening; first contractor no-show; first a… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
- A1 attempt 1: HTTP 500, NOT APPLIED; retried once, verified.
- A5: Reported timeout but read-back showed MSG-102 sent; not retried.
