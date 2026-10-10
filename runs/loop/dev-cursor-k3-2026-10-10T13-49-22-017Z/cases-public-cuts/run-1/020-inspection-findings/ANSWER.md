# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection complete; landlord queried dog flap and spare key. I corrected our earlier 'no issues' email, asked the landlord and tenant the open questions, noted conflicts, set a 22 Feb follow-up and returned the job to auto.

## Where the case stands
Inspection done and report filed (event 018). Landlord has raised an unapproved dog flap and a missing spare key after a lock change. Waiting on landlord and tenant replies; follow-up 22 Feb 2024.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant about dog flap consent, lock change, spare key by 22 Feb, and to fix the wall marks | Tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Reply to landlord: correct the 'no issues' email, say what the record shows, ask about consent, lock change and sender identity | Landlord | email | A1 ✅ |
| 3 | WAIT | Wait for replies; chase 22 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, existing thread (event 020 email)** (verified)

> Dear Landlord, thank you for your email. Two corrections and answers first. Our earlier email said no issues were found; the attached report does in fact note (1) a dog flap installed in the back door/utility room, and (2) sticker-type marks on the Bedroom 1 wall that the tenant is to remove and make good. Please disregard "no issues".
> Dog flap: our records don't show any approval for it. We are asking the tenant when and why it was fitted. Could you confirm whether you gave consent at any point, and whether you want it removed and the door made good, or are willing to allow it? We'll take no action on it until we hear from you.
> Spare front door key: our records don't show a lock change. We are asking the tenant who changed it and when, and to get a spare key to us. Could you tell us if you or anyone for you changed the lock?
> Your email is signed Felix Clarke but we hold this property under a different landlord name (Oliver Bennett). Please confirm who you are in relation to the property.
> We'd be grateful for your reply by 22 February 2024; we'll update you by then.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> - Did you fit the dog flap in the back door, when, and did you have written permission from the landlord or agency?
> - Has the front door lock been changed? If so, who changed it and when?
> - Please get a spare front door key to our office (or tell us a convenient time to collect it) by 22 February 2024.
> - Please remove the sticker marks on the Bedroom 1 wall by the window and make good.
> 
> Why: Landlord has raised the unapproved dog flap and a missing spare key after a lock change; the inspection report also noted the dog flap and wall marks. Nothing has been decided yet, we are just gathering facts.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here decides whether the dog flap is allowed or who pays for removal.
- Nothing establishes who changed the lock.
- No access or key entry is authorised by these messages.

## Remaining work
- Landlord to decide on dog flap (allow or reinstate) and confirm identity
- Tenant to explain flap and lock change and supply spare key
- Tenant to remove Bedroom 1 sticker marks
- Chase 22 Feb; escalate if the facts conflict

## Missing or unavailable information
- Dog flap consent history
- Lock change details
- Whether Felix Clarke is the landlord (record says Oliver Bennett)
- Inspection photos (report shows zero photos)

## Conflicts between sources
- Event 017 said no issues, but the report notes a dog flap and wall marks; I trusted the report.
- Landlord on file Oliver Bennett vs sender Felix Clarke.
- Visit booked 15/02, report dated 16/02; event 006 calls 15th a Friday but it was a Thursday.
- Report shows 1 defect but zero photos.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection finished and report filed. Outstanding: dog flap consent, lock change and spare key facts, landlord identity confirmation, tenant removing wall marks.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the landlord and the tenant (existing threads) asking for the facts by 22 Feb; follow-up scheduled.

**3. Does anything need a human decision, and why?**

Not yet. The dog flap decision is the landlord's. Escalate if the replies conflict or the sender's identity cannot be confirmed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 020 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","questions":["Did you f… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Conflicts: event 017 told landlord \"no issues\" but report notes dog flap and Bedroom 1 sti… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2024-02-22","purpose":"Chase landlord and tenant replies on dog flap consent, lock change and spare key","ticket_ref":"NBL-020-in… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
