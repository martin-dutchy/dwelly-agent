# Case 02: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/call_transcript.txt` (560 chars)
- `inputs/crm.json` (1111 chars)
- `inputs/tenancy_extract.md` (382 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"create_ticket":[{"call":1,"mode":"timeout"}],"update_ticket":[{"call":1,"mode":"error"}],"record_landlord_decision":[{"call":2,"mode":"timeout"}],"set_visit":[{"call":2,"mode":"timeout"}],"record_quote":[{"call":1,"mode":"timeout"}],"log_call":[{"call":1,"mode":"error"},{"call":2,"mode":"silent_drop"}],"request_information":[{"call":2,"mode":"error"}],"hold_payment":[{"call":2,"mode":"timeout"}]}
```

## Conflicts between sources
- create_ticket A1 returned an error but read-back showed JOB-101 exists; trusted read-back
- log_call A5 returned an id but read-back found no record; treated as not applied

## Assumptions
- Tenant identified by the call and CRM phone match
- Landlord approval is needed as no contractor is named for alarms; cost expected under £300

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"gas","severity":"urgent","description":"Hallway CO alarm (FireAngel CO-9X, sealed battery, fitted 2019-04-02… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","description":"Bathroom extractor fan noisy. Tenant says not urgent.","tena… | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Reported CO alarm chirping once a mi… | 1 | ❌ failed | No log_call record on read-back |
| A4 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","body":"Hi Priya, sorry our call dropped.… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","ticket_ref":"JOB-101","summary":"Reported CO a… | 1 | ❌ failed | CALL-104 was returned but is not in the log_call log |
| A6 | `request_landlord_approval` | {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Hallway CO alarm at Flat 9, 3 Amhurst Road (FireAngel CO-9X, sealed batt… | 1 | ✅ verified | APR-105 found in the request_landlord_approval log |
| A7 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"CO alarm chirping, possible real CO not ruled out; call dropped; logging tool failed; no con… | 1 | ✅ verified | ESC-106 found in the escalate_to_human log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"P-203"}
   - Result: {"ok":true,"tickets":[]}
   - Result: {"ok":true,"property":{"id":"P-203","address":"Flat 9, 3 Amhurst Road, London E8 2AU","tenanted":true,"landlord":{"name":"Benjamin Hartley","email":"ben.hartley@hartleyhomes.co.uk","phone":"+447700900201","spend_limit_gbp":300,"notes":["Prefers Ben (not Benjamin).","Call before anything over £300 (inc VAT).","Use HeatRight Ltd for boilers if possible."]}}}
3. **Tool call** `create_ticket` {"property":"P-203","category":"gas","severity":"urgent","description":"Hallway CO alarm (FireAngel CO-9X, sealed battery, fitted 2019-04-02, 7-year life so expired ~April 2026) chirping about once a minute since last night. Likely end-of-life signal, but real CO not ruled out. Replace alarm and check boiler/CO if any symptoms. Call dropped before safety advice finished.","tenant":"T-1003"}
4. **Tool call** `create_ticket` {"property":"P-203","category":"electrical","severity":"routine","description":"Bathroom extractor fan noisy. Tenant says not urgent.","tenant":"T-1003"}
5. **Tool call** `log_call` {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Reported CO alarm chirping once a minute since last night, plus noisy bathroom extractor. Asked about removing battery; call dropped before answer/safety advice given."}
6. **Tool call** `send_message` {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","body":"Hi Priya, sorry our call dropped. Please don't remove the battery from the CO alarm; it's sealed and should stay working. A chirp every minute usually means the alarm has reached the end of its life, but we can't be sure it isn't a real warning. If you or anyone feels headachy, dizzy, sick or…
   - Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: Request timed out after 10000ms"}
[ledger A1, attempt 1] The API reported an error, but read-back shows the change IS in place (Ticket JOB-101 read back at stage init). Do not retry.
   - Result: {"ok":true,"ref":"JOB-102","stage":"init"}
[ledger A2, attempt 1] Verified: Ticket JOB-102 read back at stage init.
   - ⚠️ Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: HTTP 500 Internal Server Error"}
[ledger A3, attempt 1] NOT APPLIED: No log_call record on read-back. Retry once if safe, otherwise escalate. Never tell anyone it was done.
   - Result: {"ok":true,"message_id":"MSG-103","status":"sent"}
[ledger A4, attempt 1] Verified: MSG-103 found in the send_message log.
7. **Tool call** `log_call` {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","ticket_ref":"JOB-101","summary":"Reported CO alarm chirping once a minute since last night, plus noisy bathroom extractor. Asked about removing battery; call dropped before answer/safety advice given. Followed up by SMS."}
8. **Tool call** `request_landlord_approval` {"landlord":"Ben Hartley","ticket_ref":"JOB-101","decision_needed":"Hallway CO alarm at Flat 9, 3 Amhurst Road (FireAngel CO-9X, sealed battery, fitted April 2019, 7-year life) is chirping every minute, most likely end of life. Replacing it is the landlord's responsibility as the battery is sealed. May we instruct our contractor to replace it and check for CO (expected well within your £300 limit)…
   - ⚠️ Result: {"ok":true,"call_id":"CALL-104"}
[ledger A5, attempt 1] NOT APPLIED: CALL-104 was returned but is not in the log_call log. Retry once if safe, otherwise escalate. Never tell anyone it was done.
   - Result: {"ok":true,"approval_id":"APR-105","status":"requested"}
[ledger A6, attempt 1] Verified: APR-105 found in the request_landlord_approval log.
9. **Tool call** `escalate_to_human` {"priority":"P2","team":"maintenance","reason":"CO alarm chirping, possible real CO not ruled out; call dropped; logging tool failed; no contractor assigned pending landlord reply","known":"Priya Shah (T-1003), Flat 9, 3 Amhurst Rd. Hallway FireAngel CO-9X sealed, fitted 2019-04-02, 7yr life (expired ~Apr 2026), chirps ~1/min since last night. Gas boiler serviced 2025-11. Not vulnerable. Call drop…
   - Result: {"ok":true,"escalation_id":"ESC-106"}
[ledger A7, attempt 1] Verified: ESC-106 found in the escalate_to_human log.
10. **Tool call** `submit_decision` {"case_state":"JOB-101 (urgent, stage init) awaiting landlord approval APR-105; JOB-102 routine at init. Tenant given safety advice by SMS. Escalated ESC-106 to maintenance.","next_actions":[{"type":"REPLY_TO_TENANT","action":"SMS safety advice: don't remove sealed battery, ventilate, leave and call 0800 111 999 if symptoms or continuous alarm; urgent job logged","recipient":"Priya Shah, tenant","…
   - Result: Decision recorded.

## Run
- Model turns: 5 · Tokens in/out: 12/4549 · Cost: $0.0749 · Duration: 34.2s
- Raw event trace: `trace.jsonl`
