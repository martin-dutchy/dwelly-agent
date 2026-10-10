# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace the landlord's broken LG washer with their own. This needs landlord consent, so I asked the landlord, noted the ticket, told the tenant what happens next, and set a follow-up for 29 July.

## Where the case stands
Intake stage. Waiting on landlord consent for the tenant's own replacement washing machine. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own replacement and say who pays removal/fitting and what happens to their machine | Landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant consent is being sought, not to remove the old machine, and send a photo; next update by 29 July | Tenant | email | A3 ✅ |
| 3 | WAIT | Chase landlord on 2025-07-29 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports the LG washing machine (here when they moved in) has a power failure and, from their own web search, can't be fixed. They offer to buy a replacement at their own cost, which would stay their property and go with them when they leave; it would not be on the inventory. Do you consent? If so, who pays to disconnect and remove the existing machine and fit the new one, and what should happen to your machine (inspect, repair, or dispose)? Alternatively, we can send our contractor to inspect and repair/replace it.
> 
> Options: Consent to tenant's own replacement (tenant's item stays theirs); tell us who pays removal/fitting and what to do with your machine; Send our contractor to inspect first; You arrange your own contractor

**A3 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for letting us know about the washing machine. Because the current machine belongs to the landlord, we need their consent before you swap it for your own. We've asked them, and put your terms to them: the new machine would be yours and you'd take it when you leave. We've also asked who covers removing the old one and fitting yours. Please don't remove the old machine yet. If you can, send a photo of the machine and any error code. We'll update you once the landlord replies, or by 29 July at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking does not mean consent is given or that the landlord will pay anything
- The machine's fault is only the tenant's own web diagnosis, not verified
- No contractor assigned, no work approved

## Remaining work
- Landlord decision on consent, cost of removal/fitting, and fate of their machine (agency, chase 29 July)
- Record decision, then update tenant
- Add note that tenant's machine stays theirs, off inventory

## Missing or unavailable information
- Landlord's decision
- Photo/error code of machine
- Actual fault diagnosis

## Conflicts between sources
- The intake classed this as a routine appliance repair, but the tenant is really asking to swap in their own appliance. I handled it as a landlord-consent request.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, with nothing decided. Outstanding: landlord consent, who pays removal and fitting, and what happens to the landlord's machine.

**2. What is the next action, who is it for, and through which channel?**

The consent request has gone to the landlord (APR-101, via the agency landlord record). The tenant has been updated by email on the existing thread.

**3. Does anything need a human decision, and why?**

Not an agency human. The landlord must decide on consent and cost because the machine is theirs. No escalation is needed yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the LG washing machine (here when t… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `update_ticket` | {"ref":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace landlord's LG washer with own; needs landlord consent, not a repair ye… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back at stage init |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","body":"Hello, thanks for let… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-038-tenant-own-appliance","due_on":"2025-07-29","party":"Landlord","purpose":"Chase landlord decision on tenant's own was… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
