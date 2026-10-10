# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord replied about an unapproved dog flap and a spare key after a lock change. The inspection report confirms the dog flap, which contradicts our earlier 'no issues' email, and the record shows no lock change. I corrected this with the landlord, asked the tenant about consent, the lock and a spare key, noted the conflicts, set a follow-up for 23 Feb and returned the job to auto.

## Where the case stands
Inspection done and report sent to landlord. Landlord has now raised an unapproved dog flap and a spare key after a lock change. Agency is waiting on tenant and landlord replies; follow-up set for 2024-02-23.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant whether dog flap consent was given, who changed the lock and when, and ask for a spare key to the agency by 23 Feb; mention Bedroom 1 marks | Tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Reply to landlord: correct the earlier 'no issues' statement, say what the record shows on dog flap and lock, ask for consent/key info and sender identity | Landlord | email | A1 ✅ |
| 3 | WAIT | Review on 23 Feb and chase both parties | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (Oliver Bennett on record; email signed Felix Clarke) (landlord) via email, agency landlord record** (verified)

> Thank you for your email. First, a correction: our earlier email said no issues were found, but the inspection report (16 Feb) does note that a dog flap has been installed in the back door/utility room, and marks from sticker-type wall strips in Bedroom 1 that the tenant should remove and make good. Sorry for the confusion. On the dog flap: our records don't show any consent for it, so we are asking the tenant under the alterations and pets clauses whether permission was given and will report back. On the lock: our records don't show a lock change. We are asking the tenant who changed it and when, and asking for a spare front door key to be sent to the agency by 23 February. Please let us know if you gave consent for either, and whether you hold a key. Also, your email is signed Felix Clarke but our landlord record is Oliver Bennett; please confirm who you are so we can update the record. We will update you by 23 February.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hello, thank you for having us for the inspection. Two things we need to ask. 1) The report notes a dog flap fitted in the back door. Any change like this needs the landlord's written consent under your tenancy's alterations and pets clauses. Was consent given, and if so, when and by whom? 2) We understand the front door lock may have been changed. Do you know who changed it and when? If so, please get a spare key to our office by 23 February. Please also remove the sticker marks on the Bedroom 1 wall by the window and make good. We will update you by 23 February.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not establish whether the dog flap was consented to or who changed the lock
- Nothing here decides any deposit deduction or tenancy breach
- Landlord identity is not confirmed

## Remaining work
- Tenant answers on consent, lock change, spare key (agency, by 23 Feb)
- Landlord confirms consent position, identity and key holding
- Remove Bedroom 1 sticker marks (tenant)
- Review 23 Feb (agency)

## Missing or unavailable information
- Whether dog flap consent was given
- Who changed the lock and when, and who holds keys
- Whether the sender Felix Clarke is the landlord Oliver Bennett
- Text of event 016 note

## Conflicts between sources
- Event 017/018 'no issues' vs report noting dog flap and Bedroom 1 defect; trusted the report
- Landlord on record Oliver Bennett vs email naming Felix Clarke
- Visit 15/02 (events 009-014) vs report/document dated 16/02
- Event 006 'Friday 15th' but 15 Feb 2024 is a Thursday
- Visit time 11:00 vs window 8-12 (13th), 14:00 vs 12-5 (15th)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection completed and report sent. Outstanding: dog flap consent, lock change and spare key, landlord identity, Bedroom 1 marks.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the landlord (record route) and tenant (existing thread) asking the specific questions; follow-up set for 23 Feb.

**3. Does anything need a human decision, and why?**

Not yet. Any breach or consent decision may need a human if the answers conflict after 23 Feb.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord (Oliver Bennett on record; email signed Felix Clarke)","recipient_role":"landlord","channel":"email","contact":"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Landlord email event 020 raises unapproved dog flap and spare key after lock change. Report … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-23","purpose":"Chase tenant on dog flap consent, lock change and spare key; ch… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
