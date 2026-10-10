# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approval has been outstanding since January; the note saying a £500+VAT quote was approved has no landlord words behind it, and the holds say we are still waiting for a call-back. I sent the landlord one explicit question with a 17 March deadline, updated the tenant, noted the conflict and put the job on hold with a review date.

## Where the case stands
At landlord approval gate; on hold waiting for landlord until 2025-03-17. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for explicit yes/no on Harbour Compliance £500+VAT, or own-contractor name and date, by 17 March | Jenkins, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: no contractor booked, awaiting landlord, next update by 18 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2025-03-17 for landlord reply | Jenkins, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden at Flat 25, 185 Copperfield Walk: tenant asks for rubbish removal, levelling and gravel. Our notes say a £500 + VAT quote was approved and Harbour Compliance was to go ahead, but we have no written confirmation from you, and a contractor via Oakley was also mentioned. Please reply by 2025-03-17 with a yes or no: do you approve us instructing Harbour Compliance at £500 + VAT (£600 incl. VAT)? Or, if you are using your own contractor, please give their name and a date. (£600)
> 
> Options: Yes, instruct Harbour Compliance at £500 + VAT; I will arrange my own contractor (name and date please); Decline the work

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thank you for chasing, and sorry for the wait on the garden. We still need the landlord's written go-ahead, so no contractor is booked yet. We have sent them a clear yes/no question today and asked for a reply by 17 March. We will update you by 18 March at the latest, and sooner if they reply.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking does not approve spend or establish the landlord's route
- Nothing tells the tenant a visit is booked
- The note-based approval in event 009 is not treated as landlord authority

## Remaining work
- Landlord decision (record with exact words), then assign contractor or record own-contractor route
- If no reply by 17 March: chase on a second channel (phone/SMS) and escalate P2 if still silent
- Garden photos were unavailable and not seen

## Missing or unavailable information
- Landlord's written decision
- Garden photos
- Whether Oakley's contractor is the landlord's own contractor

## Conflicts between sources
- Event 009 says the landlord approved the £500+VAT quote, but later holds say we are still waiting for the landlord to call back. No landlord words are on record, so I treated approval as unconfirmed.
- Events 015-016 mention a contractor through Oakley, which may mean the landlord's own contractor.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is at the landlord approval gate. Landlord approval has not been confirmed in the landlord's own words, and no contractor is assigned. The tenant has been waiting since January.

**2. What is the next action, who is it for, and through which channel?**

A clear approve / own-contractor question to the landlord (Jenkins) via the landlord record contact, reply needed by 17 March. The tenant has been updated by email on the existing thread.

**3. Does anything need a human decision, and why?**

Not yet. The landlord's decision is theirs to make. If they stay silent past 17 March and a second-channel chase, escalate P2 to maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden at Flat 25, 185 Copperfield Walk: tenant… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hello, thank yo… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT with Harbour Compliance, but no land… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord's explicit approval of Harbour … | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
_None._
