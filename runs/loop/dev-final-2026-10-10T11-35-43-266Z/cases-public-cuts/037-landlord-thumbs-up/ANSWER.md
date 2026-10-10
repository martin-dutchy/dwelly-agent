# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Landlord replied with only a 👍 to the question of who arranges the shower repair. I recorded it as unclear, asked a single yes/no question, held the ticket with a review date, and updated the tenant.

## Where the case stands
Provider selection; no contractor assigned. Landlord replied only with 👍 (event 007), which is not approval. Ticket on hold awaiting a yes/no answer, review 2024-03-28. Tenant photos outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord one yes/no question: instruct our contractor or arrange their own | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant approval is pending, ask again for photos, give electrical safety advice | Eliza, tenant | email | A4 ✅ |
| 3 | WAIT | Hold awaiting landlord, review 2024-03-28 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Thanks for your 👍, Freya. We can't treat an emoji as approval, so one yes/no question: do you want us to send our contractor to repair the leaking shower cable at Flat 14, 44 Lantern Quay? (Yes = we instruct our contractor; No = you'll arrange your own.)
> 
> Options: Yes, send your contractor; No, I will arrange my own contractor

**A4 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting for the landlord to confirm who will carry out the repair, and we've asked them again today. We'll update you as soon as we hear. In the meantime, photos of the damaged cable and the leak would help. If water is getting near any electrics, please switch them off and let us know straight away.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the thumbs-up as unclear does not approve work or assign a contractor
- No visit, cost or date is promised to the tenant

## Remaining work
- Landlord answer (agency chases after review date)
- Tenant photos
- Assign contractor once approved, then visit

## Missing or unavailable information
- Clear landlord decision
- Photos of the damage

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

No provider assigned. The landlord's 👍 is not usable approval. Outstanding: a clear landlord decision and tenant photos.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval request to Freya, the landlord, by email (A2). The tenant, Eliza, has been updated by email (A4).

**3. Does anything need a human decision, and why?**

No. This is a routine ask-and-wait. Escalate only if the landlord stays silent after a chase on a second channel.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"NBL-037-landlord-thumbs-up","decision_needed":"Thanks for your 👍, Freya. We can't treat an emoji as appro… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied only with 👍; asked a yes/no question… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |
| A4 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-037-la… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
