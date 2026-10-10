# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request has stalled for two months at the landlord gate; the landlord has not replied. I sent a clear yes/no approval request, updated the tenant, noted the conflict with the event 009 "approved" note and held the ticket to 18 March.

## Where the case stands
At landlord approval gate; on hold waiting for landlord, review 2025-03-18. No landlord decision recorded. Landlord silent since the 17 Jan email and 8 Feb email.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord a yes/no question: approve Harbour Compliance (£500+VAT quote) up to £600 inc VAT, or use own contractor | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: still awaiting landlord go-ahead, no date yet, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 18 March for landlord reply | Jenkins, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden at Flat 25, 185 Copperfield Walk: clear rubbish and construction waste, level the ground, lay gravel. Our notes show a £500 + VAT quote from Harbour Compliance, but we have no written approval from you. Please reply yes or no: do you approve Harbour Compliance doing this for up to £600 including VAT? Or tell us if you will use your own contractor. (£600)
> 
> Options: Yes, approve Harbour Compliance up to £600 inc VAT (recommended); I will arrange my own contractor (please give name and date); Decline

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. We are still waiting for the landlord's written go-ahead and have just sent them a clear yes/no question by a second route. We can't book the work until they answer, so I can't give a date yet. We'll chase again and update you by 18 March. Sorry for the delay.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The approval request does not authorise any spend or contractor
- The £500+VAT figure comes from an internal note; the quote document was not seen
- Tenant update gives no date

## Remaining work
- Landlord decision (agency, chase 18 March)
- If approved: record decision, assign Harbour Compliance, book visit
- If still silent after chase: escalate P2/P3 to maintenance

## Missing or unavailable information
- Landlord's written decision
- Tenant's garden photos (unavailable)
- Quote document

## Conflicts between sources
- Event 009 says the landlord approved the £500+VAT quote, but holds 010-017 and event 018 show we are still waiting for the landlord and no landlord words are on file. Treated as not approved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine garden job at the landlord approval gate. The landlord has not replied since January. An internal note says a £500+VAT Harbour Compliance quote was approved, but there is no landlord statement on file and later holds contradict it. Outstanding: the landlord's written decision.

**2. What is the next action, who is it for, and through which channel?**

Landlord Jenkins gets a yes/no approval request by email through the agency record (A1). The tenant is updated by email (A2). The ticket is held to 18 March (A3), when I will chase on a second channel.

**3. Does anything need a human decision, and why?**

Not yet. It is routine and the landlord's time has not run out on this fresh request. If the landlord is still silent after the 18 March chase, escalate to maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden at Flat 25, 185 Copperfield Walk: clear … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord yes/no on Harbour Compliance £5… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT, but holds 010-017 say still waiting… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
