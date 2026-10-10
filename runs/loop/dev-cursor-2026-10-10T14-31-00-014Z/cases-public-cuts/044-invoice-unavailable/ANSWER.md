# Case 044: Window Handle Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Cedar Homes reported the window handle job complete, but the invoice attachment is unavailable and no visit was ever recorded. I asked Cedar for a readable invoice, the visit date and photos, and asked the tenant to confirm the fix. I set a follow-up for 14 Feb and added a note. No human decision is needed yet.

## Where the case stands
Provider assigned (Cedar Homes) with landlord's go-ahead. Cedar says the job is complete, but no visit is recorded and the invoice attachment is unreadable. Waiting on Cedar for the invoice, visit date and photos, and on the tenant to confirm the fix. Review on 2025-02-14.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask Cedar Homes for a readable invoice, the visit date and photos of the work, replying by 14 Feb | Noah Ellis, Cedar Homes, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Ask the tenant to confirm whether Cedar attended and whether the window now works | Harriet / Nora Quinn, tenant | email | A2 ✅ |
| 3 | WAIT | Follow up on 14 Feb with Cedar and the tenant before any close or payment | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_information → Noah Ellis, Cedar Homes (contractor) via email, existing thread (event 019 email)** (verified)

> - The invoice attachment did not reach us. Please resend it as a PDF or put the amount and VAT in a plain-text reply.
> - What date did you attend, and who let you in?
> - Please send photos of the replaced handle on the window at the top of the stairs.
> 
> Why: You say the job is complete, but we have no visit recorded and no readable invoice. We need these before we can close or pay. Please reply by 14 Feb 2025.

**A2 · send_message → Harriet / Nora Quinn (tenant) via email, existing thread (event 007 email)** (verified)

> Hi, Cedar Homes have told us the window handle at the top of your stairs has been repaired. We have no visit date on our record, so could you confirm whether they came, when, and whether the window now opens and closes properly? If not, let us know and we will get them back. We will update you again by 14 February. Thanks, Northbridge Lettings

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing here confirms the repair was done or that a visit took place.
- No invoice has been seen, recorded or approved for payment.
- The landlord's 'please go ahead' states no spend cap.

## Remaining work
- Cedar Homes to send the invoice, visit date and photos.
- Tenant to confirm the fix.
- Then record the work result and the invoice, tell the landlord, and close the ticket.

## Missing or unavailable information
- Readable invoice and amount
- Visit date
- Photos of the work
- Tenant confirmation

## Conflicts between sources
- The tenant is called Harriet (ev 005/007) and Nora Quinn (ev 014).
- Tenant phone is 07700 900307 in ev 015 and 07700 900251 in ev 016.
- Cedar says the job is done, but the record shows no visit was booked.
- The photos referenced at ev 015 and the invoice at ev 019 are unavailable.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The landlord approved the repair and Cedar Homes was assigned. Cedar says it is complete, but there is no recorded visit, no readable invoice and no tenant confirmation.

**2. What is the next action, who is it for, and through which channel?**

Ask Cedar Homes by email for the invoice, visit date and photos. Ask the tenant by email to confirm the fix. Follow up on 14 Feb.

**3. Does anything need a human decision, and why?**

No. This is routine verification. Escalate to accounts only if the invoice turns up flagged.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_information` | {"recipient_name":"Noah Ellis, Cedar Homes","recipient_role":"contractor","channel":"email","contact":"existing thread (event 019 email)","q… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A2 | `send_message` | {"recipient_name":"Harriet / Nora Quinn","recipient_role":"tenant","channel":"email","contact":"existing thread (event 007 email)","body":"H… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `schedule_follow_up` | {"ticket_ref":"NBL-044-1849","due_on":"2025-02-14","party":"Cedar Homes and tenant","purpose":"Check for readable invoice, visit date, photo… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |
| A4 | `add_note` | {"entity":"NBL-044-1849","note":"Event 019: Cedar Homes says complete, invoice attachment unavailable (unread). No visit recorded. Conflicts… | 1 | ✅ verified | NOTE-104 found in the add_note log |

## Failed or unverified actions
_None._
