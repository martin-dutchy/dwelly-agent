# Case 02: CO alarm chirping: battery or real alarm?: ANSWER

**Decision:** escalated · **Severity:** urgent

Priya reported a once-a-minute chirp from a 2019 sealed-battery CO alarm past its 7-year life. This is most likely an end-of-life warning, not a CO emergency, but treated as urgent because it can't be fully ruled out. Logged JOB-101 and JOB-102, sent safety advice to tenant, informed landlord, escalated P2 for booking.

## Where the case stands
JOB-101 (urgent, CO alarm replacement) on hold pending a human booking a contractor, review 2026-10-11. JOB-102 (extractor fan, routine) open. Tenant and landlord informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | SMS with safety advice, do not remove battery, 72h target, helplines, extractor fan logged | Priya Shah, tenant | sms | A3 ✅ |
| 2 | OTHER | Inform landlord replacement is his responsibility, within £300 limit | Ben Hartley, landlord | email | A4 ✅ |
| 3 | ESCALATE_TO_HUMAN | P2 handover to book alarm replacement and confirm no symptoms | internal maintenance | internal | A6 ✅ |
| 4 | WAIT | Review JOB-101 on 2026-10-11 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Priya Shah (tenant) via sms, +447700900103** (verified)

> Hi Priya, sorry our call dropped. Please don't take the battery out or cover the alarm. Yours is sealed, and a chirp every minute usually means it has reached the end of its life (it was fitted in 2019), so it needs replacing, not a new battery. Replacing it is our job, not yours. We've logged it as urgent and aim to get it replaced within 72 hours; we'll confirm a time with you. As we can't be sure it's only a fault, if the alarm ever sounds continuously, or you or anyone feel dizzy, sick, have headaches or smell gas: leave the flat, open doors, call the Gas Emergency line on 0800 111 999 (or 999 if anyone is unwell), and tell us. We've also logged the noisy bathroom extractor fan as a routine job, to be dealt with within 14 days. Mare and Co Lettings

**A4 · send_message → Ben Hartley (landlord) via email, ben.hartley@hartleyhomes.co.uk** (verified)

> Hi Ben, the hallway CO alarm at Flat 9, 3 Amhurst Road (FireAngel CO-9X, fitted April 2019, sealed battery, 7-year life) is chirping, which points to end of life. As it's sealed, the tenant can't replace it, so replacement is your responsibility. We've logged it as urgent (JOB-101) and plan to arrange a like-for-like replacement alarm within 72 hours. We expect the cost to be well under your £300 limit; we'll tell you if that changes. We've also logged a routine noisy extractor fan job (JOB-102). Tenant has been given safety advice. Regards, Mare and Co Lettings

## Escalation
- **P2 → maintenance** (verified): Expired CO alarm chirping; needs contractor booked (none on file) and tenant access arranged, same day/within 72h
  - Known: Call 2026-10-10 from Priya Shah (T-1003), dropped at 00:29. CO-9X in hallway fitted 2019-04-02, sealed battery, 7yr life, so expired. Chirp once a minute since last night, no continuous alarm or symptoms reported (not fully asked). Boiler serviced 2025-11. Tenancy 12.8 covers battery replacement only; sealed unit so landlord's duty. Landlord limit £300. Tickets JOB-101 (urgent), JOB-102 (extractor, routine). Tenant and landlord messaged.
  - Missing: No symptoms confirmation (call dropped); no contractor/quote; access time.
  - Options: Book electrician/gas engineer to fit new CO alarm within 72h and check boiler CO reading; Landlord arranges own
  - Recommendation: Book replacement alarm fitting within 72h, within £300 limit; phone tenant to confirm no symptoms and agree access with 24h notice.

## What this does not establish
- Not confirmed that no CO is present; no gas/CO reading has been taken
- No contractor booked or cost agreed yet
- Does not decide who pays for the extractor fan

## Remaining work
- Maintenance team: book replacement alarm and boiler check, within 72h, access with 24h notice
- Confirm with tenant no symptoms
- Extractor fan JOB-102 within 14 days

## Missing or unavailable information
- Call dropped before symptoms/alarm type fully confirmed and before the tenant's battery question was answered (answered by SMS)
- No contractor on file

## Conflicts between sources
- None between sources; the call dropped before the tenant's battery question was answered.

## Answers to the case questions
**1. Is this a CO emergency, battery issue or end-of-life alarm?**

Most likely end-of-life: a single chirp about once a minute (not continuous alarm), the unit is sealed-battery, fitted 2019-04-02 with 7-year life so expired ~April 2026. Not a battery issue (sealed) and no evidence of CO, but treated as urgent and safety advice given since the call dropped before symptoms were checked.

**2. Who is responsible, citing clause?**

Landlord. Clause 12.8 makes the tenant replace batteries only; this battery is sealed so the whole unit must be replaced, which is the landlord's duty. Clause 12.9 means the tenant must report faults (done). Clause 12.17 (avoidable call-out) doesn't apply.

**3. What actions did you take and what did you tell the tenant?**

Created JOB-101 (urgent) and JOB-102 (routine fan), SMS to tenant: don't remove battery or cover alarm, replacement planned within 72h target, leave and call 0800 111 999/999 if alarm sounds continuously or symptoms; fan within 14 days. Emailed Ben; escalated ESC-105 P2; put JOB-101 on hold with review 2026-10-11.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"gas","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, fitted 2019-04-… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent. … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Other","comment":"No contractor on record for the property; awaiting a human to book an alarm replacement … | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |
| A6 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Expired CO alarm chirping; needs contractor booked (none on file) and tenant access arranged… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Failed or unverified actions
_None._
