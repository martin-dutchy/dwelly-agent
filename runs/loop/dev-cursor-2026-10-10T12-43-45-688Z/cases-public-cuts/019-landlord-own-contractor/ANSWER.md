# Case 019: Garden Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The garden request has been stuck at the landlord gate since January. The landlord hasn't replied to the earlier email or call. I sent a fresh yes/no approval request, updated the tenant, and put the ticket on hold with a review on 17 March.

## Where the case stands
Landlord approval gate; no landlord decision on record in about 8 weeks. Ticket on hold, waiting for landlord, review 2025-03-17. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord a single yes/no: instruct Harbour Compliance (£500+VAT) or own contractor | Jenkins, landlord | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant on status and next contact date 17 March | Tenant | email | A2 ✅ |
| 3 | WAIT | Wait for landlord until 17 March, then chase | Jenkins, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Jenkins (landlord)** (verified)

> Back garden at Flat 25, 185 Copperfield Walk: tenant asks for rubbish removal, levelling and gravel. Our notes show a £500+VAT quote (Harbour Compliance) mentioned on 31 Jan, but we have no written approval from you. Do you approve us instructing Harbour Compliance up to £600 incl. VAT (yes/no), or will you use your own contractor?
> 
> Options: Yes, instruct Harbour Compliance (£500 + VAT, £600 incl. VAT cap); I will arrange my own contractor (please give name and date); No, not doing the works

**A2 · send_message → Tenant (tenant) via email, existing thread (event 004 email)** (verified)

> Hello, thanks for chasing about the back garden. We're sorry for the wait. We still don't have the landlord's written go-ahead, so no contractor is booked yet. Today we've sent the landlord a clear yes/no question by a second route and will chase again on 17 March. We'll update you by then, whatever the answer.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves spend or assigns a contractor
- The £500+VAT quote is only a note, not a recorded landlord approval
- Tenant told no date for the works

## Remaining work
- Landlord decision (maintenance owner chases 17 Mar; escalate P3 if still silent)
- Then assign contractor or record own contractor
- Garden photos unavailable; request again if needed

## Missing or unavailable information
- Landlord's written decision
- Garden photos (unavailable)

## Conflicts between sources
- Event 009 says the landlord approved the quote, but later holds say we are still waiting for approval. I treated it as not approved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is waiting at the landlord approval gate. There is no recorded landlord decision. The note about a £500+VAT quote being approved is unsupported. The landlord has been silent since January.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval request has been sent to the landlord (APR-101). The tenant has been updated by email on the existing thread. Chase on 17 March.

**3. Does anything need a human decision, and why?**

Not yet. This is a routine job and the chase cadence is running. If the landlord is still silent after 17 March, escalate P3.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Jenkins","ticket_ref":"NBL-019-landlord-own-contractor","decision_needed":"Back garden at Flat 25, 185 Copperfield Walk: tenant… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-019-l… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-019-landlord-own-contractor","note":"Conflict: event 009 says landlord approved £500+VAT quote, but no landlord words recorde… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-019-landlord-own-contractor","due_on":"2025-03-17","party":"Landlord (Jenkins)","purpose":"Chase landlord decision; if st… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-019-landlord-own-contractor","reason":"Waiting for Landlord","comment":"Awaiting landlord yes/no on instructing our contr… | 1 | ✅ verified | Ticket NBL-019-landlord-own-contractor read back after put_on_hold |

## Failed or unverified actions
- A4: API reported an error but read-back showed follow-up FUP-104 in place; not retried.
