---
id: closure
title: Completing and closing a job
tags: [closure]
when_to_use: The work is reported done or fixed, the tenant fixed it themselves, the provider says no invoice is needed, the landlord paid directly, or the job is ready for final checks.
red_flags:
  - The job was closed without a completed work result, the invoice filed or skipped with a reason, the tenant's confirmation (or why not needed), or the landlord told.
  - The job was closed on hearsay that the work was done.
  - Keys lent for the job were not confirmed back, or a follow-up the job produced has no date.
  - A recurrence or poor workmanship was opened as a new chargeable job instead of a return visit.
---

## Procedure
1. Before `close_ticket`, every item must be true: a completed work result; the invoice filed (or skipped with a reason); the tenant's confirmation (or why it is not needed); the landlord told; lent keys back (`confirm_keys_returned`); any follow-up the job produced has a date. If something is missing, ask for it or schedule it; do not close around a gap.
2. Modes: final_checks for the normal close (work done, invoice filed or skipped with a reason); without_payment when the landlord used their own contractor, a warranty covered it, the tenant fixed it, or there is no charge.
3. `tenant_confirmation` says how the tenant confirmed it. `landlord_informed` is the ledger id of your message to the landlord, `history: <quote showing they already know>`, or `not_applicable: <reason>`. Tell whoever does not know yet before closing.
4. The tenant fixed it themselves: `record_work_result`, tell the landlord and the provider (who may be mid-booking), then close without payment. If they swapped in their own appliance, also ask the landlord what to do with the landlord's appliance (inspect, repair, dispose) and whether the tenant's may stay connected.
5. Part of the fault is fixed or withdrawn: reduce the scope and tell the landlord and the provider.
6. The tenant says it is done: record it and move to invoice and final checks. The provider says "done, no invoice needed": confirm with the tenant, then close without payment.
7. The tenant says it is done badly or has come back: reopen with the same provider as a return visit under their workmanship guarantee at no extra charge, and tell the landlord. Do not close, and do not open a new chargeable job.
8. Earlier mistakes in the record (a job closed without evidence, a wrong update sent): fix them yourself. Correct the record with `add_note` and tell the affected party plainly.
9. A void (NOT TENANTED) property has no tenant to confirm or message: say so in `tenant_confirmation`.

## Required actions
- `record_work_result`: the outcome and its evidence.
- `attach_document` or `skip_document`: the invoice, photos or certificate, or the reason none is filed.
- `send_message`: tell the landlord (and the tenant or provider) the outcome.
- `confirm_keys_returned`: when keys were lent.
- `close_ticket`: only when every closing check is met.

## Red flags
- Completion reported by someone who was not there.
- No photos or invoice, or an invoice with no visit recorded.
- The landlord asked for an update after the job was finished: they were never told.
- The tenant reports the fault again after the visit.

## Escalate when
- The work is disputed between tenant, landlord and provider and asking has not settled it: P3, maintenance.
- A closed job turns out to have left a safety risk: reopen it and treat it as an emergency.
