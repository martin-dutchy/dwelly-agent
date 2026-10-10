# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection is complete with a report showing a dog flap and minor Bedroom 1 marks, contradicting the earlier 'no issues' email to the landlord. The landlord asked about the dog flap and a spare key. I replied to the landlord, asked the tenant two questions, added a note and set a follow-up for 23 Feb.

## Where the case stands
Inspection completed and report filed (event 018). Landlord replied (event 020) about an unapproved dog flap and a spare key after a lock change. Agency is waiting on the tenant's answers; follow-up set for 2024-02-23. Ticket returned to auto mode.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant whether the dog flap was agreed and whether locks were changed / who holds the spare key | Tenant | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge landlord, state what the report records, say we are checking with tenant, ask them to confirm landlord name | Landlord | email | A1 ✅ |
| 3 | WAIT | Review tenant reply and update landlord by 2024-02-23 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, existing thread (event 020 email)** (verified)

> Thank you for your email. We've noted your concerns. The inspection report does record a dog flap fitted in the back door of the utility room, and a small mark on a bedroom wall (the tenant is to remove it and make good). We are checking with the tenant whether the dog flap was agreed with anyone and whether the locks were changed and a spare front door key exists. We will come back to you once we have their answer, by 23 February. Could you also confirm the name of the landlord on the tenancy, as your email is signed differently from the name we hold?

**A2 · request_information → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> - Was the dog flap fitted in the utility room back door agreed with the landlord or agency beforehand? Please send anything in writing.
> - Have the locks been changed at any point? If so, who has the spare front door key?
> 
> Why: The landlord has asked about the dog flap and a spare key after a lock change; the inspection report noted the dog flap.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not establish whether the dog flap was approved or whether the locks were changed.
- Nothing here decides consent, tenant liability, or any deposit deduction.
- Report content on the marks does not mean the tenant has made good.

## Remaining work
- Agency: review tenant answers by 2024-02-23 and update landlord
- Landlord decision on the dog flap (consent or remedy) once facts are known
- Tenant to remove the Bedroom 1 sticker marks; confirm later
- Confirm the landlord's name

## Missing or unavailable information
- Whether dog flap had consent
- Whether locks were changed and where the spare key is
- Landlord name: Oliver Bennett (event 017) vs Felix Clarke (event 020)
- Photos: report shows zero

## Conflicts between sources
- Event 017 email said no issues, but the report records a dog flap and a Bedroom 1 defect.
- Visit booked 13/02 then 15/02 (14:00); report dated 16/02.
- Landlord named Oliver Bennett (event 017) vs Felix Clarke (event 020).
- Event 006 says Friday 15th, but 15 Feb 2024 was a Thursday.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection done and report filed. Outstanding: tenant's answers on dog flap consent and lock change/spare key, landlord's decision on the dog flap, Bedroom 1 marks to be made good, and the landlord name check.

**2. What is the next action, who is it for, and through which channel?**

Reply to the landlord by email (sent) and ask the tenant by email (sent); follow-up on 2024-02-23.

**3. Does anything need a human decision, and why?**

Not yet. Any consent or deduction decision belongs to the landlord, and I will escalate only if the facts show a lock or key dispute that needs it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 020 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","questions":["Was the d… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `schedule_follow_up` | {"due_on":"2024-02-23","purpose":"Review tenant reply on dog flap approval and lock change/spare key; update landlord; confirm landlord name… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Inspection done (report dated 16/02; visit booked 15/02, report says 16/02 - date conflict).… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
