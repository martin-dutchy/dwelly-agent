# Case 06: Contractor assignment fails, then no-show: ANSWER

**Decision:** escalated · **Severity:** emergency

Urgent no-heating job upgraded to emergency because the tenant is vulnerable and temperatures are 3-5C. HeatRight assignment failed once, then verified on retry; HeatRight no-showed. Missed visit recorded, Swift assigned for same day, tenant and landlord told, P1 escalated.

## Where the case stands
Ticket R-4820 at stage visit with Swift Plumbing & Heating (15:00-19:00 on 11 Oct, assigned by us, not yet provider-confirmed). HeatRight no-show recorded. P1 escalated to confirm by phone. Follow-up set.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1: phone Swift to confirm attendance today and arrange temporary heating if needed | internal maintenance | internal | A7 ✅ |
| 2 | ASSIGN_PROVIDER | Reassigned to Swift Plumbing & Heating, 15:00-19:00 today | Swift Plumbing & Heating, contractor | portal | A3 ✅ |
| 3 | REPLY_TO_TENANT | Apologised, explained reassignment, safety advice, update by 5pm | Jonah Okafor, tenant | email | A4 ✅ |
| 4 | WAIT | Check Swift attendance at 17:00 and update tenant/landlord | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, I'm really sorry. HeatRight's engineer was off sick and they didn't tell us, so nobody came this morning after you took time off work. That's not good enough. We've now sent Swift Plumbing & Heating, a Gas Safe registered firm, and asked them to attend today (Sunday) between 3pm and 7pm. As they haven't yet confirmed that slot with us, please treat it as our target and I'll email you as soon as they do. Because it's an emergency for you, we're treating it as same-day. In the meantime, please stay warm: layers, blankets, a warm room, and let us know if you feel unwell. If you ever smell gas, leave the property and call 0800 111 999. I'll update you by 5pm today whatever happens.

**A5 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Dear Margaret, 27 Bethnal Green Road has had no heating or hot water since Friday evening; the tenant has disclosed anxiety, so we treat it as an emergency, in line with your note on approving emergencies. HeatRight Ltd missed today's morning visit (engineer off sick, no cover). We have reassigned to Swift Plumbing & Heating for this afternoon (3-7pm, awaiting their confirmation). No quote yet; anything above your £250 limit on non-emergency work will come to you first. I'll update you once the engineer has reported.

## Escalation
- **P1 → maintenance** (verified): No heating/hot water for vulnerable tenant; first contractor no-show
  - Known: R-4820, 27 Bethnal Green Road. Tenant Jonah Okafor (anxiety, email preferred) no heating/hot water since Fri evening; lows 3-5C. First assign call to HeatRight failed once (HTTP 500), succeeded on retry. HeatRight no-show 11 Oct 08-12 (engineer sick). Recorded missed appointment; reassigned to Swift Plumbing & Heating 15:00-19:00 (assigned by us, not yet confirmed by Swift). Tenant and landlord emailed.
  - Missing: Swift's confirmation of attendance today; cause of fault; cost.
  - Options: Phone Swift now to confirm the 15:00-19:00 slot; If Swift cannot attend, try another Gas Safe emergency engineer or offer temporary heaters
  - Recommendation: Phone Swift immediately to confirm attendance today (we cannot phone from this run) and arrange temporary heating if no repair is possible today.
  - Deadline: Today 15:00

## What this does not establish
- Assignment does not confirm Swift will attend; the window is our target only
- No cause or cost established; no spend approved beyond limits

## Remaining work
- Maintenance: confirm Swift attendance and temporary heating (P1, ESC-104)
- Update tenant and landlord after visit; record result, quote/invoice

## Missing or unavailable information
- Swift's confirmation of the slot
- Fault cause and cost

## Conflicts between sources
- Ticket urgency 'urgent' vs vulnerable tenant with no heating/hot water: treated as emergency per policy.

## Answers to the case questions
**1. What happened when you assigned the contractor and how did you verify it?**

First attempt to assign HeatRight returned HTTP 500 and the ledger showed NOT APPLIED (ticket still at init). I retried once; it succeeded and read-back showed stage visit (A1). I told nobody it was booked until verified.

**2. What do you tell the tenant at each point?**

Only one tenant message was sent in this run, after the no-show (A4): apology, Swift reassigned for 3-7pm as an unconfirmed target, warmth and gas safety advice, update by 5pm. By email as he prefers. Not sent before the no-show: a visit confirmation for the HeatRight 8-12 window.

**3. After the no-show, what do you do?**

Recorded missed_appointment, reassigned to Swift (emergency, vulnerable tenant), emailed tenant and landlord, escalated P1 for phone confirmation and temporary heating, and set a 17:00 follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `record_work_result` | {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight no_show, \"Engineer off sick, no cov… | 1 | ✅ verified | Ticket R-4820 read back after record_work_result |
| A3 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 15:00-19:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-11","purpose":"17:00 check Swift attended; update tenant and landlord","party":"Swift Plumbing & He… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A7 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"No heating/hot water for vulnerable tenant; first contractor no-show","known":"R-4820, 27 Be… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
- A1: Attempt 1 NOT APPLIED (HTTP 500); retried once, verified.
- A5: Reported timeout but read-back showed message sent; not retried.
