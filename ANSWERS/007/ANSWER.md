# Television, bedroom light and door handle: ANSWER

**Decision:** action_taken · **Severity:** routine

Case is awaiting landlord approval for the light and TV ownership, and the electrician's exact time. I asked the landlord, asked the provider to confirm a time, updated the tenant with safety advice, opened a door-handle job and put the ticket on hold.

## Where the case stands
NBL-007 at init, on hold (review 2025-09-19). Landlord approval covers TV only; light unapproved; TV ownership unclear. Bracken Spark proposed 29 Sept after 15:00, no exact time, not booked. Rear-door handle opened as JOB-101.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve light check and clarify TV ownership/disposal | Corin Wex, landlord | email | A2 ✅ |
| 2 | BOOK_OR_CONFIRM_APPOINTMENT | Ask electrician for exact time on 29 Sept; no booking yet | Rian Sol, Bracken Spark | email | A3 ✅ |
| 3 | REPLY_TO_TENANT | Update tenant: visit proposed not confirmed, safety advice, door handle logged | Ada Pell, tenant | email | A4 ✅ |
| 4 | WAIT | Hold awaiting landlord, review 19 Sept | internal | internal | A5 ✅ |
| 5 | SPLIT_NEW_REQUEST | Logged rear-door handle as separate routine job | internal | internal | A1 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Corin Wex (landlord)** (verified)

> (1) Approve an electrician (Bracken Spark Services) to check the downstairs bedroom light, which flickers and pops; your earlier approval covered only the TV. (2) Confirm whether the Samsung TV in the upstairs bedroom is yours, and whether you are happy for it to be removed/disposed of if not repairable, at your cost, not the tenant's.
> 
> Options: Approve the light check by Bracken Spark Services (recommended), with a spend cap you choose; Arrange your own electrician; Tell us the TV is the tenant's/not yours, so we only treat the light
> 
> Update: Tenant reports TV tripping a fuse (tenant thinks main board failed, not a diagnosis) and is open to its removal. The tenant says she is managing with a lamp for the light. Bracken Spark proposed 29 Sept after 15:00; not yet confirmed, no exact time. A new routine job has been opened for a rear-door handle that came off. Please reply by 2025-09-19.

**A3 · send_message → Rian Sol (contractor) via email, existing thread (event 019 email)** (verified)

> Thanks for proposing 29 September after 15:00 at 8 Vellum Court. Please confirm an exact arrival time or window that day. Note: tenant asks you call on arrival rather than knock (dog will be taken out during the visit). We're still awaiting landlord approval for the downstairs light and clarity on TV ownership, so please don't treat the visit as final until we confirm back, which we aim to do by 2025-09-19.

**A4 · send_message → Ada Pell (tenant) via email, existing thread (event 016 email)** (verified)

> Hi Ada, thanks for your availability. The electrician has suggested 29 September after 15:00, one of your slots, but it is not confirmed yet: we're asking for an exact time and will confirm it to you. We've passed on your request to call on arrival because of the dog. Until the light is checked, please avoid using the flickering downstairs light switch, and keep the TV unplugged; if you notice burning smells, sparks or scorching, switch off at the fuse board and call us (999 if in danger). We're asking the landlord to approve the light check and to confirm the TV position, and we've noted you're happy for it to be removed if not repairable. I've also logged the rear-door handle as a separate job; please tell us if the door still locks securely. You'll hear from us again by 19 September.

## Escalation
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Landlord | Chase approval and TV ownership | 2025-09-19 | A5 ✅ verified |

## What this does not establish
- Nothing is booked; the 29 Sept slot is a provider proposal without an exact time
- No cause of the TV or light fault is established
- Landlord has not approved the light work or TV disposal; nobody was told who pays beyond that it is not the tenant

## Remaining work
- Landlord reply on light approval and TV ownership (agency, by 19 Sept)
- Provider exact time, then set_visit and notify tenant
- JOB-101 door handle: landlord approval and handyman assignment, check door security

## Missing or unavailable information
- Exact arrival time from electrician
- Landlord decision on light and TV
- Whether rear door secures

## Conflicts between sources
- Landlord doubts the TV was left at the property; tenant says it is theirs to dispose of, ownership unresolved
- Tenant dates in event 016 vs provider's single proposal 29 Sept: consistent, only one date offered

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Unscheduled and at intake. Landlord approval covers only the TV; the light is unapproved and TV ownership is unclear. Electrician proposed 29 Sept after 15:00 with no exact time. Door handle was never logged until now (JOB-101).

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email (A2), provider time confirmation by email (A3), tenant update by email (A4).

**3. Does anything need a human decision, and why?**

No escalation. The landlord decision is routine and has been requested; the hold has a review date.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `create_ticket` | {"property":"8 Vellum Court, Brindlewick, ZZ1 1ZZ","category":"locks","severity":"routine","description":"Rear-door handle has come off (rai… | 1 | ✅ verified | Ticket JOB-101 read back at stage init |
| A2 | `request_landlord_approval` | {"landlord":"Corin Wex","ticket_ref":"NBL-007","decision_needed":"(1) Approve an electrician (Bracken Spark Services) to check the downstair… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A3 | `send_message` | {"recipient_name":"Rian Sol","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Ada Pell","recipient_role":"tenant","channel":"email","contact":"existing thread (event 016 email)","ticket_ref":"NBL-007… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-007","reason":"Waiting for Landlord","comment":"Awaiting landlord approval for downstairs light check and TV ownership/di… | 1 | ✅ verified | Ticket NBL-007 read back after put_on_hold |

## Failed or unverified actions
_None._
