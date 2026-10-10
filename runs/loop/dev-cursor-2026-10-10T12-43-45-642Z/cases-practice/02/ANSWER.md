# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Priya reported a once-a-minute chirp from a sealed CO alarm fitted April 2019, past its 7-year life. Treated as urgent end-of-life, not a CO emergency. Logged JOB-101 and JOB-102, sent safety advice to the tenant and asked the landlord to approve replacement.

## Where the case stands
JOB-101 (urgent CO alarm replacement) at intake, awaiting landlord decision (APR-104), review 2026-10-12. JOB-102 (extractor fan, routine) logged.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve our contractor replacing the expired sealed CO alarm | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Told Priya not to remove the battery, gave CO safety advice and 72h target, noted fan job | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Review landlord reply on 2026-10-12 | Ben Hartley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't take the battery out or cover the alarm. It's sealed, and from our records it's past its 7-year life, so the chirp most likely means it needs replacing. It isn't your job to fix. We've logged it as urgent and are arranging a replacement with your landlord; our target is within 72 hours. Safety: if the alarm sounds continuously, or anyone has a headache, dizziness, nausea or feels drowsy, leave the flat, call the Gas Emergency line on 0800 111 999 (or 999 if in immediate danger) and don't use switches or flames. Opening windows helps meanwhile. We've also logged the noisy bathroom fan as a routine job. You'll hear from us by Monday 12 October.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Replace the hallway CO alarm (FireAngel CO-9X, fitted 2019, sealed, past 7-year life, chirping). Sealed unit so tenant can't change the battery; it's the landlord's responsibility. Please confirm we may instruct our contractor (expected well under your £300 limit).
> 
> Options: Yes, use our contractor to replace the alarm; I'll arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Not confirmed that there is no CO leak; the chirp pattern and age point to end-of-life but no reading was taken.
- No contractor assigned or visit booked; landlord approval pending.
- Does not decide who pays beyond landlord responsibility for a sealed expired unit.

## Remaining work
- Landlord approval, then assign contractor and book visit (target within 72h)
- Confirm with tenant the alarm is replaced
- Triage fan job JOB-102 (routine, 14 days)

## Missing or unavailable information
- Call dropped: tenant's answer on symptoms and whether she already removed anything not confirmed; no contractor named in records

## Conflicts between sources
- None material; tenant said chirping since last night, no other source contradicts it.

## Answers to the case questions
**1. Is this a carbon monoxide emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely end-of-life, not an emergency. Single chirp about every minute (not a continuous alarm), no symptoms mentioned, boiler serviced 2025-11, and the sealed-battery unit was fitted 2019-04-02 with a 7-year life, so it expired around April 2026. Treated as urgent because the home may have no working CO protection; tenant given emergency instructions should it alarm or symptoms appear.

**2. Who is responsible for fixing it, citing the tenancy clause where relevant?**

The landlord. Clause 12.8 makes the tenant replace batteries, but this battery is sealed and cannot be replaced, so the whole unit needs replacing, which is the landlord's job. Clause 12.9 (test monthly and report faults) was met as she reported promptly. Clause 12.17 does not apply: it was a genuine fault, not an avoidable or out-of-hours call-out.

**3. What actions did you take, and what did you tell the tenant?**

Created urgent JOB-101 and routine JOB-102 (fan), asked Ben Hartley for approval (APR-104), set follow-up FUP-105 for 12 Oct. Told the tenant by SMS not to remove the battery, that it is likely end-of-life and not her responsibility, target 72h, CO symptoms/continuous alarm means leave and call 0800 111 999 or 999, and when she will next hear from us.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, sealed b… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Tenant says … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Replace the hallway CO alarm (FireAngel CO-9X, fitted 2019, sealed, past… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check landlord reply on CO alarm replacement; chase by SMS/phone if none; update te… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
