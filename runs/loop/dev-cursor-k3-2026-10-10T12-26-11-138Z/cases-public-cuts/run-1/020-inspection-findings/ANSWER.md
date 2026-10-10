# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection report found a tenant-installed dog flap and sticker marks in Bedroom 1, though our earlier landlord email said no issues. The landlord email raises the unapproved dog flap and a spare key after a lock change. I corrected the record with the landlord, asked the tenant, and held the ticket to 21 Feb.

## Where the case stands
Inspection done and report uploaded (stage: result received). Ticket on hold until 2024-02-21 waiting on tenant answers and landlord identity confirmation. Ticket not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant about lock change, spare key and dog flap consent | Tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Reply to landlord correcting the 'no issues' summary, confirming we are checking, and asking sender to confirm identity | Landlord (sender named Felix Clarke) | email | A1 ✅ |
| 3 | WAIT | Hold to 2024-02-21 for replies | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email. First, a correction to our earlier summary, which said no issues were found: the attached report does record that a dog flap has been installed (utility room/back door), and marks on the Bedroom 1 wall that the tenant is to remove and make good. We have no record of approval for the dog flap or of a lock change, so we are asking the tenant about both, including whether a spare front door key exists and where it is. We will update you by 22 February. Also, your email names Felix Clarke but our records show Oliver Bennett as landlord for this property. Could you confirm who you are and your role? We will not release keys or tenancy details until that is clear.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> - Was the front door lock changed, and if so, when and who by?
> - Did you give the new key(s) to us, and is there a spare? Where is it?
> - Did you get written permission from the landlord to fit the dog flap?
> 
> Why: The landlord has asked about an unapproved dog flap and a spare front door key after a lock change. Our inspection report noted the dog flap but we hold no record of either approval.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here decides whether the dog flap is a breach or whether the lock change was allowed
- No keys were released or requested
- The landlord email content is only a summary; the original wording was not seen

## Remaining work
- Review tenant and landlord replies on 2024-02-21
- Decide on dog flap consent and spare key route
- Tenant to remove Bedroom 1 sticker marks; confirm
- Close ticket once checks are met

## Missing or unavailable information
- Whether the lock was changed and by whom
- Whether dog flap was approved
- Identity of Felix Clarke versus landlord Oliver Bennett
- Inspection photos (report shows zero)

## Conflicts between sources
- Landlord email sender Felix Clarke vs landlord Oliver Bennett in event 017
- Event 017 said no issues but the report lists a dog flap and Bedroom 1 defect
- Visit dates 13 Feb vs 15 Feb; report says 16 Feb; 'Friday 15th' is a Thursday
- Report says zero photos, though it says inspector takes photos

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection complete and report filed. Outstanding: landlord's dog flap and spare key queries, tenant's answers, landlord identity confirmation, sticker mark make-good.

**2. What is the next action, who is it for, and through which channel?**

Done: corrective reply to landlord (email) and questions to tenant (email); wait until 2024-02-21.

**3. Does anything need a human decision, and why?**

Not yet. If the dog flap is a tenancy breach or the lock change was unauthorised, a human should decide how to proceed after replies arrive.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","questions":["Was the f… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-020-inspection-findings","reason":"Waiting for Tenant","comment":"Awaiting tenant answers on lock change, spare key and d… | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after put_on_hold |

## Failed or unverified actions
_None._
