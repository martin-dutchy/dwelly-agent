# Case 07: REASONING

## What the system received
- `inputs/crm.json` (1144 chars)
- `inputs/email_tenant.eml` (338 chars)
- `inputs/tickets.json` (359 chars)

## Conflicts between sources
_None identified._

## Assumptions
- The sender's address matches the CRM email, so I treated her as the tenant and replied to the email on file.
- Her description of the tap is not an emergency. The 15 Oct visit is within the 14-day routine target.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"R-4801","note":"10 Oct: tenant emailed that the tap is getting worse and now drips constantly even when fully closed. No new tick… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","body":"Hello Amelia… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_ticket` {"ref":"R-4801"}
   - Result: {"ok":true,"tickets":[{"ref":"R-4801","tenant_id":"T-1001","category":"plumbing","urgency":"routine","stage":"visit","description":"Dripping kitchen tap","created":"2026-10-01","assigned_contractor":"C-12","visit":{"date":"2026-10-15","window":"08:00-12:00","confirmed_with_tenant":true}}]}
   - Result: {"ok":true,"ticket":{"ref":"R-4801","tenant_id":"T-1001","category":"plumbing","urgency":"routine","stage":"visit","description":"Dripping kitchen tap","created":"2026-10-01","assigned_contractor":"C-12","visit":{"date":"2026-10-15","window":"08:00-12:00","confirmed_with_tenant":true}}}
3. **Tool call** `add_note` {"entity":"R-4801","note":"10 Oct: tenant emailed that the tap is getting worse and now drips constantly even when fully closed. No new ticket (duplicate). Visit remains 15 Oct 08:00-12:00 with Swift Plumbing & Heating. Contractor to be aware of worsening; tenant told to turn off isolation valve under the sink if it worsens."}
4. **Tool call** `send_message` {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"email","contact":"amelia.clarke@mailbox.example","body":"Hello Amelia, thanks for letting us know. Your tap is already booked in under job R-4801: Swift Plumbing & Heating are due to visit on Thursday 15 October, 08:00-12:00. We haven't opened a second job, but I've added a note that it's getting worse and now drips constantly …
   - Result: {"ok":true,"note_id":"NOTE-101"}
[ledger A1, attempt 1] Verified: NOTE-101 found in the add_note log.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
5. **Tool call** `submit_decision` {"outcome":"action_taken","severity":"routine","summary":"The tenant's email is about the same dripping tap already booked as R-4801 (visit 15 Oct, 08:00-12:00, Swift Plumbing & Heating). No new job was created. I added a note about the worsening drip to R-4801 and replied to the tenant.","answers":[{"question":"Should a new repair job be created?","answer":"No. R-4801 is open for the same issue, …
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/1413 · Cost: $0.0394 · Duration: 12.5s
- Raw event trace: `trace.jsonl`
