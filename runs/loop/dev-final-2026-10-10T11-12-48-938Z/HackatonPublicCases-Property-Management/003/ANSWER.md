# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** action_taken · **Severity:** routine

The checkout clean job is at final checks, but the invoice and completion evidence are not on the record. I asked the contractor for the invoice and a completion confirmation, and put the job on hold until 28 July.

## Where the case stands
Ticket at documents/final checks stage, marked completed by system. Contractor says invoice was sent to Theo, but no invoice, amount or completion evidence is on the record. On hold waiting for the provider, review 2025-07-28.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask contractor for the invoice as PDF/plain text, completion confirmation and photos | Bennett, contractor | email | A1 ✅ |
| 2 | WAIT | Hold until 2025-07-28 for the invoice and completion evidence | internal | internal | A2 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> - Please send the invoice for NBL-003-2766 (Flat 30, 30 Harbour View) as a PDF or plain-text reply here; we have not received it on the job.
> - Please confirm the cleaning, removal of dumped items and carpet clean are all complete, and the date you finished.
> - Please confirm the invoice total matches your approved estimate, and if you can, send before/after photos.
> 
> Why: Job is at final checks but no invoice, amount or completion evidence is on the record.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking for the invoice does not approve payment or confirm the work was done.
- Not closed: no invoice recorded, no landlord notification, no tenant confirmation.

## Remaining work
- Receive and record invoice, check against approved estimate and the assigned contractor
- Attach or skip the invoice and any photos
- Tell the landlord the outcome
- Close ticket once checks are met

## Missing or unavailable information
- Invoice document and amount
- Approved estimate amount (the history only says 'Estimate approved')
- Contractor's completion confirmation
- Tenancy status (void or tenanted) and landlord details; the property record returned only the address

## Conflicts between sources
- The inspection report is dated 16 March 2026 but was signed 22 July 2025, and the case is dated July 2025. I treated the report as context only.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The estimate was approved, the work is marked completed and the job is at documents/final checks. The invoice (said to have been sent to Theo) has not been seen, and there is no recorded amount, completion evidence or landlord notification.

**2. What is the next action, who is it for, and through which channel?**

Email to Bennett, the contractor, on the existing thread, asking for the invoice, completion confirmation and photos. The job is on hold, review 2025-07-28.

**3. Does anything need a human decision, and why?**

No. This is routine. A human is needed only if the invoice differs from the approved estimate or comes from a different company.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Plea… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `put_on_hold` | {"ticket_ref":"NBL-003-2766","reason":"Waiting for Provider","comment":"Waiting for contractor invoice (PDF), completion confirmation and ph… | 1 | ✅ verified | Ticket NBL-003-2766 read back after put_on_hold |

## Failed or unverified actions
_None._
