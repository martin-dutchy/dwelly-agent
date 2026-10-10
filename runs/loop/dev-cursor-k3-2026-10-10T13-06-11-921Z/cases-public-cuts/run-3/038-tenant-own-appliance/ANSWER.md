# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace the landlord's LG washer with their own. This isn't a repair and needs landlord consent. I asked the landlord, noted the terms, told the tenant, and set a follow-up for 30 July.

## Where the case stands
Intake. Landlord consent/decision requested (APR-101); tenant told; waiting on landlord, follow-up 2025-07-30.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own washer, who pays removal/fitting, fate of landlord's machine, or inspect first | Landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant consent is needed, nothing to be removed/bought yet, update by 30 July | Tenant | email | A3 ✅ |
| 3 | WAIT | Wait for landlord; chase 2025-07-30 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Tenant reports the LG washing machine (provided with the flat) has a power failure and says it can't be fixed (their own online research, not diagnosed). They offer to buy a replacement that stays their property and goes with them when they leave. Do you consent? Who pays to disconnect and remove the existing machine and fit the new one? What should happen to your machine (inspect/repair, dispose, or keep)? Or would you prefer we send our contractor to inspect/repair it first?
> 
> Options: Our contractor inspects the existing machine first (recommended, as the fault is undiagnosed); Consent to tenant's own machine; state who pays for removal/fitting and what happens to your machine; Decline tenant's machine and arrange your own repair/replacement

**A3 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for letting us know about the washing machine. Fitting your own machine needs the landlord's consent, so we've put your request to them, including that the new machine would stay yours and go with you when you leave. We've also asked who covers removing the old one and fitting the new one, and what happens to the existing machine. Please don't remove or buy anything until we confirm. A photo of the machine and any error code would help. We'll update you by 30 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here consents to the tenant's appliance or decides who pays
- Fault is not diagnosed; tenant's 'can't be fixed' is their own research
- No contractor assigned

## Remaining work
- Landlord decision (agency)
- Record decision, then contractor inspection or tenant-fit arrangements
- Follow-up 30 July

## Missing or unavailable information
- Landlord's consent and cost/disposal position
- Photo/error code from tenant

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, with no landlord decision yet. Outstanding: consent, who pays for removal and fitting, what happens to the landlord's machine, and a diagnosis.

**2. What is the next action, who is it for, and through which channel?**

The landlord has been asked for a decision through the agency landlord record. The tenant has been updated by email. The landlord follow-up is set for 30 July.

**3. Does anything need a human decision, and why?**

No human escalation is needed. The decision belongs to the landlord, and it has been requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"Tenant reports the LG washing… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace the landlord's LG washer with their own. Not a repair: needs landlo… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-038-tenant-own-appliance","due_on":"2025-07-30","party":"Landlord","purpose":"Chase landlord decision on tenant's own was… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
