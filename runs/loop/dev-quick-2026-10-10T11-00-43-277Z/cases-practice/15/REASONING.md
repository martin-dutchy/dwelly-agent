# Case 15: REASONING

## What the system received
- `inputs/call_transcript.txt` (390 chars)
- `inputs/caller_metadata.json` (35 chars)
- `inputs/crm.json` (762 chars)
- `inputs/fixflo_export.csv` (174 chars)

## Conflicts between sources
- CRM says tenant is Priya Shah (T-1003), active, phone +447700900103. Legacy Fixflo says P. Shah-Mehta, phone +447700900166, ended 2025-11-30. Trusted CRM (higher priority, current, consistent with DOB and tenancy start).
- Caller ID +447700900177 and her stated work phone match neither record. Treated as an unverified contact, not used for identity.

## Assumptions
- The legacy Fixflo row is a previous occupant of the same flat, not the same tenant under a different name.
- The 2026-01-10 tenancy start is the current tenancy and the deposit figure is current.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller said she is Priya Shah, tenan… | 1 | ✅ verified | CALL-101 found in the log_call log |
| A2 | `add_note` | {"entity":"P-203 Flat 9, 3 Amhurst Road","note":"Record conflict (case 15): legacy Fixflo export (imported 2026-03 from Amhurst Lettings acq… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Trace
1. **Tool call** `log_call` {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller said she is Priya Shah, tenant at Flat 9, 3 Amhurst Road (P-203). Gave DOB 21/07/1998, which matches CRM T-1003. Caller ID +447700900177 and her stated work phone do not match the CRM number (+447700900103). Asked when tenancy ends and the deposit amount, as she is thinking of moving. Ans…
2. **Tool call** `add_note` {"entity":"P-203 Flat 9, 3 Amhurst Road","note":"Record conflict (case 15): legacy Fixflo export (imported 2026-03 from Amhurst Lettings acquisition) lists Flat 9 tenant as \"P. Shah-Mehta\", +447700900166, ended, move-out 2025-11-30. CRM (dwelly_crm, highest priority) lists Priya Shah T-1003, active, tenancy start 2026-01-10, phone +447700900103. Treated CRM as authoritative; legacy row appears t…
   - Result: {"ok":true,"call_id":"CALL-101"}
[ledger A1, attempt 1] Verified: CALL-101 found in the log_call log.
   - Result: {"ok":true,"note_id":"NOTE-102"}
[ledger A2, attempt 1] Verified: NOTE-102 found in the add_note log.
3. **Tool call** `submit_decision` {"case_state":"Inbound call handled. Caller identifies as Priya Shah, tenant at P-203 (Flat 9, 3 Amhurst Road). Name and DOB match the CRM tenant record T-1003. Contact number does not match. No maintenance ticket involved. Contact-number discrepancy and legacy record conflict are noted for ops.","next_actions":[{"action":"Logged the inbound call and its outcome on the record.","type":"OTHER","rec…
   - Result: Decision recorded.

## Run
- Model turns: 2 · Tokens in/out: 6/3988 · Cost: $0.0027 · Duration: 19.3s
- Raw event trace: `trace.jsonl`
