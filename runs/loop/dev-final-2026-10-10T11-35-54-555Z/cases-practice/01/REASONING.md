# Case 01: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (1473 chars)
- `inputs/tickets.json` (184 chars)
- `inputs/whatsapp.txt` (553 chars)

## Conflicts between sources
- Tenant says 'not urgent' but described a classic gas-leak symptom; trusted the symptom.

## Assumptions
- Visit window is a target for emergency attendance, not a contractor-confirmed arrival.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","ticket_ref":"R-4801","body":"Hi … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","tenant":"T-1001","description":"Tenant reports rotten-egg (gas) smell from Worc… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-2026-10-10 02:00 emergency out-of-hours attendance"} | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak at Flat 4, 12 Mare Street (P-201), out of hours; 82-year-old visitor prese… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"P-201"}
   - Result: {"ok":true,"tickets":[{"ref":"R-4801","tenant_id":"T-1001","category":"plumbing","stage":"visit","description":"Dripping kitchen tap","visit_date":"2026-10-15"}]}
   - Result: {"ok":true,"property":{"id":"P-201","address":"Flat 4, 12 Mare Street, London E8 1HL","tenanted":true,"landlord":{"name":"Benjamin Hartley","email":"ben.hartley@hartleyhomes.co.uk","phone":"+447700900201","spend_limit_gbp":300,"notes":["Prefers Ben (not Benjamin).","Call before anything over £300 (inc VAT).","Use HeatRight Ltd for boilers if possible."]},"contractors":[{"contractor_id":"C-11","nam…
3. **Agent:** Safety message first, plus ticket.
4. **Tool call** `send_message` {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","ticket_ref":"R-4801","body":"Hi Amelia, a rotten-egg smell from a boiler can mean a gas leak, so please treat this as an emergency tonight. Please do this now: 1) Get everyone out of the flat, including your flatmate's mum. 2) Don't use light switches, lighters, flames or the boiler, and don…
5. **Tool call** `create_ticket` {"property":"P-201","category":"gas","severity":"emergency","tenant":"T-1001","description":"Tenant reports rotten-egg (gas) smell from Worcester 30i combi boiler when it fires up. Elderly (82) visitor in the flat. Possible gas leak; tenant said 'not urgent' but treated as emergency."}
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"ref":"JOB-102","stage":"init"}
[ledger A2, attempt 1] Verified: Ticket JOB-102 read back at stage init.
6. **Tool call** `assign_contractor` {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-2026-10-10 02:00 emergency out-of-hours attendance"}
7. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Possible gas leak at Flat 4, 12 Mare Street (P-201), out of hours; 82-year-old visitor present","known":"Tenant Amelia Clarke (WhatsApp 22:40, 09/10) reports rotten-egg smell when boiler fires (Worcester 30i, 2017). Called it 'not urgent'. Elderly visitor (82) staying. Kitchen CO alarm fitted 2022. Told tenant to leave, avoid switches/flames, call 08…
8. **Tool call** `send_message` {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-102","body":"Hi Ben, tonight at 22:40 the tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We treated it as a possible gas leak: she's been told to leave the flat and call the National Gas Emergency line, and we've assigned HeatRigh…
   - Result: {"ok":true,"ticket_ref":"JOB-102","stage":"visit","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-2026-10-10 02:00 emergency out-of-hours attendance"}
[ledger A3, attempt 1] Verified: Ticket JOB-102 read back at stage visit.
   - Result: {"ok":true,"escalation_id":"ESC-103"}
[ledger A4, attempt 1] Verified: ESC-103 found in the escalate_to_human log.
   - Result: {"ok":true,"message_id":"MSG-104","status":"sent"}
[ledger A5, attempt 1] Verified: MSG-104 found in the send_message log.
9. **Tool call** `submit_decision` {"case_state":"Emergency job JOB-102 at visit stage, HeatRight assigned for out-of-hours attendance (arrival not yet confirmed by them). Tenant told to evacuate and call gas line; awaiting her confirmation. Human P1 escalation ESC-103 open. Landlord informed.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Told tenant to leave, no switches/flames, call 0800 111 999, 999 if unwell","recipient"…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/3570 · Cost: $0.0587 · Duration: 25.8s
- Raw event trace: `trace.jsonl`
