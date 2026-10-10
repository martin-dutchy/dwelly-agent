# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant wants to replace the landlord's broken washer with their own. This is a consent matter, not a repair. I asked the landlord for consent and for decisions on the old machine and costs, told the tenant, noted the record and put the job on hold to 30 July.

## Where the case stands
Intake, routine. On hold waiting for landlord to consent/decide; review 2025-07-30. Tenant informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to consent to tenant's own washer, decide on existing machine and who pays removal/fitting | Landlord | portal | A5 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant consent is needed, not to dispose of machine, update by 30 July | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold awaiting landlord until 2025-07-30 | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (landlord)** (failed)

> The tenant of Flat 9, 59 Alder Lane reports the landlord's LG washing machine (there when they moved in) has stopped with a power failure; they say it can't be repaired (own web research, not confirmed by an engineer). They offer to buy a replacement at their own cost, which would remain their property and be taken with them when they leave. Please tell us: (1) do you consent to the tenant's own machine being installed; (2) what should happen to your existing machine (inspect/repair, remove, dispose); (3) who pays to disconnect and remove it and fit the new one; or would you prefer we send our contractor to inspect and repair/replace it?
> 
> Options: Consent to tenant's own machine, tenant's property and removed at end of tenancy; advise on disposal of existing machine and who pays for removal/fitting; Agency contractor inspects the existing machine first (landlord approval to instruct); Landlord arranges their own contractor or replacement

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for letting us know about the washing machine. Fitting your own machine needs the landlord's consent, so we've put your offer to them, including that it would stay yours and go with you when you leave. We've also asked what should happen to the current machine and who covers removal and fitting. Please don't remove or dispose of the current machine until we confirm. If you can, send a photo of the machine and any error code. We'll update you by 30 July.

**A5 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant of Flat 9, 59 Alder Lane says the landlord's LG washing machine has a power failure (their own research, unconfirmed). They offer to buy a replacement at their cost, remaining their property and removed when they leave. Please advise: (1) consent to the tenant's machine; (2) what to do with the existing machine; (3) who pays to disconnect/remove and fit.
> 
> Options: Consent to tenant's own machine; advise on existing machine and costs; Agency contractor inspects first; Landlord arranges own contractor

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing approves the tenant's appliance or any spend
- Fault diagnosis is the tenant's own and unconfirmed
- No contractor assigned

## Remaining work
- Landlord decision on consent, existing machine, costs (agency, review 30 July)
- Then inform tenant and close or arrange work

## Missing or unavailable information
- Landlord's decision
- Photo/error code of machine

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Landlord consent and decisions on the existing machine and costs are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-104) via the agency landlord record; tenant updated by email on the existing thread.

**3. Does anything need a human decision, and why?**

No human escalation; the decision belongs to the landlord, who has been asked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant of Flat 9, 59 Alder Lane reports the landlo… | 1 | ❌ failed | APR-101 was returned but is not in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","body":"Hello, thanks for let… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-038-tenant-own-appliance","note":"Tenant wants to replace the landlord's LG washer with own machine. Not a repair; needs land… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Awaiting landlord consent to tenant's own washing ma… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |
| A5 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"Tenant of Flat 9, 59 Alder Lane says the landlord's LG… | 1 | ✅ verified | APR-104 found in the request_landlord_approval log |

## Failed or unverified actions
- A1: First approval request not applied; retried once, verified as A5
