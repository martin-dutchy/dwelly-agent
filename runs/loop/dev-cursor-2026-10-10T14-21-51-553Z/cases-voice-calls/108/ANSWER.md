# Case 108: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved their own contractor, Riverside Services, by phone and will pay them directly. I recorded the decision as own_contractor, noted the route, and emailed the landlord to confirm the unusually high £20,000 figure and the start date. The ticket is on hold until 7 Nov.

## Where the case stands
Stage init, on hold (review 2025-11-07). Landlord is using their own contractor Riverside Services (Freya) and paying directly; start date and quote figure outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked landlord to confirm the ~£20,000 figure (with the quote copy) and send Freya's start date by 7 Nov; noted our contractor won't be sent | Rowan, landlord | email | A3 ✅ |
| 2 | WAIT | Hold until 2025-11-07 awaiting landlord's reply | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Rowan (landlord) via email, agency landlord record** (verified)

> Hi Rowan, thanks for your call today. We've noted that you're using your own contractor, Riverside Services (Freya), for the weeds and hedge at Flat 26, 46 Copperfield Walk, and that you'll pay them directly. We won't send our own contractor. Two quick things please, by Friday 7 November: 1) Can you confirm the quote figure? You said about £20,000, which sounds high for this work, so we want to be sure it's right. A copy of Freya's quote would help. 2) Please send us Freya's confirmed start date once she has it. Also, as part of the area is shared or a strip of unowned land, please check you're entitled to have it cleared. Once the work is done, let us know and we'll close the job. Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording own_contractor does not approve any agency spend or verify the £20,000 figure
- No visit is booked; the start date is unconfirmed
- Does not establish who owns or is responsible for the shared areas or no man's land

## Remaining work
- Landlord to confirm quote figure and Freya's start date (agency follows up 2025-11-07)
- Close without payment once the landlord confirms the work is done

## Missing or unavailable information
- Quote document from Riverside Services (not seen)
- Start date
- Attachments from event 004 unavailable

## Conflicts between sources
- Events 007 and 022 name different people (Grace Nolan/Harper, Felix Kendall) than Rowan; treated as the landlord thread.
- Hold comments say the landlord was awaiting quotes while the ticket still shows approval required; the call at event 023 is the latest statement.
- Landlord said 'about' £20,000, which looks implausible for the scope; unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord chose their own contractor (Riverside Services/Freya) and pays directly. The start date and a verified quote figure are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to Rowan (landlord), already sent, asking for confirmation of the figure and Freya's start date by 7 Nov; ticket on hold with review on 7 Nov.

**3. Does anything need a human decision, and why?**

No. This is the landlord's own spend on their own contractor. If the £20,000 figure is confirmed and the shared-land ownership is doubtful, a human may want to review.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-108","decision":"own_contractor","evidence_quote":"Freya's quote came in yesterday, and I'm happy to go ahead and paying … | 1 | ✅ verified | Ticket NBL-108 read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-108","note":"Route: landlord's own contractor (Riverside Services, Freya), landlord pays directly; no agency contractor to be… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Rowan","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-108","body":"Hi… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-108","reason":"Waiting for Landlord","comment":"Landlord using own contractor (Riverside Services/Freya), paying directly… | 1 | ✅ verified | Ticket NBL-108 read back after put_on_hold |

## Failed or unverified actions
_None._
