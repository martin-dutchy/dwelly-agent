# Case 06: Contractor assignment fails, then no-show: ANSWER

**Decision:** escalated · **Severity:** emergency

Urgent no-heating job raised to emergency because tenant is vulnerable and it is cold. HeatRight assignment failed once then verified on retry; HeatRight no-showed, so Swift was assigned for the same afternoon, tenant and landlord told, and P1 escalated.

## Where the case stands
Stage visit: Swift Plumbing & Heating assigned 11 Oct 15:00-19:00 after HeatRight no-show. Awaiting Swift's attendance; follow-up FUP-104; P1 escalation ESC-105.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Assigned Swift Plumbing & Heating for same-day visit 15:00-19:00 | Swift Plumbing & Heating, contractor | portal | A4 ✅ |
| 2 | REPLY_TO_TENANT | Apologised and gave tenant the new slot by email | Jonah Okafor, tenant | email | A5 ✅ |
| 3 | ESCALATE_TO_HUMAN | P1 escalation for vulnerable tenant without heating | internal | internal | A8 ✅ |
| 4 | WAIT | Follow up on Swift attendance today | Swift Plumbing & Heating | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, sorry you have no heating or hot water. We have booked HeatRight Ltd (Gas Safe registered) to visit tomorrow, Sunday 11 October, between 8am and 12pm. Please let us know if someone can let them in, or if that doesn't work. Because it's urgent, we'll try to get a sooner slot if one opens up. Stay warm in the meantime, and if you ever smell gas call 0800 111 999. You'll hear from us again once the visit is done.

**A5 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, I'm very sorry. HeatRight didn't attend because their engineer was off sick, and you lost your morning for nothing. We have booked a different Gas Safe engineer, Swift Plumbing & Heating, for today, Sunday 11 October, between 3pm and 7pm. Please reply if you can't be in. We are treating this as an emergency because it's cold and no heating is hard on you. If you smell gas, call 0800 111 999. If it isn't resolved today, we'll email you again this evening.

**A6 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, 27 Bethnal Green Road has had no heating or hot water since Friday evening; the tenant has anxiety. HeatRight Ltd missed this morning's visit (engineer off sick), so under your emergency instruction we have booked Swift Plumbing & Heating for 3-7pm today. No quote has been received yet; anything over your £250 limit will come to you for approval. We'll update you after the visit.

## Escalation
- **P1 → maintenance** (verified): No heating/hot water, vulnerable tenant, contractor no-show; assignment tool failed once earlier
  - Known: R-4820 at 27 Bethnal Green Road: no heating/hot water since Fri evening. Tenant Jonah Okafor has anxiety (vulnerable), lows 3-5C. First assign attempt errored (HTTP 500), retry verified. HeatRight no-show 11 Oct 08-12 (engineer sick). Swift Plumbing & Heating assigned 15:00-19:00 same day; tenant and landlord emailed.
  - Missing: Whether Swift confirmed the slot and attends; whether tenant can be in.
  - Options: Monitor Swift visit and phone Swift to confirm attendance; Arrange emergency heaters / alternative accommodation if not fixed today
  - Recommendation: Phone Swift now to confirm attendance; offer tenant temporary heaters if not fixed today.

## What this does not establish
- Assignment does not confirm Swift has accepted the slot or fixed the fault
- No cost approved or quote received; over £250 needs landlord approval
- Tenant emailed instead of phoned (cannot phone from this run)

## Remaining work
- Confirm Swift attends and heating restored (maintenance human, today)
- Update tenant and landlord after visit
- Handle HeatRight no-show with provider; any invoice check

## Missing or unavailable information
- Swift's confirmation of the slot
- Cause of fault and cost

## Conflicts between sources
- Ticket urgency 'urgent' vs policy: no heating with vulnerable tenant is an emergency; treated as emergency.

## Answers to the case questions
**1. What happened when you assigned the contractor and how did you verify it?**

First attempt to assign HeatRight returned HTTP 500 and the ledger showed NOT APPLIED (A1 attempt 1). I retried once; it verified by read-back at stage visit (A1 attempt 2). I only told the tenant after that.

**2. What do you tell the tenant at each point?**

After verified booking: HeatRight visit 11 Oct 8am-12pm, gas number, hear from us after the visit (MSG-101). After the no-show: apology, explanation, Swift booked 3-7pm same day, gas number, update this evening if unresolved (MSG-102; API reported timeout but read-back showed it sent).

**3. After the no-show, what do you do?**

Recorded missed_appointment, assigned Swift (the other approved contractor) same day under the landlord's emergency approval, emailed the landlord, escalated P1, and set a follow-up FUP-104.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `record_work_result` | {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight (C-11) no_show, \"Engineer off sick,… | 1 | ✅ verified | Ticket R-4820 read back after record_work_result |
| A4 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 15:00-19:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A5 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-11","purpose":"Check Swift attended 15:00-19:00 and heating restored; update tenant and landlord","… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A8 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"No heating/hot water, vulnerable tenant, contractor no-show; assignment tool failed once ear… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
- A1: Attempt 1 NOT APPLIED (HTTP 500); retried once, verified.
- A5: API reported timeout but read-back showed MSG-102 sent; not retried.
