# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord replied with a tip about a separate switch by the hob rather than approving a contractor. I recorded this as unclear, passed the tip to the tenant to test, updated the landlord, and put the job on hold until 2026-09-18.

## Where the case stands
Landlord approval gate; no route chosen, no contractor assigned. Landlord's reply is a troubleshooting tip, not approval. On hold waiting for tenant to test the switch; review 2026-09-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask Clara to try the switch right of the hob and report whether the fan works | Clara, tenant | email | A2 ✅ |
| 2 | OTHER | Thank landlord, say we will return to the contractor question if the fan is still faulty | Landlord | email | A3 ✅ |
| 3 | WAIT | Hold for tenant's result, review 2026-09-18 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Clara (tenant) via email, existing thread (event 007 email)** (verified)

> Hi Clara, the landlord says the extractor fan has a separate switch to the right-hand side of the hob, which needs to be switched on for the fan to run. Could you try that and let us know whether the fan now works? If it still doesn't, tell us and we'll take the repair forward with the landlord. Kind regards, Northbridge Lettings

**A3 · send_message → Landlord (landlord) via email, existing thread (event 008 email)** (verified)

> Thank you for the tip about the switch by the hob. We've passed it to the tenant to try. If the fan still doesn't work, we'll come back to you to ask whether you'd like to use your own contractor or ours. No action needed from you for now.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the landlord reply as unclear does not approve any spend or contractor.
- The tip does not establish that the fan is actually fixed or what the fault is.
- The tenant's picture was unavailable and not seen.

## Remaining work
- If tenant says it works: record tenant fix and close without payment, tell landlord.
- If not: ask landlord one yes/no question on our contractor or their own, then assign.
- Review on 2026-09-18 if no tenant reply.

## Missing or unavailable information
- Tenant's result after trying the switch
- Landlord's decision on contractor route
- Tenant's picture was unavailable

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate. The landlord has not chosen a route. Outstanding: the tenant testing the hob-side switch, and a contractor decision if the fan is still faulty.

**2. What is the next action, who is it for, and through which channel?**

Email to Clara asking her to try the switch and report back (sent). Landlord updated by email. Job on hold, review 2026-09-18.

**3. Does anything need a human decision, and why?**

No. It is routine and waiting on the tenant's test result.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched … | 1 | ✅ verified | Ticket NBL-017 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 008 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Waiting for tenant to confirm whether the fan works using the separate swit… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Failed or unverified actions
_None._
