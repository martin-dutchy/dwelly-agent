# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** escalated · **Severity:** routine

The provider was assigned on 1 Mar without a valid landlord approval, because the landlord's only reply concerned a different property. The provider has ignored 7 reminders. I asked the landlord a clear question, updated the tenant, put the job on hold to 13 Mar and escalated P3 for a provider swap.

## Where the case stands
Stage mp_time: provider assigned, no visit booked. On hold waiting for landlord, review 2024-03-13. Provider silent after 7 reminders. Tenant informed.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask the landlord to confirm for this property whether we send our contractor, since the earlier reply named Flat 18, 88 Alder Lane | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: contractor unresponsive, landlord being asked, next update by 14 March, no visit confirmed | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | ESCALATE_TO_HUMAN | P3 escalation recommending provider swap once landlord approval is recorded | internal maintenance | internal | A4 ✅ |
| 4 | WAIT | Hold until 13 March for landlord decision | Isaac Oakley, landlord | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22 Feb mentioned a plumber visiting Flat 18, 88 Alder Lane, which is a different property, so we have not treated it as an answer for Flat 24, 150 Copperfield Walk (bedroom window not closing properly; the toilet issue is resolved). May we send our contractor to assess and quote for the window, or will you arrange your own?
> 
> Options: Yes, send our contractor to assess and quote; I will arrange my own contractor; Tenant to deal with it

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the wait on your bedroom window. The contractor we contacted hasn't come back to us to book a visit, and we are still waiting on the landlord to confirm who should do the work. We have asked the landlord again today and are looking at other options for the contractor. We'll update you by 14 March. Please don't expect a visit until we confirm a date with you. Kind regards, Northbridge Lettings

## Escalation
- **P3 → maintenance** (verified): Provider Oscar Turner unresponsive after 3+ reminders (email+SMS, 1, 4, 6, 8 Mar); no other approved contractor; landlord approval never validly given.
  - Known: Window repair for Flat 24, 150 Copperfield Walk. Provider assigned 1 Mar (event 016) while ticket was on hold waiting for landlord. Landlord's only reply (event 010) concerns Flat 18, 88 Alder Lane, a different property, so not approval. No spend limit on property record. No reply from provider ever. Tenant told today; landlord asked a yes/no question today; hold review 13 Mar.
  - Missing: Landlord decision for this property; any alternative contractor; whether provider received the job.
  - Options: Swap provider once landlord approves; Phone Oscar Turner; Landlord uses own contractor
  - Recommendation: Swap provider after landlord approval is recorded; do not send a fourth reminder.

## What this does not establish
- Nothing here approves spend or the contractor
- No visit is booked
- Tenant message does not promise a date
- Landlord decision for this property is not established

## Remaining work
- Landlord decision (agency chases after 13 Mar)
- Swap or phone provider (human, ESC-103)
- Book visit once provider confirms
- Quote loop if needed

## Missing or unavailable information
- Valid landlord approval for this property
- Provider response
- Alternative contractor

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not this property; treated as not approval.
- Provider was assigned (event 016) while the hold said waiting for landlord.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but silent after 3+ reminders and no visit booked. Landlord approval is missing: the 22 Feb reply named Flat 18, 88 Alder Lane. The toilet issue was withdrawn by the tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord approval request by email (A1), tenant update by email (A2), hold to 13 Mar (A3), and a P3 escalation to maintenance (A4). No fourth reminder was sent to the provider.

**3. Does anything need a human decision, and why?**

Yes, a P3 provider swap or phone chase, because three reminders went unanswered and no alternative contractor is approved. It also needs the landlord's decision on who does the work.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22 Feb mentioned a plumber visiting Flat 18,… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord reply (event 010) named a different property; no va… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |
| A4 | `escalate_to_human` | {"priority":"P3","team":"maintenance","reason":"Provider Oscar Turner unresponsive after 3+ reminders (email+SMS, 1, 4, 6, 8 Mar); no other … | 1 | ✅ verified | ESC-103 found in the escalate_to_human log |

## Failed or unverified actions
_None._
