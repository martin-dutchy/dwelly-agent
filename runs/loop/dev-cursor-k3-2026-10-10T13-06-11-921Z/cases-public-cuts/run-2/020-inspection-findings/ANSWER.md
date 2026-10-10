# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection is complete. The landlord then raised an unapproved dog flap and a spare key after a lock change. I corrected our earlier 'no issues' email, asked the tenant the three questions, noted the conflicts, set a follow-up for 22 Feb and returned the ticket to auto mode.

## Where the case stands
Inspection done and report sent to landlord. Landlord's follow-up (dog flap not approved, spare key after lock change) answered. Agency is waiting on the tenant's answers; follow-up set for 2024-02-22.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant about dog flap consent, the lock change and the spare key | Tenant | email | A2 ✅ |
| 2 | OTHER | Reply to landlord correcting the 'no issues' summary, saying the tenant is being asked, and asking them to confirm their name | Landlord | email | A1 ✅ |
| 3 | WAIT | Review tenant answers and update landlord by 2024-02-22 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email. Two corrections and an update on your points. Our earlier email said no issues were found, but the attached report does record two things: a dog flap fitted in the utility room/back door, and sticker-type marks on the Bedroom 1 wall that the tenant is to remove and make good. We are asking the tenant whether the dog flap was ever agreed and who changed the front door lock and holds the spare key. We will come back to you by 22 February. We have not agreed to the dog flap or any charges, and we cannot say yet who holds the spare key. Please also confirm the name you would like us to use, as our records name Oliver Bennett and your email was from Felix Clarke.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> - Did you get written permission from the landlord to fit the dog flap in the back door?
> - Has the front door lock been changed, and if so by whom and when?
> - Is there a spare front door key, and where is it now?
> 
> Why: Landlord has raised an unapproved dog flap and a spare key after a lock change; the inspection report notes the dog flap.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here decides whether the dog flap is allowed, who pays to make it good, or who holds the spare key.
- No charge or deposit deduction was proposed.

## Remaining work
- Tenant's answers on the dog flap, lock change and spare key (agency, review 2024-02-22)
- Landlord to decide on the dog flap, and to confirm their identity/name
- Tenant to remove the Bedroom 1 sticker marks and make good

## Missing or unavailable information
- Whether the landlord ever consented to the dog flap
- Who changed the lock and where the spare key is
- Which landlord name is right: Oliver Bennett or Felix Clarke

## Conflicts between sources
- Event 017 said no issues, but the report records a dog flap and Bedroom 1 marks; trusted the report.
- Visit dates 13 Feb versus 15 Feb: the later reschedule (15 Feb) is the genuine one. The report is dated 16 Feb.
- Landlord named Oliver Bennett (event 017) but the sender was Felix Clarke (event 020).
- Event 006 says 'Friday 15th' but 15 Feb 2024 was a Thursday.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is done and the report has been sent to the landlord. The landlord's dog flap and spare key query is open, waiting on the tenant's answers. The Bedroom 1 marks are for the tenant to make good.

**2. What is the next action, who is it for, and through which channel?**

Email the tenant on the existing thread with the dog flap, lock and spare key questions (done). Email the landlord with a correction and an update (done). Review on 2024-02-22.

**3. Does anything need a human decision, and why?**

Not yet. Whether to consent retrospectively to the dog flap is the landlord's decision. A human is needed only if the name mismatch or the tenant's answers raise a dispute.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","questions":["Did you g… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 017 email said no issues, but the report (attachment-01) records a dog flap and Bedroo… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2024-02-22","purpose":"Review tenant answers on dog flap consent, lock change and spare key; update landlord","ticket_ref":"NBL-0… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
