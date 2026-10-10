# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

Window repair provider has not responded to 7 reminders and no visit is booked. The landlord's only reply referred to a different property, so it is not approval. I re-asked the landlord, updated the tenant, put the job on hold to 13 March and escalated a P3 provider swap.

## Where the case stands
Stage mp_time: provider assigned, no visit booked. Provider silent after 7 reminders. No valid landlord approval on record. On hold, review 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord yes/no for our contractor on this property, noting event 010 named a different flat | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Tell tenant no visit is booked, provider chase stopped, next update by 13 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 provider-swap recommendation | internal maintenance | internal | A4 ✅ |
| 4 | WAIT | Hold until 13 March for landlord reply | Isaac Oakley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, which is a different property. For Flat 24, 150 Copperfield Walk, the tenant's bedroom window isn't closing properly. May we use our contractor to assess and repair it (yes/no), or will you arrange your own?
> 
> Options: Yes, send our contractor; I'll arrange my own contractor; No

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the delay with your bedroom window. The contractor we asked to contact you hasn't replied, so we've stopped chasing them and are sorting out an alternative with our team. We're also checking the landlord's go-ahead for the repair. Nobody should be expected at your home yet as no visit is booked. We'll update you by 13 March. If the window can't be closed at all and you feel unsafe, please let us know.

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner unresponsive after 3+ reminders (email+SMS 4, 6, 8 Mar); no other contractor named; landlord approval not valid.
  - Known: Window repair, Flat 24, 150 Copperfield Walk. Provider assigned 1 Mar, never replied, no visit booked. Landlord's only reply (event 010) concerned Flat 18, 88 Alder Lane, so is not approval for this property. Tenant told of the delay; landlord asked again to confirm yes/no. Toilet issue withdrawn by tenant.
  - Missing: Landlord's decision for this property; any alternative approved contractor; whether Oscar Turner is still available.
  - Options: Swap provider once landlord approves; Phone Oscar Turner; Landlord uses own contractor
  - Recommendation: Swap provider after landlord approval is recorded; review 13 Mar.

## What this does not establish
- No fourth reminder sent
- Nothing here approves spend or confirms a contractor or visit
- Does not establish cause of the window fault

## Remaining work
- Landlord decision on contractor (agency, awaiting)
- Provider swap or contact (maintenance team)
- Book visit once provider confirms date
- Quote/invoice and close

## Missing or unavailable information
- Valid landlord approval for this property
- Provider response
- Any alternative contractor

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not the case property; treated as not about this job.
- Provider was assigned (event 016) with no recorded landlord approval.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned 1 Mar but silent; no visit booked; landlord approval never validly given (reply named Flat 18, 88 Alder Lane). Outstanding: landlord decision, provider swap, visit, result.

**2. What is the next action, who is it for, and through which channel?**

Landlord yes/no approval request (email), tenant update (email), and a P3 internal escalation for a provider swap.

**3. Does anything need a human decision, and why?**

Yes, P3: a provider swap, since the provider is unresponsive after 3+ reminders and no alternative contractor is named. The landlord decision is requested directly.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","decision_needed":"Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, which is a different… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named a different property, so no… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner unresponsive after 3+ reminders (email+SMS 4, 6, 8 Mar); no other cont… | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
