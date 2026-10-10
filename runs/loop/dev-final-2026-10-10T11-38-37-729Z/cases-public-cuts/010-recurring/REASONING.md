# Case 010-recurring: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (2813 chars)
- `attachments/attachment-01-photograph-of-a-solar-photovoltaic-generation-me.pdf` (987 chars)

## Injected tool failures (robustness test, --chaos)
```json
{"resume_auto":[{"call":1,"mode":"timeout"}],"set_visit":[{"call":2,"mode":"error"}],"record_work_result":[{"call":1,"mode":"silent_drop"}],"record_invoice":[{"call":1,"mode":"timeout"}],"close_ticket":[{"call":2,"mode":"timeout"}],"request_information":[{"call":2,"mode":"error"}],"request_landlord_approval":[{"call":2,"mode":"error"}],"hold_payment":[{"call":1,"mode":"timeout"}]}
```

## Conflicts between sources
- The original note said the next reading is due mid June, but the landlord's latest message says 15 September. I trusted the landlord's most recent statement.

## Assumptions
- The attached PDF is the photo the tenant supplied, and the 15 September date applies to this property.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `schedule_follow_up` | {"due_on":"2025-09-08","purpose":"Ask tenant (Flat 10, 180 Alder Lane) for a clear photo of the solar panel meter reading, so it can be sent… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |
| A3 | `add_note` | {"entity":"Flat 10, 180 Alder Lane, Cedarford, ZZ3 4ZZ","note":"Solar reading sent to landlord 17 Jan 2025 (meter display appears to read 16… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Trace
1. **Tool call** `send_message` {"recipient_name":"Ava","recipient_role":"landlord","channel":"email","contact":"existing thread (event 015 email)","body":"Hello Ava, thank you. We have noted that you next need the solar panel reading for Flat 10, 180 Alder Lane on 15 September. We will ask the tenant for a clear photo ahead of that date and send it to you. Kind regards, Northbridge Lettings"}
2. **Tool call** `schedule_follow_up` {"due_on":"2025-09-08","purpose":"Ask tenant (Flat 10, 180 Alder Lane) for a clear photo of the solar panel meter reading, so it can be sent to the landlord by 15 September. Re-check the landlord's schedule with them afterwards.","party":"Tenant"}
3. **Tool call** `add_note` {"entity":"Flat 10, 180 Alder Lane, Cedarford, ZZ3 4ZZ","note":"Solar reading sent to landlord 17 Jan 2025 (meter display appears to read 16845). Landlord (event 015) says next needed 15 September; this replaces the older \"mid June\" note. Tenant's event 012 email showed no attachment, so the photo's source is not visible in the history. Event 008 mentions a caller from Oakfield Compliance, whose…
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"follow_up_id":"FUP-102"}
[ledger A2, attempt 1] Verified: FUP-102 found in the schedule_follow_up log.
   - Result: {"ok":true,"note_id":"NOTE-103"}
[ledger A3, attempt 1] Verified: NOTE-103 found in the add_note log.
4. **Tool call** `submit_decision` {"case_state":"Current reading sent to landlord on 17 Jan 2025; landlord replied that the next reading is needed 15 September. The job stays open as a recurring task; follow-up set for 8 Sept 2025.","next_actions":[{"type":"REPLY_TO_LANDLORD","action":"x","recipient":"x","channel":"email"}],"boundaries":["Acknowledging the date does not confirm the tenant will supply future photos.","The reading f…
   - ⚠️ Result: Validation failed for tool "submit_decision":
  - next_actions.0.type: must be equal to one of the allowed values

Received arguments:
{
  "case_state": "Current reading sent to landlord on 17 Jan 2025; landlord replied that the next reading is needed 15 September. The job stays open as a recurring task; follow-up set for 8 Sept 2025.",
  "next_actions": [
    {
      "type": "REPLY_TO_LANDLORD",
…
5. **Tool call** `submit_decision` {"case_state":"Current reading sent to landlord on 17 Jan 2025; landlord replied that the next reading is needed 15 September. The job stays open as a recurring task; follow-up set for 8 Sept 2025.","next_actions":[{"type":"OTHER","action":"Acknowledge to the landlord that the next reading is needed 15 September","recipient":"Ava, landlord","channel":"email","ledger_id":"A1"},{"type":"WAIT","actio…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/3365 · Cost: $0.0547 · Duration: 22.1s
- Raw event trace: `trace.jsonl`
