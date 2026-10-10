# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor answered the quote request with just a thumbs-up emoji, which is not a usable quote. I replied on the thread asking for a written quote and availability, kept the job on hold and set a chase for 27 Oct. No human decision needed yet.

## Where the case stands
Ticket at mp_time, on hold waiting for provider. Landlord approval confirmed earlier. Provider's only reply is a thumbs-up emoji: no quote, price or date. Property is void.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked contractor for a written quote (VAT status) and availability; told them not to start until confirmed | Contractor | email | A1 ✅ |
| 2 | WAIT | Hold until 2025-10-27 and chase if no quote arrives | Contractor | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> Hi, thanks for your reply. We received a thumbs-up but need a written quote before we can go ahead. Could you please send the price (say whether it includes VAT) for: living space – vacuum and light clean; en-suite – limescale removal, at Flat 2, 172 Alder Lane, Bellmere, ZZ3 1ZZ, as per the checkout report. Please also let us know your earliest availability; the flat is empty. Please don't start work until we confirm. Thank you, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The emoji is not a quote, acceptance of price, or a booked visit
- No spend approved and no visit booked
- Nothing here confirms scope or who pays

## Remaining work
- Contractor to send written quote
- Agency to record the quote and approve it within landlord approval/spend limit, then book a visit (agency key or access, no tenant)
- Chase on 2025-10-27 if silent

## Missing or unavailable information
- Quote amount and VAT status
- Contractor availability
- Spend limit not shown on property record

## Conflicts between sources
- Checkout report dates (appointment 23 June 2026, signed 24 Oct 2025) are inconsistent with the case dates; the report content is only used to confirm the scope. The report also lists a failed plug and flaking paint, which are outside this cleaning quote.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote requested from the contractor, landlord approval already confirmed, property void. The contractor replied only with an emoji, so the quote is still outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email to the contractor on the existing thread asking for a written quote and availability (sent, MSG-101); hold and chase set for 27 Oct.

**3. Does anything need a human decision, and why?**

No. It is routine, and nothing needs authority yet. Escalate only if the quote exceeds the approval or the contractor stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Provider replied only with a thumbs-up emoji; no pri… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-004-emoji-provider-reply","due_on":"2025-10-27","party":"Contractor","purpose":"Chase written cleaning quote if not recei… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
