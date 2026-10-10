# Case 024-bundled-issues: ANSWER

**Outcome:** escalated · **Severity:** routine

The oven job was closed with no visit evidence, and the tenant was told the fence and oven were fixed. The tenant has now asked about a conservatory roof leak that has no ticket. I asked the tenant for details and escalated the closure check to maintenance.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

The oven job is marked completed without payment, and Lantern Works was assigned. No visit or quote is on record. The tenant was told the oven and fence were fixed, but the fence was never logged and nothing confirms either repair. The conservatory roof leak is a new issue with no ticket and no earlier report on record. Outstanding: confirm the oven and fence, assess the leak and log it, and check the invoice.

**2. What is the next action, who is it for, and through which channel?**

Email to tenant Imogen Clarke (REQ-101) asking for details of the leak, whether the oven and fence are really sorted, and access times. Once she replies, log the conservatory ticket with the right severity and book a contractor.

**3. Does anything need a human decision, and why?**

A P3 maintenance check (ESC-102) is needed. The job was closed and the tenant told of fixes without evidence, and a possible unlogged issue needs reviewing. No spend approval is needed yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Imogen Clarke","recipient_role":"tenant","channel":"email","questions":["Conservatory roof: we can't find an earlier repo… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Case closed on oven and fence without evidence; tenant now reports an unlogged conservatory … | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Escalations
- **P3 → maintenance** (verified): Case closed on oven and fence without evidence; tenant now reports an unlogged conservatory roof leak
  - Known: Oven ticket: landlord approved contractor (ev 010), Lantern Works assigned (ev 011-013). No visit, quote or invoice details appear in the history. Ev 016 told tenant fence and oven were fixed. The tenant's fence query (ev 015) was never logged. The task was completed "without payment" (ev 030), with invoice notes pointing to Keystone Solutions. Ev 032: tenant asks about a leaking conservatory roof. No such report is in the history, and list_tickets shows no tickets.
  - Missing: Whether the oven was really repaired. Whether the fence was ever logged or fixed. Any earlier conservatory report. Leak severity. Whether Lantern Works or Keystone Solutions did the work, and whether the invoice was paid.
  - Options: Reopen oven job if tenant says not fixed; Log fence and conservatory roof tickets once tenant replies; Check invoice and payment status
  - Recommendation: Wait for the tenant's reply, then log the conservatory leak as urgent if water is entering near electrics or is worsening, otherwise routine. Verify the oven and fence outcome and the invoice before treating the case as closed.

## Failed or unverified actions
_None._
