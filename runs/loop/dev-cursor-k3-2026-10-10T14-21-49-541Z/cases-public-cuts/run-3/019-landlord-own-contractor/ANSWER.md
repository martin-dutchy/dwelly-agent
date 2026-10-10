# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The garden job has sat at the landlord gate since January. Notes conflict on whether the £500+VAT quote was approved or the landlord's contact is arranging their own contractor. I asked the landlord for a written choice by 17 Mar, updated the tenant, held the ticket and added a note.

## Where the case stands
Stuck at landlord approval gate. No written landlord decision on file; landlord unreachable since January. Held, waiting for landlord, review 17 Mar.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to confirm in writing our contractor (£500+VAT) or own contractor, reply by 17 Mar | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, nothing booked, next update by 18 Mar | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 17 Mar, then chase on another channel and escalate P2 if silent | Jenkins, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Please confirm in writing which route you want for the back garden clearance, levelling and gravel at Flat 25, 185 Copperfield Walk: (a) our contractor, Harbour Compliance, at the £500 + VAT quote noted on 31 Jan, or (b) your own contractor (Oakley's), in which case please give their name and a date, and tell us whether they have already attended. (£600)
> 
> Options: Our contractor (Harbour Compliance) at £500 + VAT, as noted 31 Jan - please reply 'approved up to £600 incl. VAT' or similar; Your own contractor: reply with name and visit date; Decline the work
> 
> Update: Our notes conflict: one says you approved the £500 + VAT quote, others suggest your contact Oakley was arranging a contractor to quote. We have no written decision from you, and calls have not reached you, so nothing is booked and nobody will be sent until you confirm. The tenant chased today. Please reply by 17 March; we will chase again after that.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the garden, and sorry for the wait. We still need the landlord to confirm in writing how they want the work arranged (our contractor or their own). We have asked again today and set 17 March for a reply. Nothing is booked yet, so please don't expect anyone until we confirm. We will update you by 18 March at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned or work approved
- Does not establish that the £500+VAT quote is approved or that Oakley's contractor is the route
- Does not confirm any visit date or the garden's condition (photos unavailable)

## Remaining work
- Landlord written decision (agency, chase 17 Mar)
- Then assign Harbour Compliance or get own contractor's name and date
- Tenant update by 18 Mar

## Missing or unavailable information
- Landlord's written decision
- Garden photos
- Who Oakley is and whether their contractor has attended

## Conflicts between sources
- Event 009 says the landlord approved £500+VAT with Harbour Compliance; events 015/016 suggest Oakley's contractor is quoting; no landlord words on file, so treated as unapproved.
- The ticket stage is init, but notes suggest later progress.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Unapproved at the landlord gate; the landlord has not replied and the notes conflict. Outstanding: a written landlord decision on the route.

**2. What is the next action, who is it for, and through which channel?**

The approval request went to the landlord by email (the only channel on file). The tenant update went by email. The ticket is held to 17 Mar, after which I chase by another channel.

**3. Does anything need a human decision, and why?**

Not yet. Escalate P2 if the landlord is still silent after the 17 Mar chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Please confirm in writing which route you want for t… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting written landlord decision: our contracto… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT with Harbour Compliance; events 015/… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
