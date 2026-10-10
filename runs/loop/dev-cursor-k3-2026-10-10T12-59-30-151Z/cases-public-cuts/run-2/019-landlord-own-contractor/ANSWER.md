# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The garden request has been stuck at landlord approval for about two months. The landlord has not answered the earlier email or call attempts. I chased on a second channel (SMS) and sent a formal yes/no approval request. I updated the tenant and set a hold with a review date of 17 March.

## Where the case stands
Landlord approval gate. The landlord has not given a usable answer since 17 Jan. The ticket is on hold, waiting for the landlord, with review on 2025-03-17.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Chased by SMS and sent a formal approval request asking for a yes/no on Harbour Compliance (£500+VAT) or their own contractor | Jenkins, landlord | sms | A2 ✅ |
| 2 | REPLY_TO_TENANT | Told the tenant the work is waiting on the landlord, with no date, next update by 17 March; asked for the photos again | Tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 17 March for the landlord's reply | Jenkins, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Garden clearance, levelling and gravel at Flat 25, 185 Copperfield Walk, requested by tenant. Our notes mention a £500 + VAT quote from Harbour Compliance, but we have no written approval from you on file. Please reply yes or no: may we instruct Harbour Compliance up to £600 incl. VAT? Or will you arrange your own contractor (name and date please)?
> 
> Options: Yes, instruct Harbour Compliance (£500 + VAT); I will arrange my own contractor; Decline the work

**A2 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Maya at Northbridge Lettings. We've emailed and tried calling about the garden work at Flat 25, 185 Copperfield Walk. Please reply YES to have us instruct Harbour Compliance (quoted £500 + VAT), or tell us if you'd rather use your own contractor. The tenant is chasing. Thanks.

**A3 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the garden. We're still waiting for the landlord to confirm how they want this handled. We've just chased them again by text and email. We can't book work until they answer, so I can't give a date yet. We'll update you by 17 March at the latest. Also, your photos didn't reach us, so please resend them if you can.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved, and no contractor is assigned or booked.
- The chase does not establish that the £500+VAT quote was ever approved.
- The tenant's request that the garden is the landlord's responsibility is unchecked.

## Remaining work
- Landlord decision, owned by the agency chasing. On 17 March: if there is still no reply, escalate P2 to maintenance (landlord silent beyond 3 days after a second-channel chase).
- Record the landlord's decision when it arrives, then assign Harbour Compliance or collect the own-contractor details.
- Obtain the tenant's photos.
- Funds up front for invoices, per the event 010 note.

## Missing or unavailable information
- Landlord's written decision
- Tenant photos (unavailable)
- Quote document from Harbour Compliance (only the note in event 009 exists)

## Conflicts between sources
- Event 009 says the landlord approved the quote, but later holds say the agency is still waiting for the landlord and no landlord words are on file. I trusted the later holds and treated the job as unapproved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is at the landlord approval gate. The landlord has never replied. The £500+VAT approval noted in event 009 is not backed by landlord words, so it is treated as unapproved. The landlord decision and the tenant photos are still outstanding.

**2. What is the next action, who is it for, and through which channel?**

The landlord has been chased by SMS and sent an approval request. The tenant has been updated by email. The ticket is on hold until 17 March.

**3. Does anything need a human decision, and why?**

Not yet. This is a routine job and a second-channel chase has only just gone out. If the landlord is still silent on 17 March, escalate P2 to maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","decision_needed":"Garden clearance, levelling and gravel at Flat 25, 185 Copperfield Walk, requested by tenant. Our n… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Waiting for landlord's clear yes/no on Harbour Co… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT quote (Harbour Compliance), but no l… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
