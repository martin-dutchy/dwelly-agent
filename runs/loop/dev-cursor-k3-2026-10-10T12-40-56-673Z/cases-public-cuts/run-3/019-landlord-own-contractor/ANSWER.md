# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine garden job has been stuck at landlord approval since January; landlord never replied. A note claims approval of £500+VAT but there is no landlord wording, so I treated it as unapproved. I asked the landlord for a clear decision, updated the tenant and set a hold to 18 March.

## Where the case stands
Landlord approval gate; no verified landlord decision. Waiting on landlord (hold to 2025-03-18). No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a written yes/no on Harbour Compliance £500+VAT (or own contractor) | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, nothing booked, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 18 March, then chase on another channel | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Please confirm yes or no: do you approve Harbour Compliance doing the back garden clearance, levelling and gravel at the quoted £500 + VAT? Our notes say this was agreed on 31 Jan but we have no written confirmation, and we have not been able to reach you by phone or email. (£600)
> 
> Options: Yes, approve Harbour Compliance up to £500 + VAT (agency recommendation); I will arrange my own contractor; No, decline

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. We're still waiting for the landlord to confirm in writing that the work can go ahead, and we've just sent them a clear yes/no request on another channel. Nothing is booked yet, so we can't give a date. We'll chase again and update you by 18 March. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or booked; the request does not establish landlord consent
- Tenant message gives no date
- Garden photos not seen

## Remaining work
- Landlord reply to be recorded via record_landlord_decision
- Then assign contractor or follow own-contractor route
- If silent at 18 March: phone/SMS chase and consider P2 escalation to maintenance
- Funds up front for invoices per event 010

## Missing or unavailable information
- Landlord's written decision
- Garden photos (unavailable)
- Landlord's contact reachable by phone

## Conflicts between sources
- Event 009 says landlord approved; events 010-018 show no landlord response and ongoing attempts to reach them. Treated as unapproved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate. Landlord has not replied since Jan; the 31 Jan approval note is unevidenced. Outstanding: landlord decision, contractor assignment, visit, work.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (APR-101) to Jenkins via the agency landlord record, and a tenant update by email; hold to 18 March.

**3. Does anything need a human decision, and why?**

Not yet. It is routine, and the landlord is still within a fresh chase window. If still silent on 18 March, escalate to maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","decision_needed":"Please confirm yes or no: do you approve Harbour Compliance doing the back garden clearance, levell… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Waiting for landlord's written yes/no on Harbour … | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT with Harbour Compliance, but events … | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
