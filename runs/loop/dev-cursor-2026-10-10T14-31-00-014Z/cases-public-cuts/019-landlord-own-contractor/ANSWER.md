# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden job has stalled since January because the landlord never answered, and notes conflict on approval versus own contractor. I sent the landlord a single clear question by SMS with a reply-by date, updated the tenant, put the job on hold with a review date and noted the conflict.

## Where the case stands
Landlord approval gate; ticket at init. Landlord has never replied; records conflict on whether approval or own-contractor route applies. Held waiting for landlord, review 2025-03-17.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Text landlord a one-question choice (approve Harbour Compliance £500+VAT or own contractor, and whether anyone has attended), reply by 17 March | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord decision, nothing booked, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 17 March review | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Maya's colleague at Northbridge re Flat 25, 185 Copperfield Walk (back garden clearing, levelling and gravel). Our notes conflict: one says you approved a £500+VAT quote with Harbour Compliance, another suggests your own contractor (Oakley's) may quote. Please reply by Mon 17 March: (1) do you approve our contractor Harbour Compliance at £500+VAT, or (2) are you arranging your own contractor (name and date please, and has anyone already attended)? The tenant is chasing. We won't book anyone until we hear from you.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing, and sorry for the wait on the garden. We still need the landlord's decision on who carries out the work and haven't been able to reach them by phone; we've now messaged them by text with a reply-by date of Monday 17 March. Nothing is booked yet, so we can't give a visit date. We'll update you by Tuesday 18 March at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no approval recorded; the event 009 note is not the landlord's own words.
- Messages do not establish the landlord's route, cost or any date.

## Remaining work
- Landlord reply by 17 March; then record decision and assign or await own contractor
- If still silent on 17 March, chase by phone/email and consider P3 escalation to maintenance
- Photos of garden unavailable; request if needed

## Missing or unavailable information
- Landlord's explicit decision
- Whether Oakley's/own contractor attended or quoted
- Garden photos

## Conflicts between sources
- Event 009 says landlord approved £500+VAT with Harbour Compliance, but no landlord words are on record and later events (015, 016) refer to Oakley's contractor and the landlord not calling back. Treated as unapproved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate with no recorded landlord decision. The landlord's route is unclear (approved £500+VAT per a note vs own contractor), and the tenant is waiting.

**2. What is the next action, who is it for, and through which channel?**

SMS to the landlord asking them to choose a route by 17 March (done), and an email update to the tenant (done). Hold until 17 March.

**3. Does anything need a human decision, and why?**

Not yet. Routine chasing is under way. If the landlord is still silent after 17 March, escalate P3 to maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's answer: approve Harbour Compl… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 (31 Jan) says landlord approved £500+VAT, Harbour Compliance; event … | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
