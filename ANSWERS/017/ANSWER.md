# Flat entrance door maintenance request: ANSWER

**Decision:** action_taken · **Severity:** routine

The door job is waiting on the building manager and the landlord. Event 017 was not a clear approval because the landlord wanted scope and building response confirmed first. I asked the landlord for a decision on the quote and on a competent inspection, replied to the tenant's unanswered question, and told the contractor not to schedule anything. Follow-up set for 14 Feb.

## Where the case stands
Intake/landlord gate. Quote NBL-017-Q1 (£186, decorating only) on file but not approved. Waiting on building manager (reply to event 018) and landlord decision. No work or visit booked.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Asked landlord to approve the £186 quote conditionally and to authorise a competent door inspection, reply by 14 Feb | Elian Moss, landlord | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Answered tenant's question on painting, interim advice, access notice, next update by 14 Feb | Iona Vale, tenant | email | A4 ✅ |
| 3 | WAIT | Chase building manager and landlord on 14 Feb | Ravi Dast / Elian Moss | internal | A1 ✅ |

## Messages sent (verbatim)
**A3 · request_landlord_approval → Elian Moss (landlord)** (verified)

> Whether to approve Pale Finch Decorating's quotation NBL-017-Q1 (£186, decorating only) and whether to authorise a competent inspection of the door before or alongside painting. (£186)
> 
> Options: Recommended: authorise a competent door inspection (we will obtain a price first) because the building lists the door as fire-resisting, it was noted closing slowly last month and it catches at the top; hold the painting until the building replies and the inspection is understood; Approve the £186 painting quote only once the building manager confirms no approval or special materials are needed (note painting will not fix the catching); Decline both for now
> 
> Update: Thanks for your email of 11 Feb. The quote is for sanding and repainting only; it excludes door adjustment, hardware and any fire-door check, so it may not solve the catching. The building manager has asked to be consulted before any change; we asked them on 12 Feb about approval/materials and are awaiting their reply. As you asked, nothing is booked and no start date has been requested. The quote is valid to 28 Feb. Any inspection cost would come to you for approval first. We will chase the building on 14 Feb; please reply by then.

**A4 · send_message → Iona Vale (tenant) via email, existing thread (event 015 portal message)** (verified)

> Hi Iona, thanks for your update. Glad the door is latching. Painting only covers the flaking surface and wouldn't fix the catching at the top, so we are checking with the building manager and your landlord whether the door itself needs looking at too. Nothing is booked yet. Any visit will have advance written notice, be after 10:00, and the visitor won't photograph personal items. Until then, please keep pulling the door firmly shut so it latches, and tell us straight away if it stops latching or won't close. We'll update you by 14 February.

**A5 · send_message → Tomas Ebb (contractor) via email, existing thread (event 016 email)** (verified)

> Hi Tomas, thanks for confirming quote NBL-017-Q1 is open to 28 February. It is not yet approved: the landlord and building manager are still to confirm scope. Please don't schedule anything yet; we'll contact you if it is approved. Access notes for then: after 10:00, advance notice to the tenant, no photographs of personal items.

## Escalation
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Ravi Dast / Elian Moss | Chase building reply and landlord decision | 2025-02-14 | A1 ✅ verified |

## What this does not establish
- Nothing is approved or booked; painting would not address the catching or establish fire performance.
- The quote excludes any fire-door inspection; the door's rating and compliance remain unknown.
- No contractor assigned; no spend committed.

## Remaining work
- Building manager reply on approval/materials/door records (Maya Chen to chase 14 Feb)
- Landlord decision on quote and door inspection
- If approved, assign Pale Finch and give tenant written notice; consider a competent door inspector and price

## Missing or unavailable information
- Building manager's response to event 018
- Landlord's clear approval and spend limit
- Door rating, gap measurements, inspection record
- VAT status of quote not stated

## Conflicts between sources
- Event 019 is a note labelled to the landlord but is internal; landlord had no actual reply to event 017. Treated event 017 as not approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Visual inspection done, £186 painting quote on file (valid to 28 Feb), no work booked. Outstanding: building manager's reply, landlord's clear approval, decision on a proper door inspection (fire-resisting door, slow closing, rub at top).

**2. What is the next action, who is it for, and through which channel?**

Approval/decision request to landlord Elian Moss by email, plus tenant update by email and contractor hold message; follow-up 14 Feb to chase the building manager.

**3. Does anything need a human decision, and why?**

Not escalated now. The decision needed is the landlord's (approval and inspection). If the building or landlord stays silent past 14 Feb, or an inspection suggests a fire-door defect, consider escalating to maintenance/compliance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `schedule_follow_up` | {"due_on":"2025-02-14","purpose":"Chase building manager (Ravi Dast) for response on scope/approval of door painting and any door records; c… | 1 | ✅ verified | FUP-101 found in the schedule_follow_up log |
| A2 | `add_note` | {"entity":"14 Lantern Mews flat entrance door job","note":"Route: our contractor (Pale Finch Decorating), not yet approved. Landlord event 0… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `request_landlord_approval` | {"landlord":"Elian Moss","decision_needed":"Whether to approve Pale Finch Decorating's quotation NBL-017-Q1 (£186, decorating only) and whet… | 1 | ✅ verified | APR-103 found in the request_landlord_approval log |
| A4 | `send_message` | {"recipient_name":"Iona Vale","recipient_role":"tenant","channel":"email","contact":"existing thread (event 015 portal message)","body":"Hi … | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Tomas Ebb","recipient_role":"contractor","channel":"email","contact":"existing thread (event 016 email)","body":"Hi Tomas… | 1 | ✅ verified | MSG-105 found in the send_message log |

## Failed or unverified actions
_None._
