# Case 18: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/crm.json` (917 chars)
- `inputs/email_tenant.eml` (321 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"update_ticket":[{"call":1,"mode":"timeout"}],"assign_contractor":[{"call":1,"mode":"timeout"}],"set_visit":[{"call":2,"mode":"timeout"}],"skip_document":[{"call":2,"mode":"silent_drop"}],"confirm_keys_returned":[{"call":1,"mode":"timeout"}],"request_information":[{"call":1,"mode":"error"}]}
```

## Conflicts between sources
- Tenant says one month's notice ending 10 Nov; the CRM shows an assured periodic tenancy (converted 1 May 2026), so two months applies. Trusted the law and CRM.

## Assumptions
- Email date 10 Oct counts as the notice date; the 2 months run from then
- Deposit return is handled by a human after check-out

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley","decision_needed":"Tenant Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct 2026 giving one month's notic… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `schedule_follow_up` | {"due_on":"2026-10-14","purpose":"Chase Ben Hartley on early end date decision for Tom Achterberg's notice (P-250); then update tenant","par… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Trace
1. **Tool call** `send_message` {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks for letting us know, and congratulations on the new job. Since 1 May 2026 tenancies like yours need two months' written notice, so one month isn't enough. Your email is dated 10 October, so the earliest end date is 10 December 2026. Rent stays due as normal unt…
2. **Tool call** `request_landlord_approval` {"landlord":"Ben Hartley","decision_needed":"Tenant Tom Achterberg (Flat 2, 5 Navarino Road) emailed on 10 Oct 2026 giving one month's notice, wanting to leave 10 Nov. Under the Renters' Rights Act two months' notice is needed, so the earliest end is 10 Dec 2026. Do you agree in writing to an earlier end date of 10 Nov 2026?","options":["Keep to 10 Dec 2026 (no agreement needed; we start planning …
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"approval_id":"APR-102","status":"requested"}
[ledger A2, attempt 1] Verified: APR-102 found in the request_landlord_approval log.
3. **Tool call** `schedule_follow_up` {"due_on":"2026-10-14","purpose":"Chase Ben Hartley on early end date decision for Tom Achterberg's notice (P-250); then update tenant","party":"Ben Hartley"}
   - Result: {"ok":true,"follow_up_id":"FUP-103"}
[ledger A3, attempt 1] Verified: FUP-103 found in the schedule_follow_up log.
4. **Tool call** `submit_decision` {"case_state":"Notice received 10 Oct; tenant told earliest end is 10 Dec; landlord asked about agreeing an earlier date; waiting on landlord, review 2026-10-14.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Told tenant one month is not valid, earliest end 10 Dec 2026, early end needs landlord's written agreement, keys on hold, deposit after check-out","recipient":"Tom Achterberg, tenant","…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/2476 · Cost: $0.0395 · Duration: 18.6s
- Raw event trace: `trace.jsonl`
