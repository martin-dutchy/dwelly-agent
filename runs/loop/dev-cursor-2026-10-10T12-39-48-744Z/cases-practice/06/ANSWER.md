# Case 06: Contractor assignment fails, then no-show: ANSWER

**Decision:** escalated · **Severity:** emergency

No heating/hot water for a vulnerable tenant. HeatRight was assigned (first attempt failed, retry verified), then no-showed. Recorded the missed appointment, reassigned to Swift, emailed tenant and landlord, set follow-up and escalated P1.

## Where the case stands
Ticket R-4820 at visit/mp_time_force stage. Swift assigned for requested 11 Oct 14:00-18:00, not yet confirmed by provider. Tenant told by email; landlord emailed; human escalated P1 to confirm Swift by phone. Follow-up FUP-103 set.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Emailed apology, reassignment, unconfirmed slot, warmth/safety advice, next update by 16:00 | Jonah Okafor, tenant | email | A4 ✅ |
| 2 | ESCALATE_TO_HUMAN | P1 escalation to phone Swift and arrange fallback | internal maintenance | internal | A7 ✅ |
| 3 | WAIT | Follow-up to confirm Swift attendance and update tenant | Swift Plumbing & Heating | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, I'm really sorry nobody came this morning, and that you lost time off work. HeatRight's engineer was off sick and they had no cover. We have now moved your job to a second heating engineer, Swift Plumbing & Heating, and asked them to attend this afternoon (14:00-18:00). That slot is a request: it is not confirmed with them yet, and I will email you as soon as they confirm or if we need another plan. As this is an urgent no-heating job, our target is to get you heating and hot water within 24 hours. In the meantime, please keep warm layers and blankets to hand, and a hot drink if you can. If you feel unwell or unsafe, call 999 in an emergency. If you smell gas, leave the property and call 0800 111 999. You will next hear from us by email by 16:00 today, or sooner.

**A5 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, an update on 27 Bethnal Green Road: the tenant (who has a disclosed vulnerability) has had no heating or hot water since Friday evening. HeatRight missed this morning's visit (engineer off sick), so we have reassigned to Swift Plumbing & Heating, requested for this afternoon. Per your standing instruction on emergencies we are proceeding; we will come back to you if any quote exceeds your £250 limit.

## Escalation
- **P1 → maintenance** (verified): No heating/hot water, vulnerable tenant, first contractor no-show; second contractor needs phone confirmation today
  - Known: R-4820 at 27 Bethnal Green Road. Tenant Jonah Okafor, anxiety, prefers email, no heat since Fri evening, lows 3-5C. HeatRight assigned (A1 failed once with HTTP 500, verified on retry), no-show 11 Oct 08:00-12:00 (engineer sick). Reassigned to Swift 14:00-18:00 (A2); tenant and landlord emailed.
  - Missing: Swift has not confirmed the slot. No fallback if they decline. Tenant may want goodwill/compensation response (needs human).
  - Options: Phone Swift (+447700900312) to confirm attendance today; If Swift declines, try other out-of-hours Gas Safe contractor or temporary heaters; Consider goodwill response to tenant
  - Recommendation: Phone Swift now to confirm a same-day slot; have a fallback ready; review goodwill for tenant.
  - Deadline: 2026-10-11 14:00

## What this does not establish
- Assignment is a request; it does not confirm Swift will attend
- No cause, cost or who pays established
- No compensation promised

## Remaining work
- Human to phone Swift and confirm visit; then set_visit
- Update tenant by 16:00 on 11 Oct
- Record result and invoice after visit; check against £250 limit

## Missing or unavailable information
- Swift's confirmation of the slot
- Cause of the heating fault

## Conflicts between sources
- Ticket urgency 'urgent' but policy treats no heating with a vulnerable occupant as emergency; treated as emergency.

## Answers to the case questions
**1. 1. What happened when you assigned the contractor and how did you verify it?**

First assign_contractor to HeatRight returned HTTP 500 and ledger A1 attempt 1 was NOT APPLIED (ticket still at init). I retried once; attempt 2 verified by read-back with the ticket at stage visit. I did not tell anyone it was done until verified.

**2. 2. What do you tell the tenant at each point?**

Nothing was sent at the first failure. After the no-show I emailed (his preferred channel) an apology, said Swift was requested for 14:00-18:00 but not yet confirmed, gave the 24h target, warmth/safety and gas helpline advice, and said when he would hear next (by 16:00).

**3. 3. After the no-show, what do you do?**

Recorded the missed appointment, reassigned to Swift (second contractor on file, out-of-hours), emailed tenant and landlord, set a follow-up, and escalated P1 to confirm Swift by phone and arrange a fallback; goodwill is for a human.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 14:00-18:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A3 | `record_work_result` | {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11: HeatRight (C-11) no-show for 08:00-12:00 window, not… | 1 | ✅ verified | Ticket R-4820 read back after record_work_result |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-11","purpose":"Confirm Swift attends 14:00-18:00 and update tenant by 16:00","party":"Swift Plumbin… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A7 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"No heating/hot water, vulnerable tenant, first contractor no-show; second contractor needs p… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
- A1: Attempt 1 NOT APPLIED (HTTP 500); retried once, verified.
- A5: API error but read-back confirmed MSG-102 sent; not retried.
