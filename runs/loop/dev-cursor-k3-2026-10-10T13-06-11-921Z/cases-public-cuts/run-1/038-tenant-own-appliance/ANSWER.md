# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace a broken landlord-owned LG washing machine with their own, which stays theirs. This needs landlord consent, so I asked the landlord, noted the record, told the tenant and put the job on hold to 29 July.

## Where the case stands
Intake stage, on hold waiting for landlord (review 2025-07-29). Tenant told; no contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own replacement, who pays removal/fitting, and what happens to the old LG machine | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant consent is being sought, not to dispose of old machine, send photo/error code, next update by 1 Aug | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2025-07-29 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> The tenant reports the landlord's LG washing machine (there when they moved in) has a power failure and says it can't be repaired (their own web research, not confirmed by an engineer). They offer to buy a replacement at their own cost; it would remain their property, not on the inventory, and they would take it when they leave. Do you consent to this? Please also tell us who pays to disconnect and remove the old machine and fit the new one, and what should happen to the old machine (inspect, repair or dispose). Alternatively we can send our contractor to inspect it.
> 
> Options: Consent to tenant's own replacement (tenant's machine stays theirs); say who pays for removal/disposal of the old one and fitting; Send our contractor to inspect/repair the landlord's machine first; Arrange your own contractor

**A3 · send_message → Tenant (tenant) via email, existing thread (event 001 tenant request)** (verified)

> Thanks for letting us know about the washing machine. Because the current one belongs to the landlord, we need their consent before you replace it. We've passed on your offer, including that the new machine would be yours and you'd take it with you when you leave, and asked who covers removing the old one and fitting the new one. Please don't disconnect or dispose of the old machine yet. If you can, send a photo of the machine and any error code. We'll update you by 1 August, or sooner if the landlord replies.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking does not grant consent for the replacement or settle who pays
- The machine's fault is the tenant's own unverified diagnosis
- No contractor assigned or visit booked

## Remaining work
- Await landlord decision; then record it and update tenant
- Agree who pays removal/fitting and fate of landlord's machine

## Missing or unavailable information
- Landlord decision
- Photo/error code of the machine

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord consent to the tenant's own machine, who pays removal and fitting, and what happens to the old machine.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) to the landlord via the agency record; the tenant has been updated by email; the job is held to 2025-07-29.

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, who has been asked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the landlo… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants own replacement washing machine: needs landlord consent, not a standard repair… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 tenant request)","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord consent to tenant's own replacemen… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
