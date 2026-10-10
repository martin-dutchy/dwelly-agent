# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The intake wrongly classed a door complaint as a fridge/appliance job. I noted the ticket as a door repair, asked the landlord to choose our contractor or their own, asked the tenant to clarify and held the ticket to 10 June.

## Where the case stands
Intake stage, on hold to 2024-06-10. No contractor assigned. Landlord approval (APR-101) and tenant answers (REQ-102) outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether we send our contractor, or they use their own, for the door repair | Landlord | internal | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant to confirm it is a door issue, whether it locks securely, glass condition, access and pets | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 2024-06-10 for both replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the front and back doors at Flat 12, 52 Meadow Row only shut if slammed; a visiting engineer reportedly warned this could shatter the glass. May we send our contractor to inspect and repair, or will you arrange your own?
> 
> Options: Yes, send your contractor (recommended); I'll arrange my own contractor; Tenant to fix

**A3 · request_information → Tenant (tenant) via email, existing thread (event 001)** (verified)

> - Sorry, our automatic questions about a fridge were wrong. Can you confirm the problem is the front door (and back door) not closing properly, not a fridge?
> - Does the front door still lock securely, and is any glass cracked or loose?
> - What days and times suit a visit, and are there any pets or entry codes we should know about?
> 
> Why: Intake wrongly treated this as a fridge problem; we are logging it as a door repair and need to judge urgency.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not approve spend or assign a contractor
- Does not confirm the cause or the glass risk; that is the tenant's report of what a fridge engineer said
- Does not establish the door is insecure

## Remaining work
- Record landlord decision when it arrives, then assign contractor
- Review tenant answers; raise severity if the door cannot be secured
- Chase on 2024-06-10 if no replies

## Missing or unavailable information
- Landlord decision
- Whether the door locks securely and the glass condition
- Access times and pets

## Conflicts between sources
- The intake classified this as Appliances/fridge, but the tenant's words describe a door that has to be slammed. I trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake and misclassified as Appliances. It is really a door repair. Landlord approval and tenant clarification are outstanding, and no contractor has been assigned.

**2. What is the next action, who is it for, and through which channel?**

The landlord has been asked to approve our contractor (APR-101). The tenant has been asked to clarify and give access details (REQ-102, email on the existing thread). Review is on 2024-06-10.

**3. Does anything need a human decision, and why?**

No. The landlord decision is routine and has been requested. I would escalate only if the tenant says the door cannot be secured and the landlord stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake labelled Appliances/fridge, but the issue is a front (and back) door that m… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front and back doors at Flat 12, 52 M… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","why":"Intake wrongly treated… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision (APR-101) and tenant answer… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
