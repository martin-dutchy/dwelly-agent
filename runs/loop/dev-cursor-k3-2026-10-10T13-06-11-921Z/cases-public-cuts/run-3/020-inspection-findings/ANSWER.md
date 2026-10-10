# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection report found no urgent issues. It noted a tenant-installed dog flap and command-strip marks in Bedroom 1. The landlord says they did not approve the dog flap and asks about a spare key after a lock change. I asked the tenant, replied to the landlord, added a note, set a follow-up and returned the job to auto mode.

## Where the case stands
Inspection done and report sent to landlord. The landlord replied about an unapproved dog flap and a spare key after a lock change. We are waiting on the tenant's answer. Follow-up set for 2024-02-22.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant whether the dog flap had permission and whether the front lock was changed, and who holds the keys | Tenant | email | A1 ✅ |
| 2 | OTHER | Acknowledge the landlord's email and say we are checking with the tenant. Also asked them to confirm the name we hold for them. | Landlord | email | A2 ✅ |
| 3 | WAIT | Review the tenant's reply and update the landlord by 22 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> - Our inspection noted a dog flap fitted in the back door. Did you get the landlord's written permission before it was installed? If so, please send us a copy.
> - Has the front door lock been changed? If so, when, and who holds the old and new keys, including a spare for the landlord?
> 
> Why: The landlord says the dog flap was not approved and is asking for a spare front door key after a lock change. We need your side before replying fully.

**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email. We've noted that you didn't approve the dog flap. The inspection report did record one fitted in the back door, and no other issues apart from marks on a bedroom wall for the tenant to make good. We have asked the tenant whether permission was given and whether the front lock has been changed, and who holds the keys. We will come back to you with their answer and options for the spare key and the dog flap, by 22 February. Please let us know if you'd like us to check the name we hold for you, as our inspection email was addressed to Oliver Bennett.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here decides whether the dog flap is allowed or who must remove it.
- Nothing here gives the landlord a key or confirms a lock was changed.
- The inspection report is not a repair and no contractor was assigned.

## Remaining work
- Tenant to answer on dog flap consent and lock/keys.
- Agency to update the landlord and offer options for the key and the dog flap by 22 Feb.
- The tenant is to remove the command-strip marks in Bedroom 1 and make good; this needs a re-check later.
- Confirm the landlord's name.

## Missing or unavailable information
- Whether the tenant had written consent for the dog flap
- Whether the front lock was changed and who holds the keys
- Landlord's name on record (Oliver Bennett vs Felix Clarke)

## Conflicts between sources
- Landlord named Oliver Bennett in event 017, but event 020 is from Felix Clarke.
- Visit date 13/02 versus the rescheduled 15/02; the report is dated 16/02.
- Event 006 says 'Friday 15th' but 15/02/2024 was a Thursday.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete and the report has gone to the landlord. Outstanding: the dog flap consent question, the lock change and spare key, and the Bedroom 1 marks.

**2. What is the next action, who is it for, and through which channel?**

I emailed the tenant to ask about dog flap consent and the lock/keys. I also emailed the landlord to acknowledge their message. The follow-up is set for 22 Feb.

**3. Does anything need a human decision, and why?**

Not at this point. Asking the tenant can move it forward. If consent is disputed, the landlord must decide what happens to the dog flap.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","questions":["Our inspe… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Thank you for your ema… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 020: landlord email (signed Felix Clarke; event 017 addressed Oliver Bennett - name mi… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2024-02-22","purpose":"Review tenant reply on dog flap consent and lock/keys; update landlord","ticket_ref":"NBL-020-inspection-f… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
