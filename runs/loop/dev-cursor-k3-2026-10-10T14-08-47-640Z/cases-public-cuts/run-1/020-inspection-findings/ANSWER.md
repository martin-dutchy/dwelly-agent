# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord was told on 17 Feb there were no issues, but the report records a dog flap and a Bedroom 1 sticker defect. I corrected this with the landlord and asked the tenant about the dog flap consent, the lock change and a spare key by 23 Feb. I added a conflicts note and set a follow-up for 23 Feb.

## Where the case stands
Inspection done (visit 15 Feb, report signed 16 Feb), report sent to landlord. Landlord has now raised the unapproved dog flap and a spare key after a lock change. Waiting on tenant and landlord replies; follow-up set for 23 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant who fitted the dog flap and whether consent was given, who changed the lock and when, and for a spare key to the agency by 23 Feb; ask them to fix the Bedroom 1 marks | Tenant | email | A2 ✅ |
| 2 | OTHER | Reply to landlord correcting the 'no issues' email, stating what the record shows on the dog flap and lock, and asking whether they consented or changed the lock | Landlord | email | A1 ✅ |
| 3 | WAIT | Review tenant and landlord replies on 23 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Dear Landlord, thank you for your email. First, a correction: our email of 17 Feb said no issues were found. That was wrong. The inspection report (attached to that email) records a dog flap fitted in the back door/utility room, and sticker marks on the Bedroom 1 wall that the tenant is to remove and make good. I'm sorry for the confusion. Dog flap: we have no record of your consent, and alterations need it under the tenancy. We are asking the tenant who fitted it, when, and whether consent was given. Please tell us if you did agree to it. Front door key: our records do not show a lock change. We are asking the tenant who changed it and when, and asking for a spare key to be given to the agency by Friday 23 Feb. Please tell us if you or anyone for you changed the lock. We will update you once the tenant replies, by 23 Feb.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for having us in for the inspection. Two things please. 1) The inspection noted a dog flap in the back door. Alterations need the landlord's written consent under your tenancy agreement. Did you fit it, when, and was consent given? If so, please send us a copy. 2) Our records don't show a change of front door lock. Has the lock been changed, by whom and when? If so, please get a spare key to our office by Friday 23 Feb, so we have access in an emergency (we will always give 24 hours' written notice for normal visits). Also, please remove the sticker marks by the Bedroom 1 window and make good. Please reply by Friday 23 Feb. We'll be in touch again by then.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not establish who fitted the dog flap or changed the lock, or whether consent was given
- No decision made on whether the dog flap stays or any deposit deduction
- Landlord's email was seen only as a summary

## Remaining work
- Tenant answers on dog flap and lock; spare key to agency by 23 Feb
- Landlord to confirm consent or lock change
- Confirm landlord's identity and name
- Correct the inspection record (issues flagged NO and zero photos)
- Possible human decision on the dog flap if no consent

## Missing or unavailable information
- Who fitted the dog flap, when, and whether consent was given
- Who changed the lock and when
- Full text of landlord email
- Landlord name conflict: Oliver Bennett vs Felix Clarke

## Conflicts between sources
- Event 017/018 'no issues' vs report (dog flap, Bedroom 1 defect); trusted the signed report
- Landlord named Oliver Bennett (event 017) vs Felix Clarke (event 020 summary)
- Appointment dates 13 Feb vs 15 Feb vs report date 16 Feb; 'Friday 15th' vs Thursday
- Dog flap location: utility room vs back door

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete and the report has been sent. Outstanding: the dog flap consent, the lock change and spare key, the sticker marks, and the record corrections.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the tenant (questions and spare key request) and to the landlord (correction and position). Follow-up on 23 Feb.

**3. Does anything need a human decision, and why?**

Not yet. A human may be needed on the dog flap (consent or remedy) if the replies show it was unapproved. The landlord name mismatch should be checked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Conflicts: event 017 told landlord 'no issues' and event 018 flagged Inspection issues: NO, … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-23","purpose":"Check tenant reply on dog flap consent, lock change, spare key;… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
