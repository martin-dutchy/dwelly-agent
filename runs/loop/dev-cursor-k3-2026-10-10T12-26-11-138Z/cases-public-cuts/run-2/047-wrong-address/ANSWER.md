# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord's reply referred to Flat 18, 88 Alder Lane, not this property, so it was not treated as approval. I asked the landlord to clarify and decide on the window, told the tenant, and set a hold to 2024-02-26.

## Where the case stands
Provider selection, no contractor assigned. On hold waiting for landlord (review 2024-02-26). Landlord's reply named a different property so it is not approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and whether we may send our contractor for the Flat 24 bedroom window | Isaac Oakley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Acknowledge toilet fixed, window only, update by 2024-02-26 | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-02-26 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for letting us know the toilet is sorted, we'll just deal with the bedroom window. We're waiting for the landlord to confirm how they'd like it arranged, and we've asked them again today. We'll update you by 2024-02-26 at the latest. Kind regards, Ashford

**A4 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Your latest reply names a different property from this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Which property did you mean the plumber to visit? For Flat 24 the tenant has fixed the toilet, so no plumber is needed.
> - For Flat 24 the only outstanding repair is a bedroom window that won't close properly. Do you approve us sending one of our contractors, or will you arrange your own? A yes or no is enough.
> 
> Why: Your reply cannot be treated as approval for this property as it names a different address.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing is approved or assigned; no visit is booked.
- The landlord's plumber visit is for a different address and is not tied to this job.
- The toilet fault is withdrawn by the tenant.

## Remaining work
- Landlord to confirm property and approve contractor for the window (agency owns chase on 2024-02-26)
- Then assign contractor and book visit

## Missing or unavailable information
- Landlord's confirmation of which property and decision on the window repair

## Conflicts between sources
- Landlord email names Flat 18, 88 Alder Lane, ZZ3 5ZZ versus job property Flat 24, 150 Copperfield Walk, ZZ3 7ZZ; treated as not about this job.
- Event 004 to landlord included the toilet issue, which the tenant later withdrew.

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

Awaiting a valid landlord decision on the bedroom window; the toilet issue is withdrawn; the landlord's reply concerned a different address.

**2. What is the next action, who for, which channel?**

Landlord (Isaac Oakley) by email: which property, and approve our contractor for the window? Tenant was updated by email.

**3. Does anything need a human decision?**

No. A single question to the landlord resolves it; escalate only if still unresolved after the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, thanks for … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named a different property (Flat 18, 88 Alde… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `resume_auto` | {"ticket_ref":"NBL-047-wrong-address"} | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after resume_auto |
| A4 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your latest … | 1 | ✅ verified | REQ-102 found in the request_information log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named a different property; asked which they… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |

## Failed or unverified actions
_None._
