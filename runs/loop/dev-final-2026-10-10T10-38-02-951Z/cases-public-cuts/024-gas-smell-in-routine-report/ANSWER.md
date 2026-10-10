# Case 024-gas-smell-in-routine-report: ANSWER

**Outcome:** escalated · **Severity:** emergency

A routine oven complaint now includes a reported gassy smell, so it is treated as an emergency. The tenant was sent gas safety advice and the 0800 111 999 number. An emergency gas ticket JOB-102 was opened and P1 escalation ESC-103 raised for a gas engineer.

## Answers
**1. Where does this case stand and what is outstanding?**

The tenant tried the suggested settings and the oven still fails. She now reports an intermittent gas smell. No ticket existed before. Outstanding: a Gas Safe engineer visit within 24h, landlord notification, and confirming the tenant is safe.

**2. What is the next action, who for, which channel?**

Done: safety email to tenant Imogen (leave if the smell persists, no switches or flames, call 0800 111 999, don't use the oven). Next: the human team books the gas engineer and phones the tenant.

**3. Does anything need a human decision?**

Yes, P1 (ESC-103): a possible gas leak needs same-day engineer attendance, and contractor and spend authority was not available to me.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","body":"Hi Imogen, thanks for letting us know. Because you've noticed… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","tenant":"Imogen","description":"Tenant … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak reported in a routine oven repair; needs same-day gas engineer","known":"T… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Escalations
- **P1 → maintenance** (verified): Possible gas leak reported in a routine oven repair; needs same-day gas engineer
  - Known: Tenant Imogen (email, 2026-08-05 01:12) says oven still doesn't cook after trying landlord agent's suggested settings, and there is sometimes a gassy smell near it. Agent Oliver's earlier advice was to adjust dials. No tickets existed; emergency gas ticket created. Tenant sent gas safety advice and the 0800 111 999 number.
  - Missing: Whether smell is present now; gas safety record status; preferred gas contractor and landlord spend limit; oven manual unseen.
  - Options: Book Gas Safe engineer within 24h to check appliance and supply; Phone tenant to confirm they are safe and have called National Gas Emergency
  - Recommendation: Book Gas Safe engineer today, phone tenant to confirm safety, tell landlord.
  - Deadline: Same day

## Failed or unverified actions
_None._
