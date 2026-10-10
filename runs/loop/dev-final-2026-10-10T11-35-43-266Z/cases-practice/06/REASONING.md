# Case 06: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (1379 chars)
- `inputs/ticket.json` (283 chars)
- `inputs/visit_log_2026-10-11.json` (537 chars)
- `inputs/weather.txt` (55 chars)

## Conflicts between sources
- Ticket says urgent, but a vulnerable tenant with no heating/hot water is an emergency under policy; treated as emergency.

## Assumptions
- Swift window 14:00-18:00 same day is a request pending their confirmation; today is 11 Oct after the no-show.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `record_work_result` | {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight (C-11) no_show, \"Engineer off sick,… | 1 | ✅ verified | Ticket R-4820 read back after record_work_result |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 14:00-18:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Vulnerable tenant, no heating/hot water, first contractor no-show; second contractor needs t… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A7 | `schedule_follow_up` | {"ticket_ref":"R-4820","due_on":"2026-10-11","party":"Swift Plumbing & Heating","purpose":"Confirm Swift attends 14:00-18:00 and email tenan… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"P-202"}
   - Result: {"ok":true,"tickets":[{"ref":"R-4820","tenant_id":"T-1002","property_id":"P-202","category":"heating","urgency":"urgent","stage":"init","description":"No heating or hot water since Friday evening. Tenant has anxiety, prefers email.","created":"2026-10-10T08:12:00+01:00"}]}
   - Result: {"ok":true,"property":{"id":"P-202","address":"27 Bethnal Green Road, London E1 6LA","tenanted":true,"landlord":{"name":"Margaret Ellison","email":"margaret@ellisonlettings.co.uk","phone":"+447700900202","spend_limit_gbp":250,"notes":["Overseas Oct-Dec, email preferred.","Approve emergencies without asking, routine over £250 needs approval."]},"contractors":[{"contractor_id":"C-11","name":"HeatRig…
3. **Tool call** `assign_contractor` {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"}
   - ⚠️ Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: HTTP 500 Internal Server Error"}
[ledger A1, attempt 1] NOT APPLIED: Ticket R-4820 is at stage init, expected visit. Retry once if safe, otherwise escalate. Never tell anyone it was done.
4. **Agent:** Retry once.
5. **Tool call** `assign_contractor` {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"}
   - Result: {"ok":true,"ticket_ref":"R-4820","stage":"visit","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"}
[ledger A1, attempt 2] Verified: Ticket R-4820 read back at stage visit.
6. **Tool call** `record_work_result` {"ticket_ref":"R-4820","outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight (C-11) no_show, \"Engineer off sick, no cover\"; tenant email 12:41 confirms nobody came."}
7. **Tool call** `send_message` {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","body":"Hi Jonah, I'm really sorry nobody came this morning, and that you took time off for it. The engineer was off sick and the company had no cover. We are not leaving you without heating: we are arranging a different heating engineer now and treating it as an …
8. **Tool call** `assign_contractor` {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 14:00-18:00"}
   - Result: {"ok":true,"ticket_ref":"R-4820","stage":"mp_time_force","work_result":{"outcome":"missed_appointment","evidence":"Visit log 2026-10-11 12:30: HeatRight (C-11) no_show, \"Engineer off sick, no cover\"; tenant email 12:41 confirms nobody came."}}
[ledger A2, attempt 1] Verified: Ticket R-4820 read back after record_work_result.
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"ticket_ref":"R-4820","stage":"visit","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 14:00-18:00"}
[ledger A4, attempt 1] Verified: Ticket R-4820 read back at stage visit.
9. **Tool call** `send_message` {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"R-4820","body":"Dear Margaret, an update on 27 Bethnal Green Road: the tenant has had no heating or hot water since Friday evening and is vulnerable, so we are treating it as an emergency. HeatRight did not attend today (engineer off sick). We have instructed …
10. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Vulnerable tenant, no heating/hot water, first contractor no-show; second contractor needs to confirm attendance today","known":"R-4820. Tenant Jonah Okafor (anxiety, prefers email), no heat/hot water since Fri 9 Oct evening, lows 3-5C. HeatRight assignment failed once (HTTP 500), retried OK, verified. HeatRight no-show 11 Oct 08:00-12:00 (engineer s…
11. **Tool call** `schedule_follow_up` {"ticket_ref":"R-4820","due_on":"2026-10-11","party":"Swift Plumbing & Heating","purpose":"Confirm Swift attends 14:00-18:00 and email tenant confirmed time"}
   - Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: Request timed out after 10000ms"}
[ledger A5, attempt 1] The API reported an error, but read-back shows the change IS in place (MSG-102 found in the send_message log). Do not retry.
   - Result: {"ok":true,"escalation_id":"ESC-103"}
[ledger A6, attempt 1] Verified: ESC-103 found in the escalate_to_human log.
   - Result: {"ok":true,"follow_up_id":"FUP-104"}
[ledger A7, attempt 1] Verified: FUP-104 found in the schedule_follow_up log.
12. **Tool call** `submit_decision` {"case_state":"Stage visit; Swift assigned 11 Oct 14:00-18:00 (unconfirmed by provider). P1 escalated. Tenant and landlord informed.","next_actions":[{"type":"ESCALATE_TO_HUMAN","action":"P1 handover: phone Swift to confirm attendance today, fallback engineer/heaters","recipient":"internal maintenance","channel":"internal","ledger_id":"A6"},{"type":"REPLY_TO_TENANT","action":"Apologised, explained…
   - Result: Decision recorded.

## Run
- Model turns: 6 · Tokens in/out: 14/3881 · Cost: $0.0708 · Duration: 28.2s
- Raw event trace: `trace.jsonl`
