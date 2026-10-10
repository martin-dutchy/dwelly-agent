# Case 20: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/call_transcript.txt` (487 chars)
- `inputs/crm.json` (1393 chars)
- `inputs/tool_notes.md` (68 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"create_ticket":[{"call":1,"mode":"timeout"}],"update_ticket":[{"call":1,"mode":"error"}],"record_work_result":[{"call":2,"mode":"silent_drop"}],"confirm_keys_returned":[{"call":1,"mode":"silent_drop"}],"log_call":[{"call":2,"mode":"timeout"}],"schedule_follow_up":[{"call":1,"mode":"timeout"}],"request_information":[{"call":1,"mode":"timeout"}],"approve_quote":[{"call":2,"mode":"silent_drop"}],"add_note":[{"call":1,"mode":"timeout"},{"call":2,"mode":"error"}],"escalate_to_human":[{"call":2,"mode":"error"}]}
```

## Conflicts between sources
- Caller says it is our fault; the agency manages the flat but liability is not established
- Tenant phone goes to voicemail, SMS delivered; portal note says she is away

## Assumptions
- Swift can attend the 20:00-22:00 window; confirmation still needed
- Caller was given the safety advice during the call, as logged
- Neighbour is not a tenant so no personal data shared

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active water leak from Flat 4 coming through ceiling of Flat… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-22:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","ticket_ref":"JOB-101","body":"Hi Amel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `log_call` | {"party_name":"Olu Adeyemi","party_role":"neighbour","direction":"inbound","outcome":"connected","ticket_ref":"JOB-101","summary":"Neighbour… | 1 | ✅ verified | CALL-104 found in the log_call log |
| A6 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active leak into Flat 3 over a light fitting; tenant of Flat 4 away and unreachable; need ou… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"P-201"}
   - Result: {"ok":true,"tickets":[]}
   - Result: {"ok":true,"property":{"id":"P-201","address":"Flat 4, 12 Mare Street, London E8 1HL","tenanted":true,"landlord":{"name":"Benjamin Hartley","email":"ben.hartley@hartleyhomes.co.uk","phone":"+447700900201","spend_limit_gbp":300,"notes":["Prefers Ben (not Benjamin).","Call before anything over £300 (inc VAT).","Use HeatRight Ltd for boilers if possible."]},"contractors":[{"contractor_id":"C-12","nam…
3. **Tool call** `create_ticket` {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active water leak from Flat 4 coming through ceiling of Flat 3 (neighbour Olu Adeyemi, reported 19:35 Sat 10 Oct), dripping onto light fitting. Tenant away 9-12 Oct, not answering. Needs emergency make-safe: isolate water at stopcock (under kitchen sink), entry using out-of-hours key holder as genuine emergency.","tena…
   - Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: Request timed out after 10000ms"}
[ledger A1, attempt 1] The API reported an error, but read-back shows the change IS in place (Ticket JOB-101 read back at stage init). Do not retry.
4. **Tool call** `assign_contractor` {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-22:00"}
5. **Tool call** `send_message` {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","ticket_ref":"JOB-101","body":"Hi Amelia, it's Mare and Co. Water appears to be leaking from your flat into the flat below. As it's an emergency, we're sending a plumber tonight and will use our emergency key to get in and turn the water off. Please call us as soon as you can, and if you can, tell…
6. **Tool call** `send_message` {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-101","body":"Hi Ben, emergency at Flat 4, 12 Mare Street: the downstairs neighbour reports water coming through her kitchen ceiling this evening (Sat 10 Oct, 19:35). Amelia is away until 12 Oct and not answering. We're sending Swift Plumbing out of hours to ent…
   - Result: {"ok":true,"ticket_ref":"JOB-101","stage":"visit","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-22:00"}
[ledger A2, attempt 1] Verified: Ticket JOB-101 read back at stage visit.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-102 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-103","status":"sent"}
[ledger A4, attempt 1] Verified: MSG-103 found in the send_message log.
7. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Active leak into Flat 3 over a light fitting; tenant of Flat 4 away and unreachable; need out-of-hours key holder to give Swift Plumbing entry tonight. Neighbour also demands written liability cover.","known":"Caller Olu Adeyemi (Flat 3, not our tenant) 19:35 Sat 10 Oct: water through kitchen ceiling onto light fitting. Amelia Clarke (T-1001) away 9-…
8. **Tool call** `log_call` {"party_name":"Olu Adeyemi","party_role":"neighbour","direction":"inbound","outcome":"connected","ticket_ref":"JOB-101","summary":"Neighbour reported leak into Flat 3 ceiling onto light fitting. Advised: keep away from fitting, switch off lights/kitchen circuit at consumer unit if safe to reach, move belongings, 999 if sparking/burning smell/fire. Told emergency plumber being sent. Declined to giv…
   - ⚠️ Result: Validation failed for tool "escalate_to_human":
  - options: must have required properties options, recommendation

Received arguments:
{
  "priority": "P1",
  "team": "maintenance",
  "reason": "Active leak into Flat 3 over a light fitting; tenant of Flat 4 away and unreachable; need out-of-hours key holder to give Swift Plumbing entry tonight. Neighbour also demands written liability cover.",
  …
   - Result: {"ok":true,"call_id":"CALL-104"}
[ledger A5, attempt 1] Verified: CALL-104 found in the log_call log.
9. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Active leak into Flat 3 over a light fitting; tenant of Flat 4 away and unreachable; need out-of-hours key holder to give Swift Plumbing entry tonight. Neighbour also demands written liability cover.","known":"Caller Olu Adeyemi (Flat 3, not our tenant) 19:35 Sat 10 Oct: water through kitchen ceiling onto light fitting. Amelia Clarke (T-1001) away 9-…
   - Result: {"ok":true,"escalation_id":"ESC-105"}
[ledger A6, attempt 1] Verified: ESC-105 found in the escalate_to_human log.
10. **Tool call** `submit_decision` {"case_state":"JOB-101 emergency at stage visit; Swift assigned 20:00-22:00 tonight; escalated P1 (ESC-105) for key holder dispatch; tenant and landlord notified; awaiting attendance confirmation.","next_actions":[{"type":"ESCALATE_TO_HUMAN","action":"P1 handover to dispatch OOH key holder to meet Swift and enter to isolate the water","recipient":"internal, maintenance","channel":"internal","ledge…
   - Result: Decision recorded.

## Run
- Model turns: 6 · Tokens in/out: 14/4862 · Cost: $0.0832 · Duration: 39.2s
- Raw event trace: `trace.jsonl`
