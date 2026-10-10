# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reported an intermittent once-a-minute chirp on a sealed-battery CO alarm fitted April 2019 with 7-year life, so it is most likely end of life, not a CO emergency. Logged urgent replacement job and routine fan job, gave safety advice, told tenant not to remove battery, and asked landlord to approve replacement.

## Where the case stands
JOB-101 (urgent) at intake awaiting landlord decision; tenant asked to confirm no symptoms; JOB-102 (routine fan) logged. Follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve our contractor replacing the expired CO alarm (within £300 limit), reply by 12 Oct | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Safety advice, don't remove battery, urgent replacement target 72h, asked about symptoms | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Review 12 Oct for tenant reply and landlord approval | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't remove the battery: your alarm is a sealed unit and a regular chirp usually means it has reached the end of its life, so it needs replacing. We've logged this as urgent and are arranging a replacement; our target is within 72 hours. Safety first: if the alarm ever sounds continuously, or anyone has a headache, dizziness, nausea or drowsiness, leave the flat, open windows if safe, and call the Gas Emergency line on 0800 111 999 (999 if anyone is unwell). Please reply to tell us whether anyone feels unwell and whether it is only a single chirp. We've also logged the noisy bathroom fan as a routine job. We'll update you by Monday 12 October.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Replace the hallway CO alarm (FireAngel CO-9X, fitted 2 April 2019, 7-year life so expired) with a new one, using our contractor. Expected cost is low, within your £300 limit.
> 
> Options: Yes, use our contractor to replace the alarm (recommended); You arrange your own contractor
> 
> Update: Priya Shah reports a single chirp about once a minute since last night, not continuous; we've asked her to confirm nobody is unwell and given safety advice. Sealed battery so the tenant cannot replace it; the tenancy battery clause does not cover this. Also logged a routine noisy extractor fan job (JOB-102). Please reply by Monday 12 October.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned yet; no replacement date booked.
- Not confirmed nobody is unwell; tenant's symptoms unknown as call dropped.
- Alarm cause inferred from age/chirp pattern, not tested by an engineer.

## Remaining work
- Assign contractor and book replacement once landlord approves (agency)
- Process tenant reply on symptoms; escalate P1 if any symptom or continuous alarm
- Progress JOB-102 routine fan
- Contact the tenant again by phone/other channel if no reply

## Missing or unavailable information
- Whether anyone has CO symptoms (call dropped)
- Landlord approval and preferred contractor for electrical/alarm work

## Conflicts between sources
- None between sources; call dropped mid-question about removing the battery, so answered by SMS.

## Answers to the case questions
**1. Is this a CO emergency, battery issue, or end-of-life alarm?**

Most likely end-of-life. Single chirp about once a minute, not continuous; sealed battery (so not a replaceable battery); unit fitted 2 Apr 2019 with 7-year lifespan, so expired about April 2026. Symptoms not yet confirmed because the call dropped, so I sent safety advice and asked; any symptom or continuous alarm would become a P1 emergency.

**2. Who is responsible, citing the clause?**

Landlord. Clause 12.8 makes the tenant replace batteries, but this is a sealed unit with no replaceable battery, so replacing the expired alarm falls to the landlord. Clause 12.9 means the tenant should report faults promptly, which she did. Clause 12.17 doesn't apply as this isn't an avoidable call-out.

**3. What actions did you take and what did you tell the tenant?**

Created urgent JOB-101 and routine JOB-102 (fan). Texted Priya: don't remove battery, replacement being arranged (target 72h), CO safety and 0800 111 999 advice, asked about symptoms, update by 12 Oct. Asked Ben to approve our contractor (within £300 limit) and set follow-up for 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, sealed b… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Tenant says … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Replace the hallway CO alarm (FireAngel CO-9X, fitted 2 April 2019, 7-ye… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant reply on symptoms and landlord approval for CO alarm replacement; assi… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
