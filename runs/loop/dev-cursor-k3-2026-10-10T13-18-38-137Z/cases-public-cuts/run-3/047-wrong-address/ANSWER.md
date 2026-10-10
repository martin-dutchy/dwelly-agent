# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's reply named Flat 18, 88 Alder Lane and a plumber, so it is not approval for the window at Flat 24. I asked the landlord which property they meant and for a yes/no on the window, told the tenant, noted the ticket and put it on hold to 2024-02-26.

## Where the case stands
Intake/landlord gate. No provider assigned, no visit booked. On hold waiting for landlord until 2024-02-26. Scope is the bedroom window only (toilet withdrawn by tenant).

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and for a yes/no on our contractor for the window at Flat 24, reply by 2024-02-26 | Isaac Oakley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant only the window remains, awaiting landlord go-ahead, no visit booked, next update by 26 Feb | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-02-26 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, glad the toilet is sorted. We've told the landlord that only the bedroom window now needs fixing, and we're waiting for their go-ahead. Their last reply mentioned a different address, so we've asked them to confirm. No visit is booked yet. We'll update you by 26 February.

**A4 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Your reply refers to a different address from this job, which is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Which property did you mean?
> - For Flat 24, the tenant says the toilet is now fixed, so only the bedroom window (not closing properly) remains. Yes or no: may we send our contractor to look at and quote for the window? Please reply by 2024-02-26.
> 
> Why: Landlord reply names a different property and a plumber, so it cannot be treated as approval for the window at Flat 24.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The landlord's reply is not approval: it names another property and a plumber for the toilet.
- Nothing here confirms who will fix the window, a date, or cost.
- No contractor assigned.

## Remaining work
- Landlord to confirm property and approve/decline contractor for window (agency chases after 2024-02-26)
- Then assign contractor and book visit with tenant
- Check the landlord's plumber visit to the other address was not meant for this flat

## Missing or unavailable information
- Which property the landlord meant
- Landlord decision on the window repair

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane, ZZ3 5ZZ, but the job is Flat 24, 150 Copperfield Walk, ZZ3 7ZZ. Treated the job record as correct.
- Landlord's email (event 004) included the toilet; the tenant later said it was fixed (event 006).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At the landlord approval gate with no provider assigned. The landlord's reply names a different property and a plumber, so it gives no authority. Outstanding: landlord confirmation of the property and a decision on the window repair.

**2. What is the next action, who is it for, and through which channel?**

A question to landlord Isaac Oakley by email (A4) asking which property he meant and for a yes/no on our contractor. The tenant was updated by email (A1). The ticket is on hold to 2024-02-26 (A2).

**3. Does anything need a human decision, and why?**

Not now. A routine question to the landlord settles it. If the address mismatch is still unresolved after the review date, escalate P3 maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, glad the to… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) names Flat 18, 88 Alder Lane; as… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-047-wrong-address","note":"Event 010 landlord reply names a different property and a plumber (toilet issue, now withdrawn by … | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your reply r… | 1 | ✅ verified | REQ-103 found in the request_information log |

## Failed or unverified actions
- first request_information attempt: Blocked by policy because it named the other address; resent without it as A4.
