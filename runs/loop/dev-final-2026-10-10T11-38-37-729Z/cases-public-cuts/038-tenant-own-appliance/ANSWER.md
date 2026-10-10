# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reports the LG washing machine supplied with the flat is dead and offers to replace it at their own cost, keeping ownership. This is an alteration needing landlord consent, not a plain repair. I asked the landlord, told the tenant, and put the job on hold with a review date.

## Where the case stands
Intake stage; landlord consent requested, ticket on hold awaiting landlord until 2025-07-29. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant-owned replacement, or choose inspection/own arrangement | Landlord, Flat 9 | portal | A3 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant landlord consent is needed, asked them to keep old machine and send a photo/error code | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold awaiting landlord, review 2025-07-29 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord of Flat 9, 59 Alder Lane (landlord)** (failed)

> The tenant reports the LG washing machine supplied with the flat has a power failure and says it can't be repaired. They offer to buy a replacement at their own cost, which would remain their property and be removed when they leave. Do you consent to that, or would you prefer to repair/replace it yourself, or have us send our contractor to diagnose it first?
> 
> Options: Our contractor inspects the machine first (recommended, to confirm it is beyond repair); Consent to tenant replacing at own cost, tenant keeps and removes it at end of tenancy; Landlord arranges repair or replacement themselves

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for letting us know about the washing machine and for offering to replace it. Because the current machine came with the flat, we need the landlord's consent before you replace it, and to record that the new one is yours and can be taken with you when you leave. We have asked the landlord and will update you as soon as we hear. Please don't dispose of the old machine yet. In the meantime, a photo of the machine and any error code would help. Thank you.

**A3 · request_landlord_approval → Landlord of Flat 9, 59 Alder Lane (landlord)** (verified)

> The tenant reports the LG washing machine supplied with the flat has a power failure and can't be repaired. They offer to buy a replacement at their own cost, which would stay their property and be removed when they leave. Do you consent, or prefer to arrange repair/replacement yourself, or have our contractor inspect first?
> 
> Options: Our contractor inspects first (recommended); Consent to tenant replacing at own cost; tenant keeps and removes it; Landlord arranges repair or replacement

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the replacement or establishes ownership of the new machine
- No contractor assigned and no spend approved
- Landlord consent is not yet received

## Remaining work
- Landlord decision (agency chases after 2025-07-29)
- Record ownership/removal of the new machine once consented
- Tenant photo/error code outstanding

## Missing or unavailable information
- Landlord contact and spend limit not on property record
- Landlord decision
- Whether the machine is truly beyond repair (tenant's own Google diagnosis)

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Landlord consent is outstanding, as are the tenant's photo and error code, and confirmation of ownership terms.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-103) to the landlord, with a tenant email update sent. Hold set to review on 2025-07-29.

**3. Does anything need a human decision, and why?**

Only the landlord's decision, not an agency human. No escalation needed yet; escalate if the landlord stays silent after chasing.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord of Flat 9, 59 Alder Lane","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the LG was… | 1 | ❌ failed | APR-101 was returned but is not in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord of Flat 9, 59 Alder Lane","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the LG was… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord consent for tenant-owned replaceme… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
- A1: First approval request not applied; retried once, verified as A3
