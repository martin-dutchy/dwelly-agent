# Case 108: Communal Garden and Hedge Maintenance Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord confirmed by phone he is using his own contractor, Riverside Services (Freya), paying directly. I recorded this, noted the record, emailed the landlord asking for the start date and to confirm the figure, set a 10 Nov follow-up and returned the job to auto.

## Where the case stands
Landlord gate resolved as own_contractor (Riverside Services/Freya, landlord pays directly). Waiting on landlord/Freya for confirmed start date; follow-up 2025-11-10.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | WAIT | Wait for Freya's confirmed start date and completion; follow up 10 Nov | Rowan, landlord | internal | A4 ✅ |
| 2 | REQUEST_INFORMATION | Emailed landlord acknowledging own-contractor arrangement, asking for start date, completion notice and confirmation of the ~£20,000 figure | Rowan, landlord | email | A3 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Rowan (landlord) via email, agency landlord record** (verified)

> Hi Rowan, thanks for your call. We've noted that you're arranging the garden weeds and side-path hedge at Flat 26, 46 Copperfield Walk with your own contractor, Riverside Services (Freya), and paying her directly, so we won't send our own contractor. Please could you let us know the confirmed start date once Freya has given it to you, and tell us when the work is finished. We'll check in with you on 10 November. Also, you mentioned about £20,000: could you confirm that figure, as it seems high for this work? Not an issue for us to approve, we just want our record to be right.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording own_contractor does not approve any agency spend or confirm the price
- No visit is booked; the start date is unconfirmed
- The £20,000 is a verbal approximation with no document seen

## Remaining work
- Confirm Freya's start date and completion with landlord (agency, 10 Nov)
- Close without payment once work is confirmed done
- Clarify the 'no man's land' strip ownership if still relevant

## Missing or unavailable information
- Confirmed start date
- Documented quote and exact amount
- Completion confirmation

## Conflicts between sources
- Event 022 names Felix Kendall while the call and thread are with Rowan; treated the call with Rowan as current.
- Derived hint says quote awaiting agency approval; actually the landlord is using their own contractor (event 024).
- Quote amount ~£20,000 is approximate and implausible for the scope; no document seen.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval gate is settled as own contractor (Riverside Services, Freya), landlord paying directly. Outstanding: Freya's start date (around the weekend, unconfirmed), completion, and the verbal ~£20,000 figure.

**2. What is the next action, who is it for, and through which channel?**

Email to Rowan (landlord) asking for the start date and completion news and to confirm the figure; follow-up on 10 Nov.

**3. Does anything need a human decision, and why?**

No. The spend is the landlord's own, so no agency approval is involved. The odd £20,000 figure is queried with the landlord.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-108","decision":"own_contractor","evidence_quote":"Freya's quote came in yesterday, and I'm happy to go ahead and paying … | 1 | ✅ verified | Ticket NBL-108 read back after record_landlord_decision |
| A2 | `add_note` | {"entity":"NBL-108","note":"Landlord using own contractor Riverside Services (Freya), paying directly. Quote stated verbally as \"About 20,0… | 1 | ✅ verified | NOTE-101 found in the add_note log |
| A3 | `send_message` | {"recipient_name":"Rowan","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-108","body":"Hi… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-108","due_on":"2025-11-10","party":"Rowan, landlord","purpose":"Confirm Riverside Services start date/completion and the … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-108"} | 1 | ✅ verified | Ticket NBL-108 read back after resume_auto |

## Failed or unverified actions
_None._
