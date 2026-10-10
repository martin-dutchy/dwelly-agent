# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The garden request has been stuck at the landlord gate since January. The records disagree on whether the £500+VAT quote was approved, and nothing from the landlord is on file. I texted the landlord a one-question yes/own-contractor request, updated the tenant, noted the conflict and put the job on hold to 17 March.

## Where the case stands
Landlord approval gate (stage init). No landlord decision recorded; on hold waiting for landlord, review 2025-03-17. Tenant chased on 13 Mar and has been updated.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS asking Jenkins for a yes (our contractor up to £500+VAT) or own-contractor name/date, by 17 March | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, nothing booked, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 17 March for landlord reply | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Maya at Northbridge Lettings re the back garden at Flat 25, 185 Copperfield Walk (rubbish removal, levelling, gravel). We have not had your reply by phone or email. Our notes show a £500+VAT quote, and also that a contractor may be coming via Oakley. Please reply by Mon 17 March with one answer: (a) YES, we instruct our contractor up to £500+VAT, or (b) you are arranging your own contractor (please send their name and a date). If your contractor has already attended or is booked, please say so, so work isn't done twice. Thanks.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing about the back garden. We're sorry for the wait. The garden work needs the landlord's decision, and we haven't been able to get a reply yet. We've just sent them a clear yes/no question by text and asked for an answer by Monday 17 March. Our records also suggest the landlord may be arranging their own contractor, and we're checking that. Nothing is booked yet and we can't give a date until they reply. We'll update you by Tuesday 18 March at the latest. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no spend approved; the £500+VAT note is not landlord authority.
- Messages do not establish that the garden work is the landlord's responsibility or that any date is booked.

## Remaining work
- Landlord to answer: our contractor or own contractor (and whether Oakley's contractor already attended).
- On reply, record decision, then assign Harbour Compliance or wait for the landlord's contractor date.
- If silent by 17 March, escalate (landlord unreachable since January).

## Missing or unavailable information
- Landlord's own words approving or declining.
- Garden photos unavailable.
- Whether Oakley's contractor attended after the 21 Feb call.

## Conflicts between sources
- Event 009 says the landlord approved the quote; holds 010-017 and event 018 say approval is still awaited. I treat it as not approved because there is no landlord quote on file.
- Events 015/016 point to Oakley's contractor, which suggests an own-contractor route, while event 009 names Harbour Compliance.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is at the landlord approval gate. No landlord decision is recorded. The £500+VAT 'approved' note (event 009) is unsupported, and holds suggest an own-contractor route via Oakley. The landlord's answer is outstanding.

**2. What is the next action, who is it for, and through which channel?**

An SMS to the landlord (A1) asking for a yes or own-contractor answer by 17 March, plus an email update to the tenant (A2). The job is held to 17 March (A4).

**3. Does anything need a human decision, and why?**

Not yet. Escalate if the landlord is still silent at the 17 March review, as they have been unreachable for weeks.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflicting records: event 009 note says £500+VAT quote approved by landlord (Harbour Co… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's yes (our contractor up to £50… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
