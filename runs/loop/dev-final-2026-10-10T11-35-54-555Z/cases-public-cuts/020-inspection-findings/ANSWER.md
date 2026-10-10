# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection is complete and the report went to the landlord. The landlord's reply raises a dog flap they did not approve and a spare key after a lock change. I asked the tenant for facts, acknowledged the landlord and asked them to confirm who they are, and put the ticket on hold until 21 Feb.

## Where the case stands
Inspection done 15/02 (report dated 16/02), uploaded, sent to landlord. Landlord has replied about an unapproved dog flap and a spare key after a lock change. Ticket on hold awaiting tenant answers, review 2024-02-21.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant about lock change, spare key and dog flap consent | Tenant | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge landlord's points, say we are checking, and ask the sender to confirm identity | Landlord | email | A1 ✅ |
| 3 | WAIT | Hold until 2024-02-21 for tenant answers | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, existing thread (event 020 email)** (verified)

> Thank you for your email about Flat 12, 162 Beacon Close. We have noted two points: the dog flap, which you say you did not approve (the inspection report does record one in the utility room/back door), and the spare front door key after a lock change. We are checking with the tenant when the lock was changed and who holds the spare key, and whether the dog flap was agreed. We will come back to you once we know. We have not yet given the tenant any decision on the dog flap; that stays with you. Your email came from the name Felix Clarke, while our records show Oliver Bennett as landlord. Please confirm who you are and your connection to the property.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> - Has the front door lock been changed, and if so when and by whom?
> - If so, where is the spare front door key now?
> - Did you get the landlord's written agreement before the dog flap was fitted? If so, could you send it?
> 
> Why: The landlord has raised the dog flap and a spare key after a lock change. We need your answers before replying to them. Nothing has been decided.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing decides whether the dog flap is allowed; that is the landlord's call.
- No lock or key action taken or confirmed.
- The inspection report does not prove consent either way.

## Remaining work
- Tenant's answers on lock change, key and dog flap consent
- Landlord to confirm identity and decision on dog flap
- Tenant to remove the Bedroom 1 command-strip marks and make good (not yet communicated)
- Ticket close after the above

## Missing or unavailable information
- Landlord contact and details on property record (empty)
- Whether a lock change occurred and who holds the spare key
- Dog flap consent history

## Conflicts between sources
- Landlord email names Felix Clarke but the report email went to Oliver Bennett.
- Visit dates 13/02 vs 15/02: the 15/02 reschedule is the later one and the report is dated 16/02, which is a further inconsistency. Treated as a genuine reschedule.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is done and reported. Outstanding: the landlord's dog flap and spare key queries, tenant facts, the sender identity check, and the Bedroom 1 sticker marks.

**2. What is the next action, who is it for, and through which channel?**

Tenant email asking about the lock change, key and dog flap consent (A2). Landlord email acknowledging and asking for identity confirmation (A1). Then wait to 21 Feb (A3).

**3. Does anything need a human decision, and why?**

Not yet. The dog flap consent is the landlord's decision. Escalate if the identity mismatch stays unresolved or if a dispute or unlawful lock change emerges.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 020 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","questions":["Has the f… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-020-inspection-findings","reason":"Waiting for Tenant","comment":"Awaiting tenant answers on lock change, spare key and d… | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after put_on_hold |

## Failed or unverified actions
_None._
