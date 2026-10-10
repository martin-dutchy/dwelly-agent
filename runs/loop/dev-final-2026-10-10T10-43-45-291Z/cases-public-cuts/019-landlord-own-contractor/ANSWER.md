# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden clearance request has been stuck since January awaiting the landlord, who has not answered calls. I sent a written approval request to the landlord, updated the tenant, and set the hold and a follow-up for 20 March.

## Where the case stands
Stage init, on hold (Waiting for Landlord, review 2025-03-20). No contractor assigned, no visit booked, no recorded landlord decision. Waiting on Jenkins.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Written request to landlord to approve the £500+VAT quote, arrange their own contractor, or decline | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant on the chase, with no date promised | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold and follow-up until 20 March, then chase and escalate if still silent | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Please confirm in writing how you want the back garden at Flat 25 dealt with (rubbish removal, levelling, gravel). Our notes say a £500+VAT quote was approved on 31 Jan, but we have no written confirmation and have not been able to reach you by phone. We also need to know whether you will fund the invoice up front. (£600)
> 
> Options: Approve the £500 + VAT quote (£600 incl. VAT) and we instruct the contractor; You arrange your own contractor and tell us when and how the tenant gives access; Decline the work, and we tell the tenant; Reply by email or give us a call-back number and time

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for calling today about the back garden. We're sorry for the wait. We've asked the landlord again, in writing, to confirm the work and how it will be arranged, as we can't book anything until they do. We'll update you as soon as we hear, and we're reviewing this again on 20 March. We can't promise a date yet. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The approval request does not mean the landlord has approved anything or agreed to pay.
- The tenant message does not commit to a date or cost.
- No contractor has been assigned or visit booked.

## Remaining work
- Landlord decision (owner: Maya Palmer/property manager)
- Confirm contractor, since the notes name Harbour Compliance, which seems an odd choice for garden work
- Confirm up-front funding for invoices
- Chase on 20 March; escalate to management if no reply

## Missing or unavailable information
- No landlord contact details on the property record
- Garden photos unavailable
- No written landlord approval; the £500+VAT approval only appears in an internal note
- No documented quote

## Conflicts between sources
- Note says the landlord approved the £500+VAT quote, but the hold notes say the landlord is still not reachable and funds are needed first. I treated approval as unconfirmed.
- Contractor named is Harbour Compliance, which does not obviously match garden work. Unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine job at intake stage and on hold. The landlord decision is not formally recorded. An internal note says a £500+VAT quote was approved, but there is no written proof, and the landlord has not called back. Funding up front is also unresolved.

**2. What is the next action, who is it for, and through which channel?**

Written approval request to the landlord (Jenkins) by email, plus a tenant update by email on the existing thread. Chase on 20 March.

**3. Does anything need a human decision, and why?**

Not yet. The decision belongs to the landlord. If the landlord is still silent on 20 March, escalate to management for an alternative contact route.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Please confirm in writing how you want the back gard… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hello, thanks f… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Written approval/decision requested from Jenkins … | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-20","party":"Jenkins, landlord","purpose":"Chase landlord decision on gard… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
