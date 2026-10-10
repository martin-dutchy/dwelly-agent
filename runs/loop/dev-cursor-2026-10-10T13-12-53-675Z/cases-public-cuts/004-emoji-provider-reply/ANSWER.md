# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor answered the quote request with only a thumbs-up emoji. I asked them plainly whether that means yes and whether a quote was sent, and noted the raw text. The job is on hold until 28 Oct. No tenant is messaged as the property is void.

## Where the case stands
Paused, void property, landlord approval confirmed, provider asked for a quote (event 006). Provider replied with only a thumbs-up emoji; no quote on file. Now on hold waiting for provider until 2025-10-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the contractor in plain words whether the emoji means yes and whether a quote was sent; request the quote by 28 Oct | Contractor, provider | email | A1 ✅ |
| 2 | WAIT | Hold waiting for provider quote, review 2025-10-28 | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Your reply was just a thumbs-up emoji. Does that mean you can do the clean, and have you already sent a quote? If so, please resend it as a PDF or plain text.
> - If not yet sent, please send your quote (£ amount and whether VAT is included) for: living space vacuum and light clean, and en-suite limescale removal, per the checkout report, by Tuesday 28 October.
> 
> Why: The emoji-only reply cannot be read as a quote or acceptance; no quote is on file.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The emoji is not a quote, acceptance or booking
- No spend approved and no visit booked
- Landlord approval only covers instructing us, not any amount

## Remaining work
- Receive and record the quote, then send to landlord if over the limit
- Arrange access via keys/caretaker (void property)
- Review on 2025-10-28; if still silent, chase on another channel

## Missing or unavailable information
- Contractor's quote
- Attachment-86 from event 006 was unavailable

## Conflicts between sources
- Checkout report appointment date (23 June 2026) is later than its signature date (24 Oct 2025) and today; scope matches the request so it was not treated as blocking

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Paused on a void property with landlord approval confirmed. The quote request went to the contractor, and their only reply is an emoji. The quote is outstanding.

**2. What is the next action, who is it for, and through which channel?**

A clarification and quote request to the contractor by email on the existing thread (A1). Then a hold with review on 28 Oct (A3).

**3. Does anything need a human decision, and why?**

No. This is routine provider chasing, so I did not escalate.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["Y… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"NBL-004-emoji-provider-reply","note":"Event 009 provider email raw text: \"👍\" only. Not treated as a quote or acceptance. Prope… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Waiting for contractor's quote; their reply was an e… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
_None._
