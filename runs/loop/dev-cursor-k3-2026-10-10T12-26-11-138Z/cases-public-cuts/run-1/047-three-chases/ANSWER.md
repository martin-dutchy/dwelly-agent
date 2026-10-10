# Case 047: Bedroom Window Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Window repair has stalled: provider assigned 1 March never responded to seven reminders, and the landlord's only reply concerned a different property so is not approval. I asked the landlord a clear yes/no, updated the tenant, and put the job on hold to 13 March.

## Where the case stands
Provider assigned (Oscar Turner) but silent after 7 reminders; no visit booked; no valid landlord approval on file. On hold for landlord until 2024-03-13.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord yes/no whether our contractor may assess and quote for Flat 24 window, noting his earlier reply named a different property | Isaac Oakley, landlord | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: no visit booked, awaiting landlord, next update by 14 March | Eliza Jenkins, tenant | email | A2 ✅ |
| 3 | WAIT | Hold for landlord reply; review 13 March, then chase landlord by SMS and consider swapping provider | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · request_landlord_approval → Isaac Oakley (landlord)** (verified)

> Your reply of 22/02 mentioned a plumber at Flat 18, 88 Alder Lane, which is not this property, so we have not treated it as approval. For Flat 24, 150 Copperfield Walk (bedroom window not closing properly): may we send our contractor Oscar Turner to assess and quote? Yes or no please.
> 
> Options: Yes, send your contractor to assess and quote; I will arrange my own contractor; No

**A2 · send_message → Eliza Jenkins (tenant) via email, existing thread (event 017 email)** (verified)

> Hello Eliza, sorry for the wait on your bedroom window. Our contractor has not yet arranged a visit with you, and we are still waiting for the landlord to confirm the go-ahead for this property. We have asked him again today. No visit is booked yet. We will update you by 14 March at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Asking the landlord is not approval; nothing authorises Oscar Turner or any spend yet
- No visit is booked
- Does not establish the cause or cost of the window fault

## Remaining work
- Landlord decision on contractor (record it when it arrives)
- Provider swap or phone chase if Oscar Turner still silent and approval arrives
- Book visit once provider confirms a date
- Quote, invoice, close

## Missing or unavailable information
- Valid landlord approval for this property
- Provider response/availability

## Conflicts between sources
- Landlord reply (event 010) names Flat 18, 88 Alder Lane, ZZ3 5ZZ, not the case property; not treated as approval.
- Landlord's original message at event 004 bundled the toilet issue, which the tenant says is fixed.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned but unresponsive, no visit booked, no valid landlord approval (his reply named Flat 18, 88 Alder Lane). Toilet issue was resolved by the tenant.

**2. What is the next action, who is it for, and through which channel?**

Landlord Isaac Oakley by email for a yes/no approval (A1); tenant updated by email (A2); hold with review 13 March (A3).

**3. Does anything need a human decision, and why?**

Not yet. The decision belongs to the landlord. Escalate as P3 if the landlord stays silent and the provider remains unreachable after the 13 March review.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `request_landlord_approval` | {"landlord":"Isaac Oakley","ticket_ref":"NBL-047-three-chases","decision_needed":"Your reply of 22/02 mentioned a plumber at Flat 18, 88 Ald… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A2 | `send_message` | {"recipient_name":"Eliza Jenkins","recipient_role":"tenant","channel":"email","contact":"existing thread (event 017 email)","ticket_ref":"NB… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-047-three-chases","reason":"Waiting for Landlord","comment":"Landlord's 22/02 reply named another property (Flat 18, 88 A… | 1 | ✅ verified | Ticket NBL-047-three-chases read back after put_on_hold |

## Failed or unverified actions
_None._
