# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord's reply referred to a plumber at Flat 18, 88 Alder Lane, not this property, and the toilet issue is already fixed. I treated it as non-approval, asked the landlord to clarify and decide on the window, told the tenant, and put the job on hold to 25 Feb.

## Where the case stands
Intake/landlord gate. No provider assigned. Held waiting on landlord (review 2024-02-25). Landlord's reply named a different property so is not approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and whether our contractor may quote on the bedroom window only | Isaac Oakley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant scope is window only, nothing booked, next update by 25 Feb | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-02-25 | Isaac Oakley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for letting us know the toilet is sorted. We'll treat this as a bedroom window repair only. We're still waiting for your landlord to confirm who will do the work, as their last reply was about a different address and we've asked them to clarify. Nobody has been booked yet. We'll update you by 25 February at the latest.

**A4 · request_information → Isaac Oakley (landlord) via email, existing thread (event 010 email)** (verified)

> - Your last reply mentioned a plumber visiting a different address from this job. Which property did you mean? This job is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ.
> - For Flat 24, the tenant says the toilet is now fixed and only the bedroom window (not closing properly) needs attention. May we send our contractor to look at and quote for the window? Please reply yes, or name your own contractor and a date.
> 
> Why: The landlord's reply names a different address and a plumber, so it cannot be treated as approval for the window repair at this property.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here approves any contractor or spend
- The landlord's plumber visit to Flat 18 is not linked to this job
- The window fault's cause and cost are unknown

## Remaining work
- Landlord to confirm property and decision (our contractor / own)
- Then assign contractor and book visit, or record own contractor
- Review 2024-02-25

## Missing or unavailable information
- Which property the landlord meant
- Landlord decision on contractor for window

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane, Willowbank ZZ3 5ZZ; case property is Flat 24, 150 Copperfield Walk, ZZ3 7ZZ. Trusted the system record.
- Landlord was told about the toilet; tenant later said it is fixed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At landlord approval stage; no provider assigned. The landlord's reply names a different address and a plumber, so there is no valid approval for the window repair. Outstanding: the landlord's clarification and decision.

**2. What is the next action, who is it for, and through which channel?**

Email to landlord Isaac Oakley asking which property he meant and whether we may send our contractor for the window (A4); tenant updated by email (A1); hold to 2024-02-25 (A5).

**3. Does anything need a human decision, and why?**

No. A question to the landlord can resolve it; escalate only if the address issue stays unresolved after the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"047","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) names Flat 18, 88 Alder Lane; not approval for Fla… | 1 | ❌ failed | Ticket 047 not found on read-back |
| A3 | `add_note` | {"entity":"ticket 047","note":"Event 010 landlord reply refers to Flat 18, 88 Alder Lane (ZZ3 5ZZ) and a plumber; case property is Flat 24, … | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","questions":["Y… | 1 | ✅ verified | REQ-103 found in the request_information log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) concerned a different property; … | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |

## Failed or unverified actions
- A2: put_on_hold used a wrong ticket ref; retried with NBL-047-wrong-address (A5, verified)
