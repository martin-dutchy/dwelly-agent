# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** needs_info · **Severity:** routine

Tenant reported a bedroom window not closing and withdrew the toilet issue. The landlord replied about a plumber at a different address, so I didn't treat it as approval. I asked the landlord to clarify, updated the tenant and put the job on hold.

## Where the case stands
Stage: landlord gate/provider selection, no contractor assigned. On hold waiting for landlord (review 2024-02-24). Landlord's reply named a different property so is not approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and whether our contractor may fix the window | Isaac Oakley, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant only the window is in scope, landlord clarification pending, no visit booked | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold until landlord replies; review 2024-02-24 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, glad the toilet is sorted, so we'll deal with the bedroom window only. We're waiting for your landlord to confirm how they'd like the repair arranged, as their reply mentioned a different address and we've asked them to clarify. We'll update you as soon as we hear back. No visit is booked yet.

**A3 · request_information → Isaac Oakley (landlord) via email, existing thread (event 010 email)** (verified)

> - The address in your last email isn't the property for this job, which is Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ (bedroom window not closing properly). Did you mean this property? If so, may we send our contractor to fix the window, or will you arrange your own? The toilet issue has been fixed by the tenant, so no plumber is needed.
> 
> Why: Reply named a different address so can't be treated as approval for this job.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- Landlord's email is not approval for this property
- Does not establish the cause or who pays

## Remaining work
- Await landlord's answer on property and contractor choice; then record decision and assign
- Chase on a second channel if no reply by review date

## Missing or unavailable information
- Which property the landlord meant, and their approval for the window repair

## Conflicts between sources
- Landlord's email names Flat 18, 88 Alder Lane, ZZ3 5ZZ, but the job is for Flat 24, 150 Copperfield Walk, ZZ3 7ZZ. I trusted the job record.
- Landlord email describes a plumber, but the toilet issue was withdrawn by the tenant.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine window repair, no provider assigned. The landlord's approval is outstanding and their reply named a different property. The toilet issue was withdrawn by the tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord Isaac Oakley, by email on the existing thread, asked which property he meant and whether our contractor may do the window (A3). Tenant told by email (A1). Hold set to 2024-02-24 (A2).

**3. Does anything need a human decision, and why?**

Not yet. One question to the landlord can settle it. Escalate (P3) if the address mismatch remains unresolved after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-w… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named Flat 18, 88 Alder Lane; asked which pr… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","questions":["T… | 1 | ✅ verified | REQ-102 found in the request_information log |

## Failed or unverified actions
- n/a: First landlord request was blocked by policy because it named the other address; resent without it (A3).
