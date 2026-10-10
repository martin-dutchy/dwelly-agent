# Case 047-wrong-address: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (2673 chars)

## Actions blocked by hard policy rules
- `request_information`: The message mentions Flat 18, 88 Alder Lane, which is not the property on this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ / Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Fix the address before sending.

## Conflicts between sources
- Landlord's reply names a different address from the case property; treated as not about this job.
- Landlord was sent the toilet issue, which the tenant later withdrew.

## Assumptions
- The landlord's wording is a mistaken or different-property reply, not approval for this flat.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-w… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named a different property (Flat 18, 88 Alde… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","questions":["T… | 1 | ✅ verified | REQ-102 found in the request_information log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-047-wrong-address","stage":"init","property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ","description":"Hello. can come and fix the window from the bedroom because it isn’t closing properly.Thank you!"}]}
   - Result: {"ok":true,"property":{"address":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ"}}
3. **Tool call** `request_information` {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","questions":["Your reply mentions a plumber visiting Flat 18, 88 Alder Lane, Willowbank, which is not the property this job is about (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Did you mean a different property?","For Flat 24, 150 Copperfield Walk: the toilet is no…
4. **Tool call** `send_message` {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-wrong-address","body":"Hi, glad the toilet is sorted. We've noted that only the bedroom window needs attention. We're waiting for the landlord to confirm who will send someone out, and we'll update you as soon as we hear. No visit is booked yet."}
5. **Tool call** `put_on_hold` {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named a different property (Flat 18, 88 Alder Lane); asked which property he meant and for a yes/no on our contractor for the window.","review_on":"2024-02-26"}
   - ⚠️ Result: Validation failed for tool "request_information":
  - ticket_ref: schema is false
  - root: must not have additional properties

Received arguments:
{
  "recipient_name": "Isaac Oakley",
  "recipient_role": "landlord",
  "channel": "email",
  "contact": "existing thread (event 010 email)",
  "questions": [
    "Your reply mentions a plumber visiting Flat 18, 88 Alder Lane, Willowbank, which is not…
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"ticket_ref":"NBL-047-wrong-address","hold":{"reason":"Waiting for Landlord","comment":"Landlord reply named a different property (Flat 18, 88 Alder Lane); asked which property he meant and for a yes/no on our contractor for the window.","review_on":"2024-02-26"}}
[ledger A2, attempt 1] Verified: Ticket NBL-047-wrong-address read back after put_on_hold.
6. **Agent:** Retry without ticket_ref.
7. **Tool call** `request_information` {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","questions":["Your reply mentions a plumber visiting Flat 18, 88 Alder Lane, Willowbank, which is not the property this job is about (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Did you mean a different property?","For Flat 24, 150 Copperfield Walk: the toilet is no…
   - ⚠️ Result: Blocked by policy: The message mentions Flat 18, 88 Alder Lane, which is not the property on this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ / Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Fix the address before sending.
8. **Agent:** Avoid naming the other address.
9. **Tool call** `request_information` {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","questions":["The address in your reply is not the property this job is about (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Did you mean a different property?","For Flat 24, 150 Copperfield Walk: the toilet is now fixed, so only the bedroom window that won't close pr…
   - Result: {"ok":true,"request_id":"REQ-102","status":"sent"}
[ledger A3, attempt 1] Verified: REQ-102 found in the request_information log.
10. **Tool call** `submit_decision` {"case_state":"Intake/landlord gate, on hold (review 2024-02-26). No contractor assigned, no visit booked. Landlord's reply named a different property so it is not approval. Toilet issue withdrawn by tenant; only the bedroom window remains.","next_actions":[{"type":"REQUEST_INFORMATION","action":"Ask landlord which property he meant and for a yes/no on our contractor for the window","recipient":"I…
   - Result: Decision recorded.

## Run
- Model turns: 5 · Tokens in/out: 12/3052 · Cost: $0.0577 · Duration: 21.2s
- Raw event trace: `trace.jsonl`
