# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reports failed LG washing machine and wants to replace it with their own. This needs landlord consent and an ownership check, so I asked the landlord, told the tenant to wait, and put the ticket on hold until 30 July.

## Where the case stands
Intake stage; ticket on hold waiting for landlord until 2025-07-30. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether the machine is theirs and whether they consent to the tenant's own replacement or prefer to repair/replace | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant not to buy/install yet, landlord consent needed, update by 30 July, request photos | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2025-07-30 for landlord reply | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> Tenant reports the LG washing machine at Flat 9, 59 Alder Lane has failed (power failure) and says it was there when they moved in. They offer to buy a replacement at their own cost, which would remain their property and be removed when they leave. Please confirm (1) whether the machine is yours, and (2) whether you consent to the tenant installing their own machine, or whether you prefer to repair/replace it yourself.
> 
> Options: Consent to tenant replacing with their own machine (tenant owns and removes it; old unit disposed of); Landlord repairs or replaces via our contractor (please give a spend cap); Landlord arranges own contractor/replacement

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001 request)** (verified)

> Hello, thanks for letting us know about the washing machine and for offering to replace it. Please don't buy or install a new one yet: a replacement machine needs the landlord's consent, and we also need to check whether the current LG belongs to the landlord. We've asked them and will update you by 30 July. If you can, please send a photo of the machine, its model label and any error code. Meanwhile, please leave the old machine unplugged.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No consent given to the replacement; ownership of the old machine is not established
- No contractor assigned and no spend approved
- Tenant's own appliance is not a repair

## Remaining work
- Landlord decision on ownership/consent (agency chases after 30 July)
- Record ownership and removal of tenant's machine if consented
- Tenant to send photos/model label

## Missing or unavailable information
- Who owns the existing LG machine
- Landlord's decision
- Tenant photos and error code

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord's view on ownership of the machine and consent to a tenant-owned replacement, plus tenant photos.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) to the landlord via agency record; update to tenant by email; hold with review 2025-07-30.

**3. Does anything need a human decision, and why?**

No human escalation. The decision is the landlord's, and has been requested.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"Tenant reports the LG washing… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 request)","ticket_ref":"NBL-038… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord: ownership of LG washer and consen… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
