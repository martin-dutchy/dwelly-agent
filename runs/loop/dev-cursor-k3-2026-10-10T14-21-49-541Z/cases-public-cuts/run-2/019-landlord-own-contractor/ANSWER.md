# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Routine garden job stalled at landlord gate for two months; notes conflict on whether £500+VAT was approved. No decision recorded, so I sent the landlord a yes/own-contractor SMS with a 17 March deadline, updated the tenant, and set a dated hold.

## Where the case stands
Landlord approval gate; no recorded landlord decision; on hold waiting for landlord, review 17 Mar 2025. Tenant chasing.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS asking for a yes (our contractor, capped) or own-contractor answer by 17 March | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: nothing booked, awaiting landlord, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 17 March | Jenkins, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Northbridge Lettings re the back garden at Flat 25, 185 Copperfield Walk (rubbish removal, levelling, gravel). Our notes say a £500+VAT quote was agreed, but we have no written approval from you and notes suggest a contractor of yours may be involved. Please reply by Mon 17 March with one of: (1) YES, use our contractor, up to £600 incl. VAT; or (2) NO, I'm arranging my own contractor (name and date please, and say if they've already attended). The tenant is chasing. Thank you.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing, and sorry for the wait on the garden. We are still waiting for the landlord to confirm who will do the work and to approve it, so no contractor or date is booked yet. We have just sent the landlord a text asking for an answer by Monday 17 March, and we will update you by Tuesday 18 March whatever happens.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no spend approved
- The £500+VAT note is not landlord authority
- Messages do not establish the landlord has agreed anything

## Remaining work
- Landlord decision (ours vs own contractor, cap)
- If own contractor: name, date, whether already attended
- Garden photos unavailable; get from mailbox/tenant if needed
- Property manager to review 17 Mar; escalate P3 if still silent

## Missing or unavailable information
- Landlord's written decision
- Garden photos
- Whether Harbour Compliance or Oakley's contractor has attended

## Conflicts between sources
- Event 009 says landlord approved the £500+VAT quote; events 010-017 and 018 say approval is still awaited. Treated as unapproved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At landlord approval gate; no recorded landlord decision despite a note of a £500+VAT quote approved. Outstanding: landlord's clear decision/route.

**2. What is the next action, who is it for, and through which channel?**

SMS to landlord Jenkins for a decision by 17 March; email update to tenant; hold with review 17 March.

**3. Does anything need a human decision, and why?**

Not yet. Routine; escalate P3 if landlord remains silent after 17 March.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Need landlord's written decision: our contractor … | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT with Harbour Compliance; events 010-… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
