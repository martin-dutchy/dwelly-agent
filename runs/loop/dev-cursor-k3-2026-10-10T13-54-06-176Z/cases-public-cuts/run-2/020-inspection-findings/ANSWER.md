# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection is done and the report went to the landlord. The landlord then raised an unapproved dog flap and a spare key after a lock change; neither is on our record. I asked the tenant and landlord for the missing facts, noted the landlord name mismatch, set a follow-up for 22/02 and returned the job to auto mode.

## Where the case stands
Inspection completed; report filed and sent to landlord. Landlord's follow-up (dog flap, spare key after lock change) answered. Waiting on landlord (identity and dog flap decision) and tenant (permission, lock change, key); review 22/02/2024.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant about dog flap permission, lock change, spare key by 25/02, and Bedroom 1 sticker marks | Tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Reply to landlord with what the record shows, ask for dog flap decision and to confirm identity (Felix Clarke vs Oliver Bennett) | Landlord | email | A1 ✅ |
| 3 | WAIT | Follow up on replies 22/02/2024 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, existing thread (event 020 email)** (verified)

> Thank you for your email. Two points:
> 1) Dog flap: the inspection report notes a dog flap fitted in the back door/utility room. Our records show no request or consent for it. We are asking the tenant whether permission was given and by whom. Whether it can stay is your decision; please tell us if you want it kept, removed and made good, or discussed further. We won't take any action against the tenant until you've replied.
> 2) Spare front door key / lock change: our records show no lock change and we hold no note of a replacement key. We are asking the tenant who changed the lock and when, and to get a spare key to us by 25/02/2024. We can't enter without the tenant's agreement or 24 hours' written notice.
> Also, your email is signed Felix Clarke, but our inspection report went to Oliver Bennett. Please confirm who you are in relation to the property so we reply to the right person. We will update you by 22/02/2024.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> - Our inspection noted a dog flap fitted in the back door. Did you have written permission from the landlord or agency, and from whom?
> - Has the front door lock been changed? If so, who changed it and when?
> - Please can you give a spare front door key to us by 25/02/2024 so we hold one on file?
> - The inspection also noted small sticker marks on the Bedroom 1 wall beside the window; please remove them and make good.
> 
> Why: Landlord has raised the dog flap and a spare key after a lock change; the record does not show either, so we need the tenant's account.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not establish that the dog flap was unauthorised or who changed the lock.
- No decision made on dog flap or any action against the tenant.
- Nothing shows the landlord's identity is verified.

## Remaining work
- Landlord decision on dog flap (agency, after reply)
- Tenant answers on lock change/permission and spare key by 25/02
- Confirm landlord identity
- Tenant to remove Bedroom 1 sticker marks

## Missing or unavailable information
- Who changed the lock and when
- Whether dog flap consent was given
- Whether sender Felix Clarke is the landlord

## Conflicts between sources
- Landlord email signed Felix Clarke vs report addressed to Oliver Bennett; asked landlord to confirm.
- Appointment 13/02 vs rescheduled 15/02; tenant called 15th a Friday but it was Thursday; report says appointment 16/02. Treated the 15/02 reschedule and report date as record, not resolved.
- Inspection summary says no issues, but the report records a dog flap and a Bedroom 1 defect.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection completed 15/02 (report dated 16/02) and report sent to landlord. Outstanding: landlord's dog flap decision, lock change and spare key, landlord identity, sticker marks.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the landlord (reply) and tenant (questions); follow-up on 22/02.

**3. Does anything need a human decision, and why?**

Not yet. The dog flap is the landlord's decision; escalate only if the name mismatch or lock change stays unresolved after follow-up.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 020 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","questions":["Our inspe… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Inspection done, no issues flagged in summary but report notes dog flap (utility/back door) … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-22","purpose":"Check landlord identity/dog flap decision and tenant answers on… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
