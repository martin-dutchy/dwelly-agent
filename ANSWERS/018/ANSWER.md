# Kitchen maintenance report: ANSWER

**Decision:** action_taken · **Severity:** urgent

Landlord-arranged rat proofing has stalled with no evidence, and the 8 Sept visit did not happen. I chased the landlord by SMS, updated the tenant, added a note and put the job on hold to 16 Sept.

## Where the case stands
Landlord-arranged route, on hold until 2025-09-16. Landlord silent since 18 Aug. No proofing completion evidence; the 8 Sept visit did not happen.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_LANDLORD | SMS chase for contractor name, proofing date and evidence, reply by 16 Sept | Gareth Vale, landlord | sms | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant, give hygiene/dog advice, ask which openings | Elise Rowan, tenant | email | A4 ✅ |
| 3 | WAIT | Hold until 16 Sept review | internal | internal | A3 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Gareth Vale (landlord) via sms, agency landlord record** (verified)

> Hi Mr Vale, Northbridge Lettings re 14 Mosswold Crescent rat issue. We understand you are arranging the work yourself. The tenant says pest control finished on 7 Sept but the openings have not been sealed and the proofing contractor did not attend on 8 Sept. Please reply by Tuesday 16 Sept with: 1) your contractor's name, 2) the date they will seal the openings, 3) whether you want us to arrange it instead. If we hear nothing we will call you and may escalate.

**A4 · send_message → Elise Rowan (tenant) via email, existing thread (event 010 email)** (verified)

> Hi Elise, sorry the sealing work hasn't happened. The landlord is arranging it himself and we have chased him today for the contractor's name and a date. You will hear from us by 16 Sept. Meanwhile please keep food in sealed containers and bins covered, and keep your dog away from any bait or traps. Could you tell us which openings you've seen (under the sink, the drain or the wall area)? If you see rats indoors again, let us know straight away. We'll phone you as you prefer, once we have a date.

## Escalation
_None: no decision here needs a human._

## Follow-ups
| Party | Purpose | Review date | Performed |
|---|---|---|---|
| Gareth Vale | Review landlord reply on contractor and date | 2025-09-16 | A3 ✅ verified |

## What this does not establish
- Does not confirm any proofing is booked or done
- Landlord's own-contractor route is not a formal written decision
- No agency contractor instructed

## Remaining work
- Landlord to name contractor and date (owner: landlord)
- On 16 Sept, phone landlord; if still silent escalate P2 maintenance
- Obtain pest report and completion evidence

## Missing or unavailable information
- Contractor identity and date
- Intended scope: under sink vs wall area
- Written pest report

## Conflicts between sources
- Tenant said openings under the sink (ev 010) but wall area work (ev 014)
- Hints show the landlord approval gate as open, while the call record shows the landlord-arranged route

## Answers to the case questions
**1. Where does this case stand, and what is outstanding?**

The landlord is arranging the work himself, agreed by call. No contractor name, date or completion evidence exists. The proofing visit expected on 8 Sept did not happen. The scope is unclear (sink vs wall).

**2. Next action, recipient, channel?**

SMS chase to the landlord with a reply-by date of 16 Sept. Email update to the tenant. Hold until 16 Sept.

**3. Does anything need a human decision?**

Not yet. If the landlord is still silent on 16 Sept, escalate P2 to maintenance, because the tenant is living with rats.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Gareth Vale","recipient_role":"landlord","channel":"sms","contact":"agency landlord record","ticket_ref":"NBL-018","body"… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `add_note` | {"entity":"NBL-018","note":"Route: landlord-arranged (agreed by call, events 006/007; no written decision or contractor name). Outstanding: … | 1 | ✅ verified | NOTE-102 found in the add_note log |
| A3 | `put_on_hold` | {"ticket_ref":"NBL-018","reason":"Waiting for Landlord","comment":"Awaiting landlord's contractor name, proofing date and completion evidenc… | 1 | ✅ verified | Ticket NBL-018 read back after put_on_hold |
| A4 | `send_message` | {"recipient_name":"Elise Rowan","recipient_role":"tenant","channel":"email","contact":"existing thread (event 010 email)","ticket_ref":"NBL-… | 1 | ✅ verified | MSG-103 found in the send_message log |

## Failed or unverified actions
_None._
