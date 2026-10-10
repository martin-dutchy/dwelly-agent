# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** action_taken · **Severity:** routine

The cleaning job was marked completed, but there is no readable invoice, estimate figure or completion evidence in the case. I asked the contractor for these, told Theo, and set a follow-up for 28 July. Closing is held.

## Where the case stands
Ticket at documents/final checks. Job marked completed on 24 July. The contractor said on 23 July that the invoice was sent to Theo. The invoice, estimate figure and completion evidence are not readable in the case. We are waiting on the contractor and Theo.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask the contractor for the invoice as a PDF, the attendance date, photos and the estimate figure | Bennett, contractor | email | A1 ✅ |
| 2 | OTHER | Tell Theo Quinn the close and payment are held and ask him to forward the invoice and estimate | Theo Quinn, internal | internal | A2 ✅ |
| 3 | WAIT | Follow up on 28 July, then record the invoice, check it against the estimate and close | Bennett, contractor | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> - Please send your invoice for Flat 30, 30 Harbour View as a PDF or plain-text reply, showing the company name, invoice date and total including VAT.
> - Please confirm the date you attended and completed the clean, dumped-item removal and carpet clean, with photos of the finished work.
> - Please resend your original estimate figure so we can match the invoice to it.
> 
> Why: The job is marked completed, but the case holds no readable invoice, estimate figure or completion evidence, so we can't check or pay it or close the job.

**A2 · send_message → Theo Quinn (internal) via email, existing thread (event 017 email)** (verified)

> NBL-003-2766 (Flat 30, 30 Harbour View): the job is at final checks, but I can't see the estimate figure, the invoice contents or any completion evidence. The contractor said on 23 July that the invoice was sent to you. I've asked them for the invoice as a PDF, their attendance date, photos and the estimate figure. Please forward the invoice and estimate if you have them. Also, the checkout report is dated 16 March 2026 in its text but signed 22 July 2025, so please check the date. I'm holding the close and any payment until these are checked.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the work was done, the invoice amount, or that it matches the approved estimate.
- The ticket is not closed and no payment is approved.

## Remaining work
- Contractor to supply the invoice, attendance date, photos and estimate figure.
- Then record the invoice and check it against the approved estimate.
- Confirm the landlord is informed, then close the ticket.
- Agency to check the report date conflict.

## Missing or unavailable information
- Invoice contents (the attachment-02 file was not readable)
- Estimate figure (the 'Estimate approved' note has no amount)
- Attendance date and completion photos

## Conflicts between sources
- The checkout report text is dated 16 March 2026 but is signed 22 July 2025. The previous report is dated 29 November 2024.
- The ticket stage is 'documents' while the history says it is at Result/final checks.
- The hint lists attachment-02 invoice but the history does not show it and it was not readable.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

It is at final checks. Outstanding: the invoice, the estimate figure, completion evidence, landlord notification and closing.

**2. What is the next action, who is it for, and through which channel?**

Request the invoice PDF, attendance date, photos and estimate figure from Bennett, the contractor, by email. Tell Theo Quinn internally.

**3. Does anything need a human decision, and why?**

Not yet. This is routine document chasing. If the invoice does not match the estimate, it goes to accounts.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","questions":["Plea… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Theo Quinn","recipient_role":"internal","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-003-2766","due_on":"2025-07-28","party":"Bennett (contractor)","purpose":"Chase invoice PDF, attendance date, photos and … | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
