# Case 026: ANSWER

**Outcome:** escalated · **Severity:** routine

Routine oven fault. The landlord approved Keystone Compliance, but the appointment emails were sent as confirmed on conflicting details. The tenant has not confirmed. I escalated the record conflicts for a human to verify and correct, and sent no further messages because the contact and identity details are unreliable.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval is done and a contractor has been assigned. A visit was announced for 'Monday 30/08/2025 10-12', but the tenant has only tentatively agreed and said she would text back. Outstanding: tenant confirmation, a correct date, the right contractor and the right tenant details. No ticket exists in the system.

**2. What is the next action, who is it for, and through which channel?**

Verify the tenant's identity and number from the tenancy record. Then send a corrected provisional booking by email or SMS to the tenant and to the contractor. This is with the maintenance team via ESC-101. The routine target is within 14 days.

**3. Does anything need a human decision, and why?**

Yes, a P2 maintenance escalation (ESC-101). The date and weekday don't match (30/08/2025 is a Saturday). The caller was Riverside Works, not Keystone. The tenant has four different names. There are two phone numbers. The tenant hasn't confirmed. I can't safely resolve these myself.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Oven repair appointment was sent as confirmed but the details conflict and the tenant has no… | 1 | ✅ verified | ESC-101 found in the escalate_to_human log |

## Escalations
- **P2 → maintenance** (verified): Oven repair appointment was sent as confirmed but the details conflict and the tenant has not confirmed
  - Known: Routine oven fault (main element dead, grill works). Landlord approved Keystone Compliance (events 009-011). Appointment emails went to contractor and tenant (018, 019) for "Monday morning 10-12 (30/08/2025)". The tenant only said she would check with her partner and text the contractor (016). list_tickets returns no tickets.
  - Missing: 1) 30/08/2025 is a Saturday, not a Monday (Monday is 01/09/2025). 2) The caller was Isaac Palmer of Riverside Works, not Keystone Compliance. 3) Tenant is named Ruben Oakley, Clara, Grace Mercer and Harriet Fletcher in different events. 4) Two phone numbers (07700 900721 and 07700 900077, the latter labelled as a code). 5) Visit not confirmed by the tenant. 6) No ticket exists in the system. 7) The attachment is unavailable.
  - Options: Verify tenant identity and contact details, then confirm the correct contractor, day and time with the tenant and contractor; Treat the visit as provisional until the tenant texts to confirm; Create or link a ticket once the records are corrected
  - Recommendation: Verify the tenant's name and number from the tenancy record, correct the date, check which contractor is attending, and send the tenant and contractor a corrected provisional booking. Routine target is within 14 days.

## Failed or unverified actions
_None._
