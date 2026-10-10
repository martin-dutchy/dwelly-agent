# Case 017: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (2137 chars)

## Conflicts between sources
_None identified._

## Assumptions
- The tenant's 'Thank you!' at event 007 was a courtesy reply and not a decision.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","body":"Hi Clara, the la… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 008 email)","body":"Thank you f… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"R-017","reason":"Waiting for Tenant","comment":"Landlord says a switch right of the hob must be on. Waiting for tenant to con… | 1 | ❌ failed | Ticket R-017 not found on read-back |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says a switch right of the hob must be on. Waiting for tenant to c… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Trace
1. **Tool call** `send_message` {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","body":"Hi Clara, the landlord has said there is a separate switch to the right-hand side of the hob that needs to be switched on for the extractor fan to work. Could you try that and let us know if the fan now runs? If it still doesn't, tell us and we'll carry on arranging a repair.…
2. **Tool call** `send_message` {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 008 email)","body":"Thank you for the tip about the switch by the hob. We've passed it to the tenant to try. If the fan still doesn't work, we'll come back to you to ask whether you'd like your own contractor or ours to look at it.","ticket_ref":"R-017"}
3. **Tool call** `put_on_hold` {"ticket_ref":"R-017","reason":"Waiting for Tenant","comment":"Landlord says a switch right of the hob must be on. Waiting for tenant to confirm whether the fan now works. Landlord has not yet chosen a contractor route.","review_on":"2026-09-18"}
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
   - ⚠️ Result: {"ok":false,"error":"not_found","say":"No ticket R-017. Use list_tickets."}
[ledger A3, attempt 1] NOT APPLIED: Ticket R-017 not found on read-back. Retry once if safe, otherwise escalate. Never tell anyone it was done.
4. **Tool call** `list_tickets` {}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-017","stage":"init","property":"Flat 1, 31 Juniper Mews, Cedarford, ZZ7 7ZZ","description":"Extractor fan in kitchen does not seem to work (turn on). May be a simple technician fix. Thank you","landlord_approval":"required"}]}
5. **Tool call** `put_on_hold` {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says a switch right of the hob must be on. Waiting for tenant to confirm whether the fan now works. Landlord has not yet chosen a contractor route.","review_on":"2026-09-18"}
   - Result: {"ok":true,"ticket_ref":"NBL-017","hold":{"reason":"Waiting for Tenant","comment":"Landlord says a switch right of the hob must be on. Waiting for tenant to confirm whether the fan now works. Landlord has not yet chosen a contractor route.","review_on":"2026-09-18"}}
[ledger A4, attempt 1] Verified: Ticket NBL-017 read back after put_on_hold.
6. **Tool call** `submit_decision` {"case_state":"NBL-017 at init/landlord gate. Landlord has not approved a contractor route. On hold waiting for tenant to confirm whether the hob-side switch fixes the fan; review 2026-09-18.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Asked tenant to try the switch right of the hob and report back","recipient":"Clara, tenant","channel":"email","ledger_id":"A1"},{"type":"OTHER","action":"…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/2499 · Cost: $0.0454 · Duration: 17.7s
- Raw event trace: `trace.jsonl`
