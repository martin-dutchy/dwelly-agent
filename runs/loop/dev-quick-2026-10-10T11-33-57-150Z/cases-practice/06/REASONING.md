# Case 06: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (1379 chars)
- `inputs/ticket.json` (283 chars)
- `inputs/visit_log_2026-10-11.json` (537 chars)
- `inputs/weather.txt` (55 chars)

## Actions blocked by hard policy rules
- `record_landlord_decision`: The evidence_quote "Approve emergencies without asking, routine over £250 needs approval." is not in the case. Copy the landlord's words exactly as written (no paraphrase; date and channel go in source), or record the decision as unclear and ask the landlord.

## Conflicts between sources
- Visit log shows a 11 Oct 12:30 no-show and a tenant email at 12:41, both dated after today (10 Oct 08:30). Not treated as having occurred; will be handled when the event is in the record.
- CRM note says landlord approves emergencies without asking; the ticket has no landlord message to record it against.

## Assumptions
- Heating and hot water loss for a vulnerable tenant is an emergency under policy, so assignment and booking went ahead without a recorded landlord decision.
- Visit window 2026-10-11 08:00-12:00 is the one in the visit log and the one assigned.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `assign_contractor` | {"ticket_ref":"R-4820","contractor":"HeatRight Ltd (C-11)","visit_window":"2026-10-11 08:00-12:00"} | 2 | ✅ verified | Ticket R-4820 read back at stage visit |
| A2 | `set_visit` | {"ticket_ref":"R-4820","datetime":"2026-10-11 08:00","slot_text":"Sunday 8am-12pm","access":"tenant_home","confirmed_by":"assigned_this_run"… | 1 | ✅ verified | Ticket R-4820 read back after set_visit |
| A3 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","bod… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Trace
1. **Tool call** `get_ticket` {"ref":"R-4820"}
2. **Tool call** `get_property` {"property":"P-202"}
3. **Tool call** `list_tickets` {}
   - Result: {"ok":true,"ticket":{"ref":"R-4820","tenant_id":"T-1002","property_id":"P-202","category":"heating","urgency":"urgent","stage":"init","description":"No heating or hot water since Friday evening. Tenant has anxiety, prefers email.","created":"2026-10-10T08:12:00+01:00"}}
   - Result: {"ok":true,"property":{"id":"P-202","address":"27 Bethnal Green Road, London E1 6LA","tenanted":true,"landlord":{"name":"Margaret Ellison","email":"margaret@ellisonlettings.co.uk","phone":"+447700900202","spend_limit_gbp":250,"notes":["Overseas Oct-Dec, email preferred.","Approve emergencies without asking, routine over £250 needs approval."]},"contractors":[{"contractor_id":"C-11","name":"HeatRig…
   - Result: {"ok":true,"tickets":[{"ref":"R-4820","tenant_id":"T-1002","property_id":"P-202","category":"heating","urgency":"urgent","stage":"init","description":"No heating or hot water since Friday evening. Tenant has anxiety, prefers email.","created":"2026-10-10T08:12:00+01:00"}]}
4. **Tool call** `assign_contractor` {"ticket_ref":"R-4820","contractor":"HeatRight Ltd (C-11)","visit_window":"2026-10-11 08:00-12:00"}
   - ⚠️ Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: HTTP 500 Internal Server Error"}
[ledger A1, attempt 1] NOT APPLIED: Ticket R-4820 is at stage init, expected visit. Retry once if safe, otherwise escalate. Never tell anyone it was done.
5. **Tool call** `assign_contractor` {"ticket_ref":"R-4820","contractor":"HeatRight Ltd (C-11)","visit_window":"2026-10-11 08:00-12:00"}
   - Result: {"ok":true,"ticket_ref":"R-4820","stage":"visit","contractor":"HeatRight Ltd (C-11)","visit_window":"2026-10-11 08:00-12:00"}
[ledger A1, attempt 2] Verified: Ticket R-4820 read back at stage visit.
6. **Tool call** `record_landlord_decision` {"ticket_ref":"R-4820","decision":"approved","evidence_quote":"Approve emergencies without asking, routine over £250 needs approval.","source":"Landlord record L-02 notes (CRM), standing instruction for emergencies"}
7. **Tool call** `set_visit` {"ticket_ref":"R-4820","datetime":"2026-10-11 08:00","slot_text":"Sunday 8am-12pm","access":"tenant_home","confirmed_by":"assigned_this_run"}
8. **Tool call** `send_message` {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","ticket_ref":"R-4820","body":"Dear Jonah,\n\nThank you for reporting the loss of heating and hot water at 27 Bethnal Green Road. We treat this as urgent because of the cold weather.\n\nWe have assigned HeatRight Ltd, a Gas Safe registered heating contractor, to attend. Their visit wind…
9. **Tool call** `send_message` {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","ticket_ref":"R-4820","body":"Dear Margaret,\n\nWe have an urgent heating and hot water fault at 27 Bethnal Green Road. The tenant has had no heating or hot water since Friday evening, and he has a health condition that makes this harder to bear.\n\nUnder your standing inst…
   - ⚠️ Result: Blocked by policy: The evidence_quote "Approve emergencies without asking, routine over £250 needs approval." is not in the case. Copy the landlord's words exactly as written (no paraphrase; date and channel go in source), or record the decision as unclear and ask the landlord.
   - Result: {"ok":true,"ticket_ref":"R-4820","stage":"visit","visit":{"datetime":"2026-10-11 08:00","slot_text":"Sunday 8am-12pm","access":"tenant_home"}}
[ledger A2, attempt 1] Verified: Ticket R-4820 read back after set_visit.
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: Request timed out after 10000ms"}
[ledger A4, attempt 1] The API reported an error, but read-back shows the change IS in place (MSG-102 found in the send_message log). Do not retry.
10. **Tool call** `submit_decision` {"case_state":"R-4820 (no heating or hot water, 27 Bethnal Green Road, tenant Jonah Okafor, vulnerable). Assigned to HeatRight Ltd (C-11), stage visit, visit booked Sunday 2026-10-11 08:00-12:00. Tenant and landlord informed. Waiting on the visit. Visit log in inputs shows a no-show on 11 Oct; that event is dated after today and has not yet been recorded.","next_actions":[{"action":"Assign HeatRig…
   - Result: Decision recorded.

## Run
- Model turns: 5 · Tokens in/out: 12/5489 · Cost: $0.0065 · Duration: 27.5s
- Raw event trace: `trace.jsonl`
