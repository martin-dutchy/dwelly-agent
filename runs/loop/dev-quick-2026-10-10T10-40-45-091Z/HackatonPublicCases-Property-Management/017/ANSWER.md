# Case 017: ANSWER

**Outcome:** escalated · **Severity:** routine

The tenant reported a kitchen extractor fan that does not turn on on 2026-09-11. The landlord was asked on 2026-09-13 to choose their own or an agency contractor and has not replied. I logged routine ticket JOB-101, raised landlord approval APR-102, and escalated the outstanding contact and chase work to maintenance as ESC-103.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

Routine repair logged as JOB-101 at stage init. No contractor assigned and no visit booked. Landlord has not replied to the 2026-09-13 contractor-choice email. Landlord approval APR-102 is pending. The tenant has not been given a status update. Her 2026-09-14 'Thank you!' email is an acknowledgement, not an instruction.

**2. What is the next action, who is it for, and through which channel?**

Chase the landlord by phone for contractor choice and spend approval (APR-102). Send the tenant a status update through her verified contact on file: request received, landlord decision pending, routine target within 14 days of 2026-09-11. This was not sent because no verified tenant contact was in the case records. Maintenance has the handover in ESC-103.

**3. Does anything need a human decision, and why?**

Yes, the landlord must choose their contractor and approve any spend, since that is their decision. Maintenance also needs to contact the tenant and chase the landlord, because I could not reach either with verified details. Nothing is an emergency.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 1, 31 Juniper Mews, Cedarford, ZZ7 7ZZ","category":"appliance","severity":"routine","description":"Kitchen extractor fan d… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `request_landlord_approval` | {"landlord":"Landlord, Flat 1, 31 Juniper Mews, Cedarford, ZZ7 7ZZ (name not in case records)","decision_needed":"Kitchen extractor fan not … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Routine kitchen extractor fan fault with no landlord reply and no contractor booked. Tenant … | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Escalations
- **P3 → maintenance** (verified): Routine kitchen extractor fan fault with no landlord reply and no contractor booked. Tenant also needs a status update, but I have no verified contact details for her in the case records.
  - Known: Tenant Clara reported on 2026-09-11 that the kitchen extractor fan does not turn on (routine, no gas or electrical danger reported). Agency emailed landlord 2026-09-13 23:05 UTC asking for their choice of contractor; no reply on file. Ticket JOB-101 created (routine, stage init). Landlord approval request APR-102 raised. Tenant's 2026-09-14 "Thank you!" email is an acknowledgement, not an instruction.
  - Missing: Landlord's name and reply on contractor choice. Tenant's verified contact details for a status update (not in the case). Event 006 ("message received") does not say what was received. Landlord photo was unavailable.
  - Options: Message the tenant: request received, routine target 14 days, landlord decision pending; Chase landlord by phone for contractor choice and spend approval; Once landlord replies, assign contractor and visit window on JOB-101
  - Recommendation: Contact the tenant with a status update using her verified details, and chase the landlord by phone. Then assign a contractor once the landlord decides. Routine target is within 14 days of 2026-09-11.

## Failed or unverified actions
_None._
