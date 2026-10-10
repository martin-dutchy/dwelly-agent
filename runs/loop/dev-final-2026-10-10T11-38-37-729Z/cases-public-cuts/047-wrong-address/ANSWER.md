# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** needs_info · **Severity:** routine

The landlord replied about a plumber at a different address, so it is not approval for Flat 24's window. I asked the landlord to confirm which property they meant and to give a yes/no on our contractor. I updated the tenant and put the job on hold until 2024-02-23.

## Where the case stands
Intake/landlord gate, on hold (review 2024-02-23). No provider assigned. Landlord's reply named a different property, so there is no valid approval. Waiting on the landlord to clarify.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and for a yes/no on our contractor for the window at Flat 24 | Isaac Oakley, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the window is still to be done, waiting on landlord, nothing booked | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold until landlord clarifies; review 2024-02-23 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for letting us know the toilet is sorted. We've noted the bedroom window is still to be fixed. We're waiting for the landlord to confirm we can send a contractor, and we've asked them a quick question to clear that up. We'll update you as soon as we have an answer. Nothing is booked yet.

**A3 · request_information → Isaac Oakley (landlord) via email, existing thread (event 010 email)** (verified)

> - Your reply refers to a different address from our job, which is Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ (bedroom window not closing properly; the tenant says the toilet is now fixed). Which property did you mean the plumber visit for?
> - For Flat 24, may we send our contractor to look at and quote for the window, yes or no?
> 
> Why: Landlord reply names a different property so cannot be treated as approval.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Landlord's email is not approval for this property
- No contractor assigned and no visit booked
- The tenant message does not confirm the window is fixed; the toilet is reported fixed

## Remaining work
- Landlord to confirm property and approve our contractor or name their own for the window
- Then assign contractor and book visit with tenant
- Chase on a second channel if no reply by review date

## Missing or unavailable information
- Which property the landlord's plumber visit is for
- Landlord decision on contractor for Flat 24 window

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane, Willowbank, ZZ3 5ZZ (a plumber, for a toilet check) but the job is Flat 24, 150 Copperfield Walk, ZZ3 7ZZ (bedroom window). Treated as not about this job.
- The landlord email forwarded the tenant's earlier toilet text, but the ticket is for the window only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate with no provider. The landlord's reply names another property (Flat 18 and a plumber), so there is no approval for the Flat 24 window. The toilet issue is withdrawn because the tenant says it is fixed.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord, Isaac Oakley, asking which property he meant and whether we may send our contractor to Flat 24. The tenant has been updated by email. The job is on hold, review 2024-02-23.

**3. Does anything need a human decision, and why?**

No. A property mismatch that one question to the sender can settle is not an escalation. Escalate at P3 if the landlord's answer doesn't settle it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-w… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named Flat 18, 88 Alder Lane (different prop… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","questions":["Y… | 1 | ✅ verified | REQ-102 found in the request_information log |

## Failed or unverified actions
_None._
