# Case 10: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (528 chars)
- `inputs/email_bankchange.eml` (616 chars)
- `inputs/fraud_policy.md` (268 chars)
- `inputs/previous_email.eml` (244 chars)

## Conflicts between sources
- The sender domain ellisonletters.co.uk differs from the genuine ellisonlettings.co.uk. I trusted the CRM and the prior email.
- The requested account differs from the one on file (ending 9902). I kept the one on file.

## Assumptions
- Margaret's phone on file (+447700900202) is current and reachable by the fraud team.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `hold_payment` | {"payee":"Margaret Ellison (L-02) - payout 2026-10-12 £1,932.00","reason":"Unverified bank detail change request from lookalike domain (elli… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A2 | `send_message` | {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Dear M… | 2 | ✅ verified | MSG-103 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P2","team":"fraud","reason":"Suspected payment-redirection fraud: bank change request for landlord L-02 before Monday payout","… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Trace
1. **Tool call** `hold_payment` {"payee":"Margaret Ellison (L-02) - payout 2026-10-12 £1,932.00","reason":"Unverified bank detail change request from lookalike domain (ellisonletters.co.uk vs ellisonlettings.co.uk) with external Reply-To; call-back and dual approval not done."}
2. **Tool call** `send_message` {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Dear Margaret, we received an email today asking us to change your bank details for rent payments. It came from a similar-looking but different address, so we have not changed anything. Your payment due Monday is on hold as a precaution, and your details on file are…
3. **Tool call** `escalate_to_human` {"priority":"P2","team":"fraud","reason":"Suspected payment-redirection fraud: bank change request for landlord L-02 before Monday payout","known":"Request email 09/10 15:12 came from margaret@ellisonletters.co.uk (note 'letters'), but genuine address on file and in 22/09 email is ellisonlettings.co.uk. Reply-To is protonmail.example. Urgency, 'can't take calls, confirm by email only', old account…
   - Result: {"ok":true,"hold_id":"HOLD-101"}
[ledger A1, attempt 1] Verified: HOLD-101 found in the hold_payment log.
   - ⚠️ Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: HTTP 500 Internal Server Error"}
[ledger A2, attempt 1] NOT APPLIED: No send_message record on read-back. Retry once if safe, otherwise escalate. Never tell anyone it was done.
   - Result: {"ok":true,"escalation_id":"ESC-102"}
[ledger A3, attempt 1] Verified: ESC-102 found in the escalate_to_human log.
4. **Agent:** Retry once.
5. **Tool call** `send_message` {"recipient_name":"Margaret Ellison","recipient_role":"landlord","channel":"email","contact":"margaret@ellisonlettings.co.uk","body":"Dear Margaret, we received an email today asking us to change your bank details for rent payments. It came from a similar-looking but different address, so we have not changed anything. Your payment due Monday is on hold as a precaution, and your details on file are…
   - Result: {"ok":true,"message_id":"MSG-103","status":"sent"}
[ledger A2, attempt 2] Verified: MSG-103 found in the send_message log.
6. **Tool call** `submit_decision` {"outcome":"escalated","severity":"urgent","summary":"A bank-change request for Margaret Ellison came from a lookalike domain with an external Reply-To and urgency pressure. I did not change the details, held Monday's payout, warned the genuine address on file, and escalated to fraud.","case_state":"Payout £1,932 held (HOLD-101). Bank details unchanged (ending 9902). Fraud team (ESC-102) to do the…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/3120 · Cost: $0.0479 · Duration: 24.5s
- Raw event trace: `trace.jsonl`
