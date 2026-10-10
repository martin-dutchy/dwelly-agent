# Case 01: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (1473 chars)
- `inputs/tickets.json` (184 chars)
- `inputs/whatsapp.txt` (553 chars)

## Conflicts between sources
- Tenant says "not urgent" but describes a rotten-egg smell from a gas boiler. Safety takes priority, so I treated it as an emergency.
- CRM marks the tenant as not vulnerable, but a visitor aged 82 is now staying. I took this into account for safety, but did not change the tenant record.

## Assumptions
- The smell is from the gas supply, so the emergency line and a Gas Safe engineer are the right route.
- HeatRight Ltd (C-11) is the landlord's preferred boiler contractor and is out of hours, as the CRM records.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant Amelia Clarke reports boiler (Worcester 30i, gas combi) ma… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for tel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, Ame… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","body":"URGENT gas job, Flat 4, 12… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Possible gas leak at P-201 (rotten egg smell from gas boiler, reported 22:40 Fri 09/10/2026)… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |
| A6 | `add_note` | {"entity":"JOB-101","note":"Correction: A2 (tenant WhatsApp) and A3 (landlord email) were sent with the placeholder ref \"R-PENDING\". Their… | 1 | ✅ verified | NOTE-106 found in the add_note log |

## Trace
1. **Tool call** `create_ticket` {"property":"P-201","category":"gas","severity":"emergency","description":"Tenant Amelia Clarke reports boiler (Worcester 30i, gas combi) making a rotten-egg smell when it fires up, reported 09/10/2026 22:40 via WhatsApp. Possible gas leak. Tenant told to leave, avoid switches/flames, and call National Gas Emergency 0800 111 999. Visitor at property is 82 (flatmate's mother). Urgent gas attendance…
2. **Tool call** `send_message` {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for telling us. A rotten egg smell from a boiler can mean a gas leak, so please treat this as an emergency tonight, even though it's late:\n1. Open the windows and leave the flat now, taking your flatmate and her mum with you.\n2. Don't touch light switches, the door…
3. **Tool call** `send_message` {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, Amelia Clarke at Flat 4, 12 Mare Street reported at 22:40 tonight that the boiler gives off a rotten egg smell when it fires up. We're treating it as a possible gas leak. We've told her to leave the flat, avoid switches and flames, and call the National Gas Emerg…
4. **Tool call** `send_message` {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","body":"URGENT gas job, Flat 4, 12 Mare Street, London E8 1HL (P-201). Tenant Amelia Clarke (+447700900101) reports a rotten egg smell from the Worcester 30i combi boiler when it fires up, reported 22:40 tonight. Tenant has been told to leave and call 0800 111 999. Please confirm tonight wheth…
   - Result: {"ok":true,"ref":"JOB-101","stage":"init"}
[ledger A1, attempt 1] Verified: Ticket JOB-101 read back at stage init.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-103","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-103 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-104","status":"sent"}
[ledger A4, attempt 1] Verified: MSG-104 found in the send_message log.
5. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Possible gas leak at P-201 (rotten egg smell from gas boiler, reported 22:40 Fri 09/10/2026). Gas emergency: needs Gas Safe engineer tonight and a human to oversee it.","known":"Tenant Amelia Clarke (T-1001) WhatsApp 22:40: boiler makes a rotten-egg smell on firing. Tenant has been told to leave, avoid switches/flames, and call 0800 111 999 (ledger A…
6. **Tool call** `add_note` {"entity":"JOB-101","note":"Correction: A2 (tenant WhatsApp) and A3 (landlord email) were sent with the placeholder ref \"R-PENDING\". Their content refers to this job, JOB-101. No ticket was created under R-PENDING. Tenant message A2 and landlord email A3 both relate to JOB-101. Gas emergency escalated to P1 maintenance."}
   - Result: {"ok":true,"escalation_id":"ESC-105"}
[ledger A5, attempt 1] Verified: ESC-105 found in the escalate_to_human log.
   - Result: {"ok":true,"note_id":"NOTE-106"}
[ledger A6, attempt 1] Verified: NOTE-106 found in the add_note log.
7. **Tool call** `submit_decision` {"case_state":"Emergency gas job JOB-101 opened at stage init for P-201 (Flat 4, 12 Mare Street). Tenant told to leave and call 0800 111 999. Landlord informed. HeatRight Ltd texted for urgent attendance; no confirmed time yet. P1 escalation ESC-105 raised for the human to secure attendance tonight.","next_actions":[{"action":"Phone HeatRight Ltd on +447700900311 to secure an urgent gas attendance…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/5750 · Cost: $0.0040 · Duration: 26.0s
- Raw event trace: `trace.jsonl`
