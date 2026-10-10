# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reported an intermittent chirp from a sealed-battery CO alarm fitted April 2019 with a 7-year life, so it is past end of life. Treated as urgent, not an emergency. Logged JOB-101 and a separate routine extractor job JOB-102, sent the tenant safety advice, and asked the landlord for approval.

## Where the case stands
JOB-101 (urgent, CO alarm replacement) at intake, waiting on landlord Ben Hartley's approval (APR-104), follow-up 12 Oct. JOB-102 (routine, extractor fan) logged at intake. Tenant informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve replacing the end-of-life CO alarm with our contractor | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Tell Priya not to remove the battery, the alarm is likely end of life, landlord to fix, safety advice and next update date | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Chase landlord and update tenant on 12 Oct | Ben Hartley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, our call dropped, so here is the answer. Please don't take the battery out or cover the alarm. It is a sealed unit fitted in 2019 and a regular chirp usually means it has reached the end of its life, so it needs replacing, not a new battery. This is the landlord's side to sort, not yours, and we've logged it as urgent. We'll aim to get it replaced within 72 hours. If the alarm ever sounds continuously, or you feel dizzy, sick, have headaches or smell gas: leave the flat, call the Gas Emergency line on 0800 111 999 (or 999 if anyone is unwell) and let us know. We've also logged the noisy bathroom fan as a routine job. We'll update you by Monday 12 October.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Replace the end-of-life hallway CO alarm (fitted 2019, 7-year life, sealed battery, chirping since last night) with a new alarm. Please confirm we may instruct our contractor; we expect this to be within your £300 limit. We'll also log the noisy bathroom extractor fan as a routine job.
> 
> Options: Yes, send your contractor (recommended); I'll arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Not confirmed that there is no CO leak: assessed as likely end-of-life from the chirp pattern and age, not measured.
- No contractor assigned and no visit booked; nothing has been approved yet.
- Extractor fan job is only logged; cause and cost unknown.

## Remaining work
- Landlord approval, then assign a contractor to replace the alarm (ops, by 13 Oct target)
- Triage the extractor fan job JOB-102 (routine, 14 days)
- Escalate P2 if landlord silent after 12 Oct chase

## Missing or unavailable information
- Landlord decision
- Whether the tenant already removed the battery (call dropped before she got an answer)
- No contractor named for alarm work in the records

## Conflicts between sources
- Call dropped before the tenant's question about removing the battery was answered; answered by SMS instead.

## Answers to the case questions
**1. Is this a carbon monoxide emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely an end-of-life alarm, not a CO emergency. It is a single chirp about once a minute, not a continuous alarm, there are no reported symptoms, the battery is sealed (so not a battery swap), and the unit was fitted 2019-04-02 with a 7-year life, so it expired around April 2026. Treated as urgent because a failing CO alarm leaves the flat unprotected; the tenant was given leave-and-call advice if it sounds continuously or anyone feels unwell.

**2. Who is responsible for fixing it, citing the tenancy clause where relevant?**

The landlord (via the agent). Clause 12.8 only makes the tenant replace batteries; this is a sealed unit that cannot be changed, so the whole alarm must be replaced, which is the landlord's responsibility. Clause 12.9 means the tenant must report faults (she did). Clause 12.17 (avoidable call-out charge) does not apply as the call-out is not avoidable.

**3. What actions did you take, and what did you tell the tenant?**

Checked there were no open tickets, created JOB-101 (urgent) and JOB-102 (routine fan), requested landlord approval (APR-104), and scheduled a follow-up for 12 Oct. I told Priya by SMS (the call dropped) not to remove the battery, that the alarm needs replacing and that this is the landlord's responsibility, the 72h target, safety advice with 0800 111 999 and 999, and that she will hear from us by 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, sealed b… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"appliance","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Tenant says n… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Replace the end-of-life hallway CO alarm (fitted 2019, 7-year life, seal… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","party":"Ben Hartley","purpose":"Chase landlord decision on CO alarm replacement; update tenan… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
