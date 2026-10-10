# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection is complete. The landlord asked about an unapproved dog flap and a spare key after a lock change. I corrected our earlier 'no issues' email, asked the tenant and landlord for the missing facts, and set a 23 Feb follow-up.

## Where the case stands
Inspection done and report uploaded (no-issues flag, but report records a dog flap and Bedroom 1 sticker marks). Landlord has raised the unapproved dog flap and a spare key after a lock change. Waiting on tenant and landlord replies; follow-up 23 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant who fitted the dog flap, who changed the lock and when, and for a spare key by 25 Feb | Tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Reply to the landlord: correct the earlier 'no issues' summary, say what the record shows, ask to confirm identity and consent | Landlord | email | A1 ✅ |
| 3 | WAIT | Chase both parties on 23 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, existing thread (event 020 email)** (verified)

> Thank you for your email. First, a correction: our earlier email said no issues were found. The attached report does in fact note (1) a dog flap fitted in the utility/back door, and (2) sticker-type marks on the Bedroom 1 wall that the tenant is to remove and make good. Sorry for the confusion. On your questions: our records do not show any approval for the dog flap, and do not show a lock change or who holds a spare front door key. We are asking the tenant who fitted the flap and who changed the lock and when, and asking for a spare key to be passed to us by 25 February. Could you please confirm (a) that you are the landlord, as our earlier email was addressed to Oliver Bennett and yours names Felix Clarke, and (b) whether you gave any consent for the flap or lock change? We will update you by 23 February. Nothing is decided about the flap or any cost to the tenant yet.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 014 email)** (verified)

> Hi, thanks for having us in for the inspection. The report noted a dog flap in the utility/back door and some sticker marks on the Bedroom 1 wall (please remove them and make good). Could you let us know: (1) who fitted the dog flap and whether the landlord agreed to it; (2) whether the front door lock has been changed, who did it and when; and (3) please get a spare front door key to us by 25 February. Nobody will enter without proper notice. We will be in touch again by 23 February.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not establish who fitted the dog flap, whether it was consented to, or who changed the lock
- No charge or breach finding has been made against the tenant
- Landlord identity is not confirmed

## Remaining work
- Tenant answers on flap, lock and key (agency, 23 Feb review)
- Landlord confirms identity and consent
- Tenant to remove sticker marks
- Decide on dog flap permission or remedy once facts known; escalate if a dispute or deposit issue arises

## Missing or unavailable information
- Who fitted dog flap and whether consent was given
- Whether and when the lock was changed, and by whom
- Landlord's identity: Felix Clarke vs Oliver Bennett
- Reason inspection report is dated 16 Feb when visit was booked for 15 Feb

## Conflicts between sources
- Event 017 said no issues; the report records a dog flap and a Bedroom 1 defect
- Landlord addressed as Oliver Bennett in 017; the reply names Felix Clarke
- Visit dates 13 Feb vs 15 Feb; the report is dated 16 Feb
- Event 006 'Friday 15th' but 15 Feb 2024 was a Thursday

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Inspection done and report filed. Outstanding: dog flap consent, lock change and spare key facts, landlord identity, and the sticker marks to be made good.

**2. What is the next action, for whom, and through which channel?**

Emails sent to the tenant (questions and spare key request) and to the landlord (correction and questions) on the existing threads. Follow-up on 23 Feb.

**3. Does anything need a human decision?**

Not yet. A human is needed only if the dog flap or lock change turns into a lease-breach, deposit or legal question, or if the landlord's identity cannot be settled.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 020 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Inspection report dated 16 Feb (visit booked 15 Feb; 13 Feb original; event 006 'Friday 15th… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-23","party":"Tenant and landlord","purpose":"Chase answers on dog flap consent… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
