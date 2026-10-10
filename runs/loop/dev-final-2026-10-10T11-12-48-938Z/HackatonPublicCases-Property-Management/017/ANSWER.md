# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Tenant reported a non-working extractor fan; the landlord replied that the fan has a separate switch right of the hob. I asked the tenant to try it and put the job on hold with a review date. No approval or contractor yet.

## Where the case stands
Ticket NBL-017 at intake, landlord approval step not completed. On hold waiting for tenant to try the switch the landlord described; review 2026-09-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask tenant to try the switch right of the hob and confirm whether the fan works | Clara, tenant | email | A1 ✅ |
| 2 | WAIT | Hold until 2026-09-18 for tenant's answer | Clara, tenant | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Clara (tenant) via email, existing thread (event 007 email)** (verified)

> Hi Clara, the landlord says the extractor fan has its own switch, on the right-hand side of the hob, which needs to be switched on. Could you try that and let us know whether the fan now works? If it still doesn't, we'll carry on arranging a technician to look at it. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The landlord's tip is not approval or a decision on contractor; no contractor assigned.
- Does not confirm the cause of the fault.
- The photo attachment was unavailable and not seen.

## Remaining work
- If the tenant confirms it works: close without payment, tell the landlord.
- If not: ask the landlord for a clear decision (our contractor or own), then assign and book.
- Agency owns the follow-up on 2026-09-18.

## Missing or unavailable information
- Whether the fan works using the separate switch
- Landlord decision on contractor
- Tenant's photo was unavailable

## Conflicts between sources
- Tenant says the fan does not turn on; landlord says it needs a separate switch. Not resolved until the tenant tries it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake with no landlord approval. The landlord says the fan has a separate switch by the hob. Outstanding: the tenant's confirmation of whether it works, and if not, the landlord's contractor decision.

**2. What is the next action, who is it for, and through which channel?**

Email to the tenant (Clara) asking her to try the switch and confirm, sent as MSG-101. The job is on hold until 2026-09-18.

**3. Does anything need a human decision, and why?**

No. It is a routine job and nothing needs human authority.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says fan has a separate switch right of hob. Asked tenant to try i… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Failed or unverified actions
_None._
