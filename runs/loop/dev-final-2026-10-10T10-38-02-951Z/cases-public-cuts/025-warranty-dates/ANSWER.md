# Case 025-warranty-dates: ANSWER

**Outcome:** action_taken · **Severity:** routine

Harbour Services is booked to inspect the oven on 22 May at 2:30pm, and has said the oven is out of warranty. I told the landlord, tenant and contractor. No chargeable work will go ahead without landlord approval of a quote. No human decision is needed yet.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

Landlord approval to proceed was confirmed and Harbour Services is assigned. The visit is agreed with the tenant for 22 May at 2:30pm. Harbour says the oven is out of warranty, so the landlord's request for a free warranty repair no longer applies. Outstanding: the inspection, a quote if needed, landlord approval of any cost, and clarification of the install date and installer.

**2. What is the next action, who is it for, and through which channel?**

Emails sent to the landlord (warranty outcome, quote-approval process, installer query), the tenant (visit confirmation) and the contractor (confirm the date, send a quote and do not proceed without approval, confirm the install date). Next, wait for the inspection and any quote.

**3. Does anything need a human decision, and why?**

Not at this point. If the quote is above the landlord's limit, or the landlord disputes the warranty position, the quote needs landlord approval. A human is only needed if the landlord does not reply or the install-date conflict affects a warranty claim.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","body":"Hi Felix, an update on the oven at Flat 2, 176 Lantern Quay.… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","body":"Dear Leo, thanks for speaking to Harbour Services. We un… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Harbour Services","recipient_role":"contractor","channel":"email","body":"Hi Clara, thanks for confirming the oven is out… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
