# Case 017: Kitchen Extractor Fan Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord replied that the extractor fan's switch is on the right-hand side of the hob, which may explain the fault, but gave no decision on a contractor. I recorded the reply as unclear, asked the tenant to check the switch, asked the landlord which route they want if the fan still fails, and put the ticket on hold for the tenant with a review date of 2026-09-17.

## Where the case stands
Ticket NBL-017 (logged as 017; system ref NBL-017). Stage: landlord gate, no route approved. The landlord's reply (event 008) only gives the switch location on the right-hand side of the hob. It does not choose our contractor, their own contractor, or tenant self-fix. On hold for the tenant to check the switch, review 2026-09-17.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant to check the right-hand hob switch and reply whether the extractor fan now works; if not, say we will arrange a contractor once the landlord decides | Clara, tenant | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Tell the landlord the switch location was passed to the tenant, and ask whether, if the fan still does not work, they want our contractor or their own | Landlord (existing thread, event 008) | email | A3 ✅ |
| 3 | WAIT | Hold the ticket for the tenant's reply with a review date of 2026-09-17 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Clara (tenant) via email, existing thread (event 007 email)** (verified)

> Hello Clara,
> 
> Thank you for your message. The landlord has replied and says there is a switch on the right-hand side of the hob that needs to be switched on for the extractor fan to work. Could you check that switch and let us know whether the fan now comes on?
> 
> If it still does not work after that, please reply to this email and we will arrange for a contractor to look at it.
> 
> Kind regards,
> Northbridge Lettings

**A3 · send_message → Landlord (landlord) via email, existing thread (event 008 email)** (verified)

> Hello,
> 
> Thank you for your reply about the kitchen extractor fan at Flat 1, 31 Juniper Mews. We have passed the switch location on to the tenant and asked her to check it.
> 
> If the fan still does not work once the switch is on, please let us know whether you would like us to send one of our contractors, or whether you would prefer to use your own contractor.
> 
> Kind regards,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The landlord's reply does not authorise any contractor, spend, or own-contractor arrangement; it was recorded as unclear.
- Telling the tenant about the switch does not confirm the fan works or what the fault is.
- No visit is booked and no provider has been assigned.

## Remaining work
- Tenant to check the hob switch and report whether the fan works (tenant; review 2026-09-17).
- If the fan still does not work: landlord to choose our contractor or their own (landlord). Only then assign a contractor.
- If it works: record the outcome, tell the landlord, and close without payment as tenant-fixed.

## Missing or unavailable information
- Whether the fan works once the switch is on.
- Landlord's choice of contractor if it does not work.
- The picture attached to event 004 (unavailable).

## Conflicts between sources
- The landlord's reply does not say whether the fan works or whether the fault is the switch. It only gives the switch location, so I did not treat it as a decision or as a fix.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Ticket NBL-017 is at the landlord approval gate. The landlord's reply only gives the switch location, so nothing is authorised. Outstanding: the tenant's check of the switch, and the landlord's choice of route if the fan still does not work.

**2. What is the next action, who is it for, and through which channel?**

Tenant Clara: email asking her to check the right-hand hob switch and report back (MSG-101, ledger A2). Landlord: email on the existing thread saying the switch was passed on, and asking whether they want our contractor or their own if the fan still fails (MSG-102, ledger A3). Internal: hold for tenant reply, review 2026-09-17 (ledger A5).

**3. Does anything need a human decision, and why?**

No, not yet. The next decision belongs to the landlord, and only if the fan still fails after the switch is checked. Nothing on the record is urgent or safety-related, so no escalation.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched on."… | 1 | ❌ failed | Ticket 017 not found on read-back |
| A2 | `send_message` | {"recipient_name":"Clara","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":"017","body… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"existing thread (event 008 email)","ticket_ref":"017",… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `record_landlord_decision` | {"ticket_ref":"NBL-017","decision":"unclear","evidence_quote":"There is a switch to the righthand side of the hob when needs to be switched … | 1 | ✅ verified | Ticket NBL-017 read back after record_landlord_decision |
| A5 | `put_on_hold` | {"ticket_ref":"NBL-017","reason":"Waiting for Tenant","comment":"Tenant asked to check the right-hand hob switch and confirm whether the ext… | 1 | ✅ verified | Ticket NBL-017 read back after put_on_hold |

## Failed or unverified actions
- A1: record_landlord_decision on ref '017' failed (ticket not found). Used list_tickets to find NBL-017 and retried with the correct ref; it verified as A4.
