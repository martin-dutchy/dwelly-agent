# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant reports a once-a-minute chirp from a sealed-battery CO alarm fitted 2019 (7-year life), so it is most likely end-of-life, not a CO event. Logged urgent replacement job and a separate routine fan job, gave tenant safety advice and told her not to remove the battery, informed landlord, set follow-up.

## Where the case stands
JOB-101 at intake (urgent); landlord informed and asked to respond by 12 Oct; no contractor assigned yet. JOB-102 routine, intake.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Advised not to remove sealed battery, gave CO safety advice and timescale | Priya Shah, tenant | sms | A3 ✅ |
| 2 | REQUEST_INFORMATION | Informed landlord and asked for any objection/own contractor by 12 Oct | Ben Hartley, landlord | email | A4 ✅ |
| 3 | WAIT | Review landlord reply and assign an electrician on 12 Oct | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't take the battery out: it's sealed, and your alarm was fitted in 2019 so a once-a-minute chirp most likely means it has reached the end of its life and needs replacing. We've logged this as urgent and are arranging a replacement (target within 72 hours). Safety: if the alarm ever sounds continuously, or anyone has a headache, dizziness, nausea or feels drowsy, leave the flat, don't use switches or flames, call the National Gas Emergency line on 0800 111 999 (999 if anyone is very unwell). Please tell us if that happens. We've also logged the noisy bathroom fan as a routine job. We'll update you by Monday 12 October.

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, Priya Shah at Flat 9, 3 Amhurst Road reports the hallway CO alarm chirping about once a minute since last night. It's a FireAngel CO-9X with a sealed battery, fitted 2019-04-02 with a 7-year lifespan, so it is past end of life and needs replacing (the tenant can't change a sealed battery, so this falls to you as landlord). A replacement should be well within your £300 limit; we plan to arrange it as an urgent job (JOB-101) unless you tell us otherwise. We've told the tenant not to tamper with it and given her CO safety advice. Separately, a noisy bathroom extractor fan is logged as routine (JOB-102). Please reply by Monday 12 October if you'd prefer your own contractor.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Not a confirmed CO reading; cause inferred from alarm age and chirp pattern.
- No contractor assigned or visit booked yet.
- Fan job does not imply landlord approval.

## Remaining work
- Assign electrician and replace alarm (JOB-101), owner: ops, review 12 Oct
- Progress fan job JOB-102 with landlord approval
- Confirm with tenant no symptoms and alarm replaced before closing

## Missing or unavailable information
- Whether tenant has any CO symptoms (call dropped)
- No electrician named in records

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Is this a CO emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely end-of-life. Chirp only (not continuous alarm), battery is sealed so it is not a battery swap, and the unit was fitted 2019-04-02 with a 7-year lifespan, so it expired around April 2026. No symptoms were reported (call dropped before full check), so I gave CO safety advice in case; this is not treated as a confirmed CO emergency.

**2. Who is responsible for fixing it, citing the tenancy clause?**

Landlord. Clause 12.8 makes the tenant replace batteries only, but this battery is sealed and not replaceable, so the unit replacement is the landlord's. Clause 12.9 (test monthly and report faults) was met by Priya reporting promptly. Clause 12.17 doesn't apply: not an avoidable call-out.

**3. What actions did you take and what did you tell the tenant?**

Created JOB-101 (urgent) and JOB-102 (routine fan). SMS to Priya: don't remove the battery, likely end of life, replacement targeted within 72 hours, leave and call 0800 111 999 / 999 if continuous alarm or symptoms, next update by 12 Oct. Emailed Ben Hartley with facts, within £300 limit, asking for any objection by 12 Oct. Follow-up set for 12 Oct.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, sealed b… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent."… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check landlord reply, assign electrician for CO alarm replacement, update tenant","… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
