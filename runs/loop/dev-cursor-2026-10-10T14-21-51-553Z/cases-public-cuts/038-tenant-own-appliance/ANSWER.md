# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace the landlord's broken LG washer with their own. This is an alteration needing landlord consent, not a plain repair. I asked the landlord for a decision, noted the position, updated the tenant and set a 29 July follow-up.

## Where the case stands
Intake stage; ticket NBL-038 open, no contractor assigned. Waiting on landlord decision (APR-101), follow-up 29 July.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to choose: our contractor, their own, or consent to tenant's own machine, and who pays removal/fit and fate of the LG | Landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant landlord consent is needed, don't dispose of LG, send photo/error code, update by 29 July | Tenant | email | A3 ✅ |
| 3 | WAIT | Follow up with landlord on 29 July | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports the LG washing machine (provided with the flat) has a power failure and says it can't be fixed. They offer to buy a replacement themselves, which would stay their property and go with them when they leave. Please decide: (a) we send our contractor to inspect/repair your machine, (b) you arrange your own contractor, or (c) consent to the tenant's replacement on their terms.
> 
> Options: Our contractor inspects/repairs the existing machine (recommended first step); You arrange your own contractor; Consent to tenant fitting their own machine; please say who pays to disconnect and remove your LG and fit the new one, and what should happen to your LG (inspect, repair, dispose)
> 
> Update: Routine job, no contractor assigned yet. The tenant's own machine would not be on the inventory and would remain theirs. Please reply by 2025-07-29.

**A3 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hi, thanks for letting us know about the washing machine. Because the machine belongs to the landlord, we need their consent before you swap it for your own. We've asked them, including the point that your machine would stay yours and go with you when you leave, and who covers removing the old one. Please don't disconnect or dispose of the LG yet. If you can, send a photo of the machine and any error code. We'll update you by 29 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not approve the replacement or any spend
- Does not confirm the machine is unrepairable; that is the tenant's googled view
- Does not assign a contractor

## Remaining work
- Landlord decision (owner: landlord)
- Chase on 29 July (agency)
- Tenant photo/error code

## Missing or unavailable information
- Landlord decision
- Landlord contact details not shown
- Machine age/warranty
- Tenant photo and error code

## Conflicts between sources
- Intake says 'Willow Maintenance washing machine'; tenant says LG. Treated as the same landlord-supplied appliance.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake. The landlord decision is outstanding, including who pays for removal and fitting and what happens to the LG. The tenant's photo/error code is also outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request sent via the agency landlord record. Tenant emailed on the existing thread. Follow-up set for 29 July.

**3. Does anything need a human decision, and why?**

Only the landlord's decision, which is requested. No escalation to agency staff is needed because the job is routine.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the LG washing machine (provided wi… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace landlord's LG washer with their own. This needs landlord consent (a… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-038-tenant-own-appliance","due_on":"2025-07-29","purpose":"Chase landlord decision on washing machine replacement","party… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
