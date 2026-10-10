# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reports a once-a-minute chirp from a sealed 2019 CO alarm with a 7-year life, so it is most likely end-of-life, not a CO emergency. The call dropped before symptoms were confirmed. I logged an urgent replacement job and a separate routine fan job, sent safety advice and a symptom question to the tenant, and asked the landlord to approve replacement.

## Where the case stands
JOB-101 at intake, awaiting landlord decision (APR-104) and tenant symptom reply; follow-up 12 Oct. JOB-102 (fan) routine at intake.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve our contractor replacing the CO alarm | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Send safety advice, ask for symptoms, say don't remove the alarm, give timescale | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Follow up on landlord approval and tenant reply on 12 Oct | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Safety first: if the alarm turns into a continuous loud alarm, or anyone feels headachy, dizzy, sick or drowsy, leave the flat with everyone, open windows if safe, and call the Gas Emergency line on 0800 111 999 (999 if anyone is unwell). Please reply to tell us whether anyone has any of those symptoms. A once-a-minute chirp usually means the alarm has reached the end of its life (yours was fitted in 2019 and is sealed, so the battery can't be changed). Please don't try to remove or open it; please leave it in place. We've logged an urgent job to replace it and are arranging this with your landlord. Our target is within 72 hours, and we'll update you by Monday 12 Oct. We've also logged the noisy bathroom fan as a separate routine job.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Replace the hallway CO alarm at Flat 9, 3 Amhurst Road (FireAngel CO-9X, fitted April 2019, 7-year life, sealed battery, now chirping so likely expired). Please confirm we may instruct our contractor to replace it (expected within your £300 limit). Also noisy bathroom extractor fan logged as separate routine job JOB-102. Reply by Monday 12 Oct please; tenant has been asked about symptoms.
> 
> Options: Yes, send your contractor to replace the alarm (recommended); I'll arrange my own contractor; Other

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor has been assigned and no visit booked.
- Nothing here confirms that there is no CO present; that depends on the tenant's symptom reply.
- The landlord has not yet approved any spend.

## Remaining work
- Assign a contractor once the landlord approves (target within 72h).
- Triage JOB-102 as a routine job within 14 days, with landlord approval.
- Escalate P1 if the tenant reports symptoms or a continuous alarm.

## Missing or unavailable information
- Whether the tenant or anyone has CO symptoms (call dropped).
- Whether the tenant already removed the battery.
- No electrician or alarm contractor is named in the records.

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Is this a CO emergency, battery issue or end-of-life alarm?**

Most likely end-of-life. The alarm was fitted 2019-04-02 with a 7-year life (expired about April 2026), the battery is sealed so it cannot be replaced, and a single chirp about once a minute with no continuous alarm fits end-of-life. The tenant was not asked about symptoms before the call dropped, so I sent the safety advice and symptom question by SMS. Any symptoms or a continuous alarm would make it an emergency.

**2. Who is responsible, citing the clause?**

The landlord. Clause 12.8 only makes the tenant replace batteries in battery-operated alarms; this unit has a sealed battery, so replacing the whole alarm is a landlord repair. Clause 12.9 means the tenant should report faults, which she did. Clause 12.17 (avoidable call-out charge) does not apply, as this is a genuine fault.

**3. What actions did you take and what did you tell the tenant?**

Created urgent JOB-101 and routine JOB-102 (noisy fan), requested landlord approval (APR-104), and scheduled a follow-up for 12 Oct. I told Priya not to remove the alarm, and gave the CO symptoms and 0800 111 999 / 999 advice. I asked her to reply on symptoms, gave a 72-hour target and said we'd update her by 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, sealed b… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"appliance","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent. R… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Replace the hallway CO alarm at Flat 9, 3 Amhurst Road (FireAngel CO-9X,… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","party":"Ben Hartley / Priya Shah","purpose":"Check landlord approval for CO alarm replacement… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
