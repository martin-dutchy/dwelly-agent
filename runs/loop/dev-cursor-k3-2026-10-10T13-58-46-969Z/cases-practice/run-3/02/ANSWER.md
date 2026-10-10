# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

A once-a-minute chirp on a sealed-battery CO alarm fitted April 2019 with 7-year life points to end-of-life, not a CO detection. I logged an urgent replacement job and a routine fan job, sent the tenant safety advice, and asked the landlord to approve.

## Where the case stands
JOB-101 (urgent) at intake, awaiting landlord approval (APR-104), follow-up 12 Oct. JOB-102 (routine fan) logged. Tenant informed by SMS.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve replacing the expired CO alarm (within £300 limit) | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | SMS safety advice, do not remove alarm, 72h target, next contact 12 Oct | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Review landlord reply and chase on 12 Oct | Ben Hartley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't remove or cover the alarm. Its battery is sealed, and a once-a-minute chirp usually means it has reached the end of its life (it was fitted in 2019), so it needs replacing rather than a new battery. Until then, please don't rely on it. If it ever sounds continuously, or anyone feels dizzy, has a headache, nausea or feels drowsy, leave the flat, call the National Gas Emergency line on 0800 111 999 (or 999 if someone is unwell) and tell us. Please also keep a window open a little. We're asking your landlord to approve a replacement and aim to get it done within 72 hours. We've also logged the noisy bathroom fan as a routine job. You'll hear from us by Monday 12 Oct.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hi Ben, the hallway CO alarm at Flat 9, 3 Amhurst Road (fitted April 2019, sealed 7-year unit) is chirping, which indicates it is past end of life. A working CO alarm is your responsibility to provide, so we'd like to replace it as an urgent job; a new alarm should be well under your £300 limit. Please confirm yes to us arranging replacement via a contractor of ours, by end of Sunday 11 Oct if possible. Separately, we've logged a noisy bathroom extractor fan as a routine job.
> 
> Options: Yes, send your contractor to replace the alarm (recommended); I will arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Tickets and messages do not confirm the alarm is faulty beyond the evidence; no CO reading was taken.
- No contractor assigned yet; no appointment promised.
- Fan job not yet sent for landlord approval.

## Remaining work
- Landlord approval then assign a contractor for alarm replacement (owner: agency ops)
- Route JOB-102 fan to landlord approval (routine, 14 days)
- Check tenant has no CO symptoms; the call dropped before this was asked

## Missing or unavailable information
- Whether the tenant has any symptoms
- No electrician/alarm contractor is named in records

## Conflicts between sources
- Caller asked to remove the battery, but the record says sealed battery, so that isn't possible or advisable.

## Answers to the case questions
**1. Is this a CO emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely end-of-life. The alarm is sealed-battery (no replaceable battery), fitted 2019-04-02 with a 7-year life, so it expired around April 2026, and the tenant reports a single chirp every minute rather than a continuous alarm. Not treated as a CO emergency, but as urgent because the alarm can't be relied on. Safety advice given in case of symptoms or continuous alarm.

**2. Who is responsible for fixing it, citing the tenancy clause?**

The landlord. Clause 12.8 makes the tenant responsible only for replacing batteries, and this unit has a sealed battery, so it is an equipment replacement. Clause 12.9 means the tenant should test monthly and report faults, which she did. Clause 12.17 (avoidable call-out) does not apply as she reported promptly. The fan is also a landlord repair.

**3. What actions did you take and what did you tell the tenant?**

Created JOB-101 (urgent) and JOB-102 (routine fan); asked Ben for approval (APR-104); scheduled follow-up FUP-105 for 12 Oct; texted the tenant not to remove or cover the alarm, to ventilate, to leave and call 0800 111 999/999 if the alarm goes continuous or anyone has symptoms, with a 72h target and next update by 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, sealed b… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"appliance","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Tenant says n… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Hi Ben, the hallway CO alarm at Flat 9, 3 Amhurst Road (fitted April 201… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","party":"Ben Hartley","purpose":"Chase landlord approval for CO alarm replacement; check tenan… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
