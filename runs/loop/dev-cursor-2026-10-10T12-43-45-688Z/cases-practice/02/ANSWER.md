# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Priya reported a once-a-minute chirp on a 2019 sealed-battery CO alarm past its 7-year life; call dropped. Treated as probable end-of-life alarm (urgent, not a confirmed CO emergency), logged JOB-101 and separate routine fan job JOB-102, texted safety advice, and asked the landlord to approve replacement.

## Where the case stands
JOB-101 (urgent, CO alarm replacement) at intake, waiting on landlord Ben Hartley's approval (APR-104). JOB-102 (routine, extractor fan) at intake. Tenant informed. Follow-up 2026-10-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked Ben to approve contractor replacing the end-of-life CO alarm, up to £300 | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Texted Priya: don't remove battery, safety advice and helplines, 72h target, next update 12 Oct | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Chase landlord approval on 2026-10-12 | Ben Hartley, landlord | internal | A5 ✅ |
| 4 | SPLIT_NEW_REQUEST | Logged the noisy extractor fan as separate routine job | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't take the battery out: it's a sealed unit fitted in 2019 and a chirp like this usually means it has reached the end of its life, so it needs replacing, not a new battery. We've logged an urgent job (JOB-101) and are asking your landlord to approve a replacement; our target is within 72 hours. If the alarm ever sounds continuously, or you or anyone feels headachy, dizzy or sick, leave the flat, call the Gas Emergency line on 0800 111 999 (or 999 if in immediate danger) and tell us. Please don't use the boiler if you smell gas. We've also logged the noisy bathroom fan separately (JOB-102, routine). We'll update you by Monday 12 October.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tenant reports hallway CO alarm chirping since last night. It is a sealed-battery FireAngel CO-9X fitted 2019-04-02 with a 7-year life, so it is past end of life; the tenant can't replace the battery. We'd like to send our contractor to replace the alarm (and check if there is any doubt about CO). Please confirm we may instruct, up to your £300 limit. (£300)
> 
> Options: Yes, send your contractor to replace the alarm (recommended); I'll arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned yet; no landlord approval recorded.
- Not confirmed that there is no CO present; the end-of-life diagnosis is an inference from the alarm's age and sealed battery, not tested.
- Fan job logged only; no cost or cause decided.

## Remaining work
- Landlord decision on JOB-101, then assign contractor (agency, within £300 limit) and book visit
- Triage JOB-102 routine, within 14 days
- If tenant reports symptoms or continuous alarm: treat as emergency, P1 escalation

## Missing or unavailable information
- Whether the alarm displays an end-of-life/fault code (call dropped)
- Whether tenant has removed the battery (answer to her question was given by text, not on call)
- Any CO symptoms

## Conflicts between sources
- Tenant's term 'battery' vs record showing a sealed battery unit: trusted the CRM record.

## Answers to the case questions
**1. Is this a carbon monoxide emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely an end-of-life alarm: single chirp about once a minute since last night (not continuous), sealed battery (so not a replaceable battery), fitted 2019-04-02 with a 7-year life so expired April 2026. Not treated as a confirmed CO emergency (no continuous alarm, no symptoms reported, boiler serviced 2025-11), but handled as urgent and the tenant was given leave-and-call-0800 111 999 advice if it changes. Cannot be fully confirmed remotely.

**2. Who is responsible for fixing it, citing the tenancy clause where relevant?**

The landlord, via the agency. Clause 12.8 (tenant replaces batteries) doesn't fit because the battery is sealed and the unit has expired, so the whole alarm must be replaced. Clause 12.9 means the tenant reported promptly as required. Clause 12.17 (tenant pays avoidable call-outs) does not apply: the fault is not avoidable by the tenant and it was not an out-of-hours emergency call-out.

**3. What actions did you take, and what did you tell the tenant?**

Created urgent JOB-101 (CO alarm) and routine JOB-102 (extractor fan); requested landlord approval up to £300 (APR-104); set follow-up for 12 Oct. Texted the tenant: do not remove the battery, it is likely end of life, urgent job logged with a 72h target, safety advice and 0800 111 999/999 if continuous alarm or symptoms, fan logged separately, next update by 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"gas","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, fitted 2019-04-… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent. … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Tenant reports hallway CO alarm chirping since last night. It is a seale… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"due_on":"2026-10-12","purpose":"Chase Ben Hartley for approval to replace CO alarm (JOB-101); update tenant","ticket_ref":"JOB-101","party… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
- A1: API reported a timeout but read-back showed JOB-101 in place at stage init; not retried to avoid a duplicate.
