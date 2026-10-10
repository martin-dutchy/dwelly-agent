# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord replied with a tip, not an approval: the fan needs a switch by the hob turned on. I passed this to the tenant, acknowledged the landlord, and put the job on hold until 2026-09-18 for the tenant's answer.

## Where the case stands
NBL-017 at init/landlord gate. Landlord has not approved a contractor route. On hold waiting for tenant to confirm whether the hob-side switch fixes the fan; review 2026-09-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Asked tenant to try the switch right of the hob and report back | Clara, tenant | email | A1 ✅ |
| 2 | OTHER | Acknowledged landlord's tip and said we will ask about contractor route if the fan is still dead | Landlord | email | A2 ✅ |
| 3 | WAIT | Hold for tenant reply, review 2026-09-18 | Clara, tenant | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Clara (tenant) via email, existing thread (event 007 email)** (verified)

> Hi Clara, the landlord has said there is a separate switch to the right-hand side of the hob that needs to be switched on for the extractor fan to work. Could you try that and let us know if the fan now runs? If it still doesn't, tell us and we'll carry on arranging a repair. Thanks, Northbridge Lettings

**A2 · send_message → Landlord (landlord) via email, existing thread (event 008 email)** (verified)

> Thank you for the tip about the switch by the hob. We've passed it to the tenant to try. If the fan still doesn't work, we'll come back to you to ask whether you'd like your own contractor or ours to look at it.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Landlord's message is a troubleshooting tip, not an approval or contractor choice; no decision recorded and no contractor assigned.
- Does not establish that the fan is fixed.

## Remaining work
- If the tenant confirms it works: close without payment and tell the landlord.
- If not: re-ask landlord for own or agency contractor decision, then assign.
- The tenant's picture attachment was unavailable and not seen.

## Missing or unavailable information
- Tenant confirmation of whether the switch fixes the fan
- Landlord's contractor decision
- Tenant's picture (unavailable)

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate with no contractor chosen. The landlord's reply suggests the fan may only need a switch turned on. Outstanding: tenant confirmation, and a landlord route decision if the fan is still dead.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant (Clara) asking her to try the switch and report back (done, MSG-101). The landlord was acknowledged by email, and the job is on hold to 2026-09-18.

**3. Does anything need a human decision, and why?**

No. This is routine and is waiting on the tenant.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","body":"Hi Clara, the la… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 008 email)","body":"Thank you f… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"R-017","reason":"Waiting for Tenant","comment":"Landlord says a switch right of the hob must be on. Waiting for tenant to con… | 1 | ❌ failed | Ticket R-017 not found on read-back |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says a switch right of the hob must be on. Waiting for tenant to c… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Failed or unverified actions
- A3: First hold attempt used the wrong ref R-017; found the correct ref NBL-017 via list_tickets and retried successfully (A4).
