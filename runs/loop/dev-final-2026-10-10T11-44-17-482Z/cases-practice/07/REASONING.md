# Case 07: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- Case brief (554 chars)
- `inputs/crm.json` (1144 chars)
- `inputs/email_tenant.eml` (338 chars)
- `inputs/tickets.json` (359 chars)

## Conflicts between sources
_None identified._

## Assumptions
- The tap in the email is the same one as in R-4801 (the tenant says 'still dripping').

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"Tenant emailed 2026-10-10: tap now drips constantly even when fully closed (worse than at logging). Treated as up… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-12","purpose":"Check whether Swift Plumbing can attend earlier than 15 Oct given tap worsening; update tenant","ticket_re… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Trace
1. **Tool call** `list_tickets` {}
   - `list_tickets` result: {"ok":true,"tickets":[{"ref":"R-4801","tenant_id":"T-1001","category":"plumbing","urgency":"routine","stage":"visit","description":"Dripping kitchen tap","created":"2026-10-01","assigned_contractor":"C-12","visit":{"date":"2026-10-15","window":"08:00-12:00","confirmed_with_tenant":true}}]}
2. **Tool call** `get_ticket` {"ref":"R-4801"}
   - `get_ticket` result: {"ok":true,"ticket":{"ref":"R-4801","tenant_id":"T-1001","category":"plumbing","urgency":"routine","stage":"visit","description":"Dripping kitchen tap","created":"2026-10-01","assigned_contractor":"C-12","visit":{"date":"2026-10-15","window":"08:00-12:00","confirmed_with_tenant":true}}}
3. **Tool call** `add_note` {"entity":"R-4801","note":"Tenant emailed 2026-10-10: tap now drips constantly even when fully closed (worse than at logging). Treated as update to this job, not a new one. Visit 15 Oct 08:00-12:00 with Swift Plumbing & Heating stands. Contractor to be told of worsening; earlier visit if possible."}
   - `add_note` result: {"ok":true,"note_id":"NOTE-101"}
[ledger A1, attempt 1] Verified: NOTE-101 found in the add_note log.
4. **Tool call** `send_message` {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","ticket_ref":"R-4801","body":"Hi Amelia, thanks for letting us know. Your tap repair is already booked (ref R-4801): Swift Plumbing & Heating are due on Thursday 15 October, 8am-12pm. We haven't opened a second job, but we've added a note that the drip is now constant, and will a…
   - `send_message` result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
5. **Tool call** `schedule_follow_up` {"due_on":"2026-10-12","purpose":"Check whether Swift Plumbing can attend earlier than 15 Oct given tap worsening; update tenant","ticket_ref":"R-4801"}
   - `schedule_follow_up` result: {"ok":true,"follow_up_id":"FUP-103"}
[ledger A3, attempt 1] Verified: FUP-103 found in the schedule_follow_up log.
6. **Tool call** `submit_decision` {"case_state":"R-4801 at visit stage, Swift Plumbing & Heating booked 15 Oct 08:00-12:00, confirmed with tenant. Note added about worsening drip. Follow-up set for 12 Oct.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Told tenant the existing job and 15 Oct visit stand, no new job, isolation valve tip, next update by 12 Oct","recipient":"Amelia Clarke, tenant","channel":"email","ledger_id":…
   - `submit_decision` result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/1942 · Cost: $0.0374 · Duration: 14.7s
- Raw event trace: `trace.jsonl`
