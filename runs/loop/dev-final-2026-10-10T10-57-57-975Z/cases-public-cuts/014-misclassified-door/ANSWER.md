# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The intake wrongly classed a door problem as an appliance issue because of the fridge engineer's remark. I noted the correct category on the ticket and asked the tenant for security, glass, photo and access details. No human decision is needed yet.

## Where the case stands
Ticket NBL-014-misclassified-door at init. Misclassified as Appliances; actually a front/back door that needs slamming to shut. Waiting on tenant reply (REQ-101). No contractor assigned; landlord and spend limit unknown (property record has no details).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | RECLASSIFY | Noted on the ticket that this is a door repair, not an appliance issue, routine severity | internal | internal | A1 ✅ |
| 2 | REQUEST_INFORMATION | Asked the tenant about door security, glass condition, photo, access and availability; told them the 14-day routine target | Tenant, Flat 12 | email | A2 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant, Flat 12 (tenant) via email, existing thread (event 001 note)** (verified)

> - Does the front door lock securely once it is shut, and can you lock it from inside and outside?
> - Is there any glass in or beside the front door or back door, and is it cracked or loose?
> - Please send a photo of the door and where it catches, if you can.
> - What times suit for a contractor visit, and is there anything we should know about access (alarm, entry codes, pets)?
> 
> Why: Our intake mistakenly treated this as a fridge problem. It is a door repair; we need these details to book a carpenter. Target is within 14 days; sooner if the door will not secure.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reclassification does not confirm the cause or the extent of damage
- No contractor booked and no appointment promised
- The fridge engineer's report is hearsay and has not been received

## Remaining work
- On tenant reply: confirm severity (urgent if door cannot be secured or glass is cracked), check landlord/spend limit, assign a carpenter and book a visit
- Fix the category on the ticket record if a human can edit it (the tool only allows notes)

## Missing or unavailable information
- Whether the door secures and locks
- Condition of any glass
- Tenant availability and access
- Landlord details and spend limit (not on property record)
- Tenant's contact details (used existing thread)

## Conflicts between sources
- Intake classed the issue as Appliances/fridge, but the tenant's words describe a door that has to be slammed shut; I trusted the tenant's words. The fridge Q&A is irrelevant.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is at intake stage and was misclassified as Appliances. It is really a front/back door that won't close without slamming, with a possible glass risk. Outstanding: tenant details, landlord approval and spend limit check, contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Information request REQ-101 to the tenant by email on the existing thread, asking about door security, glass, photo and access. After the reply, assign a carpenter and book a visit.

**3. Does anything need a human decision, and why?**

No. It is routine and within normal process. Escalate only if the door cannot be secured or glass is damaged, or if spend exceeds limits.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake labelled \"Appliances\" in error. Issue is front door (and back door) that … | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant, Flat 12","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","questions":["D… | 1 | ✅ verified | REQ-101 found in the request_information log |

## Failed or unverified actions
_None._
