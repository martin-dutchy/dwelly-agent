# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord's reply referred to Flat 18, 88 Alder Lane and a plumber, so it was not treated as approval. I asked the landlord which property they meant, told the tenant nothing is booked, noted the record and held the job to 26 Feb.

## Where the case stands
Intake/landlord gate, on hold until 2024-02-26. No provider assigned. Landlord's reply named a different property so it is not approval.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant and for a yes/no on our contractor for the window | Isaac Oakley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant nothing is booked, landlord clarifying, next update by 26 Feb | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-02-26 | Isaac Oakley, landlord | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, thanks for letting us know the toilet is sorted. We're still waiting for the landlord to confirm the go-ahead for the bedroom window; their reply mentioned a different property so we've asked them to clarify. No contractor has been booked yet and nobody should be expected tomorrow. We'll update you by 2024-02-26 at the latest.

**A4 · send_message → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> Hi Isaac, thanks for your reply. The property you mention in it is not the one this request is about, so could you confirm which property you meant? Our request is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ, where the tenant reports a bedroom window that won't close properly (the toilet issue is now fixed, so no plumber is needed). Please let us know whether we may send our contractor to look at the window, or whether you will arrange your own. We haven't instructed anyone yet.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval recorded and no contractor assigned or visit booked
- The landlord's plumber at Flat 18 is not linked to this job
- Nothing here confirms the window fault cause or cost

## Remaining work
- Landlord to confirm property and decision (our contractor / own / tenant)
- Then assign contractor for window, routine, target within 14 days
- Review 2024-02-26

## Missing or unavailable information
- Landlord's decision for Flat 24 window
- Which property the landlord meant in event 010

## Conflicts between sources
- Landlord reply names Flat 18, 88 Alder Lane, ZZ3 5ZZ versus case property Flat 24, 150 Copperfield Walk, ZZ3 7ZZ; trusted the system record.
- Event 004 to landlord included the withdrawn toilet issue; the tenant later withdrew it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine window repair at provider selection with no landlord approval. The landlord's reply named another property, and the toilet issue was withdrawn by the tenant. The landlord's decision is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Clarification request to landlord Isaac Oakley by email (A4), tenant update by email (A1), hold until 2024-02-26 (A2).

**3. Does anything need a human decision, and why?**

No. One question to the landlord resolves it. Escalate P3 only if the clarification isn't answered by the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-w… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named Flat 18, 88 Alder Lane, no… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-047-wrong-address","note":"Event 010 landlord reply names a different address (Flat 18, 88 Alder Lane) and a plumber; not tre… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A4 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-047-wron… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
- first landlord send_message (no ledger id): Blocked by policy because it named the other address; resent as A4 without it.
