# Case 06: REASONING

## What the system received
- `inputs/crm.json` (1379 chars)
- `inputs/ticket.json` (283 chars)
- `inputs/visit_log_2026-10-11.json` (537 chars)
- `inputs/weather.txt` (55 chars)

## Conflicts between sources
- The ticket urgency is 'urgent', but policy makes no heating for a vulnerable occupant an emergency, so I treated it as one. The landlord note approves emergencies without asking.

## Assumptions
- Swift is available for the 14:00-18:00 window; the tool accepted the booking but I haven't confirmed with Swift directly.
- The no-show sequence was handled as one run, using the visit log as the source for day-two events.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","body":"Hi Jonah, sorry yo… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 14:00-18:00"} | 1 | ✅ verified | Ticket R-4820 read back at stage visit |
| A4 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","body":"Hi Jonah, I'm real… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Hi Mar… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Contractor no-show for vulnerable tenant with no heating; possible goodwill/compensation que… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_ticket` {"ref":"R-4820"}
   - Result: {"ok":true,"tickets":[{"ref":"R-4820","tenant_id":"T-1002","property_id":"P-202","category":"heating","urgency":"urgent","stage":"init","description":"No heating or hot water since Friday evening. Tenant has anxiety, prefers email.","created":"2026-10-10T08:12:00+01:00"}]}
   - Result: {"ok":true,"ticket":{"ref":"R-4820","tenant_id":"T-1002","property_id":"P-202","category":"heating","urgency":"urgent","stage":"init","description":"No heating or hot water since Friday evening. Tenant has anxiety, prefers email.","created":"2026-10-10T08:12:00+01:00"}}
3. **Tool call** `assign_contractor` {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"}
   - ⚠️ Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: HTTP 500 Internal Server Error"}
[ledger A1, attempt 1] NOT APPLIED: Ticket R-4820 is at stage init, expected visit. Retry once if safe, otherwise escalate. Never tell anyone it was done.
4. **Tool call** `assign_contractor` {"ticket_ref":"R-4820","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"}
   - Result: {"ok":true,"ticket_ref":"R-4820","stage":"visit","contractor":"HeatRight Ltd","visit_window":"2026-10-11 08:00-12:00"}
[ledger A1, attempt 2] Verified: Ticket R-4820 read back at stage visit.
5. **Tool call** `send_message` {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","body":"Hi Jonah, sorry you've had no heating or hot water. HeatRight Ltd (Gas Safe registered) are booked to visit tomorrow, Sunday 11 October, between 08:00 and 12:00. Please let us know if that doesn't work for you. If you smell gas, leave the property and call 0800 111 999."}
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-101 found in the send_message log.
6. **Agent:** Now the no-show: reassign to Swift for same day.
7. **Tool call** `assign_contractor` {"ticket_ref":"R-4820","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 14:00-18:00"}
   - Result: {"ok":true,"ticket_ref":"R-4820","stage":"visit","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-11 14:00-18:00"}
[ledger A3, attempt 1] Verified: Ticket R-4820 read back at stage visit.
8. **Tool call** `send_message` {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","body":"Hi Jonah, I'm really sorry. HeatRight didn't turn up and you took time off for nothing. We've booked a different Gas Safe engineer, Swift Plumbing & Heating, for today (Sunday 11 October) between 14:00 and 18:00. Please reply if you can't be in then. A member of our team will a…
9. **Tool call** `send_message` {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Hi Margaret, update on 27 Bethnal Green Road: the tenant has had no heating or hot water since Friday. HeatRight missed this morning's visit (engineer off sick), so we've rebooked Swift Plumbing & Heating for 14:00-18:00 today as an emergency make-safe. We'll send a…
10. **Tool call** `escalate_to_human` {"priority":"P2","team":"maintenance","reason":"Contractor no-show for vulnerable tenant with no heating; possible goodwill/compensation query","known":"R-4820: no heating/hot water since 9 Oct evening; tenant Jonah Okafor vulnerable (anxiety, email preferred); overnight lows 3-5C. HeatRight (C-11) assignment failed once then verified; no-show 11 Oct (engineer sick). Swift (C-12) booked 14:00-18:0…
   - Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: Request timed out after 10000ms"}
[ledger A4, attempt 1] The API reported an error, but read-back shows the change IS in place (MSG-102 found in the send_message log). Do not retry.
   - Result: {"ok":true,"message_id":"MSG-103","status":"sent"}
[ledger A5, attempt 1] Verified: MSG-103 found in the send_message log.
   - Result: {"ok":true,"escalation_id":"ESC-104"}
[ledger A6, attempt 1] Verified: ESC-104 found in the escalate_to_human log.
11. **Tool call** `submit_decision` {"outcome":"escalated","severity":"emergency","summary":"Assigned HeatRight (first attempt failed, retry verified), told the tenant by email. After the no-show I rebooked Swift for the same afternoon, emailed the tenant and landlord, and escalated for monitoring and the goodwill and contractor review.","answers":[{"question":"1. What happened when you assigned the contractor and how did you verify…
   - Result: Decision recorded.

## Run
- Model turns: 7 · Tokens in/out: 16/3200 · Cost: $0.0702 · Duration: 32.0s
- Raw event trace: `trace.jsonl`
