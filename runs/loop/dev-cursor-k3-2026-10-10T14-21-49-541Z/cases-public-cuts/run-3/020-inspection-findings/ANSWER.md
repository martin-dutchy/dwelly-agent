# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection report found a tenant-installed dog flap and sticker marks in Bedroom 1, but the earlier landlord email said no issues. I corrected this with the landlord, asked the tenant about consent, the lock change and a spare key, noted the conflicts, and set a follow-up for 22/02.

## Where the case stands
Inspection done (report dated 16/02, uploaded event 018). Landlord replied (event 020) about an unapproved dog flap and a spare key after a lock change. Waiting on tenant and landlord replies; follow-up 22/02/2024.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant about dog flap consent, who changed the lock and when, and for a spare key to the agency by 25/02; mention Bedroom 1 marks | Tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Reply to landlord correcting the 'no issues' email, explain what the record shows, ask whether consent was given and who wrote the email | Landlord | email | A1 ✅ |
| 3 | WAIT | Review replies on 22/02/2024 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email. First, a correction: our earlier email said no issues were found, but the attached inspection report does record two things: a dog flap installed by the tenants (noted in the utility room/back door), and sticker-type marks on the Bedroom 1 wall which the tenant is to remove and make good. Apologies for the confusion. Our records do not show that consent was given for the dog flap, and they do not show a lock change or who holds a spare front door key. We are asking the tenant today whether consent was given, who changed the lock and when, and asking for a spare key to be sent to us by 25/02/2024. We will update you by 22/02/2024. Please also confirm whether you gave the tenants any consent, and note your email was signed Felix Clarke while our record names Oliver Bennett as landlord - could you confirm who wrote it?

**A2 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for having us in for the inspection. Two things please. 1) Our inspection noted a dog flap fitted in the back door. Changes like this need the landlord's written consent under the tenancy's alterations clause (and pets clause). Was consent given, and by whom? 2) We understand the front door lock may have been changed. Could you tell us who changed it and when, and send a spare front door key to our office by 25/02/2024 so we have one in case of emergency? We'll only enter with proper notice. Also, the inspector noted marks on the Bedroom 1 wall by the window (like command strip stickers) - please remove them and make good. We'll be in touch again by 22/02/2024.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not establish whether the dog flap was consented to, who changed the lock, or that a spare key exists
- Does not decide any tenancy breach or deposit deduction
- Does not confirm the identity of the email sender

## Remaining work
- Tenant reply on consent, lock change, spare key by 25/02 (agency)
- Landlord confirmation of consent and sender identity (agency)
- Bedroom 1 marks to be made good by tenant; recheck later

## Missing or unavailable information
- Who installed the dog flap and whether consent was given
- Who changed the lock and when
- Whether the landlord email sender Felix Clarke is the landlord Oliver Bennett

## Conflicts between sources
- Event 017 said no issues; the report records a dog flap and Bedroom 1 marks (trusted the report)
- Visit dates 13/02 vs 15/02 vs report 16/02; 'Friday 15th' is a Thursday
- Landlord email names Felix Clarke; record says Oliver Bennett

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection complete and report filed; landlord query on dog flap consent and spare key after a lock change is outstanding, awaiting tenant and landlord answers.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the tenant (consent, lock change, spare key by 25/02) and to the landlord (correction, record position, identity check); follow-up 22/02.

**3. Does anything need a human decision, and why?**

Not yet. A human would be needed if consent is disputed or the sender identity cannot be confirmed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Conflicts: event 017 email said no issues, report records dog flap + Bedroom 1 sticker marks… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-22","purpose":"Review tenant/landlord replies on dog flap consent, lock change… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
