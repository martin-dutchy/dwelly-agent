# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's reply (2026-09-15) says the extractor fan's switch on the right-hand side of the hob needs turning on, so the job was recorded as a tenant self-fix. The tenant was emailed with that instruction and asked to reply if the fan still does not work; the ticket is on hold until 2026-09-18.

## Where the case stands
Ticket NBL-017 (routine, kitchen extractor fan, Flat 1, 31 Juniper Mews). Landlord replied on 2026-09-15 that the fan's switch on the right-hand side of the hob needs switching on. This is a tenant self-fix. Now on hold waiting for the tenant to try the switch and confirm the result; review 2026-09-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the tenant the landlord says the hob's right-hand switch may need turning on, and to reply if the fan still does not work so a contractor can be arranged. | Clara, tenant | email | A2 ✅ |
| 2 | WAIT | Hold the ticket for the tenant's reply; review on 2026-09-18 and chase the tenant if nothing has come back. | internal | internal | A3 ✅ |
| 3 | OTHER | If the tenant reports the fan still does not work, log the report and arrange a contractor; landlord approval for a contractor is not yet on record. | Northbridge operations, internal | internal | — |

## Messages sent (verbatim)
**A2 · send_message → Clara (tenant) via email, existing thread (event 007 email)** (verified)

> Hello Clara,
> 
> Thank you for your message about the kitchen extractor fan at Flat 1, 31 Juniper Mews.
> 
> The landlord has come back to us and says the fan may simply need its switch turned on. There is a switch on the right-hand side of the hob. Please check that switch is turned on, and then try the extractor fan again.
> 
> If the fan still does not work, please reply to this email and let us know. We will then arrange for a contractor to take a look. Please do not open up or touch any wiring yourself.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Landlord's comment is a diagnosis, not a confirmed repair; it does not show the fan works.
- Switching the hob switch on does not confirm the fault is resolved.
- Not confirmed who pays; no contractor has been instructed or booked.

## Remaining work
- Tenant to try the switch and confirm whether the fan works (owner: tenant; review 2026-09-18).
- If not fixed: arrange a contractor; landlord's approval for a contractor is not yet on record.
- Tell the landlord the outcome, and close the ticket once confirmed.

## Missing or unavailable information
- Whether the fan works after the switch is turned on.
- Landlord approval for a contractor, only needed if the tenant reports it still does not work.

## Conflicts between sources
- The intake note says landlord approval is required first; the landlord has now replied, so approval is effectively answered as a self-fix rather than a contractor approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine ticket NBL-017 is on hold, waiting for the tenant. The landlord's answer is that the hob's right-hand switch needs turning on. Still open: the tenant's confirmation that the fan works, and a contractor only if it does not.

**2. What is the next action, who is it for, and through which channel?**

Email Clara (tenant) on the existing thread (event 007) with the switch instruction and the request to reply if it still fails (sent, MSG-101). Then review the hold on 2026-09-18.

**3. Does anything need a human decision, and why?**

No. The landlord's reply resolves the next step without spend or approval. A human is only needed if the tenant reports the fan still faulty and a contractor must be arranged beyond the landlord's stated decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-017","decision":"tenant_self_fix","evidence_quote":"\"There is a switch to the righthand side of the hob when needs to be… | 1 | ✅ verified | Ticket NBL-017 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says the hob-side switch (right-hand side) needs switching on. Wai… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Failed or unverified actions
_None._
