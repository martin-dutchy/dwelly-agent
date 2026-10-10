# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reported a once-a-minute chirp from a hallway CO alarm fitted April 2019 with a 7-year life, so it is past end of life. Not treated as a CO emergency on the facts given, but logged as urgent replacement, safety advice and symptom check sent, landlord approval requested, fan logged separately.

## Where the case stands
JOB-101 (urgent) at intake awaiting landlord approval; tenant told not to remove alarm and given safety advice; JOB-102 routine fan job logged.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve our contractor replacing the expired CO alarm | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Safety advice, don't remove battery, symptom check, next update by 12 Oct | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Follow up 12 Oct on approval and tenant symptom reply | Ben Hartley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't remove the battery - it's sealed, and the alarm needs replacing, which is the landlord's job, not yours. A single chirp every minute usually means the alarm has reached the end of its life. Safety first: if the alarm ever sounds continuously, or anyone has a headache, dizziness, nausea or drowsiness, leave the flat with everyone, open doors/windows if safe, call 0800 111 999 (999 if anyone is unwell). Please reply to tell us if anyone feels unwell or if it's anything other than a chirp. We've logged an urgent replacement (target within 72 hours) and a separate routine job for the noisy bathroom fan. We'll update you by Monday 12 Oct.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Replace the hallway CO alarm (end of life) and confirm who should do it. Please reply yes to our contractor, or tell us if you will use your own.
> 
> Options: Yes, use our contractor to replace the alarm (we expect this to be well within your £300 limit); I'll arrange my own contractor
> 
> Update: Tenant Priya Shah reports the hallway FireAngel CO-9X (fitted 2019-04-02, sealed battery, 7-year life) chirping once a minute since last night. It is past its lifespan so is very likely end-of-life; no continuous alarm reported, symptoms being checked with tenant. Tenant told not to remove it. Also logged routine job JOB-102 for a noisy bathroom extractor fan. Please reply by Monday 12 Oct.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned: none named in records and landlord approval pending; replacement date not promised.
- Alarm cause is inferred from age and chirp pattern, not tested.
- Fan job does not establish cause or cost.

## Remaining work
- Landlord approval then assign contractor to replace alarm (agency/owner of JOB-101)
- Tenant to confirm nobody has symptoms; if so or alarm goes continuous, treat as emergency and escalate P1
- Fan job JOB-102 to be progressed via normal routine workflow

## Missing or unavailable information
- Whether anyone has CO symptoms (call dropped before answer)
- Contractor for alarm replacement

## Conflicts between sources
- Tenant asked to remove battery, but record says battery is sealed; trusted the CRM.

## Answers to the case questions
**1. Is this a CO emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely end-of-life alarm: single chirp about once a minute (not continuous), sealed battery (so not a replaceable-battery issue), and fitted 2019-04-02 with a 7-year lifespan, so expired around April 2026. Not an emergency unless symptoms or a continuous alarm; the call dropped before symptoms were asked, so I asked by SMS with evacuation advice.

**2. Who is responsible, citing the tenancy clause?**

The landlord. Clause 12.8 (tenant replaces batteries) does not apply because the battery is sealed and the whole unit has expired. Clause 12.9 means the tenant should test monthly and report faults, which she did promptly. Clause 12.17 (avoidable call-out) does not apply as this is a genuine fault.

**3. What actions did you take and what did you tell the tenant?**

Created urgent JOB-101 and routine fan JOB-102, texted Priya (don't remove the battery, CO safety/symptom advice with 0800 111 999, urgent target within 72 hours, update by 12 Oct), asked Ben to approve our contractor, and scheduled a follow-up for 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, fitted 2… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent."… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Replace the hallway CO alarm (end of life) and confirm who should do it.… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"due_on":"2026-10-12","purpose":"Chase landlord approval for CO alarm replacement and check tenant has replied re symptoms; if landlord sil… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
