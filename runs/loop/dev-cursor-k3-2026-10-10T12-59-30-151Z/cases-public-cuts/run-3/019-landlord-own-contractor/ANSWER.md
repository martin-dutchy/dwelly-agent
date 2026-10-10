# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request has been stuck for two months with the landlord unreachable. Records conflict on approval; I treated it as unapproved, asked the landlord a clear question, updated the tenant and held with review date 18 March.

## Where the case stands
Landlord approval gate; ticket in init, on hold waiting for landlord. No landlord reply since 17 Jan. Review 2025-03-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord a yes/no: our contractor at £500+VAT, own contractor, or decline | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, nothing booked, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 18 March, then chase landlord on another channel | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden at Flat 25, 185 Copperfield Walk: tenant asks for rubbish removal, levelling and gravel. Our notes show a £500 + VAT quote and a possible contractor of yours. Please reply yes or no: should we instruct our contractor (Harbour Compliance) at £500 + VAT, or will you arrange your own contractor (and if so, who and when)? We haven't been able to reach you by phone. (£600)
> 
> Options: Yes, instruct our contractor up to £500 + VAT; I will arrange my own contractor (please give name and date); Decline the works

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing about the back garden. Sorry for the wait. We are still waiting for the landlord to confirm how they want the work done, and we haven't been able to reach them by phone. We have just sent them a clear yes/no question in writing. No work is booked yet. We will chase again and update you by 18 March. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking does not approve spend or assign a contractor
- Nothing is booked
- The £500+VAT note is not confirmed landlord authority

## Remaining work
- Landlord decision (owner: agency chasing)
- If approved: assign contractor and book visit
- If own contractor: record, get name/date
- Garden photos were unavailable; scope unseen

## Missing or unavailable information
- Landlord's decision in their own words
- Garden photos

## Conflicts between sources
- Event 009 says landlord approved the quote; later holds show no landlord contact. Trusted the later holds and the absence of any landlord words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate. No recorded landlord decision; note of a £500+VAT quote approval is unsupported. Outstanding: landlord decision, contractor, visit.

**2. What is the next action, who is it for, and through which channel?**

Written yes/no question to the landlord (A1), tenant update by email (A2); chase on another channel after 18 March.

**3. Does anything need a human decision, and why?**

Not yet. Routine landlord chase. Escalate only if the landlord stays silent after the second-channel chase, and only if the tenant is suffering, which is not the case for a routine garden job.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden at Flat 25, 185 Copperfield Walk: tenant… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT with Harbour Compliance; events 010-… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Waiting for landlord to choose: our contractor £5… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
