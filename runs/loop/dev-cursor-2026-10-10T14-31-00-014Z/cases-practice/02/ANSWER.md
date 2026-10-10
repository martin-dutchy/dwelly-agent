# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Single once-a-minute chirp on a sealed CO alarm fitted April 2019 (7-year life) points to end of life, not a CO event. Call dropped before symptoms were asked, so I sent safety questions by SMS. Logged an urgent replacement job and a separate routine extractor fan job, and told the tenant and landlord.

## Where the case stands
JOB-101 at init (urgent, replacement alarm), JOB-102 at init (routine fan). Waiting on tenant's reply on symptoms; no contractor assigned as none is on file. Review 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked tenant whether the alarm is ever continuous and whether anyone has symptoms, with safety advice | Priya Shah, tenant | sms | A3 ✅ |
| 2 | OTHER | Informed landlord that the alarm is end-of-life, replacement is within his limit, and the fan is logged separately | Ben Hartley, landlord | email | A4 ✅ |
| 3 | WAIT | Review on 12 Oct: tenant reply, and source and book an alarm fitter | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't remove the battery or cover the alarm; it's a sealed unit and it's now past its 7-year life, so a once-a-minute chirp most likely means it needs replacing. Please reply to confirm: does it ever sound as a continuous loud alarm, and does anyone feel headache, dizziness, nausea or drowsiness? If it goes continuous or anyone feels unwell, leave the flat with everyone, open doors/windows if safe, and call 0800 111 999 (999 if anyone is very unwell). Otherwise we are arranging a replacement alarm as an urgent job (target within 72 hours) at no cost to you, and I've logged the noisy bathroom fan as a separate routine job. We'll update you by Monday 12 Oct.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, Priya at Flat 9, 3 Amhurst Road reports the hallway CO alarm chirping since last night. It's a sealed-battery FireAngel CO-9X fitted 2 April 2019 with a 7-year life, so it's past end of life and needs replacing (the tenant can't change a sealed battery, so this is yours as landlord). It's a low-cost item, well within your £300 limit, so we'll arrange a replacement as an urgent job. We've asked the tenant to confirm there is no continuous alarm or symptoms; we'll act immediately if there are. The noisy bathroom extractor fan is logged separately as routine (JOB-102). We'll update you once a visit is booked.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Treating this as end-of-life is an inference; CO has not been ruled out until the tenant confirms there are no symptoms and no continuous alarm.
- No contractor assigned or visit booked yet.
- Does not decide the fan's cause or cost.

## Remaining work
- Source and assign a contractor to fit a replacement CO alarm (urgent, 72h target); owner: operations
- Handle the tenant's reply; escalate P1 if symptoms or a continuous alarm are reported
- Fan job JOB-102 to be progressed as routine

## Missing or unavailable information
- Whether anyone has symptoms or the alarm ever sounds continuously (call dropped)
- No contractor on file for alarm fitting

## Conflicts between sources
- None between sources. The tenant asked to remove the battery, but the CRM shows it is sealed.

## Answers to the case questions
**1. Is this a CO emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely end-of-life. The caller described a single chirp about once a minute, not a continuous alarm. The unit is sealed-battery and was fitted 2019-04-02 with a 7-year life, so it expired around April 2026. It is not an emergency on current facts, but symptoms were not confirmed because the call dropped. I asked by SMS and gave evacuation and 0800 111 999 advice if it goes continuous or anyone is unwell.

**2. Who is responsible for fixing it, citing the tenancy clause?**

The landlord. Clause 12.8 only makes the tenant replace batteries, and this battery is sealed and cannot be replaced. The whole unit has expired, so replacement is the landlord's. Clause 12.9 means the tenant should report faults, which she did. Clause 12.17 (avoidable call-out) does not apply, and she must not be charged. The cost is within the landlord's £300 limit.

**3. What actions did you take and what did you tell the tenant?**

I created urgent job JOB-101 and routine job JOB-102 for the fan. I texted Priya not to remove the battery, asked about continuous alarm and symptoms, and gave safety steps and the gas emergency number. I told her replacement is at no cost, with a 72-hour target, and that we'll update her by 12 Oct. I emailed Ben (landlord) and set a follow-up for 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, sealed b… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent."… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","party":"Priya Shah","purpose":"Check tenant replied on symptoms/continuous alarm; confirm rep… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
