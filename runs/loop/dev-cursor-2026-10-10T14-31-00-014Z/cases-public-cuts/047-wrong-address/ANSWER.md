# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord replied naming a plumber at Flat 18, 88 Alder Lane, a different address, and about a toilet the tenant says is fixed. I did not treat it as approval. I asked the landlord which property they meant and whether to use our contractor for the window, updated the tenant, noted the record and put the job on hold until 26 Feb.

## Where the case stands
Provider selection, no contractor assigned. On hold waiting for landlord (review 2026-02-26 → 2024-02-26). Landlord's reply named a different property, so there is no valid approval. Toilet issue withdrawn by tenant; only the bedroom window remains.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask landlord which property they meant, and whether to use our contractor for the window, reply by 26 Feb 2024 | Isaac Oakley, landlord | email | A4 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant window is the only job, nothing booked, landlord asked to confirm, next update by 26 Feb | Tenant | email | A1 ✅ |
| 3 | WAIT | Hold for landlord reply, review 2024-02-26 | Isaac Oakley, landlord | internal | A5 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> Hi, glad the toilet is sorted. We've noted that only the bedroom window needs attention. The landlord's reply mentioned a different address, so we've asked them to confirm and to approve a contractor for your window. No visit is booked yet. Until it's fixed, please keep the window as closed and secure as you can. We'll update you by Monday 26 February. Kind regards, Ashford

**A4 · request_information → Isaac Oakley (landlord) via email, agency landlord record** (verified)

> - Your email gave a different address from this job (Flat 24, 150 Copperfield Walk, Kingshaven, ZZ3 7ZZ). Which property did you mean, and will your plumber attend Flat 24 at all?
> - The tenant says the toilet is now fixed, so only the bedroom window that will not close properly remains. May we send our contractor to inspect and quote for the window, or will you arrange your own? Please reply by Monday 26 February 2024.
> 
> Why: The landlord's reply names a different address and a plumber, so it cannot be treated as approval for the window at this property.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No approval or contractor assignment has happened; the landlord's email does not authorise work at Flat 24.
- No visit is booked; no cost or date is promised.
- Does not establish whether the landlord's plumber is going to Flat 24 or whether the address was a mistake.

## Remaining work
- Landlord to confirm property and route (our contractor or their own) for the window; owner: landlord, then agency.
- Assign contractor and book visit after recorded approval.
- Review hold on 2024-02-26; chase on a second channel if no reply.

## Missing or unavailable information
- Which property the landlord meant
- Landlord's decision on contractor for the window

## Conflicts between sources
- Landlord email (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ; the job is Flat 24, 150 Copperfield Walk, ZZ3 7ZZ. Trusted the system property record.
- Landlord was sent the toilet and window report (event 004), but the tenant later withdrew the toilet (event 006).

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At provider selection with no contractor assigned. Landlord approval for the bedroom window is outstanding because the landlord's reply named a different address and a plumber for a toilet that is now fixed.

**2. What is the next action, who is it for, and through which channel?**

Ask the landlord, Isaac Oakley, by email which property he meant and whether we may send our contractor for the window (done, A4). The tenant has been updated by email (A1). The job is on hold with review on 2024-02-26.

**3. Does anything need a human decision, and why?**

No. This is routine: a single question to the landlord and a dated hold. Escalate only if the address mix-up stays unresolved after the review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","body":"Hi, glad the to… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"ticket","note":"Landlord email (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ and a plumber, not this property (Flat 24, 150 C… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"047","reason":"Waiting for Landlord","comment":"Awaiting landlord confirmation of which property their email meant and approv… | 1 | ❌ failed | Ticket 047 not found on read-back |
| A4 | `request_information` | {"recipient_name":"Isaac Oakley","recipient_role":"landlord","channel":"email","contact":"agency landlord record","questions":["Your email g… | 1 | ✅ verified | REQ-103 found in the request_information log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-047-wrong-address","reason":"Waiting for Landlord","comment":"Awaiting landlord confirmation of which property their emai… | 1 | ✅ verified | Ticket NBL-047-wrong-address read back after put_on_hold |

## Failed or unverified actions
- A3: put_on_hold used the wrong ticket ref (047). Retried with NBL-047-wrong-address and it verified as A5.
