# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection complete with no urgent issues; landlord then raised a dog flap and spare key query. I replied to the landlord, asked the tenant for facts, noted the name mismatch, set a 22 Feb follow-up and returned the job to auto.

## Where the case stands
Inspection done (report dated 16 Feb, uploaded 17 Feb) and sent to landlord. Landlord's follow-up (event 20) raises an unapproved dog flap and a spare key after a lock change. Waiting on tenant's answers and landlord's wishes; follow-up set for 22 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant about dog flap consent, lock change/spare key, and to make good Bedroom 1 sticker marks | Tenant | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Reply to landlord with report facts and ask whether they want the dog flap removed, accepted or discussed | Landlord | email | A1 ✅ |
| 3 | WAIT | Review tenant and landlord replies on 22 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Thank you for your email. On the dog flap: the inspection report (16 Feb) notes a dog flap fitted in the back door/utility room. We have no record of consent in this file, so we are asking the tenant whether permission was given and when it was fitted. We will not take any action on it until we have their answer and your wishes. On the spare front door key: we hold no record of a lock change here, so we are asking the tenant about it and will tell you what we find. The report also notes small sticker marks on the Bedroom 1 wall, which the tenant is to remove and make good. Could you tell us whether you want the dog flap removed, accepted (with conditions), or discussed first? We will update you by 22 February.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> - Our inspection noted a dog flap in the back door. Did you get the landlord's permission before it was fitted, and if so when and how?
> - Has the front door lock been changed? If so, when, and where is the spare key?
> - Please also remove the sticker marks by the Bedroom 1 window and make good the wall.
> 
> Why: Landlord raised an unapproved dog flap and a missing spare key after a lock change; we need the tenant's account before responding further.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Replies do not establish that the dog flap was unauthorised or that a lock was changed
- No instruction to remove the flap or recharge anyone has been given
- Name on landlord email differs from the name on the earlier letter; identity not yet reconciled

## Remaining work
- Get tenant's answers on dog flap and lock/key
- Get landlord's decision on dog flap
- Confirm landlord name on record
- Confirm tenant has made good the Bedroom 1 marks
- Close ticket once all done

## Missing or unavailable information
- Whether the landlord consented to the dog flap
- Whether the lock was changed and where the spare key is
- Landlord's name/identity discrepancy
- Report date 16 Feb vs booked 15 Feb

## Conflicts between sources
- Landlord addressed as Oliver Bennett (event 017) but event 020 refers to Felix Clarke
- Visit booked 13 Feb then moved to 15 Feb; report dated 16 Feb
- Tenant said Friday 15th, but 15 Feb 2024 was a Thursday

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete and reported. Outstanding are the dog flap consent question, the lock change/spare key query, and the Bedroom 1 marks being made good.

**2. What is the next action, who is it for, and through which channel?**

Reply to the landlord by email (sent) and ask the tenant by email (sent); review on 22 Feb.

**3. Does anything need a human decision, and why?**

Not yet. The dog flap decision is the landlord's. Escalate if the tenant's answers point to a lock change without consent or a dispute over deposit or recharge.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","questions":["Our inspe… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 020 email is signed Felix Clarke, but event 017 was addressed to Oliver Bennett as lan… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"due_on":"2024-02-22","purpose":"Review tenant answers on dog flap consent and lock/spare key; update landlord; confirm landlord name on re… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
