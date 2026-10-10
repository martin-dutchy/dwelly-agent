# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Garden request has stalled for two months awaiting the landlord. The note claiming approval has no landlord words behind it, so I treated it as unapproved. I sent a yes/no approval request by email and an SMS chase, updated the tenant, and held the ticket to 18 March.

## Where the case stands
Landlord approval gate. No landlord decision recorded; landlord silent since Jan. Agency waiting on landlord; on hold, review 18 Mar 2025.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve £500+VAT quote or say they'll use their own contractor | Jenkins, landlord | email | A1 ✅ |
| 2 | CHASE_LANDLORD | SMS chase on second channel with yes/no question | Jenkins, landlord | sms | A2 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant: waiting on landlord, no date promised, next update by 18 March | Tenant | email | A3 ✅ |
| 4 | WAIT | Hold waiting for landlord, review 18 Mar | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Garden clearance, levelling and gravel at Flat 25, 185 Copperfield Walk (tenant request since 17 Jan). Our notes mention a £500 + VAT quote from Harbour Compliance, but we hold no written approval from you. Do you approve us instructing that quote, up to £600 including VAT? Please reply yes or no, or tell us if you will use your own contractor. (£600)
> 
> Options: Yes, approve the £500 + VAT quote (up to £600 inc VAT) with our contractor; I will arrange my own contractor (please send name and date); No, do not proceed

**A2 · send_message → Jenkins (landlord) via sms, agency landlord record** (verified)

> Hi Jenkins, Maya's team here. We've emailed about the garden clearance at Flat 25, 185 Copperfield Walk and couldn't reach you by phone. Please reply YES to approve our contractor (quote £500 + VAT), or tell us if you'll use your own. Thanks.

**A3 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing and sorry for the wait. We still need the landlord's decision on the garden work. We've now emailed and texted them a clear yes/no question. Once they answer we'll tell you the next step; we can't confirm a date until then. We'll update you by 18 March whatever happens.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or assigned; the £500+VAT quote is not authorised
- No visit is booked and no date promised to the tenant
- The garden's condition and tenancy responsibility for it are not established; photos unavailable

## Remaining work
- Landlord reply needed; record decision with exact words
- If silent at 18 Mar, escalate P2 maintenance
- Obtain the Harbour Compliance quote document and photos
- Agency to confirm funds up front per event 010

## Missing or unavailable information
- Landlord's written decision
- Garden photos (unavailable)
- Quote document itself

## Conflicts between sources
- Event 009 says landlord approved the quote, but no landlord words exist and later events show still waiting; treated as not approved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate; no recorded landlord decision. Outstanding: landlord yes/no (our contractor at £500+VAT, own contractor, or no), then assignment and visit.

**2. What is the next action, who is it for, and through which channel?**

Approval request by email and SMS chase to the landlord; tenant update by email; hold to 18 March.

**3. Does anything need a human decision, and why?**

Not yet. Routine chase is under way; escalate P2 if the landlord is still silent after 18 March.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","decision_needed":"Garden clearance, levelling and gravel at Flat 25, 185 Copperfield Walk (tenant request since 17 Ja… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Jenkins","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-019-landlord-ow… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord yes/no on £500+VAT quote or own… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT, but no landlord words on file and e… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
