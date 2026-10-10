# Case 017: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (2137 chars)

## Conflicts between sources
_None identified._

## Assumptions
- Ticket reference is NBL-017 (none given in the case).

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched … | 1 | ✅ verified | Ticket NBL-017 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 008 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Waiting for tenant to confirm whether the fan works using the separate swit… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Trace
1. **Tool call** `record_landlord_decision` {"ticket_ref":"NBL-017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched on.","source":"event 008, email 2026-09-15"}
2. **Tool call** `send_message` {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","body":"Hi Clara, the landlord says the extractor fan has a separate switch to the right-hand side of the hob, which needs to be switched on for the fan to run. Could you try that and let us know whether the fan now works? If it still doesn't, tell us and we'll…
3. **Tool call** `send_message` {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 008 email)","ticket_ref":"NBL-017","body":"Thank you for the tip about the switch by the hob. We've passed it to the tenant to try. If the fan still doesn't work, we'll come back to you to ask whether you'd like to use your own contractor or ours. No action needed from you for now."}
4. **Tool call** `put_on_hold` {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Waiting for tenant to confirm whether the fan works using the separate switch beside the hob. Landlord has not yet chosen a contractor route.","review_on":"2026-09-18"}
   - Result: {"ok":true,"ticket_ref":"NBL-017","landlord_decision":{"decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched on.","source":"event 008, email 2026-09-15"}}
[ledger A1, attempt 1] Verified: Ticket NBL-017 read back after record_landlord_decision.
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-102 found in the send_message log.
   - Result: {"ok":true,"ticket_ref":"NBL-017","hold":{"reason":"Waiting for Tenant","comment":"Waiting for tenant to confirm whether the fan works using the separate switch beside the hob. Landlord has not yet chosen a contractor route.","review_on":"2026-09-18"}}
[ledger A4, attempt 1] Verified: Ticket NBL-017 read back after put_on_hold.
5. **Tool call** `submit_decision` {"case_state":"Landlord approval gate; no route chosen, no contractor assigned. Landlord's reply is a troubleshooting tip, not approval. On hold waiting for tenant to test the switch; review 2026-09-18.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Ask Clara to try the switch right of the hob and report whether the fan works","recipient":"Clara, tenant","channel":"email","ledger_id":"A2"},{…
   - Result: Decision recorded.

## Run
- Model turns: 2 · Tokens in/out: 6/2369 · Cost: $0.0355 · Duration: 16.2s
- Raw event trace: `trace.jsonl`
