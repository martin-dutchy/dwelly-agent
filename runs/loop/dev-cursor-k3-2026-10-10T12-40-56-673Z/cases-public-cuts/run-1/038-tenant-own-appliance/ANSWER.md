# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant says the landlord's LG washer has failed and wants to replace it with their own machine. This needs landlord consent, so I asked the landlord about consent, the old machine and costs, told the tenant, noted the ticket and put it on hold to 30 July.

## Where the case stands
Intake stage, routine. Landlord consent requested (APR-101); ticket on hold until 2025-07-30. Tenant informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own washer, decide fate of old machine and who pays removal/fitting, or choose our contractor inspection | Landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant consent is needed, keep old machine in place, send photo, next update by 30 July | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2025-07-30 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports the landlord's LG washing machine (there when they moved in) has stopped working with a power failure; they say it can't be repaired (their own web search, not diagnosed). They offer to buy a replacement at their own cost, which would remain their property and be taken with them when they leave. This needs your consent. Please tell us: (1) do you consent to the tenant fitting their own machine; (2) what should happen to your existing machine (we inspect/repair, dispose, or you collect it); (3) who pays to disconnect and remove the old machine and fit the new one; (4) or would you prefer we send our contractor to inspect and repair/replace yours?
> 
> Options: Send our contractor to inspect the existing machine first (recommended, as the fault is undiagnosed); Consent to tenant's own machine, tenant-owned and not on the inventory; say what happens to the old machine and who pays for removal/fitting; Landlord arranges own contractor or replacement

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Thanks for letting us know about the washing machine. We've logged it as a routine job. Fitting your own machine needs the landlord's consent, so we've asked them, and we've noted that a machine you buy stays yours and goes with you when you leave. We've also asked what should happen to the existing machine and who covers removal and fitting. Please don't remove or dispose of the old machine until we confirm. If you can, send a photo of the machine and any error code. We'll update you by 30 July at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the replacement, assigns a contractor or confirms the fault is unrepairable
- Tenant ownership of a new machine is the tenant's claim, pending landlord consent

## Remaining work
- Landlord decision on consent, old machine, costs (agency, review 30 July)
- If declined/prefers repair: assign contractor after approval
- Close when resolved

## Missing or unavailable information
- Landlord decision
- Photo/error code from tenant
- Confirmed diagnosis

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord consent/decision, fate of old machine, who pays removal and fitting, and an undiagnosed fault.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) to the landlord via the agency landlord record; tenant update by email; hold to 2025-07-30.

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, who has been asked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the landlord's LG washing machine (… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant requests to replace landlord's LG washer with their own. Tenant's machine stays thei… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on tenant's own washing m… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
