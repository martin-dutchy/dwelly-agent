# Case 01: REASONING

## What the system received
- `inputs/crm.json` (1473 chars)
- `inputs/tickets.json` (184 chars)
- `inputs/whatsapp.txt` (553 chars)

## Conflicts between sources
- Tenant says 'not urgent' but the symptom indicates a gas emergency; I trusted the symptom.

## Assumptions
- The visit window of 08:00-12:00 is a target. HeatRight has not yet confirmed. Her request not to come too early is respected by this window.
- The WhatsApp number matches the CRM record, so the safety advice went to the right person. No account details were shared.
- The existing ticket R-4801 (dripping tap) is unrelated, so this is not a duplicate.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for tel… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `create_ticket` | {"property":"P-201","tenant":"T-1001","category":"gas","severity":"emergency","description":"Tenant reports rotten-egg (gas) smell from Worc… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `assign_contractor` | {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-10 08:00-12:00"} | 1 | ✅ verified | Ticket JOB-102 read back at stage visit |
| A4 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (P-201), out of hours, 82-year-old visitor pres… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A5 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, ton… | 1 | ✅ verified | MSG-104 found in the send_message log |

## Trace
1. **Tool call** `list_tickets` {}
   - Result: {"ok":true,"tickets":[{"ref":"R-4801","tenant_id":"T-1001","category":"plumbing","stage":"visit","description":"Dripping kitchen tap","visit_date":"2026-10-15"}]}
2. **Tool call** `send_message` {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"whatsapp","contact":"+447700900101","body":"Hi Amelia, thanks for telling us. A rotten-egg smell from a boiler can mean a gas leak, so please treat this as an emergency, even though it's late. Please do this now: 1) Don't use any light switches, flames, or anything electrical near the boiler. 2) Open the windows and doors, and …
3. **Tool call** `create_ticket` {"property":"P-201","tenant":"T-1001","category":"gas","severity":"emergency","description":"Tenant reports rotten-egg (gas) smell from Worcester 30i combi boiler when it fires. Suspected gas leak. Elderly (82) visitor in the flat. Tenant advised to evacuate and call 0800 111 999. Gas Safe engineer needed within 24h; boiler to stay off."}
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"ref":"JOB-102","stage":"init"}
[ledger A2, attempt 1] Verified: Ticket JOB-102 read back at stage init.
4. **Tool call** `assign_contractor` {"ticket_ref":"JOB-102","contractor":"HeatRight Ltd","visit_window":"2026-10-10 08:00-12:00"}
5. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Suspected gas leak at Flat 4, 12 Mare Street (P-201), out of hours, 82-year-old visitor present","known":"Tenant Amelia Clarke WhatsApp 22:40 9 Oct: eggy smell when boiler fires (Worcester 30i, 2017), CO alarm in kitchen. Tenant called it 'not urgent'. Flatmate's 82-year-old mum staying. Tenant sent evacuation and 0800 111 999 advice (MSG-101). Emerg…
6. **Tool call** `send_message` {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","body":"Hi Ben, tonight your tenant at Flat 4, 12 Mare Street reported a rotten-egg smell from the boiler. We're treating it as a suspected gas leak. She's been told to leave the flat and call the National Gas Emergency line. We've opened emergency job JOB-102 and booked your pr…
   - Result: {"ok":true,"ticket_ref":"JOB-102","stage":"visit","contractor":"HeatRight Ltd","visit_window":"2026-10-10 08:00-12:00"}
[ledger A3, attempt 1] Verified: Ticket JOB-102 read back at stage visit.
   - Result: {"ok":true,"escalation_id":"ESC-103"}
[ledger A4, attempt 1] Verified: ESC-103 found in the escalate_to_human log.
   - Result: {"ok":true,"message_id":"MSG-104","status":"sent"}
[ledger A5, attempt 1] Verified: MSG-104 found in the send_message log.
7. **Tool call** `submit_decision` {"outcome":"escalated","severity":"emergency","summary":"Tenant described a rotten-egg smell from the boiler, which is a suspected gas leak, and called it 'not urgent'. I told her to evacuate and call 0800 111 999, opened emergency JOB-102, assigned HeatRight Ltd, emailed the landlord and escalated P1.","answers":[{"question":"1. What severity is this and why?","answer":"Emergency. A rotten-egg sm…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/2975 · Cost: $0.0606 · Duration: 22.0s
- Raw event trace: `trace.jsonl`
