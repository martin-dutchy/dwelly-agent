# Case 13: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/compliance.json` (457 chars)
- `inputs/crm.json` (845 chars)
- `inputs/emails_access.txt` (403 chars)
- `inputs/legacy_notes.csv` (180 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"assign_contractor":[{"call":2,"mode":"timeout"}],"put_on_hold":[{"call":1,"mode":"silent_drop"}],"skip_document":[{"call":2,"mode":"timeout"}],"update_bank_details":[{"call":1,"mode":"error"}]}
```

## Conflicts between sources
- Legacy note says cert renewed 2025 with no date; the compliance record gives exact dates and expiry, which I trusted. get_property returned not found, so I used the case inputs.

## Assumptions
- A gas safety check costs less than the £300 landlord limit; the quote is still to be confirmed.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) due; current record expires 2026-10-1… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","ticket_ref":"JOB-101","body":"Hi,… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant and HeatRight replies; if no contact, phone tenant, send letter/notice… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"P-230"}
   - Result: {"ok":true,"tickets":[]}
   - ⚠️ Result: {"ok":false,"error":"not_found","say":"No property record: rely on the case inputs."}
3. **Tool call** `create_ticket` {"property":"P-230","category":"gas","severity":"urgent","description":"Annual gas safety check (CP12) due; current record expires 2026-10-16. Tenant not responded to emails 25 Sep, 2 Oct or SMS 2 Oct. Need access before expiry, 24h written notice.","tenant":"T-1030"}
   - Result: {"ok":true,"ref":"JOB-101","stage":"init"}
[ledger A1, attempt 1] Verified: Ticket JOB-101 read back at stage init.
4. **Tool call** `send_message` {"recipient_name":"Luca Bianchi","recipient_role":"tenant","channel":"email","contact":"luca.bianchi@mailbox.example","ticket_ref":"JOB-101","body":"Hi Luca, your yearly gas safety check at 19 Victoria Park Road is due before 16 October. It is a legal requirement and takes about an hour. We are asking our gas engineer (HeatRight Ltd) for the earliest slots and will send you at least 24 hours' writ…
5. **Tool call** `send_message` {"recipient_name":"HeatRight Ltd","recipient_role":"contractor","channel":"sms","contact":"+447700900311","ticket_ref":"JOB-101","body":"Hi, we need an annual gas safety check (CP12) at 19 Victoria Park Road, London E9 7HD before the current one expires on 16 Oct 2026. Please reply with your earliest available slots (ideally Mon 12 - Thu 15 Oct) and your quote. Tenant is Luca Bianchi; we are arran…
6. **Tool call** `send_message` {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-101","body":"Hi Ben, 19 Victoria Park Road: the gas safety record is valid until 16 Oct 2026, so it is compliant today but only for six more days. The tenant hasn't replied to our emails (25 Sep, 2 Oct) or text (2 Oct). We've opened JOB-101, asked HeatRight Ltd…
7. **Tool call** `schedule_follow_up` {"ticket_ref":"JOB-101","due_on":"2026-10-12","purpose":"Check tenant and HeatRight replies; if no contact, phone tenant, send letter/notice of visit and escalate"}
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-103","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-103 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-104","status":"sent"}
[ledger A4, attempt 1] Verified: MSG-104 found in the send_message log.
   - Result: {"ok":true,"follow_up_id":"FUP-105"}
[ledger A5, attempt 1] Verified: FUP-105 found in the schedule_follow_up log.
8. **Tool call** `submit_decision` {"case_state":"JOB-101 open at intake. Waiting on tenant reply and HeatRight slots/quote. Follow-up 2026-10-12.","next_actions":[{"type":"CHASE_TENANT","action":"Email tenant again asking for availability and promising 24h written notice","recipient":"Luca Bianchi, tenant","channel":"email","ledger_id":"A2"},{"type":"REQUEST_INFORMATION","action":"Ask HeatRight for slots before 16 Oct and a quote"…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/3288 · Cost: $0.0533 · Duration: 24.6s
- Raw event trace: `trace.jsonl`
