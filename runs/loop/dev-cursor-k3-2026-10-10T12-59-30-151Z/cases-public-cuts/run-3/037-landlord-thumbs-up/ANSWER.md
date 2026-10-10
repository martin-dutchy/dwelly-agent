# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord replied only with a 👍 to a two-option question, which is not usable authority. Recorded it as unclear, asked a single yes/no question, updated the tenant and put the job on hold until 29 March.

## Where the case stands
Intake/landlord gate. No provider assigned. Landlord's 👍 is not usable approval; yes/no question re-sent. On hold until 2024-03-29. Tenant photos outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord one yes/no question: may we instruct our contractor? | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant on pending landlord decision, next update by 29 March, ask for photos and safety advice | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold awaiting landlord, review 2024-03-29 | Freya, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Thanks for your reply, Freya. A thumbs-up doesn't tell us which option you meant, so one yes/no question: may we instruct our own contractor to repair the leaking shower cable at Flat 14, 44 Lantern Quay? (Reply "yes" or "no, I'll arrange my own".)
> 
> Options: Yes, instruct our contractor (recommended); No, landlord arranges own contractor

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting for the landlord to confirm how the repair will be arranged, and we've asked them again today. We'll update you by 29 March. In the meantime, photos of the damaged cable and the leak would help, and if water is reaching any electrics, please stop using the shower and let us know straight away. Kind regards, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the 👍 as unclear does not approve any contractor or spend
- Tenant update does not promise a visit date

## Remaining work
- Await landlord's clear answer, then assign contractor or record own contractor
- Tenant photos outstanding
- Chase landlord on second channel if silent after review date

## Missing or unavailable information
- Clear landlord decision
- Tenant photos of damage/leak

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate, with no provider assigned. The landlord's reply is unclear, and the tenant's photos are outstanding.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval question to the landlord by email (A2), a tenant update by email (A3), and a hold with review on 2024-03-29 (A4).

**3. Does anything need a human decision, and why?**

No. Asking the landlord again is routine. Escalate only if they stay silent after a second-channel chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"NBL-037-landlord-thumbs-up","decision_needed":"Thanks for your reply, Freya. A thumbs-up doesn't tell us w… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hi Eliza, a quic… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with 👍 only (unclear). Asked yes/no:… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
