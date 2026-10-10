# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection report was sent and showed one minor defect plus a dog flap. The landlord then raised the unapproved dog flap and a spare key after a lock change. I asked the tenant for facts, replied to the landlord, noted the record conflicts, set a follow-up for 22 Feb and returned the ticket to auto mode.

## Where the case stands
Inspection completed and report sent to landlord (event 017). Landlord's follow-up (event 020) raises an unapproved dog flap and a missing spare front door key after a lock change. Waiting on the tenant and landlord replies; review 2024-02-22.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the tenant about dog flap permission, the lock change and the spare key, reply by 22 Feb | Tenant | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Reply to the landlord with the report findings, and ask whether they consented to the dog flap and who changed the lock | Landlord | email | A2 ✅ |
| 3 | WAIT | Wait for replies; review 22 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> - Did you get written permission from the landlord before fitting the dog flap in the back door? If so, could you send us a copy?
> - Has the front door lock been changed? If so, when, and who did it?
> - Where is the spare front door key, and could you let us have it or tell us who holds it?
> 
> Why: The landlord has raised an unapproved dog flap and a missing spare key after a lock change; the inspection noted the dog flap. We need the tenant's account before replying fully. Please reply by 2024-02-22.

**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email (continuing from our inspection report of 17 Feb). The inspection did record a dog flap fitted in the back door, and one small defect in Bedroom 1 (sticker marks on the wall that the tenant is to remove and make good). Nothing else was found. We have asked the tenant whether they had permission for the dog flap, whether the front door lock was changed, and where the spare key is. We will not take any action against the tenant or arrange entry until we hear back. Could you confirm whether you gave any permission for the dog flap, and whether you or your contractor changed the front door lock? We will update you by 22 February.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The replies do not decide whether the dog flap is allowed or whether the tenant is at fault.
- No entry, key demand or deposit action has been started.
- The ticket returned to auto mode does not mean the issues are resolved.

## Remaining work
- Review the tenant and landlord replies on 22 Feb (agency).
- Landlord decision on the dog flap (retain or remove) once facts are known.
- Locate the spare key and clarify the lock change.
- Tenant to remove the Bedroom 1 sticker marks and make good.

## Missing or unavailable information
- Whether the landlord consented to the dog flap
- Who changed the front door lock and where the spare key is
- Whether the landlord is Oliver Bennett or Felix Clarke

## Conflicts between sources
- Landlord named Oliver Bennett (event 017) vs sender Felix Clarke (event 020).
- Visit dates 13 Feb vs 15 Feb (15 Feb is treated as current); the report says 16 Feb.
- Event 006 says Friday 15 Feb, but it is a Thursday.
- Tenant was told photos would be taken, but the report shows 0 photos.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is done and the report has been sent. Outstanding: the dog flap consent question, the lock change and spare key, and the Bedroom 1 make-good.

**2. What is the next action, who is it for, and through which channel?**

Ask the tenant by email about the dog flap, lock and key, and reply to the landlord by email. Both are done. Review on 22 Feb.

**3. Does anything need a human decision, and why?**

Not yet. If the tenant fitted the flap without consent, the response (remove, retain, or enforcement) needs the landlord's decision and possibly a human.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","questions":["Did you g… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Thank you for your ema… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Landlord email event 020 signed Felix Clarke, but report email (event 017) was addressed to … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2024-02-22","purpose":"Review tenant and landlord replies on dog flap consent, lock change and spare key","ticket_ref":"NBL-020-i… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
