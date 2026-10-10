# Case 004: Checkout Clean: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider answered the quote request with only a 👍. I asked them to say whether a quote was sent and to send an itemised, readable one by 28 Oct. I told Amelia, added a note, set a follow-up and returned the job to auto mode.

## Where the case stands
Landlord approval confirmed and provider assigned; property void. Quote requested from the provider (event 006). The provider's only reply is a 👍 (event 009), so there is no readable quote. We are waiting on the provider; follow-up set for 2025-10-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask provider whether 👍 means a quote was already sent or just acknowledgement, and to send a readable itemised quote by 28 Oct | Contractor, assigned provider | email | A1 ✅ |
| 2 | WAIT | Follow up with provider on 28 Oct, using another channel if still silent | Contractor | internal | A3 ✅ |
| 3 | OTHER | Tell Amelia (raised the work) the status and ask about separate repair jobs for the pop-up plug and flaking paint | Amelia Mercer, internal | email | A4 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Contractor (assigned provider) (contractor) via email, existing thread (event 009 email)** (verified)

> - Your reply was a 👍 only. Does that mean you have already sent a quote, or that you have received our request and will quote? If a quote is already sent, please resend it as a PDF or plain text.
> - Please quote separately for: living space vacuum, living space light clean (incl. windowsill), en-suite limescale removal (shower area, facing and tap). Please state whether VAT is included, and reply by 2025-10-28.
> 
> Why: Emoji-only reply is unreadable as a quote; the attachment-86-document on our earlier email was unavailable, so we have no figure. The property is empty, so access is by agency keys, to be arranged once a quote is approved.

**A4 · send_message → Amelia Mercer (internal) via email, agency internal** (verified)

> Hi Amelia, the contractor replied to your checkout clean quote request with just a 👍. We have asked them to confirm whether a quote was sent and to resend it readable, by 28 Oct. The job stays on hold waiting for the provider. Note the checkout report also lists a failed en-suite pop-up plug and flaking paint, which are not in this cleaning scope. Do you want separate repair jobs for those?

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The 👍 does not establish that a quote exists, or its amount, or that the provider accepted the job.
- Nothing is approved or booked: no quote has been recorded, no visit set, and no spend committed.

## Remaining work
- Provider to clarify and send a readable quote (owner: provider, by 28 Oct)
- Record the quote and send it to the landlord for approval if it needs it
- Arrange access with agency keys after approval
- Decide on separate repair jobs for the pop-up plug and flaking paint (Amelia)

## Missing or unavailable information
- Readable quote from provider
- Attachment-86-document from event 006 was unavailable

## Conflicts between sources
- Checkout report dates: appointment 23 June 2026 and signature 24 Oct 2025 11:01, which is after the case time and inconsistent with each other. Dates not relied on.
- Event 006 lists attachment-86-document as unavailable, while the checkout report is attached. Only the checkout report has been seen.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord has approved and a provider is assigned. The property is empty, so the job was paused. The quote request is out, and the provider's 👍 gives no quote or figure. The job is waiting on a readable quote.

**2. What is the next action, who is it for, and through which channel?**

Clarification request to the provider by email on the existing thread, reply wanted by 28 Oct. Amelia has also been updated internally.

**3. Does anything need a human decision, and why?**

No. Asking the provider is routine. Amelia may decide whether to raise repair jobs for the pop-up plug and flaking paint.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Contractor (assigned provider)","recipient_role":"contractor","channel":"email","contact":"existing thread (event 009 ema… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `add_note` | {"entity":"NBL-004-emoji-provider-reply","note":"Provider replied 👍 only (event 009), raw text kept. No quote seen. Event 006 had 'attachme… | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-004-emoji-provider-reply","due_on":"2025-10-28","party":"Contractor","purpose":"Check provider has clarified 👍 and sent … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `send_message` | {"recipient_name":"Amelia Mercer","recipient_role":"internal","channel":"email","contact":"agency internal","ticket_ref":"NBL-004-emoji-prov… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-004-emoji-provider-reply"} | 1 | ✅ verified | Ticket NBL-004-emoji-provider-reply read back after resume_auto |

## Failed or unverified actions
_None._
