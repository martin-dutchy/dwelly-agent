# Case 01: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (1473 chars)
- `inputs/tickets.json` (184 chars)
- `inputs/whatsapp.txt` (553 chars)

## Conflicts between sources
- The CRM marks the tenant as not vulnerable, but the WhatsApp message says an 82-year-old is staying in the flat. I treated the occupancy as vulnerable for safety purposes and flagged it for the on-call team.
- The tenant describes the issue as "not urgent", but the symptom is a gas-leak sign. Safety took priority over her description.

## Assumptions
- A rotten-egg smell is treated as a possible gas leak until a Gas Safe engineer says otherwise.
- HeatRight Ltd (C-11) is the preferred boiler contractor per the landlord's notes and is out of hours.
- The emergency make-safe is allowed without landlord approval under the emergency exception in policy.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant reports boiler (Worcester 30i, fitted 2017) giving off a r… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","ticket_ref":"R-4801","body":"Hi … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"sms","contact":"+447700900201","ticket_ref":"R-4801","body":"Hi Ben, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","ticket_ref":"R-4801","body":"EMER… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak at P-201 (rotten-egg smell from boiler), reported out of hours. Tenant tol… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Trace
1. **Tool call** `create_ticket` {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant reports boiler (Worcester 30i, fitted 2017) giving off a rotten-egg smell when it fires up, reported 09/10/2026 22:40 via WhatsApp. Possible gas leak. Tenant says \"not urgent\" but this is treated as an emergency. A vulnerable adult (82, a guest of the flatmate) may be staying at the property. Tenant told to leave, …
2. **Tool call** `send_message` {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","ticket_ref":"R-4801","body":"Hi Amelia, thanks for telling us. A rotten-egg smell from the boiler can mean a gas leak, so we are treating this as an emergency, even though it is out of hours. Please do this now:\n1. Open the windows and doors and leave the flat with everyone in it, including…
3. **Tool call** `send_message` {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"sms","contact":"+447700900201","ticket_ref":"R-4801","body":"Hi Ben, Amelia Clarke at Flat 4, 12 Mare Street reports a rotten-egg smell from the boiler when it fires up. We are treating it as a possible gas leak. The tenant has been told to leave the flat and call 0800 111 999. We are sending HeatRight Ltd out tonight to make i…
4. **Tool call** `send_message` {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","ticket_ref":"R-4801","body":"EMERGENCY gas call-out, Flat 4, 12 Mare Street, London E8 1HL (P-201). Tenant Amelia Clarke reports a rotten-egg smell from a Worcester 30i combi boiler (fitted 2017) when it fires up. Please attend tonight to make safe and confirm your arrival time. Tenant has be…
5. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Possible gas leak at P-201 (rotten-egg smell from boiler), reported out of hours. Tenant told to leave and call 0800 111 999. Needs a gas engineer tonight and an on-call person to confirm the make-safe.","known":"WhatsApp 09/10/2026 22:40 from Amelia Clarke (T-1001): smell \"like rotten eggs\" when boiler fires. Says \"not urgent\", but flatmate's mo…
   - Result: {"ok":true,"ref":"JOB-101","stage":"init"}
[ledger A1, attempt 1] Verified: Ticket JOB-101 read back at stage init.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-103","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-103 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-104","status":"sent"}
[ledger A4, attempt 1] Verified: MSG-104 found in the send_message log.
   - Result: {"ok":true,"escalation_id":"ESC-105"}
[ledger A5, attempt 1] Verified: ESC-105 found in the escalate_to_human log.
6. **Tool call** `submit_decision` {"case_state":"Emergency gas call at P-201 (Flat 4, 12 Mare Street), reported 22:40 Fri 09/10/2026. Job JOB-101 is open at init. Tenant has been told to leave and call 0800 111 999. HeatRight Ltd has been asked to attend tonight, but no attendance time is confirmed yet. Escalation ESC-105 is with the on-call maintenance team.","next_actions":[{"action":"Tenant told to leave the flat, avoid switche…
   - Result: Decision recorded.

## Run
- Model turns: 2 · Tokens in/out: 6/5282 · Cost: $0.0056 · Duration: 21.7s
- Raw event trace: `trace.jsonl`
