# Move-out maintenance request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord declined the agency quote and used her own contractor, then said the work is complete without evidence. I recorded the own-contractor decision, noted the record and set a 22 Sep chase. No human decision is needed yet.

## Where the case stands
Landlord used her own contractor and says work is complete (unevidenced). Property vacant. Agency's cost/responsibility question (event 023) unanswered. Follow-up set 22 Sep. Ticket not closed.

## Next action
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for landlord's reply to the 18 Sep cost/responsibility email; chase on SMS/phone on 22 Sep, then close without payment once confirmed | Elowen Quill, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
_None._

## Escalation
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Elowen Quill, landlord | Chase for costs, contractor, completion date | 2025-09-22 | A3 ✅ verified |

## What this does not establish
- Landlord's statement does not evidence the work was done, when, or by whom
- Recording own-contractor route does not decide any tenancy-account deduction
- Nothing approves the Pineglass £564.48 quote

## Remaining work
- Property Manager: get itemised costs, contractor name, completion date/photos from landlord
- Property Manager: decide on any former-tenant charge
- Close ticket without payment after confirmation

## Missing or unavailable information
- Completion date, contractor name, photos or invoice
- Landlord's view on former tenant responsibility

## Conflicts between sources
- System marked request completed (event 022) on landlord's bare statement while ticket stage shows init; treated completion as unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord arranged her own contractor and says work is done (event 021, no evidence). System marked completed but ticket stage reads init. Itemised costs and responsibility answer outstanding.

**2. What is the next action, who is it for, and through which channel?**

Wait, then chase the landlord (Elowen Quill) by SMS/phone on 22 Sep for the breakdown, contractor name and date; follow-up FUP-102. No duplicate email today as one was sent at 08:46.

**3. Does anything need a human decision, and why?**

Not now. A human (Property Manager) will later decide any former-tenant deduction, which is a tenancy-account/deposit matter.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-028","decision":"own_contractor","evidence_quote":"Declined the agency provider's quote and said she would arrange her ow… | 1 | ✅ verified | Ticket NBL-028 read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-028","note":"Route: landlord's own contractor (event 017); Pineglass stood down (event 020). Landlord stated \"The work has b… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-028","due_on":"2025-09-22","party":"Elowen Quill, landlord","purpose":"Chase on a second channel (SMS/phone) for the cost… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
