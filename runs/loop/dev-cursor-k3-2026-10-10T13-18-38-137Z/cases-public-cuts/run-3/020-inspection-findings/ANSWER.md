# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection is complete and the report is with the landlord. The landlord has now queried an unapproved dog flap and a spare key after a lock change. I replied to the landlord, asked the tenant for facts, noted the record inconsistencies, set a follow-up for 22/02 and returned the job to auto mode.

## Where the case stands
Inspection done (report dated 16/02, uploaded 17/02). Landlord has raised an unapproved dog flap and a missing spare key after a lock change. We are waiting on the tenant's account and the landlord's consent confirmation; review 22/02/2024.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant about dog flap permission, lock change, spare key location, and to remove the Bedroom 1 sticker marks | Tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Reply to the landlord with what the report shows, ask about consent and the sender name, and promise an update by 22/02 | Landlord | email | A1 ✅ |
| 3 | WAIT | Review replies on 22/02/2024 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, existing thread (event 020 email)** (verified)

> Thank you for your email. The inspection report (sent 17/02) does record a dog flap fitted in the back door of the utility room, and also marks on the Bedroom 1 wall that the tenant is to remove and make good. We are now asking the tenant whether the dog flap was agreed with anyone, and whether the front door lock was changed and where the spare key is. We will update you by 22/02/2024. Could you please confirm whether you gave any consent for the dog flap or a lock change, and the name you would like on file, as your email is signed Felix Clarke and our records address you as Oliver Bennett? Nothing is decided on the dog flap yet; that stays your decision.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> - Was the dog flap in the back door fitted with the landlord's or agency's written permission? If so, please send us a copy.
> - Has the front door lock been changed? If so, when, and who by?
> - Where is the spare front door key, and can you get it to us?
> - Please also remove the sticker marks beside the Bedroom 1 window and make good the wall.
> 
> Why: Landlord has raised an unapproved dog flap and a missing spare key after a lock change; we need the tenant's account before replying fully.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not decide whether the dog flap is allowed or who pays for any reinstatement
- Nothing is established about who changed the lock or where the spare key is
- No deposit deduction is implied

## Remaining work
- Collect the tenant's answers on dog flap, lock change and spare key
- Get the landlord's decision on the dog flap and confirm their name
- Confirm Bedroom 1 marks are made good
- Correct the record: the 17/02 landlord email said no issues, but the report lists two findings

## Missing or unavailable information
- Tenant's account of the dog flap and lock change
- Landlord's consent position
- Reason for the sender name mismatch
- Photos: the report records zero

## Conflicts between sources
- Event 017 says no issues, but the report lists the dog flap and a Bedroom 1 defect
- The visit was booked for 15/02 but the report is dated 16/02
- Event 006 says 'Friday 15th', but 15/02/2024 was a Thursday
- The landlord email is signed Felix Clarke, but the record names Oliver Bennett

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is done and the report sent. Outstanding: the dog flap consent question, the lock change and spare key, the Bedroom 1 marks, and the report/email mismatch.

**2. What is the next action, who is it for, and through which channel?**

Questions to the tenant by email, and a reply to the landlord by email. Both are sent. Review on 22/02/2024.

**3. Does anything need a human decision, and why?**

Not yet. The dog flap is the landlord's decision. If the tenant admits a lock change without consent, or the landlord disputes it, a human may need to look at it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 020 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","questions":["Was the d… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 017 email said \"no issues\" but report lists dog flap (utility/back door) and Bedroom… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-22","purpose":"Review tenant and landlord replies on dog flap consent, lock ch… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
