# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Single chirp every minute from a sealed CO alarm fitted 2019 with 7-year life, so most likely end-of-life, not an active CO emergency or a battery issue. Logged urgent JOB-101 and routine fan JOB-102, gave the tenant safety advice, and asked the landlord to approve replacement.

## Where the case stands
JOB-101 (urgent CO alarm) at intake; awaiting landlord approval (APR-104), follow-up 2026-10-11. JOB-102 (routine fan) at intake.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve alarm replacement and boiler/CO check | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Safety advice, do not remove battery, urgent target 72h, responsibility explained | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Chase landlord on 2026-10-11 on a second channel | Ben Hartley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Your CO alarm is a sealed unit fitted in 2019 and is past its 7-year life, so the chirp is most likely it reaching end of life. Please don't take the battery out or cover it (it's sealed anyway), and don't assume it's harmless. Open a window for fresh air. If anyone has a headache, dizziness, nausea or feels drowsy, or the alarm goes into a continuous loud alarm, leave the flat, call 999, and call the Gas Emergency line on 0800 111 999. We've logged this as urgent (JOB-101) and are arranging a replacement alarm and a check, target within 72 hours; we'll update you. Replacing a sealed alarm is the landlord's job, not yours. We've also logged the noisy bathroom fan separately (JOB-102) as routine.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Flat 9, 3 Amhurst Road: hallway CO alarm (fitted 2019, sealed, 7-year life expired) is chirping. Please approve replacing it with a new alarm and a boiler/CO safety check via our contractor (or HeatRight Ltd for the boiler). Also a routine noisy extractor fan (JOB-102). (£300)
> 
> Options: Approve our contractor to replace alarm and check boiler (recommended); Approve with HeatRight Ltd for boiler check; You arrange your own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned yet: no landlord decision recorded
- Tenant not verified for CO readings; real CO not ruled out
- Fan job not yet approved or scheduled

## Remaining work
- Landlord approval, then assign contractor to replace alarm and check boiler/flue (ops)
- Escalate P2 if landlord silent after chase
- Triage fan job JOB-102 as routine (14 days)

## Missing or unavailable information
- Whether Priya has symptoms or removed the battery (call dropped)
- Whether alarm is chirp pattern for end-of-life vs fault (assumed from age)

## Conflicts between sources
- None between sources; call dropped before tenant's answer on removing the battery.

## Answers to the case questions
**1. Is this a CO emergency, battery or end-of-life alarm? How decided?**

Most likely end-of-life: the alarm is a sealed unit fitted 2019-04-02 with a 7-year life (expired about April 2026), and the signal is an intermittent chirp rather than a continuous alarm. Not a user-replaceable battery. Not treated as a confirmed CO emergency, but a real leak is not ruled out, so safety advice was given and it is urgent.

**2. Who is responsible, citing clause?**

Landlord. Clause 12.8 only makes the tenant replace batteries; this is a sealed alarm past its life so it needs replacing as equipment. Clause 12.9 requires the tenant to report faults, which she did. Clause 12.17 (avoidable call-out charge) does not apply as the call-out is not avoidable.

**3. What actions did you take and what did you tell the tenant?**

Created JOB-101 (urgent) and JOB-102 (routine fan), texted Priya (no battery removal, ventilate, symptoms/continuous alarm means leave and call 999 and 0800 111 999, 72h target, landlord's responsibility), requested landlord approval within £300 limit, scheduled follow-up 2026-10-11.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"gas","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, sealed battery,… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"appliance","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Tenant says n… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Flat 9, 3 Amhurst Road: hallway CO alarm (fitted 2019, sealed, 7-year li… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-11","party":"Ben Hartley","purpose":"Chase landlord approval for CO alarm replacement/check; urgen… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
