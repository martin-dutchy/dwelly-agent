# Case 047-wrong-address: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- Case details from `index.md`, with the task and questions (1131 chars)
- Cut point: history events 1–10 of 36 (events 11–36 withheld)
- `history.md` (2673 chars)
- Referenced in the history but not provided: none

## Actions blocked by hard policy rules
- `request_information`: The message mentions Flat 18, 88 Alder Lane, which is not the property on this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ / Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Fix the address before sending.

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane, ZZ3 5ZZ, but the job is Flat 24, 150 Copperfield Walk, ZZ3 7ZZ. Trusted the job record.
- Event 004 told the landlord about a toilet issue that the original request did not include; the tenant later said the toilet is fixed.

## Assumptions
- The landlord may have mixed up two of their properties.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane; no… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-047-wrong-address","note":"Event 010 landlord reply names a different address (Flat 18, 88 Alder Lane, ZZ3 5ZZ) and a plumber… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your reply m… | 1 | ✅ verified | REQ-103 found in the request_information log |

## Trace
1. **Tool call** `list_tickets` {}
   - `list_tickets` result: {"ok":true,"tickets":[{"ref":"NBL-047-wrong-address","stage":"init","property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ","description":"Hello. can come and fix the window from the bedroom because it isn’t closing properly.Thank you!"}]}
2. **Tool call** `get_property` {"property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ"}
   - `get_property` result: {"ok":true,"property":{"address":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ","landlord":{"contact":"agency landlord record","notes":["Contact details are held in the agency system and not shown in this case file; messages to the landlord go through it. Use contact \"agency landlord record\".","Landlord messages visible in this case: event 004 (email, to landlord); event 010 (email, from l…
3. **Tool call** `request_information` {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your reply mentions a plumber visiting Flat 18, 88 Alder Lane, Willowbank. Our job is for Flat 24, 150 Copperfield Walk, Kingshaven, where the bedroom window won't close properly. Did you mean a different property?","For Flat 24, 150 Copperfield Walk: may we send our cont…
   - ⚠️ `request_information` result: Blocked by policy: The message mentions Flat 18, 88 Alder Lane, which is not the property on this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ / Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Fix the address before sending.
4. **Tool call** `send_message` {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, thanks for letting us know the toilet is sorted, we'll just deal with the bedroom window. We're waiting for the landlord to confirm we can send a contractor, and we've asked them a clarifying question. We'll update you by 2024-02-26 at the latest. Kind regards, Ashford",…
   - `send_message` result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
5. **Tool call** `put_on_hold` {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane; not approval. Asked which property and for yes/no on our contractor for the window.","review_on":"2024-02-26"}
   - `put_on_hold` result: {"ok":true,"ticket_ref":"NBL-047-wrong-address","hold":{"reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane; not approval. Asked which property and for yes/no on our contractor for the window.","review_on":"2024-02-26"}}
[ledger A2, attempt 1] Verified: Ticket NBL-047-wrong-address read back after put_on_hold.
6. **Tool call** `add_note` {"entity":"NBL-047-wrong-address","note":"Event 010 landlord reply names a different address (Flat 18, 88 Alder Lane, ZZ3 5ZZ) and a plumber; toilet issue withdrawn by tenant (event 006). No approval recorded, no contractor assigned."}
   - `add_note` result: {"ok":true,"note_id":"NOTE-102"}
[ledger A3, attempt 1] Verified: NOTE-102 found in the add_note log.
7. **Agent:** Resend without naming the other address.
8. **Tool call** `request_information` {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your reply mentions a plumber visiting a property with a different address from this job. This job is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ, where the bedroom window won't close properly. Did you mean a different property?","For Flat 24, 150 Copperfield W…
   - `request_information` result: {"ok":true,"request_id":"REQ-103","status":"sent"}
[ledger A4, attempt 1] Verified: REQ-103 found in the request_information log.
9. **Tool call** `submit_decision` {"case_state":"Intake/landlord gate, on hold waiting for landlord until 2024-02-26. No approval recorded, no contractor assigned.","next_actions":[{"type":"REQUEST_INFORMATION","action":"Ask landlord which property they meant and for a yes/no on our contractor for the Flat 24 bedroom window","recipient":"Isaac Oakley, landlord","channel":"email","ledger_id":"A4"},{"type":"REPLY_TO_TENANT","action"…
   - `submit_decision` result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/2855 · Cost: $0.0500 · Duration: 21.4s
- Raw event trace: `trace.jsonl`
