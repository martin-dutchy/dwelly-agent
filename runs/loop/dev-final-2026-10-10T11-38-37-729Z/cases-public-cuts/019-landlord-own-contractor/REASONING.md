# Case 019-landlord-own-contractor: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (5094 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"create_ticket":[{"call":1,"mode":"timeout"}],"put_on_hold":[{"call":2,"mode":"silent_drop"}],"resume_auto":[{"call":1,"mode":"silent_drop"}],"record_quote":[{"call":1,"mode":"error"}],"record_invoice":[{"call":2,"mode":"error"}],"attach_document":[{"call":2,"mode":"timeout"}],"schedule_follow_up":[{"call":1,"mode":"timeout"}]}
```

## Conflicts between sources
- Event 009 says the landlord approved the quote, but the ticket shows approval required and later notes say we are still waiting for the landlord. I treated it as unapproved.

## Assumptions
- The landlord is reachable by email on the existing thread (event 012).

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Tenant at Flat 25, 185 Copperfield Walk has asked fo… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's written yes/no on Harbour Com… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 25, 185 Copperfield Walk, Alderwick, ZZ4 0ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-019-landlord-own-contractor","stage":"init","property":"Flat 25, 185 Copperfield Walk, Alderwick, ZZ4 0ZZ","description":"Hi dear Maintenance team,\nAs this garden is part of the house included in our tenancy, we would like it to be cleaned and finished properly. The ground also needs to be levelled and covered with stones (gravel) so that we can use the space saf…
   - Result: {"ok":true,"property":{"address":"Flat 25, 185 Copperfield Walk, Alderwick, ZZ4 0ZZ"}}
3. **Tool call** `request_landlord_approval` {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Tenant at Flat 25, 185 Copperfield Walk has asked for the back garden to be cleared of rubbish and construction waste, levelled and gravelled. Our notes show a £500 + VAT quote from Harbour Compliance, but we have no written approval from you. Please reply yes or no: do you approve that quote (£500 + VAT) for u…
4. **Tool call** `send_message` {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-landlord-own-contractor","body":"Hello, thanks for chasing and sorry for the wait. We still need the landlord's written decision on the garden work, and we have not been able to reach them by phone. We have emailed them a clear yes/no question today and will ch…
5. **Tool call** `put_on_hold` {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's written yes/no on Harbour Compliance £500+VAT quote or own contractor. Note of approval (event 009) has no landlord words on file.","review_on":"2025-03-17"}
   - Result: {"ok":true,"approval_id":"APR-101","status":"requested"}
[ledger A1, attempt 1] Verified: APR-101 found in the request_landlord_approval log.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
   - Result: {"ok":true,"ticket_ref":"NBL-019-landlord-own-contractor","hold":{"reason":"Waiting for Landlord","comment":"Awaiting landlord's written yes/no on Harbour Compliance £500+VAT quote or own contractor. Note of approval (event 009) has no landlord words on file.","review_on":"2025-03-17"}}
[ledger A3, attempt 1] Verified: Ticket NBL-019-landlord-own-contractor read back after put_on_hold.
6. **Tool call** `submit_decision` {"case_state":"Landlord approval gate, ticket at init, on hold waiting for landlord. No landlord decision recorded. Landlord has not replied since January. Review 2025-03-17.","next_actions":[{"type":"REQUEST_LANDLORD_APPROVAL","action":"Ask landlord a yes/no question: approve the £500+VAT quote or use own contractor","recipient":"Jenkins, landlord","channel":"email","ledger_id":"A1"},{"type":"REP…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/2445 · Cost: $0.0406 · Duration: 17.7s
- Raw event trace: `trace.jsonl`
