# Case 014: Front Door Repair Request: ANSWER

**Decision:** escalated · **Severity:** urgent

The case was misclassified as an appliance fault when it is a front door that must be slammed to shut and may crack the glass. I reclassified it as a door repair with suggested urgent severity (verified note), and escalated to maintenance as ESC-101 because there are no tenant or landlord contacts on file to message or to book a contractor.

## Where the case stands
Ticket NBL-014-misclassified-door is at stage init. It was auto-classified as an Appliances issue (medium confidence, tenant Q&A unanswered). I reclassified it as a door/structural repair with suggested URGENT severity, and the note is verified. No tenant, landlord, or contractor contact is on file, so nobody has been contacted and no contractor is booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | ESCALATE_TO_HUMAN | Find the tenant and landlord contact details for Flat 12, 52 Meadow Row and the property's spend limit, then message the tenant with a 72-hour target and ask them to close the door gently until it is fixed. | Maintenance team (ESC-101) | internal | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Once contacts are confirmed, request landlord approval for a door contractor, then book a visit within 72 hours. | Landlord (to be identified) | email | A2 ✅ |

## Messages sent (verbatim)
_None._

## Escalation
- **P2 → maintenance** (verified): Front door at Flat 12, 52 Meadow Row needs a repair. It was misclassified as an appliance issue. The intake was a note with no tenant name or contact. We cannot contact the tenant or landlord or book a contractor without those details.
  - Known: Tenant reports the front door has to be slammed to shut, like the back door. A fridge engineer on site warned it could shatter the glass and said he would report it. No injury or immediate hazard is reported. Ticket NBL-014-misclassified-door is reclassified to door/structural with suggested URGENT severity (note verified on ticket). The property record has no tenancy, landlord, or contractor details.
  - Missing: Tenant name and contact details. Landlord identity, spend limit and preferred contractor. Whether the property is tenanted. The fridge engineer's name and report. The tenant's answers to the intake questions (fridge make/model, access, pets), which were not answered.
  - Options: Confirm the tenant and landlord contacts, then send the tenant a message: target visit within 72h, and ask them to avoid slamming the door meanwhile.; Ask the landlord to approve a door repair contractor, with the spend limit set by the landlord.; Ask the fridge engineer for his report on the glass.
  - Recommendation: Find the tenant and landlord contacts for Flat 12, 52 Meadow Row. Then treat as URGENT: contact the tenant with a 72h target, get landlord approval, and book a door contractor. Ask the tenant to close the door gently until it is fixed.
  - Deadline: 2024-06-09 (72 hours from today, 2024-06-06)

## What this does not establish
- The reclassification is a note only. It does not confirm the cause of the door problem, the glass damage, or who pays.
- No one has been told about the issue, and no appointment exists.
- The fridge engineer's report has not been obtained.

## Remaining work
- Identify the tenant and landlord, and confirm the property's tenancy status and spend limit (maintenance, ESC-101).
- Contact the tenant with the 72-hour target and the interim advice to close the door gently.
- Get landlord approval and book a door contractor within 72 hours.
- Obtain the fridge engineer's report if it was filed.

## Missing or unavailable information
- Tenant name and contact details
- Landlord identity and contact details
- Tenancy status (tenanted or void)
- Spend limit and preferred contractor
- Answers to the intake questions (fridge make/model, access, pets)

## Conflicts between sources
- The AI intake classified this as Appliances (routine) based on the fridge engineer's comment. The tenant's description is about a door, so I trusted the tenant's description over the classification.

## Answers to the case questions
**1. 1. Where does this case stand right now, and what is outstanding?**

Stage init. The case was misclassified as Appliances and is now reclassified as a door/structural repair with suggested URGENT severity. Outstanding: tenant and landlord contacts, landlord approval, a contractor visit within 72 hours, and the tenant's notice of the timescale.

**2. 2. What is the next action, who is it for, and through which channel?**

Maintenance (internal, ESC-101) must find the contacts. Then the tenant should be told by phone or email that the target is a visit within 72 hours and asked to close the door gently. The landlord should be asked for approval by email. No message has been sent yet because no contact details are on file.

**3. 3. Does anything need a human decision, and why?**

Yes, but only to supply missing contacts and landlord details, which the agent cannot find. Escalated as ESC-101 (P2). No emergency: no injury or hazard reported, and the door still works, so there is no emergency or gas/fire risk.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances (AI intake, medium confidence, Q&A unanswered) to DOOR / LOCKS-STRU… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Front door at Flat 12, 52 Meadow Row needs a repair. It was misclassified as an appliance is… | 1 | ✅ verified | ESC-101 found in the escalate_to_human log |

## Failed or unverified actions
_None._
