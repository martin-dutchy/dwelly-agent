# Case 012: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (7310 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"assign_contractor":[{"call":2,"mode":"error"}],"record_work_result":[{"call":1,"mode":"timeout"}],"confirm_keys_returned":[{"call":1,"mode":"silent_drop"}],"close_ticket":[{"call":1,"mode":"silent_drop"}],"schedule_follow_up":[{"call":2,"mode":"silent_drop"}],"request_landlord_approval":[{"call":2,"mode":"silent_drop"}]}
```

## Conflicts between sources
- Event 016: Cedar Utilities caller and 'Leo Kendall' vs assigned Riverside Compliance and tenant Leo Turner; trusted the system record and asked the provider
- Event 001 references a Sept 2025 email; event 004 notes it was unclear whether it concerned the dishwasher

## Assumptions
- Visit 017 counts as booked since the system recorded it

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","tick… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-012","note":"Event 016 names Grant from Cedar Utilities calling \"Leo Kendall\"; tenant is Leo Turner and assigned provider i… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-012","due_on":"2026-04-28","party":"Riverside Compliance","purpose":"Check provider confirmed attendance and company iden… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 9, 89 Juniper Mews, Willowbank, ZZ2 0ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-012","stage":"visit","property":"Flat 9, 89 Juniper Mews, Willowbank, ZZ2 0ZZ","description":"Dishwasher door not closing,"}]}
   - Result: {"ok":true,"property":{"address":"Flat 9, 89 Juniper Mews, Willowbank, ZZ2 0ZZ"}}
3. **Tool call** `send_message` {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-012","body":"Hi Leo, thanks for running the checks. Our record shows an engineer visit to look at the dishwasher door on Wednesday 29 April, between 8am and 12pm. Please make sure someone is home to let them in. If that time no longer works, tell us and we will…
4. **Tool call** `send_message` {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticket_ref":"NBL-012","body":"Hello, please confirm you will attend Flat 9, 89 Juniper Mews on Wednesday 29/04/2026, 8am-12pm. Our log shows a call from \"Grant from Cedar Utilities\" arranging this, but the job is assigned to Riverside Compliance, so please confi…
5. **Tool call** `add_note` {"entity":"NBL-012","note":"Event 016 names Grant from Cedar Utilities calling \"Leo Kendall\"; tenant is Leo Turner and assigned provider is Riverside Compliance. Visit 29/04 08:00-12:00 held by system (event 017). Asked Riverside to confirm company. Landlord approval so far covers investigation only; any quote needs approval."}
6. **Tool call** `schedule_follow_up` {"ticket_ref":"NBL-012","due_on":"2026-04-28","party":"Riverside Compliance","purpose":"Check provider confirmed attendance and company identity for 29/04 visit"}
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
   - Result: {"ok":true,"note_id":"NOTE-103"}
[ledger A3, attempt 1] Verified: NOTE-103 found in the add_note log.
   - Result: {"ok":true,"follow_up_id":"FUP-104"}
[ledger A4, attempt 1] Verified: FUP-104 found in the schedule_follow_up log.
7. **Tool call** `submit_decision` {"case_state":"Stage: visit. Provider assigned (Riverside Compliance); visit 29/04/2026 08:00-12:00 recorded by system. Waiting on provider to confirm company/attendance, then the visit result and any quote.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Tell tenant the recorded visit slot 29 April 8-12 and that any repair needs landlord approval","recipient":"Leo Turner, tenant","channel":"…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/2833 · Cost: $0.0462 · Duration: 20.6s
- Raw event trace: `trace.jsonl`
