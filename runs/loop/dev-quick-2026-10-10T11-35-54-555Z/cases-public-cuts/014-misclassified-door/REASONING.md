# Case 014-misclassified-door: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (1279 chars)

## Conflicts between sources
- The intake classified the issue as Appliances/routine. The tenant's report is about the front door itself, and the fridge engineer's comment is a warning, so I trusted the tenant's description over the intake label.

## Assumptions
- The glass risk justifies urgent severity (72-hour target) until someone inspects it.
- The tenant's email thread (event 001) is the correct contact channel, as no email address is on file.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"NBL-014-misclassified-door","note":"Reclassified by ops agent: the AI intake labelled this 'Appliances / routine', but the fault … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Tenant, Flat 12, 52 Meadow Row","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)",… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Landlord approval needed before a contractor is booked… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-014-misclassified-door","stage":"init","property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ","description":"Front door you have to slam to shut like the back. when fridge man arrived he even commented and said it will cause a shatter in glass- he said he was also going to report to you."}]}
   - Result: {"ok":true,"property":{"address":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ"}}
3. **Tool call** `add_note` {"entity":"NBL-014-misclassified-door","note":"Reclassified by ops agent: the AI intake labelled this 'Appliances / routine', but the fault is the front door itself (slams shut, and the fridge engineer warned it could shatter the glass). Category should be door/locks (general repair), severity raised to URGENT because of the risk of broken glass. The fridge engineer's comment is a warning, not an …
4. **Tool call** `send_message` {"recipient_name":"Tenant, Flat 12, 52 Meadow Row","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","ticket_ref":"NBL-014-misclassified-door","body":"Thank you for reporting the front door. We have logged it as a door repair, not an appliance issue, and have treated it as urgent because of the risk to the glass. Until someone has looked at it, please avoid s…
5. **Tool call** `put_on_hold` {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Landlord approval needed before a contractor is booked for the front door repair (urgent, glass risk). No landlord contact or spend limit on the property record, so the landlord must be identified and asked. Also ask the tenant whether the glass is cracked.","review_on":"2024-06-07"}
   - Result: {"ok":true,"note_id":"NOTE-101"}
[ledger A1, attempt 1] Verified: NOTE-101 found in the add_note log.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
   - Result: {"ok":true,"ticket_ref":"NBL-014-misclassified-door","hold":{"reason":"Waiting for Landlord","comment":"Landlord approval needed before a contractor is booked for the front door repair (urgent, glass risk). No landlord contact or spend limit on the property record, so the landlord must be identified and asked. Also ask the tenant whether the glass is cracked.","review_on":"2024-06-07"}}
[ledger A3…
6. **Tool call** `submit_decision` {"case_state":"Intake (stage init). The request is a tenant report that the front door slams shut and that a fridge engineer warned it could shatter the glass. The AI intake misclassified it as an appliance issue, routine. The job is on hold waiting for landlord approval, with a review date of 2024-06-07. No landlord contact or spend limit is on the property record.","next_actions":[{"action":"Rec…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/3692 · Cost: $0.0027 · Duration: 22.1s
- Raw event trace: `trace.jsonl`
