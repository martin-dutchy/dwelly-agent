# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

Inspection finished, but our summary to the landlord wrongly said no issues; the report records a dog flap and Bedroom 1 sticker marks. I corrected this with the landlord, asked the tenant about consent, the lock change and the spare key, added a note and set a 22 Feb review.

## Where the case stands
Inspection done and report uploaded (stage: result received). Landlord raised dog flap consent and a spare front key after a lock change. Landlord and tenant have been asked; waiting for replies, review 22 Feb.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant about dog flap consent, lock change, spare key to agency by 25 Feb, and Bedroom 1 marks | Tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Correct the earlier 'no issues' summary, answer the landlord's query, ask for consent position and identity confirmation | Landlord | email | A1 ✅ |
| 3 | WAIT | Review replies on 22 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Dear landlord, thank you for your email. Apologies: our summary of 17 Feb said no issues were found, but the attached report does record two points: (1) a dog flap has been installed in the utility room/back door, and (2) sticker-type marks from command strips on the Bedroom 1 wall, which the tenant should remove and make good. Our records do not show that consent was given for the dog flap, nor any lock change. We are asking the tenant today whether they had permission for the flap, and who changed the lock, when, and where the spare front door key is. We have asked for a spare key to be brought to the agency by 25 Feb. Please tell us if you gave consent for either, and whether you want the dog flap retained or removed. We will update you by 22 Feb. Also, your email was signed with a different name to the one on our records; please confirm who we are dealing with.

**A2 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for your help with the inspection. A few follow-up questions from the report: (1) a dog flap has been fitted in the back door. Under the tenancy's alterations and pets clauses this needs the landlord's consent, so did you get it, and from whom? (2) Our records don't show a lock change on the front door. Was it changed, by whom and when? Please could a spare key be brought to our office by 25 Feb. (3) There are sticker marks (like command strip tabs) on the Bedroom 1 wall by the window; please remove them and make good. Nothing is decided about the dog flap yet; we're checking with the landlord and will update you by 22 Feb. Thanks.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not establish whether the dog flap was consented to, who changed the lock, or who holds the spare key
- Nothing decided on removal or charges for the flap or marks

## Remaining work
- Landlord reply on consent/flap and identity (agency)
- Tenant reply and spare key by 25 Feb
- Close ticket once resolved, tenant and landlord informed

## Missing or unavailable information
- Whether the landlord consented to the dog flap
- Who changed the front lock and when; location of spare key
- Which landlord name is correct

## Conflicts between sources
- Landlord named Oliver Bennett (event 017) vs Felix Clarke (event 020)
- Appointment 13/02 vs 15/02 vs report dated 16 Feb
- Event 006 'Friday 15th' but 15 Feb 2024 is a Thursday
- Summary 'no issues' vs report listing a dog flap and a defect
- Event 020 says lock change; no record of one

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection complete and report filed. Outstanding: dog flap consent, lock change and spare key, Bedroom 1 marks, landlord identity confirmation.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the landlord (correction and questions) and to the tenant (consent, lock, key by 25 Feb); review 22 Feb.

**3. Does anything need a human decision, and why?**

Not now. Routine questions are out. If the landlord or tenant dispute the flap or there is a deposit claim, that goes to a human.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-020-inspecti… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-020-i… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 017 landlord email wrongly said no issues; report shows dog flap (alteration, consent … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-22","purpose":"Review replies from landlord (dog flap consent, identity) and t… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
