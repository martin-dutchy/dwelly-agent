# Case 012: ANSWER

**Outcome:** action_taken · **Severity:** routine

Routine dishwasher door fault at Flat 9, 89 Juniper Mews. Tenant Leo Turner confirmed on 23 Apr that troubleshooting did not fix it, and the landlord had agreed an engineer visit; Riverside Compliance was instructed on 25 Apr to contact the tenant, attend and quote. No ticket existed in the system, so I logged JOB-101 (routine, appliance) and sent the tenant an SMS with the 14-day target and the next steps.

## Answers
**1. Where does the case stand and what is outstanding?**

Troubleshooting failed (confirmed 23 Apr). Riverside Compliance was instructed 25 Apr to contact the tenant, attend and quote. Outstanding: the contractor's visit and quote, then landlord approval of the quote before any repair work. No ticket existed in the system, now logged as JOB-101.

**2. What is the next action, for whom, and by which channel?**

Riverside Compliance (contractor) to contact the tenant and arrange the visit/quote, already requested by email on 25 Apr. Tenant informed by SMS to 07700 900763 with the routine 14-day target. Next, once the contractor quotes, request landlord approval.

**3. Does anything need a human decision?**

Not now. Spend approval is needed only once a quote arrives, and the landlord's limit is not on file. Escalate then if the quote exceeds the limit or the landlord has not approved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 9, 89 Juniper Mews, Willowbank, ZZ2 0ZZ","category":"appliance","severity":"routine","description":"Dishwasher door not cl… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"sms","contact":"07700 900763","body":"Hi Leo, this is Northbridge Lettin… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
