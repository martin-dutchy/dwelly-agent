# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord replied with a tip about a separate switch rather than approving a contractor. I passed it to the tenant, recorded the reply as not an approval, and held the job pending the tenant's result.

## Where the case stands
Intake/landlord gate. Landlord has not approved a route; his reply is a tip about a separate fan switch. Ticket on hold waiting for tenant to try it, review 2026-09-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell Clara about the switch right of the hob, ask her to try it and report back | Clara, tenant | email | A1 ✅ |
| 2 | WAIT | Hold until tenant confirms; review 2026-09-18 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Clara (tenant) via email, existing thread (event 007 email)** (verified)

> Hi Clara, the landlord has said there is a separate switch to the right-hand side of the hob that needs to be switched on for the extractor fan to work. Could you try it and let us know whether the fan now runs? If it still won't start, tell us and we'll arrange for someone to look at it. We'll check back with you on 2026-09-18.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the fan is fixed or that the switch is the cause
- Does not approve a contractor or spend
- Landlord's claim passed on as his, unverified

## Remaining work
- Tenant to confirm result; if still broken, re-ask landlord for contractor decision (our own or theirs); if fixed, close without payment and inform landlord

## Missing or unavailable information
- Whether the switch makes the fan work
- Landlord approval for a contractor if needed
- Tenant's picture attachment was unavailable

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate; no route authorised. The landlord suggests a separate switch by the hob. Tenant's result is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Clara asking her to try the switch (sent, A1); hold until 2026-09-18 (A3).

**3. Does anything need a human decision, and why?**

No. It is a routine job and the next step is the tenant's reply.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `record_landlord_decision` | {"ticket_ref":"NBL-017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched … | 1 | ✅ verified | Ticket NBL-017 read back after record_landlord_decision |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Waiting for tenant to confirm whether the separate switch right of the hob … | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Failed or unverified actions
_None._
