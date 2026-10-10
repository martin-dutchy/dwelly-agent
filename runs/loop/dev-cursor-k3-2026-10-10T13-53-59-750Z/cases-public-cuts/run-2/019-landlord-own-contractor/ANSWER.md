# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request has stalled for weeks awaiting the landlord, with conflicting notes on approval. I sent the landlord a second-channel SMS with a clear question and deadline, updated the tenant, and held the ticket with a review date.

## Where the case stands
Landlord approval gate; no landlord decision recorded; ticket on hold waiting for landlord, review 2025-03-17. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS asking landlord for a clear yes/no on our contractor up to £500+VAT or own contractor with name/date, by 17 March | Jenkins, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: awaiting landlord's written go-ahead, nothing booked, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply, review 17 March | Jenkins, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Northbridge Lettings re the back garden at Flat 25, 185 Copperfield Walk (rubbish removal, levelling, gravel). Our notes show a £500+VAT quote (Harbour Compliance) but we have no written go-ahead from you. Please reply by Mon 17 March: YES to approve our contractor at up to £500+VAT, or tell us if your own contractor (Oakley's contact?) is arranging it, with their name and a date. We'll also need funds up front for invoices. Thanks, Maya

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing, and sorry for the wait on the garden. We still need the landlord's written go-ahead and have just texted them again for a clear answer by 17 March. No work is booked yet. We'll update you by 18 March whatever happens.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval or contractor assignment is established
- The £500+VAT quote is only noted in history, not recorded or approved
- Nothing says the garden work is booked or who pays

## Remaining work
- Landlord decision (owner: landlord/Maya)
- If approved: record decision, assign contractor, book visit
- If no reply by 17 March: escalate P3 maintenance for landlord contact via other route

## Missing or unavailable information
- Landlord's written decision
- Garden photos (unavailable)
- Whether Oakley's contractor is landlord's own and whether they attended
- Written quote document

## Conflicts between sources
- Event 009 says landlord approved the quote; events 010-017 show no landlord contact and no approval. Treated as not approved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate. No written landlord decision; a note claims £500+VAT approval but nothing supports it. Landlord unreachable since Feb; tenant chased on 13 March.

**2. What is the next action, who is it for, and through which channel?**

SMS to the landlord for a yes/no or own-contractor details by 17 March; email update to the tenant; hold to 17 March.

**3. Does anything need a human decision, and why?**

Not yet. This is a routine chase. If the landlord stays silent after 17 March, escalate P3 for another contact route.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's written decision: our contrac… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A4 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT with Harbour Compliance; events 010-… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
_None._
