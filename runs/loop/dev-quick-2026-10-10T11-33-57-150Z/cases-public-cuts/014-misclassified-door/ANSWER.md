# Case 014: Front Door Repair Request: ANSWER

**Decision:** escalated · **Severity:** urgent

The front-door report was misfiled by intake as a routine appliance issue. It has been reclassified as an urgent door/glazing job, the tenant has been advised on safe use and given next steps, and an escalation (ESC-102) is open because no landlord is on record to approve the repair.

## Where the case stands
Intake. The ticket NBL-014-misclassified-door is at init with no landlord approval and no contractor. The AI intake filed it under Appliances, but the report is about the front door. It has been reclassified to door/glazing and urgent. The tenant has been messaged, and an escalation (ESC-102) is open to identify the landlord and get approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | OTHER | Reclassified the ticket to door/glazing, urgent, with a note explaining the misfiling and the glass-breakage risk. | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told the tenant the door is logged as urgent, to close it gently, to keep clear and report any crack, and that the landlord's approval is being sought before the next steps; asked for access times. | Flat 12 tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | Escalated to maintenance (P3) to identify the landlord and obtain approval, since the property record has no landlord contact or spend limit. | maintenance team | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Flat 12 tenant (tenant) via email, existing thread (event 001 note)** (verified)

> Thank you for letting us know about the front door at Flat 12, 52 Meadow Row. We have logged it as a door repair rather than an appliance issue, and we have marked it as urgent because of the risk to the glass. Until someone has looked at it, please try to close the door gently rather than slamming it. If you see any crack or chip in the glass, keep clear of the door and let us know straight away; if glass breaks or you cannot secure the door, call us on the same thread as soon as possible. We are now asking the landlord to approve the repair. We will confirm the next steps with you once they reply. Please also reply with any access times that suit you.

## Escalation
- **P3 → maintenance** (verified): Front door repair at Flat 12, 52 Meadow Row needs landlord approval before a contractor can be booked, but the property record has no landlord contact, spend limit or preferred contractor.
  - Known: Tenant reports the front door must be slammed shut and a fridge engineer warned it could shatter the glass (event 001). AI intake misfiled it as Appliances (event 002). Ticket reclassified to door/glazing, urgent, and the tenant was told how to close the door gently and what to do if the glass cracks (MSG-101).
  - Missing: Landlord identity and contact details for this property; landlord approval for the repair; tenant's contact confirmation and access times.
  - Options: Identify the landlord and send them the door report for approval (urgent), then assign a glazing/door contractor once approved; If the landlord cannot be reached, decide whether to make the door safe on the agency's own authority
  - Recommendation: Identify the landlord today and request approval to repair the door; the glass-breakage risk makes this urgent.
  - Deadline: 2024-06-07

## What this does not establish
- Reclassifying the ticket does not establish the cause of the fault or whether the glass is damaged.
- The tenant message does not confirm any appointment or cost.
- No contractor has been assigned and no spend is approved.

## Remaining work
- Identify the landlord and obtain a recorded decision on the door repair (maintenance team, by 2024-06-07).
- Assign a door/glazing contractor within approved spend, then book a visit with the tenant.
- Tenant's contact confirmation and access times are still outstanding.

## Missing or unavailable information
- Landlord identity, contact and spend limit for Flat 12, 52 Meadow Row.
- Tenant's access times and whether the glass is currently cracked.

## Conflicts between sources
- The AI intake classed the issue as Appliances (routine). The tenant's text describes the front door, so the door report was preferred.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, with no landlord decision and no contractor. Outstanding: identify the landlord, get approval, assign a contractor, book a visit, and confirm the tenant's access times.

**2. What is the next action, who is it for, and through which channel?**

Tenant: safety advice and status update by email (MSG-101, ledger A2). Maintenance team: landlord identification and approval request via escalation ESC-102 (ledger A3).

**3. Does anything need a human decision, and why?**

Yes. Landlord contact and approval are missing from the property record, so a person must identify the landlord and obtain approval before any repair is booked (ESC-102, P3, due 2024-06-07).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified by ops agent: AI intake put this under Appliances (routine, medium confidence), but… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Flat 12 tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","body":"Thank yo… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Front door repair at Flat 12, 52 Meadow Row needs landlord approval before a contractor can … | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Failed or unverified actions
_None._
