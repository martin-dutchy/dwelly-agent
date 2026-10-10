# Case 01: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (1473 chars)
- `inputs/tickets.json` (184 chars)
- `inputs/whatsapp.txt` (553 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"update_ticket":[{"call":1,"mode":"error"}],"resume_auto":[{"call":2,"mode":"timeout"}],"record_landlord_decision":[{"call":1,"mode":"error"},{"call":2,"mode":"silent_drop"}],"set_visit":[{"call":2,"mode":"silent_drop"}],"skip_document":[{"call":2,"mode":"timeout"}],"confirm_keys_returned":[{"call":1,"mode":"silent_drop"}],"close_ticket":[{"call":1,"mode":"silent_drop"}],"request_information":[{"call":2,"mode":"error"}],"hold_payment":[{"call":2,"mode":"error"}]}
```

## Conflicts between sources
- Tenant says 'not urgent' but symptom indicates gas emergency; trusted the symptom.

## Assumptions
- Smell is from gas until a Gas Safe engineer says otherwise
- Emergency make-safe needs no landlord approval
- Tenant WhatsApp number on file is correct

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, a rotten-egg s… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","tenant":"T-1001","description":"Tenant reports rotten-egg (gas) smell when boil… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-2026-10-10 02:00 emergency attendance (time to be conf… | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (JOB-102), out of hours","known":"Tenant Amelia… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"P-201"}
   - Result: {"ok":true,"tickets":[{"ref":"R-4801","tenant_id":"T-1001","category":"plumbing","stage":"visit","description":"Dripping kitchen tap","visit_date":"2026-10-15"}]}
   - Result: {"ok":true,"property":{"id":"P-201","address":"Flat 4, 12 Mare Street, London E8 1HL","tenanted":true,"landlord":{"name":"Benjamin Hartley","email":"ben.hartley@hartleyhomes.co.uk","phone":"+447700900201","spend_limit_gbp":300,"notes":["Prefers Ben (not Benjamin).","Call before anything over £300 (inc VAT).","Use HeatRight Ltd for boilers if possible."]},"contractors":[{"contractor_id":"C-11","nam…
3. **Tool call** `send_message` {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, a rotten-egg smell from a boiler can mean a gas leak, so please treat this as an emergency tonight. Please do this now: 1) Turn the boiler off and don't use any switches, flames or lighters. 2) Open the windows and doors. 3) Get everyone out of the flat, including your flat…
4. **Tool call** `create_ticket` {"property":"P-201","category":"gas","severity":"emergency","tenant":"T-1001","description":"Tenant reports rotten-egg (gas) smell when boiler fires up (Worcester 30i). Possible gas leak. Elderly (82) visitor in the flat. Tenant told to leave, call 0800 111 999. Gas Safe engineer needed tonight; boiler to stay off until certified safe."}
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"ref":"JOB-102","stage":"init"}
[ledger A2, attempt 1] Verified: Ticket JOB-102 read back at stage init.
5. **Tool call** `assign_contractor` {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-2026-10-10 02:00 emergency attendance (time to be confirmed by contractor)"}
6. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (JOB-102), out of hours","known":"Tenant Amelia Clarke (T-1001) WhatsApp 22:40: eggy smell when boiler fires, called it \"not urgent\". Elderly 82-year-old visitor present. Not flagged vulnerable on record. Boiler Worcester 30i; CO alarm in kitchen. Told to leave, ventilate, no switches/flames, call 0800 1…
7. **Tool call** `send_message` {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-102","body":"Hi Ben, tonight (9 Oct, 22:40) the tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We are treating it as a suspected gas leak: she has been told to leave, ventilate and call the National Gas Emergency line. We have rai…
   - Result: {"ok":true,"ticket_ref":"JOB-102","stage":"visit","contractor":"HeatRight Ltd","visit_window":"2026-10-09 23:00-2026-10-10 02:00 emergency attendance (time to be confirmed by contractor)"}
[ledger A3, attempt 1] Verified: Ticket JOB-102 read back at stage visit.
   - Result: {"ok":true,"escalation_id":"ESC-103"}
[ledger A4, attempt 1] Verified: ESC-103 found in the escalate_to_human log.
   - Result: {"ok":true,"message_id":"MSG-104","status":"sent"}
[ledger A5, attempt 1] Verified: MSG-104 found in the send_message log.
8. **Tool call** `submit_decision` {"case_state":"Emergency job JOB-102 at visit stage, HeatRight assigned (arrival time unconfirmed). Tenant told to evacuate and call gas line; awaiting her reply. P1 escalation ESC-103 open. Landlord informed.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Safety instructions: leave, ventilate, no switches/flames, call 0800 111 999, 999 if unwell","recipient":"Amelia Clarke, tenant","channel…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/3738 · Cost: $0.0604 · Duration: 26.5s
- Raw event trace: `trace.jsonl`
