# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The tenant's toilet issue is fixed, leaving only the bedroom window. The landlord replied about a plumber at a different address (Flat 18, 88 Alder Lane), so I did not treat it as approval. I asked the landlord to confirm the property and choose a contractor, updated the tenant, and put the job on hold until 2024-02-26.

## Where the case stands
Intake/landlord gate. No provider assigned. Landlord's reply names Flat 18, 88 Alder Lane, so it is not approval for this job. Waiting on landlord to confirm the property and choose a contractor; on hold, review 2024-02-26.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and whether we or they arrange the window repair at Flat 24, reply by 2024-02-26 | Isaac Oakley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant the window is the only scope, nothing booked, next update by 2024-02-26 | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-02-26 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, glad the toilet is sorted. We've noted that you only need the bedroom window looked at. We're waiting on the landlord to confirm how they'd like it handled, so no contractor is booked yet. We'll update you by 2024-02-26.

**A4 · send_message → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> Hi Isaac, thanks for your reply. The property address in your email doesn't match this request, which is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Could you confirm which property you meant? For Flat 24, the tenant's bedroom window isn't closing properly (the toilet issue has since been fixed by the tenant). Would you like us to send our contractor to look at the window, or will you arrange your own? Please reply by 2024-02-26. We haven't instructed anyone yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no approval recorded.
- The landlord's email does not establish approval for Flat 24, nor whether Flat 18 is related.
- Nothing is booked for the window.

## Remaining work
- Landlord to confirm property and contractor choice; then assign or record own contractor.
- Book the window visit after approval.

## Missing or unavailable information
- Which property the landlord meant
- Landlord decision on contractor for the Flat 24 window

## Conflicts between sources
- Landlord email names Flat 18, 88 Alder Lane, ZZ3 5ZZ; the job is Flat 24, 150 Copperfield Walk, ZZ3 7ZZ. I trusted the job record.
- The landlord was sent the toilet issue at event 004, but the tenant says it is fixed (event 006).

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

It is at the landlord approval gate with no provider assigned. The landlord's reply names a different property and a plumber, so it is not approval. The window repair is outstanding. The toilet was fixed by the tenant.

**2. What is the next action, who is it for, and through which channel?**

Email to the landlord asking which property they meant and whether they want our contractor or their own for the window. Email to the tenant with a status update. Hold until 2024-02-26.

**3. Does anything need a human decision?**

No. One question to the landlord can settle the address mismatch. Escalate only if it stays unresolved after the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-w… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane, no… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-047-wrong-address","note":"Scope reduced to bedroom window only (toilet fixed by tenant, event 006). Landlord event 010 names… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-047-wron… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-047-wrong-address"} | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after resume_auto |
| A6 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Asked landlord to confirm property (event 010 named another… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |

## Failed or unverified actions
- A1-blocked: The first landlord email was blocked by policy for naming the other address. I resent it without that address (A4).
- A2: The first hold was cleared by resume_auto (A5), so I re-applied it (A6).
