# Case 020: Property inspection: ANSWER

**Decision:** escalated · **Severity:** routine

Inspection finished; report shows a tenant-installed dog flap and minor sticker marks, though the landlord email said no issues. The landlord (Felix Clarke) now raises the unapproved dog flap and a spare key after a lock change. I replied on the thread with a correction and escalated the decision.

## Where the case stands
Inspection completed and report filed (no-issues flag on record). Landlord's follow-up on dog flap and spare key acknowledged; escalated to management for decision. Ticket remains at init.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Replied to landlord on existing thread, correcting the 'no issues' summary and saying a colleague will follow up | Landlord (Felix Clarke / Oliver Bennett to be verified) | email | A1 ✅ |
| 2 | ESCALATE_TO_HUMAN | Escalated dog flap consent, lock change/spare key and landlord identity check (P3) | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (Felix Clarke wrote in; our inspection email went to Oliver Bennett) (landlord) via email, existing thread (event 020 email)** (verified)

> Thank you for your email. Having checked the inspection report again, our summary said "no issues", but the report itself notes a dog flap fitted in the utility room/back door and some sticker marks on the Bedroom 1 wall, which the tenant is to remove and make good. We are sorry for the confusion. We have passed your points about the dog flap not being approved and the spare front door key after the lock change to a colleague, who will come back to you. Please note we have not yet confirmed who changed the lock or who holds the spare key, and we will not take any action on the dog flap until we have spoken to you. If you are not the landlord on our records, please let us know.

## Escalation
- **P3 → management** (verified): Landlord query after inspection: unapproved dog flap and spare key after lock change; sender identity differs from landlord named on report email
  - Known: Inspection done 16 Feb (report signed 16:32); report notes tenant-installed dog flap, small dog, fish tank, and command-strip marks in Bedroom 1 (1 defect, 0 photos). Event 017 email to 'Oliver Bennett' said 'no issues' – inconsistent with report. Event 020 email from 'Felix Clarke' (landlord) says dog flap was not approved and asks how to retrieve a spare front door key after a lock change. Visit dates: first 13 Feb, moved to 15 Feb at tenant request; report says appointment 16 Feb. Property record has no landlord details.
  - Missing: Who the landlord actually is; whether landlord consent was needed/given for dog flap per tenancy terms; who changed the lock and when; who holds the spare key; date discrepancy 15 vs 16 Feb.
  - Options: Confirm landlord identity, then advise on dog flap consent (tenant to restore or landlord retrospectively agrees); Ask tenant about the lock change and spare key; arrange key return by agreement only; Correct the 'no issues' summary on record
  - Recommendation: Verify landlord, then raise dog flap and lock/key with tenant politely in writing; no entry using keys without 24h written notice; no removal of the flap without agreement.

## What this does not establish
- The reply does not approve or refuse the dog flap
- It does not establish who changed the lock or who holds the spare key
- It does not confirm the sender is the landlord
- No entry rights are created by holding a key

## Remaining work
- Management to verify landlord identity and decide on dog flap
- Ask tenant about lock change and spare key
- Correct the 'no issues' summary; Bedroom 1 sticker marks to be followed up with tenant
- Resolve 15 vs 16 Feb inspection date

## Missing or unavailable information
- Landlord details missing from property record
- Who changed the lock and when
- Whether dog flap was consented to under the tenancy

## Conflicts between sources
- Event 017 says no issues, but report records a dog flap and a Bedroom 1 defect; trusted the signed report
- Landlord addressed as Oliver Bennett in event 017 but email came from Felix Clarke
- Inspection date 15 Feb booked vs 16 Feb on report; trusted the report for completion

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Inspection is done and the report filed. Outstanding: the landlord's dog flap and spare key queries, landlord identity check, tenant follow-up on the lock and sticker marks.

**2. What is the next action, who is it for, and through which channel?**

Email reply to the landlord on the existing thread (sent), plus internal escalation to management (ESC-102).

**3. Does anything need a human decision, and why?**

Yes: dog flap consent is a tenancy/landlord decision, the lock change and key issue could be a tenancy breach or access matter, and the sender's name differs from the landlord named earlier.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord (Felix Clarke wrote in; our inspection email went to Oliver Bennett)","recipient_role":"landlord","channel":"ema… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `escalate_to_human` | {"priority":"P3","team":"management","reason":"Landlord query after inspection: unapproved dog flap and spare key after lock change; sender … | 1 | ✅ verified | ESC-102 found in the escalate_to_human log |

## Failed or unverified actions
_None._
