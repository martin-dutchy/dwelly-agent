# Case 12: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/attachment_breathing_space.md` (586 chars)
- `inputs/crm.json` (1068 chars)
- `inputs/email_tenant.eml` (384 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"update_ticket":[{"call":1,"mode":"error"}],"record_landlord_decision":[{"call":1,"mode":"timeout"}],"log_call":[{"call":2,"mode":"error"}],"send_message":[{"call":1,"mode":"silent_drop"}],"request_landlord_approval":[{"call":2,"mode":"error"}],"add_note":[{"call":1,"mode":"timeout"}]}
```

## Conflicts between sources
- Scheduled CRM actions (arrears SMS, Section 8 draft) conflict with the Breathing Space notice; the notice takes priority.

## Assumptions
- The attachment is genuine; adviser asked to confirm end date.
- Replying to the tenant-initiated email is permitted.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"T-1020","note":"BREATHING SPACE (standard) from 01/10/2026, adviser Ruth Okoye, Hackney Money Advice CIC ref HMA-55102. Arrears £… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `escalate_to_human` | {"priority":"P2","team":"legal","reason":"Breathing Space in force; payment plan offer; scheduled arrears SMS (12/10) and Section 8 draft (1… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `send_message` | {"recipient_name":"Daniel Reyes","recipient_role":"tenant","channel":"email","contact":"d.reyes@mailbox.example","body":"Hi Daniel, thank yo… | 2 | ✅ verified | MSG-105 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ruth Okoye","recipient_role":"third_party","channel":"email","contact":"ruth.okoye@hackneymoneyadvice.example","body":"De… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Trace
1. **Tool call** `list_tickets` {}
   - Result: {"ok":true,"tickets":[]}
2. **Tool call** `add_note` {"entity":"T-1020","note":"BREATHING SPACE (standard) from 01/10/2026, adviser Ruth Okoye, Hackney Money Advice CIC ref HMA-55102. Arrears £3,700 included. STOP arrears chaser SMS (scheduled 2026-10-12) and Section 8 ground 8 draft review (2026-10-14). No enforcement or arrears contact except tenant-initiated; route via adviser. Current rent and repair contact continue."}
3. **Tool call** `escalate_to_human` {"priority":"P2","team":"legal","reason":"Breathing Space in force; payment plan offer; scheduled arrears SMS (12/10) and Section 8 draft (14/10) must be stopped","known":"Daniel Reyes, Flat 3, 8 Kingsland Road. Arrears £3,700 (2 months), rent £1,850. Emailed 09/10 offering £100/month on top of rent from November; lost job in August; 1 adult, 2 children. Attached notification: standard Breathing S…
4. **Tool call** `send_message` {"recipient_name":"Daniel Reyes","recipient_role":"tenant","channel":"email","contact":"d.reyes@mailbox.example","body":"Hi Daniel, thank you for getting in touch and for sending the letter from your debt adviser. We have received it and noted your breathing space on your account. We are not chasing the arrears while it applies, and any discussion of your offer will go through your adviser, Ruth O…
5. **Tool call** `send_message` {"recipient_name":"Ruth Okoye","recipient_role":"third_party","channel":"email","contact":"ruth.okoye@hackneymoneyadvice.example","body":"Dear Ruth, we have received the breathing space notification (ref HMA-55102, start 01/10/2026) for Daniel Reyes at Flat 3, 8 Kingsland Road, via his email. Arrears contact and enforcement are paused. Mr Reyes has proposed £100 a month on top of rent from Novembe…
   - Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: Request timed out after 10000ms"}
[ledger A1, attempt 1] The API reported an error, but read-back shows the change IS in place (NOTE-101 found in the add_note log). Do not retry.
   - Result: {"ok":true,"escalation_id":"ESC-102"}
[ledger A2, attempt 1] Verified: ESC-102 found in the escalate_to_human log.
   - ⚠️ Result: {"ok":true,"message_id":"MSG-103","status":"sent"}
[ledger A3, attempt 1] NOT APPLIED: MSG-103 was returned but is not in the send_message log. Retry once if safe, otherwise escalate. Never tell anyone it was done.
   - Result: {"ok":true,"message_id":"MSG-104","status":"sent"}
[ledger A4, attempt 1] Verified: MSG-104 found in the send_message log.
6. **Agent:** Retry the tenant message once.
7. **Tool call** `send_message` {"recipient_name":"Daniel Reyes","recipient_role":"tenant","channel":"email","contact":"d.reyes@mailbox.example","body":"Hi Daniel, thank you for getting in touch and for sending the letter from your debt adviser. We have received it and noted your breathing space on your account. We are not chasing the arrears while it applies, and any discussion of your offer will go through your adviser, Ruth O…
   - Result: {"ok":true,"message_id":"MSG-105","status":"sent"}
[ledger A3, attempt 2] Verified: MSG-105 found in the send_message log.
8. **Tool call** `submit_decision` {"case_state":"Breathing Space active from 01/10/2026. Escalated to legal (ESC-102). Plan not accepted. Waiting on legal/landlord decision and adviser confirmation of end date.","next_actions":[{"type":"ESCALATE_TO_HUMAN","action":"Escalate to legal: suspend 12/10 arrears SMS and 14/10 Section 8 draft, decide on plan with landlord","recipient":"internal legal team","channel":"internal","ledger_id"…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/3722 · Cost: $0.0591 · Duration: 24.8s
- Raw event trace: `trace.jsonl`
