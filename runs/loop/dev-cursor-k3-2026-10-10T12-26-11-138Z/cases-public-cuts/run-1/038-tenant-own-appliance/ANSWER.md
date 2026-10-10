# Case 038: Washing Machine Replacement Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reports a broken LG washing machine and offers to replace it with their own. This needs landlord consent because it is an appliance replacement or alteration, not a straightforward repair. I asked the landlord, told the tenant not to buy yet, and put the ticket on hold to 30 July.

## Where the case stands
Intake stage, routine. Ticket on hold waiting for landlord (review 2025-07-30). No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm machine ownership and consent to tenant's own replacement, or choose repair/replace | Landlord | portal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant landlord consent is needed, not to buy yet, asked for photo/error code, update by 30 July | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2025-07-30 for landlord reply | Landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Landlord (agency landlord record) (landlord)** (verified)

> The tenant reports the LG washing machine at Flat 9, 59 Alder Lane has a power failure and says it can't be repaired (their own online research, not confirmed). It was there when they moved in. Please confirm whether it is your appliance. The tenant offers to buy a replacement at their own cost, which would stay their property and be removed when they leave. Do you consent to that, or would you prefer to repair or replace it yourself?
> 
> Options: Consent to tenant replacing with their own machine (tenant owns it and removes it at the end of the tenancy; old machine removed/disposed of); Landlord repairs or replaces the machine using our contractor; Landlord arranges their own contractor/replacement; Decline

**A2 · send_message → Tenant (tenant) via email, existing thread (event 001)** (verified)

> Hello, thanks for letting us know about the washing machine, and for offering to replace it. Because the machine was already in the flat, we need the landlord's agreement before a replacement goes in, and to confirm whether the old one is theirs. We've asked them today. Nothing is agreed yet, so please hold off buying until you hear from us. In the meantime, a photo of the machine and any error code would help. We'll update you by 30 July at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved; asking the landlord does not establish who owns the machine or that it is beyond repair
- Tenant's 'can't be fixed' is their own Google finding, unverified
- No cost responsibility decided

## Remaining work
- Landlord decision on ownership/consent/repair (agency, review 30 July)
- Record decision, tell tenant; if consented, record that the tenant owns the new machine and removes it at move-out, and arrange old machine removal
- Chase landlord on a second channel if no reply

## Missing or unavailable information
- Whether the machine is the landlord's
- Landlord's decision
- Photo/error code from tenant

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, routine. Outstanding: landlord confirmation of ownership and consent or repair decision, and tenant photo/error code.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (A1) to the landlord via the agency record; tenant told by email (A2); hold to 30 July (A3).

**3. Does anything need a human decision, and why?**

No human escalation. The decision belongs to the landlord, who has been asked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Landlord (agency landlord record)","ticket_ref":"NBL-038-tenant-own-appliance","decision_needed":"The tenant reports the LG was… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","body":"Hello, thanks for let… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-038-tenant-own-appliance","reason":"Waiting for Landlord","comment":"Waiting for landlord to confirm ownership of the mac… | 1 | ✅ verified | Ticket NBL-038-tenant-own-appliance read back after put_on_hold |

## Failed or unverified actions
_None._
