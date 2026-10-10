# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Provider ignored 7 reminders and the landlord's only reply named a different property, so there is no valid approval. I asked the landlord for a clear yes/no, told the provider not to start and to reply, updated the tenant, and put the job on hold to 13 March.

## Where the case stands
Stage mp_time: provider (Oscar Turner) assigned 1 Mar but never replied to 7 reminders; no visit booked. No valid landlord approval on record (the 22 Feb reply concerned a different property). On hold, review 13 Mar.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked landlord a yes/no question: our contractor or their own, for Flat 24, noting the earlier reply named another address | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | CHASE_PROVIDER | Stopped the reminder loop; sent one different message asking if they can take the job, with an instruction not to start until approved | Oscar Turner, contractor | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Updated tenant: no visit booked, approval being confirmed, next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 4 | WAIT | Hold until 13 March for landlord answer / provider reply | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb mentioned a plumber at Flat 18, 88 Alder Lane, which is not this property. For Flat 24, 150 Copperfield Walk (bedroom window not closing properly; the toilet issue is already sorted by the tenant), may we send our contractor, or will you arrange your own? Yes/no to ours is enough.
> 
> Options: Yes, send your contractor (Oscar Turner); I will arrange my own contractor (please give name and date)

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the wait on your bedroom window. Our contractor hasn't yet replied to book a visit, and we are also confirming the go-ahead with your landlord, as their earlier reply referred to a different address. We have asked the landlord again today and will update you by 13 March. No visit is booked yet. If the window can't be fastened shut and you feel unsafe or it's letting in the weather, please tell us.

**A3 · send_message → Oscar Turner (contractor) via email, existing thread (event 018 email)** (verified)

> Hello Oscar, we've had no reply to our earlier messages about the window repair at Flat 24, 150 Copperfield Walk. Please don't start any work yet: we are confirming landlord approval. Please reply to say whether you can take the job and when you could visit; we will confirm once approval is in place.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Request to the landlord does not equal approval; no visit is booked
- Message to provider does not confirm the provider will attend
- Nothing here decides who pays

## Remaining work
- Landlord to answer approval question (owner: landlord/agency)
- If provider silent by 13 Mar, reassign or phone another provider; escalate P3 if no route left
- Visit booking, result, invoice and closing still to come

## Missing or unavailable information
- Valid landlord approval for Flat 24
- Provider's availability and phone number (no phone on file; SMS and email were unanswered)

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, not the case property; treated as not approval.
- Provider assigned (event 016) without recorded landlord approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but silent, no visit booked, landlord approval not validly given (reply was about Flat 18, 88 Alder Lane). Outstanding: landlord approval, provider response/visit, result, invoice.

**2. What is the next action, who is it for, and through which channel?**

Landlord yes/no approval request by email (A1); provider email (A3); tenant email update (A2); hold to 13 Mar (A4).

**3. Does anything need a human decision, and why?**

Not now. The next step is the landlord's decision. If the provider stays silent after 13 Mar with no other route, escalate P3 recommending a provider swap.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb mentioned a plumber at Flat 18, 88 Al… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Oscar Turner","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticket_ref":… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord's 22 Feb reply named a different property (Flat 18,… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-047-three-chases","note":"Event 010 landlord reply concerns Flat 18, 88 Alder Lane - not approval for this property. Provider… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
