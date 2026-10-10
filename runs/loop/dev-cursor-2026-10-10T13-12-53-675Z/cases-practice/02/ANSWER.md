# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** action_taken · **Severity:** urgent

Caller reported a once-a-minute chirp from a sealed CO alarm fitted April 2019 with a 7-year life, so most likely end-of-life, not a CO emergency. Logged an urgent job and a separate routine fan job, told Priya not to remove the battery and gave gas emergency advice, and asked the landlord to approve replacement.

## Where the case stands
JOB-101 (urgent, CO alarm) at intake, awaiting landlord approval (APR-104), follow-up 2026-10-12. JOB-102 (routine fan) logged, awaiting normal landlord approval step.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask Ben to approve our contractor replacing the end-of-life CO alarm | Ben Hartley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Text Priya: don't remove battery, safety advice, helpline, what's pending | Priya Shah, tenant | sms | A3 ✅ |
| 3 | WAIT | Review landlord reply on 12 Oct | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't remove the CO alarm's battery: it's a sealed unit fitted in 2019 and is likely at the end of its life, so the chirp is probably that, not a gas leak. We've logged it as urgent and are asking your landlord to approve a replacement; our target for urgent work is within 72 hours. If the alarm ever sounds continuously, or anyone feels dizzy, sick or has headaches, leave the flat, call the National Gas Emergency line on 0800 111 999 (or 999 if in immediate danger), and tell us. We've also logged the noisy bathroom fan as a routine job. We'll update you by Monday.

**A4 · request_landlord_approval → Ben Hartley (landlord)** (verified)

> Hallway CO alarm at Flat 9, 3 Amhurst Road is chirping; it is a sealed 7-year unit fitted April 2019, so it is past its life. Replacement is the landlord's item (sealed unit, tenant can't change the battery). May we send our contractor to replace it and check CO safety? Please reply yes/no by Monday 12 Oct.
> 
> Options: Yes, use your contractor to replace the alarm (recommended); I'll arrange my own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Logging tickets does not confirm the alarm is end-of-life; only replacement or an engineer check can rule out CO.
- No contractor assigned or visit booked; no spend approved.
- Fan job not yet approved by landlord.

## Remaining work
- Landlord decision on alarm replacement (agency chases 12 Oct)
- Assign contractor and book visit once approved; engineer check of boiler if any doubt
- Landlord approval and contractor for extractor fan (JOB-102)

## Missing or unavailable information
- Call dropped before tenant answered whether anyone has symptoms; no CO reading available
- Alarm chirp pattern not confirmed as end-of-life (single chirp per minute is typical)

## Conflicts between sources
- None between sources; the alarm age (2019 fit, 7-year life) was used over the tenant's 'battery' assumption.

## Answers to the case questions
**1. Is this a carbon monoxide emergency, a battery issue, or an end-of-life alarm? How did you decide?**

Most likely end-of-life: the unit is sealed (no replaceable battery) and is 7 years 6 months old against a 7-year lifespan, and the signal is a single chirp a minute, not a continuous alarm. No symptoms reported, though the call dropped before I could confirm. Treated as urgent, not emergency, with safety advice given in case it changes.

**2. Who is responsible for fixing it, citing the tenancy clause where relevant?**

The landlord. Clause 12.8 (tenant replaces batteries) does not fit a sealed unit with no replaceable battery; replacing the expired alarm is the landlord's. Clause 12.9 means the tenant should test monthly and report faults, which she did. Clause 12.17 (avoidable call-out) doesn't apply as the alarm is past its life. Likely cost is under the £300 limit but no contractor is named so approval was requested.

**3. What actions did you take, and what did you tell the tenant?**

Created JOB-101 (urgent) and JOB-102 (routine fan), asked landlord approval, scheduled follow-up for 12 Oct, and texted Priya: don't remove the battery, likely end of life, leave and call 0800 111 999 if it sounds continuously or anyone feels unwell, urgent target within 72 hours, update by Monday.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"gas","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, sealed battery,… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent."… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","body":"Hi Priya, sorry our call dropped.… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Hallway CO alarm at Flat 9, 3 Amhurst Road is chirping; it is a sealed 7… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |
| A5 | `schedule_follow_up` | {"due_on":"2026-10-12","purpose":"Chase landlord approval for CO alarm replacement and update tenant","ticket_ref":"JOB-101","party":"Ben Ha… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
