# Case 034-attachment-missing-landlord-asks: ANSWER

**Outcome:** action_taken · **Severity:** routine

Meadow Works attended on 1 June and report the shower mixer was cleaned and greased, so hot and cold now run. The invoice and photos did not extract, so the amount is unknown. I told the landlord, asked the contractor to resend with the total in the email body, and asked the tenant to confirm the fix.

## Answers
**1. Where does this case stand right now, and what is outstanding?**

The work is done, per the contractor's email of 1 June. Outstanding: the invoice amount and photos (attachments unreadable), the tenant's confirmation that the shower works, and then the landlord's payment.

**2. What is the next action, who is it for, and through which channel?**

Done now: email to the landlord with a status update and no amount, email to Meadow Works asking for the invoice to be resent, and email to the tenant asking her to confirm the fix. Next, once the invoice arrives, check it and tell the landlord the amount.

**3. Does anything need a human decision, and why?**

Not at this point. If the invoice exceeds the landlord's spend limit or the tenant reports the fault persists, review then.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","body":"Hi Kendall, yes, Meadow Works attended Flat 9, 9 Willowmer… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","questions":["Please resend the invoice and photos for Flat… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","body":"Hi Ava, Meadow Works say they visited today and cleaned… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Escalations
_None._

## Failed or unverified actions
_None._
