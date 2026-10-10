# Case 109: Oven Repair Request: ANSWER

**Decision:** action_taken · **Severity:** routine

The oven inspection took place on 22 May but did not fix the fault. On a call on 5 June Clara said a manufacturer's warranty may cover a free heating element, but she gave no firm date and the call cut off. I recorded the result, chased Harbour in writing, updated the landlord and tenant, put the job on hold and set a 7 June follow-up.

## Where the case stands
Ticket NBL-109, stage result, on hold (Waiting for Provider, review 2024-06-07). The inspection visit has happened and the oven is not fixed. Harbour Services says a manufacturer's warranty may cover a free heating element, but this is unconfirmed. No repair date is booked and no quote has been received.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | CHASE_PROVIDER | Email Harbour Services to confirm the warranty in writing, give a firm repair date, and quote if it is not covered | Clara, Harbour Services (contractor) | email | A2 ✅ |
| 2 | REPLY_TO_TENANT | Tell the tenant the status, that no visit is booked, that 21 June was an error, and when they will next hear from us | Leo Bennett, tenant | email | A4 ✅ |
| 3 | OTHER | Update the landlord, presenting the warranty as Clara's unverified claim | Felix, landlord | email | A3 ✅ |
| 4 | WAIT | Follow up with Harbour on 7 June | internal | internal | A5 ✅ |

## Messages sent (verbatim)
**A2 · send_message → Clara, Harbour Services (contractor) via email, existing thread (event 034 call / event 022 email)** (verified)

> Hi Clara, thanks for speaking with us today about the oven at Flat 2, 176 Lantern Quay. Our call cut off before we could finish, so please confirm in writing by Friday 7 June: 1) that the manufacturer's two-year warranty covers a free heating element replacement (the make and model, and the fit date on your records, would help); 2) a firm repair date and time window you can commit to, as "maybe in two weeks" is not a booking; 3) if it turns out not to be covered, a quote including VAT, which we need approved by the landlord before any work starts. Our earlier emails gave 21 June as the appointment date, which looks like an error. Please ignore it unless you confirm it. Thank you.

**A3 · send_message → Felix (landlord) via email, agency landlord record** (verified)

> Hi Felix, an update on the oven. Harbour Services inspected but could not fix it. On the phone today Clara said that a manufacturer's two-year warranty may cover a free heating element replacement. That is her claim and we have asked for it in writing. She has not given a firm date. Any chargeable work would come to you for approval first. We will chase Harbour on 7 June and update you again after that.

**A4 · send_message → Leo Bennett (tenant) via email, tenant email on file** (verified)

> Hi Leo, sorry about the wait with your oven. Harbour Services inspected but could not fix it. They now say a manufacturer's warranty may cover a free replacement part, and we are getting that confirmed. No repair visit is booked yet. Please ignore the "21 June" date in our earlier emails, as it was an error. We will confirm a date with Harbour before telling you, and we will update you by 10 June at the latest.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The warranty cover is not established; it is only Clara's verbal claim.
- No repair visit is booked; 'maybe in two weeks' is not a confirmed date.
- No spend has been approved. The landlord only asked for the installer to be contacted for a charge-free fix.
- The 'partial' work result records the inspection visit only, not a fix.

## Remaining work
- Harbour Services to confirm the warranty and a firm date in writing; if it is not covered, they send a quote for landlord approval. Agency owns the chase on 7 June.
- Once a date is confirmed, book it with set_visit and tell the tenant.
- Invoice, tenant confirmation and closure are still to come.

## Missing or unavailable information
- Written confirmation of the manufacturer's warranty, with make, model and fit date
- Firm repair date
- Provider quote if the repair is not covered

## Conflicts between sources
- The oven fit date is given as March 2025, which is later than the case dates; I treated this as a record error.
- The landlord's email names Keystone Works but the notes say Harbour Services fitted the oven; I treated Harbour as the installer.
- Visit dates are 22/05 versus 21/06; I treated 22/05 as the actual inspection and 21/06 as an error.
- Warranty status conflicts: a 12-month warranty (expired) versus a 2-year manufacturer's warranty. The latter is unverified.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection visit is done and the oven is not fixed. The warranty cover, a firm repair date and any quote are still outstanding from Harbour Services.

**2. What is the next action, who is it for, and through which channel?**

A written chase to Clara at Harbour Services by email, with updates to the landlord and tenant by email. A follow-up is set for 7 June.

**3. Does anything need a human decision, and why?**

No. This is routine provider chasing. If a quote arrives it goes to the landlord for approval.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `record_work_result` | {"ticket_ref":"109","outcome":"partial","evidence":"Provider email 23/05/2024 (event 022): engineer attended for inspection but could not fi… | 1 | ❌ failed | Ticket 109 not found on read-back |
| A2 | `send_message` | {"recipient_name":"Clara, Harbour Services","recipient_role":"contractor","channel":"email","contact":"existing thread (event 034 call / eve… | 1 | ✅ verified | MSG-101 found in the send_message log |
| A3 | `send_message` | {"recipient_name":"Felix","recipient_role":"landlord","channel":"email","contact":"agency landlord record","ticket_ref":"109","body":"Hi Fel… | 1 | ✅ verified | MSG-102 found in the send_message log |
| A4 | `send_message` | {"recipient_name":"Leo Bennett","recipient_role":"tenant","channel":"email","contact":"tenant email on file","ticket_ref":"109","body":"Hi L… | 1 | ✅ verified | MSG-103 found in the send_message log |
| A5 | `schedule_follow_up` | {"ticket_ref":"109","due_on":"2024-06-07","party":"Harbour Services","purpose":"Chase written warranty confirmation and a firm repair date; … | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A6 | `add_note` | {"entity":"109","note":"Record conflicts: oven fit date given as March 2025 (later than the 2024 case dates); landlord email names Keystone … | 1 | ✅ verified | NOTE-105 found in the add_note log |
| A7 | `record_work_result` | {"ticket_ref":"NBL-109","outcome":"partial","evidence":"Provider email 23/05/2024 (event 022): engineer attended for inspection but could no… | 1 | ✅ verified | Ticket NBL-109 read back after record_work_result |
| A8 | `put_on_hold` | {"ticket_ref":"NBL-109","reason":"Waiting for Provider","comment":"Waiting for Harbour Services to confirm warranty cover in writing and giv… | 1 | ✅ verified | Ticket NBL-109 read back after put_on_hold |

## Failed or unverified actions
- A1: record_work_result failed because I used the wrong ticket ref (109). I retried with NBL-109 and it verified as A7.
