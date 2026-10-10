# Case 002-quote-approval: ANSWER

**Outcome:** action_taken · **Severity:** urgent

Riverside Works attended, found the toilet needs replacing (rusted screws, risk of damage) and sent a quote. The quote went to the landlord (Quinn) for approval this morning and no reply has arrived. I updated the tenant and told the contractor to wait for written approval.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

The visit has happened and the contractor's quote for a new toilet and cistern has been sent to the landlord (event 017). Landlord approval of the quote is outstanding. The quote amount is unknown because the attachments are unavailable. After approval, the contractor must be told to proceed and the work booked with the tenant.

**2. What is the next action, who is it for, and through which channel?**

Done now: an email status update to the tenant (MSG-101), which also asks whether another toilet is available, and an email to the contractor to hold until approval is confirmed (MSG-102). Next: when the landlord replies, approve the quote within their limit and book the work. If there is no reply, chase the landlord. I did not approve spend because the amount and the landlord's limit are unverified.

**3. Does anything need a human decision, and why?**

No human escalation yet. The approval request is already with the landlord, who holds the decision. A human should chase if the landlord has not replied soon, particularly if the tenant has no other working toilet, as that would raise the urgency.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Noah Turner","recipient_role":"tenant","channel":"email","body":"Dear Noah, thank you for your patience. The engineer fro… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Riverside Works","recipient_role":"contractor","channel":"email","body":"Dear Riverside Works, thank you for your report … | 1 | ✅ verified | MSG-102 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
