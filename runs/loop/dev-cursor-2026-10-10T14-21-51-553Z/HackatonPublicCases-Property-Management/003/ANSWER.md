# Case 003: Checkout Cleaning Estimate and Invoice: ANSWER

**Decision:** action_taken · **Severity:** routine

Checkout clean job was marked completed and the contractor says his invoice went to Theo. I can't read the invoice and there is no recorded estimate figure, completion evidence or landlord message. I asked the contractor and Theo for these and set a follow-up for 28 July. I did not close the job or approve payment.

## Where the case stands
Ticket at documents/final checks. Contractor says work done and invoice sent to Theo; invoice not readable by me, no figures verified, no photos or attendance date. Waiting on contractor and Theo until 28 July.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Ask contractor for readable invoice, attendance date and after-work photos by 28 July | Bennett, contractor | email | A1 ✅ |
| 2 | REQUEST_INFORMATION | Ask Theo for approved estimate figure, approver, invoice total, who pays, and the report date conflict | Theo Quinn, internal | email | A2 ✅ |
| 3 | WAIT | Follow up 28 July, then record invoice, tell landlord and close | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Bennett (contractor) via email, existing thread (event 017 email)** (verified)

> Hi Bennett, thanks for the invoice for Flat 30, 30 Harbour View (job NBL-003-2766). To finish our final checks, could you please send by Monday 28 July: (1) the invoice as a PDF or plain text, showing the total and what it covers (clean, removal of dumped items, carpet clean); (2) the date you attended; (3) a few after-work photos of the bedroom, bathroom and carpet. Thank you.

**A2 · send_message → Theo Quinn (internal) via email, existing thread (event 017 email)** (verified)

> Hi Theo, NBL-003-2766 (Flat 30 checkout clean) is at final checks. I can't read the invoice the contractor says he sent you (event 017), and the history has no quote figure, only "Estimate approved" (event 010). Please tell me: the approved estimate amount and who approved it (landlord or agency); the invoice total; and whether the cost is to be deducted from the tenant's deposit, paid by the landlord or by the agency. Also the inspection report is dated 16 March 2026 but signed 22 July 2025, so please confirm the right date. I've asked the contractor for the invoice copy, attendance date and photos by 28 July. I'm not closing until these are in.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the work was done to standard or the invoice amount is correct
- Not an approval to pay
- Does not decide who bears the cost (landlord, deposit or agency)

## Remaining work
- Record invoice and check it against the approved estimate
- Obtain completion evidence
- Confirm who pays; tell landlord
- Close ticket (tenancy appears ended, so tenant confirmation likely not needed)

## Missing or unavailable information
- Invoice contents (attachment-02 not viewable)
- Approved estimate figure and approver
- Date contractor attended and photos
- Who pays

## Conflicts between sources
- Inspection report dated 16 March 2026 but signed 22 July 2025 and the history is July 2025; treated as a date error, queried with Theo
- Property record shows no tenancy status or landlord approval; 'Estimate approved' note has no approver

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At final checks. Outstanding: readable invoice and check against the approved estimate, completion evidence (date, photos), who pays, landlord informed.

**2. What is the next action, who is it for, and through which channel?**

Email to the contractor (Bennett) for the invoice copy, attendance date and photos; internal email to Theo Quinn for the estimate figure and payer; follow-up 28 July.

**3. Does anything need a human decision, and why?**

Not yet. Theo needs to supply facts. If the invoice exceeds the approved estimate or the payer is unclear, then escalate to accounts.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Bennett","recipient_role":"contractor","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Theo Quinn","recipient_role":"internal","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NBL… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-003-2766","due_on":"2025-07-28","party":"Bennett (contractor) and Theo Quinn","purpose":"Check invoice copy, attendance d… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-003-2766","note":"Final checks not complete. Invoice (attachment-02) not readable by agent; no quote figure recorded; no atte… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
