# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection complete and report issued. Landlord's follow-up on dog flap and spare key was answered on the same thread with corrected findings; tenant asked for the facts. Ticket held with review date; no human decision needed yet.

## Where the case stands
Inspection done (15 Feb booked; report dated 16 Feb) and report sent to landlord. Landlord has raised an unapproved dog flap and a spare key after a lock change. Tenant asked for facts; ticket on hold, review 2024-02-21.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant about dog flap permission, lock change/spare key, and remind to remove Bedroom 1 sticker marks | Tenant | email | A2 ✅ |
| 2 | OTHER | Reply to landlord correcting the 'no issues' summary, confirming what the report notes, asking for identity confirmation and dog flap consent | Landlord (Felix Clarke) | email | A1 ✅ |
| 3 | WAIT | Hold until 2024-02-21 for tenant/landlord replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (Felix Clarke) (landlord) via email, existing thread (event 020 email)** (verified)

> Dear Mr Clarke, thank you for your email. Our earlier inspection summary said no issues, but the attached report does note two things: a dog flap fitted in the back door/utility room, and sticker-type marks on the Bedroom 1 wall which the tenant is to remove and make good. We have no record of the dog flap or a lock change being approved. We are asking the tenant now who fitted the dog flap and whether the lock was changed, and will come back to you. On the spare front door key, we do not hold a record of one yet and will confirm once the tenant replies. Please note our earlier email was addressed to Oliver Bennett; could you confirm you are the landlord for this property so we can keep our records right? Please also tell us whether you would like to give or refuse consent for the dog flap. Kind regards, Northbridge Lettings

**A2 · request_information → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> - Was the dog flap in the back door fitted with the landlord's permission? If so, who agreed and when?
> - Has the front door lock been changed? If so, when, and who has the spare key(s)?
> - Please remove the sticker marks beside the window in Bedroom 1 and make good the wall, as noted at the inspection.
> 
> Why: Landlord has asked about an unapproved dog flap and a spare key after a lock change; the inspection noted both the flap and marks in Bedroom 1.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves or refuses the dog flap; that is the landlord's decision
- Does not establish who changed the lock or who holds the spare key
- Does not confirm Felix Clarke is the landlord

## Remaining work
- Tenant reply on dog flap and lock/key
- Landlord consent decision on dog flap and identity confirmation
- Tenant to remove Bedroom 1 marks; consider re-check
- Close ticket once landlord and tenant are updated

## Missing or unavailable information
- Landlord contact details not on file
- Who changed the lock and holds the spare key
- Whether dog flap was ever consented

## Conflicts between sources
- Visit date: 13 Feb (events 002-004) superseded by 15 Feb reschedule (events 009-014); report says 16 Feb
- Event 017 said no issues but report records a dog flap and one defect
- Landlord addressed as Oliver Bennett (event 017) but email from Felix Clarke (event 020)

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection complete, report sent. Outstanding: dog flap consent, lock change/spare key, Bedroom 1 marks, landlord identity confirmation.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the landlord (reply) and tenant (questions); hold until 21 Feb.

**3. Does anything need a human decision, and why?**

Not yet. Escalate only if the dog flap consent dispute or lock/key issue becomes a tenancy or legal matter, or identity is not resolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord (Felix Clarke)","recipient_role":"landlord","channel":"email","contact":"existing thread (event 020 email)","tic… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","questions":["Was the d… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Inspection summary email (event 017) said \"no issues\" but report notes dog flap and Bedroo… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-020-inspection-findings","reason":"Waiting for Tenant","comment":"Awaiting tenant answers on dog flap consent and lock ch… | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after put_on_hold |

## Failed or unverified actions
- A3: API error but read-back shows note in place; not retried
- A4: API error but read-back shows hold in place; not retried
