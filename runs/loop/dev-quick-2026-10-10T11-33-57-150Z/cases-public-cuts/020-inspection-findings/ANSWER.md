# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection of Flat 12 is complete and signed. The report records one defect (Bedroom 1 command-strip marks for the tenant to make good), but the earlier landlord email said no issues were found. The landlord has now raised an unapproved dog flap and a spare-key question, and I have messaged both the landlord and tenant to get the facts. No human decision is needed yet; I will review the replies on 2024-02-20.

## Where the case stands
Inspection report is signed and uploaded (event 018). The ticket is still in stage 'init' in the system. The inspection is otherwise finished, with one tenant-side defect and two landlord queries open: an unapproved dog flap, and a spare front door key after a lock change. Waiting on the landlord and tenant replies.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Reply to the landlord on the existing thread: explain the dog flap is unapproved, say we are asking the tenant, ask for lock-change details and spare-key arrangements, and correct the earlier 'no issues' summary. | Felix Clarke, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant when and by whom the dog flap was fitted, and ask them to remove and make good the Bedroom 1 command-strip marks. | Tenant, Flat 12 | email | A2 ✅ |
| 3 | WAIT | Review replies on 2024-02-20 and chase the landlord on a second channel if nothing arrives by 2024-02-21. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Felix Clarke (landlord) via email, existing thread (event 020 email)** (verified)

> Dear Felix Clarke,
> 
> Thank you for your email about Flat 12, 162 Beacon Close.
> 
> Dog flap: the inspection report notes a dog flap fitted in the back door (utility room). We have no record of you approving it. We are asking the tenant when it was fitted and who arranged it, and we will come back to you with their answer. Any decision on keeping it is yours.
> 
> Spare front door key: we do not have a record of a lock change or of where a spare key is held. Please could you confirm when the lock was changed, who arranged it, and whether you want us to collect a spare key, so we can check what we hold.
> 
> Inspection summary: our earlier email said no issues were found. That was not complete. The report records one defect: sticker-type marks on the Bedroom 1 wall beside the window, which the tenant is to remove and make good. The report also notes the dog flap and the tenants' pets.
> 
> Kind regards,
> Northbridge Lettings

**A2 · send_message → Tenant, Flat 12, 162 Beacon Close (tenant) via email, existing thread (event 006 email)** (verified)

> Hello,
> 
> Thank you for your help with the property inspection at Flat 12, 162 Beacon Close. The report is now complete. We need two things from you:
> 
> 1. Dog flap: the report notes a dog flap in the back door. Please tell us when it was fitted, and who arranged it. The landlord has asked about it.
> 2. Bedroom 1: there are sticker-type marks on the wall beside the window, which look like they came from command strips. Please remove them and make good the wall when you can.
> 
> Everything else was recorded as in good condition. If you have any questions, just reply to this email.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Sending these messages does not establish that the dog flap is unauthorised; the tenant's answer and the landlord's decision are still needed.
- We have no record of the lock change or where a spare key is held, so the key question is not answered.
- The inspection date is unresolved: the report says 16 Feb, while the messages say 15 Feb.
- No repair, quote or spend is approved or instructed.

## Remaining work
- Landlord to confirm lock-change details and spare-key arrangement, and decide on the dog flap (owner: landlord).
- Tenant to answer dog-flap question and make good Bedroom 1 wall (owner: tenant).
- Confirm the inspection date (15 vs 16 Feb) with Northbridge Lettings and the landlord name on file (Oliver Bennett vs Felix Clarke) (owner: internal).
- Ticket stage needs updating from 'init' once the outstanding points are closed (owner: internal).

## Missing or unavailable information
- When and by whom the dog flap was installed, and whether the landlord consented.
- Lock-change details and whether the agency holds a spare front door key.
- Confirmed inspection date: 13, 15 or 16 February 2024.
- Which landlord name is correct: Oliver Bennett or Felix Clarke.

## Conflicts between sources
- Ticket stage is 'init' in the system, but the history shows the inspection report was uploaded (event 018). Trusted the history for the inspection being done.
- Inspection date: 13/02 (events 002-004), 15/02 (events 009-014, tenant-requested change), 16 February (signed report). Did not resolve; flagged for confirmation.
- Landlord name: Oliver Bennett (event 017) vs Felix Clarke (event 020). Replied to the sender on the existing thread; the correct name still needs confirming.
- Event 017 said no issues were identified, but the report records a Bedroom 1 defect and a dog flap. Trusted the signed report and corrected the landlord.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is done and the signed report is uploaded, but the ticket is still at stage 'init'. Outstanding: the landlord's dog-flap and spare-key queries, the tenant's dog-flap answer and Bedroom 1 repair, and the inspection date and landlord name conflicts.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord Felix Clarke on the existing thread (done, A1), and email the tenant on the existing thread (done, A2). Review replies on 2024-02-20 and chase the landlord by a second channel if needed by 2024-02-21 (A4).

**3. Does anything need a human decision, and why?**

Not yet. The dog flap consent and any key or lock decision belong to the landlord, and the replies are still pending. Escalate only if the landlord or tenant gives conflicting instructions or does not answer after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"ticket_ref":"NBL-020-inspection-findings","recipient_name":"Felix Clarke","recipient_role":"landlord","channel":"email","contact":"existin… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"ticket_ref":"NBL-020-inspection-findings","recipient_name":"Tenant, Flat 12, 162 Beacon Close","recipient_role":"tenant","channel":"email"… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Record conflicts: (1) ticket stage is 'init' but inspection report was uploaded (event 018).… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-20","party":"Felix Clarke (landlord); tenant","purpose":"Review replies on dog… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
