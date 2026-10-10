# Case 15: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- Case brief (677 chars)
- `inputs/call_transcript.txt` (390 chars)
- `inputs/caller_metadata.json` (35 chars)
- `inputs/crm.json` (762 chars)
- `inputs/fixflo_export.csv` (174 chars)

## Conflicts between sources
- Legacy Fixflo shows Flat 9 tenant P. Shah-Mehta (+447700900166, ended 2025-11-30) versus CRM Priya Shah (active, started 2026-01-10): trusted CRM.
- Caller ID +447700900177 matches neither the CRM phone (+447700900103) nor the legacy phone; the caller said it was her work phone and identity rests on name and DOB.

## Assumptions
- Name plus DOB matching the CRM is sufficient verification; the identity verification tool was not available, so I applied this standard by hand.
- The legacy record is a previous occupant, not the current tenant.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `log_call` | {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller gave name Priya Shah and DOB … | 1 | ✅ verified | CALL-101 found in the log_call log |
| A2 | `add_note` | {"entity":"P-203","note":"Record conflict: legacy Fixflo export (Amhurst Lettings, imported 2026-03, unmaintained) lists Flat 9 tenant 'P. S… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Trace
1. **Tool call** `log_call` {"party_name":"Priya Shah","party_role":"tenant","direction":"inbound","outcome":"connected","summary":"Caller gave name Priya Shah and DOB 21 July 1998, matching CRM T-1003 (P-203). Caller ID +447700900177 matches no number on file; she said it is her work phone. Asked when tenancy ends and deposit held, as she is thinking of moving. Legacy Fixflo shows a different ended tenant for Flat 9; CRM tr…
   - `log_call` result: {"ok":true,"call_id":"CALL-101"}
[ledger A1, attempt 1] Verified: CALL-101 found in the log_call log.
2. **Tool call** `add_note` {"entity":"P-203","note":"Record conflict: legacy Fixflo export (Amhurst Lettings, imported 2026-03, unmaintained) lists Flat 9 tenant 'P. Shah-Mehta' +447700900166, ended, move-out 2025-11-30. Current CRM shows Priya Shah (T-1003), active, tenancy start 2026-01-10. CRM prioritised per source_priority. Legacy row appears to be a previous occupant; recommend cleaning up the legacy data. Caller phon…
   - `add_note` result: {"ok":true,"note_id":"NOTE-102"}
[ledger A2, attempt 1] Verified: NOTE-102 found in the add_note log.
3. **Tool call** `submit_decision` {"case_state":"Call handled. No repair ticket involved. Records conflict noted on P-203. Nothing outstanding with the caller beyond her deciding whether to give notice.","next_actions":[{"type":"OTHER","action":"Logged the call and added a note on P-203 about the stale legacy Fixflo row for data cleanup","recipient":"internal","channel":"internal","ledger_id":"A2"}],"boundaries":["No bank, phone o…
   - `submit_decision` result: Decision recorded.

## Run
- Model turns: 2 · Tokens in/out: 6/2475 · Cost: $0.0380 · Duration: 18.6s
- Raw event trace: `trace.jsonl`
