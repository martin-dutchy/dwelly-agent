# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord replied only with a tip that a separate switch by the hob must be on, not a contractor decision. I recorded it as unclear, asked the tenant to try the switch, asked the landlord for a yes/no on our contractor if it still fails, and put the job on hold to 18 Sept.

## Where the case stands
Landlord approval gate; no route authorised. Landlord's reply is a troubleshooting tip, not approval. Waiting on tenant to test the switch; review 2026-09-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant to try the switch right of the hob and report back | Clara, tenant | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord yes/no whether our contractor may attend if the fan still fails | Landlord | email | A3 ✅ |
| 3 | WAIT | Hold until 2026-09-18 for tenant's answer | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Clara (tenant) via email, existing thread (event 007 email)** (verified)

> Hi Clara, the landlord says the extractor fan has its own switch to the right-hand side of the hob, which needs to be switched on. Could you try that and let us know whether the fan then works? If it still doesn't, we'll take the repair forward. We'll check back with you by 18 September.

**A3 · send_message → Landlord (landlord) via email, existing thread (event 008 email)** (verified)

> Thank you for the tip about the switch by the hob. We've passed it to the tenant to try. If the fan still doesn't work, please can you confirm yes or no: may we send our contractor to look at it?

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no spend approved.
- The landlord's switch tip is their claim; not confirmed as the cause.
- Does not establish the fan is faulty.

## Remaining work
- Tenant to confirm result of switch
- Landlord yes/no on contractor if still faulty
- Review 2026-09-18

## Missing or unavailable information
- Tenant's result after trying the switch
- Landlord's contractor decision
- Tenant's attached picture was unavailable and not seen

## Conflicts between sources
- A1 returned a timeout error but read-back showed the change in place; treated as applied.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate with no approval. The landlord's reply suggests a user-side switch. Outstanding: tenant's test result and a landlord decision if the fan still fails.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant asking her to try the switch (MSG-101), and email to the landlord asking for a yes/no on our contractor (MSG-102).

**3. Does anything need a human decision, and why?**

No. This is routine and is waiting on the tenant and landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched … | 1 | ✅ verified | Ticket NBL-017 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","body":"Hi Clara, the la… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 008 email)","body":"Thank you f… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Waiting for tenant to confirm whether the fan works using the separate swit… | 2 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Failed or unverified actions
- A4: First attempt not applied; retried once and verified.
