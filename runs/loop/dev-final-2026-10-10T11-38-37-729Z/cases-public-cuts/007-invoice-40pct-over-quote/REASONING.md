# Case 007-invoice-40pct-over-quote: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (7536 chars)
- `attachments/attachment-01-check-out-inspection-report.pdf` (10918 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"update_ticket":[{"call":2,"mode":"error"}],"cancel_ticket":[{"call":2,"mode":"error"}],"attach_document":[{"call":1,"mode":"silent_drop"}],"log_call":[{"call":1,"mode":"error"}],"schedule_follow_up":[{"call":1,"mode":"silent_drop"}],"send_message":[{"call":1,"mode":"timeout"}],"request_information":[{"call":1,"mode":"silent_drop"}],"hold_payment":[{"call":2,"mode":"error"}],"update_bank_details":[{"call":1,"mode":"timeout"}]}
```

## Conflicts between sources
- record_invoice returned 'matches the approval' with no flags, but the invoice is £333.26 inc VAT against a £198.37 + VAT quote. I trusted the documents and held payment.
- The provider's emails say 'studio' but the property is Flat 8.
- The check-out report is dated 25 August 2026 but was signed 27 September 2025.

## Assumptions
- The landlord's 'Pls go ahead' covers only the £198.37 + VAT quote.
- The invoice is payable by the agency.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor, invoice no. 2311)","amount_gbp":333.26,"who_pays":"agency","source":"Provider ema… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor) invoice 2311, NBL-007-0235","reason":"Invoice £277.72 + VAT is about 40% above the approved quote of £198.37 +… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `request_information` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","questions":["Your … | 2 | ✅ verified | REQ-105 found in the request_information log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke","purpose":"Check provider's explanation of invoice 2311 over quote; if u… | 2 | ✅ verified | FUP-106 found in the schedule_follow_up log |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-007-0235","reason":"Waiting for Provider","comment":"Awaiting explanation of invoice 2311 (£277.72 + VAT vs approved £198… | 1 | ✅ verified | Ticket NBL-007-0235 read back after put_on_hold |

## Trace
1. **Tool call** `record_invoice` {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor, invoice no. 2311)","amount_gbp":333.26,"who_pays":"agency","source":"Provider email 2025-10-08 (event 031): £277.72 + VAT, £333.26 inc VAT; quote was £198.37 + VAT","invoice_date":"2025-10-08"}
2. **Tool call** `hold_payment` {"payee":"Clarke (contractor) invoice 2311, NBL-007-0235","reason":"Invoice £277.72 + VAT is about 40% above the approved quote of £198.37 + VAT; no variation approved by the landlord."}
   - Result: {"ok":true,"ticket_ref":"NBL-007-0235","flags":[],"say":"Invoice matches the approval."}
[ledger A1, attempt 1] Verified: Ticket NBL-007-0235 read back after record_invoice.
   - Result: {"ok":true,"hold_id":"HOLD-101"}
[ledger A2, attempt 1] Verified: HOLD-101 found in the hold_payment log.
3. **Tool call** `request_information` {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","questions":["Your invoice 2311 is £277.72 + VAT against the approved quote of £198.37 + VAT. Please explain the difference line by line, and say whether extra work was done beyond two spotlights and one ceiling board.","Please send the invoice as a PDF and the photos of the com…
4. **Tool call** `send_message` {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-007-0235","body":"Hello, an update on the lounge works at Flat 8, 168 Alder Lane. Clarke says the two spotlights and ceiling board are replaced. However, his invoice is £277.72 + VAT (£333.26 inc VAT), compared with the £198.37 + VAT quote you approved. We have…
5. **Tool call** `schedule_follow_up` {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke","purpose":"Check provider's explanation of invoice 2311 over quote; if unresolved, escalate to accounts (P2)."}
6. **Tool call** `put_on_hold` {"ticket_ref":"NBL-007-0235","reason":"Waiting for Provider","comment":"Awaiting explanation of invoice 2311 (£277.72 + VAT vs approved £198.37 + VAT), PDF invoice and photos.","review_on":"2025-10-10"}
   - ⚠️ Result: {"ok":true,"request_id":"REQ-102","status":"sent"}
[ledger A3, attempt 1] NOT APPLIED: REQ-102 was returned but is not in the request_information log. Retry once if safe, otherwise escalate. Never tell anyone it was done.
   - Result: {"ok":false,"error":"tool_failed","say":"The system is not responding. Escalate to a human.","details":"Error: Request timed out after 10000ms"}
[ledger A4, attempt 1] The API reported an error, but read-back shows the change IS in place (MSG-103 found in the send_message log). Do not retry.
   - ⚠️ Result: {"ok":true,"follow_up_id":"FUP-104"}
[ledger A5, attempt 1] NOT APPLIED: FUP-104 was returned but is not in the schedule_follow_up log. Retry once if safe, otherwise escalate. Never tell anyone it was done.
   - Result: {"ok":true,"ticket_ref":"NBL-007-0235","hold":{"reason":"Waiting for Provider","comment":"Awaiting explanation of invoice 2311 (£277.72 + VAT vs approved £198.37 + VAT), PDF invoice and photos.","review_on":"2025-10-10"}}
[ledger A6, attempt 1] Verified: Ticket NBL-007-0235 read back after put_on_hold.
7. **Agent:** Retry the two unapplied ones once.
8. **Tool call** `request_information` {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","questions":["Your invoice 2311 is £277.72 + VAT against the approved quote of £198.37 + VAT. Please explain the difference line by line, and say whether extra work was done beyond two spotlights and one ceiling board.","Please send the invoice as a PDF and the photos of the com…
9. **Tool call** `schedule_follow_up` {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke","purpose":"Check provider's explanation of invoice 2311 over quote; if unresolved, escalate to accounts (P2)."}
   - Result: {"ok":true,"request_id":"REQ-105","status":"sent"}
[ledger A3, attempt 2] Verified: REQ-105 found in the request_information log.
   - Result: {"ok":true,"follow_up_id":"FUP-106"}
[ledger A5, attempt 2] Verified: FUP-106 found in the schedule_follow_up log.
10. **Tool call** `submit_decision` {"case_state":"Works reported done by Clarke (event 031) on a void property. Invoice 2311 (£277.72 + VAT, £333.26 inc) is about 40% above the approved £198.37 + VAT quote. Payment held (HOLD-101). Waiting on provider for an explanation, PDF invoice and photos; review 2025-10-10. Job not closed.","next_actions":[{"type":"REQUEST_INFORMATION","action":"Ask Clarke to explain the invoice difference li…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/4070 · Cost: $0.0702 · Duration: 27.0s
- Raw event trace: `trace.jsonl`
