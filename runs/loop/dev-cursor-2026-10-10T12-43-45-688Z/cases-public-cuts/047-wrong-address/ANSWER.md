# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** needs_info · **Severity:** routine

The landlord replied about a plumber at a different address (Flat 18, 88 Alder Lane), so it is not approval for the window at Flat 24. I asked the landlord to confirm the property and the decision, updated the tenant, put the job on hold and added a note.

## Where the case stands
Intake/landlord gate. No provider assigned. On hold waiting for landlord, review 2024-02-26. Landlord reply (event 010) names a different property, so it is not approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and whether we may send our contractor for the bedroom window | Isaac Oakley, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant window only is in scope, nothing booked, landlord asked to confirm, next update by 26 Feb | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold awaiting landlord, review 2024-02-26 | Isaac Oakley, landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for letting us know the toilet is sorted. We're now only dealing with the bedroom window. The landlord's reply mentioned a different address, so we've asked them to confirm which property they meant and whether we can send a contractor. Nothing is booked yet. We'll update you by Monday 26 February at the latest.

**A3 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Your latest reply names a different address from this job, which is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Which property did you mean?
> - For Flat 24, 150 Copperfield Walk: the tenant says the toilet is now fixed and only the bedroom window (not closing properly) needs attention. May we send one of our contractors for the window, or will you arrange your own?
> 
> Why: Your reply cannot be treated as approval for this property. No contractor has been instructed yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- The landlord's email does not approve work at Flat 24
- Does not establish the cause or who pays for the window

## Remaining work
- Landlord to confirm property and decision (our contractor or own)
- Then assign contractor and book visit
- Check the plumber at Flat 18 was not meant for this job

## Missing or unavailable information
- Which property the landlord meant
- Landlord's decision for the window repair

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane, ZZ3 5ZZ and a plumber; the job is for Flat 24, 150 Copperfield Walk, ZZ3 7ZZ and is for a window. I trusted the case record.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Waiting for the landlord's decision. The window repair is not approved, no provider is assigned, and the toilet issue was withdrawn by the tenant.

**2. What is the next action, for whom, and by which channel?**

Email to the landlord asking which property they meant and whether we may send our contractor (REQ-102). The tenant was updated by email (MSG-101). Review on 26 Feb.

**3. Does anything need a human decision?**

No. This is an address mismatch that one question to the landlord can settle. I escalate only if there is no answer by the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"Case 047","reason":"Waiting for Landlord","comment":"Landlord reply named Flat 18, 88 Alder Lane (plumber), not this property… | 1 | ❌ failed | Ticket Case 047 not found on read-back |
| A3 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your latest … | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named a different property, so it is not app… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A5 | `add_note` | {"entity":"NBL-047-wrong-address","note":"Event 010 landlord reply names a different property and a plumber visit; treated as not approval. … | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Failed or unverified actions
- A2: Used the wrong ticket ref; re-run with NBL-047-wrong-address as A4.
