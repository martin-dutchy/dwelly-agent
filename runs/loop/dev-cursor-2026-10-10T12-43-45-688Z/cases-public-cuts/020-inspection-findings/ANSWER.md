# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord email raised an unapproved dog flap and a spare key after a lock change. I corrected our earlier 'no issues' email to the landlord, asked the tenant for their account, asked the landlord to confirm identity, and set a follow-up for 22 Feb.

## Where the case stands
Inspection done 15/16 Feb, report filed (no major issues flagged, but dog flap and Bedroom 1 sticker marks recorded). Landlord raised unapproved dog flap and spare key after lock change. Waiting on tenant account and landlord identity confirmation; follow-up 22 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Asked tenant about dog flap permission, lock change/spare keys, and to remove Bedroom 1 stickers | Tenant | email | A2 ✅ |
| 2 | OTHER | Replied to landlord correcting the 'no issues' email, summarising findings, asking to confirm identity | Landlord | email | A1 ✅ |
| 3 | WAIT | Review replies and update landlord by 22 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, existing thread (event 020 email)** (verified)

> Thank you for your email. First, a correction: our email of 17 Feb said no issues were found, but the inspection report (attached to that email) does record two points. (1) A dog flap has been fitted in the back door/utility room. (2) Sticker-type marks from command strips on the Bedroom 1 wall by the window, which the tenant is to remove and make good. Everything else was rated good. We are sorry for the confusion. On the dog flap, we are checking with the tenant whether any permission was given and will tell you what they say. On the spare front door key and the lock change, we are asking the tenant when and why the lock was changed and who holds keys, and will come back to you. As the name on your email differs from the landlord name we hold, please confirm you are the landlord or acting for them. You will hear from us by 22 Feb.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> - Our inspection noted a dog flap in the back door. Did you get the landlord's permission before it was fitted, and if so can you send us the written agreement?
> - Has the front door lock been changed? If so, when, and who has the spare key(s)?
> - Please remove the command-strip stickers on the Bedroom 1 wall by the window and make good.
> 
> Why: The landlord has raised an unapproved dog flap and a spare key after a lock change; we need the tenant's account before replying fully.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not establish whether the dog flap was permitted or whether the lock was changed
- Does not decide any tenancy consequence for the dog flap
- Does not confirm the email sender is the landlord

## Remaining work
- Tenant reply on dog flap and lock/keys (agency)
- Landlord identity confirmation and decision on dog flap (landlord)
- Tenant to remove Bedroom 1 marks
- Ticket stays open

## Missing or unavailable information
- Whether dog flap had consent
- Lock change details and key holders
- Landlord sender identity (Felix Clarke vs Oliver Bennett)

## Conflicts between sources
- Event 017 said no issues vs report recording dog flap and sticker defect: trusted report.
- Landlord named Oliver Bennett (017) vs Felix Clarke (020): asked to confirm.
- Visit 13 Feb rescheduled to 15 Feb; report dated 16 Feb; tenant's 'Friday 15th' is a Thursday.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection complete and report filed; landlord's dog flap and spare-key questions are outstanding pending the tenant's account; Bedroom 1 marks to be made good.

**2. What is the next action, who is it for, and through which channel?**

Tenant asked by email (A2); landlord replied to by email (A1); follow-up 22 Feb (A4).

**3. Does anything need a human decision, and why?**

Not now. The dog flap consent outcome may need a landlord decision later; no human escalation yet.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 020 email)","body":"Thank you f… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","questions":["Our inspe… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 017 said \"no issues\" but report records dog flap and Bedroom 1 sticker marks; correc… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2024-02-22","purpose":"Review tenant reply on dog flap permission/lock change and landlord identity confirmation; update landlord… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
- A3: add_note reported timeout but read-back showed NOTE-103 in place; not retried.
