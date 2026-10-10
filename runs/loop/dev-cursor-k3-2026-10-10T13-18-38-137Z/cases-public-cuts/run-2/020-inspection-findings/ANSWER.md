# Case 020: Property inspection: ANSWER

**Decision:** needs_info · **Severity:** routine

The inspection is complete, but the landlord's email raises a dog flap and a spare key after a lock change. The sender's name differs from the landlord on record, so I asked the landlord to confirm who they are. I also asked the tenant about the lock and key. A note records the conflicts, a follow-up is set for 22/02, and the ticket is back in auto mode.

## Where the case stands
Inspection done (report signed 16/02) and sent to landlord 17/02. Landlord's follow-up (event 020) about an unapproved dog flap and a spare key after a lock change is awaiting clarification from landlord and tenant; review 22/02/2024.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the sender to confirm identity (Felix Clarke vs Oliver Bennett on record), dog flap consent position and which spare key, reply by 22/02 | Landlord (agency landlord record) | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask the tenant about the lock change, spare key and dog flap consent | Tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on both replies on 22/02/2024 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Landlord (landlord) via email, agency landlord record** (verified)

> - Your email is signed Felix Clarke, but our records for Flat 12, 162 Beacon Close hold the landlord as Oliver Bennett. Please confirm who you are and your connection to the property.
> - Please confirm the dog flap was installed without your written consent, and whether you want us to ask the tenant to remove it and make good or to consider it retrospectively.
> - Which spare front door key do you mean, and do you know who changed the lock and when? We are checking with the tenant too.
> 
> Why: Landlord's email of 18/02 raises an unapproved dog flap (noted in the 16/02 inspection report) and a spare key after a lock change; sender name differs from the landlord on record. Please reply by 22/02/2024.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> - Was the lock on the front door changed, and if so when and by whom?
> - Do you have a spare front door key, and has the landlord agreed in writing to the dog flap?
> 
> Why: Our inspection on 16/02 noted a dog flap in the back door, and a query has come in about the front door lock and spare key. Please reply by 22/02/2024; nothing is being decided against you yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Questions sent do not establish that the dog flap is a breach or that a lock was changed.
- No decision on removal, deposit or key retrieval has been made.
- No tenant details shared with the landlord.

## Remaining work
- Review replies on 22/02 and then answer landlord on the dog flap and key.
- Tell the landlord about the Bedroom 1 marks, which the 17/02 email missed, once identity is confirmed.
- Close the ticket after final checks.

## Missing or unavailable information
- Identity of the sender of event 020
- Whether the lock was changed and who holds keys
- Whether the dog flap had written consent

## Conflicts between sources
- Event 017/018 say no issues, but the report records a dog flap and Bedroom 1 marks; I trusted the report.
- Sender Felix Clarke vs landlord Oliver Bennett.
- Visit dates 13/02, 15/02 and the report date 16/02; Friday 15th is a Thursday.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is done and the report has been sent to the landlord. Outstanding: the landlord's dog flap and spare key queries, the sender's identity, and the Bedroom 1 marks that the landlord email did not mention.

**2. What is the next action, who is it for, and through which channel?**

Questions by email to the landlord (identity, dog flap consent, which key) and to the tenant (lock change, spare key, dog flap consent). Follow-up on 22/02.

**3. Does anything need a human decision, and why?**

Not yet. A human may be needed later if the landlord wants the dog flap removed or there is a dispute, or if the identity mismatch cannot be settled.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your email is si… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","questions":["Was the l… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Inspection report (16/02) records dog flap in back door/utility and Bedroom 1 command-strip … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-22","purpose":"Review landlord and tenant replies on sender identity, dog flap… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
