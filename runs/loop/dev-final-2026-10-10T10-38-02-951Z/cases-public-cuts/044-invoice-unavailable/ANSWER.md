# Case 044-invoice-unavailable: ANSWER

**Outcome:** action_taken · **Severity:** routine

Landlord approved the handle repair on 9 Feb and Cedar Homes was assigned. On 11 Feb Cedar Homes said the job is complete, but the invoice attachment is unavailable. I asked the contractor to resend the invoice and asked the tenant to confirm the repair. No human decision is needed yet.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

The repair is reported complete by Cedar Homes but not yet confirmed by the tenant. The invoice is missing because the attachment is unavailable. Outstanding: the invoice and amount, tenant confirmation, and a check of the invoice against the landlord's approval, which had no stated spend limit or quote.

**2. What is the next action, who is it for, and through which channel?**

Done: an email to Noah Ellis at Cedar Homes asking for the invoice to be resent with the amount, visit date and work done. Also an email to the tenant asking them to confirm the window works. Next, when the invoice arrives, check it and the tenant's reply, then close the job or pay.

**3. Does anything need a human decision, and why?**

Not at this point. A human is needed only if the invoice amount is unusual or beyond what the landlord approved, or if the tenant says the repair is not fixed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Noah Ellis","recipient_role":"contractor","channel":"email","body":"Hi Noah, thanks for letting us know the window handle… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","body":"Hi, Cedar Homes have told us the window handle at the top of … | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"Flat 21, 129 Juniper Mews","note":"Contractor reports window handle job complete 11 Feb; invoice attachment unavailable, resend r… | 1 | ✅ verified | NOTE-103 found in the add_note log |

## Escalations
_None._

## Failed or unverified actions
_None._
