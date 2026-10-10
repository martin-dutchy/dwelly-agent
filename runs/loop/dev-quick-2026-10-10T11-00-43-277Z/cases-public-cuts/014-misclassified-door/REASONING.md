# Case 014-misclassified-door: REASONING

## What the system received
- `history.md` (1279 chars)

## Conflicts between sources
- The AI intake classified this as Appliances (routine) based on the fridge engineer's comment. The tenant's description is about a door, so I trusted the tenant's description over the classification.

## Assumptions
- The door is not an emergency: no injury, no broken glass, and the door still closes. Urgent (72h) is a suggestion pending the maintenance team's confirmation.
- The property is a tenanted flat, because the request came from a tenant.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances (AI intake, medium confidence, Q&A unanswered) to DOOR / LOCKS-STRU… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Front door at Flat 12, 52 Meadow Row needs a repair. It was misclassified as an appliance is… | 1 | ✅ verified | ESC-101 found in the escalate_to_human log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-014-misclassified-door","stage":"init","property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ","description":"Front door you have to slam to shut like the back. when fridge man arrived he even commented and said it will cause a shatter in glass- he said he was also going to report to you."}]}
   - Result: {"ok":true,"property":{"address":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ"}}
3. **Tool call** `update_ticket` {"ref":"NBL-014-misclassified-door","note":"Reclassified from Appliances (AI intake, medium confidence, Q&A unanswered) to DOOR / LOCKS-STRUCTURAL repair. Tenant reports front door must be slammed to close, like the back door. A fridge engineer warned it could shatter the glass. No injury or immediate hazard reported. Suggested severity: URGENT (target visit within 72h) because of possible glass b…
   - Result: {"ok":true,"ref":"NBL-014-misclassified-door","stage":"init"}
[ledger A1, attempt 1] Verified: Ticket NBL-014-misclassified-door read back at stage init.
4. **Tool call** `get_ticket` {"ref":"NBL-014-misclassified-door"}
   - Result: {"ok":true,"ticket":{"ref":"NBL-014-misclassified-door","stage":"init","property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ","description":"Front door you have to slam to shut like the back. when fridge man arrived he even commented and said it will cause a shatter in glass- he said he was also going to report to you.","notes":["Reclassified from Appliances (AI intake, medium confidence, Q&A un…
5. **Tool call** `escalate_to_human` {"priority":"P2","team":"maintenance","reason":"Front door at Flat 12, 52 Meadow Row needs a repair. It was misclassified as an appliance issue. The intake was a note with no tenant name or contact. We cannot contact the tenant or landlord or book a contractor without those details.","known":"Tenant reports the front door has to be slammed to shut, like the back door. A fridge engineer on site war…
   - Result: {"ok":true,"escalation_id":"ESC-101"}
[ledger A2, attempt 1] Verified: ESC-101 found in the escalate_to_human log.
6. **Tool call** `submit_decision` {"case_state":"Ticket NBL-014-misclassified-door is at stage init. It was auto-classified as an Appliances issue (medium confidence, tenant Q&A unanswered). I reclassified it as a door/structural repair with suggested URGENT severity, and the note is verified. No tenant, landlord, or contractor contact is on file, so nobody has been contacted and no contractor is booked.","next_actions":[{"action"…
   - Result: Decision recorded.

## Run
- Model turns: 5 · Tokens in/out: 12/3677 · Cost: $0.0030 · Duration: 22.6s
- Raw event trace: `trace.jsonl`
