# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request has been stuck at landlord approval since January with conflicting notes about an approved £500+VAT quote. I treated it as unapproved, sent the landlord one clear question with a deadline, updated the tenant, and put the job on hold with a review date.

## Where the case stands
At landlord approval gate (init). No written landlord decision exists. Waiting on landlord; on hold, review 2025-03-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked landlord for a clear written decision (our contractor £500+VAT / own contractor / decline) by 2025-03-18 | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant the position, nothing booked, next update by 18 March, asked for photos again | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 2025-03-18 for landlord reply; then chase on second channel | Jenkins, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden at Flat 25, 185 Copperfield Walk: tenant asks for rubbish removal, levelling and gravel. Our notes say a £500+VAT quote was approved, but we have no written approval from you. Please reply by 2025-03-18: do you approve our contractor (£500+VAT), will you use your own contractor (name and date please), or do you decline?
> 
> Options: Approve our contractor at £500+VAT; You arrange your own contractor (send name and date); Decline

**A3 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing, and sorry for the wait. We still need the landlord's written decision on the garden work, and we have asked them again today for a reply by 18 March. Nothing is booked yet. We will update you by 18 March. Also, the photos you mentioned did not reach us, so please resend them if you can.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking the landlord does not approve spend or choose a contractor
- No contractor assigned or visit booked
- Note of £500+VAT approval (event 009) is unverified

## Remaining work
- Landlord decision (owner: landlord/Maya)
- Then assign Harbour Compliance or record own contractor
- Chase on SMS/phone after 18 March if silent; escalate P2 if still silent
- Tenant photos missing

## Missing or unavailable information
- Landlord's written decision
- Garden photos (unavailable)
- Whether Oakley's contractor is the landlord's own

## Conflicts between sources
- Event 009 says landlord approved £500+VAT, but events 010-018 say still waiting for the landlord; no landlord words on file. Treated as not approved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate; landlord has never replied in writing. Outstanding: a landlord decision on route and spend, and the tenant's photos.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request to Jenkins (landlord record contact) with a reply-by date of 18 March; tenant updated by email; hold review 18 March, then chase by SMS/phone.

**3. Does anything need a human decision, and why?**

Not yet. The landlord's decision is theirs, and the request is routine. Escalate P3 if still silent after the second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden at Flat 25, 185 Copperfield Walk: tenant… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT (Harbour Compliance) but no landlord… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hello, thanks f… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Written landlord decision needed: our contractor … | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
