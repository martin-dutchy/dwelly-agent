# Case 001-landlord-pays-direct: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (11190 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"cancel_ticket":[{"call":1,"mode":"error"}],"set_visit":[{"call":1,"mode":"timeout"}],"record_invoice":[{"call":1,"mode":"silent_drop"}],"confirm_keys_returned":[{"call":1,"mode":"timeout"}],"request_information":[{"call":1,"mode":"timeout"},{"call":2,"mode":"timeout"}],"add_note":[{"call":1,"mode":"silent_drop"}]}
```

## Conflicts between sources
- Event 036 says the job is external and needs no tenant contact, but the tenant was told earlier (events 025 and 031) that they would be updated. The tenant should get a short completion update.
- Event 007 and the hint's approval record name different people (Grace, Harper, Rowan, Felix, Leo) for the landlord. I treated them as the same landlord thread.

## Assumptions
- Riverside Services (Freya) is the landlord's own contractor, paid directly by the landlord.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starti… | 1 | ✅ verified | Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"existing thread (event 029 email)","questions"… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Landlord / Riverside Services","purpose":"Chase written confirma… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 26, 46 Copperfield Walk, Kingshaven, ZZ5 7ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-001-landlord-pays-direct","stage":"mp_time","property":"Flat 26, 46 Copperfield Walk, Kingshaven, ZZ5 7ZZ","description":"Communal  garden full of weeds, hedge along side path overgrown, peice of no man's land at side  of my property  was going to be cleared  last summer and wasn't thanks","landlord_approval":"confirmed","hold":{"reason":"Waiting for Provider","co…
   - Result: {"ok":true,"property":{"address":"Flat 26, 46 Copperfield Walk, Kingshaven, ZZ5 7ZZ"}}
3. **Tool call** `record_landlord_decision` {"ticket_ref":"NBL-001-landlord-pays-direct","decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starting/booked it in for & I'll then advise you accordingly.","source":"event 026, email 2025-11-05"}
4. **Tool call** `request_information` {"recipient_name":"Rowan (landlord)","recipient_role":"landlord","channel":"email","contact":"existing thread (event 029 email)","questions":["Can you confirm in writing that Freya (Riverside Services) has finished the communal garden and hedge works, including the tree trimming?","Please confirm you are paying Riverside Services directly, so we do not expect an invoice."],"why":"Our 11 Dec call w…
5. **Tool call** `schedule_follow_up` {"ticket_ref":"NBL-001-landlord-pays-direct","due_on":"2025-12-15","party":"Landlord / Riverside Services","purpose":"Chase written confirmation of completion and direct payment; then confirm with tenant and close without payment."}
   - Result: {"ok":true,"ticket_ref":"NBL-001-landlord-pays-direct","landlord_decision":{"decision":"own_contractor","evidence_quote":"I've asked Freya to let me know when she's starting/booked it in for & I'll then advise you accordingly.","source":"event 026, email 2025-11-05"}}
[ledger A1, attempt 1] Verified: Ticket NBL-001-landlord-pays-direct read back after record_landlord_decision.
   - Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: Request timed out after 10000ms"}
[ledger A2, attempt 1] The API reported an error, but read-back shows the change IS in place (REQ-101 found in the request_information log). Do not retry.
   - Result: {"ok":true,"follow_up_id":"FUP-102"}
[ledger A3, attempt 1] Verified: FUP-102 found in the schedule_follow_up log.
6. **Tool call** `submit_decision` {"case_state":"Stage mp_time, on hold \"Waiting for Provider\". Landlord's own contractor (Riverside Services/Freya) is doing the communal garden works. A 11 Dec call suggests the works are done, but nothing is confirmed in writing. We have asked the landlord for confirmation. Follow-up is set for 15 Dec.","next_actions":[{"type":"REQUEST_INFORMATION","action":"Ask the landlord to confirm in writi…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/2604 · Cost: $0.0447 · Duration: 19.4s
- Raw event trace: `trace.jsonl`
