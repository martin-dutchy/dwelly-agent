# Case 108: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approved his own contractor Riverside Services (Freya) by phone and will pay directly. I recorded the decision, noted the route, emailed the landlord asking for the start date and a check of the very high £20,000 figure, cleared the hold and set a follow-up for 7 Nov.

## Where the case stands
NBL-108 at intake stage. Landlord chose own contractor (Riverside Services, Freya), paying directly. Waiting on Freya to confirm start date with the landlord; follow-up set for 7 Nov.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for the start date from Freya via landlord; chase on 7 Nov and then close without payment once done | Rowan, landlord | internal | A4 ✅ |
| 2 | REQUEST_INFORMATION | Email landlord confirming own-contractor route, asking for the confirmed start date by 7 Nov and to check the £20,000 figure | Rowan, landlord | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Rowan (landlord) via email, agency landlord record** (verified)

> Hi Rowan, thanks for speaking to us today. We've noted that you're using your own contractor, Riverside Services (Freya), for the communal weeds and side hedge at Flat 26, 46 Copperfield Walk, and that you'll pay them directly. We won't send our own contractor. Two quick things: (1) please send us the start date once Freya confirms it, ideally by Friday 7 November, so we can keep our record right; (2) you mentioned about £20,000 on the call, which sounds high for this work, so could you check that figure is right? It doesn't affect us as you're paying directly, but we want our notes to be accurate. We'll check in with you on 7 November.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording own_contractor does not confirm a start date, scope or the price
- The agency has not approved or committed any spend
- Completion is not confirmed

## Remaining work
- Landlord/Freya to confirm start date
- Confirm the £20,000 figure is right
- Confirm completion, then close without payment (owner: agency ops)

## Missing or unavailable information
- Confirmed start date
- Whether £20,000 was heard correctly
- Attachments from event 004 unavailable

## Conflicts between sources
- Landlord names differ across events (Rowan, Grace Nolan, Harper, Felix Kendall, Leo Ashford); treated as the landlord on the record
- Hold comments said waiting on landlord; superseded by his replies on 3 Nov
- Case hints say quote awaiting approval, but the decision is own_contractor

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord is arranging his own contractor (Riverside Services/Freya) and paying directly. Outstanding: confirmed start date, check of the £20,000 figure, completion.

**2. What is the next action, who is it for, and through which channel?**

Email to Rowan (landlord) asking for the start date by 7 Nov and a check of the figure; follow-up scheduled for 7 Nov.

**3. Does anything need a human decision, and why?**

No. The landlord pays directly, so there is no agency spend or approval needed. Nothing is urgent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-108","decision":"own_contractor","evidence_quote":"Freya's quote came in yesterday, and I'm happy to go ahead and paying … | 1 | ✅ verified | Ticket NBL-108 read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-108","note":"Route: landlord's own contractor (Riverside Services, Freya), landlord pays directly; no agency spend or quote a… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Rowan","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-108","body":"Hi… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-108","due_on":"2025-11-07","party":"Rowan, landlord","purpose":"Chase confirmed start date from Freya (Riverside Services… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-108"} | 1 | ✅ verified | Ticket NBL-108 read back after resume_auto |

## Failed or unverified actions
_None._
