# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reported a single chirp about once a minute from a sealed-battery CO alarm fitted April 2019 (7-year life, so past end of life). Treated as an urgent end-of-life replacement, not a CO emergency, with safety advice sent because the call dropped before symptoms were checked. Logged the urgent job and a separate routine fan job, and asked the landlord to approve replacement.

## Where the case stands
JOB-101 at init, waiting on landlord approval (APR-105) and tenant's symptom confirmation; follow-up 2026-10-12. JOB-102 (extractor fan) routine at init.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve alarm replacement by 12 Oct | Ben Hartley, landlord | email | A5 ✅ |
| 2 | REPLY_TO_TENANT | SMS safety advice, don't remove sealed battery, symptom check | Priya Shah, tenant | sms | A4 ✅ |
| 3 | WAIT | Follow up on landlord and tenant replies on 12 Oct | Ben Hartley / Priya Shah | internal | A6 ✅ |

## Messages sent (verbatim)
**A4 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Safety first: if the alarm ever sounds continuously, or anyone feels dizzy, sick, has a headache or feels drowsy, leave the flat straight away, open windows if safe, and call 0800 111 999 (999 if anyone is unwell). Please reply to confirm: is it only a single chirp, and is everyone well? Please don't remove the battery: it's sealed, and the chirp most likely means the alarm has reached the end of its life (fitted 2019), so it needs replacing, not a new battery. We're arranging a replacement for you as urgent (target within 72 hours) and will update you by Monday. The noisy extractor fan is logged as a separate routine job.

**A5 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Replace the end-of-life hallway CO alarm at Flat 9, 3 Amhurst Road, using our contractor (a new alarm should be well under your £300 limit). Please reply yes or no.
> 
> Options: Yes, use our contractor to fit a new CO alarm (recommended); You arrange your own contractor
> 
> Update: The alarm (FireAngel CO-9X, fitted 2019, sealed battery, 7-year life) is chirping once a minute, which points to end of life. It is not a continuous alarm; we've asked the tenant to confirm nobody is unwell and given her safety advice. The sealed unit can't be fixed by the tenant, so replacement is the landlord's responsibility. Separately a noisy bathroom extractor is logged as routine JOB-102. Please reply by Monday 12 Oct.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the cause until the alarm is inspected
- No contractor assigned or visit booked
- Fan job not yet approved or scheduled

## Remaining work
- Landlord to approve; then assign contractor for alarm replacement (owner: ops)
- Tenant to confirm no symptoms; escalate P1 if any
- Progress the extractor fan job JOB-102 (landlord approval)

## Missing or unavailable information
- Whether the tenant or anyone has symptoms (call dropped)
- Landlord approval and contractor for alarm

## Conflicts between sources
- Landlord notes prefer 'Ben'; record name is Benjamin. Used Ben.

## Answers to the case questions
**1. Is this a CO emergency, a battery issue, or an end-of-life alarm?**

Most likely end-of-life. It is a single chirp about once a minute, not a continuous alarm, and the unit has a sealed battery, so it isn't a battery change. It was fitted 2019-04-02 with a 7-year life, so it expired around April 2026. Symptoms were not confirmed because the call dropped, so I sent conditional emergency advice and asked her to confirm everyone is well. If she reports symptoms or a continuous alarm it becomes a P1 emergency.

**2. Who is responsible, citing the clause?**

The landlord. Clause 12.8 only makes the tenant replace batteries, and this battery is sealed and can't be replaced. Clause 12.9 means the tenant tests the alarm and reports faults, which she did promptly. Clause 12.17 (avoidable call-out charge) doesn't apply because the fault is not avoidable by the tenant. A new alarm should be within the landlord's £300 limit but I have asked for approval anyway.

**3. What actions did you take and what did you tell the tenant?**

I logged the call. I opened urgent JOB-101 and routine JOB-102 for the fan. I texted Priya the safety advice, told her not to remove the sealed battery, said replacement is being arranged with an urgent target of within 72 hours, and said she'll hear from us by Monday. I asked landlord Ben Hartley to approve replacement and set a follow-up for 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, fitted 2… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Tenant says … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Reported CO alarm chirping once a mi… | 1 | ✅ verified | CALL-103 found in the log_call log |
| A4 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Replace the end-of-life hallway CO alarm at Flat 9, 3 Amhurst Road, usin… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","party":"Ben Hartley / Priya Shah","purpose":"Check landlord reply on alarm replacement and te… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
