# Case 047-wrong-address: REASONING

## What the system received
- `history.md` (2673 chars)

## Actions blocked by hard policy rules
- `send_message`: The message mentions Flat 18, 88 Alder Lane, which is not the property on this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ / Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Fix the address before sending.

## Conflicts between sources
- Landlord reply (event 010) refers to Flat 18, 88 Alder Lane, Willowbank, but the case property is Flat 24, 150 Copperfield Walk. Trusted the case property; did not treat the reply as approval.

## Assumptions
- The landlord's email to Isaac Oakley reached the existing thread (event 010) and the tenant's email thread (event 006) are the correct contact channels, since no separate contact details are on file.
- The toilet issue is resolved, as the tenant said in event 006.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant, Flat 24, 150 Copperfield Walk","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) concerned Flat 18, 88 Alder Lane… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Trace
1. **Tool call** `get_property` {"property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ"}
2. **Tool call** `list_tickets` {}
   - Result: {"ok":true,"property":{"address":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ"}}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-047-wrong-address","stage":"init","property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ","description":"Hello. can come and fix the window from the bedroom because it isn’t closing properly.Thank you!"}]}
3. **Tool call** `send_message` {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"NBL-047-wrong-address","body":"Hello Isaac,\n\nThank you for your reply. We think it may have been sent to the wrong address: the plumber visit you mention is for Flat 18, 88 Alder Lane, Willowbank, which is not the property we are dealing with.\n\nThe property…
4. **Tool call** `send_message` {"recipient_name":"Tenant, Flat 24, 150 Copperfield Walk","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-wrong-address","body":"Hello,\n\nThank you for your message, and I'm glad the toilet is working again.\n\nWe have logged the bedroom window that does not close properly. We are waiting for the landlord to confirm that we can send …
5. **Tool call** `put_on_hold` {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) concerned Flat 18, 88 Alder Lane, Willowbank, not this property. Need landlord to confirm contractor inspection/quote for bedroom window at Flat 24, 150 Copperfield Walk, or to use their own contractor.","review_on":"2024-02-26"}
   - ⚠️ Result: Blocked by policy: The message mentions Flat 18, 88 Alder Lane, which is not the property on this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ / Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Fix the address before sending.
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"ticket_ref":"NBL-047-wrong-address","hold":{"reason":"Waiting for Landlord","comment":"Landlord reply (event 010) concerned Flat 18, 88 Alder Lane, Willowbank, not this property. Need landlord to confirm contractor inspection/quote for bedroom window at Flat 24, 150 Copperfield Walk, or to use their own contractor.","review_on":"2024-02-26"}}
[ledger A2, attempt 1] Verified: Ticket NBL…
6. **Tool call** `send_message` {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"NBL-047-wrong-address","body":"Hello Isaac,\n\nThank you for your reply. The plumber visit you mention appears to be for a different property from the one we are dealing with, so we have not treated it as an instruction for this job.\n\nThe property for this re…
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-102 found in the send_message log.
7. **Tool call** `submit_decision` {"case_state":"Stage init. Tenant reported a bedroom window at Flat 24, 150 Copperfield Walk that does not close properly (routine). The toilet issue is resolved by the tenant's family. The landlord's only reply (event 010) concerns a plumber at a different property, Flat 18, 88 Alder Lane, so it is not an approval for this job. The ticket is on hold waiting for the landlord, review 2024-02-26.","…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/4132 · Cost: $0.0032 · Duration: 20.5s
- Raw event trace: `trace.jsonl`
