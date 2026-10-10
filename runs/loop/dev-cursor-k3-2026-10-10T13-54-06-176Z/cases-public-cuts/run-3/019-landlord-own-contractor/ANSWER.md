# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden job stalled at landlord gate for ~2 months with conflicting notes about approval and route. I asked the landlord one clear question by SMS (plus formal request), updated the tenant, noted the conflict and held to 18 March.

## Where the case stands
Intake/landlord gate; on hold (waiting for landlord) until 2025-03-18. No contractor assigned, no visit booked, no recorded landlord decision.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS asking one question: instruct Harbour Compliance (£500+VAT) or own contractor (name/date/attended), reply by 18 March | Jenkins, landlord | sms | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant what is pending, nothing booked, next update by 18 March | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 18 March for landlord reply | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden clearance, levelling and gravel at Flat 25, 185 Copperfield Walk: our notes show both a £500+VAT quote (Harbour Compliance) and a contractor arranged via Oakley, and we can't tell which route you want. Please reply by 18 March: should we (a) instruct Harbour Compliance up to £500+VAT, or (b) leave it to your own contractor (please give their name and a date, and say whether they have already visited)?
> 
> Options: (a) Instruct Harbour Compliance, up to £500 + VAT; (b) Landlord's own contractor via Oakley: name and date please, and whether they have attended

**A2 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Maya's team here re the back garden at Flat 25, 185 Copperfield Walk. Emails/calls haven't reached you. One question please, by 18 March: shall we instruct Harbour Compliance (quote £500+VAT), or will your own contractor handle it? If your own, please send their name and date and say if they've already visited. Thanks.

**A3 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. We are still waiting for the landlord to confirm whether we instruct our contractor or they arrange their own; we've just messaged them again by text and asked for an answer by 18 March. Nothing is booked yet and we can't give a date until they decide. We'll update you by 18 March at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves spend or instructs a contractor
- The £500+VAT quote note is not landlord authority
- No visit or date is confirmed
- Does not establish whether the landlord's own contractor has attended

## Remaining work
- Landlord decision (owner: landlord/Maya) by 18 March
- Then record decision and assign Harbour or await own contractor details
- If still silent on 18 March, review and consider escalation

## Missing or unavailable information
- Landlord's explicit decision/route
- Garden photos unavailable
- Whether Oakley's contractor attended or quoted

## Conflicts between sources
- Event 009 says landlord approved the £500+VAT Harbour Compliance quote, but later holds say approval is still awaited and landlord-side contractor (Oakley) is involved; treated as unapproved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate, unapproved. Outstanding: landlord's choice between Harbour Compliance (£500+VAT) and their own contractor (Oakley route); no quote approval, assignment or visit.

**2. What is the next action, who is it for, and through which channel?**

SMS to the landlord (A2) asking which route, reply by 18 March; tenant updated by email (A3); hold review 18 March (A5).

**3. Does anything need a human decision, and why?**

Not yet. Routine job, and a second-channel chase has just gone out. If the landlord stays silent at the 18 March review, consider escalating.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden clearance, levelling and gravel at Flat … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","body":"Hi Jenkins, Maya's team h… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hello, thanks f… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT with Harbour Compliance; no landlord… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's choice: Harbour Compliance £5… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
