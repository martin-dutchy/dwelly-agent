# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord replied that the fan has a separate switch beside the hob, which isn't an approval. Recorded as unclear, passed the tip to the tenant asking them to test it, and put the job on hold to 2026-09-18.

## Where the case stands
Ticket NBL-017 at intake/landlord gate, on hold until 2026-09-18. Landlord replied with a tip, not a route decision. Waiting on tenant to confirm whether the fan works.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Passed on landlord's tip about the separate switch right of the hob; asked tenant to try it and confirm; said we'll check back by 2026-09-18 | Clara, tenant | email | A2 ✅ |
| 2 | WAIT | Hold until 2026-09-18 for tenant's answer | Clara, tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Clara (tenant) via email, existing thread (event 007 email)** (verified)

> Hi Clara, the landlord says the extractor fan has its own switch to the right-hand side of the hob, which needs to be switched on. Could you try that and let us know whether the fan then works? If it still doesn't, tell us and we'll carry on arranging a repair. We'll check back with you by 2026-09-18.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Landlord's reply does not authorise a contractor or spend
- It does not confirm the fan is working or that the switch is the cause
- No contractor assigned

## Remaining work
- If fan works: close without payment and tell landlord. If not: ask landlord for a clear our-contractor/own-contractor decision, then assign. Owner: agency, review 2026-09-18

## Missing or unavailable information
- Tenant confirmation whether fan works after using switch
- Landlord's decision on contractor route (if still needed)
- Tenant's picture was unavailable, not seen

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Still at the landlord gate with no contractor route chosen. The landlord's reply is troubleshooting advice. Outstanding: tenant confirmation that the fan works or not, and a landlord decision if it doesn't.

**2. What is the next action, who for, which channel?**

Email to tenant Clara asking her to try the switch and confirm; hold to 2026-09-18.

**3. Does anything need a human decision?**

No. It is routine and nothing needs escalating.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched … | 1 | ✅ verified | Ticket NBL-017 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says fan has a separate switch right of hob. Waiting for tenant to… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Failed or unverified actions
_None._
