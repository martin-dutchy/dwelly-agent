# Case 18: REASONING

## What the system received
- `inputs/crm.json` (917 chars)
- `inputs/email_tenant.eml` (321 chars)

## Conflicts between sources
_None identified._

## Assumptions
- Notice was served on the date of the email, 10 Oct 2026.
- Tenancy is an assured periodic tenancy converted 1 May 2026, per the CRM.
- Deposit of £2,019 is within the 5-week cap (£1,750 rent x 5 weeks ~ £2,019).

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_landlord_approval` | {"landlord":"Ben Hartley (L-01)","decision_needed":"Tenant Tom Achterberg (T-1050), Flat 2, 5 Navarino Road (P-250), has given one month's n… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `put_on_hold` | {"ticket_ref":"P-250","reason":"Waiting for Landlord","comment":"Tenant Tom Achterberg gave notice 10 Oct 2026 for 10 Nov 2026. Valid earlie… | 1 | ❌ failed | Ticket P-250 not found on read-back |
| A4 | `schedule_follow_up` | {"due_on":"2026-10-16","purpose":"Chase Ben Hartley (APR-102) for decision on early end of Tom Achterberg's tenancy (P-250, Flat 2, 5 Navari… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Trace
1. **Tool call** `send_message` {"recipient_name":"Tom Achterberg","recipient_role":"tenant","channel":"email","contact":"tom.a@mailbox.example","body":"Hi Tom,\n\nThanks for your email, and congratulations on the new job in Manchester.\n\nYour notice has been received. Since 1 May 2026, a tenant on a periodic tenancy needs to give at least two months' written notice. Based on today's date (10 October 2026), the earliest date yo…
2. **Tool call** `request_landlord_approval` {"landlord":"Ben Hartley (L-01)","decision_needed":"Tenant Tom Achterberg (T-1050), Flat 2, 5 Navarino Road (P-250), has given one month's notice on 10 Oct 2026 for a move-out on 10 Nov 2026. Under the Renters' Rights Act 2025 the earliest valid end date on two months' notice is 10 Dec 2026. Decide whether you agree in writing to end the tenancy early on 10 Nov 2026 (shorter notice).","options":["…
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"approval_id":"APR-102","status":"requested"}
[ledger A2, attempt 1] Verified: APR-102 found in the request_landlord_approval log.
3. **Tool call** `put_on_hold` {"ticket_ref":"P-250","reason":"Waiting for Landlord","comment":"Tenant Tom Achterberg gave notice 10 Oct 2026 for 10 Nov 2026. Valid earliest end is 10 Dec 2026. Waiting on Ben Hartley's written decision on early end (APR-102).","review_on":"2026-10-16"}
4. **Tool call** `submit_decision` {"case_state":"Tenant notice received by email 10 Oct 2026 for move-out 10 Nov 2026. Tenant informed of the valid earliest end date. Landlord decision on early end requested (APR-102) and job on hold until reply, review 16 Oct 2026.","next_actions":[{"action":"Tell tenant the earliest valid end date is 10 Dec 2026 and that the 10 Nov request has gone to the landlord; advise not to plan the move un…
   - ⚠️ Result: {"ok":false,"error":"not_found","say":"No ticket P-250. Use list_tickets."}
[ledger A3, attempt 1] NOT APPLIED: Ticket P-250 not found on read-back. Retry once if safe, otherwise escalate. Never tell anyone it was done.
   - ⚠️ Result: Decision rejected:
- A3 (put_on_hold) is failed: list it in failed_actions with how you handled it.
- WAIT must cite a schedule_follow_up or put_on_hold entry with a review date, not request_landlord_approval.
5. **Tool call** `schedule_follow_up` {"due_on":"2026-10-16","purpose":"Chase Ben Hartley (APR-102) for decision on early end of Tom Achterberg's tenancy (P-250, Flat 2, 5 Navarino Road). Requested 10 Nov 2026 end vs valid 10 Dec 2026. Confirm key return and deposit steps once agreed.","party":"Ben Hartley, landlord"}
   - Result: {"ok":true,"follow_up_id":"FUP-103"}
[ledger A4, attempt 1] Verified: FUP-103 found in the schedule_follow_up log.
6. **Tool call** `submit_decision` {"case_state":"Tenant notice received by email 10 Oct 2026 for move-out 10 Nov 2026. Tenant told the valid earliest end date is 10 Dec 2026. Landlord decision on early end requested (APR-102). No maintenance ticket exists for P-250, so the hold could not be placed; a dated follow-up (FUP-103) for 16 Oct 2026 is set instead.","next_actions":[{"action":"Told tenant the earliest valid end date is 10 …
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/5940 · Cost: $0.0042 · Duration: 26.3s
- Raw event trace: `trace.jsonl`
