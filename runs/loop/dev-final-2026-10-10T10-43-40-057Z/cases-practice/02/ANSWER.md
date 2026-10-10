# Case 02: ANSWER

**Outcome:** action_taken · **Severity:** urgent

Tenant reported a single chirp per minute from a sealed-battery CO alarm fitted April 2019 (7-year life, so expired). Most likely end-of-life, but CO not ruled out as the call dropped. Logged urgent replacement JOB-101 and routine fan job JOB-102, sent the tenant safety advice and timescales, and informed the landlord.

## Answers
**1. Is this a CO emergency, battery issue or end-of-life alarm? How decided?**

Probably end-of-life, treated as urgent rather than emergency. It is a single chirp about once a minute (not a continuous alarm), no symptoms were reported, and the unit is sealed-battery and about 7.5 years old against a 7-year lifespan. Genuine CO is not fully ruled out because the call dropped before symptoms were asked, so the tenant was sent emergency instructions (leave, call 0800 111 999 / 999) if the alarm sounds continuously or anyone feels unwell. A dead alarm also means no CO protection, hence urgent.

**2. Who is responsible, citing the tenancy clause?**

The landlord (Ben Hartley), via the agent. Clause 12.8 makes the tenant replace batteries, but this battery is sealed and not user-replaceable, so the whole unit must be replaced as an expired landlord-supplied safety device. Clause 12.9 (test monthly, report faults promptly) was met because she reported it. Clause 12.17 (avoidable or out-of-hours call-out charges) does not apply: this is a genuine fault reported in working hours/not an emergency call-out.

**3. What actions did you take and what did you tell the tenant?**

Created JOB-101 (urgent, alarm replacement) and JOB-102 (routine, noisy extractor fan). Texted Priya to not remove the battery or disable the alarm, gave symptom and continuous-alarm safety advice with 0800 111 999 / 999, a 72h target for the alarm and 14 days for the fan, and asked her to confirm no symptoms. Emailed Ben about the replacement, within his £300 limit with a call first if over. No contractor was assigned because none was specified in the records.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"gas","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, sealed battery,… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent. … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","body":"Hi Priya, sorry our call dropped.… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, the… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
