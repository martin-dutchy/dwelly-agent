# Case 017: ANSWER

**Outcome:** action_taken · **Severity:** routine

Tenant reported a non-working kitchen extractor fan. The agency asked the landlord on 13 Sept whether to use their own or an agency contractor, and no landlord reply is on file. The only new message is the tenant's "Thank you!", which needs no action. No ticket existed, so I logged routine job JOB-101. No contractor has been assigned.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

It is a routine repair, still waiting on the landlord's choice of contractor and approval. The event 006 flag says a message arrived, but the only message is the tenant's thank-you. No ticket existed, so JOB-101 has now been logged at init stage. The tenant's photo is unavailable.

**2. What is the next action, who is it for, and through which channel?**

I logged JOB-101 (done). Next, chase the landlord by email for the contractor decision and approval, then assign a contractor once they reply. The tenant has already been told the landlord is being contacted, and the target is within 14 days. I did not send messages myself because no contact details are in the records.

**3. Does anything need a human decision, and why?**

No. This is routine and low risk. The landlord's decision on contractor and spend is the pending approval, and it is theirs to make. No escalation is needed unless the landlord stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"Flat 1, 31 Juniper Mews, Cedarford, ZZ7 7ZZ","category":"electrical","severity":"routine","description":"Kitchen extractor fan … | 1 | ✅ verified | Ticket JOB-101 read back at stage init |

## Escalations
_None._

## Failed or unverified actions
_None._
