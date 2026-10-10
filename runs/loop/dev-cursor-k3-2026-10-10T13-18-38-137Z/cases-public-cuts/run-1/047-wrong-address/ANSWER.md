# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** needs_info · **Severity:** routine

The landlord replied naming a different property and a plumber, so it isn't approval for this window job. I asked him which property he meant and for a decision on the window, told the tenant the toilet is out of scope and what happens next, noted the conflict and set a follow-up for 26 Feb.

## Where the case stands
Intake/landlord gate. No provider assigned. Landlord's event 010 reply is not usable approval; we are waiting on the landlord's answer (asked 2024-02-22, reply by 2024-02-26).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and whether we may send our contractor for the window | Isaac Oakley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant only the window remains, we are awaiting landlord, next update by 26 Feb | Tenant | email | A1 ✅ |
| 3 | WAIT | Follow up with landlord on a second channel on 2024-02-26 | Isaac Oakley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for letting us know the toilet is sorted. We're now only dealing with the bedroom window. We've asked the landlord to confirm how they'd like it repaired and are waiting for their answer, so we can't give a visit date yet. We'll update you by 26 February at the latest.

**A4 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Your last reply gave a different address from this job, which is Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Which property did you mean?
> - For Flat 24, 150 Copperfield Walk: the tenant says the toilet is now fixed, so only the bedroom window (not closing properly) remains. May we send our contractor to quote and repair it, or will you arrange your own? Please reply by 2024-02-26.
> 
> Why: Landlord reply named a different property and a plumbing issue, so it is not approval for the window here.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves spend or assigns a contractor
- No visit is booked
- The landlord's plumber arrangement is not treated as relating to this property

## Remaining work
- Landlord to confirm property and window decision
- Then assign contractor or record own contractor, book visit
- Chase on second channel 2024-02-26

## Missing or unavailable information
- Which property the landlord meant
- Landlord decision on the window repair

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ and a plumber visit; the job is Flat 24, 150 Copperfield Walk, ZZ3 7ZZ, window. Treated as not applicable to this job.
- Landlord was sent the toilet issue (event 004), but the tenant had withdrawn it (event 006).

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Routine window repair at Flat 24, awaiting landlord decision; no provider assigned. The landlord's reply names another address and a plumbing job, so it is not approval. The toilet is withdrawn by the tenant.

**2. What is the next action, for whom, via which channel?**

Email to landlord Isaac Oakley asking which property he meant and whether we may send our contractor (A4); tenant updated by email (A1); follow-up 26 Feb (A3).

**3. Does anything need a human decision?**

No. An address mismatch that one question can settle is handled by asking the landlord; escalate (P3) only if it stays unresolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-047-wrong-address","note":"Landlord reply (event 010) names Flat 18, 88 Alder Lane ZZ3 5ZZ and a plumber; not this property (… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-047-wrong-address","due_on":"2024-02-26","purpose":"Chase landlord on second channel for property confirmation and window… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your last re… | 1 | ✅ verified | REQ-104 found in the request_information log |

## Failed or unverified actions
- first request_information attempt: Blocked by policy for naming another address; resent without it as A4.
