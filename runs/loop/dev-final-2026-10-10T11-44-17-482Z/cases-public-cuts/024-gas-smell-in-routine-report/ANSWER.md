# Case 024: Oven repair request: ANSWER

**Decision:** escalated · **Severity:** emergency

The tenant's oven repair request now includes a gassy smell near the oven, so I treated it as an emergency. I sent safety advice and the gas emergency number, noted the ticket and raised a P1 escalation for an engineer.

## Where the case stands
Ticket at intake (init), no provider assigned, no landlord decision. Tenant says landlord's setting advice did not fix the oven and reports an intermittent gassy smell. Handled as a gas emergency; P1 escalation raised.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | P1 escalation for a Gas Safe engineer visit within 24h and a phone call to the tenant | internal maintenance team | internal | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant to stop using the oven, leave the flat and call 0800 111 999 if they smell gas, and said we are treating it as an emergency | Imogen, tenant | email | A1 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Imogen (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Imogen, thanks for letting us know. Because of the gassy smell, please stop using the oven and hob for now. If you smell gas, open the windows, don't use any switches, lighters or flames, and leave the flat. Call the National Gas Emergency line on 0800 111 999 (free, 24 hours). In immediate danger call 999. We are treating this as an emergency and passing it to our team now so the oven and gas supply can be checked. We will be in touch again today with next steps.

## Escalation
- **P1 → maintenance** (verified): Tenant reports intermittent gassy smell near faulty oven (event 006), buried in a routine oven repair job
  - Known: Ticket NBL-024 oven heating very slowly since move-in. Landlord (Oliver) suggested settings, tenant tried, no fix. Tenant says gassy smell near oven sometimes. Tenant given gas safety advice and 0800 111 999 by email. No contractor assigned, no landlord decision recorded. Manual attachment unseen.
  - Missing: Severity of smell now, whether tenant has left/called gas line, gas safety record date, landlord contact preference, gas engineer availability
  - Options: Send gas-safe engineer today as emergency make-safe and inform landlord; Phone tenant to confirm they have isolated and called gas emergency line
  - Recommendation: Treat as emergency: book a Gas Safe engineer within 24h, phone tenant now, inform landlord.
  - Deadline: Immediately

## What this does not establish
- No engineer is booked yet
- The cause of the smell and the oven fault is not established
- Landlord has not yet been informed or approved anything
- The oven manual attachment was not seen

## Remaining work
- Maintenance team to book a Gas Safe engineer as an emergency and phone the tenant
- Inform the landlord
- Then deal with the oven fault itself
- Check the gas safety record date

## Missing or unavailable information
- Whether the smell is ongoing and whether the tenant has called the gas line
- Gas safety record status

## Conflicts between sources
- Ticket framed as a routine oven repair, but the tenant mentions a gas smell; I treated it as an emergency despite her saying it is not urgent.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake with no provider. The landlord's settings advice failed, and the tenant reports a gas smell. The engineer visit and landlord notification are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Safety advice was emailed to the tenant (done). A P1 escalation to the maintenance team is next, for an emergency Gas Safe visit and a phone call to the tenant.

**3. Does anything need a human decision, and why?**

Yes, P1: a possible gas leak needs an emergency engineer booked and the landlord informed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant reports intermittent gassy smell near faulty oven (event 006), buried in a routine ov… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `update_ticket` | {"ref":"NBL-024-gas-smell-in-routine-report","note":"Severity raised to emergency: tenant reports gassy smell near oven (event 006). Safety … | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back at stage init |

## Failed or unverified actions
_None._
