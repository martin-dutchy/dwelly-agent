# Case 012: Dishwasher Door Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

The dishwasher door repair is at the visit stage, with a provider visit recorded for 29 April 2026 (8am-12pm). Leo Turner reported on 28 April that the door still won't close, so I replied to him on the existing thread confirming the booked visit, and asked Riverside Compliance to confirm the date and attending company, with a review on 29 April.

## Where the case stands
Visit stage. Tenant Leo Turner reported on 28 April (event 021) that the dishwasher door still won't close after the checks. The system records "Visit date selected - 29/04/2026 08:00 am" (event 017), and the tenant and provider were sent the details (events 018-020). No quote, landlord quote decision or work result exists yet. Waiting on the provider to attend on 29 April and report back.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Acknowledge the tenant's message and confirm the booked visit on Wed 29 April 2026, 8am-12pm, with Riverside Compliance; say the time is being confirmed with the provider and that any repair beyond the visit needs landlord approval first. | Leo Turner, tenant | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Ask Riverside Compliance to confirm the 29 April visit and which company is attending (event 016 named Cedar Utilities), and to send a quote with photos if a repair is needed; no work beyond inspection before landlord approval. | Riverside Compliance, contractor | email | A2 ✅ |
| 3 | WAIT | Review on 2026-04-29 to record the visit outcome (completed, partial, needs quote or no access). | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Leo Turner (tenant) via email, existing thread (event 021 email)** (verified)

> Hi Leo,
> 
> Thanks for letting us know the dishwasher door still isn't closing. We've noted this.
> 
> Our maintenance provider, Riverside Compliance, has a visit booked for Wednesday 29 April 2026 between 8am and 12pm. We are confirming the details with them and will let you know if anything changes. If you need to change the time, please contact the provider on the number in our earlier message.
> 
> Once the engineer has looked at the dishwasher, we will update you on next steps. Any repair beyond the visit will need the landlord's approval first.
> 
> Thanks,
> Northbridge Lettings

**A2 · send_message → Riverside Compliance (contractor) via email, existing thread (event 015 email)** (verified)

> Dear Riverside Compliance,
> 
> Please confirm the visit for the Dishwasher Repair Request at Flat 9, 89 Juniper Mews, Willowbank, ZZ2 0ZZ, booked for Wednesday 29 April 2026 at 8am (window 8am to 12pm), with tenant Leo Turner.
> 
> Our records also show a call on 26 April from "Grant from Cedar Utilities" about this job. Please confirm which company is attending. The tenant reports the door still will not close after the checks already made. Please bring what is needed to diagnose and repair it, and if a quote is required, send it to us with photos and estimated completion time. Do not start any work beyond the inspection until we have landlord approval.
> 
> Thanks,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Replying to the tenant does not confirm the provider will attend; the 29 April visit is only in the system record and the provider has not confirmed it in this run.
- Nothing here establishes the cause of the fault, who pays, or that the landlord has approved a repair spend.
- No duplicate found: list_tickets shows only this ticket for the property.

## Remaining work
- Provider to confirm the 29 April visit and the attending company (Riverside Compliance or Cedar Utilities).
- Record the visit outcome after 29 April (FUP-103 set for 2026-04-29).
- If a repair or quote is needed, get the landlord's recorded decision before instructing work. The agency note 'LL already agreed for GS to go out' (event 008) is not a quoted landlord decision.
- Confirm the landlord and approval record: get_property returned no landlord details or spend limit.

## Missing or unavailable information
- Provider confirmation of the 29 April visit; only the system record and the agency's own messages are on file.
- Landlord's recorded decision for any repair beyond inspection; no spend limit on file for the property.
- Identity of 'Imogen Oakley' in event 012 and whether the landlord was asked directly about the repair.

## Conflicts between sources
- Event 016 says the caller was 'Grant from Cedar Utilities' and calls the tenant 'Leo Kendall'; the provider on record is Riverside Compliance and the tenant is Leo Turner. Trusted the system assignment and tenant name in events 015 and 018; asked the provider to confirm.
- Event 020 SMS is signed 'Harbour Homes' and gives 07700 900410, while event 015 lists 07700 900763, which is the tenant's number. Trusted the provider contact in event 019.
- Event 016 says 'this Wednesday between 8 and 12' while event 017 records 08:00. Both point to Wednesday 29 April; window 8am-12pm.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At visit stage. Visit recorded for 29/04/2026 08:00 (event 017; details sent to tenant and provider in events 018-020). Tenant says the fault persists (event 021). Outstanding: provider confirmation of the visit and attending company, the visit outcome, and any quote and landlord approval if a repair is needed.

**2. What is the next action, who is it for, and through which channel?**

Email tenant Leo Turner on the existing thread (event 021) to confirm the booked visit, and email Riverside Compliance on the existing thread (event 015) to confirm the visit and attending company. Review on 2026-04-29 to record the outcome (FUP-103).

**3. Does anything need a human decision, and why?**

No escalation now. The routine steps are in hand. A landlord decision is needed only if a repair or quote follows the visit; that will be a request to the landlord, not an escalation at this stage.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Leo Turner","recipient_role":"tenant","channel":"email","contact":"existing thread (event 021 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Riverside Compliance","recipient_role":"contractor","channel":"email","contact":"existing thread (event 015 email)","tick… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-012-duplicate-report","due_on":"2026-04-29","party":"Riverside Compliance","purpose":"Check the 29 April 8am-12pm visit h… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
