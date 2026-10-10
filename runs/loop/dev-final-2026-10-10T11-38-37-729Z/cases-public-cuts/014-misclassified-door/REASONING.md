# Case 014-misclassified-door: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (1279 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"update_ticket":[{"call":2,"mode":"silent_drop"}],"cancel_ticket":[{"call":2,"mode":"silent_drop"}],"record_work_result":[{"call":2,"mode":"silent_drop"}],"schedule_follow_up":[{"call":1,"mode":"timeout"}],"request_landlord_approval":[{"call":1,"mode":"error"},{"call":2,"mode":"error"}],"update_bank_details":[{"call":1,"mode":"error"}],"add_note":[{"call":2,"mode":"silent_drop"}]}
```

## Conflicts between sources
- Intake classified as Appliances (fridge) but the tenant's words describe a door fault; trusted the tenant's words.

## Assumptions
- The fridge engineer reference is incidental to the door complaint
- Tenant contact reachable on existing thread

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake tagged this as Appliances (fridge Q&A) but the issue is the front door (and… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant, Flat 12","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","questions":["S… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord, Flat 12, 52 Meadow Row","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (a… | 1 | ❌ failed | No request_landlord_approval record on read-back |
| A4 | `request_landlord_approval` | {"landlord":"Landlord, Flat 12, 52 Meadow Row","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (a… | 1 | ❌ failed | No request_landlord_approval record on read-back |
| A5 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Landlord approval request failed twice (HTTP 500); no landlord contact on property record","… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-014-misclassified-door","stage":"init","property":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ","description":"Front door you have to slam to shut like the back. when fridge man arrived he even commented and said it will cause a shatter in glass- he said he was also going to report to you."}]}
   - Result: {"ok":true,"property":{"address":"Flat 12, 52 Meadow Row, Kingshaven, ZZ9 5ZZ"}}
3. **Tool call** `update_ticket` {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake tagged this as Appliances (fridge Q&A) but the issue is the front door (and back door) not closing properly without slamming; glass could shatter per fridge engineer. Category should be locks/doors, routine pending photos; urgent if glass is cracked or door will not secure. Fridge questions are irrelevant."}
4. **Tool call** `request_information` {"recipient_name":"Tenant, Flat 12","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","questions":["Sorry, our system wrongly treated this as a fridge problem; ignore the fridge questions. Does the front door still lock and secure properly when closed?","Is any glass in the door cracked or loose? If so, please keep clear of it and tell us straight away.","Cou…
5. **Tool call** `request_landlord_approval` {"landlord":"Landlord, Flat 12, 52 Meadow Row","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (and back door) must be slammed to shut; a visiting engineer warned the glass could shatter. Shall we send our contractor to inspect and adjust/repair, or will you arrange your own?","options":["Use our contractor (recommended)","Landlord arranges own contractor…
   - Result: {"ok":true,"ref":"NBL-014-misclassified-door","stage":"init"}
[ledger A1, attempt 1] Verified: Ticket NBL-014-misclassified-door read back at stage init.
   - Result: {"ok":true,"request_id":"REQ-101","status":"sent"}
[ledger A2, attempt 1] Verified: REQ-101 found in the request_information log.
   - ⚠️ Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: HTTP 500 Internal Server Error"}
[ledger A3, attempt 1] NOT APPLIED: No request_landlord_approval record on read-back. Retry once if safe, otherwise escalate. Never tell anyone it was done.
6. **Tool call** `request_landlord_approval` {"landlord":"Landlord, Flat 12, 52 Meadow Row","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (and back door) must be slammed to shut; a visiting engineer warned the glass could shatter. Shall we send our contractor to inspect and repair, or will you arrange your own?","options":["Use our contractor (recommended)","Landlord arranges own contractor"]}
   - ⚠️ Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: HTTP 500 Internal Server Error"}
[ledger A4, attempt 1] NOT APPLIED: No request_landlord_approval record on read-back. Retry once if safe, otherwise escalate. Never tell anyone it was done.
7. **Tool call** `escalate_to_human` {"priority":"P3","team":"maintenance","reason":"Landlord approval request failed twice (HTTP 500); no landlord contact on property record","known":"Ticket NBL-014-misclassified-door at intake, wrongly tagged Appliances; real issue is front/back door needing slamming, glass shatter risk per fridge engineer. Ticket noted as reclassified (A1). Tenant asked for photos, security/glass status, access (R…
   - Result: {"ok":true,"escalation_id":"ESC-102"}
[ledger A5, attempt 1] Verified: ESC-102 found in the escalate_to_human log.
8. **Tool call** `submit_decision` {"case_state":"Intake stage, no landlord decision, no contractor. Misclassified as Appliances; actually a door repair. Waiting on tenant answers; landlord request failed.","next_actions":[{"type":"REQUEST_INFORMATION","action":"Ask tenant to confirm door security, glass condition, photo, access","recipient":"Tenant, Flat 12","channel":"email","ledger_id":"A2"},{"type":"ESCALATE_TO_HUMAN","action":…
   - Result: Decision recorded.

## Run
- Model turns: 5 · Tokens in/out: 12/2867 · Cost: $0.0535 · Duration: 23.2s
- Raw event trace: `trace.jsonl`
