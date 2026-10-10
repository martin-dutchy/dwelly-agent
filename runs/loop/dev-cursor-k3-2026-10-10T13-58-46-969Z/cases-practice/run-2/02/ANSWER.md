# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reports a single chirp a minute from a hallway CO alarm fitted April 2019 with a 7-year sealed battery, so it is past its life. Treated as likely end-of-life, urgent but not an emergency. Logged urgent job and a routine fan job, gave safety advice, asked landlord to approve replacement.

## Where the case stands
JOB-101 (urgent) at intake awaiting landlord approval; JOB-102 (routine fan) at intake. Tenant told what happens next; follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve our contractor replacing the CO alarm, reply by 12 Oct | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant not to remove the sealed battery, safety/CO advice, 72h target, next update Monday | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Chase landlord and update tenant on 12 Oct | Ben Hartley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't take the battery out: your alarm has a sealed battery and a regular chirp usually means it has reached the end of its life, so it needs replacing. We've logged this as urgent (JOB-101) and are arranging a replacement; our target is within 72 hours, and we'll update you by Monday. Please don't rely on it meanwhile. If the alarm ever sounds continuously, or anyone feels dizzy, has a headache or feels sick, leave the flat, open doors, call 0800 111 999 (gas emergency) and 999 if anyone is unwell. Also logged the noisy bathroom fan as a routine job (JOB-102). If you can, reply to confirm nobody has felt unwell.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hallway CO alarm at Flat 9, 3 Amhurst Road (fitted April 2019, sealed 7-year unit) is chirping, likely end of life. Please confirm we may use our contractor to replace it (expected well under your £300 limit). Please reply by Monday 12 Oct. Separately, a routine job for a noisy bathroom extractor fan is logged (JOB-102). (£300)
> 
> Options: Yes, use our contractor to replace the alarm (recommended); You arrange your own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Tickets and request do not confirm the cause: end-of-life is the likely reading, not proven.
- No contractor assigned or visit booked yet; no approval recorded.
- Did not decide who pays for the extractor fan.

## Remaining work
- Landlord approval, then assign contractor and book visit within 72h target (owner: agency)
- Confirm no symptoms with tenant
- Triage extractor fan JOB-102 (routine, 14 days)

## Missing or unavailable information
- Call dropped before tenant confirmed symptoms or whether there was a continuous alarm
- Alarm display/end-of-life indicator not seen
- No CO-alarm contractor on record

## Conflicts between sources
- None between sources; the call dropped before the tenant's battery question was answered, so she was answered by SMS.

## Answers to the case questions
**1. Is this a CO emergency, battery issue, or end-of-life alarm?**

Most likely end-of-life: single chirp every minute, no continuous alarm, no symptoms reported, unit is sealed (battery not replaceable) and was fitted 2019-04-02 with a 7-year lifespan, so expired April 2026. Not treated as a CO emergency, but safety advice given in case the alarm sounds continuously or anyone feels unwell. Not confirmed, as the call dropped.

**2. Who is responsible, citing clause?**

Landlord. Clause 12.8 makes the tenant replace batteries, but the battery is sealed, so the whole unit must be replaced, which is the landlord's job. Clause 12.9 means tenant should report faults, which she did. Clause 12.17 call-out charge does not apply: this is not avoidable or a tenant-requested out-of-hours call-out.

**3. What actions did you take and what did you tell the tenant?**

Created urgent JOB-101 and routine JOB-102 (fan); asked Ben for approval with a 12 Oct reply date and set a follow-up; texted Priya not to remove the battery, that replacement is being arranged (72h target, update by Monday), and gave 0800 111 999/999 advice if the alarm sounds continuously or anyone is unwell. Asked her to confirm nobody is unwell. Told her not to rely on the alarm meanwhile.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"gas","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, fitted 2019-04-… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Tenant says … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Hallway CO alarm at Flat 9, 3 Amhurst Road (fitted April 2019, sealed 7-… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","party":"Ben Hartley","purpose":"Chase landlord approval for CO alarm replacement; update tena… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
