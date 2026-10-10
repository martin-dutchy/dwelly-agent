# Case 15: REASONING

## What the system received
- `inputs/call_transcript.txt` (390 chars)
- `inputs/caller_metadata.json` (35 chars)
- `inputs/crm.json` (762 chars)
- `inputs/fixflo_export.csv` (174 chars)

## Conflicts between sources
- Legacy Fixflo row says Flat 9 'P. Shah-Mehta' tenancy ended 2025-11-30 with phone +447700900166; CRM says Priya Shah, active since 2026-01-10 with phone +447700900103. Trusted CRM (higher priority, current).
- Caller ID +447700900177 does not match any number on file; caller said it is a work phone. Treated as a hint only.
- Flat 8 row in the legacy export (K. Osei) is unrelated to this case.

## Assumptions
- The find_tenant and verify_identity tools named in policy are not available in this run; verification was done by comparing the stated name and DOB with the CRM record.
- The DPS deposit figure of £1,903 is taken from the CRM and was not checked against the scheme's own records.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"T-1003 Priya Shah / P-203 Flat 9, 3 Amhurst Road","note":"Record conflict (case 15, 2026-10-10): legacy Fixflo export (imported 2… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `send_message` | {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya,\n\nThank… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Trace
1. **Tool call** `add_note` {"entity":"T-1003 Priya Shah / P-203 Flat 9, 3 Amhurst Road","note":"Record conflict (case 15, 2026-10-10): legacy Fixflo export (imported 2026-03 from Amhurst Lettings acquisition, not maintained) lists Flat 9 as \"P. Shah-Mehta\", phone +447700900166, status ended, move_out 2025-11-30. Current CRM (dwelly_crm, highest priority) shows Priya Shah, T-1003, active, tenancy start 2026-01-10, phone +4…
2. **Tool call** `send_message` {"recipient_name":"Priya Shah","recipient_role":"tenant","channel":"email","contact":"priya.shah@mailbox.example","body":"Hi Priya,\n\nThanks for calling Mare and Co Lettings today. As promised, here is the information you asked about, sent to the email address we hold for you.\n\nYour tenancy at Flat 9, 3 Amhurst Road started on 10 January 2026. Since 1 May 2026, tenancies are periodic, so there …
   - Result: {"ok":true,"note_id":"NOTE-101"}
[ledger A1, attempt 1] Verified: NOTE-101 found in the add_note log.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
3. **Tool call** `submit_decision` {"outcome":"action_taken","severity":"n/a","summary":"The caller said she is Priya Shah of Flat 9, 3 Amhurst Road (P-203) and gave a DOB matching the current CRM record (T-1003, active tenant). I treated the CRM as authoritative, ignored the legacy Fixflo row (ended tenancy, different name and phone), and recorded the conflict. Tenancy and deposit facts were sent by email to the address on file, n…
   - Result: Decision recorded.

## Run
- Model turns: 2 · Tokens in/out: 6/3240 · Cost: $0.0029 · Duration: 16.3s
- Raw event trace: `trace.jsonl`
