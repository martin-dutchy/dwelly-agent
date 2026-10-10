# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord's reply named a different property and a plumber, so it is not approval for the bedroom window at Flat 24. I asked the landlord which property they meant and for a yes/no on the window, told the tenant, noted the record and put the job on hold to 26 Feb.

## Where the case stands
Intake/landlord gate. No contractor assigned. On hold waiting for landlord, review 2024-02-26. Landlord reply (event 010) is not usable approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and for a yes/no on our contractor for the window, reply by 2024-02-26 | Isaac Oakley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant only the window is in scope, landlord decision pending, update by 26 Feb, nobody to be expected yet | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold for landlord reply until 2024-02-26 | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for letting us know the toilet is sorted. We're now only dealing with the bedroom window. We're waiting on the landlord to confirm how they'd like it handled, and we've asked them to reply by 26 February. We'll update you by then. Please don't expect anyone to attend until we confirm a date with you.

**A4 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Your latest reply refers to a property address that doesn't match this job, which is Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Which property did you mean?
> - For Flat 24 the tenant says the toilet is now fixed, so only the bedroom window (not closing properly) needs attention. Yes or no: may we send our contractor to look at and quote for the window? Please reply by 2024-02-26.
> 
> Why: The landlord's reply names a different property and a plumber, so it cannot be treated as approval for the window at this property.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves spend or a contractor
- Does not confirm which property the landlord's plumber visit concerns
- No visit is booked

## Remaining work
- Landlord to confirm property and approve/decline contractor for window; agent to review 2024-02-26
- Then assign contractor and book visit

## Missing or unavailable information
- Which property the landlord's reply meant
- Landlord's decision on the window repair

## Conflicts between sources
- Landlord reply (event 010) names a different address and a plumber, versus job at Flat 24 for a window; treated as not about this job. Tenant says toilet fixed, versus the landlord email which relayed the toilet issue.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At landlord approval stage, no provider assigned. Landlord's reply refers to another property and a plumber (toilet already fixed by tenant), so approval for the window is still outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to landlord Isaac Oakley asking which property he meant and for a yes/no on our contractor for the window; tenant updated by email; hold to 2024-02-26.

**3. Does anything need a human decision, and why?**

No. A property mismatch is resolved by asking the landlord first; escalate P3 only if the answer doesn't settle it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) names Flat 18, 88 Alder Lane, a … | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-047-wrong-address","note":"Landlord email event 010 refers to Flat 18, 88 Alder Lane ZZ3 5ZZ and a plumber; not approval for … | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your latest … | 1 | ✅ verified | REQ-103 found in the request_information log |

## Failed or unverified actions
_None._
