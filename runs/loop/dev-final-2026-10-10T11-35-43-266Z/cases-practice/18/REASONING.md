# Case 18: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (917 chars)
- `inputs/email_tenant.eml` (321 chars)

## Conflicts between sources
- Tenant says 10 Nov end; law gives 10 Dec at the earliest

## Assumptions
- Email counts as written notice
- Notice date is the email date, 10 Oct 2026

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct 2026 giving one month's notice to le… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase landlord Ben Hartley on early-end-date decision for Tom Achterberg's notice (P-250); then confirm en… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"P-250","note":"10 Oct 2026: tenant T-1050 gave notice by email stating 10 Nov. Only 1 month, invalid under RRA; earliest end 10 D… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Trace
1. **Tool call** `send_message` {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks for letting us know, and congratulations on the new job.\n\nSince 1 May 2026 tenants need to give two months' written notice, so one month isn't enough. Counting from your email today (10 October), the earliest your tenancy can end is 10 December 2026. Rent sta…
2. **Tool call** `request_landlord_approval` {"landlord":"Ben Hartley","decision_needed":"Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct 2026 giving one month's notice to leave on 10 Nov (new job in Manchester). Under the Renters' Rights Act two months is required, so the earliest valid end date is 10 Dec 2026. Would you agree in writing to an earlier end date of 10 Nov 2026? Either way, tell us if you'd like us to start marketin…
3. **Tool call** `schedule_follow_up` {"due_on":"2026-10-14","purpose":"Chase landlord Ben Hartley on early-end-date decision for Tom Achterberg's notice (P-250); then confirm end date, keys and check-out with tenant","party":"Ben Hartley"}
4. **Tool call** `add_note` {"entity":"P-250","note":"10 Oct 2026: tenant T-1050 gave notice by email stating 10 Nov. Only 1 month, invalid under RRA; earliest end 10 Dec 2026 unless landlord agrees in writing. Tenant and landlord told. Deposit £2019 (mydeposits) not to be released until check-out."}
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"approval_id":"APR-102","status":"requested"}
[ledger A2, attempt 1] Verified: APR-102 found in the request_landlord_approval log.
   - Result: {"ok":true,"follow_up_id":"FUP-103"}
[ledger A3, attempt 1] Verified: FUP-103 found in the schedule_follow_up log.
   - Result: {"ok":true,"note_id":"NOTE-104"}
[ledger A4, attempt 1] Verified: NOTE-104 found in the add_note log.
5. **Tool call** `submit_decision` {"case_state":"Tenant told notice is short; landlord asked whether he'll agree to an earlier end date; waiting on landlord, follow-up 2026-10-14.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Told tenant notice is invalid at one month, earliest end 10 Dec 2026, keys not yet, deposit via mydeposits after check-out","recipient":"Tom Achterberg, tenant","channel":"email","ledger_id":"A1"},{"ty…
   - Result: Decision recorded.

## Run
- Model turns: 2 · Tokens in/out: 6/2875 · Cost: $0.0408 · Duration: 20.4s
- Raw event trace: `trace.jsonl`
