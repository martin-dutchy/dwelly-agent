# Case 07: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (1144 chars)
- `inputs/email_tenant.eml` (338 chars)
- `inputs/tickets.json` (359 chars)

## Conflicts between sources
_None identified._

## Assumptions
- An isolation valve is likely fitted under the sink; tenant told to call if not.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"Tenant emailed 2026-10-10: tap now drips constantly even when fully closed (worsening). Duplicate of this job, no… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"sms","contact":"+447700900312","ticket_ref":"R-4801","… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_ticket` {"ref":"R-4801"}
   - Result: {"ok":true,"tickets":[{"ref":"R-4801","tenant_id":"T-1001","category":"plumbing","urgency":"routine","stage":"visit","description":"Dripping kitchen tap","created":"2026-10-01","assigned_contractor":"C-12","visit":{"date":"2026-10-15","window":"08:00-12:00","confirmed_with_tenant":true}}]}
   - Result: {"ok":true,"ticket":{"ref":"R-4801","tenant_id":"T-1001","category":"plumbing","urgency":"routine","stage":"visit","description":"Dripping kitchen tap","created":"2026-10-01","assigned_contractor":"C-12","visit":{"date":"2026-10-15","window":"08:00-12:00","confirmed_with_tenant":true}}}
3. **Agent:** Duplicate; add note, reply to tenant, tell contractor it's worsening.
4. **Tool call** `add_note` {"entity":"R-4801","note":"Tenant emailed 2026-10-10: tap now drips constantly even when fully closed (worsening). Duplicate of this job, no new ticket. Visit 15 Oct 08:00-12:00 stands. Contractor asked to note worsening and advise if earlier attendance possible. Tenant advised to isolate tap supply under sink if needed."}
5. **Tool call** `send_message` {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801","body":"Hi Amelia, thanks for letting us know. We already have a job open for your kitchen tap (R-4801), so we haven't opened a new one. Swift Plumbing & Heating are booked for Thursday 15 October, 08:00-12:00. We've added a note that the drip is getting wor…
6. **Tool call** `send_message` {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"sms","contact":"+447700900312","ticket_ref":"R-4801","body":"R-4801 Flat 4, 12 Mare Street: tenant reports the kitchen tap is worse, now dripping constantly when fully closed. Visit is booked 15 Oct 08:00-12:00. Please bring washers/cartridge, and tell us if you can attend earlier."}
   - Result: {"ok":true,"note_id":"NOTE-101"}
[ledger A1, attempt 1] Verified: NOTE-101 found in the add_note log.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-103","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-103 found in the send_message log.
7. **Tool call** `submit_decision` {"case_state":"R-4801 at visit stage, Swift Plumbing booked 15 Oct 08:00-12:00, confirmed with tenant. Waiting on contractor to attend/advise on earlier slot.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Told tenant the existing job R-4801 covers this, visit date, interim isolation advice","recipient":"Amelia Clarke, tenant","channel":"email","ledger_id":"A2"},{"type":"CHASE_PROVIDER","act…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/1999 · Cost: $0.0343 · Duration: 15.6s
- Raw event trace: `trace.jsonl`
