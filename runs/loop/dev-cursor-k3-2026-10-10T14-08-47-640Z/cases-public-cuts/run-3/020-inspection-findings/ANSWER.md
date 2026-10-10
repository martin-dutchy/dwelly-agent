# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord replied to the inspection email about an unapproved dog flap and a spare key after a lock change. The report confirms the flap, so our 'no issues' email was wrong. I corrected that with the landlord, asked the tenant about consent and the lock, requested a spare key, noted conflicts, set a follow-up and returned the ticket to auto.

## Where the case stands
Inspection done (report dated 16 Feb, uploaded 17 Feb). Landlord raised dog flap and spare key after lock change. Waiting on tenant for consent and lock facts and a spare key; follow-up 22 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant about dog flap consent and lock change, request spare key by 25 Feb, ask them to make good the Bedroom 1 marks | Tenant | email | A2 ✅ |
| 2 | OTHER | Reply to landlord correcting the 'no issues' summary and explaining what is being checked | Landlord | email | A1 ✅ |
| 3 | WAIT | Review replies on 22 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, existing thread (event 020 email)** (verified)

> Thank you for your email. First, a correction: our email of 17 Feb said no issues were found, but the attached inspection report does record two things: a dog flap installed in the back door (utility room), and sticker-type marks on the Bedroom 1 wall which the tenant is to remove and make good. Apologies for the confusion. On the dog flap, our records don't show your consent, so we are asking the tenant whether permission was given and will report back. On the lock change, our records don't show who changed it or when, so we are asking the tenant, and we are asking them to get a spare front door key to us by 25 Feb. Please tell us if you did consent to the flap or arranged the lock change yourself. We will update you by 22 Feb.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> Hi, thanks for having us in for the inspection. Overall the flat was in good condition. Two things please: 1) The report notes a dog flap in the back door. Changes like this need the landlord's written consent under the tenancy's alterations clause (and pets clause). Did you get consent? If so, please send us a copy or tell us when and from whom. 2) Our records don't show a lock change on the front door. Was the lock changed, and if so who did it and when? Please get a spare front door key to our office by 25 Feb so we hold one. Also, please remove the sticker marks by the Bedroom 1 window and make good. Please reply by 22 Feb; we will update you then.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not establish whether the dog flap was consented to or who changed the lock
- Not a decision on any deposit deduction or tenancy breach

## Remaining work
- Tenant to answer on consent, lock change and supply spare key (agency, 22/25 Feb)
- Landlord to confirm whether they consented or arranged lock change
- Escalate to human if consent is disputed or a lock was changed unlawfully

## Missing or unavailable information
- Who installed the dog flap and whether consent was given
- Who changed the front lock and when; who holds keys

## Conflicts between sources
- Visit 13/02 vs rescheduled 15/02 vs report dated 16/02; trusted the later reschedule
- Tenant's 'Friday 15th' vs 15/02/2024 being a Thursday
- Landlord named Oliver Bennett (ev017) vs Felix Clarke (ev020); treated as the landlord on the thread
- Email said no issues but report records dog flap and Bedroom 1 marks; trusted report

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Inspection complete and report filed. Outstanding: dog flap consent, lock change facts and a spare key, and the Bedroom 1 marks to be made good.

**2. Next action, recipient, channel?**

Emails sent to the landlord (correction and update) and the tenant (questions and key request) on existing threads. Follow-up on 22 Feb.

**3. Does anything need a human decision?**

Not yet. It becomes one if the flap or lock change turns out to be unauthorised and the landlord wants action.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 020 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Landlord email ev020 raises unapproved dog flap and spare key after lock change. Report (ev0… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-22","party":"Tenant and landlord","purpose":"Review tenant answers on dog flap… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
