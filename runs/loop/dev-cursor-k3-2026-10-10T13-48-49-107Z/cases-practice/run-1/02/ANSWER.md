# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reports a once-a-minute chirp on a 2019 sealed-battery CO alarm, past its 7-year life (end of April 2026). Treated as probable end-of-life alarm, urgent not emergency, with CO safety advice given. Logged urgent alarm job and separate routine fan job, texted tenant, asked landlord to approve replacement and put the job on hold with review date.

## Where the case stands
JOB-101 (urgent, CO alarm) on hold awaiting landlord approval, review 2026-10-12. JOB-102 (routine, extractor fan) logged at intake. Tenant has safety advice and timescales.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked Ben Hartley to approve our contractor replacing the CO alarm, reply by 12 Oct | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Texted safety advice (do not remove alarm, leave and call 0800 111 999 if continuous alarm or symptoms), timescales and next contact date | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Hold JOB-101 pending landlord reply, review 2026-10-12 | Ben Hartley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, our call dropped so here's the answer. Please don't remove or cover the CO alarm. Its battery is sealed, and a chirp every minute usually means it has reached the end of its life (it was fitted in 2019), but we can't rule out a real problem. If the alarm sounds continuously, or anyone feels dizzy, sick, has a headache or feels drowsy, leave the flat, open doors and windows on the way out, and call the National Gas Emergency line on 0800 111 999 (999 if anyone is unwell). We've logged an urgent job to replace the alarm and are contacting your landlord; the target is within 72 hours. The noisy bathroom fan is logged as a separate routine job (target within 14 days). You'll hear from us by Monday 12 October. You won't be charged for the alarm.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hallway CO alarm (fitted April 2019, 7-year life, sealed battery) is chirping, so is likely past end of life. This is a landlord responsibility. Please confirm we can send our contractor to replace it and check the boiler for CO if needed. Reply yes or no by Monday 12 October.
> 
> Options: Yes, send your contractor to replace the alarm (recommended); I'll arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned yet: no landlord approval and no contractor named in the records.
- Logging the jobs does not confirm the cause; end-of-life is the likely reading, not proven.
- Nothing here decides who pays beyond the landlord duty to provide a working alarm.

## Remaining work
- Landlord reply, then assign contractor to replace the alarm (agency, owns JOB-101)
- If no reply by 12 Oct, chase on a second channel (SMS/phone)
- Triage JOB-102 fan within 14 days

## Missing or unavailable information
- Whether the alarm has actually been tested or sounded continuously; the call dropped before she answered about removing the battery.
- No contractor named in the records for alarm work.

## Conflicts between sources
- None between sources. The tenant's chirp description fits the CRM's expired-alarm data; the call dropped before her battery question was answered, so the answer was sent by SMS.

## Answers to the case questions
**1. Is this a carbon monoxide emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely end-of-life alarm: a single chirp about every minute (not a continuous alarm), sealed battery so not a replaceable battery, and fitted 2019-04-02 with a 7-year life, so expired around April 2026. No symptoms or continuous alarm reported, so not treated as an active CO emergency, but real CO is not ruled out and the tenant has been given leave-and-call advice (0800 111 999). Urgent severity.

**2. Who is responsible for fixing it, citing the tenancy clause where relevant?**

The landlord. Clause 12.8 (tenant replaces batteries) doesn't apply because the battery is sealed and the whole unit has expired. Clause 12.9 means the tenant must test and report, which she did. Clause 12.17 (avoidable call-out) doesn't apply as the fault is an expired unit. Cost is within the landlord's £300 limit but there is no contractor assigned pending his approval.

**3. What actions did you take, and what did you tell the tenant?**

Created urgent JOB-101 (A1) and routine JOB-102 for the fan (A2); texted the tenant (A3) not to remove or cover the alarm, to leave and call 0800 111 999 (999 if unwell) if it sounds continuously or anyone feels unwell, that replacement is targeted within 72 hours, the fan within 14 days, and she'll hear from us by 12 Oct; requested landlord approval (A4); held JOB-101 to 12 Oct (A5). Her question about removing the battery is answered: no.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","description":"Hallway CO alarm (FireAngel CO-9X, fitted 2019-04-02, sealed … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"appliance","severity":"routine","description":"Bathroom extractor fan noisy. Not urgent. Raised by tenant on… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Hallway CO alarm (fitted April 2019, 7-year life, sealed battery) is chi… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Waiting for Landlord","comment":"Awaiting Ben Hartley's yes/no to send our contractor to replace the CO al… | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |

## Failed or unverified actions
_None._
