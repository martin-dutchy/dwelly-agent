# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The intake wrongly classed a sticking front/back door as a fridge problem. I noted the correct category on the ticket, asked the tenant to confirm the door details, glass condition, security and access, and put the ticket on hold until 10 June.

## Where the case stands
Ticket at init, on hold waiting for tenant (review 2024-06-10). Misclassified as Appliances; actually a door/locks repair. No contractor, landlord approval or visit yet.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Apologise for fridge mix-up, confirm door issue and ask about glass, security, access, pets | Tenant, Flat 12 | email | A2 ✅ |
| 2 | WAIT | Hold ticket until tenant replies; review 10 June | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant, Flat 12 (tenant) via email, existing thread (event 001 request)** (verified)

> - Sorry, we first logged this as a fridge problem by mistake. We now have it as a front and back door that need slamming to close. Is that right?
> - Is there any glass in the doors, and is any of it cracked or loose?
> - Do both doors still lock securely when closed? If not, please tell us today.
> - What times suit for a contractor to visit, and are there any pets or alarm/entry codes we should know about?
> 
> Why: Ticket was misclassified as an appliance; we need door details and access to book the right contractor. Target is a visit within 14 days, sooner if the door can't be secured.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the cause, glass risk or who pays
- No contractor assigned or visit booked
- Reclassification is a ticket note only; category field not changed
- Tenant was not given an appointment, only a target timescale

## Remaining work
- Review tenant reply, then assign door/locks contractor and book visit (target 14 days; urgent if glass cracked or door won't secure)
- Check landlord spend limit/preferences (none on record)
- Ops to correct category from Appliances to Locks/door

## Missing or unavailable information
- Tenant contact details not on file; used existing thread
- Landlord and spend limit not on property record
- Which doors, glass type and condition, access arrangements

## Conflicts between sources
- Intake classified the issue as Appliances/fridge, but the tenant's text describes doors that need slamming. I trusted the tenant's words. The fridge engineer was only a visitor who commented.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Ticket is at init, misclassified as an appliance issue. It is really a door repair. Outstanding: tenant clarification, contractor, landlord/spend check, visit.

**2. What is the next action, who is it for, and through which channel?**

Information request REQ-101 to the tenant by email on the existing thread; ticket on hold, review 10 June.

**3. Does anything need a human decision, and why?**

No. It is routine and nothing needs authority now. A human should only be involved if the tenant reports cracked glass or an insecure door, or if spend exceeds the limit.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassify: this is a DOOR/LOCKS repair (front and back doors need slamming to shut; possible gl… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant, Flat 12","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 request)","questions":… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Tenant","comment":"Awaiting tenant answers on door/glass condition, securit… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
