# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord's reply says the fan has a separate switch; it does not authorise a contractor. I asked the tenant to try the switch, put the job on hold until 18 Sept and noted the record.

## Where the case stands
Ticket NBL-017 at intake/landlord gate. Landlord replied with a tip (separate switch right of hob), not a contractor decision. Held waiting for tenant to test the switch; review 2026-09-18.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask Clara to try the switch right of the hob and confirm whether the fan works | Clara, tenant | email | A1 ✅ |
| 2 | WAIT | Hold until 2026-09-18 for tenant's answer; if still faulty, ask landlord for a clear contractor decision | Clara, tenant | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Clara (tenant) via email, existing thread (event 007 email)** (verified)

> Hi Clara, the landlord has replied to say the extractor fan has its own switch, to the right-hand side of the hob, which needs to be switched on. Could you try that switch and let us know whether the fan then works? If it still doesn't, tell us and we'll go ahead and arrange a visit. We'll check back with you on 18 September if we haven't heard.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No landlord approval recorded; no contractor assigned or visit booked
- Does not establish the fan is working or the cause of the fault

## Remaining work
- Tenant to confirm result of switch
- If not fixed, agency asks landlord for approval to use our contractor or their own
- If fixed, record and close without payment

## Missing or unavailable information
- Whether fan works with the switch on
- Event 004 picture was unavailable and not seen

## Conflicts between sources
- Tenant's 'Thank you!' (event 007) was sent before the landlord's reply and doesn't say whether the fan was fixed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Routine job at the landlord gate with no decision recorded. The landlord suggests a hob-side switch; the tenant needs to confirm whether the fan now works.

**2. What is the next action, who is it for, and through which channel?**

Email to Clara asking her to test the switch (sent), then a hold with review on 18 Sept.

**3. Does anything need a human decision, and why?**

No. It is routine and waiting on the tenant. The landlord's contractor decision is only needed if the fan is still faulty.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"NBL-017","… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Landlord says fan runs from a separate switch right of the hob (event 008);… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-017","note":"Landlord event 008 gives a tip, not a decision on contractor. No landlord decision recorded; no contractor assig… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Failed or unverified actions
_None._
