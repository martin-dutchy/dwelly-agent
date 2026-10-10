# Case 01: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (1473 chars)
- `inputs/tickets.json` (184 chars)
- `inputs/whatsapp.txt` (553 chars)

## Conflicts between sources
- Tenant says 'not urgent' but symptoms indicate a gas emergency; trusted the symptoms.

## Assumptions
- Visit window is an emergency target, not a confirmed appointment
- Tenant's request for not-too-early visit is secondary to safety

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for tel… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","tenant":"T-1001","description":"Tenant reports rotten-egg (gas) smell from comb… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-2026-10-10 02:00 (emergency attendance, target within … | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (JOB-102), out of hours","known":"Tenant Amelia… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, ton… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Trace
1. **Tool call** `send_message` {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for telling us. A rotten-egg smell from a boiler can be a gas leak, so please treat it as an emergency, even though it feels minor. Please do this now: 1) Don't use the boiler, light switches, flames or anything that could spark. 2) Open doors and windows. 3) Get eve…
2. **Tool call** `list_tickets` {}
3. **Tool call** `get_property` {"property":"P-201"}
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"tickets":[{"ref":"R-4801","tenant_id":"T-1001","category":"plumbing","stage":"visit","description":"Dripping kitchen tap","visit_date":"2026-10-15"}]}
   - Result: {"ok":true,"property":{"id":"P-201","address":"Flat 4, 12 Mare Street, London E8 1HL","tenanted":true,"landlord":{"name":"Benjamin Hartley","email":"ben.hartley@hartleyhomes.co.uk","phone":"+447700900201","spend_limit_gbp":300,"notes":["Prefers Ben (not Benjamin).","Call before anything over £300 (inc VAT).","Use HeatRight Ltd for boilers if possible."]},"contractors":[{"contractor_id":"C-11","nam…
4. **Tool call** `create_ticket` {"property":"P-201","category":"gas","severity":"emergency","tenant":"T-1001","description":"Tenant reports rotten-egg (gas) smell from combi boiler when it fires. 82-year-old guest in the flat. Tenant told to evacuate, avoid ignition sources and call 0800 111 999. Gas Safe engineer needed urgently."}
   - Result: {"ok":true,"ref":"JOB-102","stage":"init"}
[ledger A2, attempt 1] Verified: Ticket JOB-102 read back at stage init.
5. **Tool call** `assign_contractor` {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-2026-10-10 02:00 (emergency attendance, target within 24h; subject to engineer availability)"}
6. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (JOB-102), out of hours","known":"Tenant Amelia Clarke (T-1001) WhatsApp 22:40 9 Oct: eggy smell when boiler fires, called it 'not urgent'. Elderly (82) guest present. Tenant told to evacuate, no switches/flames, ring 0800 111 999 (MSG-101). JOB-102 emergency created; HeatRight Ltd (Gas Safe 550123, out of…
7. **Tool call** `send_message` {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, tonight at 22:40 your tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We are treating it as a gas emergency: she has been told to leave, avoid switches and flames, and call the National Gas Emergency line (0800 111 999). We have inst…
   - Result: {"ok":true,"ticket_ref":"JOB-102","stage":"visit","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-2026-10-10 02:00 (emergency attendance, target within 24h; subject to engineer availability)"}
[ledger A3, attempt 1] Verified: Ticket JOB-102 read back at stage visit.
   - Result: {"ok":true,"escalation_id":"ESC-103"}
[ledger A4, attempt 1] Verified: ESC-103 found in the escalate_to_human log.
   - Result: {"ok":true,"message_id":"MSG-104","status":"sent"}
[ledger A5, attempt 1] Verified: MSG-104 found in the send_message log.
8. **Tool call** `submit_decision` {"case_state":"Emergency gas job JOB-102 at visit stage, HeatRight assigned; P1 escalation ESC-103 open; waiting on tenant to confirm she is safe and on engineer attendance.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Gas safety instructions: evacuate, no switches/flames, call 0800 111 999, 999 if unwell","recipient":"Amelia Clarke, tenant","channel":"whatsapp","ledger_id":"A1"},{"type":"…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/3416 · Cost: $0.0570 · Duration: 22.7s
- Raw event trace: `trace.jsonl`
