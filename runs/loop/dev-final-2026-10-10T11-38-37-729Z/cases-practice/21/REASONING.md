# Case 21: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (925 chars)
- `inputs/portal_chat.json` (271 chars)
- `inputs/tickets.json` (648 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"record_landlord_decision":[{"call":1,"mode":"silent_drop"}],"record_work_result":[{"call":2,"mode":"error"}],"close_ticket":[{"call":2,"mode":"silent_drop"}]}
```

## Conflicts between sources
_None identified._

## Assumptions
- Portal chat can't be sent to by tool, so replied by email, his stated preference
- Boiler still provides heat, as he only reports repressurising

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4799","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_ticket` {"ref":"R-4799"}
   - Result: {"ok":true,"tickets":[{"ref":"R-4799","tenant_id":"T-1002","category":"heating","urgency":"routine","stage":"double_quotation","description":"Boiler pressure dropping, needs repressurising weekly","created":"2026-09-28","history":[{"date":"2026-09-30","stage":"visit"},{"date":"2026-10-03","stage":"result","note":"Quote £780 for expansion vessel replacement"},{"date":"2026-10-05","stage":"double_qu…
   - Result: {"ok":true,"ticket":{"ref":"R-4799","tenant_id":"T-1002","category":"heating","urgency":"routine","stage":"double_quotation","description":"Boiler pressure dropping, needs repressurising weekly","created":"2026-09-28","history":[{"date":"2026-09-30","stage":"visit"},{"date":"2026-10-03","stage":"result","note":"Quote £780 for expansion vessel replacement"},{"date":"2026-10-05","stage":"double_quot…
3. **Tool call** `send_message` {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4799","body":"Hi Jonah, thanks for your messages on the portal chat. Boiler job (R-4799): the engineer has visited and quoted for replacing a part called an expansion vessel, which is the likely cause of the pressure drops. Your landlord has asked for a second quote bef…
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
4. **Tool call** `submit_decision` {"case_state":"R-4799 at double_quotation: £780 quote with landlord, who asked for a second quote; Swift P&H visit recorded for 2026-10-14. Waiting on that quote, then landlord decision.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Sent status update, bin signposting to council, and a heating-loss warning","recipient":"Jonah Okafor, tenant","channel":"email","ledger_id":"A1"}],"boundaries"…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/1706 · Cost: $0.0304 · Duration: 13.8s
- Raw event trace: `trace.jsonl`
