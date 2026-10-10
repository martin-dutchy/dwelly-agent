# Case 047-wrong-address: REASONING

## What the system received
- `history.md` (2673 chars)

## Actions blocked by hard policy rules
- `send_message`: The message mentions Flat 18, 88 Alder Lane, which is not the property on this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ / Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Fix the address before sending.

## Conflicts between sources
- Landlord's reply names Flat 18, 88 Alder Lane, Willowbank, which differs from the job property Flat 24, 150 Copperfield Walk. I trusted the job record.
- Landlord was told about a toilet issue the tenant has since said is fixed.

## Assumptions
- Landlord's reply was a mistake or relates to another property, not approval for this one.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-w… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named a different property (Flat 18, 88 Alde… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-047-wrong-address","stage":"init","property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ","description":"Hello. can come and fix the window from the bedroom because it isn’t closing properly.Thank you!"}]}
   - Result: {"ok":true,"property":{"address":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ"}}
3. **Tool call** `send_message` {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"NBL-047-wrong-address","body":"Dear Mr Oakley, thank you for your reply. The plumber visit you mention is for Flat 18, 88 Alder Lane, Willowbank, but our request concerns Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Please check you have the right proper…
4. **Tool call** `send_message` {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-wrong-address","body":"Hi, glad the toilet is sorted. We've noted that only the bedroom window needs attention. We're waiting for the landlord to confirm who will carry out the work, and we'll be in touch as soon as we have a visit to arrange. If the window can…
5. **Tool call** `put_on_hold` {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named a different property (Flat 18, 88 Alder Lane) and a plumber; asked to confirm approval for the bedroom window at Flat 24, 150 Copperfield Walk.","review_on":"2024-02-24"}
   - ⚠️ Result: Blocked by policy: The message mentions Flat 18, 88 Alder Lane, which is not the property on this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ / Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Fix the address before sending.
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"ticket_ref":"NBL-047-wrong-address","hold":{"reason":"Waiting for Landlord","comment":"Landlord reply named a different property (Flat 18, 88 Alder Lane) and a plumber; asked to confirm approval for the bedroom window at Flat 24, 150 Copperfield Walk.","review_on":"2024-02-24"}}
[ledger A2, attempt 1] Verified: Ticket NBL-047-wrong-address read back after put_on_hold.
6. **Agent:** Resend without naming the other address.
7. **Tool call** `send_message` {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"NBL-047-wrong-address","body":"Dear Mr Oakley, thank you for your reply. The address in your email does not match our request, which is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Please check you have the right property. The tenant has also told us…
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-102 found in the send_message log.
8. **Tool call** `submit_decision` {"case_state":"Ticket at init, on hold (Waiting for Landlord, review 2024-02-24). No landlord approval for the bedroom window at Flat 24. No contractor assigned.","next_actions":[{"type":"REQUEST_INFORMATION","action":"Asked landlord to confirm the property and say whether we may send a contractor for the bedroom window (toilet no longer needed)","recipient":"Isaac Oakley, landlord","channel":"ema…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/2839 · Cost: $0.0488 · Duration: 20.4s
- Raw event trace: `trace.jsonl`
