# Case 017: REASONING

## What the system received
- `history.md` (2137 chars)

## Conflicts between sources
- Tenant says the fan does not turn on; landlord says it needs a separate switch. Not resolved until the tenant tries it.

## Assumptions
- The tenant's 'Thank you!' (event 007) was an acknowledgement, not new information.
- The landlord's message is a tip, not a contractor decision.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says fan has a separate switch right of hob. Asked tenant to try i… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 1, 31 Juniper Mews, Cedarford, ZZ7 7ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-017","stage":"init","property":"Flat 1, 31 Juniper Mews, Cedarford, ZZ7 7ZZ","description":"Extractor fan in kitchen does not seem to work (turn on). May be a simple technician fix. Thank you","landlord_approval":"required"}]}
   - Result: {"ok":true,"property":{"address":"Flat 1, 31 Juniper Mews, Cedarford, ZZ7 7ZZ"}}
3. **Tool call** `send_message` {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","body":"Hi Clara, the landlord says the extractor fan has its own switch, on the right-hand side of the hob, which needs to be switched on. Could you try that and let us know whether the fan now works? If it still doesn't, we'll carry on arranging a technician …
4. **Tool call** `put_on_hold` {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says fan has a separate switch right of hob. Asked tenant to try it and confirm. If not working, ask landlord one clear question: our contractor or own. No landlord approval recorded yet.","review_on":"2026-09-18"}
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"ticket_ref":"NBL-017","hold":{"reason":"Waiting for Tenant","comment":"Landlord says fan has a separate switch right of hob. Asked tenant to try it and confirm. If not working, ask landlord one clear question: our contractor or own. No landlord approval recorded yet.","review_on":"2026-09-18"}}
[ledger A2, attempt 1] Verified: Ticket NBL-017 read back after put_on_hold.
5. **Tool call** `submit_decision` {"case_state":"Ticket NBL-017 at intake, landlord approval step not completed. On hold waiting for tenant to try the switch the landlord described; review 2026-09-18.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Ask tenant to try the switch right of the hob and confirm whether the fan works","recipient":"Clara, tenant","channel":"email","ledger_id":"A1"},{"type":"WAIT","action":"Hold until…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/1862 · Cost: $0.0316 · Duration: 13.7s
- Raw event trace: `trace.jsonl`
