# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's toilet issue is withdrawn, so only the bedroom window remains. The landlord's reply named Flat 18, 88 Alder Lane, so it was not treated as approval. I asked the landlord which property they meant and for a decision, updated the tenant, and held the ticket with a review on 2024-02-26.

## Where the case stands
Intake/landlord gate. No provider assigned. Ticket on hold waiting for the landlord, review 2024-02-26. The landlord's reply names a different property, so there is no approval for this job.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and whether we may send our contractor for the bedroom window | Isaac Oakley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant the window is the only job, no contractor booked yet, next update by 2024-02-26 | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-02-26 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for letting us know the toilet is sorted. We'll treat the bedroom window as the only job. We're still waiting for the landlord's go-ahead, so no contractor is booked yet and please don't expect anyone until we confirm a date with you. We'll update you by 2024-02-26 at the latest.

**A4 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Your latest reply mentions a different property from this request. Our job is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Did you mean a different property?
> - For Flat 24: the tenant says the toilet is now fixed, and only the bedroom window not closing properly remains. May we send one of our contractors to look at and quote for it, or will you arrange your own?
> 
> Why: Landlord reply named another address so cannot be treated as approval for this job.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or booked; no contractor assigned.
- The landlord's reply is not treated as approval or a decision.
- The Flat 18 plumber visit is unrelated to this job as far as we know.

## Remaining work
- Landlord to confirm property and approve our contractor or name their own (agency, review 2024-02-26)
- Then assign a contractor and book the window visit

## Missing or unavailable information
- Landlord's decision for Flat 24 window
- Whether the landlord's reply was about a different property

## Conflicts between sources
- Landlord email names Flat 18, 88 Alder Lane ZZ3 5ZZ, but the case property is Flat 24, 150 Copperfield Walk ZZ3 7ZZ. I trusted the system record.
- Event 004 told the landlord about the toilet, but the tenant withdrew it in event 006.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord gate with no provider. The landlord's reply refers to a different property, so approval for the window at Flat 24 is still outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord, Isaac Oakley, asking which property he meant and whether we may send our contractor. The tenant has also been updated by email.

**3. Does anything need a human decision, and why?**

No. One question to the landlord can settle it. Escalate at P3 if the address mismatch is still unresolved after the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named Flat 18, 88 Alder Lane; asked which pr… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-047-wrong-address","note":"Event 010 landlord email names Flat 18, 88 Alder Lane ZZ3 5ZZ, not this property; not treated as a… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your latest … | 1 | ✅ verified | REQ-103 found in the request_information log |

## Failed or unverified actions
- first request_information attempt: Blocked by policy because it named the other address; resent without it as A4.
