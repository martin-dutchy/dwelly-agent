# Case 007: Check-Out Works: Lounge Lighting and Ceiling Repair: ANSWER

**Decision:** action_taken · **Severity:** routine

Contractor reported the works complete with an invoice about 40% over the approved quote. I recorded the invoice, held payment, asked the contractor to explain and send photos, told the landlord, and set a follow-up for 2025-10-10. No human decision is needed yet.

## Where the case stands
Works reported done by Clarke (event 031). Invoice 2311 recorded but payment held as it is about 40% over the approved quote. Waiting on the provider for an explanation and photos. The property is void; the ticket is still Paused from event 015. Not closed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Clarke to explain the £277.72 vs £198.37 + VAT difference and send photos and attendance date | Clarke, contractor | email | A3 ✅ |
| 2 | OTHER | Tell the landlord about the overage and that payment is held | Landlord | email | A4 ✅ |
| 3 | WAIT | Follow up on 2025-10-10 for the provider's answer; escalate to accounts P2 if unresolved | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Clarke (contractor) via email, existing thread (event 031 email)** (verified)

> Hi Clarke, thanks for the update on NBL-007-0235 (Flat 8, 168 Alder Lane). Invoice 2311 is £277.72 + VAT, but the approved quote was £198.37 + VAT for two spotlights and one ceiling board. Please explain the difference and send a breakdown of any extra work or materials, plus the photos of the completed work and the date you attended. Payment is on hold until this is cleared, and any extra cost needs the landlord's approval. Regards, Maya

**A4 · send_message → Landlord (landlord) via email, agency landlord record** (verified)

> Good afternoon, Clarke reports the lounge works at Flat 8, 168 Alder Lane are done (two spotlights and the ceiling board). However, his invoice is £277.72 + VAT (£333.26 inc VAT) against the £198.37 + VAT quote you approved. We have held payment and asked him to explain the difference and send photos. We will not pay more than the approved quote without your agreement, and will update you once he replies. Regards, Maya

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Recording the invoice and holding payment do not approve or reject the extra amount.
- The works are not verified as done until photos arrive.
- The ticket is not closed.

## Remaining work
- Provider explanation and photos (Clarke)
- Landlord decision on any extra cost above £198.37 + VAT, if justified
- Release or adjust payment, then final checks and close
- Escalate to accounts P2 if the explanation does not settle it (follow-up 2025-10-10)

## Missing or unavailable information
- Reason for the invoice increase
- Completion photos
- Actual attendance date
- Quote attachment contents not seen

## Conflicts between sources
- The record_invoice check returned no flags ('matches the approval') although the invoice is above the quote. I trusted the figures in the invoice and quote over that check and held payment anyway.
- Check-out report is dated 25 August 2026, after the 2025 case dates. Contractor refers to 'the studio' while the property is Flat 8.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The works are reported done but unverified, as photos are outstanding. Invoice 2311 (£333.26 inc VAT) exceeds the approved £198.37 + VAT quote. Payment is held pending the provider's explanation.

**2. What is the next action, who is it for, and through which channel?**

Email Clarke asking for an explanation, a breakdown and photos (sent). Email the landlord with an update (sent). Follow-up set for 2025-10-10.

**3. Does anything need a human decision, and why?**

Not yet. If Clarke's answer does not settle the overage, escalate to accounts at P2. Any extra spend needs the landlord's approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_invoice` | {"ticket_ref":"NBL-007-0235","issuer":"Clarke (contractor)","amount_gbp":333.26,"who_pays":"agency","source":"Provider email event 031, 2025… | 1 | ✅ verified | Ticket NBL-007-0235 read back after record_invoice |
| A2 | `hold_payment` | {"payee":"Clarke (contractor) - invoice 2311, NBL-007-0235","reason":"Invoice £277.72 + VAT (£333.26 inc VAT) is about 40% above the approve… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `send_message` | {"recipient_name":"Clarke","recipient_role":"contractor","channel":"email","contact":"existing thread (event 031 email)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Landlord","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-007-0235","b… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-007-0235","due_on":"2025-10-10","party":"Clarke","purpose":"Check provider's explanation of invoice 2311 overage and phot… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
