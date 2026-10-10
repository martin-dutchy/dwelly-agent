# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly labelled a door fault as an appliance issue. I reclassified it as an urgent door/security item, asked the tenant about security and glass with a safety note, asked the landlord for a decision, and set a follow-up for 2024-06-07.

## Where the case stands
Intake stage. Misclassified as appliance/routine; actually a door/security/glass issue. No landlord decision, no contractor. Waiting on tenant answers and landlord decision.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant if door secures, any cracked glass, back door, access; safety note to close gently | Tenant | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord: our contractor or own, by 2024-06-09 | Landlord | email | A3 ✅ |
| 3 | WAIT | Review 2024-06-07 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001)** (verified)

> - Sorry, our form wrongly treated this as a fridge issue; ignore those questions. Does the front door lock and stay secure when you slam it shut, so the flat is secure now?
> - Is any glass in the door or frame cracked or loose? Until it's fixed, please close the door gently rather than slamming it, and keep clear of any cracked glass.
> - Is the back door the same, and what times/access suit for a visit (any pets or alarm we should know of)?
> 
> Why: Intake misclassified a door fault as an appliance issue; we need to know security and glass risk to set the repair. We aim to get it looked at within 72 hours once approved; we'll update you by 2024-06-07.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant at Flat 12 reports the front door (and back door) must be slammed to shut; a visiting engineer warned the glass could shatter. Urgent security/safety repair. Do you want us to send our contractor, or will you arrange your own? Please reply by 2024-06-09.
> 
> Options: Send our contractor (recommended); Landlord arranges own contractor; Tenant fixes

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Does not confirm the glass is damaged or the cause
- No contractor assigned or visit booked; no landlord approval yet
- Tenant timescale not promised as work is unapproved

## Remaining work
- Landlord decision
- Tenant answers
- Assign door/glazier contractor once approved
- Visit, result, invoice, close

## Missing or unavailable information
- Whether door secures
- Glass condition
- Back door status
- Access details
- Landlord decision

## Conflicts between sources
- Intake classed as Appliances/routine, but the tenant's words describe a door fault; trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand?**

At intake, misclassified; nothing decided. Outstanding: tenant answers, landlord decision, contractor.

**2. Next action?**

Email to tenant (info/safety) and landlord approval request via agency record, follow-up 2024-06-07.

**3. Human decision needed?**

No, not now. Escalate to maintenance P2 if the landlord is silent after a chase or the door cannot be secured.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: category is locks/door (front door will not close without slamming; back door same… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","questions":["Sorry, our form… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","decision_needed":"Tenant at Flat 12 reports the front door (and back door) must be slammed to shut; a visiting engin… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `schedule_follow_up` | {"due_on":"2024-06-07","purpose":"Check tenant answers on door security/glass and landlord decision; chase on second channel if none","ticke… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
