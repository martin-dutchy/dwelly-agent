# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord replied that the extractor fan has a separate switch to the right of the hob. I passed this to the tenant, asked her to try it and confirm, put the ticket on hold and set a chase for 18 Sept. No human decision needed yet.

## Where the case stands
Ticket NBL-017 at init, on hold waiting for tenant. Landlord has not approved a contractor or spend; they suggested a hob-side switch may be off. Tenant asked to try it and confirm.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Pass on landlord's tip (switch right of hob) and ask Clara to confirm whether the fan works; routine target 14 days if not | Clara, tenant | email | A1 ✅ |
| 2 | WAIT | Hold ticket and chase tenant on 2026-09-18 | Clara, tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Clara (tenant) via email, existing thread (event 007 email)** (verified)

> Hi Clara, the landlord has replied about the extractor fan. They say there is a separate switch to the right of the hob that needs to be switched on for the fan to work. Could you please try that and let us know if the fan starts? If it still doesn't work, tell us and we will arrange for someone to look at it (routine repair, target within 14 days). Many thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The landlord's tip does not confirm the cause of the fault or that it is fixed
- No contractor assigned and no spend approved
- Landlord's contractor/approval question remains unanswered

## Remaining work
- Tenant to confirm outcome; agency chases 2026-09-18
- If still faulty, get landlord approval or use landlord's own contractor, then assign and visit
- If fixed, close without payment and inform landlord

## Missing or unavailable information
- Tenant confirmation whether fan works after using the switch
- Landlord decision on contractor/spend if still faulty
- Property record lacks landlord contact, spend limit and contractors

## Conflicts between sources
- Tenant's 'Thank you!' (event 007) was auto-flagged as a response needing review but contains no substantive info.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine ticket NBL-017 at init. Landlord has not approved a contractor; they suggested a switch beside the hob. Outstanding: tenant confirming whether the fan works.

**2. What is the next action, who is it for, and through which channel?**

Email to tenant Clara (existing thread) asking her to try the switch and confirm; follow-up set for 2026-09-18.

**3. Does anything need a human decision, and why?**

No. It is routine and the safe step is to ask the tenant; no spend or authority is needed yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says fan has a separate switch right of hob. Waiting for tenant to… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-017","due_on":"2026-09-18","party":"Clara, tenant","purpose":"Chase tenant on whether the hob-side switch fixed the extra… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
