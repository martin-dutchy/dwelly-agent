# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reports an intermittent chirp from a sealed-battery CO alarm fitted April 2019 (7-year life), so it is past end of life. Not treated as a CO emergency on current facts, but symptoms were not confirmed as the call dropped. Raised an urgent replacement job, sent safety advice, asked the landlord for approval, and logged the extractor fan separately.

## Where the case stands
JOB-101 at intake, awaiting landlord approval (APR-104) and tenant's reply on symptoms. JOB-103 routine fan job logged. Follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Safety advice and symptom questions sent by SMS | Priya Shah, tenant | sms | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve our contractor replacing the CO alarm within £300 | Ben Hartley, landlord | email | A4 ✅ |
| 3 | WAIT | Follow up on 12 Oct for tenant symptom reply and landlord approval | internal | internal | A5 ✅ |
| 4 | SPLIT_NEW_REQUEST | Extractor fan logged as separate routine job | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't remove the battery or switch the alarm off. Your alarm is sealed (the battery can't be changed) and is past its 7-year life, so the chirp most likely means it needs replacing. Safety first: if the alarm ever sounds continuously, or anyone has a headache, dizziness, nausea or drowsiness, leave the flat with everyone, open windows if safe, and call the Gas Emergency line on 0800 111 999 (999 if anyone is unwell). Please reply to tell us: is it only chirping, and is everyone feeling well? We're arranging a replacement alarm as an urgent job (target within 72 hours) and will update you by Monday. We've also noted the noisy extractor fan as a separate routine job.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hallway CO alarm is chirping and is past its 7-year life (fitted April 2019, sealed battery). It needs replacing, which is the landlord's cost as the tenant cannot change a sealed battery. Please confirm we may instruct our contractor to fit a new alarm (within your £300 limit), or tell us if you'd rather arrange it. Reply by Monday 12 Oct please.
> 
> Options: Yes, use our contractor to replace the CO alarm (recommended); I'll arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned yet: landlord approval is pending and no alarm contractor is named in the records.
- Not confirmed that nobody is unwell; this relies on the tenant's reply.
- Does not establish the extractor fan cause or cost.

## Remaining work
- Assign contractor once the landlord approves (maintenance)
- Escalate P1 and make safe immediately if the tenant reports symptoms or a continuous alarm
- Triage extractor fan job JOB-103 (routine, within 14 days)

## Missing or unavailable information
- Whether anyone has symptoms (call dropped)
- Landlord approval
- Alarm contractor on file

## Conflicts between sources
- The tenant asked to remove the battery, but the CRM shows a sealed battery. Trusted the CRM and advised against tampering.

## Answers to the case questions
**1. Is this a CO emergency, battery issue, or end-of-life alarm? How did you decide?**

Most likely an end-of-life alarm. It chirps about once a minute (not continuous), the battery is sealed so it can't be a simple battery swap, and the unit was fitted 2019-04-02 with a 7-year life, so it expired around April 2026. Not an emergency unless the tenant reports symptoms or a continuous alarm. That was not confirmed because the call dropped, so the safety questions were sent by SMS.

**2. Who is responsible, citing the clause?**

The landlord is responsible for replacing the expired sealed unit. Clause 12.8 (tenant replaces batteries) doesn't apply as the battery can't be replaced. Clause 12.9 means the tenant tests and reports faults, which she did. Clause 12.17 (avoidable call-out charge) doesn't apply as the report was prompt and the fault is genuine. The £300 limit should cover the replacement.

**3. What actions did you take and what did you tell the tenant?**

Created urgent JOB-101 and routine JOB-103 (extractor fan). Requested landlord approval (APR-104) and set a follow-up for 12 Oct. Texted the tenant: don't remove the battery or disable the alarm, leave and call 0800 111 999 (999 if unwell) if it goes continuous or anyone has symptoms, please confirm everyone is well, replacement targeted within 72 hours, and she'll hear from us by Monday.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, sealed b… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","body":"Hi Priya, sorry our call dropped.… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `create_ticket` | {"property":"P-203","category":"appliance","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent.",… | 1 | ✅ verified | Ticket JOB-103 read back at stage init |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Hallway CO alarm is chirping and is past its 7-year life (fitted April 2… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant's reply on symptoms and landlord approval; chase if none"} | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
