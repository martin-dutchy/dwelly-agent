# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor replied to the quote request with only a thumbs-up emoji, which is not a usable quote. I asked them by email for a written price and availability, kept the job on hold and set a chase for 27 October.

## Where the case stands
Ticket at mp_time, on hold (Waiting for Provider). Landlord approval confirmed, contractor assigned, property void. Contractor replied only with a thumbs-up emoji: no price, no date. Written quote requested; review 2025-10-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask contractor for written price (VAT stated) and earliest availability, since the emoji is not a quote | Contractor | email | A1 ✅ |
| 2 | WAIT | Hold ticket pending quote; chase on 2025-10-27 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Thanks for the thumbs up. Could you confirm in writing the price for the clean at Flat 2, 172 Alder Lane (living space vacuum and light clean, en-suite limescale removal), and whether VAT is included?
> - What is the earliest date you could do the work? The flat is empty.
> 
> Why: An emoji is not a quote; we need a written price and availability before the job can progress.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The emoji does not count as a quote, acceptance or a booked visit.
- No cost is agreed and no visit is booked.
- Does not decide who pays, e.g. any deduction from the tenant's deposit.

## Remaining work
- Receive and record the written quote, then approve it if within landlord approval/limit
- Book the visit with access arrangements (void property, no tenant to notify)
- Record the result, invoice and close
- Chase on 2025-10-27 if no reply

## Missing or unavailable information
- Written quote amount and VAT status
- Contractor availability
- Report is dated inconsistently (appointment 23 June 2026, signed 24 Oct 2025); scope is unaffected
- Attachment-86 was unavailable

## Conflicts between sources
- Checkout report appointment date is 23 June 2026, but it was signed 24 Oct 2025 and compared against a previous report; treated as a date typo with no effect on the cleaning scope.
- Event 002 says approval is confirmed while the quote is still outstanding; the cost is not yet approved.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval is confirmed and a provider is assigned. The property is void, so the ticket was paused. The provider's only reply is a thumbs-up, so the quote and availability are still outstanding.

**2. What is the next action, who is it for, and through which channel?**

Email the contractor on the existing thread (event 009) asking for a written price with VAT and the earliest date. This is done (REQ-101). The job is on hold and a chase is set for 27 October.

**3. Does anything need a human decision, and why?**

No. The case is routine and nothing needs authority yet. A human would only be needed if the quote exceeds the landlord's approval or limit, or the contractor stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["T… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Contractor replied with only a thumbs-up emoji; writ… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |
| A3 | `schedule_follow_up` | {"due_on":"2025-10-27","purpose":"Chase contractor for written quote if none received","ticket_ref":"NBL-004-emoji-provider-reply","party":"… | 1 | ✅ verified | FUP-102 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
