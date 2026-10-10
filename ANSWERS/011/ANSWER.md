# Kitchen ceiling leak inspection at 16 Brindlewick Mews: ANSWER

**Decision:** action_taken · **Severity:** urgent

Plumber attended 13 June but paused because an unidentified fibrous lining blocks access to the leaking joint; the ceiling is unopened. Landlord authority covers the quoted plumbing only. I recorded that, asked the landlord about a specialist assessment quote, held the job to 16 June, and updated tenant, plumber and landlord.

## Where the case stands
Ticket NBL-011 on hold (waiting for landlord) until 2025-06-16. Pipe repair paused, ceiling unopened, tap out of use, no return visit booked, no extra spend authorised.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REQUEST_LANDLORD_APPROVAL | Ask landlord to authorise an assessment quote | Ossa Fenlow, landlord | email | A2 ✅ |
| 2 | REQUEST_INFORMATION | Ask plumber if the tap can be isolated non-invasively | Kellan Orve, contractor | email | A4 ✅ |
| 3 | REPLY_TO_TENANT | Safety advice and status update | Iven Rell, tenant | email | A7 ✅ |
| 4 | WAIT | Wait for landlord to 16 June | Ossa Fenlow, landlord | internal | A6 ✅ |

## Messages sent (verbatim)
**A2 · request_landlord_approval → Ossa Fenlow (landlord)** (verified)

> Authorise sourcing a quote for a specialist assessment/sampling of the unidentified fibrous ceiling lining (needed before the joint can be reached), so the authorised pipe repair can proceed.
> 
> Options: Yes: we obtain a quote and timing for a specialist material assessment and bring it back to you for approval before anything is booked (recommended); You arrange your own assessor/contractor; Decline further work for now (leak continues when the tap is used)
> 
> Update: You asked for likely cost and timing: we have none yet; the plumber cannot price or specify the assessment. Nothing extra is committed. Quoted plumbing work is paused, ceiling unopened, no drilling/cutting. Tenant has stopped using the kitchen tap; a young child lives there. Visit for repair not booked. Please reply by Monday 16 June; we will update you then.

**A4 · send_message → Kellan Orve (contractor) via email, existing thread (event 023 note / event 021 email)** (verified)

> Hi Kellan, thanks for stopping and for your notes. No work beyond the original quote is authorised and the ceiling must stay unopened until the lining is identified; we're asking the landlord about an assessment. One question: can the kitchen tap supply be isolated non-invasively (e.g. under-sink valve) to stop the drip, without touching the ceiling or hatch? Please reply by Monday 16 June. Please don't book a return visit until we confirm. Access note: the tenant's young child is at home, and they ask for a call on arrival.

**A5 · send_message → Ossa Fenlow (landlord) via email, agency landlord record** (verified)

> Hi Ossa, further to my last update: we have not agreed any extra cost. We don't yet have a cost or timing for an assessment of the lining, as the plumber can't specify one. With your OK we'll obtain a quote and bring it back to you before anything is booked. Meanwhile the tenant has stopped using the tap and we're asking the plumber whether it can be isolated without opening the ceiling. Please reply by Monday 16 June; we'll update you then.

**A7 · send_message → Iven Rell (tenant) via email, existing thread (event 020 portal)** (verified)

> Hi Iven, thanks for the update. Please keep not using the kitchen tap, keep the hatch closed and don't touch the ceiling. Put a container under any drip and keep the child and electrics clear of that area. If it drips without the tap being used, the ceiling sags, or water reaches sockets or lights, tell us straight away and switch off that circuit if safe. The plumber has not opened the ceiling because of the unidentified lining. We've asked the landlord to decide on a specialist assessment before the repair can go ahead. No new visit is booked yet. We'll update you by Monday 16 June.

## Escalation
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Landlord / plumber / tenant | Chase decision and update | 2025-06-16 | A6 ✅ verified |
| Landlord | Hold review | 2025-06-16 | A3 ✅ verified |

## What this does not establish
- Nothing here identifies the lining or authorises extra spend or a return visit.
- No cost or timing for the assessment is known.

## Remaining work
- Landlord to answer APR-101 by 16 June.
- Plumber to reply on isolating the tap.
- Obtain an assessment quote if authorised, then return it to the landlord.
- Agency to rebook the pipe repair once the lining is cleared.

## Missing or unavailable information
- Lining material
- Assessment cost and timing
- Whether the tap can be isolated

## Conflicts between sources
- Hint suggests approval pending; the landlord's event 013 actually authorises the quoted scope only, and event 022 excludes any assessment.

## Answers to the case questions
**1. Where does this case stand and what is outstanding?**

Leak source found (compression joint above the hatch) and the repair is authorised, but it can't proceed because an unidentified lining blocks access. Outstanding: landlord decision on assessment, the plumber's answer on isolating the tap, and a cost and timing for the assessment, which nobody has yet.

**2. What is the next action, for whom, via which channel?**

Landlord Ossa Fenlow, by email (APR-101), asked to authorise us to obtain an assessment quote. Plumber Kellan Orve, by email, asked about isolating the tap without touching the ceiling. Tenant updated by email.

**3. Does anything need a human decision?**

Only the landlord's decision, which is requested. No agency escalation now. If the leak worsens or the landlord is silent past 16 June, escalate P2 to maintenance.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_landlord_decision` | {"ticket_ref":"NBL-011","decision":"conditional","evidence_quote":"Authorizes the quoted plumbing scope up to the estimate amount, provided … | 1 | ✅ verified | Ticket NBL-011 read back after record_landlord_decision |
| A2 | `request_landlord_approval` | {"landlord":"Ossa Fenlow","ticket_ref":"NBL-011","decision_needed":"Authorise sourcing a quote for a specialist assessment/sampling of the u… | 1 | ✅ verified | APR-101 found in the request_landlord_approval log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-011","reason":"Waiting for Landlord","comment":"Pipe repair paused: unidentified fibrous lining at access point. Awaiting… | 1 | ✅ verified | Ticket NBL-011 read back after put_on_hold |
| A4 | `send_message` | {"recipient_name":"Kellan Orve","recipient_role":"contractor","channel":"email","contact":"existing thread (event 023 note / event 021 email… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A5 | `send_message` | {"recipient_name":"Ossa Fenlow","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"NBL-011","bod… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A6 | `schedule_follow_up` | {"ticket_ref":"NBL-011","due_on":"2025-06-16","party":"Ossa Fenlow / Kellan Orve","purpose":"Chase landlord decision on assessment (APR-101)… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A7 | `send_message` | {"recipient_name":"Iven Rell","recipient_role":"tenant","channel":"email","contact":"existing thread (event 020 portal)","ticket_ref":"NBL-0… | 1 | ✅ verified | MSG-105 found in the send_message log |

## Failed or unverified actions
- n/a: First tenant message on channel 'portal' was rejected by validation (not sent); resent by email as A7.
