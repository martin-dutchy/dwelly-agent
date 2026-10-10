# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reports a once-a-minute chirp on a sealed-battery CO alarm fitted April 2019 with a 7-year life, so it is most likely end-of-life, not an active CO emergency. I logged an urgent replacement job and a separate routine fan job, sent safety advice and a symptom check to the tenant, and told the landlord.

## Where the case stands
JOB-101 (urgent CO alarm replacement) open at intake, no contractor assigned yet; JOB-102 (routine fan) open. Awaiting tenant's symptom confirmation; follow-up 2026-10-11.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | SMS with safety advice, don't tamper with alarm, symptom check, 72h target, fan logged | Priya Shah, tenant | sms | A3 ✅ |
| 2 | OTHER | Informed landlord alarm is end-of-life and replacement is arranged within limit | Ben Hartley, landlord | email | A4 ✅ |
| 3 | WAIT | Follow up on symptoms and replacement booking next day | Priya Shah, tenant | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't try to remove or disable the CO alarm. Its battery is sealed, and from its age (fitted 2019) the chirp most likely means it has reached the end of its life, so it needs replacing. We've logged this as urgent and our target is to get it replaced within 72 hours. Safety first: if the alarm ever sounds continuously, or anyone has a headache, dizziness, nausea or drowsiness, leave the flat, open doors and windows if safe, and call 0800 111 999 (999 if anyone is unwell). Please reply to confirm nobody has had any of those symptoms. We've also logged the noisy bathroom fan as a separate routine job. We'll update you tomorrow.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the hallway CO alarm at Flat 9, 3 Amhurst Road is chirping. It's a sealed-battery FireAngel CO-9X fitted April 2019 with a 7-year life, so it looks to be past end of life. As the unit is sealed, the tenant can't replace a battery, so replacement is a landlord item. We're arranging a replacement as urgent; it should be well within your £300 limit. We'll tell you once it's booked. A noisy bathroom extractor fan is also logged as a routine job (JOB-102).

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Tickets and messages do not book a visit or confirm the alarm is faulty; replacement not yet arranged.
- No contractor assigned: none named on record for electrical/alarm work.

## Remaining work
- Assign a contractor to replace the CO alarm (agency, within £300 limit) and book access with tenant
- Confirm tenant has no symptoms; escalate P1 if she reports any or the alarm goes continuous
- Progress fan job JOB-102

## Missing or unavailable information
- Whether the tenant or anyone has CO symptoms (call dropped before asked)
- No named contractor for alarm replacement

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Is this a CO emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely end-of-life alarm. It is an intermittent chirp (not continuous), and the unit has a sealed battery and was fitted 2019-04-02 with a 7-year lifespan, so it is past its life. Not treated as an emergency unless symptoms or a continuous alarm are reported; symptoms not yet confirmed because the call dropped, so I asked by SMS with 0800 111 999 advice.

**2. Who is responsible for fixing it, citing the tenancy clause?**

The landlord. Clause 12.8 makes the tenant replace batteries only; the battery here is sealed, so replacing the whole unit is not a battery change. Clause 12.9 means the tenant should report faults promptly, which she did. Clause 12.17 (avoidable call-out charge) does not apply, as this is a genuine end-of-life fault and not out-of-hours at her request. The cost is expected within the landlord's £300 limit.

**3. What actions did you take, and what did you tell the tenant?**

Created JOB-101 (urgent) and JOB-102 (routine fan), SMSed the tenant not to remove or disable the alarm, gave CO safety steps and a 72h target for replacement, asked her to confirm no symptoms; emailed the landlord; scheduled follow-up for 2026-10-11.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","description":"Hallway CO alarm (FireAngel CO-9X, fitted 2019-04-02, sealed … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"appliance","severity":"routine","description":"Bathroom extractor fan noisy. Tenant says not urgent. Raised … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `schedule_follow_up` | {"due_on":"2026-10-11","purpose":"Confirm tenant has no CO symptoms; progress CO alarm replacement (assign electrician/contractor, no named … | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
