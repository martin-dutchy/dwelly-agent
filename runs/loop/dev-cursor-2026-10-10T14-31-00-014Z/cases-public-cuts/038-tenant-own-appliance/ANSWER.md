# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace the landlord's broken LG washer with their own. This is an alteration needing landlord consent, not a standard repair. I asked the landlord for consent and for a decision on the old machine at their cost, logged a note, set a chase for 29 July and updated the tenant.

## Where the case stands
Intake stage. Waiting on landlord consent for the tenant's own washing machine and a decision on the existing LG. No contractor assigned, no visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own machine and decide handling of existing LG at landlord's cost | Landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant consent is being sought, not to remove the LG yet, and that we'll update by 29 July | Tenant | email | A4 ✅ |
| 3 | WAIT | Chase landlord on a second channel on 29 July if no reply | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports the LG washing machine (provided with the flat) has a power failure and, from their own web search, can't be repaired. They offer to buy their own replacement, which would remain their property and be taken with them when they leave. Do you consent to the tenant installing their own machine? And how do you want the existing machine handled (inspect/repair by us, disconnect and remove, or store), at your cost, not the tenant's?
> 
> Options: Consent to tenant's own machine; we arrange removal/disposal or storage of the existing LG at your cost (recommended once diagnosis confirms it is beyond repair); Have our contractor inspect the LG first, then decide; Decline the tenant's machine and arrange repair/replacement yourself
> 
> Update: No contractor assigned and no visit booked. The tenant's diagnosis is unverified. The tenant cannot be charged for removing the landlord's machine. Routine job; we will chase if no answer in 3 days.

**A4 · send_message → Tenant (tenant) via email, existing thread (event 001 tenant request)** (verified)

> Hi, thanks for letting us know about the washing machine. Fitting your own machine needs the landlord's consent, so we've asked them, and also how they want the existing LG removed or stored (that would be at their cost, not yours). Your machine would stay yours and you could take it with you when you leave. Please don't disconnect or remove the LG until we confirm. If you can, send a photo of the machine and any error code. We'll update you by 29 July at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the tenant's machine or any spend
- Tenant's diagnosis that the LG is unrepairable is unverified
- No contractor assigned or visit booked

## Remaining work
- Landlord decision on consent and LG disposal/storage (agency awaiting, chase 29 July)
- Then arrange removal/installation access and tell tenant

## Missing or unavailable information
- Landlord's decision
- Photo/error code of the machine
- Tenant's contact details not on file; used existing thread

## Conflicts between sources
- Intake summary calls it a 'Willow Maintenance' washing machine, while the tenant says it is an LG; treated as the same machine.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord consent to tenant's own machine and what to do with the existing LG; diagnosis unverified.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) via the agency landlord record; tenant updated by email on the existing thread; landlord chase set for 29 July.

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, who has been asked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the LG washing machine (provided wi… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace the landlord's LG washing machine with their own. Needs landlord co… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"due_on":"2025-07-29","purpose":"Chase landlord on second channel re consent to tenant's own washing machine and handling of existing LG","… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 tenant request)","ticket_ref":"… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Failed or unverified actions
_None._
