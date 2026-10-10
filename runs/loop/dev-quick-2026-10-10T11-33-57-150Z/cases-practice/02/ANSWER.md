# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Priya Shah reported the hallway CO alarm chirping about once a minute since last night, with no continuous alarm or symptoms reported. I classed it as urgent, not a live CO emergency: it's an end-of-life or fault signal on a sealed-battery unit fitted in 2019, past its 7-year lifespan. I logged JOB-101, told the tenant by SMS not to remove the battery and gave CO emergency advice, and asked the landlord to approve a replacement within his £300 limit; the job is on hold until 2026-10-12.

## Where the case stands
JOB-101 (CO alarm) urgent, on hold waiting for landlord Ben Hartley's approval to replace the alarm (APR-105, review 2026-10-12). JOB-102 (extractor fan) routine, at intake.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tenant told not to remove the CO alarm battery, given CO emergency advice and the replacement is being arranged | Priya Shah, tenant | sms | A3 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Landlord told of the end-of-life CO alarm and asked to approve replacement within £300 inc VAT | Ben Hartley, landlord | email | A4 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Landlord approval request recorded for replacement CO alarm | Ben Hartley, landlord | email | A5 ✅ |
| 4 | WAIT | Job held pending landlord decision, review 2026-10-12 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, Mare and Co Lettings here about your call. Please do NOT take the carbon monoxide alarm out or remove its battery, as it is sealed and the alarm would then give no protection. The regular chirp usually means the unit is at the end of its life or has a fault. We have logged it (JOB-101) and are arranging for the alarm to be replaced by the landlord. We will confirm the timing once it is agreed. If the alarm sounds continuously, or you or anyone in the flat feels dizzy, sick, headachy or unwell, get everyone out into fresh air and call the National Gas Emergency line on 0800 111 999 (or 999 in an emergency). Your bathroom extractor fan noise is logged separately as JOB-102.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the hallway carbon monoxide alarm at Flat 9, 3 Amhurst Road (FireAngel CO-9X, fitted April 2019, sealed battery, past its 7-year lifespan) has been chirping about once a minute since last night. No continuous alarm and no symptoms reported. The tenant has been told not to remove it. Under the Smoke and Carbon Monoxide Alarm Regulations, working alarms are the landlord's responsibility, so we need a replacement unit fitted. We expect the cost to be within your £300 limit. Please reply to confirm you approve us arranging a replacement, and tell us any preferred contractor. We will also check the cost before anything is booked.

**A5 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Approve arranging a replacement CO alarm for the hallway at Flat 9, 3 Amhurst Road (end-of-life FireAngel CO-9X, chirping). Expected cost within the £300 limit. (£300)
> 
> Options: Approve replacement CO alarm, arranged by us, within £300 inc VAT (recommended); Arrange your own contractor for the replacement (give name and date); Other instruction

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Chirping is treated as an end-of-life or fault signal, not a confirmed CO leak; no engineer has inspected the alarm or the boiler.
- Replacement cost is not yet quoted; approval for it has not been given.
- Tenant has not been charged: clause 12.17 does not apply to a non-avoidable fault.
- Booking a contractor is not done; no contractor was assigned.

## Remaining work
- Landlord to approve (or arrange own contractor) for the CO alarm replacement; review 2026-10-12 (owner: maintenance team).
- Once approved, book replacement and confirm with the tenant.
- Handle JOB-102 extractor fan as a routine job, with a landlord instruction if needed.
- Tenant callback not yet made: the call dropped and the SMS carried the advice.

## Missing or unavailable information
- Landlord decision on replacement and any preferred contractor for alarms.
- Replacement cost quote.
- Tenant's preferred access times.

## Conflicts between sources
- CRM says the alarm has a sealed battery, yet tenancy clause 12.8 puts battery replacement on the tenant. Trusted the CRM for this unit: a sealed unit cannot be battery-changed, so the replacement is the landlord's job.

## Answers to the case questions
**1. 1. Is this a carbon monoxide emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely an end-of-life or fault signal, not a battery issue and not an active CO emergency. Evidence: a single intermittent chirp about once a minute, not a continuous alarm; no CO alarm activation or symptoms reported; the unit is a sealed-battery FireAngel CO-9X fitted 2019-04-02, past its 7-year manufacturer lifespan. Because it's a CO alarm fault, I treated it as urgent and gave emergency advice in case symptoms or a continuous alarm develop.

**2. 2. Who is responsible for fixing it, citing the tenancy clause where relevant?**

The landlord. The alarm is sealed-battery and past its lifespan, so the tenant cannot replace it. Clause 12.8 (tenant replaces batteries) does not cover a sealed unit at end of life. Clause 12.9 (monthly testing and reporting faults) applies to the tenant's duty to report, which she has done. Clause 12.17 (avoidable or non-emergency out-of-hours call-outs) does not apply, as this is not avoidable and was not an out-of-hours call-out.

**3. 3. What actions did you take, and what did you tell the tenant?**

Logged JOB-101 (urgent) and JOB-102 (routine, extractor fan). Sent the tenant an SMS (A3) telling her not to remove the battery, that the alarm is being replaced by the landlord, and the 0800 111 999 / 999 advice. Emailed the landlord (A4) and requested approval (A5) for a replacement within £300. Put JOB-101 on hold until 2026-10-12.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"gas","severity":"urgent","description":"Tenant Priya Shah reports the hallway carbon monoxide alarm (FireAng… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"appliance","severity":"routine","description":"Tenant Priya Shah reports the bathroom extractor fan is noisy… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Approve arranging a replacement CO alarm for the hallway at Flat 9, 3 Amhurst Road (end-of-life… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A6 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Waiting for Landlord","comment":"Approval to replace the end-of-life hallway CO alarm (within £300 inc VAT… | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |

## Failed or unverified actions
_None._
