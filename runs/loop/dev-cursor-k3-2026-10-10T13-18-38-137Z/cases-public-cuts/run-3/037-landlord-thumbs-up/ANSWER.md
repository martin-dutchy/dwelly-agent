# Case 037: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord answered our two-option question with a thumbs-up, which is not usable authority. I recorded it as unclear, asked a clear yes/no question, updated the tenant and held the job to 29 March.

## Where the case stands
Intake/landlord gate. No contractor assigned. Landlord's reply was only a thumbs-up, recorded as unclear. Waiting on landlord for a yes/no; tenant photos also outstanding. On hold, review 2024-03-29.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord a yes/no question: may we instruct our contractor, or will they use their own, reply by 2024-03-29 | Freya, landlord | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: waiting on landlord, photos still wanted, safety note, next update by 29 March | Eliza, tenant | email | A3 ✅ |
| 3 | WAIT | Hold until landlord answers; review 2024-03-29 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Freya (landlord)** (verified)

> Thanks for your reply, Freya. A thumbs-up doesn't tell us which option you meant. Yes or no: may we instruct our own contractor to repair the leaking shower cable/hose at Flat 14, 44 Lantern Quay? (Reply "yes" to approve, or tell us if you will arrange your own contractor.) Please reply by 2024-03-29.
> 
> Options: Yes, instruct our contractor (recommended); No, landlord arranges own contractor

**A3 · send_message → Eliza (tenant) via email, existing thread (event 004 email)** (verified)

> Hi Eliza, a quick update on the shower. We're waiting for the landlord to confirm how the repair will be arranged, and we've asked them again for a clear answer. Photos of the damaged cable and the leak would still help. If water is reaching any sockets or lights, please keep clear of the shower and tell us straight away. You'll hear from us again by 29 March. Kind regards

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The thumbs-up is not approval and does not authorise a contractor or spend.
- Nothing is booked; no visit date or cost is confirmed.
- The cause and severity of the leak are not yet established.

## Remaining work
- Landlord to answer yes/no (agency chases on 29 March via a second channel if silent)
- Tenant photos
- Assign contractor and book visit once approved

## Missing or unavailable information
- Clear landlord decision
- Photos of the damaged cable and leak

## Conflicts between sources
_None identified._

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At landlord approval. The thumbs-up is unclear, so no contractor is assigned. Outstanding: a clear landlord decision and tenant photos.

**2. What is the next action, who is it for, and through which channel?**

A yes/no approval question to the landlord (Freya) by email, plus a status update to the tenant (Eliza) by email. The job is on hold, review 2024-03-29.

**3. Does anything need a human decision, and why?**

No. This is routine and a clarifying question covers it. Escalate only if the landlord stays silent after a chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-037-landlord-thumbs-up","decision":"unclear","evidence_quote":"👍","source":"event 007, email 2024-03-27"} | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Freya","ticket_ref":"NBL-037-landlord-thumbs-up","decision_needed":"Thanks for your reply, Freya. A thumbs-up doesn't tell us w… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Eliza","recipient_role":"tenant","channel":"email","contact":"existing thread (event 004 email)","body":"Hi Eliza, a quic… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-037-landlord-thumbs-up","reason":"Waiting for Landlord","comment":"Landlord replied with 👍 only; asked a yes/no question… | 1 | ✅ verified | Ticket NBL-037-landlord-thumbs-up read back after put_on_hold |

## Failed or unverified actions
_None._
