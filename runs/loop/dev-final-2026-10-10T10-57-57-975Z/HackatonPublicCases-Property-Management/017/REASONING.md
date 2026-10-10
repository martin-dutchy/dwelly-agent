# Case 017: REASONING

## What the system received
- `history.md` (2137 chars)

## Conflicts between sources
- Tenant's 'Thank you!' (event 007) was auto-flagged as a response needing review but contains no substantive info.

## Assumptions
- Landlord's message is a troubleshooting tip, not a repair approval or refusal
- Tenant email is reachable via the existing thread

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says fan has a separate switch right of hob. Waiting for tenant to… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-017","due_on":"2026-09-18","party":"Clara, tenant","purpose":"Chase tenant on whether the hob-side switch fixed the extra… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Trace
1. **Tool call** `list_tickets` {}
2. **Tool call** `get_property` {"property":"Flat 1, 31 Juniper Mews, Cedarford, ZZ7 7ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-017","stage":"init","property":"Flat 1, 31 Juniper Mews, Cedarford, ZZ7 7ZZ","description":"Extractor fan in kitchen does not seem to work (turn on). May be a simple technician fix. Thank you","landlord_approval":"required"}]}
   - Result: {"ok":true,"property":{"address":"Flat 1, 31 Juniper Mews, Cedarford, ZZ7 7ZZ"}}
3. **Tool call** `send_message` {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","body":"Hi Clara, the landlord has replied about the extractor fan. They say there is a separate switch to the right of the hob that needs to be switched on for the fan to work. Could you please try that and let us know if the fan starts? If it still doesn't wo…
4. **Tool call** `put_on_hold` {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says fan has a separate switch right of hob. Waiting for tenant to confirm whether fan works.","review_on":"2026-09-18"}
5. **Tool call** `schedule_follow_up` {"ticket_ref":"NBL-017","due_on":"2026-09-18","party":"Clara, tenant","purpose":"Chase tenant on whether the hob-side switch fixed the extractor fan; if not, return to landlord approval/contractor."}
   - Result: {"ok":true,"message_id":"MSG-101","status":"sent"}
[ledger A1, attempt 1] Verified: MSG-101 found in the send_message log.
   - Result: {"ok":true,"ticket_ref":"NBL-017","hold":{"reason":"Waiting for Tenant","comment":"Landlord says fan has a separate switch right of hob. Waiting for tenant to confirm whether fan works.","review_on":"2026-09-18"}}
[ledger A2, attempt 1] Verified: Ticket NBL-017 read back after put_on_hold.
   - Result: {"ok":true,"follow_up_id":"FUP-102"}
[ledger A3, attempt 1] Verified: FUP-102 found in the schedule_follow_up log.
6. **Tool call** `submit_decision` {"case_state":"Ticket NBL-017 at init, on hold waiting for tenant. Landlord has not approved a contractor or spend; they suggested a hob-side switch may be off. Tenant asked to try it and confirm.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Pass on landlord's tip (switch right of hob) and ask Clara to confirm whether the fan works; routine target 14 days if not","recipient":"Clara, tenant…
   - Result: Decision recorded.

## Run
- Model turns: 3 · Tokens in/out: 8/2160 · Cost: $0.0631 · Duration: 16.7s
- Raw event trace: `trace.jsonl`
