# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace the broken landlord-supplied LG washing machine with their own. This needs landlord consent, so I asked the landlord, noted the case, put the job on hold to 30 July and updated the tenant.

## Where the case stands
Intake stage; no landlord decision. Job on hold waiting for landlord until 2025-07-30. Tenant informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked landlord to consent to tenant's own replacement machine, who pays removal/fitting, and what happens to the existing LG | Landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant consent is being sought, not to replace yet, asked for photo/error code, next update by 30 July | Tenant | email | A4 ✅ |
| 3 | WAIT | Hold until 2025-07-30 for landlord reply | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> The tenant reports the LG washing machine (here when they moved in) has a power failure and, by their own googling, can't be fixed. They offer to buy a replacement at their own cost; it would remain theirs, not part of the property, and they would take it when they leave. Do you consent? If so, who pays to disconnect and remove the existing machine and to fit the new one? What should happen to your LG machine (inspect, repair, dispose)? Or would you prefer we send our contractor, or arrange your own? Please reply by 2025-07-30.
> 
> Options: Consent to tenant's own replacement (state who pays for removal and fitting, and what happens to the old machine); Send our contractor to inspect/repair the existing machine; Landlord arranges own contractor

**A4 · send_message → Tenant (tenant) via email, existing thread (event 001 tenant request)** (verified)

> Hi, thanks for letting us know about the washing machine. Fitting your own machine needs the landlord's consent, so we've asked them. We've noted that the new machine would stay yours and you'd take it with you when you leave. We've also asked who covers disconnecting the old one and fitting the new one, and what happens to the existing LG. Please don't remove or replace it until we confirm. If you can, send a photo of the machine and any error code. We'll update you by 30 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms landlord consent, who pays, or that the machine is beyond repair (tenant's googling only).
- No contractor assigned and no spend approved.

## Remaining work
- Landlord decision on consent, payment, and fate of old LG (agency, review 2025-07-30)
- Chase landlord on a second channel if no reply by review date
- Tenant photo/error code

## Missing or unavailable information
- Landlord's decision
- Whether the LG is landlord's inventory item
- Photo/error code

## Conflicts between sources
- Intake classed it as a repair, but the tenant wants to replace it with their own appliance, which needs landlord consent.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord consent to the tenant's own machine, who pays removal and fitting, and what happens to the existing LG.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) to the landlord via the agency landlord record, and an update to the tenant by email. Hold until 2025-07-30.

**3. Does anything need a human decision, and why?**

Not from agency staff. The decision belongs to the landlord, because it concerns their appliance and consent to the tenant's own. No escalation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the LG washing machine (here when t… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace with own washing machine: needs landlord consent, not a repair. Ten… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Landlord consent to tenant's own replacement washing… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |
| A4 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 tenant request)","ticket_ref":"… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
