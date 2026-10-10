# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord replied about a plumber at a different address, so it is not approval for this job. Tenant says the toilet is fixed; only the bedroom window remains. Asked the landlord to clarify, updated the tenant, and placed the job on hold to 2024-02-26.

## Where the case stands
Intake, no provider assigned. On hold waiting for landlord (review 2024-02-26). Landlord's reply named a different property so it is not approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and whether our contractor may fix the bedroom window | Isaac Oakley, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant only the window remains, awaiting landlord, next update by 2024-02-26 | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-02-26 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, glad the toilet is sorted, thank you for letting us know. We're now only dealing with the bedroom window. We're waiting for the landlord to confirm who will repair it, and we've asked them to clarify. We can't give a visit date yet. We'll update you by 2024-02-26 at the latest.

**A3 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Your latest email gave a property address that doesn't match this job, which is Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Which property did you mean?
> - For Flat 24, the tenant says the toilet is now fixed, so no plumber is needed. The remaining job is a bedroom window that won't close properly. May we send our contractor, or will you arrange your own?
> 
> Why: Landlord reply names a different property so cannot be treated as approval; no contractor instructed until confirmed.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- Landlord's email is not approval for this property
- Does not establish the cause or who pays for the window

## Remaining work
- Landlord to confirm property and contractor choice; agency owns follow-up on 2026-02-26 review
- Assign contractor and book window visit once approved

## Missing or unavailable information
- Which property the landlord meant
- Landlord decision on contractor for the window

## Conflicts between sources
- Landlord's reply names Flat 18, 88 Alder Lane, ZZ3 5ZZ, but the job is Flat 24, 150 Copperfield Walk, ZZ3 7ZZ. Treated as not about this job.
- Landlord was sent the toilet issue, which the tenant has since withdrawn.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake with no provider. The landlord's reply names Flat 18, 88 Alder Lane, so it is not valid approval. The toilet issue is withdrawn. The window repair still needs landlord approval.

**2. What is the next action, who is it for, and through which channel?**

Email to landlord Isaac Oakley asking which property he meant and whether we may send our contractor for the window. The tenant was also updated by email.

**3. Does anything need a human decision, and why?**

No. A single question to the landlord can resolve it. Escalate only if it is still unresolved after the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, glad the to… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named Flat 18, 88 Alder Lane, not this prope… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your latest … | 1 | ✅ verified | REQ-102 found in the request_information log |

## Failed or unverified actions
_None._
