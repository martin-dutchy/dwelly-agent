# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection was completed and the report sent to the landlord, but our summary wrongly said "no issues". The landlord now asks about an unapproved dog flap and a spare key after a lock change. I corrected the summary to the landlord, asked the tenant about the flap, the lock and the key, noted the record and set a follow-up for 22/02.

## Where the case stands
Inspection done 15/02 (report dated 16/02) and sent to landlord. Landlord has raised an unapproved dog flap and a spare key after a lock change. We are waiting on the tenant and landlord; review 22/02.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant about dog flap consent, who changed the lock and when, and for a spare key by 25/02; ask them to remove the Bedroom 1 stickers | Tenant | email | A2 ✅ |
| 2 | OTHER | Reply to the landlord with what the record shows, correct the earlier 'no issues' summary, and ask for their view on the flap and lock | Landlord | email | A1 ✅ |
| 3 | WAIT | Follow up on 22/02 on the tenant's answers | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email. Apologies: our summary of 17 Feb said "no issues", but the attached report does record two points: a dog flap installed in the utility room/back door, and sticker marks on the Bedroom 1 wall (tenant to remove and make good). The report does not say who fitted the flap or whether consent was given, and our records show no lock change at all. We are asking the tenant today whether the flap was agreed, who changed the lock, when, and to get a spare front door key to us by 25 Feb. Please tell us if you did not agree the flap or the lock change, and whether you want it reinstated or left. We will update you by 22 Feb. We have also noticed your name differs between our messages (Oliver Bennett / Felix Clarke) and are checking our record.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for your help with the inspection. Two quick questions from the landlord: 1) The inspector noted a dog flap in the back door. Did the landlord agree to it in writing? Alterations need their consent under the tenancy agreement. 2) Has the front door lock been changed? If so, who did it and when, and please could a spare key reach us by 25 February. Also, the report notes some sticker marks on the Bedroom 1 wall by the window; please remove them and make good. We will be in touch again by 22 February.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is established about who fitted the flap or changed the lock, or whether consent was given
- No decision on reinstatement, deposit deductions or cost
- The report does not prove the sticker marks are the tenant's responsibility beyond the inspector's note

## Remaining work
- Tenant answers on flap consent, lock change and spare key (due 25/02)
- Landlord decision on the flap and lock
- Fix the landlord name mismatch on the record
- Close the ticket once the findings are resolved

## Missing or unavailable information
- Who installed the dog flap and whether consent was given
- Whether and when the lock was changed, and who holds keys
- Correct landlord name

## Conflicts between sources
- Landlord named Oliver Bennett (event 017) vs Felix Clarke (event 020)
- Visit 13/02 vs 15/02: 15/02 is the latest reschedule
- Event 006 says Friday 15th, but 15/02/2024 is a Thursday
- Event 017 says no issues, but the report records a dog flap and Bedroom 1 marks

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete and the report has been filed. Outstanding: tenant answers on the dog flap consent, the lock change and the spare key, plus the landlord's decision on the flap and lock.

**2. What is the next action, who is it for, and through which channel?**

Questions to the tenant by email (A2), and a factual reply to the landlord by email (A1). A follow-up is set for 22/02 (A4).

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides on the flap and lock after the tenant replies. Escalate if the tenant disputes it or a deposit or legal issue arises.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Landlord email (event 020) raises unapproved dog flap and spare front door key after lock ch… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2024-02-22","purpose":"Chase tenant answers on dog flap consent, lock change and spare key (due 25/02); update landlord","ticket_… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
