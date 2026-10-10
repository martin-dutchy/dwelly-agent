# Case 034: Shower Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The provider reports the shower fixed, but its attachments weren't readable. I told the landlord this without inventing an amount, asked the provider for the invoice again, asked the tenant to confirm the repair, and set a follow-up for 4 June.

## Where the case stands
Provider assigned; Meadow Works report the shower fixed (mixer cleaned and greased) but the invoice and photos are unreadable/unseen. No invoice recorded, tenant confirmation outstanding, landlord has asked about cost.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Tell the landlord what the provider reported and that the invoice amount is not yet known | Kendall, landlord | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask Meadow Works to resend the invoice and photos, or give the total in plain text, and confirm the visit date | Meadow Works, contractor | email | A2 ✅ |
| 3 | CHASE_TENANT | Ask tenant to confirm the shower now works | Ava Fletcher, tenant | email | A3 ✅ |
| 4 | WAIT | Follow up on invoice and tenant confirmation by 4 June | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Kendall (landlord) via email, agency landlord record** (verified)

> Hi Kendall, yes: Meadow Works emailed today to say they attended Flat 9, found a temperature problem with the shower mixer, cleaned and greased it, and that hot and cold are now both running. That is their report; we are confirming it with the tenant. They said photos and an invoice were attached, but nothing came through readable on our side, so I can't yet tell you the amount. I've asked them to resend it and will pass the figure on as soon as we have it, and no later than Wednesday 4 June. Nothing needs paying until then.

**A2 · send_message → Meadow Works (contractor) via email, existing thread (event 010 email)** (verified)

> Hi, thanks for attending Flat 9, 9 Willowmere Road. Your attachments didn't reach us. Please could you resend the invoice as a PDF, plus the photos, or reply with the invoice total, VAT and date in plain text? Please also confirm the date and time of your visit.

**A3 · send_message → Ava Fletcher (tenant) via email, tenant email on file (event 006)** (verified)

> Hi Ava, Meadow Works tell us they visited today and cleaned and greased the shower mixer, and that hot and cold are now both running. Could you let us know whether the cold side now works and the temperature mixes properly? If not, we'll arrange for them to return. We'll check back with you by Wednesday 4 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Messages do not confirm the repair worked, the invoice amount, or who pays
- No invoice recorded, so no payment approval
- Not closed

## Remaining work
- Obtain readable invoice and photos (agency, chasing Meadow Works)
- Tenant confirmation
- Record invoice, check it, tell landlord the amount, then close

## Missing or unavailable information
- Invoice amount, issuer and date; photos; visit date; tenant confirmation

## Conflicts between sources
- Derived hint says the visit is not booked, but the provider says they attended on 1 June; the visit date is unconfirmed and the work was not recorded as a result.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The provider says the work is done. The invoice and photos haven't been seen, the tenant hasn't confirmed, and the landlord is waiting for the cost.

**2. What is the next action, who is it for, and through which channel?**

Email the landlord with the status, and email Meadow Works for a readable invoice and photos. Email the tenant to confirm the fix.

**3. Does anything need a human decision, and why?**

No. This is routine follow-up; a human is needed only if the invoice is flagged (above approval, different payee) or the repair failed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Kendall","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-034-attachmen… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Meadow Works","recipient_role":"contractor","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Ava Fletcher","recipient_role":"tenant","channel":"email","contact":"tenant email on file (event 006)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-034-attachment-missing-landlord-asks","due_on":"2025-06-04","purpose":"Chase Meadow Works for readable invoice and photos… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
