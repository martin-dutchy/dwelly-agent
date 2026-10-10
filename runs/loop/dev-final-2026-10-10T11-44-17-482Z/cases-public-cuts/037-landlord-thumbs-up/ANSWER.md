# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

The landlord replied to the contractor question with only a thumbs-up. I recorded it as unclear, asked them a yes/no question, told the tenant what is pending and gave safety advice, and put the job on hold until 2024-03-28.

## Where the case stands
Intake/landlord gate. No contractor assigned. Landlord replied with only a thumbs-up, which is not approval. On hold until 2024-03-28 awaiting a clear yes/no from the landlord. Tenant photos outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord a yes/no question: may we send our contractor to replace the shower cable? | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update the tenant: awaiting landlord, safety advice (avoid shower, isolate if electric), photos still wanted, next update by 28 March | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until 2024-03-28 for landlord's answer | Freya, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Thanks for your reply, Freya. A thumbs-up isn't enough for us to instruct anyone. Yes or no: may we send our contractor to replace the leaking shower cable at Flat 14, 44 Lantern Quay? (Reply "yes" to approve, or tell us if you'd rather arrange it yourself.)
> 
> Options: Yes, send your contractor; No, I will arrange my own contractor

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We are waiting for the landlord to confirm how the repair will be arranged; we will let you know as soon as they do. Until it's fixed, please avoid using the shower while the cable is leaking, and if it is an electric shower, switch it off at the isolator or fuse board. If you see sparks or burning smells, call 999. Photos of the cable and leak would still help. We'll update you by 2024-03-28. Kind regards

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The thumbs-up does not approve a contractor or any spend.
- No contractor is assigned and no visit is booked.
- Tenant's safety advice does not confirm the shower type or the cause of the leak.

## Remaining work
- Landlord to give a clear answer; then record the decision and assign the contractor (agency, owner of the follow-up)
- Tenant photos outstanding
- Chase landlord on a second channel if no answer after review date

## Missing or unavailable information
- Clear landlord approval
- Photos of the damaged cable
- Whether the shower is electric

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate with no contractor assigned. The thumbs-up is not usable approval. A clear landlord answer and tenant photos are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Yes/no approval request to the landlord (email), plus a status and safety update to the tenant (email). Both are sent. The job is on hold until 2024-03-28.

**3. Does anything need a human decision, and why?**

No. This is routine. If the landlord stays silent, chase on a second channel and escalate as P2 if the tenant is still suffering.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"R-4815","decision":"unclear","evidence_quote":"👍","source":"event 007, email, 2024-03-27"} | 1 | ❌ failed | Ticket R-4815 not found on read-back |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"R-4815","decision_needed":"Thanks for your reply, Freya. A thumbs-up isn't enough for us to instruct anyon… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"R-4815","b… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email, 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with a thumbs-up only (unclear); aske… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
- A1: Used the wrong ticket ref (R-4815). Found the correct ref NBL-037-landlord-thumbs-up via list_tickets and redid it as A4.
