# Case 024-gas-smell-in-routine-report: REASONING

Toolset: local mock environment (no organiser API configured).

## What the system received
- `history.md` (1810 chars)

## Conflicts between sources
- Tenant calls the gas smell 'not urgent', but policy treats any gas smell as an emergency; I followed policy.

## Assumptions
- The 'gassy smell' means possible gas and is not dismissed as cooking odour.

## Action ledger (every state change, read back after execution)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant (Imogen) reports a… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `send_message` | {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-g… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `escalate_to_human` | {"priority":"P1","team":"maintenance","reason":"Suspected gas leak reported by tenant alongside oven fault","known":"Tenant Imogen (event 00… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-024-gas-smell-in-routine-report","reason":"Other","comment":"Oven fault job paused until the gas safety check (JOB-101) i… | 1 | ✅ verified | Ticket NBL-024-gas-smell-in-routine-report read back after put_on_hold |

## Trace
1. **Agent:** Gas smell is an emergency per policy, even though the tenant says "not urgent". I'll check the property and tickets first.
2. **Tool call** `list_tickets` {}
3. **Tool call** `get_property` {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ"}
   - Result: {"ok":true,"tickets":[{"ref":"NBL-024-gas-smell-in-routine-report","stage":"init","property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","description":"Oven not/cooking warming food\n\nFor reference it takes more than double the amount of time to cook anything than usual\nE.g. nuggets or chips still uncooked after 1.30hrs"}]}
   - Result: {"ok":true,"property":{"address":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ"}}
4. **Tool call** `create_ticket` {"property":"Flat 6, 56 Juniper Mews, Northbridge, ZZ1 0ZZ","category":"gas","severity":"emergency","description":"Tenant (Imogen) reports an intermittent gassy smell near the oven/cooker. Treat as suspected gas leak. Separate from oven-not-heating job.","related_ticket_ref":"NBL-024-gas-smell-in-routine-report"}
5. **Tool call** `send_message` {"recipient_name":"Imogen","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-024-gas-smell-in-routine-report","body":"Hi Imogen, thanks for telling us. Please treat the gas smell seriously. Please don't use the oven or hob, don't use any switches or flames, open the windows, and leave the property. Then call the National Gas Emergency line …
   - Result: {"ok":true,"ref":"JOB-101","stage":"init"}
[ledger A1, attempt 1] Verified: Ticket JOB-101 read back at stage init.
   - Result: {"ok":true,"message_id":"MSG-102","status":"sent"}
[ledger A2, attempt 1] Verified: MSG-102 found in the send_message log.
6. **Tool call** `escalate_to_human` {"priority":"P1","team":"maintenance","reason":"Suspected gas leak reported by tenant alongside oven fault","known":"Tenant Imogen (event 006, 2026-08-05) reports a gassy smell near the oven sometimes, and that the oven still does not cook after following the landlord's suggested settings. Emergency ticket JOB-101 opened, linked to NBL-024. Tenant told to leave, avoid switches and flames, and call…
7. **Tool call** `put_on_hold` {"ticket_ref":"NBL-024-gas-smell-in-routine-report","reason":"Other","comment":"Oven fault job paused until the gas safety check (JOB-101) is done; then landlord approval and provider selection.","review_on":"2026-08-06"}
   - Result: {"ok":true,"escalation_id":"ESC-103"}
[ledger A3, attempt 1] Verified: ESC-103 found in the escalate_to_human log.
   - Result: {"ok":true,"ticket_ref":"NBL-024-gas-smell-in-routine-report","hold":{"reason":"Other","comment":"Oven fault job paused until the gas safety check (JOB-101) is done; then landlord approval and provider selection.","review_on":"2026-08-06"}}
[ledger A4, attempt 1] Verified: Ticket NBL-024-gas-smell-in-routine-report read back after put_on_hold.
8. **Tool call** `submit_decision` {"case_state":"Oven job at intake, no provider or landlord decision, now on hold to 2026-08-06. Emergency gas job JOB-101 opened and escalated P1 (ESC-103). Tenant given safety advice.","next_actions":[{"type":"REPLY_TO_TENANT","action":"Gas safety advice: leave, no switches or flames, call 0800 111 999, 999 if in danger","recipient":"Imogen, tenant","channel":"email","ledger_id":"A2"},{"type":"ES…
   - Result: Decision recorded.

## Run
- Model turns: 4 · Tokens in/out: 10/2755 · Cost: $0.0485 · Duration: 20.4s
- Raw event trace: `trace.jsonl`
