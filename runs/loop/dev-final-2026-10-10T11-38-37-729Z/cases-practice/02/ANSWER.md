# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** escalated · **Severity:** urgent

Tenant reported a chirping CO alarm; it is sealed-battery and past its 7-year life (fitted April 2019), so most likely end-of-life, but real CO can't be ruled out and the call dropped. Logged urgent job and routine extractor job, sent safety advice by SMS, asked landlord to approve replacement, and escalated P2.

## Where the case stands
JOB-101 (urgent, stage init) awaiting landlord approval APR-105; JOB-102 routine at init. Tenant given safety advice by SMS. Escalated ESC-106 to maintenance.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | SMS safety advice: don't remove sealed battery, ventilate, leave and call 0800 111 999 if symptoms or continuous alarm; urgent job logged | Priya Shah, tenant | sms | A4 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask Ben whether to instruct our contractor to replace the end-of-life CO alarm | Ben Hartley, landlord | email | A6 ✅ |
| 3 | ESCALATE_TO_HUMAN | P2 handover: phone tenant to confirm no symptoms, chase landlord, record call | internal maintenance | internal | A7 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't remove the battery from the CO alarm; it's sealed and should stay working. A chirp every minute usually means the alarm has reached the end of its life, but we can't be sure it isn't a real warning. If you or anyone feels headachy, dizzy, sick or drowsy, or the alarm sounds continuously, open windows, leave the flat and call the Gas Emergency line on 0800 111 999 (999 if anyone is unwell). Otherwise keep windows open for now. We've logged an urgent job to replace the alarm and aim to have it dealt with within 72 hours. We've also logged the noisy extractor fan as a routine job. Tenancy-wise, this is not a call-out charge to you.

**A6 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hallway CO alarm at Flat 9, 3 Amhurst Road (FireAngel CO-9X, sealed battery, fitted April 2019, 7-year life) is chirping every minute, most likely end of life. Replacing it is the landlord's responsibility as the battery is sealed. May we instruct our contractor to replace it and check for CO (expected well within your £300 limit)? Separately, the tenant reports a noisy bathroom extractor fan (JOB-102, routine).
> 
> Options: Yes, send your contractor (recommended); I'll arrange my own contractor; Other

## Escalation
- **P2 → maintenance** (verified): CO alarm chirping, possible real CO not ruled out; call dropped; logging tool failed; no contractor assigned pending landlord reply
  - Known: Priya Shah (T-1003), Flat 9, 3 Amhurst Rd. Hallway FireAngel CO-9X sealed, fitted 2019-04-02, 7yr life (expired ~Apr 2026), chirps ~1/min since last night. Gas boiler serviced 2025-11. Not vulnerable. Call dropped at 00:29 before she got advice. Sent SMS MSG-103 with safety advice and gas line. JOB-101 (urgent, create timed out but read back OK), JOB-102 extractor routine. Landlord approval requested APR-105 (limit £300). log_call did not verify twice.
  - Missing: Whether tenant has symptoms/has read SMS; landlord decision; call log not recorded.
  - Options: Phone tenant to confirm safe and no symptoms, assign contractor today if landlord agrees; Send gas engineer to test CO if any doubt
  - Recommendation: Phone Priya today to confirm no symptoms, then replace alarm within 72h; arrange CO check by engineer if any doubt. Manually record the call.

## What this does not establish
- No contractor assigned and no replacement date promised; awaiting landlord approval
- The cause (end-of-life vs real CO) is not confirmed; the SMS does not rule out CO
- Creating tickets does not decide who pays beyond the clause analysis

## Remaining work
- Landlord decision on APR-105 then assign contractor (human/ops)
- Confirm tenant has no symptoms by phone (maintenance)
- Triage extractor fan JOB-102 within 14 days
- Record the call manually (log_call unverified)

## Missing or unavailable information
- Whether tenant has any CO symptoms
- Whether the alarm is flashing an end-of-life code
- Landlord reply

## Conflicts between sources
- create_ticket A1 returned an error but read-back showed JOB-101 exists; trusted read-back
- log_call A5 returned an id but read-back found no record; treated as not applied

## Answers to the case questions
**1. Is this a CO emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely end-of-life: a single chirp about once a minute, no continuous alarm, no reported symptoms, and the sealed-battery unit fitted 2019-04-02 passed its 7-year life in April 2026. Not confirmed, so treated as urgent with safety advice and gas line given; escalate to emergency if symptoms or continuous alarm.

**2. Who is responsible for fixing it, citing the tenancy clause?**

Landlord. Clause 12.8 makes the tenant replace batteries, but this battery is sealed and not replaceable, so the unit itself must be replaced by the landlord. Clause 12.9 (test monthly, report faults) was met as she reported promptly. Clause 12.17 doesn't apply: it's not an avoidable or out-of-hours call-out.

**3. What actions did you take, and what did you tell the tenant?**

Created urgent JOB-101 and routine JOB-102 (extractor), SMS to tenant (don't remove battery, ventilate, leave and call 0800 111 999 if symptoms, 999 if unwell, target within 72h, no charge to her), landlord approval requested (APR-105), escalated ESC-106. The call log failed to verify twice.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"gas","severity":"urgent","description":"Hallway CO alarm (FireAngel CO-9X, sealed battery, fitted 2019-04-02… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","description":"Bathroom extractor fan noisy. Tenant says not urgent.","tena… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Reported CO alarm chirping once a mi… | 1 | ❌ failed | No log_call record on read-back |
| A4 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","body":"Hi Priya, sorry our call dropped.… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","ticket_ref":"JOB-101","summary":"Reported CO a… | 1 | ❌ failed | CALL-104 was returned but is not in the log_call log |
| A6 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Hallway CO alarm at Flat 9, 3 Amhurst Road (FireAngel CO-9X, sealed batt… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A7 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"CO alarm chirping, possible real CO not ruled out; call dropped; logging tool failed; no con… | 1 | ✅ verified | ESC-106 found in the escalate_to_human log |

## Failed or unverified actions
- A1: create_ticket reported error but read-back showed JOB-101 in place; not retried; not claimed as verified ledger success
- A3: log_call not applied; retried once
- A5: Retry also not applied; included in escalation ESC-106 for manual recording
