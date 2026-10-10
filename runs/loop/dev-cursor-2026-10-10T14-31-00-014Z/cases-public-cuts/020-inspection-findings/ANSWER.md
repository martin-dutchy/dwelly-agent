# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection report shows a dog flap and Bedroom 1 sticker marks, but our email of 17 Feb told the landlord there were no issues. I corrected that with the landlord. I asked the tenant about consent for the dog flap, the lock change and a spare key. I set a follow-up for 22 Feb.

## Where the case stands
Inspection done (report dated 16 Feb, uploaded 17 Feb). Landlord email of 18 Feb about an unapproved dog flap and a spare key after a lock change has been answered. Waiting on the tenant's answers and on a spare key sent to the agency. Follow-up set for 22 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant about dog flap consent, who changed the lock and when, and for a spare key to the agency by 25 Feb. Also ask them to remove the Bedroom 1 sticker marks. | Tenant | email | A2 ✅ |
| 2 | OTHER | Reply to the landlord. Correct the earlier 'no issues' email, say what the record does and doesn't show, and give the update date. | Landlord | email | A1 ✅ |
| 3 | WAIT | Follow up on 22 Feb on the tenant's replies and the key. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email of 18 Feb. First, a correction: our email of 17 Feb said no issues were found. The attached report does in fact note (1) a dog flap installed in the utility room/back door, and (2) sticker-type marks on the Bedroom 1 wall that the tenant is to remove and make good. Sorry for the confusion. On the dog flap: our records show no consent for it, so we are asking the tenant whether permission was given and will tell you the answer. On the spare front door key: our records do not show a lock change. We are asking the tenant who changed it and when, and asking for a spare key to be sent to the agency. We will update you by 22 Feb. Please also confirm the dog flap is not something you have agreed to, and whether you hold any earlier key.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hello, thank you for letting us in for the inspection. Two things please. 1) The report notes a dog flap in the back door. Changes like this need the landlord's written consent under the tenancy's alterations and pets clauses. Did you get consent, and if so from whom and when? 2) Has the front door lock been changed, and if so when and by whom? Please send a spare front door key to the agency by 25 Feb so we hold a copy. We are not entering without notice; this is just so the landlord has access in an emergency. Also, the report notes marks on the Bedroom 1 wall by the window, which look like command strip stickers. Please remove them and make good. We will be in touch again by 22 Feb.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here decides whether the dog flap is allowed or who pays to reinstate the door.
- Nothing here confirms a lock change happened.
- Messages do not establish the landlord's identity beyond the case thread.

## Remaining work
- Tenant to state whether consent was given for the dog flap, and who changed the lock and when.
- Spare key to be delivered to the agency by 25 Feb.
- Landlord to decide on the dog flap (consent or reinstatement). Agency to review on 22 Feb.
- Verify the landlord's name: Felix Clarke versus Oliver Bennett.

## Missing or unavailable information
- Dog flap consent history
- Lock change details
- Photos (the report shows 0)
- Text of event 016
- Full landlord email text (summary only)

## Conflicts between sources
- Landlord email is signed Felix Clarke; the landlord on record is Oliver Bennett.
- Event 017 said no issues; the report notes a dog flap and Bedroom 1 marks.
- Visit dates: 13/02, then 15/02 (a Thursday, not Friday as the tenant said); the report is dated 16/02.
- The report summary shows 0 photos.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete and the report is filed. Outstanding: the tenant's answers on dog flap consent and the lock change, a spare key to the agency, the landlord's decision on the dog flap, and the Bedroom 1 marks to be made good.

**2. What is the next action, who is it for, and through which channel?**

Emails have been sent to the tenant and to the landlord (existing threads), and a follow-up is set for 22 Feb.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides on the dog flap. A human is needed only if the landlord and tenant give conflicting accounts, or the sender's identity cannot be settled.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Conflicts: landlord email event 020 signed \"Felix Clarke\" but landlord on record is Oliver… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2024-02-22","purpose":"Review tenant answers on dog flap consent, lock change, spare key to agency (due 25 Feb); update landlord"… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
