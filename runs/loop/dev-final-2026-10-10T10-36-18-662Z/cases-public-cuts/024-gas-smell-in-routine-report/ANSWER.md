# Case 024-gas-smell-in-routine-report: ANSWER

**Outcome:** escalated · **Severity:** emergency

A routine oven complaint now includes a reported gassy smell near the oven, so it is an emergency. I logged emergency gas ticket JOB-102 and sent the tenant gas safety advice with the 0800 111 999 number. I told the landlord and escalated as P1 to maintenance to book a Gas Safe engineer.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

The landlord's settings advice did not fix the oven. The tenant asked for a visit and mentioned a gassy smell. No ticket existed, so JOB-102 is now open at init. A Gas Safe engineer visit still needs booking.

**2. What is the next action, who is it for, and through which channel?**

Done: the tenant was emailed safety advice (don't use the oven, ventilate, call 0800 111 999 if the smell is strong, with the aim of a visit within 24h). The landlord was emailed. A P1 escalation went to maintenance to dispatch a gas engineer.

**3. Does anything need a human decision, and why?**

Yes, as P1. No gas contractor is on record and a possible gas leak is a safety matter. A human should dispatch or confirm the engineer and check on the tenant's safety.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","body":"Hi Imogen, thanks for letting us know. Because you've noticed… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","tenant":"Imogen","description":"Tenant … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak reported in a routine oven-repair case; emergency gas engineer needed","kn… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `send_message` | {"recipient_name":"Oliver","recipient_role":"landlord","channel":"email","body":"Hi Oliver, the tenant says the suggested settings didn't he… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Escalations
- **P1 → maintenance** (verified): Possible gas leak reported in a routine oven-repair case; emergency gas engineer needed
  - Known: Tenant Imogen, Flat 6, 56 Juniper Mews. Email on 2026-08-05 01:12 reports a gassy smell near the oven "sometimes", and the oven is still not cooking properly after the landlord's suggested settings. No open tickets existed. I created JOB-102 (emergency, gas) and emailed the tenant gas safety advice (0800 111 999, don't use the oven, ventilate, leave if strong). The tenant described the smell as not urgent; I have treated it as an emergency anyway.
  - Missing: No gas contractor or landlord preference is on record. The smell's strength is unknown. The oven manual was unseen. It is unconfirmed whether the tenant has the gas supply isolated.
  - Options: Dispatch a Gas Safe engineer within 24h; Phone the tenant to check the smell's severity and advise isolating the supply
  - Recommendation: Book a Gas Safe engineer today for the appliance and supply, and phone the tenant to confirm they are safe. Also inform the landlord (Oliver).

## Failed or unverified actions
_None._
