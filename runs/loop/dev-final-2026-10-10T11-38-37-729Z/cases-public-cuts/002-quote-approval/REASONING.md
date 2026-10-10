# Case 002-quote-approval: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (5931 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"update_ticket":[{"call":1,"mode":"silent_drop"}],"assign_contractor":[{"call":1,"mode":"timeout"}],"resume_auto":[{"call":1,"mode":"silent_drop"}],"set_visit":[{"call":1,"mode":"timeout"}],"record_quote":[{"call":2,"mode":"error"}],"attach_document":[{"call":2,"mode":"error"}],"confirm_keys_returned":[{"call":2,"mode":"silent_drop"}],"log_call":[{"call":2,"mode":"error"}],"request_landlord_approval":[{"call":2,"mode":"silent_drop"}],"approve_quote":[{"call":1,"mode":"error"}],"escalate_to_human":[{"call":1,"mode":"error"}]}
```

## Conflicts between sources
- Appointment date: the call summary (event 009) says the next day (09/08), while the system and emails say 08/08 with 'tomorrow'. The provider attended, so the visit is not in dispute; the date was not otherwise resolved.

## Assumptions
- Tenant mobile on file is suitable for SMS
- Landlord was reached by the event 017 email, so no duplicate request was sent

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"sms","contact":"07700 900422","body":"Hello Noah, Northbridge Lettings … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord 12/08 (event 017); awaiting approva… | 1 | ✅ verified | Ticket NBL-002-quote-approval read back after put_on_hold |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-002-quote-approval","due_on":"2026-08-13","party":"Landlord","purpose":"Chase landlord for quote decision (urgent: blocke… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A4 | `request_information` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions… | 1 | ✅ verified | REQ-103 found in the request_information log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-002-quote-approval","stage":"visit","property":"Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ","description":"Toilet need to be removed to clear blockage. Run block lodged by pan connector.","landlord_approval":"confirmed"}]}
   - Result: {"ok":true,"property":{"address":"Flat 3, 15 Willowmere Road, Alderwick, ZZ3 2ZZ"}}
3. **Tool call** `request_information` {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions":["Thanks for attending. The quote and photos did not come through on our side. Please resend the quote as a PDF or plain-text reply, stating the total, whether it includes VAT, and the items covered (new toilet and cistern, repiping).","Please also give your…
4. **Tool call** `send_message` {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"sms","contact":"07700 900422","body":"Hello Noah, Northbridge Lettings here. Riverside Works have visited about your blocked toilet and say it needs replacing. We've sent their quote to your landlord for approval and will update you once we have an answer. We can't give a date until it's approved. If the toilet is your only one, …
5. **Tool call** `put_on_hold` {"ticket_ref":"NBL-002-quote-approval","reason":"Waiting for Landlord","comment":"Quote sent to landlord 12/08 (event 017); awaiting approval. Quote amount not yet seen; provider asked to resend.","review_on":"2026-08-13"}
6. **Tool call** `schedule_follow_up` {"ticket_ref":"NBL-002-quote-approval","due_on":"2026-08-13","party":"Landlord","purpose":"Chase landlord for quote decision (urgent: blocked toilet); if none, chase on second channel."}
   - ⚠️ Result: Validation failed for tool "request_information":
  - ticket_ref: schema is false
  - root: must not have additional properties

Received arguments:
{
  "recipient_name": "Riverside Works",
  "recipient_role": "contractor",
  "channel": "email",
  "contact": "existing thread (event 016 email)",
  "questions": [
    "Thanks for attending. The quote and photos did not come through on our side. Pleas…
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"ticket_ref":"NBL-002-quote-approval","hold":{"reason":"Waiting for Landlord","comment":"Quote sent to landlord 12/08 (event 017); awaiting approval. Quote amount not yet seen; provider asked to resend.","review_on":"2026-08-13"}}
[ledger A2, attempt 1] Verified: Ticket NBL-002-quote-approval read back after put_on_hold.
   - Result: {"ok":true,"follow_up_id":"FUP-102"}
[ledger A3, attempt 1] Verified: FUP-102 found in the schedule_follow_up log.
7. **Agent:** Retry the provider request without ticket_ref.
8. **Tool call** `request_information` {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","questions":["Thanks for attending (ref NBL-002-quote-approval). The quote and photos did not come through on our side. Please resend the quote as a PDF or plain-text reply, stating the total, whether it includes VAT, and the items covered.","Please also give your estim…
   - Result: {"ok":true,"request_id":"REQ-103","status":"sent"}
[ledger A4, attempt 1] Verified: REQ-103 found in the request_information log.
9. **Tool call** `submit_decision` {"case_state":"Stage: visit done, quote sent to landlord (event 017) and awaiting approval. Job on hold for landlord, review 2026-08-13. Quote amount not seen (attachments unavailable); provider asked to resend.","next_actions":[{"type":"WAIT","action":"Wait for landlord decision on the quote; chase on a second channel on 2026-08-13 if no reply","recipient":"Quinn, landlord","channel":"internal","…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/3120 · Cost: $0.0551 · Duration: 24.2s
- Raw event trace: `trace.jsonl`
