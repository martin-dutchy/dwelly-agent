# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider was assigned without valid landlord approval (the landlord's only reply concerned Flat 18, 88 Alder Lane) and has ignored three reminders. I asked the landlord for a clear decision, updated the tenant and put the job on hold with a review date.

## Where the case stands
Stage mp_time: provider Oscar Turner assigned 2024-03-01, no reply to 3 email+SMS reminders, no visit booked. No valid landlord approval on record. Now on hold waiting for landlord, review 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm yes (our contractor) or own contractor for Flat 24, noting his earlier reply named a different property | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: contractor not yet in touch, landlord go-ahead pending, no date confirmed | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2024-03-13; then if no approval, chase landlord by SMS/phone and swap provider | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is a different property. For Flat 24, 150 Copperfield Walk (bedroom window not closing properly; the toilet issue was fixed by the tenant), may we send our contractor, or will you arrange your own? Please reply yes (ours) or own contractor.
> 
> Options: Yes, send our contractor Oscar Turner; I will arrange my own contractor (please give name and date)

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 006 email)** (verified)

> Hello Eliza, sorry for the wait on your bedroom window. The contractor we named hasn't yet contacted you to book, and we are still waiting for the landlord to confirm the go-ahead for your flat. We have asked him again today and are chasing the contractor too. If the window cannot be closed or locked and you feel unsafe, please tell us. We'll update you as soon as we have a confirmed date. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No visit is booked and no approval is established
- Asking the landlord does not authorise the contractor
- Provider has not been swapped or phoned (no phone number on file)

## Remaining work
- Landlord to answer yes/own contractor (agency owns chase)
- Provider to book visit or be replaced after review on 2024-03-13
- Record decision and then set visit once provider confirms

## Missing or unavailable information
- Landlord approval for this property
- Provider contact beyond email/SMS
- Property record has no landlord contact, spend limit or contractor list

## Conflicts between sources
- Landlord's reply (event 010) names Flat 18, 88 Alder Lane, Willowbank ZZ3 5ZZ, not this property; treated as not approval.
- Provider assigned (event 016) with no recorded landlord decision.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine window repair; provider assigned but silent, no visit booked, landlord approval never validly given (reply named another property). Toilet issue was resolved by tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord Isaac Oakley asked by email for a yes/own-contractor decision; tenant updated by email; hold until 2024-03-13.

**3. Does anything need a human decision, and why?**

Not yet. The landlord's decision is routine to request; if he stays silent and the provider remains unresponsive at review, escalate/swap provider.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22/02 mentioned a plumber at Flat 18, 88 Ald… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane: not… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |

## Failed or unverified actions
_None._
