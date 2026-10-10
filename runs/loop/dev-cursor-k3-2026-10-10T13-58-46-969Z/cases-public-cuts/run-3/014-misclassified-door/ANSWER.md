# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Tenant's door complaint was misfiled as a fridge issue. I reclassified it as an urgent door/security item, gave the tenant safety advice and the correct questions, asked the landlord for approval, and put the job on hold to 7 June.

## Where the case stands
Intake, misclassified. Door repair (urgent) awaiting landlord decision; tenant questions outstanding; on hold, review 2024-06-07.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | RECLASSIFY | Corrected ticket note from Appliances/routine to door/security, urgent | internal | internal | A1 ✅ |
| 2 | REPLY_TO_TENANT | Apologised for the wrong classification, gave safety advice, asked about glass, lock, access, pets | Tenant | email | A2 ✅ |
| 3 | REQUEST_LANDLORD_APPROVAL | Asked landlord to approve our contractor or name their own, reply by 7 June | Landlord | email | A3 ✅ |
| 4 | WAIT | Hold until 7 June for landlord and tenant replies | Landlord | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant (tenant) via email, existing thread (event 001 request)** (verified)

> Hello, sorry, our system wrongly logged your report as a fridge problem and sent you fridge questions. Please ignore those. We have corrected it to a front door repair and marked it urgent, as a door that needs slamming can damage the glass and may not secure properly. Until it is fixed, please close the doors gently and make sure the front door is locked when you go out or at night. Please keep away from the glass if it cracks. Could you tell us: 1) is the door glass cracked or loose now? 2) does the door lock securely when shut? 3) what times suit for access, any entry codes or alarms, and are there pets? We are asking the landlord to approve the repair; the target for urgent work is within 72 hours once approved. We will update you by 7 June.

**A3 · request_landlord_approval → Landlord (landlord)** (verified)

> Tenant reports Flat 12, 52 Meadow Row front door (and back door) has to be slammed to shut; an engineer on site warned it could shatter the glass. Security/glass item, urgent. Do you approve our contractor to inspect and repair, or will you arrange your own? Please reply by 7 June 2024.
> 
> Options: Approve our contractor to inspect and repair (recommended); Landlord arranges own contractor (please give name and date); Other instruction

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- Does not confirm the cause of the fault or who pays
- The glass risk is hearsay from the fridge engineer, unverified

## Remaining work
- Landlord decision (agency owner)
- Tenant answers on glass, lock, access
- Assign contractor after approval and book visit
- Chase landlord on second channel if no reply by 7 June

## Missing or unavailable information
- Door and glass condition
- Access details and pets
- Landlord decision

## Conflicts between sources
- Intake classed it as Appliances/routine, but the tenant's words describe a door fault; treated as door/urgent.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake, misclassified as an appliance issue; now corrected to urgent door/security. Landlord approval, tenant details and contractor assignment are outstanding.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (email, via the agency landlord record) and the tenant update (email), both sent; the landlord is chased by 7 June.

**3. Does anything need a human decision, and why?**

Not at this point. The landlord's decision is routine and pending. Escalate P2 if the landlord stays silent after a second-channel chase or if the glass is found cracked.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/ROUTINE but fault is front (and back) door that will not cl… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 request)","ticket_ref":"NBL-014… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports Flat 12, 52 Meadow Row front door (and ba… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord decision (our contractor / own contr… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
