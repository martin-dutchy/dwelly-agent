# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor answered the quote request with only a thumbs-up emoji. I asked them by email for a written quote and VAT status, noted the record, and kept the job on hold until 2025-10-27. No human decision is needed.

## Where the case stands
Quote requested from contractor (landlord approval to proceed to provider selection confirmed). Property void, ticket paused/on hold. Contractor replied only with 👍; no quote in hand. Waiting on contractor, review 2025-10-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Asked contractor by email whether a quote was sent/will be sent and the price incl. VAT status, no work until approved | Contractor (provider) | email | A1 ✅ |
| 2 | WAIT | Hold for provider reply, review 2025-10-27 | Contractor | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> Hi, thanks for your reply. We received a thumbs-up but can't tell what it means. Could you confirm in a short written reply: (1) have you already sent a quote, or will you? (2) the price for the cleaning at Flat 2, 172 Alder Lane (living space vacuum and light clean; en-suite limescale removal) and whether VAT is included. A PDF or plain text is fine. Please don't start work until we confirm approval of the quote. Thank you, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The emoji is not a quote, acceptance or confirmation of a date
- No spend approved and no visit booked
- Landlord approval to proceed is not approval of any price

## Remaining work
- Receive written quote, record_quote, send to landlord for approval if above limit/needed
- Review hold on 2025-10-27; if silent, chase on another channel or consider another provider
- Arrange access by keys/caretaker since property is void

## Missing or unavailable information
- Contractor's written quote
- Attachment-86-document on event 006 unavailable

## Conflicts between sources
- Checkout report appointment date 23 June 2026 vs signature 24 Oct 2025 (today 2025-10-24); scope unaffected

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Quote requested from the contractor; only an emoji came back. The written quote is outstanding, then landlord approval of the amount, then access and a visit. The property is void.

**2. What is the next action, who is it for, and through which channel?**

Plain-question email to the contractor asking whether a quote was sent and for the price (sent, A1); hold with review 2025-10-27.

**3. Does anything need a human decision, and why?**

No. This is routine provider follow-up. Escalate only if the contractor stays silent after the chase.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-004-emoji-provider-reply","note":"Event 009 provider reply was only a thumbs-up emoji (raw: \"👍\"); not treated as a quote o… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Waiting for written quote or clarification after emo… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
_None._
