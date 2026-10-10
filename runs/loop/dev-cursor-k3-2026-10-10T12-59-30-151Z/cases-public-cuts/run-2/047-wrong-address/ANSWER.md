# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord's reply referred to a different property (Flat 18, 88 Alder Lane), so it is not approval. I asked the landlord to confirm the property and contractor choice, told the tenant the toilet is withdrawn and the window is pending, and held the job to 2024-02-26.

## Where the case stands
Intake/landlord gate, on hold until 2024-02-26. No provider assigned. Landlord reply names a different property so is not approval; waiting on landlord to confirm property and contractor choice for the bedroom window.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and whether to use our contractor for the window | Isaac Oakley, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant only the window remains, nothing booked, next update by 2024-02-26 | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold awaiting landlord, review 2024-02-26 | Isaac Oakley, landlord | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for letting us know the toilet is sorted. We're now only dealing with the bedroom window. We're waiting for the landlord to confirm how they'd like it handled, as their reply was unclear. No contractor or date is booked yet. We'll update you by 2024-02-26 at the latest.

**A3 · send_message → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> Hi Isaac, thank you for your reply. The address in it is not the property this job is for, which is Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Could you confirm which property you meant? Also, the tenant says the toilet is working again, so the only job left at Flat 24 is a bedroom window that isn't closing properly. Should we send our contractor for it, or will you arrange your own? We haven't instructed anyone yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned or visit booked
- The landlord's reply is not treated as approval for Flat 24
- Does not establish the window cause or who pays

## Remaining work
- Landlord to confirm property and contractor choice; then record decision and assign
- Review 2024-02-26; if the landlord is silent, chase on a second channel

## Missing or unavailable information
- Which property the landlord meant
- Landlord decision on contractor for the window

## Conflicts between sources
- Landlord's reply names Flat 18, 88 Alder Lane, Willowbank ZZ3 5ZZ, but the job is Flat 24, 150 Copperfield Walk ZZ3 7ZZ; treated as not about this job.
- Agency's landlord email (event 004) included the toilet issue, which the tenant had since withdrawn.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At provider selection with no provider assigned. The landlord's reply named another property, so there is no valid approval. The toilet issue was withdrawn by the tenant. The window job is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to landlord Isaac Oakley asking which property he meant and whether to use our contractor. Tenant updated by email. Job on hold, review 2024-02-26.

**3. Does anything need a human decision, and why?**

Not yet. One question to the landlord can settle the mismatch. Escalate P3 if it stays unresolved after the review.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-w… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) names Flat 18, 88 Alder Lane, no… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-047-wron… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
