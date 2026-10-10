# Kitchen glazing maintenance request: ANSWER

**Decision:** action_taken · **Severity:** routine

An invoice for one pane arrived on 10 Sept with no amount and no recorded visit or work result. I recorded the landlord's conditional £180 approval, asked the contractor for the total, the date fitted and photos, asked the tenant whether the work was done, updated the landlord, and put the job on hold until 12 Sept. Nothing is closed or paid.

## Where the case stands
Approved up to £180 total (conditional). Glass was ordered and delayed, and no visit was recorded. An amount-less invoice has arrived. On hold, waiting for the provider (and the tenant's confirmation); review 2025-09-12.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the contractor for the invoice total, the date fitted and photos | Sella Vane, contractor | email | A3 ✅ |
| 2 | CHASE_TENANT | Ask the tenant to confirm whether the glass was fitted and whether the problem is resolved | Elowen Marr, tenant | email | A4 ✅ |
| 3 | WAIT | Hold for the provider's reply; review 12 Sept | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Sella Vane (contractor) via email, existing thread (event 018 email)** (verified)

> Hello Sella, we have invoice NBL-013-INV-09 dated 10 September for the kitchen glazing at 8 Brackenmere Walk, but the amount is blank and we have no record of a visit. Please reply with: (1) the invoice total including VAT, typed in your email, and a corrected PDF; (2) the date you fitted the pane and who let you in; (3) photos of the finished work. The approved figure is £180 in total including VAT, so please let us know before charging anything above that. We can't process payment until we have these. Thank you.

**A4 · send_message → Elowen Marr (tenant) via email, existing thread (event 014 email)** (verified)

> Hello Elowen, we've received an invoice from the glazing contractor saying the kitchen pane has been replaced, but we have no record of a visit. Has the new glass been fitted? If so, roughly what date, and is the misting and water around the frame gone? If not, please tell us and we'll chase the contractor for a date, which we'll confirm with you before anyone attends. Please also let us know if the kitchen is still very cold or you see any damp or mould. We'll update you by 12 September.

**A5 · send_message → Orren Vale (landlord) via email, agency landlord record** (verified)

> Hello Orren, an update on the kitchen glazing at 8 Brackenmere Walk. We've recorded your 11 August reply as approval up to £180 in total including VAT (the quote was £150 + VAT). Clearfirth has now sent an invoice for supplying and fitting one pane, but the amount is blank and we have no visit report. We've asked them for the total, the date fitted and photos, and are checking with the tenant that the work is done. Nothing will be paid until it matches the £180 approval; anything above comes back to you first. We'll update you by 12 September.

## Escalations
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Clearfirth / tenant | Review reply on invoice amount, visit date and tenant confirmation | 2025-09-12 | A2 ✅ verified |

## What this does not establish
- The invoice does not show the work was done or what it cost.
- The conditional approval does not cover anything above £180 total.
- The glass replacement does not address the wider cold or damp concern, which has had no site assessment.

## Remaining work
- Get the invoice total, date and photos, then record the invoice and check it against £180.
- Get the tenant's confirmation.
- Confirm the landlord is told and then close.
- Check the damp and cold concern after the fix.

## Missing or unavailable information
- Invoice amount
- Visit date
- Photos
- Tenant confirmation

## Conflicts between sources
- Event 011 said £150 + VAT while event 012 said £180 total. They are consistent (£150 + VAT = £180).
- Event 012 recorded the quote as approved with no landlord reply to event 011. I relied on the landlord's event 010 conditional reply.
- Event 022 moved the case to post-visit documents with no visit on record. I treat the work as unconfirmed.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Landlord approval is conditional at £180 total including VAT. The contractor has sent an invoice with no amount and there is no visit date, report or photos. Outstanding: the invoice total, the date fitted, photos, tenant confirmation that it is fixed, and payment and closure.

**2. What is the next action, for whom and by which channel?**

Email to Sella Vane (Clearfirth) asking for the amount, date attended and photos. Email to the tenant asking whether the work was done. Email update to the landlord.

**3. Does anything need a human decision?**

No. This is routine chasing. It escalates to accounts only if the invoice exceeds £180 or the provider's explanation does not settle it.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-013","decision":"conditional","cap_gbp":180,"conditions":"Approved only if £180 is the total value of the quote (£150 + V… | 1 | ✅ verified | Ticket NBL-013 read back after record_landlord_decision |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-013","reason":"Waiting for Provider","comment":"Invoice NBL-013-INV-09 shows no amount and no visit/attendance is recorde… | 1 | ✅ verified | Ticket NBL-013 read back after put_on_hold |
| A3 | `send_message` | {"recipient_name":"Sella Vane","recipient_role":"contractor","channel":"email","contact":"existing thread (event 018 email)","ticket_ref":"N… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Elowen Marr","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Orren Vale","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-013","body… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
