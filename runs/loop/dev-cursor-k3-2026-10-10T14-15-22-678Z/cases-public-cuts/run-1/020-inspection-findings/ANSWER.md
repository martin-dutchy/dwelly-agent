# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection report shows a dog flap and Bedroom 1 sticker marks, contradicting the earlier 'no issues' email. I corrected this with the landlord, asked the tenant about consent, the lock change and a spare key, noted conflicts, set a 23 Feb follow-up and returned the job to auto.

## Where the case stands
Inspection done (report dated 16 Feb, uploaded). Landlord raised unapproved dog flap and a spare key after a lock change. Waiting on tenant for consent details, lock change details and spare key by 23 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant about dog flap consent, lock change who/when, spare key to agency by 23 Feb; remove Bedroom 1 stickers | Tenant | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Reply to landlord with correct findings (dog flap, stickers), no lock change on record, steps taken | Landlord | email | A2 ✅ |
| 3 | WAIT | Follow up with tenant on 23 Feb | Tenant | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hello, thank you for letting us in for the inspection. Two things from the report and the landlord: 1) A dog flap has been fitted in the back door/utility room. Changes like this need the landlord's written consent under the tenancy's alterations clause (and pets clause). Did you get consent, and if so can you send us a copy? 2) The landlord says the front door lock has been changed and asks for a spare key. Our records don't show a lock change. Who changed it and when? Please get a spare key to our office by Friday 23 February. Also, the report notes sticker marks from command strips on the Bedroom 1 wall by the window; please remove them and make good. We'll update you by 23 February.

**A2 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Dear Landlord, thank you for your email. Apologies: our earlier summary said no issues, but the attached report does record a dog flap fitted in the back door (utility room) and sticker marks from command strips on the Bedroom 1 wall, which the tenant is to remove and make good. The report does not mention a lock change, and our records show none. We have asked the tenant whether they had consent for the dog flap, who changed the lock and when, and to get a spare front door key to our office by 23 February. We will update you by then. Please let us know if you want the flap removed, or whether you would consider consenting to it.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing establishes whether the dog flap was consented to or who changed the lock
- No decision on removing the flap or deductions has been made
- Messages do not promise any work or dates

## Remaining work
- Tenant answers on consent, lock change, spare key (agency, 23 Feb)
- Landlord decision on dog flap
- Verify landlord name (Felix Clarke vs Oliver Bennett)
- Tenant to remove sticker marks

## Missing or unavailable information
- Dog flap consent evidence
- Who changed the lock and when
- Landlord identity name discrepancy

## Conflicts between sources
- Landlord email names Felix Clarke; record names Oliver Bennett
- Event 017 said no issues; report records dog flap and stickers
- Visit 13/02 vs 15/02 vs report date 16/02; 'Friday 15th' is a Thursday

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection complete and report sent. Outstanding: dog flap consent, lock change and spare key, sticker make-good, and the landlord's decision on the flap.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the tenant (information request) and the landlord (update and correction); follow-up on 23 Feb.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides on the dog flap consent; escalate only if the tenant's answers conflict or the key is not provided.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Landlord email (event 020) names Felix Clarke but landlord on record in event 017 is Oliver … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-23","party":"Tenant","purpose":"Check dog flap consent, lock change details, s… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
