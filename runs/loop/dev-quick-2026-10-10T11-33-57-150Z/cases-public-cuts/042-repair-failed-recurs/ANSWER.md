# Case 042: Washing Machine Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The case was closed on 28 February without a work result or evidence, but the tenant reports on 4 March that the washing machine is not heating on 60°C cycles again. I reopened the job, held Lantern Services' GBP 75.11 invoice, and asked the provider for the repair details, a return-visit date, and an explanation of the invoice. I also updated the tenant and landlord; no visit is booked yet.

## Where the case stands
Ticket NBL-042-repair-failed-recurs was closed at event 031 (2024-02-28) after a repair reported by the agency (event 025: heating element wiring, GBP 75 + VAT). No work result, photos or quote were recorded. On 2024-03-04 the tenant reports the fault has recurred (event 032). The ticket is now reopened at stage result. Outstanding: the provider's return visit date, the provider's explanation of the GBP 75.11 invoice, and the landlord's view.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask Lantern Services for the repair details, a confirmed return-visit date in writing, and an explanation of the GBP 75.11 invoice | Lantern Services, contractor | email | A3 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the job is reopened, the contractor is being asked for a return visit, and no date is confirmed yet | Noah Jenkins, tenant | email | A4 ✅ |
| 3 | CHASE_LANDLORD | Tell the landlord the fault has recurred, the job is reopened, and the invoice is on hold | Mercer, landlord | email | A5 ✅ |
| 4 | OTHER | Hold payment to Lantern Services pending the invoice explanation | internal | internal | A2 ✅ |
| 5 | WAIT | Review the provider reply and the visit date on 2024-03-06 | internal | internal | A6 ✅ |

## Messages sent (verbatim)
**A3 · send_message → Lantern Services (contractor) via email, existing thread (event 024 email)** (verified)

> Dear Lantern Services,
> 
> Re: Washing machine, Flat 20, 120 Alder Lane, Cedarford, ZZ9 0ZZ (job NBL-042).
> 
> The tenant reports the machine is again not heating water on 60°C cycles, about five days after the repair reported on 28 February (heating element wiring, £75 + VAT). We have reopened the job.
> 
> Please:
> 1. Confirm the date of the visit that carried out the repair, and what was found and done.
> 2. Propose a date for a return visit to look at the recurring fault. Please confirm the date in writing. We will then confirm it with the tenant.
> 3. Explain your invoice for £75.11 (received 28 February). It does not match the £75 + VAT figure, and payment is on hold until this is resolved.
> 
> Thank you.

**A4 · send_message → Noah Jenkins (tenant) via email, existing thread (event 032 email)** (verified)

> Dear Noah,
> 
> Thank you for letting us know, and I'm sorry the washing machine is not heating properly again.
> 
> I have reopened the job and sent the details to our contractor, Lantern Services, asking them to arrange a return visit. We have not yet confirmed a date. As soon as the contractor confirms one, we will let you know. We are also letting your landlord know.
> 
> Please keep using the machine on a cooler cycle for now, and let us know if anything else changes.
> 
> Kind regards

**A5 · send_message → Mercer (landlord) via email, existing thread (event 008 email)** (verified)

> Dear Mercer,
> 
> Re: washing machine, Flat 20, 120 Alder Lane, Cedarford, ZZ9 0ZZ.
> 
> The tenant reports the machine is again not heating water on 60°C cycles, about five days after the repair reported on 28 February (£75 + VAT). We have reopened the job and asked Lantern Services for a return visit and an explanation of their £75.11 invoice. Their payment is on hold for now.
> 
> We will confirm the visit date when the contractor does. Please tell us if you have any questions.
> 
> Kind regards

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Reopening the job does not establish the cause of the recurring fault or whether the earlier repair was done properly.
- No return visit is booked: the provider has not confirmed a date.
- The landlord has not approved any new spend. Their only recorded approval (event 008, 'Yes please arrange an engineer') covers the first visit. The GBP 75 + VAT repair was reported by the agency, not approved by the landlord in their own words.
- The GBP 75.11 invoice is not reconciled and is not approved for payment.

## Remaining work
- Lantern Services: give repair details, confirm a return-visit date, and explain the GBP 75.11 invoice (follow-up FUP-105, 2024-03-06).
- Once the visit is confirmed by the provider, confirm it with the tenant and book it.
- After the revisit, record the work result. Any further cost goes to the landlord for approval. Do not close the job until the fault is fixed and the invoice is resolved.

## Missing or unavailable information
- The date of the first visit. The history gives 23/02/2024 15:25 (event 017), but the tenant and contractor discussed Tuesday 1pm (event 016). No work result was recorded.
- The repair evidence, photos and quote for the GBP 75 + VAT repair. The attachments are unavailable.
- The landlord's own approval of the GBP 75 + VAT spend. No spend limit is on file for the property.

## Conflicts between sources
- Ticket reference: the case ID is 042 and the job reference is NBL-042, but the system ticket is NBL-042-repair-failed-recurs. I used the system ticket.
- Visit date: event 017 records 23/02/2024 15:25, but event 016 says the visit was moved to Tuesday 1pm and no work result was ever recorded. I trusted the system record and flagged it for the provider to confirm.
- Invoice: event 024 shows GBP 75.11 due July 2026. The repair email (event 025) quotes GBP 75 + VAT (about GBP 90). These do not match, so I held the payment.
- Closure: event 031 closed the job without a work result or quote, although the landlord had not approved the GBP 75 + VAT spend in their own words. I reopened it.

## Answers to the case questions
**1. Where does the case stand right now, and what is outstanding?**

It was wrongly closed on 28 February with no work result, photos or quote. It is now reopened at stage result because the fault has recurred. Outstanding: a provider return-visit date (none confirmed), the provider's explanation of the GBP 75.11 invoice (held), and landlord confirmation of spend.

**2. What is the next action, who is it for, and through which channel?**

Email Lantern Services for repair details, a confirmed return-visit date and invoice explanation (A3). Email the tenant Noah Jenkins to say the job is reopened and no date is confirmed yet (A4). Email the landlord Mercer about the recurrence and the invoice hold (A5). Follow up on 2024-03-06 (A6).

**3. Does anything need a human decision, and why?**

Not yet. The routine steps are in place. A human decision will be needed only if the provider cannot fix the fault or if the landlord must approve further spend. I have not escalated because the provider and landlord have not yet replied and the fault is not a safety issue.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-042-repair-failed-recurs","stage":"result","note":"Reopened: tenant reports 2024-03-04 (event 032) the washing machine is not he… | 1 | ✅ verified | Ticket NBL-042-repair-failed-recurs read back at stage result |
| A2 | `hold_payment` | {"payee":"Lantern Services","reason":"Invoice for GBP 75.11 (event 024, 2024-02-28) does not match the GBP 75 + VAT repair reported in event… | 1 | ✅ verified | HOLD-101 found in the hold_payment log |
| A3 | `send_message` | {"recipient_name":"Lantern Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 024 email)","ticket_r… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Noah Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 032 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Mercer","recipient_role":"landlord","channel":"email","contact":"existing thread (event 008 email)","ticket_ref":"NBL-042… | 1 | ✅ verified | MSG-104 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-042-repair-failed-recurs","due_on":"2024-03-06","party":"Lantern Services","purpose":"Check Lantern Services has replied … | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
