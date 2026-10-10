# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection is done and the report went to the landlord. The landlord has now asked about an unapproved dog flap and a spare key after a lock change. I corrected our earlier "no issues" summary to the landlord, asked the tenant the open questions, and set a follow-up for 22 Feb.

## Where the case stands
Inspection report uploaded (event 018); ticket still at the init stage. Waiting on tenant and landlord replies about dog flap consent, lock change and spare key. Review 2024-02-22.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant about dog flap consent, lock change and spare key, and to fix the sticker marks | Tenant | email | A2 ✅ |
| 2 | OTHER | Reply to landlord correcting the findings and saying what we are checking | Landlord | email | A1 ✅ |
| 3 | WAIT | Review replies on 22 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email. Please note our earlier summary said no issues were found; the attached report actually records two points: a dog flap fitted in the back door/utility room, and sticker-type marks on the Bedroom 1 wall which the tenant is to remove and make good. We are checking with the tenant whether the dog flap was ever agreed and whether the front door lock was changed and who holds the spare key. We will not take any action on either until we have their answer, and will update you by 22 February. Could you also tell us whether you consented to the dog flap or lock change?

**A2 · request_information → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> - Did you get the landlord's written permission before fitting the dog flap? If so, can you send it?
> - Has the front door lock been changed, and if so when and by whom?
> - Where is the spare front door key now, and could you let us have a copy?
> - Please remove the sticker marks on the Bedroom 1 wall and make good.
> 
> Why: Inspection found a dog flap, and the landlord has asked about it and about a spare front door key after a lock change.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The messages do not establish that the dog flap or lock change was unauthorised.
- Nothing has been decided about deposit deductions or enforcement.
- The ticket has not been closed.

## Remaining work
- Review replies on 22 Feb (agency)
- Tenant to remove sticker marks and make good
- Landlord to decide on the dog flap
- Confirm the inspection date and close the ticket once final checks are done

## Missing or unavailable information
- Whether the dog flap or lock change was consented to
- Where the spare key is
- Contents of the event 016 note (absent)

## Conflicts between sources
- Event 017 said no issues, but the report records a dog flap and a Bedroom 1 defect.
- Landlord named Oliver Bennett (event 017) vs email about Felix Clarke (event 020).
- Visit booked 15 Feb 14:00 (event 012) vs report appointment date 16 Feb; the 13 Feb booking was superseded.
- Event 006 says Friday 15th, but 15 Feb 2024 was a Thursday.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

The inspection happened and the report was sent. Outstanding: the dog flap consent question, the lock change and spare key question, and the tenant removing the Bedroom 1 sticker marks. The ticket has not been closed.

**2. What is the next action, for whom, via which channel?**

Reply to the landlord by email (sent) and ask the tenant by email (sent). Follow up on 22 Feb.

**3. Does anything need a human decision?**

Not yet. If the tenant fitted the dog flap or changed the lock without consent, the remedy is a landlord decision, and a human is needed if that turns into a dispute. The sender name mismatch (Felix Clarke vs Oliver Bennett) is noted for checking.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","why":"Inspection found… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Landlord email event 020 signed Felix Clarke, but event 017 addressed Oliver Bennett; no sen… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-22","purpose":"Review tenant/landlord replies on dog flap consent, lock change… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
