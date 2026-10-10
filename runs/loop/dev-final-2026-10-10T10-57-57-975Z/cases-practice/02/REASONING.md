# Case 02: REASONING

## What the system received
- `inputs/call_transcript.txt` (560 chars)
- `inputs/crm.json` (1111 chars)
- `inputs/tenancy_extract.md` (382 chars)

## Conflicts between sources
- None between sources; the call dropped before the tenant's battery question was answered.

## Assumptions
- Chirp is end-of-life signal given age and sealed battery
- Cost of a replacement alarm is within £300 limit
- Caller identified by case records and phone on file

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"P-203","category":"gas","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, fitted 2019-04-… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `create_ticket` | {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent. … | 1 | ✅ verified | Ticket JOB-102 read back at stage init |
| A3 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, … | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-1… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"JOB-101","reason":"Other","comment":"No contractor on record for the property; awaiting a human to book an alarm replacement … | 1 | ✅ verified | Ticket JOB-101 read back after put_on_hold |
| A6 | `escalate_to_human` | {"priority":"P2","team":"maintenance","reason":"Expired CO alarm chirping; needs contractor booked (none on file) and tenant access arranged… | 1 | ✅ verified | ESC-105 found in the escalate_to_human log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"P-203"}
   - Result: {"ok":true,"tickets":[]}
   - Result: {"ok":true,"property":{"id":"P-203","address":"Flat 9, 3 Amhurst Road, London E8 2AU","tenanted":true,"landlord":{"name":"Benjamin Hartley","email":"ben.hartley@hartleyhomes.co.uk","phone":"+447700900201","spend_limit_gbp":300,"notes":["Prefers Ben (not Benjamin).","Call before anything over £300 (inc VAT).","Use HeatRight Ltd for boilers if possible."]}}}
3. **Tool call** `create_ticket` {"property":"P-203","category":"gas","severity":"urgent","tenant":"T-1003","description":"Hallway CO alarm (FireAngel CO-9X, fitted 2019-04-02, sealed battery, 7-year life so expired ~April 2026) chirping about once a minute since evening of 2026-10-09. Likely end-of-life. Replace alarm within 72h; landlord responsibility as battery is sealed. Tenant advised not to remove/tamper; safety advice giv…
4. **Tool call** `create_ticket` {"property":"P-203","category":"electrical","severity":"routine","tenant":"T-1003","description":"Bathroom extractor fan noisy. Not urgent. Raised on same call as CO alarm chirp (separate issue)."}
   - Result: {"ok":true,"ref":"JOB-101","stage":"init"}
[ledger A1, attempt 1] Verified: Ticket JOB-101 read back at stage init.
   - Result: {"ok":true,"ref":"JOB-102","stage":"init"}
[ledger A2, attempt 1] Verified: Ticket JOB-102 read back at stage init.
5. **Tool call** `send_message` {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"sms","contact":"+447700900103","ticket_ref":"JOB-101","body":"Hi Priya, sorry our call dropped. Please don't take the battery out or cover the alarm. Yours is sealed, and a chirp every minute usually means it has reached the end of its life (it was fitted in 2019), so it needs replacing, not a new battery. Replacing it is our job,…
6. **Tool call** `send_message` {"recipient_name":"Ben Hartley","recipient_role":"landlord","channel":"email","contact":"ben.hartley@hartleyhomes.co.uk","ticket_ref":"JOB-101","body":"Hi Ben, the hallway CO alarm at Flat 9, 3 Amhurst Road (FireAngel CO-9X, fitted April 2019, sealed battery, 7-year life) is chirping, which points to end of life. As it's sealed, the tenant can't replace it, so replacement is your responsibility. W…
7. **Tool call** `put_on_hold` {"ticket_ref":"JOB-101","reason":"Other","comment":"No contractor on record for the property; awaiting a human to book an alarm replacement within the 72h target.","review_on":"2026-10-11"}
8. **Tool call** `escalate_to_human` {"priority":"P2","team":"maintenance","reason":"Expired CO alarm chirping; needs contractor booked (none on file) and tenant access arranged, same day/within 72h","known":"Call 2026-10-10 from Priya Shah (T-1003), dropped at 00:29. CO-9X in hallway fitted 2019-04-02, sealed battery, 7yr life, so expired. Chirp once a minute since last night, no continuous alarm or symptoms reported (not fully aske…
   - Result: {"ok":true,"message_id":"MSG-103","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-103 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-104","status":"sent"}
[ledger A4, attempt 1] Verified: MSG-104 found in the send_message log.
   - Result: {"ok":true,"ticket_ref":"JOB-101","hold":{"reason":"Other","comment":"No contractor on record for the property; awaiting a human to book an alarm replacement within the 72h target.","review_on":"2026-10-11"}}
[ledger A5, attempt 1] Verified: Ticket JOB-101 read back after put_on_hold.
   - Result: {"ok":true,"escalation_id":"ESC-105"}
[ledger A6, attempt 1] Verified: ESC-105 found in the escalate_to_human log.
9. **Tool call** `submit_decision` {"case_state":"JOB-101 (urgent, CO alarm replacement) on hold pending a human booking a contractor, review 2026-10-11. JOB-102 (extractor fan, routine) open. Tenant and landlord informed.","next_actions":[{"type":"REPLY_TO_TENANT","action":"SMS with safety advice, do not remove battery, 72h target, helplines, extractor fan logged","recipient":"Priya Shah, tenant","channel":"sms","ledger_id":"A3"},…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/4096 · Cost: $0.0899 · Duration: 31.6s
- Raw event trace: `trace.jsonl`
