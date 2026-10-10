# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Priya Shah reported an intermittent chirp from the hallway CO alarm, which was fitted April 2019 and has passed its 7-year lifespan, so this is most likely an end-of-life or fault warning rather than a CO emergency; no continuous alarm was reported. Logged urgent job JOB-101, sent tenant safety advice and landlord approval request, and put the job on hold for the landlord's reply with a 2026-10-12 review.

## Where the case stands
Job JOB-101 open (urgent, gas/CO category), on hold waiting for landlord Ben Hartley's approval to inspect and replace the hallway CO alarm. Review 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Send safety advice and the urgent-job status to tenant Priya Shah by SMS (do not remove alarm, leave and call 0800 111 999 if alarm goes continuous or symptoms appear, do not use boiler until checked). | Priya Shah, tenant | sms | A3 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord Ben Hartley to approve replacement and inspection of the CO alarm within his £300 limit. | Ben Hartley, landlord | email | A4 ✅ |
| 3 | WAIT | Hold job for landlord reply; chase by phone Monday 2026-10-12 if no reply, then assign contractor within limit. | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, Mare and Co here about your hallway carbon monoxide alarm. Please do not take the alarm or its battery out. A chirp every minute is usually a fault or end-of-life warning, but we are treating it as urgent. If the alarm goes off continuously, or you or anyone in the flat feel dizzy, sick, have a headache or trouble breathing, leave the flat, call the National Gas Emergency line on 0800 111 999 (or 999 in immediate danger). Please open a window and do not use the gas boiler until we have checked it. We are arranging for the alarm to be inspected and replaced by the landlord's contractor; we will confirm the visit time once booked. Reply here with the best number and times to reach you. Thanks, Mare and Co

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, Flat 9, 3 Amhurst Road (P-203). Priya Shah reports the hallway CO alarm (FireAngel CO-9X, fitted April 2019, sealed battery) chirping about once a minute since last night. It is not continuously alarming. The unit is past its 7-year manufacturer lifespan, so the likely cause is end of life, not a battery she can change. We are treating it as urgent. Please approve a like-for-like replacement and inspection. We expect this to fall within your £300 limit, and we will get a quote before any work if it does not. Please reply with approval or your preferred contractor. Thanks, Mare and Co

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Not confirmed as a CO leak: a chirp without a continuous alarm indicates a fault or end-of-life warning, not a detected gas reading.
- No contractor assigned and no visit booked; no quote exists.
- Responsibility for replacement is the landlord's; tenant's battery duty (12.8) does not cover this sealed-battery unit at end of life.

## Remaining work
- Landlord approval for replacement (Ben Hartley, chase Mon 2026-10-12).
- Assign contractor and book visit once approved; obtain gas safety/CO evidence.
- Tenant to confirm best contact number and times; log the extractor fan noise as separate routine job if tenant confirms.

## Missing or unavailable information
- Tenant's best contact number/times (SMS asked).
- Landlord approval and preferred contractor (HeatRight Ltd is the boiler contractor; alarm contractor not named).
- Exact alarm replacement cost.

## Conflicts between sources
- CRM marks the CO alarm as sealed battery, but tenancy clause 12.8 requires the tenant to replace CO alarm batteries. Trusted the CRM for this unit: a sealed unit cannot have its battery replaced, and it is past its lifespan anyway.

## Answers to the case questions
**1. 1. Is this a CO emergency, a battery issue, or an end-of-life alarm?**

Most likely an end-of-life (or fault) warning. The alarm is a FireAngel CO-9X fitted 2019-04-02 with a 7-year manufacturer lifespan, so it expired around April 2026. It has a sealed battery and the chirp is intermittent, with no continuous alarm. It is not a confirmed CO emergency, but it is treated as urgent until inspected, and the tenant has safety advice to leave and call 0800 111 999 if the alarm goes continuous or symptoms appear. A battery swap is not the fix for a sealed unit.

**2. 2. Who is responsible for fixing it?**

The landlord. Replacing an end-of-life alarm is the landlord's equipment and repair responsibility. Tenancy clause 12.8 (tenant replaces batteries as required) does not extend to this sealed-battery unit at end of life. Clause 12.9 (tenant tests monthly and reports faults promptly) applies, and the tenant did report it. Clause 12.17 does not apply, as this is a genuine fault and not an avoidable call-out.

**3. 3. What actions did you take, and what did you tell the tenant?**

Logged urgent job JOB-101 (ledger A1). Logged the call (A2). Sent Priya safety advice by SMS (A3): do not remove the alarm or battery, leave and call 0800 111 999 (or 999) if it goes continuous or symptoms appear, do not use the boiler until checked, and that we are arranging inspection and will confirm the visit once booked. Emailed landlord Ben Hartley requesting approval for replacement within his £300 limit (A4). Put JOB-101 on hold for landlord reply, review 2026-10-12 (A5). The extractor fan noise is non-urgent and not yet logged as its own job.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203 (Flat 9, 3 Amhurst Road, London E8 2AU)","category":"gas","severity":"urgent","description":"Tenant Priya Shah reports ha… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Tenant reports hallway CO alarm chir… | 1 | ✅ verified | CALL-102 found in the log_call log |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Waiting for Landlord","comment":"Landlord approval for replacement/inspection of hallway CO alarm (end-of-… | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |

## Failed or unverified actions
_None._
