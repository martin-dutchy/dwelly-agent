# Case 020: Property inspection: ANSWER

**Decision:** escalated · **Severity:** routine

The inspection is done and the report filed. The landlord-side email raises an unapproved dog flap and a spare key after a lock change. The sender's name differs from the landlord we emailed, so I asked for confirmation and the facts, and escalated to management.

## Where the case stands
Inspection completed and report filed (16/02). Landlord email of 18/02 about an unapproved dog flap and a spare key is unanswered on substance. We are waiting on the sender's identity confirmation and facts. Escalation open with management.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the sender to confirm identity, which key, who changed the lock, and whether the dog flap was approved | Felix Clarke, landlord (unverified) | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | Escalate the dog flap and key question, the identity mismatch and the inaccurate 'no issues' summary | internal management | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Felix Clarke (landlord) via email, existing thread (event 020 email)** (verified)

> - Please confirm your full name and your relationship to Flat 12, 162 Beacon Close, as our inspection email went to Oliver Bennett as landlord.
> - Which key do you mean, and when and by whom was the lock changed?
> - Did you or anyone on your behalf approve the dog flap in writing at any point?
> 
> Why: Sender name differs from the landlord on our records; need to confirm before discussing the tenancy, and need facts on the lock change and dog flap.

## Escalation
- **P3 → management** (verified): Landlord-side email about unapproved dog flap and spare key after lock change; sender identity mismatch; inspection summary inconsistent with report
  - Known: Inspection done 16/02 (visit booked 15/02 PM; report dated 16/02). Report notes dog flap fitted in utility/back door, evidence of pets, and one defect (command-strip marks, Bedroom 1, tenant to make good), zero photos. Email to landlord Oliver Bennett on 17/02 said "No issues identified", and upload flagged Inspection issues: NO. Event 020 email from Felix Clarke says dog flap not approved and asks about retrieving a spare front door key after a lock change. No landlord record on the property in the system.
  - Missing: Who Felix Clarke is vs Oliver Bennett; whether dog flap was ever approved; who changed the lock and who holds the spare key; tenancy/landlord pet and alteration terms; date discrepancy 15 vs 16 Feb.
  - Options: Confirm landlord identity, then send corrected inspection summary noting dog flap and Bedroom 1 marks; Raise dog flap/alteration with tenant (written, no threats) per tenancy terms; Arrange key retrieval only via lawful process; no entry using keys without 24h written notice
  - Recommendation: Verify the sender, send the landlord a corrected summary, and decide the approach to the tenant on the dog flap and spare key. Do not enter or change locks without notice or consent.

## What this does not establish
- The request for information does not confirm Felix Clarke as landlord or that the dog flap is unauthorised
- Nothing here authorises entry, key retrieval or action against the tenant
- No decision on the tenancy terms or on who pays for any make-good

## Remaining work
- Management: verify the sender and decide the response to the tenant on the dog flap and spare key
- Send the landlord a corrected inspection summary (dog flap, Bedroom 1 marks)
- Ticket remains open at init stage; it is not closed

## Missing or unavailable information
- No landlord record on the property in the system
- Who changed the lock and who holds the spare key
- Whether the dog flap was approved
- Tenancy pet and alteration terms

## Conflicts between sources
- Landlord named Oliver Bennett in the inspection email, but the reply came from Felix Clarke
- Landlord summary said 'no issues' and upload flagged NO, but the report records a dog flap and a Bedroom 1 defect
- Visit rescheduled to 15/02 but the report is dated 16/02
- Event 012 shows 14:00 while the stated slot was 12-5pm

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete, with the report uploaded and the landlord emailed. Outstanding: a response to the landlord's dog flap and key query, and a correction of the 'no issues' summary, since the report records a dog flap and Bedroom 1 marks.

**2. What is the next action, who is it for, and through which channel?**

An information request to Felix Clarke by email on the existing thread, and an internal escalation to management.

**3. Does anything need a human decision, and why?**

Yes. The sender's identity doesn't match the landlord on our records. How to handle the unapproved alteration and the key or lock issue is a tenancy and legal matter, and no entry is allowed without proper notice.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Felix Clarke","recipient_role":"landlord","channel":"email","contact":"existing thread (event 020 email)","questions":["P… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `escalate_to_human` | {"priority":"P3","team":"management","reason":"Landlord-side email about unapproved dog flap and spare key after lock change; sender identit… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Failed or unverified actions
_None._
