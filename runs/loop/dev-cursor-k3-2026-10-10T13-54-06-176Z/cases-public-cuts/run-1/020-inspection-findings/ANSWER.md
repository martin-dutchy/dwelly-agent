# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection report is filed and shows Good ratings throughout, plus a tenant-fitted dog flap and sticker marks in Bedroom 1. The landlord (email signed Felix Clarke) queried the dog flap and a spare key after a lock change. I corrected our earlier 'no issues' email, asked the landlord and tenant the open questions, and set a follow-up for 22 Feb.

## Where the case stands
Inspection done and report uploaded (stage: result received). Landlord has queried an unapproved dog flap and a spare key after a lock change. Agency is waiting on the landlord and the tenant; follow-up set for 2024-02-22.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant who fitted the dog flap and changed the lock, and when, and ask for a spare key by 22 Feb. Also flag the Bedroom 1 marks. | Tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Reply to the landlord: correct the earlier 'no issues' email, state what the record does and does not show, ask about dog flap approval and the lock/spare key, and ask them to confirm identity (Felix Clarke vs Oliver Bennett). | Landlord | email | A1 ✅ |
| 3 | WAIT | Wait for replies; review on 22 Feb. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (Oliver Bennett on record) (landlord) via email, agency landlord record** (verified)

> Dear Landlord, thank you for your email. First, a correction to our 17 Feb email: it said no issues were found. The attached report does record two things: (1) a dog flap fitted in the back door/utility room, and (2) marks from sticky strips on the Bedroom 1 wall by the window, which the tenant is to remove and make good. Our records do not show any approval for the dog flap, and they do not show a lock change or who holds a spare front door key. We are asking the tenant who fitted the flap and changed the lock, and when, and will ask for a spare key to be sent to us. Please let us know by 22 Feb: (a) whether you approved the dog flap, and (b) whether you or anyone for you changed the lock or hold a spare key. Your email is signed Felix Clarke but our landlord record names Oliver Bennett, so please confirm who you are/your relationship to the property. We will update you by 22 Feb.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> Hi, thanks for having us in for the inspection. Two quick questions from the landlord's side: 1) Did you fit the dog flap in the back door, and did you get the landlord's OK first? 2) Has the front door lock been changed, and if so who by and when? If so, please send a spare key to our office by 22 Feb. The inspection also noted sticker marks on the Bedroom 1 wall by the window, which need removing and the wall making good. We will be in touch again by 22 Feb. No action is needed on any charges at this point.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here establishes that the dog flap was unapproved, that the lock was changed, or who holds a spare key.
- Nothing decides any charge, deposit deduction or tenancy action.
- The messages do not confirm the sender is the landlord.

## Remaining work
- Collect answers from tenant and landlord by 22 Feb (agency).
- Get a spare key to the agency or landlord once the lock holder is known.
- Tenant to remove Bedroom 1 sticker marks and make good; check afterwards.
- Close the job once the above is settled.

## Missing or unavailable information
- Whether the landlord approved the dog flap
- Who changed the lock and when
- Who holds the spare key
- Identity of Felix Clarke versus landlord Oliver Bennett
- Full text of the landlord email (only a summary is visible)

## Conflicts between sources
- Event 017 says no issues, but the report records a dog flap and Bedroom 1 marks. Trusted the report.
- Landlord email signed Felix Clarke versus landlord on record Oliver Bennett.
- Visit dates 13th vs 15th; the report is dated 16th. Treated the 15th reschedule as current.
- Event 006 says Friday 15th, but 15 Feb 2024 was a Thursday.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete and the report filed. Outstanding: dog flap approval, the lock change and spare key, the sender's identity, and the Bedroom 1 marks.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the landlord (MSG-101) and the tenant (MSG-102) with specific questions and a 22 Feb date. The follow-up is FUP-104.

**3. Does anything need a human decision, and why?**

Not yet. If the dog flap is confirmed unapproved or a lock change is disputed, a human may need to decide on the remedy and any tenancy or deposit matter. The landlord's identity mismatch should be resolved first.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord (Oliver Bennett on record)","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Landlord email (ev 020) signed Felix Clarke vs landlord on record Oliver Bennett; asked to c… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-22","purpose":"Chase landlord and tenant answers on dog flap approval, lock ch… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
