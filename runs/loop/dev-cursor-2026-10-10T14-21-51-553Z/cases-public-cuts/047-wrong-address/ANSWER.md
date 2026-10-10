# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's reply named a different property and a plumber visit, so it is not approval for the window at Flat 24. I asked the landlord which property they meant and for a yes/no on our contractor, told the tenant nothing is booked yet, and put the job on hold until 26 Feb.

## Where the case stands
Intake/landlord gate, on hold until 2024-02-26. No approval recorded, no contractor assigned. Waiting on landlord to clarify property and approve the window job.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and for a yes/no on our contractor for the window by 26 Feb | Isaac Oakley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant nothing is booked, ask whether the window can be secured, next update by 26 Feb | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold awaiting landlord, review 2024-02-26 | Isaac Oakley, landlord | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for letting us know the toilet is sorted. We've asked the landlord to confirm the bedroom window repair and are waiting on their answer, so no contractor is booked yet. Please let us know if the window can't be closed and locked, so we can treat it as a security issue. If it can't be secured, please tell us. We'll update you by 26 February at the latest.

**A4 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Your reply mentions a plumber visiting a different property from this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Which property did you mean, and is your plumber attending Flat 24 at all?
> - The tenant says the toilet is now fixed, so only the bedroom window that won't close properly remains. Yes or no: may we send our contractor to look at and quote for it? Or will you arrange your own (who, and when)? Please reply by 2024-02-26.
> 
> Why: Your reply names a different address and a plumbing issue, so we can't treat it as approval for the window at Flat 24.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing approves the window repair or assigns a contractor
- The landlord's reply is not treated as approval or as a visit to this property
- Does not establish whether the window is secure

## Remaining work
- Landlord to confirm property and decision; agency then records decision and assigns or waits for their contractor
- Tenant to say whether the window can be secured
- Chase landlord on a second channel if no reply by 26 Feb

## Missing or unavailable information
- Landlord's confirmation of which property they meant
- Landlord's decision on the window
- Whether the window can be secured

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane (ZZ3 5ZZ) and a plumber; the job is Flat 24, 150 Copperfield Walk (ZZ3 7ZZ) and a window. The case record was trusted. An earlier request to the landlord was blocked by policy for naming the other address and was resent without it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake and on hold. The toilet issue was withdrawn by the tenant. The window repair has no landlord approval, because the landlord's reply refers to a different address and a plumber. No contractor is assigned.

**2. What is the next action, who is it for, and through which channel?**

Landlord is asked by email to confirm the property and approve or decline our contractor for the window, by 26 Feb. Tenant has been updated by email. The job is on hold until 26 Feb.

**3. Does anything need a human decision, and why?**

No. This is a routine clarification. Escalate P3 only if the landlord's address mismatch stays unresolved after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) names Flat 18, 88 Alder Lane and… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-047-wrong-address","note":"Event 004 to landlord included the withdrawn toilet issue; event 010 reply refers to a different a… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your reply m… | 1 | ✅ verified | REQ-103 found in the request_information log |

## Failed or unverified actions
_None._
