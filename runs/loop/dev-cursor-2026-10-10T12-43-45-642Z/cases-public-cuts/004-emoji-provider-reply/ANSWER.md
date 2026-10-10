# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The property is void and the cleaning quote was requested from the contractor. The contractor replied with only a thumbs-up emoji, which is not usable. I asked in plain terms for a written quote and kept the job on hold with a review date of 2025-10-27.

## Where the case stands
Paused/on hold. The quote was requested from the contractor, whose only reply was a thumbs-up emoji. We are waiting for a written quote. Review date 2025-10-27.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the contractor by email to confirm in writing that they will quote, and to send the price with VAT status. | Contractor (provider) | email | A1 ✅ |
| 2 | WAIT | Hold waiting for the provider's quote, review 2025-10-27. | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (contractor) via email, existing thread (event 009 email)** (verified)

> - Your reply was a thumbs-up only, so we can't tell what it means. Can you confirm in writing whether you can quote for the cleaning at Flat 2, 172 Alder Lane (living space vacuum and light clean; en-suite limescale removal)?
> - If yes, please send your price, stating whether VAT is included, as a PDF or plain-text email.
> - The checkout report is attached to our earlier email; if it didn't open for you, tell us and we'll resend it.
> 
> Why: The only reply was an emoji, which is not a usable quote or confirmation.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The emoji does not count as a quote, acceptance or a date.
- No contractor spend has been approved.
- Nothing was sent to a tenant because the property is void.

## Remaining work
- Provider sends a written quote, which we record and send to the landlord for approval.
- Review on 2025-10-27: chase on another channel (phone) if there is no reply.

## Missing or unavailable information
- Written quote from the contractor.
- Attachment-86 on event 006 was unavailable and has not been seen.

## Conflicts between sources
- The checkout report is dated 23 June 2026 but was signed 24 Oct 2025, which is today's date. The cleaning scope matches the request, so I treated it as a date error and noted it.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval is confirmed and a provider is assigned. The property is void and the job is paused and on hold awaiting a quote. The provider's only reply was an emoji, so a written quote is outstanding.

**2. What is the next action, who is it for, and through which channel?**

Ask the contractor by email, on the existing thread, to confirm in writing and send a quote. This is done (A1). Review on 2025-10-27 (A4).

**3. Does anything need a human decision, and why?**

No. This is routine provider follow-up, so no escalation is needed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 email)","questions":["Y… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"ticket","note":"Provider replied with a thumbs-up emoji only (event 009): not a quote or confirmed acceptance. Asked for a writte… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-004","reason":"Waiting for Provider","comment":"Waiting for written quote from the contractor; reply was an emoji only.",… | 1 | ❌ failed | Ticket NBL-004 not found on read-back |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-004-emoji-provider-reply","reason":"Waiting for Provider","comment":"Waiting for written quote from the contractor; reply… | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after put_on_hold |

## Failed or unverified actions
- A3: The ticket ref was wrong (NBL-004). I found the correct ref with list_tickets and retried as A4, which verified.
