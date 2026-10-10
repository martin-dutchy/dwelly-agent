# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace the landlord's broken LG washer with their own. This needs landlord consent and is not a plain repair. I asked the landlord, told the tenant to hold off, noted the record and set a follow-up for 29 July.

## Where the case stands
Intake stage. Waiting on landlord for consent to tenant's own washing machine and decision on the existing LG. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own machine and decide what happens to the existing LG | Landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant landlord consent is needed, not to buy or disconnect yet, ask for photo/error code, next update 29 July | Tenant | email | A3 ✅ |
| 3 | WAIT | Follow up with landlord by 2025-07-29 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the landlord's LG washing machine (there when they moved in) has a power failure and they believe it can't be repaired (their own web research, not diagnosed). They offer to buy a replacement that would remain their property and be taken with them when they leave. Do you consent? And what should happen to the existing machine (inspect/repair, remove, dispose, store), and may the tenant's machine stay connected? Any disconnection, removal or fitting would be at your cost, not the tenant's.
> 
> Options: Consent to tenant's own machine, landlord's machine removed/stored at landlord's cost (recommended if repair not worthwhile); Send our contractor to inspect/repair the existing LG first; Landlord arranges own contractor or replacement; Decline tenant's own machine
> 
> Update: No contractor assigned and no spend committed. Job is routine. Please reply by 2025-07-29.

**A3 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for letting us know about the washing machine. Because the machine belongs to the landlord, and you'd like to bring in your own, we need the landlord's consent first. We've asked them, including what should happen to the existing machine; we've noted that your new machine would stay yours and go with you when you leave. Please don't buy or disconnect anything until we confirm. You can't be asked to pay to remove or dispose of the landlord's machine. If you can, send a photo of the machine and any error code, as it helps us check it's really beyond repair. We'll update you by 29 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not establish that the machine is beyond repair (tenant's own research)
- Does not grant consent for the tenant's machine or commit any spend
- No contractor assigned

## Remaining work
- Landlord decision (agency, review 2025-07-29)
- Tenant photo/error code
- Record landlord decision when it arrives

## Missing or unavailable information
- Landlord consent and instructions for existing machine
- Photo/error code of the fault

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, nothing decided. Outstanding: landlord consent to the tenant's own machine, what happens to the existing LG, and the fault diagnosis (photo/error code).

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request sent via the agency landlord record, and a tenant email reply on the existing thread; follow-up set for 29 July.

**3. Does anything need a human decision, and why?**

Only the landlord's decision (consent to an alteration/own appliance). No agency human escalation needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"Tenant reports the landlord's LG washing machine (ther… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace landlord's LG washer with own machine (remains tenant's, not on inv… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-038-tenant-own-appliance","due_on":"2025-07-29","party":"Landlord","purpose":"Chase landlord on consent to tenant's own w… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
