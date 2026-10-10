# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord replied with only a thumbs-up, which is not valid approval. Recorded it as unclear, asked a clear yes/no question, updated the tenant with safety advice, and put the job on hold to 29 March.

## Where the case stands
Intake/landlord gate. No provider assigned. Landlord's reply was only a thumbs-up (unclear). Clear yes/no question sent; ticket on hold until 2024-03-29. Tenant photos outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord for a clear yes (our contractor) or own-contractor answer | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant, safety advice, photos requested, next update by 29 March | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold awaiting landlord, review 2024-03-29 | Freya, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Thanks Freya. We got a thumbs-up but need a clear answer: do you want us to send our contractor to repair the leaking shower hose/cable at Flat 14, 44 Lantern Quay? Please reply YES to approve our contractor, or tell us if you will arrange your own.
> 
> Options: YES - send our contractor; I will arrange my own contractor

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting for the landlord to confirm how the repair will be arranged, and have asked them again for a clear answer. Please send the photos if you can, and avoid using the shower while it's leaking. If water is reaching any sockets or electrics, switch the power off at the fuse box and tell us straight away. We'll update you by 29 March.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- A thumbs-up does not authorise a contractor or spend
- No contractor assigned and no visit booked
- Cause and who pays not established

## Remaining work
- Landlord to give a clear decision
- Tenant to send photos
- Then assign contractor and book visit (agency)
- If still silent on 29 March, chase on a second channel

## Missing or unavailable information
- Clear landlord decision
- Photos of damaged cable and leak

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Awaiting landlord approval; thumbs-up is unclear. No provider assigned. Tenant photos outstanding.

**2. What is the next action, who is it for, and through which channel?**

Clear yes/no approval request to the landlord by email (done, APR-101); tenant update by email (done); hold to 29 March.

**3. Does anything need a human decision, and why?**

No. Asking the landlord again is routine; no escalation needed yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"NBL-037-landlord-thumbs-up","decision_needed":"Thanks Freya. We got a thumbs-up but need a clear answer: d… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","ticket_ref":"NBL-037-la… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with only a thumbs-up (unclear); aske… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
