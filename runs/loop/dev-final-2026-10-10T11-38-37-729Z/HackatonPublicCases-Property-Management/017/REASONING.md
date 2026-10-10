# Case 017: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (2137 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"create_ticket":[{"call":1,"mode":"error"}],"assign_contractor":[{"call":2,"mode":"timeout"}],"put_on_hold":[{"call":1,"mode":"silent_drop"}],"record_landlord_decision":[{"call":1,"mode":"timeout"}],"record_invoice":[{"call":2,"mode":"error"}],"attach_document":[{"call":2,"mode":"error"}],"skip_document":[{"call":1,"mode":"silent_drop"}],"close_ticket":[{"call":2,"mode":"timeout"}],"request_landlord_approval":[{"call":1,"mode":"error"}],"hold_payment":[{"call":2,"mode":"error"}]}
```

## Conflicts between sources
_None identified._

## Assumptions
- The landlord's tip refers to this property's extractor fan

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 008 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord advised fan runs from a separate switch right of hob. Waiting for … | 2 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Trace
1. **Tool call** `list_tickets` {}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-017","stage":"init","property":"Flat 1, 31 Juniper Mews, Cedarford, ZZ7 7ZZ","description":"Extractor fan in kitchen does not seem to work (turn on). May be a simple technician fix. Thank you","landlord_approval":"required"}]}
2. **Tool call** `send_message` {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","body":"Hi Clara, the landlord says the extractor fan has its own switch, to the right-hand side of the hob, which needs to be switched on. Could you try that and let us know whether the fan now works? If it still doesn't, tell us and we'll arrange for someone …
3. **Tool call** `send_message` {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 008 email)","ticket_ref":"NBL-017","body":"Thank you for the tip about the switch by the hob. We've passed it to the tenant to try. If the fan still doesn't work, we'll come back to you to ask whether you'd like us to send our contractor or use your own. No action is needed from you for now…
4. **Tool call** `put_on_hold` {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord advised fan runs from a separate switch right of hob. Waiting for tenant to confirm whether that fixes it. No landlord approval to instruct a contractor given.","review_on":"2026-09-18"}
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
   - ⚠️ Result: {"ok":true,"ticket_ref":"NBL-017","hold":{"reason":"Waiting for Tenant","comment":"Landlord advised fan runs from a separate switch right of hob. Waiting for tenant to confirm whether that fixes it. No landlord approval to instruct a contractor given.","review_on":"2026-09-18"}}
[ledger A3, attempt 1] NOT APPLIED: Ticket NBL-017: hold reason is none. Retry once if safe, otherwise escalate. Never t…
5. **Agent:** Retry once.
6. **Tool call** `put_on_hold` {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord advised fan runs from a separate switch right of hob. Waiting for tenant to confirm whether that fixes it. No landlord approval to instruct a contractor given.","review_on":"2026-09-18"}
   - Result: {"ok":true,"ticket_ref":"NBL-017","hold":{"reason":"Waiting for Tenant","comment":"Landlord advised fan runs from a separate switch right of hob. Waiting for tenant to confirm whether that fixes it. No landlord approval to instruct a contractor given.","review_on":"2026-09-18"}}
[ledger A3, attempt 2] Verified: Ticket NBL-017 read back after put_on_hold.
7. **Tool call** `submit_decision` {"case_state":"NBL-017 at intake/landlord gate. Landlord has not approved a contractor route; their reply (event 008) is a troubleshooting tip. On hold waiting for tenant confirmation, review 2026-09-18.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Asked Clara to try the switch right of the hob and say whether the fan works","recipient":"Clara, tenant","channel":"email","ledger_id":"A1"},{…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/2397 · Cost: $0.0443 · Duration: 20.1s
- Raw event trace: `trace.jsonl`
