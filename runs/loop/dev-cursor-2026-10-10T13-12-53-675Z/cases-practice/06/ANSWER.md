# Case 06: Contractor assignment fails, then no-show: ANSWER

**Decision:** action_taken · **Severity:** emergency

Urgent no-heating job for a vulnerable tenant. First assignment to HeatRight failed once then verified on retry. HeatRight no-showed, so I recorded the missed appointment and reassigned to Swift for the same day, treating it as an emergency, and told tenant and landlord.

## Where the case stands
Stage visit: Swift Plumbing & Heating assigned 2026-10-11 15:00-19:00 after HeatRight no-show. Follow-up FUP-104 to confirm attendance and tell tenant.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ASSIGN_PROVIDER | Reassign to Swift Plumbing & Heating for same-day visit 15:00-19:00 | Swift Plumbing & Heating | portal | A4 ✅ |
| 2 | REPLY_TO_TENANT | Apologise, explain no-show, give new window | Jonah Okafor, tenant | email | A5 ✅ |
| 3 | WAIT | Confirm attendance and heating restored this evening | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, sorry you have no heating or hot water. We have booked HeatRight Ltd (Gas Safe registered) to visit on Sunday 11 October, 8am-12pm. Please make sure someone can let them in. If you smell gas, leave the property and call 0800 111 999. We will email you again after the visit window.

**A5 · send_message → Jonah Okafor (tenant) via email, jonah.ok@mailbox.example** (verified)

> Hi Jonah, I'm very sorry. HeatRight did not attend this morning because their engineer was off sick, and I know you took time off work. We have booked a different Gas Safe registered firm, Swift Plumbing & Heating, for today, Sunday 11 October, 3pm-7pm. Please let us know if you can't be in. If you smell gas, leave and call 0800 111 999. I will email you again this evening to check they arrived.

**A6 · send_message → Margaret Ellison (landlord) via email, margaret@ellisonlettings.co.uk** (verified)

> Hi Margaret, update on 27 Bethnal Green Road: the tenant (vulnerable occupant) has had no heating or hot water since Friday evening. HeatRight missed this morning's visit (engineer sick), so we have reassigned to Swift Plumbing & Heating for 3-7pm today. Any quote above your £250 limit will come to you first. I will update you after the visit.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Assignment does not confirm the cause or cost; quotes over £250 need landlord approval
- Swift's attendance has not been confirmed by the provider itself

## Remaining work
- Confirm Swift attends and heating restored (agency, FUP-104)
- Landlord approval if quote exceeds £250
- Provide invoice and Gas Safe evidence before close

## Missing or unavailable information
- Swift's own confirmation of the 15:00-19:00 window

## Conflicts between sources
- Ticket urgency 'urgent' vs policy: no heating/hot water with vulnerable occupant is an emergency; treated as emergency.

## Answers to the case questions
**1. What happened when you assigned the contractor and how did you verify it?**

Attempt 1 returned HTTP 500 and the ledger said NOT APPLIED (stage still init). I retried once; read-back showed stage visit with HeatRight 08:00-12:00 (A1 verified). Nothing was told to the tenant until it was verified.

**2. What do you tell the tenant at each point?**

After verified booking: HeatRight booked 11 Oct 8-12, gas helpline advice, update after window (A2). After no-show: apology, reason, Swift booked 3-7pm today, will email this evening (A5; the API errored but read-back showed it was sent, so not retried).

**3. After the no-show, what do you do?**

Recorded missed_appointment (A3), reassigned to the other approved Gas Safe contractor Swift same day because tenant is vulnerable and temperatures are 3-5C (A4), emailed landlord (A6), set follow-up (A7). No human escalation needed as an alternative contractor was available.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `record_work_result` | {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight (C-11) no-show, note 'Engineer off s… | 1 | ✅ verified | Ticket R-4820 read back after record_work_result |
| A4 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 15:00-19:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A5 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A7 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-11","party":"Swift Plumbing & Heating / tenant","purpose":"Confirm Swift attended 15:00-19:00 and h… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
- A1: Attempt 1 NOT APPLIED (HTTP 500); retried once, attempt 2 verified.
- A5: API timeout error but read-back showed MSG-102 sent; not retried to avoid duplicate.
