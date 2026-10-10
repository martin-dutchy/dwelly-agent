# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection found no urgent issues, but noted a dog flap and some marks on a Bedroom 1 wall. The landlord says the flap was not approved and asks about a spare key after a lock change. I replied to the landlord, asked the tenant the open questions, added a note, set a follow-up for 23 Feb and returned the job to auto mode.

## Where the case stands
Inspection done (report dated 16 Feb, uploaded 17 Feb). Landlord has raised an unapproved dog flap and a spare key after a lock change. Waiting on tenant and landlord replies; review 23 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant who fitted the dog flap, whether permission was given, who changed the lock and when, and for a spare key by 23 Feb | Tenant | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Reply to landlord with what the record shows, ask for approval status and to confirm contact name | Landlord | email | A1 ✅ |
| 3 | WAIT | Follow-up on replies 23 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, existing thread (event 020 email)** (verified)

> Thanks for your email. The inspection report (16 Feb) records that a dog flap has been fitted in the back door and utility room. Our records don't show any approval for it, and nothing about a lock change. We are asking the tenant who fitted the flap and whether they had permission, and who changed the front door lock, when, and for a spare key to be given to us. We'll update you by 23 Feb. Please can you confirm whether you did approve the flap or not? Also, our records name the landlord contact as Oliver Bennett but your email was signed Felix Clarke. Please confirm who we should deal with. Nothing has been decided about the flap yet, and we are not acting on the tenant's deposit or tenancy.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> - Who fitted the dog flap in the back door, and did you get the landlord's permission first?
> - Has the front door lock been changed? If so, who changed it and when?
> - If the lock was changed, please get a spare front door key to us by 23 February.
> 
> Why: Landlord has raised an unapproved dog flap and a missing spare key after a lock change; the inspection report notes the flap but our records show neither approval nor a lock change.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing decided on whether the dog flap is allowed, or on any cost or deposit deduction
- Does not establish who changed the lock or when
- Does not confirm Felix Clarke is the landlord contact

## Remaining work
- Review tenant and landlord replies by 23 Feb (agency)
- Obtain spare key
- Bedroom 1 command-strip marks are for the tenant to make good; check later
- Escalate to a human only if the flap consent dispute or lock change becomes a legal or deposit matter

## Missing or unavailable information
- Whether the landlord approved the flap
- Who changed the lock and when
- Identity of Felix Clarke versus Oliver Bennett

## Conflicts between sources
- Landlord on record Oliver Bennett vs email attributed to Felix Clarke
- Visit 13 Feb replaced by 15 Feb; report dated 16 Feb; 15 Feb is a Thursday but tenant wrote Friday
- Report lists 'inspection issues: NO' while recording a defect and a dog flap

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete, with no defects beyond the command-strip marks. It is outstanding on the dog flap approval, the lock change and spare key, and the landlord name mismatch.

**2. What is the next action, who is it for, and through which channel?**

Questions to the tenant by email (REQ-102) and a reply to the landlord by email (MSG-101). Review on 23 Feb.

**3. Does anything need a human decision, and why?**

Not yet. A human is needed only if the flap consent or the lock change turns into a dispute about the tenancy, deposit or legal matters.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 020 email)","body":"Thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","questions":["Who fitte… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 020 landlord email (summarised as from Felix Clarke) says dog flap not approved and as… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2024-02-23","purpose":"Review tenant and landlord replies on dog flap approval, lock change and spare key; update landlord","tick… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
