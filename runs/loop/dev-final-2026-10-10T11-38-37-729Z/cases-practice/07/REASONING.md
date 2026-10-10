# Case 07: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (1144 chars)
- `inputs/email_tenant.eml` (338 chars)
- `inputs/tickets.json` (359 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"update_ticket":[{"call":1,"mode":"error"},{"call":2,"mode":"error"}],"assign_contractor":[{"call":1,"mode":"silent_drop"}],"set_visit":[{"call":2,"mode":"timeout"}],"record_work_result":[{"call":2,"mode":"error"}],"confirm_keys_returned":[{"call":1,"mode":"error"},{"call":2,"mode":"silent_drop"}],"log_call":[{"call":2,"mode":"timeout"}],"request_information":[{"call":1,"mode":"timeout"}]}
```

## Conflicts between sources
_None identified._

## Assumptions
- The tap is still a routine drip, not a flood, so severity stays routine.
- The tenant's 'still dripping' refers to R-4801.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"2026-10-10: tenant emailed again (duplicate report, no new job). Says tap now drips constantly even when fully cl… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_ticket` {"ref":"R-4801"}
   - Result: {"ok":true,"tickets":[{"ref":"R-4801","tenant_id":"T-1001","category":"plumbing","urgency":"routine","stage":"visit","description":"Dripping kitchen tap","created":"2026-10-01","assigned_contractor":"C-12","visit":{"date":"2026-10-15","window":"08:00-12:00","confirmed_with_tenant":true}}]}
   - Result: {"ok":true,"ticket":{"ref":"R-4801","tenant_id":"T-1001","category":"plumbing","urgency":"routine","stage":"visit","description":"Dripping kitchen tap","created":"2026-10-01","assigned_contractor":"C-12","visit":{"date":"2026-10-15","window":"08:00-12:00","confirmed_with_tenant":true}}}
3. **Agent:** Duplicate; link by note, reply to the tenant. Worsening drip is still not a flood, so it stays routine.
4. **Tool call** `add_note` {"entity":"R-4801","note":"2026-10-10: tenant emailed again (duplicate report, no new job). Says tap now drips constantly even when fully closed, getting worse. Visit remains 2026-10-15 08:00-12:00 with Swift Plumbing & Heating. Contractor to be told of the worsening before the visit."}
5. **Tool call** `send_message` {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801","body":"Hi Amelia, thanks for letting us know. Your tap is already booked in under job R-4801: Swift Plumbing & Heating are due on Thursday 15 October, 8am-12pm. I've added a note that it's now dripping constantly so the plumber knows. In the meantime, you c…
   - Result: {"ok":true,"note_id":"NOTE-101"}
[ledger A1, attempt 1] Verified: NOTE-101 found in the add_note log.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
6. **Tool call** `submit_decision` {"case_state":"R-4801 at visit stage, booked 2026-10-15 08:00-12:00 with Swift Plumbing & Heating, confirmed with tenant. Nothing outstanding from us.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Told tenant the tap is already booked under R-4801 for 15 Oct 8-12, noted the worsening, gave isolation valve advice","recipient":"Amelia Clarke, tenant","channel":"email","ledger_id":"A2"},{"type…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/1702 · Cost: $0.0302 · Duration: 12.9s
- Raw event trace: `trace.jsonl`
