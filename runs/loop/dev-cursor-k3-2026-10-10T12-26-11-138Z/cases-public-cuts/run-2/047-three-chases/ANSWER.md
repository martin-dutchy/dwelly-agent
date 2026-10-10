# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Window repair has stalled: provider silent after 7 reminders and the landlord's only reply concerned a different property so is not approval. I stopped reminding the provider, asked the landlord a clear yes/no, updated the tenant and put the job on hold to 13 March.

## Where the case stands
Stage mp_time, provider (Oscar Turner) assigned 1 Mar but never replied to 7 reminders; no visit booked. Landlord approval never validly given (his reply named Flat 18, 88 Alder Lane). Now on hold waiting for landlord until 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord yes/no whether our contractor may assess and quote for Flat 24 window, noting his earlier reply named a different property | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: no visit booked yet, landlord go-ahead being confirmed, next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 13 March for landlord reply; then reassign provider if approved, since Oscar Turner is unresponsive | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb mentioned a plumber at Flat 18, 88 Alder Lane, which is a different property, so we cannot treat it as an answer for Flat 24, 150 Copperfield Walk. For the bedroom window that won't close properly at Flat 24, may we send our contractor to assess and quote? Yes or no please.
> 
> Options: Yes, send your contractor to assess and quote (recommended); No, I will arrange my own contractor

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. Our contractor has not yet booked a visit with you, and we have not been able to confirm the landlord's go-ahead for this repair, so we have asked him again. We will not book anything until that is clear. We will update you by 13 March at the latest. If the window becomes unsafe or cannot be secured, please tell us straight away. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking the landlord does not approve the work or any spend
- No visit is booked and no provider has confirmed anything
- Not a reassignment of the contractor yet

## Remaining work
- Landlord to answer yes/no (agency owns chase on 13 March)
- Replace or phone Oscar Turner and get a visit confirmed once approved
- Visit, result, invoice, close

## Missing or unavailable information
- Valid landlord approval for Flat 24
- Provider's phone number/response
- Landlord spend limit and preferred contractors not on file

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not the case property; treated as not applicable
- Provider was assigned (event 016) with no valid recorded landlord approval
- Tenant's message mentions a toilet, now fixed by the tenant; no job needed

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but unresponsive, no visit booked, landlord approval not validly given. Outstanding: landlord decision, working provider, visit, result, invoice.

**2. What is the next action, who is it for, and through which channel?**

Landlord yes/no approval request by email (A1), tenant update by email (A2), hold to 13 March (A3).

**3. Does anything need a human decision, and why?**

Not yet. If the landlord is silent by 13 March, chase on a second channel; escalate only if still silent, and if approved reassign the provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb mentioned a plumber at Flat 18, 88 Al… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","body":"Hello El… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord's reply (event 010) named a different property; no … | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |

## Failed or unverified actions
_None._
