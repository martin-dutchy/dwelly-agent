# Case 047-wrong-address: REASONING

## What the system received
- `history.md` (2673 chars)

## Conflicts between sources
- Landlord email gives Flat 18, 88 Alder Lane, Willowbank and a plumber; the case property is Flat 24, 150 Copperfield Walk and the remaining issue is a window. The tenant says the toilet is fixed. I trusted the case record and the tenant.

## Assumptions
- The landlord's email was sent in error or relates to another property, so it is not approval.
- No contact details were available in the tools, so no messages were sent.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ","category":"roof","severity":"routine","description":"Bedroom window not cl… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Landlord reply refers to wrong property and obsolete issue; no contact details on file to cl… | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |
| A3 | `add_note` | {"entity":"JOB-101","note":"Landlord reply (event 010) names Flat 18, 88 Alder Lane and a plumber: mismatch with Flat 24 window job. Not tre… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Trace
1. **Tool call** `list_tickets` {}
   - Result: {"ok":true,"tickets":[]}
2. **Tool call** `create_ticket` {"property":"Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ","category":"roof","severity":"routine","description":"Bedroom window not closing properly. Tenant confirmed toilet issue is fixed (mother repaired it); only window needed. Awaiting landlord approval on contractor. Landlord reply referenced a different address (Flat 18, 88 Alder Lane) and a plumber - needs clarifying."}
   - Result: {"ok":true,"ref":"JOB-101","stage":"init"}
[ledger A1, attempt 1] Verified: Ticket JOB-101 read back at stage init.
3. **Tool call** `escalate_to_human` {"priority":"P3","team":"maintenance","reason":"Landlord reply refers to wrong property and obsolete issue; no contact details on file to clarify via tools","known":"Tenant at Flat 24, 150 Copperfield Walk reported bedroom window not closing (event 001). Toilet issue was fixed by tenant's mother (event 006); only window needed. Landlord Isaac Oakley (event 010) says plumber will visit Flat 18, 88 …
4. **Tool call** `add_note` {"entity":"JOB-101","note":"Landlord reply (event 010) names Flat 18, 88 Alder Lane and a plumber: mismatch with Flat 24 window job. Not treated as approval. Escalated to maintenance."}
   - Result: {"ok":true,"escalation_id":"ESC-102"}
[ledger A2, attempt 1] Verified: ESC-102 found in the escalate_to_human log.
   - Result: {"ok":true,"note_id":"NOTE-103"}
[ledger A3, attempt 1] Verified: NOTE-103 found in the add_note log.
5. **Tool call** `submit_decision` {"outcome":"escalated","severity":"routine","summary":"Tenant's window repair is still awaiting landlord approval. The landlord's reply names a different address (Flat 18, 88 Alder Lane) and a plumber, so it can't count as approval. I logged JOB-101, added a note and escalated to maintenance to clarify with the landlord. I sent no messages because there are no contact details on file.","answers":[…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/2147 · Cost: $0.0500 · Duration: 19.4s
- Raw event trace: `trace.jsonl`
