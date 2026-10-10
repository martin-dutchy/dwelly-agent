# Case 014-misclassified-door: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (1279 chars)

## Conflicts between sources
- Intake classified the issue as Appliances (fridge), but the tenant text describes a door fault; the fridge man was only mentioned as a witness.

## Assumptions
- The tenant is reachable on the existing thread
- Severity is routine until the tenant confirms the door still secures

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake labelled this Appliances (fridge Q&A irrelevant). Real issue is front door … | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","questions":["Sorry, our… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-014-misclassified-door","due_on":"2024-06-10","purpose":"Chase tenant for door details/access; then send landlord approva… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-014-misclassified-door","stage":"init","property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ","description":"Front door you have to slam to shut like the back. when fridge man arrived he even commented and said it will cause a shatter in glass- he said he was also going to report to you."}]}
   - Result: {"ok":true,"property":{"address":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ"}}
3. **Tool call** `update_ticket` {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake labelled this Appliances (fridge Q&A irrelevant). Real issue is front door (and back door) not closing properly, has to be slammed; glass may shatter. Category locks/doors, routine pending details. Fridge questions can be ignored. No landlord contact on property record; landlord decision still needed."}
4. **Tool call** `request_information` {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","questions":["Sorry, our system mistook this for a fridge problem, so please ignore the fridge questions. Is the front door glazed, and is the glass cracked or loose now?","Does the door still lock securely once it is shut, or can it be left unlocked or open?","What times and days su…
   - Result: {"ok":true,"ref":"NBL-014-misclassified-door","stage":"init"}
[ledger A1, attempt 1] Verified: Ticket NBL-014-misclassified-door read back at stage init.
   - Result: {"ok":true,"request_id":"REQ-101","status":"sent"}
[ledger A2, attempt 1] Verified: REQ-101 found in the request_information log.
5. **Tool call** `schedule_follow_up` {"ticket_ref":"NBL-014-misclassified-door","due_on":"2024-06-10","purpose":"Chase tenant for door details/access; then send landlord approval request (landlord contact missing from property record)","party":"Tenant"}
   - Result: {"ok":true,"follow_up_id":"FUP-102"}
[ledger A3, attempt 1] Verified: FUP-102 found in the schedule_follow_up log.
6. **Tool call** `submit_decision` {"case_state":"Intake stage. Misclassified as Appliances; actual issue is a front door that must be slammed to close. No landlord decision, no contractor. Waiting on the tenant for details.","next_actions":[{"type":"REQUEST_INFORMATION","action":"Ask tenant about glazing/damage, whether the door locks securely, and access times","recipient":"Tenant","channel":"email","ledger_id":"A2"},{"type":"REC…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/2242 · Cost: $0.0406 · Duration: 18.5s
- Raw event trace: `trace.jsonl`
