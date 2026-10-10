# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Landlord approval was on file but not recorded; I recorded it. The provider reports completion without a readable invoice, so I asked the provider for the invoice and visit date and asked the tenant to confirm the fix. A follow-up is set for 2025-02-13.

## Where the case stands
Provider assigned (landlord approved 'Please go ahead'). Cedar Homes says the work is complete but the invoice is unavailable and no visit date is recorded. Waiting on the invoice and tenant confirmation; follow-up 2025-02-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes to resend the invoice as PDF/plain text and give the visit date | Noah Ellis, Cedar Homes (contractor) | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask tenant to confirm the handle is fixed and the window opens | Nora Quinn (tenant) | email | A3 ✅ |
| 3 | WAIT | Follow up on invoice and tenant confirmation by 2025-02-13 | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - Thanks for letting us know. The invoice attachment didn't reach us - please resend it as a PDF or paste the details in the email.
> - What date did you attend, and was the handle on the staircase window refitted?
> 
> Why: Completion is reported but the invoice and visit date are not visible, so we cannot record the result or invoice.

**A3 · request_information → Nora Quinn (tenant) via email, existing thread (event 014 email)** (verified)

> - Cedar Homes say the window handle repair at the top of the stairs is complete. Can you confirm the handle is back on and the window opens properly?
> 
> Why: We need your confirmation before we close the job. We'll check back with you by 2025-02-13.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Provider's email does not prove the work was done or the amount; no work result or invoice recorded
- Landlord approval recorded without a spend cap; invoice amount unchecked
- Ticket not closed

## Remaining work
- Cedar Homes to resend invoice and visit date
- Tenant to confirm the fix
- Then record work result and invoice, tell landlord, close (agency)

## Missing or unavailable information
- Invoice (attachment unavailable)
- Visit date
- Tenant confirmation

## Conflicts between sources
- Tenant named Harriet (events 005/007) vs Nora Quinn (014-018)
- Tenant phone 07700 900307 (event 015) vs 07700 900251 (event 016)
- Derived hints say visit not booked but provider says complete

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Approved and assigned to Cedar Homes, who report it complete. The invoice is unseen, the visit date is unknown and the tenant has not confirmed the fix. The ticket is still at mp_time.

**2. What is the next action, who is it for, and through which channel?**

Email Cedar Homes (Noah Ellis) for the invoice as PDF/text and the visit date, and email the tenant for confirmation of the fix.

**3. Does anything need a human decision, and why?**

No. This is routine follow-up. A human is needed only if the invoice is above approval, from a different company, or the tenant says the work is not done.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-044-invoice-unavailable","decision":"approved","evidence_quote":"Please go ahead","source":"event 012, email 2025-02-09"} | 1 | ✅ verified | Ticket NBL-044-invoice-unavailable read back after record_landlord_decision |
| A2 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_information` | {"recipient_name":"Nora Quinn","recipient_role":"tenant","channel":"email","contact":"existing thread (event 014 email)","questions":["Cedar… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A4 | `add_note` | {"entity":"NBL-044-invoice-unavailable","note":"Conflicts: tenant addressed as Harriet (events 005/007) vs Nora Quinn (014-018); tenant phon… | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A5 | `schedule_follow_up` | {"ticket_ref":"NBL-044-invoice-unavailable","due_on":"2025-02-13","purpose":"Check invoice received from Cedar Homes and tenant confirmation… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
