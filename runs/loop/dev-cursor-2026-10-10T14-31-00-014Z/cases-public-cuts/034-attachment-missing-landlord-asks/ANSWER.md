# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The contractor reports the shower mixer was cleaned and greased on 1 June, but the attachments were not received. I told the landlord what is known and that the invoice is awaited, asked the contractor for a readable copy, asked the tenant to confirm the fix, and put the job on hold until 4 June.

## Where the case stands
Job at provider-assigned stage; Meadow Works report a visit and fix on 1 June but the invoice and photos did not come through. Ticket on hold to 4 June awaiting the invoice and tenant confirmation. Landlord has asked about the invoice amount.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Meadow Works to resend the invoice and photos as a PDF or plain text, with the visit time, by 3 June | Meadow Works, contractor | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Ask Ava to confirm the shower works on both hot and cold | Ava Fletcher, tenant | email | A3 ✅ |
| 3 | OTHER | Answer the landlord: the contractor reports attending and fixing the shower, the invoice was not received so no amount can be given, and we will update by 4 June | Kendall, landlord | email | A1 ✅ |
| 4 | WAIT | Hold until 4 June for invoice and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, Meadow Works emailed today (1 June) to say they attended Flat 9 and cleaned and greased the shower mixer, and that hot and cold are both running now. That is their report; we are confirming it with the tenant. They said an invoice and photos were attached, but the attachments did not come through to us, so I can't tell you the amount yet. I've asked them to resend the invoice as a PDF, and I'll send you the figure as soon as I have it. Nothing will be paid until it's checked. You'll hear from us by Wednesday 4 June.

**A2 · send_message → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> Hi, thanks for your update on Flat 9, 9 Willowmere Road. The invoice and photos did not arrive with your email. Please resend them as a PDF or in a plain-text reply, along with the time you attended today. Please also confirm the shower is working on both hot and cold, and let us know if you found any other issues. We'd like these by Tuesday 3 June.

**A3 · send_message → Ava Fletcher (tenant) via email, existing thread (event 006 email)** (verified)

> Hi Ava, Meadow Works tell us they visited today, cleaned and greased the shower mixer, and that hot and cold now both run. Is the shower working properly for you, with water from both sides and a comfortable temperature? If it isn't, or no one came, please reply and we'll sort it with them. We'll check back with you by Wednesday 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The contractor's email does not prove the fix; tenant confirmation is outstanding.
- Nothing has been recorded as an invoice or approved for payment.
- No invoice amount has been stated to anyone.

## Remaining work
- Obtain the readable invoice and photos, then record the invoice and check it against the approval.
- Get the tenant's confirmation of the fix.
- Tell the landlord the amount.
- Record the work result and close.

## Missing or unavailable information
- Invoice amount and photos (attachments not received)
- Tenant confirmation
- Visit time

## Conflicts between sources
- Case hints say the visit is not booked, but the contractor says they attended on 1 June; the visit is not recorded in the system and is unconfirmed by the tenant.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The contractor reports the work is done. The invoice, photos and tenant confirmation are outstanding. The landlord is waiting for the amount.

**2. What is the next action, who is it for, and through which channel?**

Ask Meadow Works by email for the invoice and photos, ask the tenant by email to confirm the fix, and update the landlord by email.

**3. Does anything need a human decision, and why?**

No. This is routine and nothing is above limits or disputed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-034-attachmen… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","reason":"Waiting for Provider","comment":"Awaiting readable invoice, photos and vi… | 1 | ✅ verified | Ticket NBL-034-attachment-missing-landlord-asks read back after put_on_hold |

## Failed or unverified actions
_None._
