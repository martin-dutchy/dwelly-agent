# Case 003: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (4197 chars)
- `attachments/attachment-01-checkout-inspection-report.pdf` (17197 chars)

## Conflicts between sources
- Inspection report is dated 16 March 2026 and signed 22 July 2025, which is inconsistent with the case dates; it was treated as context only.

## Assumptions
- The 'Estimate approved' note reflects an agency decision, but it is not a recorded landlord decision.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Plea… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-003-2766","reason":"Waiting for Provider","comment":"Waiting for readable invoice (PDF with total, company, date) and con… | 1 | ✅ verified | Ticket NBL-003-2766 read back after put_on_hold |

## Trace
1. **Tool call** `get_ticket` {"ref":"NBL-003-2766"}
2. **Tool call** `get_property` {"property":"Flat 30, 30 Harbour View, Northbridge, ZZ9 0ZZ"}
   - Result: {"ok":true,"ticket":{"ref":"NBL-003-2766","stage":"documents","property":"Flat 30, 30 Harbour View, Northbridge, ZZ9 0ZZ","description":"Please provide an estimate to clean property as per check out to include the removal of dumped items left in the property and a carpet clean."}}
   - Result: {"ok":true,"property":{"address":"Flat 30, 30 Harbour View, Northbridge, ZZ9 0ZZ"}}
3. **Tool call** `request_information` {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Please resend your invoice for the checkout clean, dumped-item removal and carpet clean at Flat 30, 30 Harbour View as a PDF to this thread, showing the company name, invoice date and total including VAT.","Please confirm the estimate figure you gave, so we can ch…
4. **Tool call** `put_on_hold` {"ticket_ref":"NBL-003-2766","reason":"Waiting for Provider","comment":"Waiting for readable invoice (PDF with total, company, date) and confirmation of estimate figure before final checks.","review_on":"2025-07-28"}
   - Result: {"ok":true,"request_id":"REQ-101","status":"sent"}
[ledger A1, attempt 1] Verified: REQ-101 found in the request_information log.
   - Result: {"ok":true,"ticket_ref":"NBL-003-2766","hold":{"reason":"Waiting for Provider","comment":"Waiting for readable invoice (PDF with total, company, date) and confirmation of estimate figure before final checks.","review_on":"2025-07-28"}}
[ledger A2, attempt 1] Verified: Ticket NBL-003-2766 read back after put_on_hold.
5. **Tool call** `submit_decision` {"case_state":"Final checks stage (documents). Job marked completed 24 Jul. Invoice reportedly sent by provider but its amount and issuer are not visible to me; no estimate figure in the record. On hold, waiting for provider, review 2025-07-28.","next_actions":[{"type":"REQUEST_INFORMATION","action":"Ask the provider to resend the invoice as a PDF with total, company and date, and confirm the esti…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/2044 · Cost: $0.0384 · Duration: 15.3s
- Raw event trace: `trace.jsonl`
