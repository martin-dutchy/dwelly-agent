# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection was completed and the signed report was filed. It records one defect (Bedroom 1 command-strip marks for the tenant to make good) and an unapproved-looking dog flap. The 17 Feb email to the landlord wrongly said no issues. I sent corrections and questions to the landlord and the tenant, scheduled a review for 21 Feb, and escalated the landlord identity mismatch as P3 (ESC-104).

## Where the case stands
Inspection completed. The signed report (16 Feb 2024) records one defect and a dog flap. The ticket is at stage "result" after my record_work_result. Open items: the landlord's dog-flap and spare-key questions, the landlord identity mismatch, and the visit date conflict. The tenant's make-good of the Bedroom 1 marks is outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Reply to the landlord's 18 Feb email: correct the 17 Feb 'no issues' summary, state the dog flap and Bedroom 1 marks, ask whether they approved the dog flap, say the spare key is being checked, and ask them to confirm their name. | Landlord (Felix Clarke / Oliver Bennett, name to confirm), existing thread event 020 | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant about the Bedroom 1 marks to remove and make good, and ask when the dog flap was fitted and whether the landlord agreed. | Tenant, existing thread event 006 | email | A3 ✅ |
| 3 | WAIT | Review replies on the dog flap, spare key, landlord name and the inspection date on 2024-02-21. | internal | internal | A4 ✅ |
| 4 | ESCALATE_TO_HUMAN | Escalate the landlord identity mismatch and out-of-date inspection record to maintenance (P3). | Maintenance team | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Landlord (Felix Clarke / Oliver Bennett - name to confirm) (landlord) via email, existing thread (event 020 email)** (verified)

> Thank you for your email about Flat 12, 162 Beacon Close, Cedarford, ZZ9 5ZZ.
> 
> First, a correction. Our email of 17 February said no issues were identified at the inspection. That was wrong. The signed report (dated 16 February 2024) records two points:
> 1. A dog flap has been installed in the utility room back door. The report notes this as an installation at the property.
> 2. Sticker-type marks on the Bedroom 1 wall beside the window, which look like command strip marks. The tenant is to remove them and make good.
> 
> All rooms were otherwise rated good for condition and cleanliness, and the smoke and CO alarms were recorded as working.
> 
> On the dog flap: we have no record of your approval for this installation. We will ask the tenant about it and come back to you. Please tell us whether you approved it.
> 
> On the spare front door key after the lock change: we are checking the records and will come back to you. Please tell us when the lock was changed and who you understand holds the spare key.
> 
> Our records show the landlord for this property as Oliver Bennett. Please confirm your full name so we have the right details on file.

**A3 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hello,
> 
> Thank you for your help with the property inspection at Flat 12, 162 Beacon Close, Cedarford, ZZ9 5ZZ. The report has been completed. Two points for you:
> 
> 1. Bedroom 1 (the downstairs front bedroom): there are sticker-type marks on the wall beside the window, which look like command strip marks. Please remove them and make good the wall when you can.
> 
> 2. The inspection noted a dog flap fitted in the utility room back door. Please tell us when it was fitted and whether your landlord agreed to it. We are checking this with them.
> 
> The smoke and carbon monoxide alarms were recorded as working. Please let us know straight away if any alarm becomes faulty.

## Escalation
- **P3 → maintenance** (verified): Landlord identity mismatch and an inspection record that is out of date. The landlord email of 18 Feb (event 020) is from Felix Clarke, but the landlord on file is Oliver Bennett (event 017). The 17 Feb summary to the landlord said no issues, but the signed report records a dog flap and a Bedroom 1 defect.
  - Known: Signed report 16 Feb 2024 16:32:45: one defect (Bedroom 1 command-strip marks, tenant to make good), dog flap noted, alarms working. Inspection doc uploaded 17 Feb with Inspection issues: NO (event 018). Ticket still at init stage. Visit date conflict: 13 Feb (events 002-004), 15 Feb 12:00-17:00 (events 009-014), 16 Feb (report).
  - Missing: Landlord's confirmed name and identity. Whether the landlord approved the dog flap. Lock-change details and who holds the spare key. Actual inspection date. The body of the 18 Feb email, which I only have as a summary.
  - Options: Confirm the landlord's identity and then send the full inspection report to the verified landlord; Treat the dog flap as unapproved alteration and ask the tenant to reinstate or seek consent; Confirm the lock-change and spare-key position before releasing any key
  - Recommendation: Verify the landlord's identity from the agency's own records, then answer the dog flap and key questions. Correct the 17 Feb inspection summary on file.

## What this does not establish
- Recording the inspection result does not confirm the visit date: the report says 16 Feb, the booking says 15 Feb, and the earlier booking says 13 Feb.
- Nothing here approves the dog flap, and the tenant has not confirmed who fitted it.
- The spare key has not been released or confirmed.
- I have only the summary of the landlord's 18 Feb email, not the full text.
- The tenant's make-good has not been done or confirmed.

## Remaining work
- Landlord to confirm their name and whether the dog flap was approved (follow-up 2024-02-21).
- Landlord's spare-key and lock-change question to be answered once the key position is checked.
- Tenant to remove and make good the Bedroom 1 marks; tenant to say when the dog flap was fitted.
- Maintenance to check the landlord identity and correct the 17 Feb summary on file (ESC-104).
- Ticket not closed: the landlord has not yet been told the full findings and the outcome is open.

## Missing or unavailable information
- Landlord's confirmed name (Felix Clarke or Oliver Bennett).
- Whether the landlord approved the dog flap.
- Lock-change date and spare-key holder.
- Actual inspection date (13, 15 or 16 Feb).
- Full text of the landlord's 18 Feb email (only a summary available).

## Conflicts between sources
- Landlord name: event 017 is addressed to Oliver Bennett; event 020 is from Felix Clarke. I did not treat the sender as verified.
- Inspection date: 13 Feb (events 002-004), 15 Feb (events 009-014), 16 Feb (report). I did not book or confirm any date.
- Event 017 says no issues were found; the signed report records a dog flap and a Bedroom 1 defect. I trusted the signed report.
- Ticket stage shows init, but the history shows the inspection document uploaded. I set the stage to result with record_work_result.
- Event 020 is a summary only; I did not see the full email text.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is done (signed 16 Feb 2024). The ticket is at result stage. Outstanding: the landlord's dog-flap approval and spare-key question, the landlord identity mismatch, the actual inspection date, and the tenant's make-good.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord on the existing thread (A2) to correct the summary and ask the questions. Email the tenant on the existing thread (A3) about the Bedroom 1 marks and the dog flap. Review on 21 Feb (A4).

**3. Does anything need a human decision, and why?**

Yes, the landlord identity mismatch (Felix Clarke vs Oliver Bennett) and the spare-key release. These need checking against the agency's records before any key or report goes out (ESC-104, P3).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"NBL-020-inspection-findings","outcome":"completed","evidence":"Inspection report signed 16 Feb 2024 16:32:45 (attachment-01-p… | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after record_work_result |
| A2 | `send_message` | {"recipient_name":"Landlord (Felix Clarke / Oliver Bennett - name to confirm)","recipient_role":"landlord","channel":"email","contact":"exis… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-21","party":"Landlord and tenant","purpose":"Review replies on the dog flap ap… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Landlord identity mismatch and an inspection record that is out of date. The landlord email … | 1 | ✅ verified | ESC-104 found in the escalate_to_human log |

## Failed or unverified actions
_None._
