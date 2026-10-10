# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The 29/04 8am-12pm visit is not yet confirmed: it came from a Cedar Utilities caller, while the assigned provider is Riverside Compliance. Riverside has been asked to confirm, the tenant told it is unconfirmed, and the job is on hold to 2026-04-27.

## Where the case stands
Visit stage. Riverside Compliance is assigned. The visit slot Wed 29/04/2026 8am-12pm is not yet confirmed by the provider. On hold until 2026-04-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Riverside Compliance to confirm the 29/04 visit in writing and whether Cedar Utilities is attending | Riverside Compliance, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the visit is proposed but not yet confirmed | Leo Turner, tenant | email | A2 ✅ |
| 3 | WAIT | Hold until Riverside replies, review 2026-04-27 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Riverside Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> - Please confirm in writing that Riverside Compliance is attending Flat 9, 89 Juniper Mews for the dishwasher door on Wednesday 29/04/2026 between 8am and 12pm.
> - Our records show Riverside Compliance as the provider, but on 26/04/2026 a caller from Cedar Utilities (Grant) phoned the tenant to arrange this visit. Please confirm whether Cedar Utilities is working for you on this job, and if so, that they are authorised to attend.
> - Please confirm the engineer's arrival window and that you will call the tenant on 07700 900763 before attending.
> 
> Why: The visit slot came from a call by a Cedar Utilities caller, not from the assigned provider, and the tenant's name on that call differed. We need the provider to confirm the visit before we treat it as booked.

**A2 · send_message → Leo Turner (tenant) via email, existing thread (event 011 email)** (verified)

> Hi Leo,
> 
> Thanks for letting us know the dishwasher door still won't close after the checks.
> 
> We have a visit proposed for Wednesday 29 April between 8am and 12pm. A caller from Cedar Utilities contacted you about this, but our assigned contractor is Riverside Compliance. We are asking Riverside to confirm the visit and who will attend, and we will let you know once it is confirmed. Please don't worry if you haven't heard back by the end of the day.
> 
> Once the engineer has looked at the dishwasher, we will need the landlord's approval before any repair work goes ahead, and we will keep you updated.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Visit slot is not confirmed by the assigned provider.
- Landlord approval covers the diagnostic visit only, not any repair quote.

## Remaining work
- Riverside to confirm visit; chase 2026-04-27 if no reply.
- Record inspection result; get landlord approval for any quote.

## Missing or unavailable information
- Riverside written confirmation of visit and attending company.

## Conflicts between sources
- Event 016 caller Cedar Utilities / 'Leo Kendall' vs assigned Riverside / Leo Turner. Trusted assigned provider and tenant on file.

## Answers to the case questions
**1. Where does this case stand?**

Visit stage, not yet confirmed by provider; on hold to 2026-04-27.

**2. Next action?**

Email Riverside (A1) to confirm; email tenant (A2); hold (A3).

**3. Human decision needed?**

No, not yet. Escalate as P3 if Riverside does not clarify by review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","ques… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 011 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-012","reason":"Waiting for Provider","comment":"Waiting for Riverside Compliance to confirm in writing the visit on Wed 2… | 1 | ✅ verified | Ticket NBL-012 read back after put_on_hold |

## Failed or unverified actions
_None._
