# Case 014: Front Door Repair Request: ANSWER

**Decision:** action_taken · **Severity:** urgent

Intake wrongly classed a door fault as a fridge issue. I corrected the ticket to door/security, urgent, told the tenant with a safety note and questions, and asked the landlord to choose our contractor or their own. The job is on hold until 2024-06-07.

## Where the case stands
Intake stage, on hold until 2024-06-07. Reclassified from appliances/routine to door/security, urgent. Waiting on landlord decision and tenant answers.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord whether our contractor or their own repairs the door, reply by 2024-06-07 | Landlord | portal | A3 ✅ |
| 2 | REQUEST_INFORMATION | Reply to tenant with correction, safety note and questions on door security, glass, back door, access | Tenant, Flat 12 | email | A2 ✅ |
| 3 | WAIT | Hold until 2024-06-07 for landlord and tenant replies | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Tenant, Flat 12 (tenant) via email, existing thread (event 001 note)** (verified)

> Hello, thanks for reporting this. Sorry, our system wrongly logged it as a fridge problem; it is now logged as a front door repair and treated as urgent. Until it is fixed, please close the door gently rather than slamming it, and keep people away from any glass if it looks cracked. A few quick questions: 1) Does the front door lock and secure properly when shut, so the flat is safe tonight? 2) Is any glass in the door cracked or loose? 3) Does the back door need the same repair? 4) Any access details, such as entry codes, alarms or pets? We are asking the landlord for approval now, and you will hear from us again by tomorrow.

**A3 · request_landlord_approval → Landlord, Flat 12, 52 Meadow Row (landlord)** (verified)

> Tenant reports the front door (and back door) must be slammed to shut, and a visiting engineer warned the glass could shatter. Do you want us to send our contractor to inspect and repair, or will you arrange your own?
> 
> Options: Our contractor inspects and repairs (recommended, urgent); Landlord arranges own contractor (please give name and date)
> 
> Update: No visit booked yet. We have asked the tenant whether the door secures and whether any glass is cracked. Please reply by 2024-06-07.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- No contractor assigned and no visit booked
- Cause of the fault and cost are unknown
- Fridge engineer's remark is hearsay

## Remaining work
- Landlord decision (agency)
- Tenant answers on security and glass
- Assign contractor and book visit once approved

## Missing or unavailable information
- Whether the door secures
- Whether glass is cracked
- Access details
- Whether the back door is also faulty
- Tenant phone/email not on file

## Conflicts between sources
- Intake classed as Appliances/routine, but the tenant describes a door fault; trusted the tenant's words.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

At intake and misclassified; now corrected to urgent door/security. Outstanding: landlord decision, tenant answers, contractor and visit.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request (portal/agency landlord record) and tenant questions by email on the existing thread, both sent.

**3. Does anything need a human decision, and why?**

Not yet. The landlord decides on contractor; escalate P2 if they stay silent after the chase and the door is found unsecured.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `update_ticket` | {"ref":"NBL-014-misclassified-door","note":"Reclassified: intake said Appliances/routine but tenant describes front (and back) door that mus… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back at stage init |
| A2 | `send_message` | {"recipient_name":"Tenant, Flat 12","recipient_role":"tenant","channel":"email","contact":"existing thread (event 001 note)","ticket_ref":"N… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `request_landlord_approval` | {"landlord":"Landlord, Flat 12, 52 Meadow Row","ticket_ref":"NBL-014-misclassified-door","decision_needed":"Tenant reports the front door (a… | 1 | ✅ verified | APR-102 found in the request_landlord_approval log |
| A4 | `put_on_hold` | {"ticket_ref":"NBL-014-misclassified-door","reason":"Waiting for Landlord","comment":"Awaiting landlord choice of our contractor or their ow… | 1 | ✅ verified | Ticket NBL-014-misclassified-door read back after put_on_hold |

## Failed or unverified actions
_None._
