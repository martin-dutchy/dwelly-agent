# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The dishwasher job is at visit stage, with the system showing a 29 April 2026 8am visit. The provider's call came from a different company name and used a different surname for the tenant, so I asked Riverside Compliance to confirm, told the tenant the date is pending confirmation, and put the job on hold until 27 April.

## Where the case stands
Stage: visit. Dishwasher door still won't close after the tenant's checks (tenant email 23 Apr). Engineer instructed on 25 Apr; system shows "Visit date selected - 29/04/2026 08:00 am". No quote yet and no spend limit on the property record. Waiting on Riverside Compliance to confirm the visit and its company, with a review on 27 Apr.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Asked Riverside Compliance to confirm the Wed 29 April 2026 8am-12pm visit, whether Cedar Utilities acts for them, and the engineer's name. | Riverside Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told the tenant the visit is 29 April 8am-12pm, that it is being confirmed with the provider, and that they will be told once confirmed. | Leo Turner, tenant | email | A2 ✅ |
| 3 | WAIT | Job NBL-012 on hold for provider confirmation; review 27 Apr 2026 and chase if no reply. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Riverside Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Dear Riverside Compliance,
> 
> Re: Dishwasher door repair, Flat 9, 89 Juniper Mews, Willowbank, ZZ2 0ZZ (tenant Leo Turner, 07700 900763).
> 
> Our system shows a visit on Wednesday 29 April 2026, 8am to 12pm. A call to the tenant on 26 April came from "Grant from Cedar Utilities" and referred to the tenant as "Leo Kendall". Please could you confirm by reply:
> 1. That you will attend on Wednesday 29 April 2026 between 8am and 12pm.
> 2. That Cedar Utilities is your company or a subcontractor working for you, and that the caller was acting for you.
> 3. The name of the engineer attending.
> 
> Please do not treat the visit as final until you have replied. Once confirmed, we will tell the tenant. If the job needs a quote, send it to us with photos and the estimated completion time, and do not start work until we have the landlord's approval.
> 
> Thank you,
> Northbridge Lettings

**A2 · send_message → Leo Turner (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Leo,
> 
> Thanks for letting us know the door still won't close after the checks. We have arranged for our repair provider, Riverside Compliance, to look at the dishwasher.
> 
> We have a visit on Wednesday 29 April between 8am and 12pm. A call about this came from Grant at Cedar Utilities, so we are confirming with Riverside Compliance that this is right and who will attend. We will let you know as soon as they have replied.
> 
> If the engineer needs to be in the flat, they will contact you directly. If you need to change the time, please tell us as soon as you can.
> 
> Thanks,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending the message does not confirm the visit; the system date is not yet confirmed by the provider.
- Nothing here approves spend or a quote; the landlord has not approved any repair cost.
- The cause of the fault and who pays are not established.

## Remaining work
- Riverside Compliance to confirm the visit, company and engineer (review 27 Apr 2026).
- After the visit: record the result; if a quote is needed, send it to the landlord for approval before work.
- Tell the tenant once the visit is confirmed.

## Missing or unavailable information
- Provider confirmation of the 29 April visit.
- Relationship between Cedar Utilities and Riverside Compliance.
- Whether the tenant's name on the call was Leo Turner (record) or Leo Kendall (call note).

## Conflicts between sources
- Visit time: system line says 08:00 am on 29/04; the provider call said Wednesday between 8 and 12. Treated as the same visit window, unconfirmed.
- Provider name: assigned provider is Riverside Compliance; the call came from Grant at Cedar Utilities. Not resolved; asked the provider.
- Tenant name: record says Leo Turner; the call note says Leo Kendall. Not resolved; asked the provider.
- Event 008 'LL already agreed for GS to go out' is an agency note, not the landlord's own words, so it is not recorded as landlord approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visit stage. The engineer was instructed on 25 Apr. The system shows a 29 Apr 2026 08:00 visit, but the provider has not confirmed it and the call came from Cedar Utilities, not Riverside Compliance. No quote or landlord spend approval exists. Outstanding: provider confirmation, the visit itself, and any quote.

**2. What is the next action, who is it for, and through which channel?**

Email Riverside Compliance (existing thread) to confirm the visit, company and engineer; email the tenant Leo Turner (existing thread) that the visit is pending confirmation; hold until 27 Apr 2026 to chase.

**3. Does anything need a human decision, and why?**

Not yet. The routine checks are with the provider and the tenant. Escalate if the provider cannot confirm the company or the visit, or if a quote needs a landlord decision.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","tick… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"012",… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"012","reason":"Waiting for Provider","comment":"Waiting for Riverside Compliance to confirm Wed 29 April 2026 8am-12pm visit,… | 1 | ❌ failed | Ticket 012 not found on read-back |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-012","reason":"Waiting for Provider","comment":"Waiting for Riverside Compliance to confirm Wed 29 April 2026 8am-12pm vi… | 1 | ✅ verified | Ticket NBL-012 read back after put_on_hold |

## Failed or unverified actions
- A3: put_on_hold used ticket ref 012, which was not found. list_tickets showed NBL-012; retried with that ref and it verified as A4.
