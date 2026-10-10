# Case 024-gas-smell-in-routine-report: ANSWER

**Outcome:** escalated · **Severity:** emergency

The tenant's oven request now includes a "gassy smell", so it is a gas emergency and not a routine repair. I created emergency ticket JOB-101 and escalated to maintenance as P1 (ESC-102). I could not message the tenant because no contact details were in the case data, so she has not yet received gas safety advice.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

The tenant tried the suggested settings and the oven still doesn't cook. She also reports an intermittent gas smell. No ticket existed before; JOB-101 is now open as an emergency. Outstanding: safety advice to the tenant, a same-day gas engineer, and identity verification.

**2. What is the next action, who is it for, and through which channel?**

Contact the tenant (Imogen) urgently, by phone first, telling her to leave the property if she smells gas, avoid switches and flames, call 0800 111 999, and not use the oven. Then assign a Gas Safe engineer. I couldn't do this myself because no tenant contact is on file; it is part of the P1 handover.

**3. Does anything need a human decision, and why?**

Yes. A human needs to make the P1 call to the tenant and authorise the engineer attendance, because there is a possible gas leak and I have no contact details to reach her. The case should not go back to auto mode.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","tenant":"Imogen","description":"Tenant … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak reported in a routine oven case; tenant has no safety advice yet and no co… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Escalations
- **P1 → maintenance** (verified): Possible gas leak reported in a routine oven case; tenant has no safety advice yet and no contact details are on file in my records
  - Known: Event 006 (tenant Imogen, 2026-08-05): oven still not cooking after trying landlord/agent suggested settings; "gassy smell near it sometimes". Earlier oven-fault ticket was never created; no open tickets existed. Created emergency ticket JOB-101 (A1). Manual attachment unseen.
  - Missing: Tenant phone/email (none in the case data); identity not verified; which fuel the oven uses; whether the smell is present now; no gas engineer assigned.
  - Options: Phone tenant now: leave the property, no switches/flames, call National Gas Emergency 0800 111 999 and book a gas engineer same day; Email advice and book the engineer
  - Recommendation: Call tenant immediately with gas safety advice, assign a Gas Safe engineer same day, and advise not to use the oven until checked. Also review the earlier suggestion that the tenant adjust the settings.
  - Deadline: Immediately

## Failed or unverified actions
_None._
