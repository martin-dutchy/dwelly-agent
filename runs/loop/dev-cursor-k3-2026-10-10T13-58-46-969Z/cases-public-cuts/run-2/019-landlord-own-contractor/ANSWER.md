# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden works request has stalled for two months waiting on the landlord, with conflicting internal notes about approval. I asked the landlord a single clear question, updated the tenant, noted the conflict and set a hold to 18 March.

## Where the case stands
Landlord approval gate, ticket at init, on hold. No landlord decision on file; landlord silent since January. Waiting on landlord; tenant waiting on us.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for one clear answer by 18 Mar: our contractor up to £500+VAT, or their own contractor (name, date, whether already attended) | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord decision, no work date yet, next update by 18 Mar, resend photos | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold with review date 2025-03-18 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden at Flat 25, 185 Copperfield Walk: tenant asks for rubbish removal, levelling and gravel. Our notes show a £500+VAT quote (Harbour Compliance) said to be approved, but we hold no written approval from you, and notes also mention a contractor via Oakley. Please reply by 2025-03-18 with one answer: do you approve our contractor up to £500+VAT, or are you arranging your own contractor (if so, name and date, and say whether they have already attended)? (£500)
> 
> Options: Approve our contractor (Harbour Compliance) up to £500 + VAT; You arrange your own contractor (give name and date); Decline the works

**A3 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing, and sorry for the wait on the back garden. We still need the landlord to confirm whether we use our contractor or they arrange their own, and we have not had a reply yet. We have sent them a clear question today and asked for an answer by 18 March. We can't give a work date until they decide. We will update you by 18 March. If you can, please resend the garden photos as we can't see the originals. Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned or spend approved; the £500+VAT note is not landlord authority
- The request does not establish who arranges or pays for the work
- No work date promised

## Remaining work
- Landlord reply by 18 Mar, then record decision and assign or log own contractor (owner: property manager Maya)
- If still silent on 18 Mar, chase by phone/SMS and consider escalating P3
- Obtain garden photos from tenant

## Missing or unavailable information
- Landlord's written decision
- Garden photos (unavailable)
- Who Oakley is and whether their contractor has quoted/attended

## Conflicts between sources
- Event 009 says landlord approved the quote; events 010-017 show no landlord contact. Treated as not approved.
- Event 009 names Harbour Compliance while event 016 refers to Oakley's contractor.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate with no recorded decision. Event 009 claims approval of a £500+VAT quote, but later notes contradict it and no landlord words exist. The route (our contractor or the landlord's own via Oakley) is unresolved.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval/route question to the landlord (agency landlord record, A1), tenant update by email (A3), hold to 18 March (A4).

**3. Does anything need a human decision, and why?**

Not yet. This is a routine job and the landlord has just been asked again. If they stay silent after 18 March, escalate P3.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden at Flat 25, 185 Copperfield Walk: tenant… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Record conflict: event 009 says quote £500+VAT approved by landlord and Harbour Complian… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Waiting for landlord to say: our contractor up to… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
