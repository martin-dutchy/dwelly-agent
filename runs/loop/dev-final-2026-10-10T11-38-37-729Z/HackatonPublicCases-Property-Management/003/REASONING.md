# Case 003: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (4197 chars)
- `attachments/attachment-01-checkout-inspection-report.pdf` (17197 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"cancel_ticket":[{"call":2,"mode":"silent_drop"}],"record_landlord_decision":[{"call":2,"mode":"silent_drop"}],"close_ticket":[{"call":2,"mode":"silent_drop"}],"schedule_follow_up":[{"call":2,"mode":"timeout"}],"escalate_to_human":[{"call":1,"mode":"error"}]}
```

## Conflicts between sources
- The inspection report is dated 16 March 2026 but is signed 22 July 2025. The history is dated July 2025, so the report date looks wrong. I did not rely on it.

## Assumptions
- Bennett is the contractor assigned to the job.
- The estimate was approved internally (event 010).

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Plea… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `schedule_follow_up` | {"due_on":"2025-07-28","purpose":"Chase Bennett for readable invoice and completion confirmation; then record invoice, check against approve… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Trace
1. **Tool call** `get_ticket` {"ref":"NBL-003-2766"}
2. **Tool call** `get_property` {"property":"Flat 30, 30 Harbour View, Northbridge, ZZ9 0ZZ"}
   - Result: {"ok":true,"ticket":{"ref":"NBL-003-2766","stage":"documents","property":"Flat 30, 30 Harbour View, Northbridge, ZZ9 0ZZ","description":"Please provide an estimate to clean property as per check out to include the removal of dumped items left in the property and a carpet clean."}}
   - Result: {"ok":true,"property":{"address":"Flat 30, 30 Harbour View, Northbridge, ZZ9 0ZZ"}}
3. **Tool call** `request_information` {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Please resend your invoice for the checkout clean at Flat 30, 30 Harbour View as a PDF, showing the total including VAT and the company name.","Please confirm the date the work was completed and that it covered the clean, removal of dumped items and the carpet cle…
4. **Tool call** `schedule_follow_up` {"due_on":"2025-07-28","purpose":"Chase Bennett for readable invoice and completion confirmation; then record invoice, check against approved estimate, tell landlord, close.","ticket_ref":"NBL-003-2766","party":"Bennett (contractor)"}
   - Result: {"ok":true,"request_id":"REQ-101","status":"sent"}
[ledger A1, attempt 1] Verified: REQ-101 found in the request_information log.
   - Result: {"ok":true,"follow_up_id":"FUP-102"}
[ledger A2, attempt 1] Verified: FUP-102 found in the schedule_follow_up log.
5. **Tool call** `submit_decision` {"case_state":"Ticket at documents/final checks. Contractor says the invoice was sent (event 017). I can't read the invoice and no estimate figure is on record. Waiting on the contractor for a readable invoice.","next_actions":[{"type":"REQUEST_INFORMATION","action":"Ask the contractor to resend the invoice as a PDF with the total including VAT, and to confirm the completion date and scope","recip…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/2070 · Cost: $0.0385 · Duration: 15.3s
- Raw event trace: `trace.jsonl`
