# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord replied about a plumber at a different address (Flat 18, 88 Alder Lane), so it isn't approval for this window job. The tenant says the toilet is fixed. I asked the landlord to confirm the property and approval, updated the tenant, and held the ticket with a review on 2024-02-26.

## Where the case stands
Intake/landlord gate. No contractor assigned. Landlord reply names a different property, so no approval is recorded. Ticket on hold until 2024-02-26.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord to confirm the property and whether we may send our contractor for the bedroom window | Isaac Oakley, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the toilet is noted as fixed, the window is pending landlord confirmation, and when they will next hear from us | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold and chase landlord on a second channel by 2024-02-26 | Isaac Oakley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for letting us know the toilet is sorted. We're now only dealing with the bedroom window. We're waiting on the landlord to confirm who will do the repair; we've asked them a quick clarifying question. We'll update you by 2024-02-26 at the latest. Please don't expect a visit until we confirm a date with you.

**A3 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Thanks for your reply. The plumber you arranged is for a different property to this request, so we can't treat it as covering this job. Our request is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ: a bedroom window that won't close properly (the toilet issue is now fixed). May we send our contractor to look at the window, yes or no?
> 
> Why: Landlord's reply named another address so is not approval for this job.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- The landlord's reply is not approval for this property
- Nothing here establishes the cause of the window fault or who pays

## Remaining work
- Landlord to confirm property and contractor choice (owner: landlord, agency chases 2024-02-26)
- Then assign contractor and book visit

## Missing or unavailable information
- Landlord's decision for Flat 24, 150 Copperfield Walk

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane, ZZ3 5ZZ; case property is Flat 24, 150 Copperfield Walk, ZZ3 7ZZ. Treated as not about this job.
- Event 004 to the landlord included the toilet issue; the tenant later withdrew it.

## Answers to the case questions
**1. Where does the case stand?**

At the landlord gate with no approval. The landlord's reply named a different property. Toilet issue withdrawn by tenant; only the bedroom window remains.

**2. Next action?**

Landlord asked by email to confirm the property and approval (A3). Tenant updated by email (A1). Hold and follow-up set for 2024-02-26.

**3. Human decision needed?**

No. One clarifying question to the landlord can settle it. Escalate only if the address mismatch persists after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane, no… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Thanks for y… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `schedule_follow_up` | {"due_on":"2024-02-26","purpose":"Chase landlord on second channel if no answer on property/approval for window repair","ticket_ref":"NBL-04… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
- none: First landlord request was blocked by policy because it named the other address; resent with the other address removed (A3).
