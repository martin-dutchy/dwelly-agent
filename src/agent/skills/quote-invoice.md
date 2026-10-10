---
id: quote-invoice
title: Quotes, invoices and second quotes
tags: [quote_invoice]
when_to_use: A contractor sends a quote or an invoice, a quote must go to the landlord, an invoice must be checked against the approval, or the landlord wants a second quote.
red_flags:
  - A quote was approved above the spend limit or the landlord's approved figure.
  - An invoice above the approved quote, from a different company, dated before the visit, or with added items was paid or closed without a hold.
  - The figure, date or contents of an attachment that was not seen were stated.
  - The landlord's decision was held up waiting for our own readable copy of a quote.
  - A quote or invoice amount was recorded differently from what was written.
---

## Procedure
1. Quote received: `record_quote` exactly as written (amount, VAT basis, items, source). Then send it to the landlord for approval with the amount, unless it is within the spend limit or an approval already covers it. Work starts only after the landlord's clear approval, or "Quote was approved by landlord" in the history.
2. Approving: `approve_quote` only within the spend limit, with a recorded landlord decision, or on an emergency ticket with `emergency_justification` quoting the risk. A quote above the approved figure goes back to the landlord.
3. Attachments you have not seen: if a quote is "unavailable", absent, or "see attached" with nothing attached, never state its contents, amount or date. It still exists in the agency's mailbox. When the landlord must decide on it, send it on now with `request_landlord_approval`, naming it by sender, date and document, without figures you have not seen. In the same turn, ask the provider for a readable copy if you need the figure yourself. Never hold up the decider's decision for your own copy.
4. Invoice received: `record_invoice` exactly as written. It is checked against the approval, the assigned contractor and the spend limit. An invoice that matches goes to final checks.
5. An invoice above the quote, from another payee or company, dated before the visit, or with items added: `hold_payment`, ask the provider to explain, tell the landlord, and escalate if the answer does not settle it. A lower invoice than the quote is fine; note the variance.
6. Scope: compare what was approved with what was quoted or invoiced. Instructing more than was approved, or a quote that adds unrequested items or drops requested ones, goes back to the landlord.
7. Second quote: send the same scope (and any inspection report) to a different contractor named in the case, for a quote only, tell the landlord it is being obtained and when you will report back, `add_note` the request, and hold with a review date. Asking the landlord for a preferred contractor can go alongside this, not instead of it. If no other contractor is named anywhere in the case, move the job to double_quotation with `update_ticket` and tell the landlord that is what is happening.
8. Invoice or "done" with no visit recorded: ask for the invoice, the date they attended and photos of the work before anything is closed or paid.
9. Never split an invoice or quote to stay under a limit.

## Required actions
- `record_quote`: the quote exactly as written.
- `request_landlord_approval`: the quote, its amount and the deadline.
- `approve_quote`: only within the limit, with recorded approval, or with emergency justification.
- `record_invoice`: the invoice exactly as written.
- `hold_payment`: when the invoice is flagged.
- `attach_document`: the quote or invoice on the job.

## Red flags
- The quote total is above the landlord's spend limit.
- The invoice issuer is not the assigned contractor, or the bank details differ from the record.
- The invoice date is before the visit date.
- A provider asks for approval in a rush ("can someone just approve so I can order parts").
- The quote total or VAT does not add up.

## Escalate when
- An invoice above the approved quote, from a different company, or dated before the visit, and the provider's answer does not settle it: P2, accounts.
- Pressure to pay, or different bank details: P2, fraud (see the fraud playbook).
