# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The garden request has waited since January on the landlord, who has never replied in writing; the records conflict about approval. I sent the landlord an email approval request and an SMS chase, both needing an answer by 17 March. I told the tenant nothing is booked, and put the job on hold with a review date.

## Where the case stands
At landlord approval gate, on hold (review 2025-03-17). Landlord has never replied in writing; route unconfirmed. No contractor assigned, no visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS chase asking for own-contractor details or approval by 17 March | Jenkins, landlord | sms | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Formal route/approval request with deadline 17 March | Jenkins, landlord | email | A1 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant: waiting on landlord, nothing booked, next update by 18 March | Tenant | email | A3 ✅ |
| 4 | WAIT | Hold until 17 March review | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden at Flat 25, 185 Copperfield Walk (rubbish removal, levelling, gravel). Our notes conflict: one says you approved a £500+VAT quote, others suggest your own contractor may be dealing with it. Please reply by 2025-03-17 with a yes/no or the details: (1) Is your own contractor arranging this? If so, their name and a visit date, and have they already attended? (2) Or do you approve our contractor (Harbour Compliance) at £500+VAT? Please confirm in writing.
> 
> Options: Your own contractor arranges it (please give name and date); Approve our contractor Harbour Compliance at £500 + VAT; Decline the works

**A2 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Maya at Northbridge Lettings. We've not been able to reach you by phone about the back garden at Flat 25, 185 Copperfield Walk. Could you reply by Mon 17 March: are you arranging your own contractor (name and date please), or shall we go ahead with ours at £500+VAT? The tenant is waiting. Thanks.

**A3 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing and sorry for the wait on the back garden. We're still waiting for the landlord to confirm who will do the work (their own contractor or ours). We've just emailed and texted them asking for an answer by 17 March. No work or visit is booked yet. We'll update you by 18 March at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval is established; the £500+VAT note (event 009) has no landlord words behind it.
- Nothing booked or assigned; the update to the tenant does not promise dates or cost.

## Remaining work
- Landlord decision on route (own contractor with name/date, or approve ours) - Jenkins/Maya
- If no reply by 17 March, consider P2 escalation or phone attempt; tenant chased on 13 March
- Garden photos unavailable; request if needed for scope

## Missing or unavailable information
- Landlord's written decision
- Garden photos (unavailable)
- Whether the landlord's own contractor already quoted or attended

## Conflicts between sources
- Event 009 says the landlord approved £500+VAT with Harbour Compliance, but holds from 010 to 017 show we are still waiting on the landlord and mention 'Oakley's contractor'. I treated approval as unconfirmed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate, on hold. No written landlord decision; notes conflict (approved £500+VAT vs waiting / landlord's own contractor). Outstanding: the landlord's route decision.

**2. What is the next action, who is it for, and through which channel?**

Chase Jenkins (landlord) by SMS and email for a written answer by 17 March; update the tenant by email; hold to 17 March.

**3. Does anything need a human decision, and why?**

Not yet. This is a routine job and the landlord was chased on a second channel today. If still silent after 17 March, a phone attempt or escalation may be needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden at Flat 25, 185 Copperfield Walk (rubbis… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Record conflict: event 009 says landlord approved £500+VAT with Harbour Compliance, but … | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's written route decision (own c… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
