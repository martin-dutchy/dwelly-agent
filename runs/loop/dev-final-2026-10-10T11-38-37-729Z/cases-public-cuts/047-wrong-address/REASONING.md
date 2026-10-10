# Case 047-wrong-address: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (2673 chars)

## Actions blocked by hard policy rules
- `request_information`: The message mentions Flat 18, 88 Alder Lane, which is not the property on this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ / Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Fix the address before sending.

## Injected tool failures (robustness test, --chaos)
```json
{"assign_contractor":[{"call":1,"mode":"error"}],"put_on_hold":[{"call":2,"mode":"timeout"}],"record_landlord_decision":[{"call":1,"mode":"timeout"},{"call":2,"mode":"error"}],"set_visit":[{"call":1,"mode":"error"}],"attach_document":[{"call":1,"mode":"error"},{"call":2,"mode":"silent_drop"}],"approve_quote":[{"call":1,"mode":"error"}]}
```

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane, Willowbank, ZZ3 5ZZ (a plumber, for a toilet check) but the job is Flat 24, 150 Copperfield Walk, ZZ3 7ZZ (bedroom window). Treated as not about this job.
- The landlord email forwarded the tenant's earlier toilet text, but the ticket is for the window only.

## Assumptions
- The landlord's email address is the one on the event 010 thread; the first clarification attempt was blocked for naming the other address, so it was resent without it.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-w… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named Flat 18, 88 Alder Lane (different prop… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","questions":["Y… | 1 | ✅ verified | REQ-102 found in the request_information log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-047-wrong-address","stage":"init","property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ","description":"Hello. can come and fix the window from the bedroom because it isn’t closing properly.Thank you!"}]}
   - Result: {"ok":true,"property":{"address":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ"}}
3. **Tool call** `request_information` {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","questions":["Your reply mentions a plumber visiting Flat 18, 88 Alder Lane, but our job is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ (a bedroom window that won't close properly; the tenant says the toilet is now fixed). Which property did you mean? For Flat 24,…
4. **Tool call** `send_message` {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-wrong-address","body":"Hi, thanks for letting us know the toilet is sorted. We've noted the bedroom window is still to be fixed. We're waiting for the landlord to confirm we can send a contractor, and we've asked them a quick question to clear that up. We'll up…
5. **Tool call** `put_on_hold` {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named Flat 18, 88 Alder Lane (different property); asked which property they meant and for yes/no on our contractor for the window at Flat 24.","review_on":"2024-02-23"}
   - ⚠️ Result: Blocked by policy: The message mentions Flat 18, 88 Alder Lane, which is not the property on this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ / Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Fix the address before sending.
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"ticket_ref":"NBL-047-wrong-address","hold":{"reason":"Waiting for Landlord","comment":"Landlord reply named Flat 18, 88 Alder Lane (different property); asked which property they meant and for yes/no on our contractor for the window at Flat 24.","review_on":"2024-02-23"}}
[ledger A2, attempt 1] Verified: Ticket NBL-047-wrong-address read back after put_on_hold.
6. **Agent:** Resend without naming the other address.
7. **Tool call** `request_information` {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","questions":["Your reply refers to a different address from our job, which is Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ (bedroom window not closing properly; the tenant says the toilet is now fixed). Which property did you mean the plumber visit for?","For Flat 24, …
   - Result: {"ok":true,"request_id":"REQ-102","status":"sent"}
[ledger A3, attempt 1] Verified: REQ-102 found in the request_information log.
8. **Tool call** `submit_decision` {"case_state":"Intake/landlord gate, on hold (review 2024-02-23). No provider assigned. Landlord's reply named a different property, so there is no valid approval. Waiting on the landlord to clarify.","next_actions":[{"type":"REQUEST_INFORMATION","action":"Ask landlord which property they meant and for a yes/no on our contractor for the window at Flat 24","recipient":"Isaac Oakley, landlord","chan…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/2754 · Cost: $0.0481 · Duration: 18.8s
- Raw event trace: `trace.jsonl`
