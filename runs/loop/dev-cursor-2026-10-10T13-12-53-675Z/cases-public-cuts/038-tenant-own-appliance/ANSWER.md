# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace the landlord's broken LG washing machine with their own. This is a consent request, not yet a repair. I asked the landlord for consent and for who pays removal and fitting and what happens to their machine. I updated the tenant and put the ticket on hold with a review on 29 July.

## Where the case stands
Intake stage, routine. Landlord consent requested (APR-101); tenant informed; ticket on hold until 2025-07-29 waiting for landlord.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own replacement washing machine, who pays removal/fitting, and what to do with the landlord's machine | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant consent has been requested, not to remove the machine yet, send photo/error code, next update by 29 July | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2025-07-29 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Tenant reports the LG washing machine provided with the flat has a power failure and says it cannot be fixed (their own web research, not a diagnosis). They offer to buy a replacement at their own cost, which would remain their property and be removed when they leave. Do you consent? If so, who pays to disconnect and remove the existing machine and fit the new one, and what should happen to your machine (inspect/repair, dispose)? Alternatively we can send our contractor to inspect and quote.
> 
> Options: Consent to tenant's own replacement (tenant's item, not on inventory); tell us who pays for removal/fitting and what to do with your machine; Send our contractor to inspect and quote repair/replacement first; Arrange your own contractor

**A3 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Thanks for letting us know about the washing machine. Because the machine belongs to the landlord, replacing it with your own needs their consent, so we've put your offer to them, including that the new one would stay yours and go with you when you leave. We've also asked who covers removing the old machine and fitting the new one. Please don't remove the current one yet. If you can, send a photo of the machine and any error code. We'll update you by 29 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved; landlord consent not given
- Fault is undiagnosed (tenant's own web research)
- Does not decide who pays for removal/fitting or what happens to the landlord's machine

## Remaining work
- Landlord decision on consent, costs and disposal of existing machine (agency chases by 2025-07-29)
- Tenant photo/error code
- Note tenant's machine is theirs and not on inventory if consent given

## Missing or unavailable information
- Landlord decision
- Photo/error code of machine
- Whether any warranty/inventory entry exists for the machine

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord consent to the tenant's own replacement, who pays removal and fitting, and what happens to the landlord's machine. The fault is undiagnosed.

**2. What is the next action, who is it for, and through which channel?**

Landlord consent request (APR-101) to the landlord via the agency landlord record, and an email update to the tenant. Ticket on hold, review 2025-07-29.

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, which is already requested. A human is needed only if the landlord stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"Tenant reports the LG washing… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace landlord's LG washing machine with own; it stays theirs, not on inv… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord consent to tenant's own replacemen… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
