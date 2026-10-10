# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The landlord approved the repair on 9 Feb and Cedar Homes was assigned. On 11 Feb Cedar Homes said the work was complete, but the invoice did not arrive. I asked the contractor to resend it, asked the tenant to confirm the fix, noted the record conflicts and put the ticket on hold until 14 Feb.

## Where the case stands
Ticket at mp_time stage, on hold until 2025-02-14. Cedar Homes reports the job complete but the invoice attachment did not arrive. Tenant confirmation and landlord update are outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as a PDF with the total including VAT, and to confirm the visit date | Noah Ellis, contractor | email | A1 ✅ |
| 2 | CHASE_TENANT | Ask the tenant to confirm the handle is fixed and the window works | Harriet, tenant | email | A2 ✅ |
| 3 | WAIT | Hold until 2025-02-14 for the invoice and tenant confirmation | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> Hi Noah, thanks for letting us know the window handle job at Flat 21, 129 Juniper Mews is complete. The invoice didn't come through on our side. Please resend it as a PDF, made out to the agency, showing the total including VAT and the work done (handle fitted to the window at the top of the stairs). Please also confirm the date of the visit. Thanks, Grace

**A2 · send_message → Harriet (tenant) (tenant) via email, existing thread (event 007 email)** (verified)

> Hi Harriet, Cedar Homes have told us the window handle at the top of your stairs has been fixed. Could you let us know whether the handle is on and the window now opens and closes properly? If anything still isn't right, tell us and we'll get it sorted. Thanks, Grace

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Contractor's email does not prove the work is done: tenant confirmation is still needed.
- No invoice has been recorded, so the amount, who pays and the landlord's spend limit are unchecked.
- The ticket is not closed and no payment is approved.

## Remaining work
- Receive and record the invoice, then check it against the landlord's approval and the assigned contractor (agency)
- Get the tenant's confirmation (agency)
- Tell the landlord the outcome, then close the ticket (agency)
- Resolve the tenant name and phone discrepancy (agency)

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Tenant confirmation
- Landlord spend limit (property record is empty)

## Conflicts between sources
- Tenant is addressed as Harriet in the emails but named Nora Quinn in the contractor messages.
- The contractor was given two phone numbers: 07700 900307 and 07700 900251.
- The contractor email cites ticket ref NBL-044-1849 but the ticket list shows NBL-044-invoice-unavailable. I used the ticket list ref.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The repair was approved by the landlord and the contractor reports it complete. The invoice is missing, the tenant has not confirmed, the landlord has not been told the outcome, and the ticket is not closed.

**2. What is the next action, who is it for, and through which channel?**

Email Cedar Homes (Noah Ellis) to resend the invoice, and email the tenant to confirm the fix. Both are sent.

**3. Does anything need a human decision, and why?**

No. This is routine chasing. A human would only be needed if the invoice is flagged against the approval or the contractor stays silent.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","t… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Harriet (tenant)","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","ticket_ref":… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `add_note` | {"entity":"NBL-044-invoice-unavailable","note":"Conflicts: tenant greeted as Harriet (events 005/007) but contractor notified as Nora Quinn;… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-044-invoice-unavailable","reason":"Waiting for Provider","comment":"Waiting for Cedar Homes to resend invoice (attachment… | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after put_on_hold |

## Failed or unverified actions
_None._
