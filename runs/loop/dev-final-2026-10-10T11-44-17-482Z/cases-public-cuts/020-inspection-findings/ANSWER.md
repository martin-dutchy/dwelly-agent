# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection found a dog flap and sticker marks in Bedroom 1, but our earlier email to the landlord said no issues. I corrected that with the report attached. I asked the tenant about the dog flap consent, the lock change and the spare key. I noted the record conflicts, set a follow-up for 22 Feb and returned the ticket to auto mode.

## Where the case stands
Inspection done; report uploaded (event 018). Landlord replied (event 020) about an unapproved dog flap and a spare key after a lock change. Agency is waiting on the tenant's answers. Follow-up set for 2024-02-22.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant about dog flap consent, lock change and spare key | Tenant | email | A2 ✅ |
| 2 | OTHER | Reply to landlord correcting the 'no issues' summary, attaching the report, and saying what we are checking | Landlord | email | A1 ✅ |
| 3 | WAIT | Review replies on 22 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email about the dog flap and the spare front door key. Two points: (1) Our earlier email said no issues were found. That was incomplete. The inspection report notes a dog flap fitted in the back door/utility room, and sticker-type marks on the Bedroom 1 wall that the tenant is to remove and make good. Please rely on the attached report, not that summary. (2) We are asking the tenant whether you agreed to the dog flap, whether the lock was changed and by whom, and where the spare key is. We will not take any action on the dog flap or the lock until we hear back and will update you by 22 February. If you have a record of any consent you gave or of who changed the lock, please send it. Please also tell us if you would like us to act on the dog flap in any particular way.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> - Did the landlord or agency agree in writing to the dog flap being fitted in the back door? If so, can you send us that message?
> - Has the front door lock been changed? If so, when, and who did it?
> - Where is the spare front door key, and can you let us have a copy or tell us how to collect it?
> 
> Why: The landlord has raised an unapproved dog flap and a missing spare key after a lock change; we need the tenant's account before responding. We will update you by 22 February.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not establish that the dog flap was unauthorised or that the lock was changed or by whom.
- No consent, enforcement or deposit action is decided.
- The tenant is not told to remove the flap.

## Remaining work
- Await tenant answers, then update landlord (agency, by 22 Feb)
- Bedroom 1 marks: tenant to make good
- Verify the landlord sender name
- Decide on dog flap consent (landlord decision)

## Missing or unavailable information
- Tenant's account of the dog flap and lock change
- Spare key location
- Landlord's written view on the dog flap

## Conflicts between sources
- Event 017 said 'no issues' but the report records a dog flap and one Bedroom 1 defect; trusted the report.
- Landlord named Oliver Bennett (event 017) but event 020 sender is Felix Clarke; treated as the landlord thread, to verify.
- Visit dates 13 Feb vs 15 Feb; the reschedule to 15 Feb is genuine, but the report is dated 16 Feb.
- 'Friday 15th' in event 006 was actually a Thursday.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete and the report is filed. Outstanding: the landlord's dog flap and spare key query, the tenant's account, and the Bedroom 1 make-good.

**2. What is the next action, who is it for, and through which channel?**

Tenant: email asking about the dog flap, lock change and spare key. Landlord: email correcting the summary and explaining next steps. Review on 22 Feb.

**3. Does anything need a human decision, and why?**

Not yet. Dog flap consent is the landlord's decision. A human should only get involved if the tenant's answers show an unauthorised lock change or if the sender identity cannot be settled.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","questions":["Did the l… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 017 told landlord 'no issues' but report records dog flap and Bedroom 1 sticker marks … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-22","party":"Tenant and landlord","purpose":"Review tenant answers on dog flap… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
