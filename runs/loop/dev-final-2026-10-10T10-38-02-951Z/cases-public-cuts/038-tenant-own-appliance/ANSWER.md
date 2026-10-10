# Case 038-tenant-own-appliance: ANSWER

**Outcome:** action_taken · **Severity:** routine

Tenant reports the landlord-supplied LG washing machine has failed and offers to replace it with their own. No existing ticket, so JOB-101 was logged as routine. The landlord was asked to decide how to proceed (APR-102) and the tenant was told and asked for a photo and error code.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

A routine appliance job is now logged (JOB-101). Outstanding: the landlord's decision on repair, replacement, or letting the tenant fit their own machine; the tenant's photo and error code; and the tenant's request to own and take the replacement.

**2. What is the next action, who is it for, and through which channel?**

Done now: landlord approval request APR-102 on the case channel, and an email to the tenant with the 14-day target. Next: once the landlord replies, confirm to the tenant and arrange a contractor or removal of the old unit.

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, since the machine is their property and the tenant's own-machine proposal needs their consent. It has been requested and is pending.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 9, 59 Alder Lane, Eastmere, ZZ4 4ZZ","category":"appliance","severity":"routine","description":"LG washing machine (provid… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `request_landlord_approval` | {"landlord":"Landlord of Flat 9, 59 Alder Lane","decision_needed":"The LG washing machine supplied with the flat has failed (power failure, … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","body":"Hello, thanks for letting us know about the washing machine, … | 1 | ✅ verified | MSG-103 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
