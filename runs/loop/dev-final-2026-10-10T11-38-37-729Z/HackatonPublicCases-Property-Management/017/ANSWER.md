# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord replied with a tip, not an approval: the fan runs from a switch to the right of the hob. I passed this to the tenant to try, acknowledged the landlord, and put the job on hold for the tenant's answer.

## Where the case stands
NBL-017 at intake/landlord gate. Landlord has not approved a contractor route; their reply (event 008) is a troubleshooting tip. On hold waiting for tenant confirmation, review 2026-09-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Asked Clara to try the switch right of the hob and say whether the fan works | Clara, tenant | email | A1 ✅ |
| 2 | OTHER | Acknowledged landlord's tip; said we will come back on contractor choice only if the fan still fails | Landlord | email | A2 ✅ |
| 3 | WAIT | Hold for tenant reply, review 2026-09-18 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Clara (tenant) via email, existing thread (event 007 email)** (verified)

> Hi Clara, the landlord says the extractor fan has its own switch, to the right-hand side of the hob, which needs to be switched on. Could you try that and let us know whether the fan now works? If it still doesn't, tell us and we'll arrange for someone to look at it. Thanks, Northbridge Lettings

**A2 · send_message → Landlord (landlord) via email, existing thread (event 008 email)** (verified)

> Thank you for the tip about the switch by the hob. We've passed it to the tenant to try. If the fan still doesn't work, we'll come back to you to ask whether you'd like us to send our contractor or use your own. No action is needed from you for now.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no spend approved
- The landlord's message is not approval or a route decision
- Does not establish the fan is working or the cause of the fault

## Remaining work
- Tenant to confirm result; if fixed, close without payment after telling landlord
- If still faulty, re-ask landlord for our-contractor or own-contractor decision (agency, on review 2026-09-18)

## Missing or unavailable information
- Whether the switch fixes the fan
- The picture attachment was unavailable and not seen

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine job at the landlord approval gate with no route chosen. The landlord says a separate switch by the hob must be on. Outstanding: the tenant's confirmation of whether this fixes the fan.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant (Clara) asking her to try the switch and report back, done as MSG-101. The landlord was acknowledged by email (MSG-102). Hold with review on 2026-09-18.

**3. Does anything need a human decision, and why?**

No. This is routine and is waiting on the tenant. If the fan is still faulty, the landlord is asked the contractor question again.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 008 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord advised fan runs from a separate switch right of hob. Waiting for … | 2 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Failed or unverified actions
- A3: Attempt 1 was NOT APPLIED; retried once and attempt 2 verified.
