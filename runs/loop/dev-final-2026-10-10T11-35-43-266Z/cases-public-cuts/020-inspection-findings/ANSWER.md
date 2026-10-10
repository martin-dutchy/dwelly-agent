# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection is complete and the report was sent to the landlord. The landlord now queries an unapproved dog flap and a spare key after a lock change. I asked the tenant for the facts, asked the landlord to confirm identity, set a follow-up and returned the job to auto.

## Where the case stands
Inspection done 15/02 (report dated 16/02, uploaded, no major issues). Landlord has raised a follow-up about an unapproved dog flap and a spare key after a lock change. Waiting on tenant answers and landlord identity confirmation; review 2024-02-21.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant whether the dog flap was agreed, whether the lock was changed and where the spare key is; remind about Bedroom 1 sticker marks | Tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Acknowledge landlord's email and ask them to confirm their relationship to the property (name differs from Oliver Bennett) | Felix Clarke, landlord | email | A1 ✅ |
| 3 | WAIT | Follow-up to review replies on 2024-02-21 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Felix Clarke (landlord) via email, existing thread (event 020 email)** (verified)

> Dear Mr Clarke, thank you for your message about Flat 12, 162 Beacon Close. The inspection report we sent on 17 Feb notes that a dog flap has been fitted. We are checking with the tenant whether it was agreed and will tell you what we find. We are also asking the tenant about the lock change and where the spare front door key is. Please can you confirm your relationship to the property, as our earlier report went to Oliver Bennett? We will update you once we have the tenant's answer.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> Hello, thank you for having us for the inspection. Two quick questions from the landlord: 1) Was the dog flap in the back door agreed with the landlord or agency? If so, please send us any written permission. 2) Has the front door lock been changed, and if so, when, and where is the spare key? Also, the report noted sticker marks on the Bedroom 1 wall by the window, which need removing and making good. Thanks for your help.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not establish whether the dog flap was permitted or whether a lock change happened
- Does not decide any tenancy-breach action or charges
- Ticket not closed

## Remaining work
- Agency: collect tenant's answers and update landlord
- Agency: confirm sender identity
- Tenant to remove Bedroom 1 sticker marks
- Decide on dog flap consent/lock change with landlord once facts known; escalate if disputed or legal

## Missing or unavailable information
- Landlord contact details and identity confirmation (Felix Clarke vs Oliver Bennett)
- Whether dog flap was authorised
- Whether the lock was changed and where the spare key is

## Conflicts between sources
- Visit dates 13/02 vs 15/02: 15/02 is the later genuine reschedule; report dated 16/02
- Landlord named Oliver Bennett in event 017 but email from Felix Clarke in event 020

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection completed and reported; outstanding are the landlord's dog flap and spare key queries, which need tenant answers, and landlord identity confirmation.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant with the questions, and email to the landlord acknowledging and asking identity confirmation; follow-up 2024-02-21.

**3. Does anything need a human decision, and why?**

Not yet. A human is needed only if the tenant's answers show a tenancy breach dispute or the sender identity cannot be resolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Felix Clarke","recipient_role":"landlord","channel":"email","contact":"existing thread (event 020 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-21","purpose":"Check tenant's answer on dog flap permission and lock change/sp… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Landlord email (event 020) from Felix Clarke; earlier report addressed to Oliver Bennett - n… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
