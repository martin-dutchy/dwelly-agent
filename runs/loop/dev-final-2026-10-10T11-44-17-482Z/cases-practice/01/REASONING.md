# Case 01: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- Case brief (757 chars)
- `inputs/crm.json` (1473 chars)
- `inputs/tickets.json` (184 chars)
- `inputs/whatsapp.txt` (553 chars)

## Conflicts between sources
- Tenant says 'not urgent' but the described symptom is a gas-leak indicator; treated as an emergency.

## Assumptions
- The visit window 23:00-02:00 is an emergency target, not a confirmed arrival time.
- The tenant's message about the bins was handled earlier and needs no action.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for tel… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant reports rotten-egg (gas) smell from Worcester combi boiler… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-02:00 emergency out-of-hours attendance (make safe)"} | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (P-201), out of hours","known":"Tenant Amelia C… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, ton… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Trace
1. **Tool call** `send_message` {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for telling us. A rotten-egg smell from a boiler can be a gas leak, so please treat it as urgent tonight. Please: 1) Turn the boiler off and don't use any flames or light switches near it. 2) Open the windows and doors. 3) Get everyone out of the flat, including your…
   - `send_message` result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
2. **Tool call** `list_tickets` {}
   - `list_tickets` result: {"ok":true,"tickets":[{"ref":"R-4801","tenant_id":"T-1001","category":"plumbing","stage":"visit","description":"Dripping kitchen tap","visit_date":"2026-10-15"}]}
3. **Tool call** `create_ticket` {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant reports rotten-egg (gas) smell from Worcester combi boiler when it fires. Possible gas leak. 82-year-old visitor in flat. Tenant told to evacuate and call 0800 111 999. Gas Safe engineer needed tonight to make safe.","tenant":"T-1001","related_ticket_ref":"R-4801"}
   - `create_ticket` result: {"ok":true,"ref":"JOB-102","stage":"init"}
[ledger A2, attempt 1] Verified: Ticket JOB-102 read back at stage init.
4. **Tool call** `assign_contractor` {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-02:00 emergency out-of-hours attendance (make safe)"}
   - `assign_contractor` result: {"ok":true,"ticket_ref":"JOB-102","stage":"visit","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-02:00 emergency out-of-hours attendance (make safe)"}
[ledger A3, attempt 1] Verified: Ticket JOB-102 read back at stage visit.
5. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (P-201), out of hours","known":"Tenant Amelia Clarke reported at 22:40 on WhatsApp a rotten-egg smell when boiler fires (Worcester 30i, 2017); she called it \"not urgent\". 82-year-old visitor staying. CO alarm in kitchen. Tenant told to evacuate, avoid switches/flames, call 0800 111 999, 999 if unwell. JO…
   - `escalate_to_human` result: {"ok":true,"escalation_id":"ESC-103"}
[ledger A4, attempt 1] Verified: ESC-103 found in the escalate_to_human log.
6. **Tool call** `send_message` {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, tonight at 22:40 the tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We've treated it as a suspected gas leak: she's been told to leave the flat and call the National Gas Emergency line, and we've instructed HeatRight Ltd (your prefe…
   - `send_message` result: {"ok":true,"message_id":"MSG-104","status":"sent"}
[ledger A5, attempt 1] Verified: MSG-104 found in the send_message log.
7. **Tool call** `submit_decision` {"case_state":"Emergency JOB-102 open, HeatRight assigned for out-of-hours make-safe, P1 escalated, landlord and tenant informed. Waiting on tenant confirmation she is out and HeatRight's arrival.","next_actions":[{"type":"ESCALATE_TO_HUMAN","action":"P1 escalation so a human phones HeatRight (fallback Swift) to confirm attendance and checks on the tenant","recipient":"internal maintenance","chann…
   - `submit_decision` result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/3452 · Cost: $0.0598 · Duration: 24.6s
- Raw event trace: `trace.jsonl`
