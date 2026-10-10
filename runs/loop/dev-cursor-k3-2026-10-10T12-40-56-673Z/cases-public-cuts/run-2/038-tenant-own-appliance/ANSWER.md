# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant says the landlord's LG washer has failed and offers to replace it with their own machine. That needs landlord consent, so I asked the landlord for consent and for decisions on the old machine and on who pays removal and fitting. I told the tenant and put the job on hold until 2025-07-30.

## Where the case stands
Intake stage, on hold waiting for landlord (review 2025-07-30). No contractor assigned, no spend.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own machine and decide on the old LG and who pays removal/fitting | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant consent is being sought, not to remove the old machine yet, next update by 2025-07-30 | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply until 2025-07-30 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports the landlord's LG washing machine (there when they moved in) has failed with a power fault and says it can't be fixed (their own web research, not confirmed by an engineer). They offer to buy a replacement themselves, which would remain their property and be taken with them when they leave. Please tell us: (1) do you consent to the tenant installing their own machine; (2) what should happen to the existing LG (inspect/repair, dispose, or keep); (3) who pays to disconnect and remove the old machine and fit the new one; or (4) whether you would rather we send our contractor to inspect/repair it, or arrange your own.
> 
> Options: Consent to tenant's own machine; state who pays for removal of the old one and fitting, and what happens to the old LG; Our contractor inspects the LG first and quotes repair or replacement; You arrange your own contractor or replacement

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Thanks for letting us know about the washing machine. Fitting your own machine needs the landlord's consent, so we've put your offer to them, including that it would stay yours and go with you if you move. We've also asked what should happen to the current LG and who covers removing it and fitting the new one. Please don't disconnect or remove the old machine until we confirm. If you can, send a photo of the machine and any error code. We'll update you by 2025-07-30 at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the tenant's appliance or any spend
- The machine's fault is the tenant's own diagnosis, unconfirmed
- The landlord's contact route is the agency record; no reply is yet seen

## Remaining work
- Landlord decision on consent, old LG, and costs (owner: landlord/agency)
- Review 2025-07-30; chase landlord on a second channel if silent
- Then tell the tenant the outcome

## Missing or unavailable information
- Landlord decision
- Photo or error code of machine
- Whether the LG is landlord-owned on inventory

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. It is not a plain repair: the tenant proposes replacing the landlord's washer with their own. Landlord consent and the disposal of the old LG and costs are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request sent via the agency landlord record (A1). Tenant updated by email (A2). Hold until 2025-07-30 (A4).

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, who has been asked. Escalate only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the landlord's LG washing machine (… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","body":"Thanks for letting us… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace landlord's LG washer with own machine. Not a repair; needs landlord… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord consent for tenant's own washing m… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
