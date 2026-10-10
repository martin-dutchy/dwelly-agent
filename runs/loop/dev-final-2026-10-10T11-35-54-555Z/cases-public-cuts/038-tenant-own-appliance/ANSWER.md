# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reports a failed LG washing machine supplied with the flat and offers to replace it at own cost as their own removable property. This needs landlord consent, so I asked the landlord, told the tenant nothing is agreed, and put the job on hold to 29 July.

## Where the case stands
Intake stage, routine. Landlord consent requested (APR-101); ticket on hold until 2025-07-29. Tenant informed nothing is agreed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant replacing the provided LG washer at own cost, tenant-owned and removable, or choose own/our contractor | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant landlord consent is needed, nothing agreed, keep old machine, send photo/model label | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2025-07-29 | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord of Flat 9, 59 Alder Lane (landlord)** (verified)

> The tenant reports the LG washing machine (here at the start of the tenancy) has failed with a power fault and says it can't be repaired. They offer to buy a replacement at their own cost, which would remain their property and be removed when they leave. Do you consent? Or would you prefer to repair/replace it yourself, or have us send a contractor to inspect first?
> 
> Options: Consent to tenant replacing at own cost, tenant keeps and removes it at end of tenancy (recommended if the machine is confirmed beyond repair); Send our contractor to inspect/repair first; Landlord arranges own repair or replacement

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Thanks for letting us know about the washing machine. As it was provided with the flat, we need the landlord's agreement before you replace it, and before we agree that the new one stays yours and goes with you when you leave. We've asked them and will update you once we hear back. In the meantime, please don't dispose of the old machine. If you can, send us a photo of it showing any error code, and the make/model label. Nothing is agreed yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not give consent for the replacement or confirm the machine is beyond repair
- Does not establish who owns or pays for the existing machine
- No contractor assigned and no spend approved

## Remaining work
- Landlord decision; record it with record_landlord_decision when received
- Landlord contact is not on file: chase on second channel after review date, or find contact
- Record ownership/removal terms if consent given

## Missing or unavailable information
- Landlord contact details and name not in property record
- Photo/model label of the machine
- Landlord's stance on the appliance

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Landlord consent on the replacement and ownership is outstanding, plus a photo/model from the tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) to the landlord, and an email reply to the tenant on the existing thread; hold until 2025-07-29.

**3. Does anything need a human decision, and why?**

Not a human at the agency yet. The decision belongs to the landlord. Escalate only if the landlord cannot be contacted after the review date, since no landlord contact is on file.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord of Flat 9, 59 Alder Lane","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the LG was… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on tenant replacing provi… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
