# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection is complete. The report records a dog flap and Bedroom 1 sticker marks, so the earlier 'no issues' email to the landlord was wrong. I corrected that with the landlord, asked the tenant about consent, the lock change and a spare key, set a follow-up for 23 Feb and returned the ticket to auto mode.

## Where the case stands
Inspection done, report uploaded and sent to landlord. Landlord has raised an unapproved dog flap and a spare key after a lock change. Agency is waiting on the tenant, with a review on 23 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant about dog flap consent, who changed the lock and when, and for a spare key by 23 Feb. Also ask them to make good the Bedroom 1 marks. | Tenant | email | A2 ✅ |
| 2 | OTHER | Reply to the landlord with what the record shows and apologise for the 'no issues' summary. | Landlord | email | A1 ✅ |
| 3 | WAIT | Follow up on 23 Feb for the tenant's reply and a landlord update. | Tenant and landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email. Please accept our apology: our summary of 17 Feb said no issues were found, but the attached report does record that the tenants have fitted a dog flap in the back door (utility room), and sticker-type marks on the Bedroom 1 wall that the tenant is to remove and make good. Our records do not show any consent for the dog flap, so we are asking the tenant whether permission was given and will come back to you. The report does not mention a lock change and nothing on our file shows one, so we are asking the tenant who changed the lock and when, and asking for a spare front door key to be sent to us by 23 Feb. Please tell us if you did arrange the lock change or hold a key yourself. We will update you by 23 Feb. Nothing is decided yet on the dog flap (consent, reinstatement or cost).

**A2 · send_message → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> Hi, thanks for having us in for the inspection. Two things please. 1) The report notes a dog flap in the back door. Changes like this need the landlord's written consent under the tenancy's alterations (and pets) clauses. Did you have their permission? If so, please send us a copy. 2) Our records don't show a lock change on the front door. Has the lock been changed, and if so who did it and when? If so, please get a spare front door key to us by 23 February so the agency and landlord hold one. Also, the report noted marks on the Bedroom 1 wall by the window that look like sticker residue from adhesive strips; please remove these and make good. We'll be in touch again by 23 February.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here decides whether the dog flap is consented to, removed or charged for.
- Nothing here establishes who changed the lock.
- Asking for a key does not give the agency a right of entry.

## Remaining work
- Tenant reply on consent, lock change and key (agency, by 23 Feb).
- Landlord decision on the dog flap once the facts are known.
- Check that the Bedroom 1 marks are made good.
- Close the ticket after the follow-up.

## Missing or unavailable information
- Whether the landlord consented to the dog flap.
- Who changed the lock, and when.
- Who holds spare keys.

## Conflicts between sources
- Landlord named Oliver Bennett (event 017) vs Felix Clarke (event 020); treated as the landlord by the thread.
- Visit dates 13/02 vs 15/02, and the report date 16/02. 'Friday 15th' was actually a Thursday.
- Event 017 said no issues, but the report records a dog flap and Bedroom 1 marks. I trusted the report.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

The inspection is done and the report has been sent to the landlord. Outstanding: dog flap consent, the lock change and spare key, and the Bedroom 1 marks.

**2. What is the next action, for whom, and through which channel?**

Emails are already sent to the tenant (A2) and to the landlord (A1). The next step is the follow-up on 23 Feb (A4).

**3. Does anything need a human decision?**

Not yet. If the tenant has no consent and the landlord wants the flap removed or charged for, that decision would need a human. Nothing needs one now.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Landlord email event 020 (named Felix Clarke; event 017 addressed Oliver Bennett: name misma… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-23","purpose":"Check tenant reply on dog flap consent, lock change and spare k… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
