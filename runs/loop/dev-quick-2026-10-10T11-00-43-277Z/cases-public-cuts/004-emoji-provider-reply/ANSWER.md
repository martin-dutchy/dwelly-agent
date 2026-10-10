# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor's only reply was a thumbs-up emoji, which is not a quote or acceptance. I asked them in writing for acceptance, a price including VAT and an earliest date, put the ticket on hold until 2025-10-27, and noted a date conflict in the checkout report. No escalation is needed: this is a routine cleaning quote on a void property, and no spend is approved.

## Where the case stands
Checkout clean quote for Flat 2, 172 Alder Lane (NBL-004). Landlord approval to proceed is recorded (event 002). The property is void (tenanted: false), so there is no tenant to contact. The contractor was emailed the scope (event 006) and replied only with a thumbs-up emoji (event 009), which is not a quote or acceptance. The ticket is on hold, waiting for the contractor, with a review date of 2025-10-27. No quote is recorded and no spend is approved.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Asked the contractor in writing to confirm they can do the vacuum, light clean and en-suite limescale work, give a price including VAT, and give their earliest date. Told them not to book a visit until access is confirmed. | Maintenance contractor (name not on file), existing email thread (event 009) | email | A1 ✅ |
| 2 | WAIT | Hold the ticket as Waiting for Provider, review on 2025-10-27 and chase if no written reply. | internal | internal | A2 ✅ |
| 3 | OTHER | Recorded the report date conflict on the ticket so the assessor can confirm the inspection date before any booking. | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Maintenance contractor (name not on file) (contractor) via email, existing thread (event 009 email)** (verified)

> Hello,
> 
> Thank you for your reply. We are not able to tell from a thumbs-up emoji whether you are able to take this on, so could you please reply in writing to confirm the following?
> 
> Property: Flat 2, 172 Alder Lane, Bellmere, ZZ3 1ZZ (the property is currently empty)
> 
> Work requested, as per the attached checkout report:
> Living space: 1. Vacuum; 2. Light clean
> En-suite: 1. Limescale removal
> 
> Please send us:
> - Whether you can carry out this work
> - Your price for the work, and whether it includes VAT
> - The earliest date you could attend
> 
> Please do not book any visit until we confirm access with you.
> 
> Thank you,
> Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The emoji reply does not confirm the contractor accepts the work, the price or a date.
- Sending this message does not approve any spend or instruct the contractor to attend.
- The checkout report's current-inspection date (23 June 2026) is not verified and does not establish the work is needed on that date.
- The landlord has not been asked about the cost; the quote is not yet received.

## Remaining work
- Contractor to reply in writing with acceptance, price incl. VAT and earliest date (owner: contractor; review 2025-10-27).
- Record the quote, then check it against the landlord's approval before instructing work (owner: agency).
- Confirm the inspection date discrepancy with the assessor (owner: agency).
- Return the ticket to auto mode once the contractor has replied.

## Missing or unavailable information
- Contractor's name and written confirmation of acceptance, price and date.
- Correct date of the checkout inspection (report says 23 June 2026, which is after the case date).

## Conflicts between sources
- Checkout report says the current inspection and appointment date were 23 June 2026, but the case is dated 23-24 October 2025 and the report was signed 24 October 2025. I trusted the case and system dates and flagged the report date for the assessor to confirm.
- Event 003 says a provider was assigned, but no contractor name is on file and the contractor's reply was unclear. I did not treat the provider as confirmed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord has approved proceeding (event 002). The contractor was sent the scope (event 006) and replied only with an emoji (event 009), so there is no quote and no acceptance. The property is void, so there is no tenant to contact. Outstanding: a written quote and acceptance from the contractor, and confirmation of the inspection date.

**2. What is the next action, who is it for, and through which channel?**

Email the contractor on the existing thread (event 009) asking for written acceptance, a price including VAT and the earliest date. This was sent (MSG-101). The ticket is held until 2025-10-27 for review.

**3. Does anything need a human decision, and why?**

No. The emoji is a clarification request, not a decision. Any quote will go to the landlord for approval only if it is above the approved limit or unclear, once received.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Maintenance contractor (name not on file)","recipient_role":"contractor","channel":"email","contact":"existing thread (ev… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Contractor reply at 2025-10-24 01:48 was an emoji on… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |
| A3 | `add_note` | {"entity":"NBL-004-emoji-provider-reply","note":"Data conflict: checkout report (attachment-01) lists the current inspection as 23 June 2026… | 1 | ✅ verified | NOTE-102 found in the add_note log |

## Failed or unverified actions
_None._
