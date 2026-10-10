# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden works request is stuck at the landlord gate; the landlord has been silent for weeks. I sent a clear yes/no approval request, updated the tenant, noted the record conflict and set a hold and follow-up for 17 March.

## Where the case stands
At landlord approval gate, ticket in init, on hold waiting for landlord. No recorded landlord decision; landlord has not replied since January. Tenant chased on 13 March.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a clear yes/no on the £500+VAT quote or own contractor | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord, no date, next update by 18 March | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold and follow-up to 17 March; phone chase then | Landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Tenant is chasing garden clearance, levelling and gravel at Flat 25 (rubbish removal, levelling, gravel). Our notes mention a £500 + VAT quote from Harbour Compliance, but we hold no written approval from you. Do you approve that quote (yes/no), or will you use your own contractor? (£600)
> 
> Options: Yes, approve our contractor's £500 + VAT quote (£600 inc VAT); I'll arrange my own contractor (please send name and date); Decline the work

**A3 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. We're sorry for the wait. We still need the landlord's decision before any work can be booked, and we've just sent them a clear yes/no question. We'll update you by Tuesday 18 March, whether or not we've heard back. We can't give a work date yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The approval request does not authorise spend or a contractor
- Nothing is booked; no date promised to tenant
- The £500+VAT figure comes from an internal note; the quote document was not seen

## Remaining work
- Landlord decision (owner: landlord/Maya)
- Record decision, then assign Harbour Compliance or await own contractor
- Phone chase 17 March; escalate P2 if still silent

## Missing or unavailable information
- Landlord's written decision
- Garden photos unavailable
- Quote document not seen

## Conflicts between sources
- Event 009 says landlord approved, but the ticket shows approval required and holds say still waiting; trusted the system record.
- Landlord is called Jenkins in emails but Oakley in notes.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Waiting on the landlord's decision. Event 009 claims approval of a £500+VAT quote, but there is no landlord words on file and later holds contradict it, so I treat it as not approved. Outstanding: the decision, then contractor assignment, visit and completion.

**2. What is the next action, for whom, via which channel?**

Landlord approval request (APR-101) to the landlord via the agency landlord record, and an email update to the tenant. Phone chase on 17 March.

**3. Does anything need a human decision?**

Not yet. This is a routine job and the landlord was only chased once. If the landlord stays silent after the 17 March chase, escalate to maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Tenant is chasing garden clearance, levelling and gr… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT quote, but no landlord words on file… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord yes/no on approving £500+VAT qu… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-17","party":"Landlord","purpose":"Chase landlord by phone if no answer; up… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
