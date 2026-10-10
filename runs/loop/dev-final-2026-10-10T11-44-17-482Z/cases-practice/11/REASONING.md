# Case 11: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- Case brief (572 chars)
- `inputs/call_transcript.txt` (546 chars)
- `inputs/crm.json` (681 chars)

## Conflicts between sources
- Caller says she is guarantor; CRM shows no guarantor. Trusted CRM.

## Assumptions
- Arrears contact with tenant is allowed (no Breathing Space recorded)
- The email did not mention arrears, to avoid disclosure risk

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `log_call` | {"party_name":"Caller claiming to be Grace Okafor","party_role":"third_party","direction":"inbound","outcome":"connected","summary":"Unverif… | 1 | ✅ verified | CALL-101 found in the log_call log |
| A2 | `send_message` | {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","body":"Hi Jonah, someone … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P3","team":"safeguarding","reason":"Unverified third party asked for tenant's arrears and new mobile; tenant is vulnerable and … | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Trace
1. **Tool call** `log_call` {"party_name":"Caller claiming to be Grace Okafor","party_role":"third_party","direction":"inbound","outcome":"connected","summary":"Unverified caller said she is tenant's mother and guarantor; asked for arrears balance, payment history and tenant's new mobile; wants to pay off arrears. CRM: no guarantor, no authorised contacts, consent_to_share false. Nothing disclosed. Caller mentioned tenant is…
   - `log_call` result: {"ok":true,"call_id":"CALL-101"}
[ledger A1, attempt 1] Verified: CALL-101 found in the log_call log.
2. **Tool call** `send_message` {"recipient_name":"Jonah Okafor","recipient_role":"tenant","channel":"email","contact":"jonah.ok@mailbox.example","body":"Hi Jonah, someone called us today saying she is your mum and asking about your account. We did not share any information about you or your tenancy. If you would like us to speak to her or anyone else on your behalf, just reply and let us know and we will arrange it. If you'd li…
   - `send_message` result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
3. **Tool call** `escalate_to_human` {"priority":"P3","team":"safeguarding","reason":"Unverified third party asked for tenant's arrears and new mobile; tenant is vulnerable and caller says he is 'very down'","known":"Call 2026-10-10 10:44. Caller says she is Grace, mother and guarantor; CRM shows no guarantor, no authorised contacts, consent_to_share false. Tenant T-1002 vulnerable (anxiety, prefers email). Nothing disclosed. Call lo…
   - `escalate_to_human` result: {"ok":true,"escalation_id":"ESC-103"}
[ledger A3, attempt 1] Verified: ESC-103 found in the escalate_to_human log.
4. **Tool call** `submit_decision` {"case_state":"Call closed with nothing disclosed. Tenant emailed. Welfare/consent follow-up with a human (ESC-103). Waiting on tenant's reply.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Email tenant that someone called, nothing was shared, ask whether he wants her as a contact; Samaritans number included","recipient":"Jonah Okafor, tenant","channel":"email","ledger_id":"A2"},{"type":"ES…
   - `submit_decision` result: Decision recorded.

## Run
- Model turns: 2 · Tokens in/out: 6/2780 · Cost: $0.0418 · Duration: 20.5s
- Raw event trace: `trace.jsonl`
