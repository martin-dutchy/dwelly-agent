# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection complete with report sent. Landlord raised an unapproved dog flap and a spare key after a lock change. I asked the tenant for the facts, replied to the landlord, noted the conflicts, set a follow-up for 21 Feb and returned the job to auto mode.

## Where the case stands
Inspection done and report sent to landlord (event 017). Landlord replied (event 020) about an unapproved dog flap and a spare front door key after a lock change. We are waiting on the tenant's answers; follow-up set for 2024-02-21.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant whether the dog flap had permission and whether/when the lock was changed and who holds the spare key | Tenant | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Reply to landlord: dog flap noted in report, decision is theirs, tenant being asked; key question being checked; asked to confirm sender name; update by 21 Feb | Landlord | email | A2 ✅ |
| 3 | WAIT | Review tenant reply and update landlord | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> - Our inspection noted a dog flap in the back door/utility room. Did you get the landlord's written permission before it was fitted?
> - Has the front door lock been changed? If so, when, and who has the spare key(s) for the new lock?
> 
> Why: The landlord has asked about an unapproved dog flap and a spare front door key after a lock change; we need the tenant's account before replying with facts.

**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email. Two points noted: (1) the dog flap: our inspection report does record a dog flap fitted in the back door/utility room. We are asking the tenant whether permission was given and will report back. Whether to ask for it to be removed or to approve it is your decision, and we will not take any action on it until we hear from you. (2) The spare front door key after the lock change: we are asking the tenant when the lock was changed and who holds the spare key, and will update you. We do not hold a record of the change at present. The report also notes minor sticker marks in Bedroom 1 for the tenant to make good. Could you also confirm the sender of your latest email, as it was signed Felix Clarke rather than Oliver Bennett? We will update you by 2024-02-21.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here establishes that the dog flap was unapproved or that the lock was changed; both are unverified claims.
- No decision on removing or approving the dog flap has been made.
- Does not establish who holds the spare key.

## Remaining work
- Tenant answers on dog flap permission and lock change (agency, by 21 Feb)
- Landlord decision on dog flap and confirmation of sender identity
- Tenant to remove the Bedroom 1 sticker marks; close job once resolved

## Missing or unavailable information
- Whether landlord consent for dog flap exists
- Lock change details and spare key holder
- Landlord email text was only a summary; sender name differs from Oliver Bennett

## Conflicts between sources
- Landlord on record Oliver Bennett vs email about Felix Clarke/signed by Felix Clarke
- Appointment dates 13th vs 15th vs report date 16th; 15th Feb is a Thursday, not Friday
- Event 018 'Inspection issues: NO' vs report's Bedroom 1 defect and dog flap

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection done and report sent; landlord's follow-up on the dog flap and spare key is outstanding, pending tenant answers and the landlord's decision.

**2. What is the next action, who is it for, and through which channel?**

Tenant asked by email (REQUEST REQ-101); landlord answered by email (MSG-102); follow-up 21 Feb.

**3. Does anything need a human decision, and why?**

Not yet. The dog flap approval is the landlord's decision, and no escalation is needed unless the sender-identity query or the lock dispute stays unresolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","questions":["Our inspe… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","body":"Thank you for your ema… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Landlord email event 020 (signed Felix Clarke; landlord on event 017 is Oliver Bennett) rais… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2024-02-21","purpose":"Review tenant reply on dog flap permission and lock/spare key; update landlord","ticket_ref":"NBL-020-insp… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
