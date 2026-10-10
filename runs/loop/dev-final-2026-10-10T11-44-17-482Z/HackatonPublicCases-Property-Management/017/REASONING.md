# Case 017: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- Case details from `index.md`, with the task and questions (1134 chars)
- Cut point: history events 1–8 of 14 (events 9–14 withheld)
- `history.md` (2137 chars)
- Referenced in the history but not provided: none

## Conflicts between sources
_None identified._

## Assumptions
- Tenant's 'Thank you!' (event 007) is not a confirmation that the fan works

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched … | 1 | ✅ verified | Ticket NBL-017 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says fan has a separate switch right of hob. Waiting for tenant to… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Trace
1. **Tool call** `list_tickets` {}
   - `list_tickets` result: {"ok":true,"tickets":[{"ref":"NBL-017","stage":"init","property":"Flat 1, 31 Juniper Mews, Cedarford, ZZ7 7ZZ","description":"Extractor fan in kitchen does not seem to work (turn on). May be a simple technician fix. Thank you","landlord_approval":"required"}]}
2. **Tool call** `record_landlord_decision` {"ticket_ref":"NBL-017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched on.","source":"event 008, email 2026-09-15"}
   - `record_landlord_decision` result: {"ok":true,"ticket_ref":"NBL-017","landlord_decision":{"decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched on.","source":"event 008, email 2026-09-15"}}
[ledger A1, attempt 1] Verified: Ticket NBL-017 read back after record_landlord_decision.
3. **Tool call** `send_message` {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","body":"Hi Clara, the landlord says the extractor fan has its own switch to the right-hand side of the hob, which needs to be switched on. Could you try that and let us know whether the fan then works? If it still doesn't, tell us and we'll carry on arranging a…
   - `send_message` result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-101 found in the send_message log.
4. **Tool call** `put_on_hold` {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says fan has a separate switch right of hob. Waiting for tenant to confirm whether fan works; landlord has not yet chosen a contractor route.","review_on":"2026-09-18"}
   - `put_on_hold` result: {"ok":true,"ticket_ref":"NBL-017","hold":{"reason":"Waiting for Tenant","comment":"Landlord says fan has a separate switch right of hob. Waiting for tenant to confirm whether fan works; landlord has not yet chosen a contractor route.","review_on":"2026-09-18"}}
[ledger A3, attempt 1] Verified: Ticket NBL-017 read back after put_on_hold.
5. **Tool call** `submit_decision` {"case_state":"Ticket NBL-017 at intake/landlord gate, on hold until 2026-09-18. Landlord replied with a tip, not a route decision. Waiting on tenant to confirm whether the fan works.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Passed on landlord's tip about the separate switch right of the hob; asked tenant to try it and confirm; said we'll check back by 2026-09-18","recipient":"Clara, t…
   - `submit_decision` result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/1891 · Cost: $0.0379 · Duration: 13.9s
- Raw event trace: `trace.jsonl`
