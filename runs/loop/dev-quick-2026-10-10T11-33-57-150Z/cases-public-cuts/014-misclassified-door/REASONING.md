# Case 014-misclassified-door: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (1279 chars)

## Conflicts between sources
- The AI intake classed the issue as Appliances (routine). The tenant's text describes the front door, so the door report was preferred.

## Assumptions
- The glass-breakage warning is a credible hazard, so the job is treated as urgent.
- The tenant's contact on the existing note thread is valid, since the tenant wrote in on it.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified by ops agent: AI intake put this under Appliances (routine, medium confidence), but… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Flat 12 tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","body":"Thank yo… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Front door repair at Flat 12, 52 Meadow Row needs landlord approval before a contractor can … | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-014-misclassified-door","stage":"init","property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ","description":"Front door you have to slam to shut like the back. when fridge man arrived he even commented and said it will cause a shatter in glass- he said he was also going to report to you."}]}
   - Result: {"ok":true,"property":{"address":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ"}}
3. **Tool call** `update_ticket` {"ref":"NBL-014-misclassified-door","note":"Reclassified by ops agent: AI intake put this under Appliances (routine, medium confidence), but the report is about the front door itself (slams shut, and a fridge engineer warned it could shatter the glass). Category: door/glazing (locks/door). Severity raised to URGENT as a possible glass-breakage hazard. Landlord not identified on property record; la…
4. **Tool call** `send_message` {"recipient_name":"Flat 12 tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","body":"Thank you for letting us know about the front door at Flat 12, 52 Meadow Row. We have logged it as a door repair rather than an appliance issue, and we have marked it as urgent because of the risk to the glass. Until someone has looked at it, please try to close the d…
   - Result: {"ok":true,"ref":"NBL-014-misclassified-door","stage":"init"}
[ledger A1, attempt 1] Verified: Ticket NBL-014-misclassified-door read back at stage init.
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-101 found in the send_message log.
5. **Tool call** `escalate_to_human` {"priority":"P3","team":"maintenance","reason":"Front door repair at Flat 12, 52 Meadow Row needs landlord approval before a contractor can be booked, but the property record has no landlord contact, spend limit or preferred contractor.","known":"Tenant reports the front door must be slammed shut and a fridge engineer warned it could shatter the glass (event 001). AI intake misfiled it as Applianc…
   - Result: {"ok":true,"escalation_id":"ESC-102"}
[ledger A3, attempt 1] Verified: ESC-102 found in the escalate_to_human log.
6. **Tool call** `submit_decision` {"case_state":"Intake. The ticket NBL-014-misclassified-door is at init with no landlord approval and no contractor. The AI intake filed it under Appliances, but the report is about the front door. It has been reclassified to door/glazing and urgent. The tenant has been messaged, and an escalation (ESC-102) is open to identify the landlord and get approval.","next_actions":[{"action":"Reclassified…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/3775 · Cost: $0.0031 · Duration: 21.2s
- Raw event trace: `trace.jsonl`
