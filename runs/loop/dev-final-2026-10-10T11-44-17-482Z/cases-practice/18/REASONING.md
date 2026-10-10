# Case 18: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- Case brief (554 chars)
- `inputs/crm.json` (917 chars)
- `inputs/email_tenant.eml` (321 chars)

## Conflicts between sources
- Tenant says one month's notice; the law requires two months. Followed the law.

## Assumptions
- The email is treated as written notice dated 10 Oct 2026.
- The tenancy is assured periodic, as per the CRM.
- The landlord has not already agreed a shorter date; nothing in the case says so.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tom Achterberg (Flat 2, 5 Navarino Road) gave one month's notice on 10 Oct 2026 to leave on 10 … | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase Ben Hartley for decision on earlier end date for T-1050; then update tenant","party":"Ben Hartley"} | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Trace
1. **Tool call** `send_message` {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks for letting us know, and congratulations on the new job. Under the current rules a tenant needs to give two months' written notice, so one month isn't enough to end the tenancy on 10 November. Your notice dated 10 October would run to 10 December 2026, and rent…
   - `send_message` result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
2. **Tool call** `request_landlord_approval` {"landlord":"Ben Hartley","decision_needed":"Tom Achterberg (Flat 2, 5 Navarino Road) gave one month's notice on 10 Oct 2026 to leave on 10 Nov. This is not valid under the Renters' Rights Act (two months needed), so the earliest date is 10 Dec 2026. Do you agree in writing to an earlier end date of 10 Nov 2026? Rent would stop then and we would start re-letting and check-out arrangements.","optio…
   - `request_landlord_approval` result: {"ok":true,"approval_id":"APR-102","status":"requested"}
[ledger A2, attempt 1] Verified: APR-102 found in the request_landlord_approval log.
3. **Tool call** `schedule_follow_up` {"due_on":"2026-10-14","purpose":"Chase Ben Hartley for decision on earlier end date for T-1050; then update tenant","party":"Ben Hartley"}
   - `schedule_follow_up` result: {"ok":true,"follow_up_id":"FUP-103"}
[ledger A3, attempt 1] Verified: FUP-103 found in the schedule_follow_up log.
4. **Tool call** `submit_decision` {"case_state":"Tenant told notice is two months (earliest 10 Dec 2026). Landlord asked on 10 Oct whether he will agree in writing to an earlier date. Waiting on the landlord, review 14 Oct.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Explained notice needs two months, earliest end 10 Dec, shorter only with landlord's written agreement; keys and deposit answered without promising dates","r…
   - `submit_decision` result: Decision recorded.

## Run
- Model turns: 2 · Tokens in/out: 6/2746 · Cost: $0.0411 · Duration: 19.4s
- Raw event trace: `trace.jsonl`
