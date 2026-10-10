# Case 03: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/call_transcript.txt` (570 chars)
- `inputs/crm.json` (1183 chars)
- `inputs/policy_extract.md` (317 chars)
- `inputs/tickets.json` (237 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"update_ticket":[{"call":1,"mode":"error"},{"call":2,"mode":"silent_drop"}],"put_on_hold":[{"call":1,"mode":"error"},{"call":2,"mode":"silent_drop"}],"record_landlord_decision":[{"call":2,"mode":"silent_drop"}],"record_quote":[{"call":1,"mode":"silent_drop"}],"close_ticket":[{"call":2,"mode":"silent_drop"}],"log_call":[{"call":1,"mode":"silent_drop"}],"request_information":[{"call":1,"mode":"silent_drop"}],"approve_quote":[{"call":2,"mode":"error"}],"add_note":[{"call":1,"mode":"error"}],"escalate_to_human":[{"call":1,"mode":"silent_drop"}]}
```

## Conflicts between sources
- Tenant says he reported the lock on the portal 'I think'; confirmed by ticket R-4766 (22 Sept), still at init and unassigned.

## Assumptions
- Emergency authority applies (night lockout, vulnerable tenant, landlord approves emergencies without asking).
- Visit window is a target, not a confirmed appointment.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4766","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:59 (emergency, ASAP tonight)"} | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A2 | `log_call` | {"party_name":"Jonah Okafor","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Locked out at night, key snapped i… | 2 | ✅ verified | CALL-102 found in the log_call log |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"R-4766","body":"Hi Jonah,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `update_ticket` | {"ref":"R-4766","note":"Escalated to emergency 10/10 21:15: tenant locked out at night, key snapped, vulnerable tenant. Reported stiff lock … | 1 | ✅ verified | Ticket R-4766 read back at stage visit |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Tenant locked out at night (key snapped), vulnerable occupant; need to confirm locksmith att… | 2 | ✅ verified | ESC-106 found in the escalate_to_human log |

## Trace
1. **Tool call** `get_ticket` {"ref":"R-4766"}
2. **Tool call** `get_property` {"property":"P-202"}
   - Result: {"ok":true,"ticket":{"ref":"R-4766","tenant_id":"T-1002","category":"security","stage":"init","description":"Front door lock very stiff, key hard to turn","created":"2026-09-22","assigned_contractor":null}}
   - Result: {"ok":true,"property":{"id":"P-202","address":"27 Bethnal Green Road, London E1 6LA","tenanted":true,"landlord":{"name":"Margaret Ellison","email":"margaret@ellisonlettings.co.uk","phone":"+447700900202","spend_limit_gbp":250,"notes":["Overseas Oct-Dec, email preferred.","Approve emergencies without asking, routine over £250 needs approval."]},"contractors":[{"contractor_id":"C-14","name":"Hackney…
3. **Tool call** `assign_contractor` {"ticket_ref":"R-4766","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:59 (emergency, ASAP tonight)"}
4. **Tool call** `log_call` {"party_name":"Jonah Okafor","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Locked out at night, key snapped in front door lock, half stuck. Lock stiff for weeks (R-4766). Tenant vulnerable (anxiety). Asked about spare keys. Emergency locksmith arranged.","ticket_ref":"R-4766"}
   - Result: {"ok":true,"ticket_ref":"R-4766","stage":"visit","contractor":"Hackney Locks 24/7","visit_window":"2026-10-10 21:30-23:59 (emergency, ASAP tonight)"}
[ledger A1, attempt 1] Verified: Ticket R-4766 read back at stage visit.
   - ⚠️ Result: {"ok":true,"call_id":"CALL-101"}
[ledger A2, attempt 1] NOT APPLIED: CALL-101 was returned but is not in the log_call log. Retry once if safe, otherwise escalate. Never tell anyone it was done.
5. **Tool call** `log_call` {"party_name":"Jonah Okafor","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Locked out at night, key snapped in front door lock, half stuck. Lock stiff for weeks (R-4766). Tenant vulnerable (anxiety). Asked about spare keys. Emergency locksmith arranged.","ticket_ref":"R-4766"}
6. **Tool call** `send_message` {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"sms","contact":"+447700900102","ticket_ref":"R-4766","body":"Hi Jonah, it's Mare and Co. We've asked Hackney Locks 24/7 to get to you tonight as an emergency; we can't promise an arrival time yet, they may call you. We found your report of the stiff lock (R-4766) from 22 Sept, so we're treating this as a lock fault. Please don't…
7. **Tool call** `send_message` {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"R-4766","body":"Dear Margaret, tonight (Sat 10 Oct) your tenant at 27 Bethnal Green Road was locked out when his key snapped in the front door lock. He had reported the lock as stiff on 22 Sept (R-4766, not yet actioned). In line with your emergency instructio…
8. **Tool call** `update_ticket` {"ref":"R-4766","note":"Escalated to emergency 10/10 21:15: tenant locked out at night, key snapped, vulnerable tenant. Reported stiff lock 22/09 never actioned. Locksmith report decides recharge."}
9. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Tenant locked out at night (key snapped), vulnerable occupant; need to confirm locksmith attendance tonight","known":"Jonah Okafor (T-1002, vulnerable: anxiety) outside 27 Bethnal Green Road, cold, call 10/10 21:15. Prior ticket R-4766 (stiff lock, 22/09) still at init. Hackney Locks 24/7 (C-14, out of hours) assigned under emergency; landlord notes …
   - Result: {"ok":true,"call_id":"CALL-102"}
[ledger A2, attempt 2] Verified: CALL-102 found in the log_call log.
   - Result: {"ok":true,"message_id":"MSG-103","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-103 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-104","status":"sent"}
[ledger A4, attempt 1] Verified: MSG-104 found in the send_message log.
   - Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: HTTP 500 Internal Server Error"}
[ledger A5, attempt 1] The API reported an error, but read-back shows the change IS in place (Ticket R-4766 read back at stage visit). Do not retry.
   - ⚠️ Result: Validation failed for tool "escalate_to_human":
  - options: must have required properties options, recommendation

Received arguments:
{
  "priority": "P1",
  "team": "maintenance",
  "reason": "Tenant locked out at night (key snapped), vulnerable occupant; need to confirm locksmith attendance tonight",
  "known": "Jonah Okafor (T-1002, vulnerable: anxiety) outside 27 Bethnal Green Road, cold, ca…
10. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Tenant locked out at night (key snapped), vulnerable occupant; need to confirm locksmith attendance tonight","known":"Jonah Okafor (T-1002, vulnerable: anxiety) outside 27 Bethnal Green Road, cold, call 10/10 21:15. Prior ticket R-4766 (stiff lock, 22/09) still at init. Hackney Locks 24/7 (C-14, out of hours) assigned under emergency (ledger A1); lan…
   - ⚠️ Result: {"ok":true,"escalation_id":"ESC-105"}
[ledger A6, attempt 1] NOT APPLIED: ESC-105 was returned but is not in the escalate_to_human log. Retry once if safe, otherwise escalate. Never tell anyone it was done.
11. **Agent:** Retry once.
12. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Tenant locked out at night (key snapped), vulnerable occupant; need to confirm locksmith attendance tonight","known":"Jonah Okafor (T-1002, vulnerable: anxiety) outside 27 Bethnal Green Road, cold, call 10/10 21:15. Prior ticket R-4766 (stiff lock, 22/09) still at init. Hackney Locks 24/7 (C-14, out of hours) assigned under emergency (ledger A1); lan…
   - Result: {"ok":true,"escalation_id":"ESC-106"}
[ledger A6, attempt 2] Verified: ESC-106 found in the escalate_to_human log.
13. **Tool call** `submit_decision` {"outcome":"escalated","severity":"emergency","summary":"Tenant locked out at night after key snapped; vulnerable (anxiety). Locksmith Hackney Locks 24/7 assigned under emergency authority, tenant and landlord told, call logged, P1 escalated to confirm attendance tonight.","case_state":"Ticket R-4766 at visit stage, locksmith assigned for tonight, no confirmed arrival time. Waiting on locksmith co…
   - Result: Decision recorded.

## Run
- Model turns: 6 · Tokens in/out: 14/5530 · Cost: $0.0928 · Duration: 39.4s
- Raw event trace: `trace.jsonl`
