# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine garden job stuck at landlord gate for two months; landlord has never replied. A note says £500+VAT was approved, but there is no landlord wording on record and later holds contradict it. I sent a clear yes/no request, updated the tenant, and set a hold to 17 March.

## Where the case stands
At landlord approval gate, on hold waiting for landlord; review 2025-03-17. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord yes/no on Harbour Compliance £500+VAT or own contractor | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, nothing booked, next update by 17 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2025-03-17 then chase landlord by phone/SMS | Jenkins, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden at Flat 25, 185 Copperfield Walk (clear rubbish, level ground, gravel). Our notes show a £500 + VAT quote from Harbour Compliance, but we have no written approval from you. Please reply yes or no: may we instruct Harbour Compliance at £500 + VAT? Or tell us if you will use your own contractor. (£600)
> 
> Options: Yes, instruct Harbour Compliance at £500 + VAT; I will arrange my own contractor (please give name and date); Decline the works

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing and sorry for the wait. We still need the landlord's written go-ahead for the garden work, and we have not yet had a reply. We have sent them a clear yes/no question today. Nothing is booked yet and we can't give a date until they answer. We will update you by Monday 17 March at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The request does not approve spend or instruct a contractor.
- Nothing is booked; no date is promised to the tenant.

## Remaining work
- Obtain landlord's explicit decision and record it
- Then assign contractor or record own contractor
- Chase landlord on 17 March via a second channel

## Missing or unavailable information
- Landlord's written decision
- Garden photos unavailable
- Whether Harbour Compliance quote is documented

## Conflicts between sources
- Event 009 says landlord approved £500+VAT with Harbour Compliance, but later holds say still waiting for landlord and no landlord words are on record; treated as unapproved.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Landlord approval gate; no recorded landlord decision; the note of approval at event 009 is unverified. Outstanding: landlord decision, then contractor and visit.

**2. What is the next action, who for, which channel?**

Landlord yes/no approval request by email (A1); tenant updated by email (A2); hold to 17 March (A3), then chase by phone/SMS.

**3. Does anything need a human decision?**

Not yet. Escalate only if the landlord stays silent after the 17 March chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden at Flat 25, 185 Copperfield Walk (clear … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Asked landlord for a yes/no on Harbour Compliance… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
