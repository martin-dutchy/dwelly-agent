# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** needs_info · **Severity:** routine

The tenant's bedroom window won't close properly, and the toilet issue is now withdrawn as fixed. The landlord replied about a plumber at a different address, so it is not usable approval. I asked the landlord one clear question, updated the tenant, and put the job on hold until 26 Feb.

## Where the case stands
Intake/landlord gate. No contractor assigned and no landlord approval recorded. The landlord's reply names a different property, so it is not approval. Job on hold until 2024-02-26.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the landlord which property their reply meant and whether we may send our contractor for the bedroom window | Isaac Oakley, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Told the tenant the window is noted, no visit is booked, and they will hear from us by 26 Feb | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold and follow-up to 26 Feb, then chase the landlord by SMS or phone | Isaac Oakley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, glad the toilet is sorted. We've noted that only the bedroom window needs attention. We're still waiting for the landlord to confirm who will carry out the repair, and we've asked them a follow-up question today. No visit is booked yet. We'll update you by 26 February at the latest.

**A3 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Your reply refers to a different property from this job, which is Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Did you mean to reply about another property?
> - For Flat 24, the tenant says the toilet is now fixed and only the bedroom window not closing properly needs repair. May we send our contractor for the window, or will you arrange your own?
> 
> Why: The landlord's reply names a different address, so it cannot be treated as approval for this job.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves the repair or assigns a contractor
- The landlord's plumber visit at the other address says nothing about this property
- The window fault and its cause are unconfirmed

## Remaining work
- Landlord to confirm the property and decide who does the window repair
- Then record the decision, assign the contractor and book the visit
- Chase on a second channel on 26 Feb if there is no reply

## Missing or unavailable information
- Which property the landlord meant
- Landlord decision on the window repair for Flat 24

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane, Willowbank ZZ3 5ZZ, but the job is Flat 24, 150 Copperfield Walk ZZ3 7ZZ. I treated the case property as correct and did not treat the reply as approval.
- The event 004 email to the landlord included the toilet issue, which the tenant has since said is fixed.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

It is at the landlord gate. No approval is on record, because the landlord's reply names Flat 18, 88 Alder Lane. Outstanding: the landlord's confirmation of the property and a decision on the window repair.

**2. What is the next action, who is it for, and through which channel?**

An email to landlord Isaac Oakley asking which property he meant and whether we may send our contractor. The tenant has been updated by email. A chase is due 26 Feb.

**3. Does anything need a human decision?**

No. This is routine, and one question to the landlord can settle it. Escalate only if the address mismatch is still unresolved after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, glad the to… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named a different property (Flat 18, 88 Alde… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your reply r… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-047-wrong-address","due_on":"2024-02-26","purpose":"Chase landlord on a second channel if no answer on property and windo… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
