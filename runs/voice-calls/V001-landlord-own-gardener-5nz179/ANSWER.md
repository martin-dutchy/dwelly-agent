# Case V001-landlord-own-gardener-5nz179: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord confirmed by phone they will use their own contractor Riverside Services and pay directly. I recorded this as own_contractor, told the tenant, asked the landlord for the start date and written figure, and held to 7 Nov.

## Where the case stands
Landlord approved their own contractor (Riverside Services, Freya), paying directly; start date unconfirmed. Ticket on hold, review 2025-11-07, waiting on landlord.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Hold until 7 Nov for start date and written quote figure from landlord | Rowan, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant landlord is arranging own contractor, next update by 7 Nov | Tenant, Flat 26 | email | A2 ✅ |
| 3 | REQUEST_INFORMATION | Asked landlord for start date and written quote figure by 7 Nov | Rowan, landlord | email | A3 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant, Flat 26 (tenant) via email, existing thread (event 001 request)** (verified)

> Hello, an update on the communal garden and hedge. Your landlord has said they are arranging their own contractor (Riverside Services) to do the work. The start date has not been confirmed yet; the contractor is due to confirm it with the landlord, possibly around the weekend. We will check on progress and update you by Friday 7 November.

**A3 · send_message → Rowan (landlord) via email, agency landlord record** (verified)

> Hi Rowan, thanks for your call. We have noted that you are using your own contractor, Riverside Services (Freya), and paying them directly, so we won't send ours. Could you reply by Friday 7 November with: (1) the confirmed start date once Freya gives it, and (2) the quote figure in writing, as you said about £20,000 on the call and we want to be sure we've recorded it correctly. We've told the tenant you're arranging this.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the decision does not confirm a start date, the work scope, or that the £20,000 figure is accurate.
- Agency is not paying or approving spend; landlord pays directly.

## Remaining work
- Landlord/Freya to confirm start date
- Confirm quote figure in writing
- After completion, confirm with tenant and close without payment

## Missing or unavailable information
- Start date
- Written quote
- Two attachments from event 004 unavailable
- Whether the 'no man's land' strip is in scope

## Conflicts between sources
- Event 024 and the hint suggest a quote awaiting approval, but the call shows the landlord is using their own contractor.
- Events 007 and 022 name different people (Grace Nolan/Harper, Felix Kendall); treated as summary noise, with the landlord's own call as authority.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approved own contractor (Riverside Services) paying directly; start date and written quote outstanding; work not yet done.

**2. What is the next action, who is it for, and through which channel?**

Wait with review on 7 Nov; landlord asked by email for date and quote figure; tenant updated by email.

**3. Does anything need a human decision, and why?**

No. Landlord pays directly, so no agency spend; the odd £20,000 figure is queried with the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-V001-landlord-own-gardener-5nz179","decision":"own_contractor","evidence_quote":"Freya's quote came in yesterday, and I'm… | 1 | ✅ verified | Ticket NBL-V001-landlord-own-gardener-5nz179 read back after record_landlord_decision |
| A2 | `send_message` | {"recipient_name":"Tenant, Flat 26","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 request)","body":"Hell… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Rowan","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Hi Rowan, thanks for your… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-V001-landlord-own-gardener-5nz179","reason":"Waiting for Landlord","comment":"Landlord using own contractor Riverside Ser… | 1 | ✅ verified | Ticket NBL-V001-landlord-own-gardener-5nz179 read back after put_on_hold |

## Failed or unverified actions
_None._
