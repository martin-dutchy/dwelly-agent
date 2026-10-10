# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The landlord replied to the contractor question with only a thumbs-up. I recorded it as unclear and asked a clear yes/no question. I updated the tenant and put the job on hold until 2024-03-29.

## Where the case stands
Intake/landlord gate. No provider assigned. Landlord's reply was a thumbs-up only, so there is no usable approval. Waiting on the landlord; on hold until 2024-03-29. Tenant photos are still outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord one yes/no question: may we send our contractor, or will they arrange their own? | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update the tenant: waiting on the landlord, photos still helpful, electric safety advice, next update by 2024-03-29. | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold and follow-up until 2024-03-29, then chase the landlord on a second channel. | Freya, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Thanks for your reply, Freya. A thumbs-up isn't enough for us to go ahead. Yes or no: may we send our contractor to repair the leaking shower cable/hose at Flat 14, 44 Lantern Quay? (Reply "yes, send your contractor", or tell us if you'll arrange your own.)
> 
> Options: Yes, send your contractor (recommended); No, I will arrange my own contractor

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting for the landlord to confirm how the repair will be arranged; we've asked them again for a clear answer. Photos of the damaged cable and the leak would still help. If it's an electric shower and water is near the electrics, please switch it off at the isolator and don't use it. We'll update you by 2024-03-29 at the latest. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The thumbs-up is not approval, so no contractor is assigned and no spend is committed.
- The cause and severity of the leak are unconfirmed until photos arrive.
- No visit is booked.

## Remaining work
- Landlord to give a clear yes or no (agency, chase by 2024-03-29)
- Tenant to send photos
- Assign a contractor once approved

## Missing or unavailable information
- Clear landlord decision
- Photos of the damage
- Whether the shower is electric

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is at intake with no provider assigned. The landlord's approval is unclear (thumbs-up only) and tenant photos are outstanding.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval request to the landlord by email (A2), and a tenant update by email (A3). The follow-up is on 2024-03-29.

**3. Does anything need a human decision, and why?**

No. This is routine: ask, hold and chase. If the landlord stays silent after the second-channel chase, escalate as P2.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"NBL-037-landlord-thumbs-up","decision_needed":"Thanks for your reply, Freya. A thumbs-up isn't enough for … | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-037-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with a thumbs-up only (unclear); awai… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-037-landlord-thumbs-up","due_on":"2024-03-29","purpose":"Chase landlord for clear approval on a second channel if no repl… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
