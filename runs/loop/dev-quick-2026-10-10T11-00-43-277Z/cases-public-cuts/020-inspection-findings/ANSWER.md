# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection is complete and its signed report shows one Bedroom 1 defect (command-strip marks for the tenant to make good) and an unapproved dog flap. The earlier agency summary and upload wrongly said no issues. I emailed the landlord to confirm their identity, decide on the dog flap, explain the spare key situation, and correct the summary; the ticket is on hold until 2024-02-25 and escalated to management (ESC-103).

## Where the case stands
Inspection of Flat 12, 162 Beacon Close completed (report signed 16 Feb 2024, uploaded). Ticket is at init and on hold, waiting for the landlord. Outstanding: landlord identity, decision on the unapproved dog flap, and the spare key request after a lock change.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | Ask the landlord to confirm their full name, decide on the unapproved dog flap, and say who changed the lock and where the spare key is held. Also send the corrected inspection summary (one Bedroom 1 defect, not 'no issues'). | Landlord (Felix Clarke per email; Oliver Bennett per file) | email | A1 ✅ |
| 2 | WAIT | Review the hold and chase the landlord if no reply. | internal | internal | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | Escalate to management (P3) to verify landlord identity and the inspection record conflicts. | Management team | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (sender of event 020 email, named Felix Clarke; file shows Oliver Bennett) (landlord) via email, existing thread (event 020 email)** (verified)

> Thank you for your email about Flat 12, 162 Beacon Close.
> 
> Before we act on your questions, could you please confirm your full name, as our records show Oliver Bennett and your email was signed Felix Clarke?
> 
> Dog flap: the inspection report (16 February 2024) notes that a dog flap has been installed in the utility room / back door. We have no record of your approval for this. Please tell us whether you approve it or want it removed and the door reinstated. We will not instruct anyone on this until we hear from you.
> 
> Spare front door key: please tell us who changed the lock and where the spare key is being held, so we know who can release it. We will not release any key until your identity is confirmed.
> 
> Correction to our earlier summary (17 February): that email said no issues were identified. The report actually records one defect: sticker-type marks on the Bedroom 1 wall beside the window, which the tenant is asked to remove and make good. The report also notes the dog flap and the pets. The full report is attached.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
- **P3 → management** (verified): Landlord identity mismatch before any key release or approval on Flat 12, and the inspection summary sent to the landlord contradicts the signed report.
  - Known: Inspection report signed 16 Feb 2024 records one Bedroom 1 defect (command-strip marks, tenant to make good) and an installed dog flap; no photos. Event 017 email and event 018 upload said no issues. Event 020 landlord email from Felix Clarke asks about unapproved dog flap and spare key after lock change. File landlord is Oliver Bennett.
  - Missing: Confirmation that Felix Clarke is the landlord or an authorised person; who changed the lock; whether a dog flap was approved; why the report has no photos; inspection date 15 vs 16 Feb.
  - Options: Confirm landlord identity against the agency's records, then send the landlord the corrected inspection summary; Ask the landlord to approve or remove the dog flap; tenant to be told the outcome; Hold spare key release until identity confirmed
  - Recommendation: Verify the landlord's identity before releasing keys or sharing the report. Do not approve or remove the dog flap until the landlord decides.
  - Deadline: 2024-02-23

## What this does not establish
- The inspection report is signed and filed, but this does not confirm the dog flap was approved or that the tenant has been told of the Bedroom 1 make-good.
- Sending the message does not confirm the landlord's identity or authority.
- No keys have been released and no dog flap instruction has been given.
- No tenant message was sent; the tenant has not yet been told of the defect or the dog flap question.

## Remaining work
- Landlord to confirm identity and answer dog flap and spare key questions (owner: agency, review 2024-02-25).
- Management to verify landlord identity and check the inspection record (ESC-103).
- Tell the tenant the outcome of the inspection: make good the Bedroom 1 wall marks; dog flap outcome once the landlord decides.
- Close the ticket once the landlord has been told the outcome.

## Missing or unavailable information
- Landlord's confirmed name and authority (Felix Clarke vs Oliver Bennett).
- Whether the landlord approved the dog flap.
- Who changed the lock and who holds the spare key.
- Inspection date: report says 16 Feb, schedule says 15 Feb.
- Photos: report lists zero photos.

## Conflicts between sources
- Inspection date: report says appointment 16 Feb 2024; schedule says 15 Feb 12-5pm. Trusted the signed report for the findings; date unresolved.
- Event 017 email and event 018 upload say no issues; the signed report records a defect and a dog flap. Trusted the signed report.
- Landlord name: file shows Oliver Bennett; event 020 email signed Felix Clarke. Not resolved; identity to be verified.
- Report lists zero photos per area, though it says photos are evidenced.

## Answers to the case questions
**1. Where does the case stand?**

The inspection is done and the report is filed, but the case is on hold waiting for the landlord. The landlord's identity is unclear, and the dog flap and spare key questions are unresolved.

**2. What is the next action, to whom, and by what channel?**

Email the landlord on the existing thread (event 020) to confirm their identity, decide on the dog flap, say who changed the lock, and correct the inspection summary. Done (A1).

**3. Does anything need a human decision?**

Yes. Management must verify the landlord's identity before any key release or report sharing, and resolve the inspection record conflicts (ESC-103, P3).

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord (sender of event 020 email, named Felix Clarke; file shows Oliver Bennett)","recipient_role":"landlord","channel… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-020-inspection-findings","reason":"Waiting for Landlord","comment":"Awaiting landlord identity confirmation (Felix Clarke… | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Record conflicts: (1) Inspection report says appointment 16 Feb 2024; schedule shows 15 Feb … | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `escalate_to_human` | {"priority":"P3","team":"management","reason":"Landlord identity mismatch before any key release or approval on Flat 12, and the inspection … | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
