# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's LG washing machine (present at move-in) has failed and they offer to replace it themselves. Ownership and consent are the landlord's decision, so I asked the landlord, told the tenant to wait, and put the job on hold.

## Where the case stands
Ticket at intake, now on hold waiting for landlord (review 2025-07-31). Tenant told to wait before buying.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to decide on tenant replacing the machine at own cost and keeping ownership | Landlord, Flat 9 | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant to hold off buying, landlord being asked, routine 14-day target | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until landlord replies; review 31 July | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord of Flat 9, 59 Alder Lane (landlord)** (verified)

> The LG washing machine that was in the flat at the start of the tenancy has reportedly failed (power failure, tenant says unrepairable). Is it a landlord-supplied appliance? Tenant offers to buy a replacement at their own cost, keep it as their property and take it when they leave. Do you agree, or would you rather repair/replace it yourself?
> 
> Options: Agree: tenant replaces at own cost, remains tenant's property, removed at end of tenancy (recommended if the machine is yours and you don't want to fund a replacement); Landlord arranges a contractor to inspect/repair or replace it; Decline tenant's offer

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Thanks for letting us know about the washing machine, and for offering to replace it. Please hold off buying one for now: as the machine was in the flat when you moved in, we need to check with your landlord first, including that the new one would stay yours and could be taken with you when you leave. We've asked them and will come back to you once we hear. This is a routine job, so we aim to have it moving within 14 days. In the meantime, if you can send a photo of the machine and any error code, that would help.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the machine is landlord-owned or who pays
- Does not agree the tenant may replace it or that the new machine stays theirs
- Does not book any contractor

## Remaining work
- Landlord decision (record with record_landlord_decision)
- Confirm machine ownership and agree in writing the new machine remains tenant's property
- Chase landlord on 2025-07-31

## Missing or unavailable information
- Landlord contact, spend limit and preferences not on property record
- Whether machine is listed on the inventory as landlord's

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine ticket at intake; landlord decision on the tenant's replacement offer is outstanding, as is confirmation of the machine's ownership.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) to the landlord via the approval route, and a tenant update by email on the existing thread; both done.

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, who has been asked; a human only needs to pick it up if the landlord does not reply by 31 July.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord of Flat 9, 59 Alder Lane","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The LG washing machine that w… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","ticket_ref":"NBL-038-tenant-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord decision on tenant replacing the L… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
