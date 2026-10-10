# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reported a once-a-minute chirp from a sealed CO alarm fitted April 2019 with a 7-year life, so it is most likely end-of-life, not a CO emergency. I logged an urgent replacement job and a separate routine fan job, gave the tenant safety advice, and asked the landlord to approve.

## Where the case stands
JOB-101 (urgent, CO alarm) on hold awaiting landlord approval, review 2026-10-11. JOB-102 (routine fan) at intake. Tenant advised by SMS.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | SMS safety advice (don't remove battery, leave and call 0800 111 999 if continuous alarm or symptoms), explained responsibility, 72h target | Priya Shah, tenant | sms | A3 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve our contractor replacing the expired CO alarm, or name his own | Ben Hartley, landlord | email | A4 ✅ |
| 3 | WAIT | Hold JOB-101 pending landlord reply, review 2026-10-11 | Ben Hartley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't remove the battery or disable the alarm. Your alarm is a sealed unit fitted in 2019 with a 7-year life, so the chirp is most likely it reaching end of life, and the landlord is responsible for replacing it. We can't rule out carbon monoxide though. If it sounds a continuous alarm, or anyone has a headache, dizziness, sickness or drowsiness, leave the flat, call the Gas Emergency line on 0800 111 999 (999 if anyone is unwell) and don't go back in. Otherwise, please keep the flat well ventilated. We've logged an urgent job to replace the alarm and check it, target within 72 hours; I'll confirm the booking once arranged. I've logged the noisy bathroom fan as a separate routine job. Please reply or call if anything changes.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hallway CO alarm at Flat 9, 3 Amhurst Road is chirping and, being a sealed unit fitted April 2019 with a 7-year life, is past its life. Please approve us replacing it with our contractor (expected well under your £300 limit), or tell us if you'd prefer your own contractor. Also a noisy bathroom extractor fan is logged separately as routine.
> 
> Options: Approve our contractor to replace the CO alarm and check it (recommended); You arrange your own contractor; Other instruction

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Not confirmed that CO is absent; end-of-life is the likely cause only.
- No contractor assigned or visit booked yet.
- Does not decide who pays the fan repair.

## Remaining work
- Agency: assign contractor and book visit once landlord approves (target 72h); if no reply by review date chase Ben by phone/SMS.
- Agency: schedule routine fan job JOB-102 (14-day target) and get landlord approval.
- Confirm with tenant that no symptoms and alarm replaced.

## Missing or unavailable information
- Tenant's answer to whether alarm is a chirp-only (confirmed chirp) and any symptoms; call dropped before answer to battery question.
- Model's exact end-of-life chirp pattern not checked.

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. 1. Is this a carbon monoxide emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely end-of-life: single chirp roughly every minute (not a continuous alarm), no reported symptoms, and the unit is sealed-battery, fitted 2019-04-02 with 7-year life, so expired about April 2026. Not treated as a CO emergency, but CO not ruled out, so the tenant was given leave-and-call advice if it turns continuous or anyone feels unwell.

**2. 2. Who is responsible for fixing it, citing the tenancy clause where relevant?**

The landlord. Clause 12.8 only makes the tenant replace batteries where replaceable; this is a sealed unit that has expired so the whole alarm needs replacing by the landlord. Clause 12.9 means the tenant should report faults, which she did. Clause 12.17 (avoidable call-out charge) doesn't apply as this isn't an avoidable call-out.

**3. 3. What actions did you take, and what did you tell the tenant?**

Created JOB-101 (urgent) and JOB-102 (routine fan), SMSed Priya not to remove the battery, gave the 0800 111 999 / 999 safety advice, explained the landlord is responsible and gave a 72h target, requested landlord approval (APR-104), and put JOB-101 on hold with review 2026-10-11.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"gas","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, fitted 2019-04-… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Tenant says … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Hallway CO alarm at Flat 9, 3 Amhurst Road is chirping and, being a seal… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Waiting for Landlord","comment":"Awaiting Ben Hartley's approval for our contractor to replace expired CO … | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |

## Failed or unverified actions
_None._
