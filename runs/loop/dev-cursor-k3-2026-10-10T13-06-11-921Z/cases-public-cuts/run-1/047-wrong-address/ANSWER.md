# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord's reply referred to a plumber at a different address, so it is not approval for this job. The tenant says the toilet is fixed; only the window remains. I asked the landlord to clarify, updated the tenant, and put the job on hold until 26 Feb.

## Where the case stands
Provider selection, no contractor assigned. On hold waiting for landlord until 2024-02-26. Landlord's reply named a different property so it is not approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and whether our contractor may attend Flat 24 for the window | Isaac Oakley, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant window is the only issue, nothing booked, next update by 26 Feb | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-02-26 | Isaac Oakley, landlord | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, glad the toilet is sorted. We've noted that only the bedroom window needs repair now. We're waiting for the landlord to confirm who will do it, as their reply mentioned a different property and we've asked them to clarify. No contractor is booked yet. We'll update you by Monday 26 February at the latest.

**A3 · send_message → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> Hi Isaac, thanks for your reply. The address in your message doesn't match this job, which is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Which property did you mean? The tenant has also told us the toilet is now fixed, so the only remaining issue is a bedroom window that isn't closing properly (a window repairer rather than a plumber). Please confirm: may we send one of our contractors to Flat 24 for the window, or will you arrange your own? We haven't instructed anyone yet. We'll check back with you in 2 working days.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned or visit booked
- Landlord's message is not approval for this property
- Does not decide who pays or the cause of the window fault

## Remaining work
- Landlord to confirm property and contractor choice; then record decision and assign a window repairer (agency ops)
- Chase landlord on a second channel after review date if silent

## Missing or unavailable information
- Which property the landlord meant
- Landlord's decision on contractor for the window

## Conflicts between sources
- Landlord's reply names Flat 18, 88 Alder Lane (ZZ3 5ZZ) vs case property Flat 24, 150 Copperfield Walk (ZZ3 7ZZ); treated as not about this job.
- Landlord email quoted the toilet issue, which the tenant has since withdrawn; the landlord's plumber is not relevant to the window.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Awaiting landlord approval for the bedroom window repair at Flat 24. The landlord's reply named a different property and a plumber, so no authority exists. Toilet issue withdrawn by tenant.

**2. What is the next action, who is it for, and through which channel?**

Email to landlord Isaac Oakley asking which property he meant and whether our contractor may attend (sent); tenant updated by email; hold to 2024-02-26.

**3. Does anything need a human decision, and why?**

No. A single clarifying question to the landlord resolves it; escalate P3 only if the address mismatch is not settled.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-w… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) names Flat 18, 88 Alder Lane, a … | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-047-wron… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
