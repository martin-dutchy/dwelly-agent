# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord replied about a plumber at a different address, and the toilet is already fixed. I asked him to confirm the property and approve the window repair, told the tenant, and put the job on hold with a review date.

## Where the case stands
Ticket at init, on hold (Waiting for Landlord, review 2024-02-24). No landlord approval for the bedroom window at Flat 24. No contractor assigned.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked landlord to confirm the property and say whether we may send a contractor for the bedroom window (toilet no longer needed) | Isaac Oakley, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Told tenant only the window is outstanding and we are waiting on the landlord | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold until 2024-02-24, then chase landlord | Isaac Oakley, landlord | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, glad the toilet is sorted. We've noted that only the bedroom window needs attention. We're waiting for the landlord to confirm who will carry out the work, and we'll be in touch as soon as we have a visit to arrange. If the window can't be locked shut and you feel unsafe, please let us know. Kind regards, Ashford

**A3 · send_message → Isaac Oakley (landlord) via email, existing thread (event 010 email)** (verified)

> Dear Mr Oakley, thank you for your reply. The address in your email does not match our request, which is for Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ. Please check you have the right property. The tenant has also told us the toilet is now fixed, so no plumber is needed. The only outstanding job is a bedroom window that does not close properly. May we send one of our contractors to inspect and quote, or would you prefer to arrange your own? Kind regards, Ashford

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The landlord's email is not approval for this property; it does not authorise any work or spend at Flat 24.
- Messages do not confirm a visit date, cost or the cause of the window fault.

## Remaining work
- Landlord to confirm correct property and approval or own contractor (agency chases 2024-02-24)
- Then assign contractor and book visit with 24h notice to tenant (routine, within 14 days)

## Missing or unavailable information
- Landlord's decision on the window for Flat 24
- Whether the landlord's plumber booking at Flat 18, 88 Alder Lane relates to another of their properties

## Conflicts between sources
- Landlord's reply names Flat 18, 88 Alder Lane, Willowbank, which differs from the job property Flat 24, 150 Copperfield Walk. I trusted the job record.
- Landlord was told about a toilet issue the tenant has since said is fixed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine window repair at Flat 24, awaiting landlord approval. The landlord's reply named Flat 18, 88 Alder Lane and a toilet plumber, so it is not usable. The toilet is fixed by the tenant's mother.

**2. What is the next action, who is it for, and through which channel?**

Clarification request to landlord Isaac Oakley by email (sent), tenant updated by email, hold until 2024-02-24.

**3. Does anything need a human decision, and why?**

No. This is a routine clarification. If the landlord does not reply by the review date, chase him; a human is needed only if the address mix-up proves to be a records problem.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL-047-w… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Landlord reply named a different property (Flat 18, 88 Alde… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-102 found in the send_message log |

## Failed or unverified actions
_None._
