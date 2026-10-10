# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection report is filed and was sent to the landlord. The landlord's follow-up raised an unapproved dog flap and a lock change with a missing spare key. I replied to the landlord with what the record shows, corrected the earlier 'no issues' summary, asked the tenant the open questions, and set a follow-up for 21 Feb.

## Where the case stands
Inspection done (report signed 16 Feb), report sent to landlord. Landlord has raised a dog flap and a lock change/spare key. We are waiting on the tenant (asked for a reply by 21 Feb), then the landlord decides on the dog flap. Follow-up set for 21 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant who fitted the dog flap and whether permission was given, who changed the locks and when, and for a spare key by 21 Feb | Tenant | email | A2 ✅ |
| 2 | OTHER | Reply to the landlord with what the record shows, correct the earlier 'no issues' summary and ask for the landlord's name to be confirmed | Landlord | email | A1 ✅ |
| 3 | WAIT | Follow up on 21 Feb on the tenant's reply and the spare key | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email. Two points, plus a correction to our earlier summary.
> 1) Dog flap: the inspection report notes a dog flap in the back door (utility room). Our record shows no approval for it. We are asking the tenant when and why it was fitted and whether permission was given.
> 2) Lock change / spare key: our record does not show a lock change. We are asking the tenant who changed it and when, and to get a spare front door key to us by Wednesday 21 February. We will update you by then.
> Correction: our email of 17 February said no issues were found. The report does record one minor item: sticker-type marks on the Bedroom 1 wall by the window, which the tenant is to remove and make good. The dog flap is also noted. Please let us know how you would like us to handle the dog flap. We are also checking that your email name matches our landlord record, so please confirm the name on the account.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> - Who fitted the dog flap in the back door, when, and did you have the landlord's permission?
> - Have the front door locks been changed? If so, who did it and when?
> - Please get a spare front door key to our office by Wednesday 21 February. Who holds the spare keys now?
> 
> Why: The landlord has raised an unapproved dog flap and a lock change with a missing spare key; our record shows neither. Also a reminder that the inspection noted sticker marks in Bedroom 1 to be removed and made good.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here establishes that the dog flap was unauthorised or that the locks were changed.
- The message to the landlord does not approve or refuse the dog flap.
- No access was requested or arranged.

## Remaining work
- Tenant answers on the dog flap, lock change and spare key (agency, 21 Feb).
- Landlord decides on the dog flap and confirms their name.
- Tenant removes the Bedroom 1 sticker marks and makes good.
- Close the job once the above is settled.

## Missing or unavailable information
- Who fitted the dog flap, and whether permission was given.
- Whether the locks were changed, by whom and when.
- Whether the landlord is Oliver Bennett or Felix Clarke.

## Conflicts between sources
- Landlord email names Felix Clarke, but the earlier email went to Oliver Bennett.
- The 17 Feb 'no issues' email conflicts with the report, which records a dog flap and sticker marks.
- The visit was booked for 15 Feb but the report gives 16 Feb. The tenant's 'Friday 15th' is a Thursday.
- The first booking was 13 Feb; it was later rescheduled to 15 Feb.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete and the report has gone to the landlord. The report records a dog flap and Bedroom 1 sticker marks. Outstanding: the tenant's answers on the dog flap, lock change and spare key, and the landlord's decision on the dog flap.

**2. What is the next action, who is it for, and through which channel?**

The tenant has been asked by email, and the landlord replied to by email. The follow-up is on 21 Feb.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides on the dog flap. A human is needed only if the tenant's account conflicts with the landlord's or the landlord's name cannot be confirmed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","questions":["Who fitte… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 020 landlord email names Felix Clarke; event 017 addressed Oliver Bennett: name mismat… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-21","purpose":"Check tenant reply on dog flap, lock change and spare key; upda… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
