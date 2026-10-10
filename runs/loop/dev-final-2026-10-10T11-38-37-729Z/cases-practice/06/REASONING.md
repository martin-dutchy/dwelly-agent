# Case 06: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (1379 chars)
- `inputs/ticket.json` (283 chars)
- `inputs/visit_log_2026-10-11.json` (537 chars)
- `inputs/weather.txt` (55 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"record_landlord_decision":[{"call":2,"mode":"error"}],"record_work_result":[{"call":2,"mode":"silent_drop"}],"record_invoice":[{"call":1,"mode":"error"}],"skip_document":[{"call":1,"mode":"silent_drop"}],"schedule_follow_up":[{"call":2,"mode":"error"}],"request_information":[{"call":1,"mode":"error"}],"approve_quote":[{"call":1,"mode":"error"}]}
```

## Conflicts between sources
- Ticket urgency is 'urgent' but no heating/hot water with a vulnerable occupant is an emergency under policy; treated as emergency.

## Assumptions
- Assignment to HeatRight for Sunday morning was the first available; Swift afternoon window is a request pending confirmation.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `record_work_result` | {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight (C-11) no_show, \"Engineer off sick,… | 1 | ✅ verified | Ticket R-4820 read back after record_work_result |
| A4 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 15:00-19:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A5 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `send_message` | {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"sms","contact":"+447700900312","ticket_ref":"R-4820","… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A7 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A8 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Vulnerable tenant without heating/hot water for ~40h; first contractor no-show; replacement … | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |
| A9 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-12","purpose":"Confirm Swift attended and heating restored; get tenant confirmation","party":"Swift… | 1 | ✅ verified | FUP-106 found in the schedule_follow_up log |

## Trace
1. **Tool call** `get_ticket` {"ref":"R-4820"}
2. **Tool call** `list_tickets` {}
3. **Tool call** `get_property` {"property":"P-202"}
   - Result: {"ok":true,"ticket":{"ref":"R-4820","tenant_id":"T-1002","property_id":"P-202","category":"heating","urgency":"urgent","stage":"init","description":"No heating or hot water since Friday evening. Tenant has anxiety, prefers email.","created":"2026-10-10T08:12:00+01:00"}}
   - Result: {"ok":true,"tickets":[{"ref":"R-4820","tenant_id":"T-1002","property_id":"P-202","category":"heating","urgency":"urgent","stage":"init","description":"No heating or hot water since Friday evening. Tenant has anxiety, prefers email.","created":"2026-10-10T08:12:00+01:00"}]}
   - Result: {"ok":true,"property":{"id":"P-202","address":"27 Bethnal Green Road, London E1 6LA","tenanted":true,"landlord":{"name":"Margaret Ellison","email":"margaret@ellisonlettings.co.uk","phone":"+447700900202","spend_limit_gbp":250,"notes":["Overseas Oct-Dec, email preferred.","Approve emergencies without asking, routine over £250 needs approval."]},"contractors":[{"contractor_id":"C-11","name":"HeatRig…
4. **Tool call** `assign_contractor` {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"}
   - ⚠️ Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: HTTP 500 Internal Server Error"}
[ledger A1, attempt 1] NOT APPLIED: Ticket R-4820 is at stage init, expected visit. Retry once if safe, otherwise escalate. Never tell anyone it was done.
5. **Tool call** `assign_contractor` {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"}
   - Result: {"ok":true,"ticket_ref":"R-4820","stage":"visit","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"}
[ledger A1, attempt 2] Verified: Ticket R-4820 read back at stage visit.
6. **Tool call** `send_message` {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","body":"Hi Jonah, sorry you have no heating or hot water. We have booked HeatRight Ltd, a Gas Safe heating engineer, to visit tomorrow (Sunday 11 October) between 8am and 12pm. Please make sure someone is home. If you smell gas, leave the property and call 0800 11…
7. **Tool call** `record_work_result` {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight (C-11) no_show, \"Engineer off sick, no cover\". Tenant email 12:41 confirms nobody came."}
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"ticket_ref":"R-4820","stage":"mp_time_force","work_result":{"outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight (C-11) no_show, \"Engineer off sick, no cover\". Tenant email 12:41 confirms nobody came."}}
[ledger A3, attempt 1] Verified: Ticket R-4820 read back after record_work_result.
8. **Tool call** `assign_contractor` {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 15:00-19:00"}
   - Result: {"ok":true,"ticket_ref":"R-4820","stage":"visit","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 15:00-19:00"}
[ledger A4, attempt 1] Verified: Ticket R-4820 read back at stage visit.
9. **Tool call** `send_message` {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","body":"Hi Jonah, I'm really sorry. HeatRight's engineer was off sick and nobody told you, and I know you took the morning off. We have now moved the job to Swift Plumbing & Heating (Gas Safe) and asked for a visit today, Sunday, between 3pm and 7pm. They have not…
10. **Tool call** `send_message` {"recipient_name":"Swift Plumbing & Heating","recipient_role":"contractor","channel":"sms","contact":"+447700900312","ticket_ref":"R-4820","body":"URGENT R-4820, 27 Bethnal Green Road E1 6LA: no heating/hot water, vulnerable tenant (Jonah Okafor, prefers email). Previous contractor no-showed today. Please attend today 15:00-19:00 if possible and confirm by reply, or tell us your earliest time."}
11. **Tool call** `send_message` {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"R-4820","body":"Hi Margaret, update on 27 Bethnal Green Road: the tenant has had no heating or hot water since Friday evening and is vulnerable, so we treated it as an emergency. HeatRight missed today's morning visit (engineer sick), so we have reassigned to …
12. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Vulnerable tenant without heating/hot water for ~40h; first contractor no-show; replacement not yet confirmed","known":"R-4820, 27 Bethnal Green Road. Tenant Jonah Okafor (anxiety, email). Assignment to HeatRight needed a retry (first attempt HTTP 500, second verified). HeatRight no-show 11 Oct 12:30. Reassigned Swift (C-12) 15:00-19:00, unconfirmed.…
13. **Tool call** `schedule_follow_up` {"ticket_ref":"R-4820","due_on":"2026-10-12","purpose":"Confirm Swift attended and heating restored; get tenant confirmation","party":"Swift Plumbing & Heating"}
   - Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: Request timed out after 10000ms"}
[ledger A5, attempt 1] The API reported an error, but read-back shows the change IS in place (MSG-102 found in the send_message log). Do not retry.
   - Result: {"ok":true,"message_id":"MSG-103","status":"sent"}
[ledger A6, attempt 1] Verified: MSG-103 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-104","status":"sent"}
[ledger A7, attempt 1] Verified: MSG-104 found in the send_message log.
   - Result: {"ok":true,"escalation_id":"ESC-105"}
[ledger A8, attempt 1] Verified: ESC-105 found in the escalate_to_human log.
   - Result: {"ok":true,"follow_up_id":"FUP-106"}
[ledger A9, attempt 1] Verified: FUP-106 found in the schedule_follow_up log.
14. **Tool call** `submit_decision` {"case_state":"Ticket at stage visit with Swift (C-12), window 11 Oct 15:00-19:00 requested, not yet confirmed by provider. P1 escalated. Waiting on Swift; follow-up 12 Oct.","next_actions":[{"type":"ESCALATE_TO_HUMAN","action":"P1 handover: confirm Swift by phone, fallback heating if not attended tonight","recipient":"internal maintenance","channel":"internal","ledger_id":"A8"},{"type":"REPLY_TO_…
   - Result: Decision recorded.

## Run
- Model turns: 7 · Tokens in/out: 16/4856 · Cost: $0.0871 · Duration: 35.3s
- Raw event trace: `trace.jsonl`
