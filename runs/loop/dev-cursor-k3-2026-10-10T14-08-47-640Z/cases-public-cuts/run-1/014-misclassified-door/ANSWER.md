# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant's door report was misclassified as an appliance issue. I corrected it to a door/lock security item (urgent), asked the tenant about security, glass and access, asked the landlord for approval, and set a follow-up for 7 June.

## Where the case stands
Intake stage, no provider assigned. Misclassified as appliances; corrected to door/lock security item. Waiting on tenant (security/glass/access) and landlord (approval route, reply by 2024-06-09). Follow-up 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_INFORMATION | Ask tenant whether the flat is secure, whether glass is damaged, and for access times; apologise for the fridge mix-up | Tenant | email | A2 ✅ |
| 2 | REQUEST_LANDLORD_APPROVAL | Ask landlord to approve our contractor or use their own, and whether to include the back door | Landlord | email | A3 ✅ |
| 3 | WAIT | Review replies 2024-06-07 | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · request_information → Tenant (tenant) via email, existing thread (event 001)** (verified)

> - Sorry, our system wrongly treated this as a fridge problem; please ignore the fridge questions. Is the front door (and back door) securely locked when closed, so the flat is secure right now?
> - Is any glass in the door cracked or loose? Please keep clear of it and avoid slamming the door meanwhile.
> - What days and times suit for a visit, and are there any alarms or pets we should know about?
> 
> Why: Door fault needs security and glass risk confirmed before booking the right trade.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to shut; a contractor reportedly warned the glass could shatter. Do you approve our contractor (door/lock repair), or will you arrange your own? Please reply by 2024-06-09. Also: should the back door be included?
> 
> Options: Use our contractor (recommended); Landlord arranges own contractor; Tenant fixes

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned or visit booked
- Does not confirm the cause, the glass risk (hearsay from the fridge engineer), or who pays
- Landlord approval not yet given

## Remaining work
- Assign door/lock contractor after landlord approval
- Agree visit with tenant with 24h notice
- Chase landlord on a second channel if silent by 2024-06-07 review

## Missing or unavailable information
- Whether the door secures when closed
- Glass condition
- Access times, alarms, pets
- Landlord decision

## Conflicts between sources
- Intake classed the issue as Appliances/routine, but the tenant's words describe the front and back doors; trusted the tenant's words.
- The update_ticket tool only added a note, so the stage and category fields still read the old values.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake with no provider. Reclassified from appliances to door/lock, urgent. Outstanding: tenant answers, landlord decision, contractor assignment and visit.

**2. What is the next action, who is it for, and through which channel?**

Questions to the tenant by email (A2) and an approval request to the landlord (A3); follow-up on 2024-06-07 (A4).

**3. Does anything need a human decision, and why?**

No escalation now. The landlord decision is routine and has been requested. Escalate P2 if the landlord is silent after a chase, or P1 if the tenant reports the door cannot be secured or the glass is broken.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: category locks/door (entrance door and back door will not close without slamming; … | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001)","questions":["Sorry, our syst… | 1 | ✅ verified | REQ-101 found in the request_information log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","decision_needed":"Tenant reports the front door (and back door) must be slammed to shut; a contractor reportedly war… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `schedule_follow_up` | {"due_on":"2024-06-07","purpose":"Check tenant and landlord replies on door repair; chase landlord on second channel if none","ticket_ref":"… | 1 | ✅ verified | FUP-103 found in the schedule_follow_up log |

## Failed or unverified actions
_None._
