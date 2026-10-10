# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** needs_info · **Severity:** routine

The landlord replied about a plumber at a different address (Flat 18, 88 Alder Lane), so it is not approval for the window job. I asked the landlord to confirm the property and give a yes/no, told the tenant, and put the job on hold until 2024-02-26.

## Where the case stands
Intake/landlord gate, on hold waiting for landlord until 2024-02-26. No approval recorded, no contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and for a yes/no on our contractor for the Flat 24 bedroom window | Isaac Oakley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge the toilet is fixed, window pending landlord, next update by 2024-02-26 | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-02-26 | Isaac Oakley, landlord | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for letting us know the toilet is sorted, we'll just deal with the bedroom window. We're waiting for the landlord to confirm we can send a contractor, and we've asked them a clarifying question. We'll update you by 2024-02-26 at the latest. Kind regards, Ashford

**A4 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Your reply mentions a plumber visiting a property with a different address from this job. This job is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ, where the bedroom window won't close properly. Did you mean a different property?
> - For Flat 24, 150 Copperfield Walk, may we send our contractor to look at the bedroom window, yes or no? The tenant says the toilet is already fixed, so no plumber is needed.
> 
> Why: Landlord reply refers to a different address, so it cannot be treated as approval for this job.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves spend or a contractor
- The landlord's plumber visit is for another property and is not linked to this job
- Tenant has not been given any visit date

## Remaining work
- Landlord to confirm property and approve or choose own contractor
- Then assign contractor and book visit; review 2024-02-26

## Missing or unavailable information
- Landlord's decision for Flat 24 window
- Whether the landlord confused two properties

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane, ZZ3 5ZZ, but the job is Flat 24, 150 Copperfield Walk, ZZ3 7ZZ. Trusted the job record.
- Event 004 told the landlord about a toilet issue that the original request did not include; the tenant later said the toilet is fixed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate. The only reply names a different property and a plumber, so there is no valid approval. The toilet issue was withdrawn by the tenant. The bedroom window repair is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to landlord Isaac Oakley asking which property he meant and for a yes/no on our contractor. Tenant updated by email. Hold until 2024-02-26.

**3. Does anything need a human decision, and why?**

No. One question to the landlord can settle the address mismatch. Escalate only if it is still unresolved after the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane; no… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-047-wrong-address","note":"Event 010 landlord reply names a different address (Flat 18, 88 Alder Lane, ZZ3 5ZZ) and a plumber… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your reply m… | 1 | ✅ verified | REQ-103 found in the request_information log |

## Failed or unverified actions
_None._
