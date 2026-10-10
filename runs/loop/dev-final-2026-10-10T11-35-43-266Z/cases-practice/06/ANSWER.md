# Case 06: Contractor assignment fails, then no-show: ANSWER

**Decision:** escalated · **Severity:** emergency

Urgent no-heating job upgraded to emergency as the tenant is vulnerable. HeatRight assignment failed once then verified on retry; they no-showed, so I recorded it, apologised to the tenant, assigned Swift, informed the landlord and escalated P1.

## Where the case stands
Stage visit; Swift assigned 11 Oct 14:00-18:00 (unconfirmed by provider). P1 escalated. Tenant and landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 handover: phone Swift to confirm attendance today, fallback engineer/heaters | internal maintenance | internal | A6 ✅ |
| 2 | REPLY_TO_TENANT | Apologised, explained no-show, gave emergency target of today/within 24h, warmth and gas advice | Jonah Okafor, tenant | email | A3 ✅ |
| 3 | ASSIGN_PROVIDER | Assigned Swift Plumbing & Heating after HeatRight no-show | Swift Plumbing & Heating | internal | A4 ✅ |
| 4 | WAIT | Follow-up to confirm Swift attendance and tell tenant the confirmed time | Swift / tenant | internal | A7 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, I'm really sorry nobody came this morning, and that you took time off for it. The engineer was off sick and the company had no cover. We are not leaving you without heating: we are arranging a different heating engineer now and treating it as an emergency, so the aim is to get someone to you today or within 24 hours at the latest. I will email you as soon as a time is confirmed. Until then, please keep warm with layers and blankets, and a hot drink if you can. If you smell gas, leave the property and call 0800 111 999. Kind regards, the maintenance team

**A5 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, an update on 27 Bethnal Green Road: the tenant has had no heating or hot water since Friday evening and is vulnerable, so we are treating it as an emergency. HeatRight did not attend today (engineer off sick). We have instructed Swift Plumbing & Heating instead, with a requested window of 14:00-18:00 today, awaiting their confirmation. No quote has been received; anything above your £250 limit will come back to you first. No action needed from you now.

## Escalation
- **P1 → maintenance** (verified): Vulnerable tenant, no heating/hot water, first contractor no-show; second contractor needs to confirm attendance today
  - Known: R-4820. Tenant Jonah Okafor (anxiety, prefers email), no heat/hot water since Fri 9 Oct evening, lows 3-5C. HeatRight assignment failed once (HTTP 500), retried OK, verified. HeatRight no-show 11 Oct 08:00-12:00 (engineer sick). Recorded missed appointment, emailed tenant (MSG-101), assigned Swift (C-12, Gas Safe 551987) window 14:00-18:00, emailed landlord.
  - Missing: Swift has not confirmed the window; no phone/confirmation channel used by me.
  - Options: Phone Swift (+447700900312) to confirm today's attendance; If Swift cannot attend, try another out-of-hours engineer; Temporary heaters / alternative accommodation
  - Recommendation: Phone Swift now to confirm arrival today; if not, source another engineer and consider heaters.
  - Deadline: Today 11 Oct

## What this does not establish
- Assignment does not mean Swift has confirmed the window
- No cost approved; no quote received
- Did not tell the tenant a time is booked

## Remaining work
- Human to confirm Swift by phone today
- Email tenant confirmed time
- Record result after visit, invoice and close checks

## Missing or unavailable information
- Swift's confirmation of the visit window

## Conflicts between sources
- Ticket says urgent, but a vulnerable tenant with no heating/hot water is an emergency under policy; treated as emergency.

## Answers to the case questions
**1. What happened when you assigned the contractor and how did you verify it?**

First attempt returned HTTP 500 and ledger A1 showed NOT APPLIED (ticket still at init). I retried once; read-back verified stage visit with HeatRight 11 Oct 08:00-12:00. I told no one it was done until verified.

**2. What do you tell the tenant at each point?**

Only after the no-show (email, as he prefers): apology, engineer sick, new engineer being arranged as an emergency with a target of today/within 24h, no time confirmed yet, keep warm, gas number 0800 111 999. A confirmed time follows once Swift confirms.

**3. After the no-show, what do you do?**

Recorded missed_appointment (A2), emailed tenant (A3), assigned Swift (A4, within the spend limit/emergency), emailed landlord (A5 timed out but read-back showed MSG-102 sent, not retried), P1 escalation ESC-103 (A6), follow-up FUP-104 (A7).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `record_work_result` | {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight (C-11) no_show, \"Engineer off sick,… | 1 | ✅ verified | Ticket R-4820 read back after record_work_result |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 14:00-18:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Vulnerable tenant, no heating/hot water, first contractor no-show; second contractor needs t… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A7 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-11","party":"Swift Plumbing & Heating","purpose":"Confirm Swift attends 14:00-18:00 and email tenan… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
- A5: Landlord email reported timeout but read-back showed MSG-102 in the send log; not retried to avoid a duplicate.
