# Case 008: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (6046 chars)
- `attachments/attachment-01-check-out-inspection-report.pdf` (16887 chars)
- `attachments/attachment-02-estimate.pdf` (1779 chars)
- `attachments/attachment-03-check-out-inspection-report.pdf` (13391 chars)

## Actions blocked by hard policy rules
- `request_information`: The message mentions Flat 18, 8 Alder Lane, Flat 3, 43 Willowmere Road, which is not the property on this job (Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ / Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ). Fix the address before sending.

## Injected tool failures (robustness test, --chaos)
```json
{"cancel_ticket":[{"call":1,"mode":"silent_drop"}],"put_on_hold":[{"call":1,"mode":"silent_drop"}],"record_landlord_decision":[{"call":2,"mode":"silent_drop"}],"record_invoice":[{"call":2,"mode":"error"}],"skip_document":[{"call":1,"mode":"timeout"}],"log_call":[{"call":2,"mode":"error"}],"schedule_follow_up":[{"call":1,"mode":"timeout"}],"approve_quote":[{"call":2,"mode":"timeout"}]}
```

## Conflicts between sources
- Landlord emails (events 021 and 023) name other properties, not Flat 5, 55 Lantern Quay
- £1,370 quote: attachment is from Alder Compliance, event 024 says Eliza Bennett
- Inspection report dated 5 Jan 2026 but signed April 2025
- Quote scope omits the carpet replacement requested and includes a tap replacement

## Assumptions
- Event 024 quotes relate to this property, pending landlord confirmation

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `add_note` | {"entity":"NBL-008-3466","note":"Events 021 and 023 name other addresses, not Flat 5, 55 Lantern Quay; not treated as approval. Quote £1,370… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A2 | `schedule_follow_up` | {"ticket_ref":"NBL-008-3466","due_on":"2025-05-09","party":"Langley, landlord","purpose":"Chase landlord on a second channel (SMS/phone) for… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A3 | `request_information` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 023 email)","questions":["Your l… | 1 | ✅ verified | REQ-103 found in the request_information log |

## Trace
1. **Tool call** `request_information` {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 023 email)","questions":["Your last email mentioned other addresses (Flat 18, 8 Alder Lane and Flat 3, 43 Willowmere Road), not Flat 5, 55 Lantern Quay. Did you mean to reply about Flat 5, 55 Lantern Quay?","For Flat 5, 55 Lantern Quay only: do you approve the £1,370.00 quote (no VAT shown; …
2. **Tool call** `add_note` {"entity":"NBL-008-3466","note":"Events 021 and 023 name other addresses, not Flat 5, 55 Lantern Quay; not treated as approval. Quote £1,370 attachment is from Alder Compliance, event 024 calls it Eliza Bennett: provider name to confirm. £1,370 scope omits carpet replacement. Inspection report dated 5 Jan 2026 but signed Apr 2025: date discrepancy. attachment-04-invoice not seen. Event 024 asked l…
3. **Tool call** `schedule_follow_up` {"ticket_ref":"NBL-008-3466","due_on":"2025-05-09","party":"Langley, landlord","purpose":"Chase landlord on a second channel (SMS/phone) for confirmed property and quote decision if no reply"}
   - ⚠️ Result: Blocked by policy: The message mentions Flat 18, 8 Alder Lane, Flat 3, 43 Willowmere Road, which is not the property on this job (Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ / Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ). Fix the address before sending.
   - Result: {"ok":true,"note_id":"NOTE-101"}
[ledger A1, attempt 1] Verified: NOTE-101 found in the add_note log.
   - Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: Request timed out after 10000ms"}
[ledger A2, attempt 1] The API reported an error, but read-back shows the change IS in place (FUP-102 found in the schedule_follow_up log). Do not retry.
4. **Tool call** `request_information` {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 023 email)","questions":["Your last email seems to be about other properties. Did you mean to reply about Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ?","For Flat 5, 55 Lantern Quay only: do you approve the £1,370.00 quote (no VAT shown), yes or no? The other quote is £1,700.00 + VAT.","The £…
   - Result: {"ok":true,"request_id":"REQ-103","status":"sent"}
[ledger A3, attempt 1] Verified: REQ-103 found in the request_information log.
5. **Tool call** `submit_decision` {"case_state":"Paused (property void). Quote loop: two quotes (£1,370.00; £1,700.00 + VAT) with landlord. Landlord's last reply names other properties, so no valid approval. Waiting on Langley; hold in place.","next_actions":[{"type":"REQUEST_INFORMATION","action":"Ask landlord to confirm the property, approve or decline the £1,370 quote, and say whether to add carpet replacement","recipient":"Lan…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/3102 · Cost: $0.0559 · Duration: 22.9s
- Raw event trace: `trace.jsonl`
