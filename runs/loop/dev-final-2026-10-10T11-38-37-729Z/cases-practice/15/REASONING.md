# Case 15: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/call_transcript.txt` (390 chars)
- `inputs/caller_metadata.json` (35 chars)
- `inputs/crm.json` (762 chars)
- `inputs/fixflo_export.csv` (174 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"create_ticket":[{"call":1,"mode":"silent_drop"}],"assign_contractor":[{"call":1,"mode":"error"}],"record_landlord_decision":[{"call":1,"mode":"timeout"}],"set_visit":[{"call":2,"mode":"timeout"}],"record_invoice":[{"call":1,"mode":"timeout"}],"confirm_keys_returned":[{"call":2,"mode":"error"}],"escalate_to_human":[{"call":2,"mode":"timeout"}]}
```

## Conflicts between sources
- Legacy Fixflo shows Flat 9 tenant P. Shah-Mehta (ended 2025-11-30, phone ...166) vs CRM active tenant Priya Shah (phone ...103): trusted the CRM.
- Caller ID ...177 differs from the CRM phone ...103: explained by the caller as a work phone, unverified.

## Assumptions
- The find_tenant/verify_identity tools were not available, so I verified by comparing the spoken name and DOB with the CRM.
- The legacy entry is the previous occupant, not the same person.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"P-203","note":"Legacy Fixflo export (Amhurst Lettings, imported 2026-03, unmaintained) lists Flat 9 tenant as P. Shah-Mehta, ende… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Trace
1. **Tool call** `send_message` {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya, thanks for calling today. As you rang from a number we don't have on file, we're sending the details to your email on record. Your tenancy at Flat 9, 3 Amhurst Road started on 10 January 2026. Under the new rules it is a rolling (periodic) tenancy with no fixed end da…
2. **Tool call** `add_note` {"entity":"P-203","note":"Legacy Fixflo export (Amhurst Lettings, imported 2026-03, unmaintained) lists Flat 9 tenant as P. Shah-Mehta, ended 2025-11-30, phone +447700900166. Current CRM (T-1003 Priya Shah, active, start 2026-01-10) treated as authoritative; legacy record looks like the previous occupant. Do not use legacy data for identity. Inbound call 2026-10-10 from +447700900177 (caller said …
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"note_id":"NOTE-102"}
[ledger A2, attempt 1] Verified: NOTE-102 found in the add_note log.
3. **Tool call** `submit_decision` {"case_state":"Call handled; tenancy and deposit details sent to the email on file. No open repair job. Legacy record flagged by note.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Email tenancy basics (periodic, 2 months' written notice) and deposit details to the address on file, and offer to update her phone number","recipient":"Priya Shah, tenant","channel":"email","ledger_id":"A1"},{"t…
   - Result: Decision recorded.

## Run
- Model turns: 2 · Tokens in/out: 6/2551 · Cost: $0.0361 · Duration: 19.0s
- Raw event trace: `trace.jsonl`
