# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reported a once-a-minute chirp from a sealed-battery CO alarm fitted April 2019 with a 7-year life, so it is past end of life. Treated as urgent, not a confirmed CO emergency. Logged JOB-101 and JOB-102, sent the tenant safety advice, and asked the landlord to approve replacement.

## Where the case stands
JOB-101 (urgent, CO alarm replacement) at intake, awaiting landlord approval (APR-104); no contractor assigned. JOB-102 (extractor fan, routine) logged at intake.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve our contractor replacing the alarm | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Safety advice, do not remove the alarm, urgent target 72h, fan logged separately | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Review landlord reply 2026-10-12, chase on second channel if none | Ben Hartley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't remove or cover the CO alarm. Its battery is sealed, and at about 7 years old it is likely at the end of its life, so the chirp is probably that, not a leak. We can't be certain though. If it sounds a continuous alarm, or anyone has a headache, dizziness, nausea or feels unwell: open windows, leave the flat, call the Gas Emergency line 0800 111 999 (999 if anyone is very unwell) and don't use switches or flames. We've logged a job (JOB-101) to replace the alarm as urgent; our target is within 72 hours. We'll update you by Monday. The noisy bathroom fan is logged separately (JOB-102) as routine.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hi Ben, the hallway CO alarm at Flat 9, 3 Amhurst Road (fitted April 2019, sealed 7-year unit) is chirping, so it looks to be past its life and needs replacing. This is the landlord's responsibility as the battery is sealed. Please confirm we may instruct our contractor to replace it (expected well under your £300 limit), or tell us if you'd rather use your own. The tenant has been given safety advice.
> 
> Options: Yes, instruct your contractor to replace the alarm (recommended); I'll arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Logging the job does not confirm the cause: no CO reading has been taken
- No contractor assigned or visit booked yet
- Nothing here decides who pays beyond the landlord's duty for a sealed alarm

## Remaining work
- Landlord approval, then assign contractor and book visit (agency)
- Confirm with tenant she has no symptoms and the alarm is not continuous
- Fan job JOB-102 to be progressed as routine (14 days)

## Missing or unavailable information
- Call dropped before tenant answered whether the alarm is single chirp pattern only/symptoms; no contractor on file for alarms

## Conflicts between sources
- None between sources; the call dropped before the tenant answered about removing the battery, so I advised not to tamper.

## Answers to the case questions
**1. Is this a carbon monoxide emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely an end-of-life alarm. The unit is sealed (no replaceable battery) and fitted 2019-04-02 with a 7-year life, so it expired about April 2026. A single chirp about once a minute with no continuous alarm and no reported symptoms fits that signal rather than CO detection. I can't rule out CO because the call dropped, so I gave leave-and-call advice if it turns continuous or anyone feels unwell. I treated it as urgent.

**2. Who is responsible for fixing it, citing the tenancy clause where relevant?**

The landlord. Clause 12.8 makes the tenant replace batteries, but this battery is sealed and cannot be replaced, so the unit itself must be replaced and the clause doesn't apply. Clause 12.9 required the tenant to report the fault promptly, which she did. Clause 12.17 doesn't apply because this isn't an avoidable or out-of-hours call-out by her.

**3. What actions did you take, and what did you tell the tenant?**

Created urgent JOB-101 and routine JOB-102 (fan). Told the tenant by SMS not to remove or cover the alarm, to leave and call 0800 111 999 (or 999) if it sounds continuously or anyone feels unwell, that replacement is logged with a 72h target, and that she will hear from us by Monday. Asked Ben Hartley to approve our contractor (within his £300 limit) and set a follow-up for 2026-10-12. No contractor assigned yet because no landlord decision is recorded.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","description":"Hallway CO alarm (FireAngel CO-9X, sealed battery, fitted 201… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","description":"Bathroom extractor fan noisy. Tenant says not urgent.","tena… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Hi Ben, the hallway CO alarm at Flat 9, 3 Amhurst Road (fitted April 201… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"due_on":"2026-10-12","purpose":"Check landlord reply on CO alarm replacement; chase by SMS/phone if none; update tenant","ticket_ref":"JOB… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
