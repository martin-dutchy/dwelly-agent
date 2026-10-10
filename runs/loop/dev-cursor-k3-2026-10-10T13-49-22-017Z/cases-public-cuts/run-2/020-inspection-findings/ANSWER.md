# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection report found a dog flap and minor Bedroom 1 marks, though our email to the landlord said no issues. I corrected that, replied to the landlord's dog flap and key query, asked the tenant for facts and a key copy, noted conflicts and set a 23 Feb follow-up.

## Where the case stands
Inspection done and report filed (16 Feb). Landlord's ev 020 query answered; waiting on tenant (dog flap, lock change, key copy) and landlord (identity, consent) with review 23 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant about dog flap, lock change, spare key copy by 23 Feb, and Bedroom 1 marks | Tenant | email | A2 ✅ |
| 2 | OTHER | Reply to landlord: correct 'no issues' summary, state record on dog flap/lock, confirm name, update by 23 Feb | Landlord | email | A1 ✅ |
| 3 | WAIT | Review replies on 23 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email (event 020). Two points, and a correction to our last email.
> 
> 1. Correction: our email of 17 Feb said no issues were found. The report itself notes (a) a dog flap fitted in the back door/utility room, and (b) sticker-type marks on the Bedroom 1 wall by the window, which the tenant is to remove and make good. Please rely on the attached report, not our summary line.
> 2. Dog flap: our records show no approval for it. We are asking the tenant when it was fitted and whether permission was sought. Please let us know if you gave any consent. We will not take any action against the tenant until we have the facts.
> 3. Spare front door key: our records do not show a lock change. We are asking the tenant who changed it and when, and to provide a copy of the new key to us by 23 Feb.
> 
> We will update you by 23 Feb. Also, your email was signed Felix Clarke while our records name Oliver Bennett as landlord; please confirm who you are so we can update our file.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> - Our inspection noted a dog flap in the back door. When was it fitted, and did you ask the landlord or us for permission?
> - Our records do not show a lock change on the front door. Has the lock been changed, and if so who did it and when?
> - Please could you get a copy of the current front door key to our office by 23 February 2024?
> - The inspection also noted small sticker marks (like command strips) on the Bedroom 1 wall by the window; please remove them and make good.
> 
> Why: Landlord has raised the dog flap and a lock change/spare key; record shows neither is approved or logged. Nothing is decided; we just need the facts. Please reply by 23 Feb; we'll update you then.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here decides that the dog flap breaches the tenancy or who changed the lock.
- No action against the tenant has been taken; holding a key gives no right of entry.
- The reply does not establish who the sender really is.

## Remaining work
- Tenant answers on dog flap, lock, key copy (agency)
- Landlord confirms identity and any consent (agency to chase)
- Tenant removes sticker marks
- Escalate to a human if the dog flap/alteration dispute needs a decision after 23 Feb

## Missing or unavailable information
- When/who fitted the dog flap and any permission
- Whether and by whom the front lock was changed
- Landlord identity (Felix Clarke vs Oliver Bennett)
- Inspection photos (zero recorded)

## Conflicts between sources
- Visit 13/02 vs 15/02 vs report date 16/02; 'Friday 15th' is a Thursday
- Landlord name Oliver Bennett (ev 017) vs Felix Clarke (ev 020)
- Email said no issues vs report noting dog flap and defect
- Landlord says lock changed; record shows no lock change

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection completed and report filed; landlord has raised an unapproved dog flap and a spare key after a lock change. Outstanding: tenant facts, key copy, landlord identity/consent.

**2. What is the next action, who is it for, and through which channel?**

Email to tenant requesting facts and key copy by 23 Feb; email to landlord with correction and update; follow-up 23 Feb.

**3. Does anything need a human decision, and why?**

Not yet. A human decision on any tenancy-breach or alteration consequences may be needed after replies; none taken now.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","questions":["Our inspe… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Conflicts: visit booked 13/02 (ev 002-004) then moved to 15/02 14:00 (ev 009-012); tenant em… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-23","party":"Tenant and landlord","purpose":"Review replies on dog flap permis… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
