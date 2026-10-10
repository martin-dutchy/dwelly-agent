# Case 109: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

Oven repair stalled after a failed first visit. On today's call the provider reversed her earlier no-warranty position and offered a free element replacement under manufacturer warranty, with no firm date. We asked her in writing for terms and a date, updated landlord and tenant, and held with a 7 June review.

## Where the case stands
Ticket NBL-109 at visit stage, on hold (Waiting for Provider, review 2024-06-07). Harbour Services' first visit failed to fix the oven; on today's call Clara said a manufacturer's 2-year warranty may cover a free element replacement, with a repair "maybe in two weeks" (unconfirmed, call dropped). Written warranty terms and a confirmed date are outstanding.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Email Harbour Services for written warranty terms, fitting date and a confirmed repair date by 7 June; no chargeable work without approval | Clara, Harbour Services, contractor | email | A1 ✅ |
| 2 | REPLY_TO_TENANT | Update tenant: date unconfirmed, ask if two-week wait is acceptable, next contact by 10 June | Leo Bennett, tenant | email | A3 ✅ |
| 3 | OTHER | Update landlord on warranty claim, conflicting information and that charges need his approval | Felix, landlord | email | A2 ✅ |
| 4 | WAIT | Hold and follow-up until 7 June for provider reply | internal | internal | A7 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Clara, Harbour Services (contractor) via email, existing thread (event 022 email)** (verified)

> Hi Clara, thanks for speaking with us today; our call cut out before we could agree a date. For the oven at Flat 2, 176 Lantern Quay, please reply by email by Friday 7 June with: (1) the date you fitted the oven and the manufacturer's warranty terms, including confirmation that a heating element replacement is covered free of charge (we were earlier told it was just out of warranty); (2) a firm repair date and time window that your engineer has confirmed (the "two weeks" mentioned is not a booking). Please do not do any chargeable work without our written approval; any charge must go to the landlord first. The earlier 21 June / 22 May dates on our records conflict, so please tell us which visits actually happened and when. Thank you.

**A2 · send_message → Felix (landlord) via email, agency landlord record** (verified)

> Hi Felix, an update on the oven at Flat 2, 176 Lantern Quay. We spoke to Harbour Services today. Their engineer could not fix it on the first visit. Harbour now say the manufacturer's two-year warranty may cover a free heating element replacement, which differs from what they told us earlier (just out of a 12-month warranty). We have asked them in writing for the fitting date, the warranty terms and a confirmed repair date; they suggested roughly two weeks but have not confirmed. Our records also hold conflicting fitting and visit dates, which we are clearing up. Nothing chargeable will go ahead without your approval first. We will update you by Monday 10 June.

**A3 · send_message → Leo Bennett (tenant) via email, existing thread (event 029 email)** (verified)

> Hi Leo, sorry for the confusion on dates; some of our earlier emails showed a wrong date. Update on your oven: the engineer couldn't fix it on the first visit. Harbour Services now say the manufacturer's warranty may cover a free repair, and they suggested a visit in around two weeks. That is not confirmed yet, and nobody should be expected until we confirm a date with you. We know being without an oven is hard: is around two weeks acceptable, and shall we ask for something sooner? We'll be back in touch by Monday 10 June.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- Nothing establishes that the oven is actually under warranty; this is Clara's verbal claim, contradicting her earlier statement
- No repair visit is booked; the two-week suggestion is not a confirmed date
- No spend approved or committed

## Remaining work
- Harbour Services to confirm warranty and a repair date in writing; then set_visit and tell tenant and landlord
- Record work result for earlier visit once dates are clarified
- Invoice/final checks and tenant confirmation after repair

## Missing or unavailable information
- Actual oven fitting date and warranty terms
- Which visit date really happened (22 May vs 21 June)
- Confirmed repair date

## Conflicts between sources
- Visit dates 22/05/2024 vs 21/06/2024, with 'tomorrow' wording that fits neither
- Oven fitted 'last year' vs 'March 2025' in agency emails (later than the dates of the emails)
- Warranty: 12 months (out of warranty) vs manufacturer's 2 years per call today; trusted neither until confirmed in writing
- Landlord's email mentions Keystone Works but the installer was Harbour Services

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

Provider assigned, first visit did not fix it; warranty status and repair date unconfirmed; records contain conflicting dates.

**2. What is the next action, who is it for, and through which channel?**

Written confirmation request to Clara at Harbour Services by email (done), plus updates to tenant and landlord by email; chase on 7 June.

**3. Does anything need a human decision, and why?**

No. It is routine and waiting on the provider; escalate only if no reply by the review date or a charge is proposed.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 022 email)","t… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"109","body":"Hi Fel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"existing thread (event 029 email)","ticket_ref":"109"… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A4 | `put_on_hold` | {"ticket_ref":"109","reason":"Waiting for Provider","comment":"Awaiting Harbour Services' written fitting date, warranty terms and confirmed… | 1 | ❌ failed | Ticket 109 not found on read-back |
| A5 | `add_note` | {"entity":"109","note":"Call 5 Jun: Clara said manufacturer 2-yr warranty may give free element replacement; \"maybe in two weeks\" is not a… | 1 | ✅ verified | NOTE-104 found in the add_note log |
| A6 | `schedule_follow_up` | {"ticket_ref":"109","due_on":"2024-06-07","party":"Harbour Services","purpose":"Chase written warranty terms, fitting date and confirmed rep… | 1 | ✅ verified | FUP-105 found in the schedule_follow_up log |
| A7 | `put_on_hold` | {"ticket_ref":"NBL-109","reason":"Waiting for Provider","comment":"Awaiting Harbour Services' written fitting date, warranty terms and confi… | 1 | ✅ verified | Ticket NBL-109 read back after put_on_hold |

## Failed or unverified actions
- A4: put_on_hold used wrong ref (109); retried with NBL-109 as A7, verified
