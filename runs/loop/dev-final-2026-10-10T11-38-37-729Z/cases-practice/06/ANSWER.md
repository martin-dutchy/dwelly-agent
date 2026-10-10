# Case 06: Contractor assignment fails, then no-show: ANSWER

**Decision:** escalated · **Severity:** emergency

No heating/hot water with a vulnerable tenant, treated as emergency. First assignment to HeatRight failed once (HTTP 500, not applied) then verified on retry; HeatRight no-showed on 11 Oct. Recorded the missed visit, reassigned to Swift, informed tenant and landlord, escalated P1.

## Where the case stands
Ticket at stage visit with Swift (C-12), window 11 Oct 15:00-19:00 requested, not yet confirmed by provider. P1 escalated. Waiting on Swift; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 handover: confirm Swift by phone, fallback heating if not attended tonight | internal maintenance | internal | A8 ✅ |
| 2 | REPLY_TO_TENANT | Apologised for no-show, said Swift slot requested but unconfirmed, gas safety advice | Jonah Okafor, tenant | email | A5 ✅ |
| 3 | ASSIGN_PROVIDER | Reassigned to Swift Plumbing & Heating | Swift Plumbing & Heating | internal | A4 ✅ |
| 4 | WAIT | Follow up on Swift attendance and tenant confirmation 12 Oct | Swift Plumbing & Heating | internal | A9 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, sorry you have no heating or hot water. We have booked HeatRight Ltd, a Gas Safe heating engineer, to visit tomorrow (Sunday 11 October) between 8am and 12pm. Please make sure someone is home. If you smell gas, leave the property and call 0800 111 999. We will keep you updated.

**A5 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, I'm really sorry. HeatRight's engineer was off sick and nobody told you, and I know you took the morning off. We have now moved the job to Swift Plumbing & Heating (Gas Safe) and asked for a visit today, Sunday, between 3pm and 7pm. They have not yet confirmed that slot, so I will email you as soon as they do. As this is a no-heating job we are treating it as an emergency. Please use a warm room and warm clothes meanwhile. If you smell gas, leave the property and call 0800 111 999.

**A6 · send_message → Swift Plumbing & Heating (contractor) via sms, +447700900312** (verified)

> URGENT R-4820, 27 Bethnal Green Road E1 6LA: no heating/hot water, vulnerable tenant (Jonah Okafor, prefers email). Previous contractor no-showed today. Please attend today 15:00-19:00 if possible and confirm by reply, or tell us your earliest time.

**A7 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Hi Margaret, update on 27 Bethnal Green Road: the tenant has had no heating or hot water since Friday evening and is vulnerable, so we treated it as an emergency. HeatRight missed today's morning visit (engineer sick), so we have reassigned to Swift Plumbing & Heating for this afternoon, awaiting their confirmation. No quote yet; we will come back to you if the cost goes above your £250 limit.

## Escalation
- **P1 → maintenance** (verified): Vulnerable tenant without heating/hot water for ~40h; first contractor no-show; replacement not yet confirmed
  - Known: R-4820, 27 Bethnal Green Road. Tenant Jonah Okafor (anxiety, email). Assignment to HeatRight needed a retry (first attempt HTTP 500, second verified). HeatRight no-show 11 Oct 12:30. Reassigned Swift (C-12) 15:00-19:00, unconfirmed. Tenant, landlord informed. Overnight lows 3-5C.
  - Missing: Swift's confirmation of attendance.
  - Options: Phone Swift to confirm; Fallback to another Gas Safe engineer or temporary heaters; Alternative accommodation if not fixed tonight
  - Recommendation: Phone Swift now; if no confirmed attendance tonight, arrange temporary heating/alternative contractor. Review HeatRight's reliability.
  - Deadline: Today 2026-10-11 evening

## What this does not establish
- Assignment does not mean Swift has confirmed the slot
- Heating not yet restored; no cost approved or quoted
- Swift window was my proposal, not provider-confirmed

## Remaining work
- Human: confirm Swift attendance, fallback if not (ESC-105)
- Swift: attend, report; invoice/quote checks vs £250 limit
- Tenant confirmation after fix; review HeatRight reliability

## Missing or unavailable information
- Swift confirmation of visit time

## Conflicts between sources
- Ticket urgency is 'urgent' but no heating/hot water with a vulnerable occupant is an emergency under policy; treated as emergency.

## Answers to the case questions
**1. What happened when you assigned the contractor and how did you verify it?**

First assign_contractor call returned HTTP 500 and ledger A1 attempt 1 said NOT APPLIED. I retried once (safe, idempotent); attempt 2 verified by read-back with the ticket at stage visit, HeatRight, 11 Oct 08:00-12:00. I only told the tenant after that.

**2. What do you tell the tenant at each point?**

After verified assignment: HeatRight booked Sunday 8-12, please be home, gas emergency number. After no-show: apology, moved to Swift with a requested 15:00-19:00 slot that is not yet confirmed, warmth advice, gas number, will update when confirmed. By email, as the tenant prefers. The second send timed out but read-back showed it was sent (MSG-102), so not retried.

**3. After the no-show, what do you do?**

Recorded missed_appointment, reassigned to Swift (emergency, so no landlord approval needed), SMSed Swift, emailed the landlord, escalated P1 to maintenance for phone confirmation and fallback heating, scheduled a follow-up for 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `record_work_result` | {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight (C-11) no_show, \"Engineer off sick,… | 1 | ✅ verified | Ticket R-4820 read back after record_work_result |
| A4 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 15:00-19:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A5 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"sms","contact":"+447700900312","ticket_ref":"R-4820","… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A7 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A8 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Vulnerable tenant without heating/hot water for ~40h; first contractor no-show; replacement … | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |
| A9 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-12","purpose":"Confirm Swift attended and heating restored; get tenant confirmation","party":"Swift… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
- A1 attempt 1: NOT APPLIED (HTTP 500); retried once, verified
- A5: API error but read-back showed message sent; not retried
