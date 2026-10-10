# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant's bedroom window repair awaits landlord approval. The landlord's reply named a different address (Flat 18, 88 Alder Lane), so it is not approval. I asked him one clarifying question, updated the tenant (toilet withdrawn), noted the record and held to 26 Feb.

## Where the case stands
Intake/landlord gate, on hold until 2024-02-26. No contractor assigned. Landlord reply names a different property so is not approval. Waiting on landlord.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property he meant and whether we may send our contractor for the window only | Isaac Oakley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant we deal with the window only, await landlord, next update by 26 Feb | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold awaiting landlord, review 2024-02-26 | Isaac Oakley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for letting us know the toilet is sorted – we'll deal with the bedroom window only. We're still waiting for the landlord to confirm who will carry out the repair, and we've asked them a clarifying question. We'll update you by 26 February at the latest. Kind regards, Ashford

**A4 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Your reply refers to a different address from our request, which is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Which property did you mean the plumber visit for?
> - For Flat 24, 150 Copperfield Walk: the tenant says the toilet is now fixed, so only the bedroom window that won't close properly remains. May we send one of our contractors for it, or will you arrange your own?
> 
> Why: Landlord reply names a different property so it cannot be treated as approval for this job.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval recorded and no contractor assigned or visit booked
- The 23 Feb plumber visit relates to another address and does not cover this window
- Does not establish who pays or the cause

## Remaining work
- Landlord to confirm property and contractor choice for the window (agency, review 26 Feb)
- Then record decision, assign contractor, tell tenant

## Missing or unavailable information
- Which property the landlord meant
- Landlord's decision on contractor for the window

## Conflicts between sources
- Landlord's event 010 names Flat 18, 88 Alder Lane, ZZ3 5ZZ versus case property Flat 24, 150 Copperfield Walk, ZZ3 7ZZ; treated as not about this job.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At provider selection with no approval. The landlord's reply refers to another property. Outstanding: confirmation of the property and a decision on contractor for the bedroom window. Toilet issue withdrawn by tenant.

**2. What is the next action, who is it for, and through which channel?**

Clarifying email to landlord Isaac Oakley (sent, REQ-103), plus tenant update by email; hold to 26 Feb.

**3. Does anything need a human decision, and why?**

No. A clarifying question to the landlord can resolve it; escalate P3 only if the mismatch stays unresolved.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-047-wrong-address","note":"Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not this property; not treated a… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Asked landlord which property they meant and whether we may… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A4 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your reply r… | 1 | ✅ verified | REQ-103 found in the request_information log |

## Failed or unverified actions
- none: First landlord request was blocked by policy for naming the other address; resent without it (A4).
