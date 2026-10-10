# Case 20: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/call_transcript.txt` (487 chars)
- `inputs/crm.json` (1393 chars)
- `inputs/tool_notes.md` (68 chars)

## Conflicts between sources
- Tenant is away 9-12 Oct per portal note, yet caller says nobody answers: consistent, not a conflict. Caller's identity and flat are unverified, so treated as a report only.

## Assumptions
- Caller is who she says she is; the contractor window is a target pending contractor confirmation.
- Tenant's call went to voicemail per tool notes, so SMS was used.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active leak from Flat 4 into Flat 3 below (reported by Olu A… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `assign_contractor` | {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-22:00"} | 1 | ✅ verified | Ticket JOB-101 read back at stage visit |
| A3 | `send_message` | {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","ticket_ref":"JOB-101","body":"Hi Amel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Active leak near electrics, tenant away/unreachable, entry without notice needed out of hour… | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"P-201"}
   - Result: {"ok":true,"tickets":[]}
   - Result: {"ok":true,"property":{"id":"P-201","address":"Flat 4, 12 Mare Street, London E8 1HL","tenanted":true,"landlord":{"name":"Benjamin Hartley","email":"ben.hartley@hartleyhomes.co.uk","phone":"+447700900201","spend_limit_gbp":300,"notes":["Prefers Ben (not Benjamin).","Call before anything over £300 (inc VAT).","Use HeatRight Ltd for boilers if possible."]},"contractors":[{"contractor_id":"C-12","nam…
3. **Tool call** `create_ticket` {"property":"P-201","category":"plumbing","severity":"emergency","description":"Active leak from Flat 4 into Flat 3 below (reported by Olu Adeyemi, Flat 3, 19:35 Sat 10 Oct). Water dripping onto light fitting in Flat 3 kitchen. Tenant Amelia Clarke away 9-12 Oct, not answering. Need emergency entry to isolate water (stopcock under kitchen sink) and make safe.","tenant":"T-1001"}
   - Result: {"ok":true,"ref":"JOB-101","stage":"init"}
[ledger A1, attempt 1] Verified: Ticket JOB-101 read back at stage init.
4. **Tool call** `assign_contractor` {"ticket_ref":"JOB-101","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-22:00"}
5. **Tool call** `send_message` {"recipient_name":"Amelia Clarke","recipient_role":"tenant","channel":"sms","contact":"+447700900101","ticket_ref":"JOB-101","body":"Hi Amelia, urgent: water is leaking from your flat into the flat below. We can't reach you, so because it's an emergency we're sending a plumber tonight with our out-of-hours key to turn the water off and make it safe. Please call us as soon as you see this. Mare and…
6. **Tool call** `send_message` {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-101","body":"Hi Ben, at 19:35 tonight the neighbour in Flat 3 reported water coming through her kitchen ceiling from Flat 4 (near a light fitting). Amelia is away until 12 Oct and not answering. As an emergency we are sending Swift Plumbing & Heating tonight, e…
7. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Active leak near electrics, tenant away/unreachable, entry without notice needed out of hours","known":"Caller Olu Adeyemi (Flat 3, not our tenant, unverified) reports water dripping through kitchen ceiling onto light fitting, 19:35 Sat 10 Oct. Flat 4 tenant Amelia Clarke away 9-12 Oct; phone to voicemail, SMS sent. Stopcock under kitchen sink. Key s…
   - Result: {"ok":true,"ticket_ref":"JOB-101","stage":"visit","contractor":"Swift Plumbing & Heating","visit_window":"2026-10-10 20:00-22:00"}
[ledger A2, attempt 1] Verified: Ticket JOB-101 read back at stage visit.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-102 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-103","status":"sent"}
[ledger A4, attempt 1] Verified: MSG-103 found in the send_message log.
   - Result: {"ok":true,"escalation_id":"ESC-104"}
[ledger A5, attempt 1] Verified: ESC-104 found in the escalate_to_human log.
8. **Tool call** `submit_decision` {"case_state":"JOB-101 at visit stage; Swift Plumbing assigned for an emergency make-safe tonight (window 20:00-22:00 is a target, not confirmed by contractor). Tenant and landlord informed; P1 escalation open.","next_actions":[{"type":"ESCALATE_TO_HUMAN","action":"P1 handover: confirm Swift attends, key release, phone landlord","recipient":"internal maintenance","channel":"internal","ledger_id":"…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/3984 · Cost: $0.0622 · Duration: 32.3s
- Raw event trace: `trace.jsonl`
