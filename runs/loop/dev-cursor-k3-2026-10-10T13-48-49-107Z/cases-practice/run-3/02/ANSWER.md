# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reported a once-a-minute chirp from a 2019 sealed-battery CO alarm, now past its 7-year life. Treated as an urgent end-of-life replacement, not a confirmed CO emergency. Logged urgent and routine (fan) jobs, sent safety advice to tenant, and asked the landlord for approval.

## Where the case stands
JOB-101 (urgent, CO alarm replacement) at intake, waiting on landlord approval (APR-104), follow-up 2026-10-12. JOB-102 (routine fan) logged.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve our contractor to replace the end-of-life CO alarm | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant not to remove battery, safety advice and gas line, replacement being arranged at no cost | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Review landlord approval on 12 Oct | Ben Hartley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't remove the battery or disable the alarm. Yours is a sealed unit fitted in 2019 and is likely at the end of its life, which causes a chirp, so we are arranging a replacement as an urgent job (target within 72 hours; we'll confirm once the landlord has approved). We can't rule out CO from a chirp alone, so if the alarm ever sounds continuously, or anyone has a headache, dizziness, nausea or feels drowsy, leave the flat, call the Gas Emergency line on 0800 111 999 (999 if anyone is unwell) and don't use switches or flames. Your tenancy makes the landlord responsible for replacing a sealed alarm, so no charge to you. We've also logged the noisy bathroom fan as a routine job. We'll update you by Monday 12 October.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Approve our contractor to replace the end-of-life hallway CO alarm (FireAngel CO-9X, fitted 2019, 7-year life, sealed battery) at Flat 9, 3 Amhurst Road. Tenant reports chirping since last night. Urgent; expected cost well under your £300 limit. Please reply yes by Monday 12 Oct. Also logged a routine noisy extractor fan job (JOB-102).
> 
> Options: Yes, send your contractor (recommended); I'll arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Not confirmed that there is no CO; the chirp pattern and alarm age point to end of life but that is an inference.
- No contractor assigned and no visit booked; awaiting landlord approval.
- Does not decide any cost recharge.

## Remaining work
- Landlord approval, then assign contractor and book visit (owner: agency)
- Ask the engineer to check for CO at the boiler when attending if sensible
- JOB-102 fan: landlord approval and routine visit within 14 days
- Consider a gas safety record check of the boiler

## Missing or unavailable information
- Whether alarm is chirping with a CO-specific pattern (the model's end-of-life chirp pattern not checked); call dropped before tenant answered about the battery question or symptoms
- No contractor named on file for alarms

## Conflicts between sources
- None between sources. Tenancy 12.8 (tenant batteries) does not fit a sealed unit, so the CRM sealed_battery and fitted date were preferred.

## Answers to the case questions
**1. Is this a CO emergency, battery issue, or end-of-life alarm? How did you decide?**

Most likely end-of-life alarm. A single chirp about once a minute is a fault/end-of-life signal, not a CO alarm sounding. The unit was fitted 2019-04-02 with a 7-year life, so it expired around April 2026, and it has a sealed battery so it cannot be a simple battery change. Not treated as an emergency, but CO was not ruled out, so safety advice was given and replacement is urgent.

**2. Who is responsible for fixing it, citing the tenancy clause?**

The landlord. Clause 12.8 only makes the tenant replace batteries as required; the battery here is sealed, so the whole unit must be replaced, which is the landlord's job. Clause 12.9 means the tenant should test monthly and report faults, which she did. Clause 12.17 (avoidable call-out charge) does not apply as the report was prompt and the alarm is past its life.

**3. What actions did you take and what did you tell the tenant?**

Created urgent ticket JOB-101 and routine fan ticket JOB-102, requested landlord approval (APR-104), set a follow-up for 12 Oct, and texted Priya: don't remove the battery, leave and call 0800 111 999 (or 999) if the alarm sounds continuously or anyone feels unwell, replacement being arranged at no charge, target within 72 hours once approved, update by 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, fitted 2… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"appliance","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent, r… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Approve our contractor to replace the end-of-life hallway CO alarm (Fire… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","party":"Ben Hartley","purpose":"Chase landlord approval for CO alarm replacement; update tena… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
