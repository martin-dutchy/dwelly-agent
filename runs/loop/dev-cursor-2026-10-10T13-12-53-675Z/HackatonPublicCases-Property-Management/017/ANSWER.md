# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord answered with a tip (a switch by the hob) rather than approving a contractor. I recorded it as not an approval, passed the tip to the tenant, asked the landlord for a route decision if it fails, and held the job to 2026-09-18.

## Where the case stands
Ticket NBL-017 at landlord approval gate. Landlord replied with a troubleshooting tip, not an approval. On hold until 2026-09-18 awaiting tenant's result.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Asked tenant to try the switch right of the hob and report back by 2026-09-18 | Clara, tenant | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Thanked landlord and asked for contractor route decision by 2026-09-18 if fan still fails | Landlord | email | A3 ✅ |
| 3 | WAIT | Hold until 2026-09-18 for tenant's result | Clara, tenant | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Clara (tenant) via email, existing thread (event 007 email)** (verified)

> Hi Clara, the landlord says there is a switch to the right-hand side of the hob that needs to be switched on for the extractor fan to work. Could you try that and let us know if the fan then works? If it still doesn't, tell us and we'll carry on arranging a repair. We'll check back with you by 2026-09-18.

**A3 · send_message → Landlord (landlord) via email, existing thread (event 008 email)** (verified)

> Thank you for the tip about the switch by the hob. We've passed it to the tenant to try. If the fan still doesn't work, please can you confirm by 2026-09-18 whether you'd like us to send our contractor, or you'll arrange your own? We won't book anyone until you confirm.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Landlord's message does not approve a contractor or spend
- No contractor assigned or visit booked
- Does not establish the fan is fixed or the cause

## Remaining work
- Tenant to confirm result; if fixed close without payment
- If not fixed, landlord to choose contractor route; agency then assigns or records own contractor

## Missing or unavailable information
- Tenant's result after trying the switch
- Landlord's contractor decision
- Tenant's attached picture was unavailable and not seen

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine job at the landlord gate with no approval. The landlord suggested a switch by the hob. Outstanding: whether that fixes the fan, and the landlord's contractor decision if not.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant (Clara) to try the switch and report back, and email to the landlord asking for a contractor decision by 2026-09-18 if it still fails. Both sent.

**3. Does anything need a human decision, and why?**

No. This is routine and is waiting on the tenant and the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched … | 1 | ✅ verified | Ticket NBL-017 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","body":"Hi Clara, the la… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 008 email)","body":"Thank you f… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Waiting for tenant to confirm whether the switch by the hob fixes the fan; … | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Failed or unverified actions
_None._
