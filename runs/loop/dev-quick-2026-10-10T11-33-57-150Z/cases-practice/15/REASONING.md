# Case 15: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `inputs/call_transcript.txt` (390 chars)
- `inputs/caller_metadata.json` (35 chars)
- `inputs/crm.json` (762 chars)
- `inputs/fixflo_export.csv` (174 chars)

## Conflicts between sources
- Legacy Fixflo lists 'P. Shah-Mehta' at +447700900166, status ended, move-out 2025-11-30; CRM lists Priya Shah, active since 2026-01-10. Trusted CRM (current, priority source).
- Caller ID +447700900177 matches neither CRM (+447700900103) nor legacy (+447700900166). Caller says it is a work phone. Trusted DOB/name match, flagged the number.

## Assumptions
- The caller on the phone is the same person as the CRM tenant, based on name and DOB only; no further proof was available.
- The legacy entry relates to a different or former occupant of the same flat, since the name and phone differ.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller said she is Priya Shah, tenan… | 1 | ✅ verified | CALL-101 found in the log_call log |
| A2 | `add_note` | {"entity":"3 Amhurst Road, Flat 9 (P-203) legacy Fixflo record","note":"Conflict: legacy Fixflo export lists \"P. Shah-Mehta\", +44770090016… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `add_note` | {"entity":"Tenant T-1003 Priya Shah","note":"Inbound call 2026-10-10 from +447700900177 (described as work phone). Not the phone on file (+4… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Trace
1. **Tool call** `log_call` {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller said she is Priya Shah, tenant at Flat 9, 3 Amhurst Road (P-203). Gave DOB 21 July 1998, which matches the CRM record (T-1003). Caller ID +447700900177 matches neither the CRM phone (+447700900103) nor the legacy Fixflo entry; caller says she is on a work phone. Asked when the tenancy end…
2. **Tool call** `add_note` {"entity":"3 Amhurst Road, Flat 9 (P-203) legacy Fixflo record","note":"Conflict: legacy Fixflo export lists \"P. Shah-Mehta\", +447700900166, status ended, move-out 2025-11-30. Current CRM (dwelly_crm, T-1003) lists Priya Shah, active tenant since 2026-01-10, deposit £1,903 DPS. CRM is the authoritative source; legacy entry is not maintained (Amhurst Lettings import). Do not use the legacy record…
3. **Tool call** `add_note` {"entity":"Tenant T-1003 Priya Shah","note":"Inbound call 2026-10-10 from +447700900177 (described as work phone). Not the phone on file (+447700900103). Name and DOB matched; general tenancy and deposit information given. Confirm the preferred contact number at the next contact before using it for any contact or change."}
   - Result: {"ok":true,"call_id":"CALL-101"}
[ledger A1, attempt 1] Verified: CALL-101 found in the log_call log.
   - Result: {"ok":true,"note_id":"NOTE-102"}
[ledger A2, attempt 1] Verified: NOTE-102 found in the add_note log.
   - Result: {"ok":true,"note_id":"NOTE-103"}
[ledger A3, attempt 1] Verified: NOTE-103 found in the add_note log.
4. **Tool call** `submit_decision` {"case_state":"Inbound phone enquiry, no maintenance job. Caller identified by name and DOB as tenant Priya Shah (T-1003, P-203). General tenancy and deposit questions answered. Conflicting legacy record and unmatched phone number recorded for correction.","next_actions":[{"action":"Log the inbound call and record the identity basis (name and DOB match CRM; caller ID not matched).","type":"OTHER",…
   - Result: Decision recorded.

## Run
- Model turns: 2 · Tokens in/out: 6/3539 · Cost: $0.0025 · Duration: 17.8s
- Raw event trace: `trace.jsonl`
