# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** needs_info · **Severity:** routine

Landlord replied about a plumber at a different address, so it can't count as approval for this window repair. I asked him which property he meant and whether we may send our contractor, told the tenant, and put the job on hold until 26 Feb.

## Where the case stands
Intake/landlord gate, on hold (review 2024-02-26). No contractor assigned, no visit booked. Landlord's reply named a different property so it is not approval. Toilet issue withdrawn by tenant; only the bedroom window remains.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property he meant and for a yes/no on our contractor for the window | Isaac Oakley, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the window is noted, we await the landlord, no visit booked | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold waiting for landlord, review 2024-02-26 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, glad the toilet is sorted. We've noted that only the bedroom window needs attention. We're waiting for the landlord to confirm who will send someone out, and we'll update you as soon as we hear. No visit is booked yet.

**A3 · request_information → Isaac Oakley (landlord) via email, existing thread (event 010 email)** (verified)

> - The address in your reply is not the property this job is about (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Did you mean a different property?
> - For Flat 24, 150 Copperfield Walk: the toilet is now fixed, so only the bedroom window that won't close properly remains. May we send one of our contractors to look at and quote for it, or will you arrange your own?
> 
> Why: Your reply names a different address, so we can't treat it as approval for this property.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves a contractor or spend
- The landlord's plumber visit at another address is not tied to this job
- No appointment is booked

## Remaining work
- Landlord to confirm property and contractor choice for the window; agency owns the chase on 2024-02-26
- Then record decision and assign contractor, or note landlord's own contractor

## Missing or unavailable information
- Landlord's confirmation of which property he meant and decision on contractor for the window

## Conflicts between sources
- Landlord's reply names a different address from the case property; treated as not about this job.
- Landlord was sent the toilet issue, which the tenant later withdrew.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Waiting on the landlord. No valid approval, no contractor, no visit. The toilet is fixed by the tenant, so only the bedroom window remains.

**2. What is the next action, who is it for, and through which channel?**

Clarifying question to Isaac Oakley, landlord, by email on the existing thread (A3); tenant updated by email (A1); hold to 2024-02-26 (A2).

**3. Does anything need a human decision, and why?**

No. A single question to the landlord can settle the address mismatch. Escalate only if he stays silent or the mismatch persists.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-w… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named a different property (Flat 18, 88 Alde… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","questions":["T… | 1 | ✅ verified | REQ-102 found in the request_information log |

## Failed or unverified actions
_None._
