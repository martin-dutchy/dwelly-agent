# Case 008: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (6046 chars)
- `attachments/attachment-01-check-out-inspection-report.pdf` (16887 chars)
- `attachments/attachment-02-estimate.pdf` (1779 chars)
- `attachments/attachment-03-check-out-inspection-report.pdf` (13391 chars)

## Actions blocked by hard policy rules
- `send_message`: The message mentions Flat 18, 8 Alder Lane, Flat 3, 43 Willowmere Road, which is not the property on this job (Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ / Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ). Fix the address before sending.

## Conflicts between sources
- Events 021 and 023 name other properties than ZZ2 4ZZ
- Estimate attachment shows Alder Compliance; history names Eliza Bennett
- Inspection dated 5 Jan 2026 but signed 3 Apr 2025
- Estimate omits the carpet replacement and includes a tap replacement, unlike the request

## Assumptions
- The landlord's reply may have been about this property but this cannot be assumed

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `put_on_hold` | {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord reply (event 023) names other properties, so not usable. As… | 1 | ✅ verified | Ticket NBL-008-3466 read back after put_on_hold |
| A2 | `add_note` | {"entity":"NBL-008-3466","note":"Conflicts: events 021/023 name other addresses; estimate attachment-02 issued by Alder Compliance vs event … | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 023 email)","ticket_ref":"NBL-00… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Trace
1. **Tool call** `send_message` {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 023 email)","ticket_ref":"NBL-008-3466","body":"Hi Langley, thanks for your last email. It mentioned other properties (Flat 18, 8 Alder Lane and Flat 3, 43 Willowmere Road), so I can't treat it as an answer for Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ. Could you confirm which property you…
2. **Tool call** `put_on_hold` {"ticket_ref":"NBL-008-3466","reason":"Waiting for Landlord","comment":"Landlord reply (event 023) names other properties, so not usable. Asked which property and a yes/no on the £1,370 quote (scope omits carpet, includes tap).","review_on":"2025-05-09"}
3. **Tool call** `add_note` {"entity":"NBL-008-3466","note":"Conflicts: events 021/023 name other addresses; estimate attachment-02 issued by Alder Compliance vs event 024 naming Eliza Bennett; inspection dated 5 Jan 2026 but signed 3 Apr 2025; attachment-04 invoice not seen; event 024 asks about an unpaid previous invoice. No approval recorded, no contractor assigned. Property void, no tenant messages."}
   - ⚠️ Result: Blocked by policy: The message mentions Flat 18, 8 Alder Lane, Flat 3, 43 Willowmere Road, which is not the property on this job (Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ / Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ). Fix the address before sending.
   - Result: {"ok":true,"ticket_ref":"NBL-008-3466","hold":{"reason":"Waiting for Landlord","comment":"Landlord reply (event 023) names other properties, so not usable. Asked which property and a yes/no on the £1,370 quote (scope omits carpet, includes tap).","review_on":"2025-05-09"}}
[ledger A1, attempt 1] Verified: Ticket NBL-008-3466 read back after put_on_hold.
   - Result: {"ok":true,"note_id":"NOTE-101"}
[ledger A2, attempt 1] Verified: NOTE-101 found in the add_note log.
4. **Tool call** `send_message` {"recipient_name":"Langley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 023 email)","ticket_ref":"NBL-008-3466","body":"Hi Langley, thanks for your last email. It referred to other properties, so I can't treat it as an answer for Flat 5, 55 Lantern Quay, Cedarford, ZZ2 4ZZ. Could you confirm that your reply was about this property? For this flat the two quotes f…
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A3, attempt 1] Verified: MSG-102 found in the send_message log.
5. **Tool call** `submit_decision` {"case_state":"Paused, void property. Two quotes on file (£1,370.00 and £1,700.00 + VAT). No landlord approval recorded; no contractor assigned. Waiting on landlord; hold review 2025-05-09.","next_actions":[{"type":"REQUEST_LANDLORD_APPROVAL","action":"Ask landlord to confirm their last reply concerned this property and give a yes/no on the £1,370.00 quote, flagging the scope differences","recipie…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/3090 · Cost: $0.0562 · Duration: 21.9s
- Raw event trace: `trace.jsonl`
