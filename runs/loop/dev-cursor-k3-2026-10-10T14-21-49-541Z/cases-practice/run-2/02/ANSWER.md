# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reported a once-a-minute chirp from a sealed CO alarm fitted April 2019 with a 7-year life, so it is past end of life. Treated as urgent replacement, not an evacuation emergency, with safety advice sent. Logged urgent alarm job and separate routine fan job, asked landlord to approve.

## Where the case stands
JOB-101 (urgent, CO alarm replacement) at intake; awaiting landlord approval and tenant symptom reply. JOB-102 (routine fan) logged.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve our contractor replacing the CO alarm | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Safety advice, symptom question, do not disable alarm, target timescale | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Review 12 Oct for approval and symptom reply | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Safety first: if the alarm ever sounds continuously, or anyone has a headache, dizziness, nausea or drowsiness, leave the flat with everyone, open windows if safe, and call 0800 111 999 (999 if anyone feels unwell). Please reply to confirm nobody is feeling unwell. A once-a-minute chirp is most likely the alarm reaching the end of its life (it was fitted in 2019 and is sealed, so there's no battery to swap). Please don't remove or disable it. We've logged an urgent job to replace it; our target is within 72 hours, and we'll confirm the visit with you. The 24h notice for access will be given. We've also logged the noisy bathroom fan as a separate routine job. You'll hear from us again by Monday 12 Oct.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Approve replacement of the hallway CO alarm (FireAngel CO-9X, fitted 2019, 7-year life expired) by our contractor; also the noisy bathroom extractor fan (JOB-102, routine) to be inspected.
> 
> Options: Yes, use our contractor to replace the alarm (expected well under your £300 limit) and inspect the fan; Arrange your own contractor
> 
> Update: Tenant reports a chirp every minute since last night, no continuous alarm; symptoms being confirmed by SMS. The sealed unit is past its manufacturer lifespan so the tenant cannot replace a battery; replacement is the landlord's responsibility. Tenant told not to disable it and given gas emergency advice. Please reply by Monday 12 Oct.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned yet; no visit booked
- Not confirmed that nobody is unwell: call dropped before symptoms asked
- Fan cause not diagnosed

## Remaining work
- Assign contractor and book visit with 24h notice once approved (agency/maintenance)
- Chase tenant symptom reply; escalate P1 if any symptoms reported
- Handle JOB-102 fan routine

## Missing or unavailable information
- Whether anyone has symptoms
- Whether alarm is intermittent only (tenant said just a chirp)

## Conflicts between sources
- Tenant asked to remove battery, but the CRM shows a sealed battery; clause 12.8 would not apply

## Answers to the case questions
**1. Is this a CO emergency, battery issue or end-of-life alarm?**

Most likely end-of-life: a single chirp about once a minute, no continuous alarm reported, sealed battery (no replaceable battery), fitted 2019-04-02 with 7-year life so expired about April 2026. Not treated as an emergency, but symptoms were not confirmed as the call dropped, so the safety message asks and says to leave and call 0800 111 999 if continuous or anyone unwell.

**2. Who is responsible, citing the clause?**

The landlord. Clause 12.8 (tenant replaces batteries) does not apply because the battery is sealed and the unit itself has expired. Clause 12.9 means the tenant must report faults, which she did. Clause 12.17 does not apply as the call-out is not avoidable.

**3. What actions did you take and what did you tell the tenant?**

Created JOB-101 (urgent) and JOB-102 (routine fan), requested landlord approval, scheduled follow-up 12 Oct, and texted Priya: safety advice and helpline, do not remove or disable the alarm, replacement target within 72h, next update by 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, sealed b… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent. … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Approve replacement of the hallway CO alarm (FireAngel CO-9X, fitted 201… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant symptom reply and landlord approval; book alarm replacement"} | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
