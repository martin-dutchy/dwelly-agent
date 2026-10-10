# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection report was filed. It records a dog flap and Bedroom 1 sticker marks, although the agency's earlier email to the landlord said no issues. I corrected that with the landlord and asked the tenant about consent, the lock change and a spare key.

## Where the case stands
Inspection done and report filed (result stage). Landlord has raised the unapproved dog flap and a spare key after a lock change. Waiting on the tenant and landlord; review 2024-02-23.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the tenant whether the dog flap had consent, who changed the lock and when, and for a spare key by 23 Feb | Tenant | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Correct the earlier 'no issues' summary to the landlord and ask whether they consented to the flap or changed the lock | Landlord | email | A2 ✅ |
| 3 | WAIT | Review replies on 23 Feb | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for having us in for the inspection. Two things we need your help with. 1) The report notes a dog flap fitted in the back door of the utility room. Changes like this need the landlord's written consent under the tenancy's alterations clause (and the pets clause). Did you get consent, and if so can you send us a copy or tell us when and from whom? 2) The landlord is asking about a spare front door key after a lock change. Our records don't show a lock change. Do you know who changed the lock and when? Please could a spare key be sent or dropped to our office by Friday 23 February. The report also notes marks from sticky strips on the Bedroom 1 wall by the window, which will need removing and making good. Please reply by Friday 23 February; we'll be in touch again after that. Nothing is decided on the dog flap yet.

**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email. Apologies: our earlier summary said no issues, but the attached report does note that the tenants have installed a dog flap in the utility/back door, and sticker marks (command-strip type) on the Bedroom 1 wall for the tenant to make good. Everything else was rated Good. We have asked the tenant whether consent was given for the dog flap under the alterations/pets clauses, and who changed the front door lock and when; our records show no lock change. We've asked for a spare key to be sent to us by 23 February. Whether to consent to or require removal of the dog flap is your decision, and we'll report back after the tenant replies. Could you also confirm whether you or anyone for you changed the lock, and whether you gave consent for the flap? Reply by 23 February please.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here decides whether the dog flap is allowed or must be removed
- The messages do not establish who changed the lock
- Recording the inspection as completed does not resolve the date discrepancy

## Remaining work
- Tenant reply on flap consent, lock change and spare key (due 23 Feb)
- Landlord decision on the flap
- Tenant to remove the Bedroom 1 sticker marks and make good
- Close the ticket once these are settled

## Missing or unavailable information
- Whether consent was given for the dog flap
- Who changed the lock and when
- Which date the inspection actually took place (15 or 16 Feb)

## Conflicts between sources
- Event 017 said no issues but the report notes a dog flap and a defect
- Landlord named Oliver Bennett vs Felix Clarke
- Appointment dates 13/02, 15/02, report 16/02; 15/02/2024 is a Thursday, not a Friday
- The system holds no lock change

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete and the report is filed. Outstanding: dog flap consent, the lock change and spare key, the Bedroom 1 make-good, and the date discrepancy.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the tenant (consent, lock, spare key by 23 Feb) and to the landlord (correction and questions). A follow-up is set for 23 Feb.

**3. Does anything need a human decision, and why?**

Not yet. The landlord's decision on the flap comes after the replies are in. If a dispute develops, a human takes it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `record_work_result` | {"ticket_ref":"NBL-020-inspection-findings","outcome":"completed","evidence":"Inspection report (attachment-01), signed 16 Feb 2024, uploade… | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after record_work_result |
| A4 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 017 said 'no issues' but report records an unapproved dog flap (utility/back door) and… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-23","purpose":"Review tenant/landlord replies on dog flap consent, lock change… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
