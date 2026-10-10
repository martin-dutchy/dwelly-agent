# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's reply was troubleshooting advice, not a contractor decision. I recorded it as unclear, passed the tip to the tenant asking for confirmation, and put the job on hold to 18 Sept.

## Where the case stands
Ticket NBL-017 at intake/landlord gate; no contractor approved or assigned. On hold waiting for tenant to confirm whether the fan works using the hob-side switch; review 2026-09-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Passed on the landlord's tip about the switch right of the hob and asked if the fan now works | Clara, tenant | email | A1 ✅ |
| 2 | WAIT | Hold until 18 Sept for tenant confirmation; if still faulty, ask landlord a yes/no on our contractor | Clara, tenant | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Clara (tenant) via email, existing thread (event 007 email)** (verified)

> Hi Clara, the landlord says the extractor fan has a separate switch to the right-hand side of the hob, which needs to be switched on for the fan to run. Could you try that and let us know if the fan now works? If it still doesn't, we'll arrange for a contractor to look at it. We'll check back with you on 18 September.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Landlord's reply is not an approval of a contractor or spend
- Does not establish the fan works or that the switch is the cause

## Remaining work
- Tenant to confirm outcome; if fixed, close without payment and tell landlord; if not, request landlord approval for our contractor

## Missing or unavailable information
- Whether the fan works when the separate switch is on
- The picture attachment was unavailable and not seen

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate with no route approved. The landlord says the fan needs a separate switch by the hob turned on. Outstanding: the tenant confirming whether that fixes it.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant (sent) asking them to try the switch and report back; hold to 18 Sept.

**3. Does anything need a human decision, and why?**

No. It is routine, and only the landlord's decision on a contractor is needed if the fault persists.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `record_landlord_decision` | {"ticket_ref":"NBL-017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched … | 1 | ✅ verified | Ticket NBL-017 read back after record_landlord_decision |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says fan runs from a separate switch right of hob; not a contracto… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Failed or unverified actions
_None._
