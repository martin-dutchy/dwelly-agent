# Case 040: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant says the problem is solved by swapping in their own machine. The landlord, apparently unaware, agreed to a check visit. I did not book a visit. I recorded the landlord's reply, asked both parties to confirm, and put the ticket on hold with a review date.

## Where the case stands
Ticket at init stage, on hold until 2026-12-29. The tenant reports they swapped in their own machine and stored the faulty one in the garage. The landlord has agreed to a check visit. No contractor is assigned and no visit is booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the landlord whether the old machine still needs inspecting or the job can close with no visit | Landlord (Oliver) | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm their machine works and whether they still want the old one checked (garage access) | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold the ticket and review on 2026-12-29 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant (tenant) via email, existing thread (event 008 email)** (verified)

> Hello, thanks for letting us know you've swapped in your own washing machine and stored the original in the garage. Glad you're up and running. Your landlord had just agreed to a check of the original machine, so we're not booking anyone yet. Could you confirm (1) your own machine is working fine, and (2) whether you'd still like someone to look at the old one, which would need access to the garage? We'll hold off until we hear from you and the landlord. Happy Christmas.

**A3 · send_message → Landlord (landlord) via email, existing thread (event 009 email)** (verified)

> Hello, thanks for agreeing to a check. Just to let you know, the tenant has told us they have swapped in their own washing machine and stored the faulty one in the garage, so the day-to-day problem is sorted. Do you still want someone to inspect the original machine (it's stored in the garage), or shall we close the job with no visit? We haven't booked anyone and won't until we hear from you.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the landlord's answer does not authorise a contractor or any spend.
- The tenant's swap is unverified and does not show the old machine's fault or who owns it.
- Nothing here closes the ticket.

## Remaining work
- Landlord to say whether the old machine should be inspected.
- Tenant to confirm their machine works and give garage access if a check is wanted.
- Agency to close with no payment if no visit is wanted, or else assign a contractor and book the visit.

## Missing or unavailable information
- Whether the landlord still wants the old machine checked after learning of the swap.
- Tenant confirmation that the swap worked.
- Who owns the faulty machine.

## Conflicts between sources
- The tenant says the issue was resolved by a swap, but the landlord's later message agrees to a visit. I treated the visit as unconfirmed and asked both parties.
- The ticket ref is NBL-040-tenant-resolved in the system, but the text names NBL-040-4451.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The tenant says it is resolved by a machine swap. The landlord agreed to a visit. Outstanding: the landlord's decision on whether the old machine still needs checking, and the tenant's confirmation.

**2. What is the next action, who is it for, and through which channel?**

Emails to the landlord and tenant asking for those confirmations (sent), plus a hold with a review on 2026-12-29.

**3. Does anything need a human decision, and why?**

No. The remaining decision belongs to the landlord, and no spend or authority issue has arisen.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-040-tenant-resolved","decision":"conditional","conditions":"Agreed to a visit to check the machine, but tenant has since … | 1 | ✅ verified | Ticket NBL-040-tenant-resolved read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 008 email)","body":"Hello, thanks f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 009 email)","body":"Hello, than… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-040-tenant-resolved","reason":"Waiting for Landlord","comment":"Tenant says they swapped machines themselves; landlord ha… | 1 | ✅ verified | Ticket NBL-040-tenant-resolved read back after put_on_hold |

## Failed or unverified actions
_None._
