# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reports a failed LG washing machine present at move-in and offers to replace it with their own. This needs landlord consent, so I asked the landlord, told the tenant to wait, and put the job on hold to 29 July.

## Where the case stands
Intake stage; landlord consent requested (APR-101), ticket on hold until 2025-07-29; tenant informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether machine is theirs and whether tenant may replace it with their own appliance | Landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant not to dispose/buy yet, consent pending, asked for photo, next update 29 July | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2025-07-29 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the LG washing machine (there when they moved in) has failed and says it cannot be fixed. They offer to buy a replacement at their own cost, which would remain their property and be removed when they leave. Is the existing machine yours (included in the tenancy)? Do you consent to the tenant replacing it on those terms, or would you rather repair/replace it yourself?
> 
> Options: Consent: tenant buys replacement at own cost, owns it and takes it when leaving; old machine removed/disposed of; Landlord repairs or replaces the machine (our contractor); Landlord arranges their own contractor/replacement

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Thanks for letting us know about the washing machine, and for offering to replace it. Because the machine was in the flat when you moved in, we need the landlord's consent before anything changes, so please don't dispose of it or buy a replacement just yet. We've asked the landlord whether they agree to you fitting your own machine (which you would own and take with you) or would rather deal with it themselves. If you can, please send a photo of the machine and any error code. We'll update you by 29 July.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the replacement or establishes who owns the existing machine
- No contractor assigned and no spend approved
- Tenant's claim the machine is unrepairable is unverified

## Remaining work
- Landlord decision on ownership and consent; agency to chase on 2025-07-29
- Record ownership/removal terms of any tenant-owned appliance
- Arrange removal of old machine if applicable

## Missing or unavailable information
- Whether the washing machine is landlord-owned
- Landlord's decision
- Photo/error code from tenant

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord decision on ownership of the machine and consent to a tenant-owned replacement.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request sent (APR-101) to the landlord via the agency record; tenant updated by email on the existing thread; hold set with review 2025-07-29.

**3. Does anything need a human decision, and why?**

Only the landlord's decision, which has been requested. No escalation to agency staff needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"Tenant reports the LG washing machine (there when they… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on whether the machine is… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
