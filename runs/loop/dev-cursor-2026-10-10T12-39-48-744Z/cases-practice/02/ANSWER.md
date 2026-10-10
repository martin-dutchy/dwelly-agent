# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reported a chirping hallway CO alarm; it is a sealed unit fitted in 2019 with a 7-year life, so it is past end of life. Treated as urgent, not a confirmed CO emergency. Logged JOB-101 and JOB-102 (fan), advised tenant on safety, asked landlord for approval.

## Where the case stands
JOB-101 (urgent) at intake, awaiting landlord approval (APR-104); JOB-102 (routine fan) logged. Follow-up 12 Oct.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve our contractor replacing the CO alarm | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Safety advice, don't remove battery, timescale, fan logged separately | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Chase landlord and update tenant on 12 Oct | Ben Hartley | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't remove the battery or cover the alarm. Yours is a sealed unit that is now past its 7-year life, so a regular chirp usually means it needs replacing, and we're treating it as urgent. We've logged it and our target is to get it sorted within 72 hours. Replacing the alarm is for the landlord/us to arrange, not you. Safety: if the alarm sounds continuously, or anyone feels dizzy, has headaches, nausea or flu-like symptoms, leave the flat, open doors, call the National Gas Emergency line on 0800 111 999 (or 999 if anyone is unwell), and don't use the boiler until checked. We've also logged the noisy bathroom fan as a separate routine job. We'll update you by Monday 12 October.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Tenant's hallway CO alarm (fitted 2019, sealed, 7-year life) is chirping, so it's past its life. Please approve us replacing it with our contractor, plus a quick check of the gas appliances. We expect this to be under your £300 limit; we'll come back to you if not. (£300)
> 
> Options: Yes, send your contractor to replace the alarm (recommended); I'll arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Not confirmed that there is no CO; the alarm has not been inspected
- No contractor assigned or visit booked
- Fan job not yet approved or scheduled

## Remaining work
- Landlord approval, then assign contractor to replace alarm and check gas appliances (ops)
- Fan job JOB-102 to landlord approval flow (ops)

## Missing or unavailable information
- Whether the chirp is the end-of-life pattern (model manual) and whether tenant has any symptoms; call dropped before answers

## Conflicts between sources
- Call dropped mid-conversation, so the tenant's question about removing the battery was never answered live; answered by SMS

## Answers to the case questions
**1. Is this a CO emergency, battery issue or end-of-life alarm?**

Most likely end-of-life: single chirp about once a minute, no continuous alarm, no symptoms mentioned, sealed battery (so not a replaceable battery) and the unit is past its 7-year life (fitted 2019-04-02). Real CO is not ruled out, so safety advice was given and it is urgent; it becomes an emergency if the alarm sounds continuously or anyone has symptoms.

**2. Who is responsible?**

The landlord, via us. Clause 12.8 makes the tenant replace batteries, but this is a sealed unit with no replaceable battery, so it is an equipment replacement. Clause 12.9 (tenant tests and reports promptly) was met. Clause 12.17 doesn't apply: the call wasn't avoidable or out of hours call-out.

**3. What actions and what told to tenant?**

Created JOB-101 (urgent) and JOB-102 (routine fan), requested landlord approval (APR-104), scheduled follow-up for 12 Oct. Told tenant not to remove the battery, gave gas emergency 0800 111 999 and 999 advice, the 72h target and next update date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"gas","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, fitted 2019-04-… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent. … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Tenant's hallway CO alarm (fitted 2019, sealed, 7-year life) is chirping… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Chase landlord approval for CO alarm replacement; update tenant","party":"Ben Hartl… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
