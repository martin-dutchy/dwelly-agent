# Case 020: Property inspection: ANSWER

**Decision:** action_taken · **Severity:** routine

The inspection report found a dog flap and one defect, Bedroom 1 sticker marks. The earlier landlord email wrongly said there were no issues. I corrected that with the landlord, asked them to confirm who they are, asked the tenant about the dog flap and lock change, and set a follow-up for 22 Feb.

## Where the case stands
Inspection done and report uploaded (event 018). Landlord's email (event 020) raises an unapproved dog flap and a spare key after a lock change. We have replied to the landlord and asked the tenant. Waiting on both until the 22 Feb review.

## Next actions
| # | Type | Action | Recipient | Channel | Performed |
|---|---|---|---|---|---|
| 1 | REPLY_TO_TENANT | Ask the tenant about the dog flap consent, any lock change, and to lodge a spare key by 25 Feb | Tenant | email | A2 ✅ |
| 2 | OTHER | Reply to landlord: correct earlier 'no issues' email, ask them to confirm identity, explain checks under way | Landlord | email | A1 ✅ |
| 3 | WAIT | Review replies on 22 Feb | internal | internal | A4 ✅ |

## Messages sent (verbatim)
**A1 · send_message → Landlord (name on file: Oliver Bennett) (landlord) via email, existing thread (event 020 email)** (verified)

> Thank you for your email. First, a correction: our earlier email said no issues were found. The inspection report (16 Feb) does in fact record a dog flap fitted in the utility room/back door, and sticker-type marks from adhesive strips on the Bedroom 1 wall, which the tenant is to remove and make good. Sorry for the confusion. Your email arrived under the name Felix Clarke, but our record names Oliver Bennett as landlord. Could you confirm who you are and that you act for this property? On the dog flap: our records don't show any approval, so we are asking the tenant when and why it was fitted. On the spare front door key: our records don't show a lock change, so we are asking the tenant who changed it and when, and asking for a spare key to be lodged with us. Please tell us if you want any particular outcome for the dog flap (keep, remove and make good). We will update you by 22 Feb.

**A2 · request_information → Tenant (tenant) via email, existing thread (event 006 email)** (verified)

> - Was the dog flap fitted by you, when, and did you get the landlord's written consent?
> - Has the front door lock been changed, and if so by whom and when?
> - If so, please send a spare front door key to our office by 25 February so a copy is held.
> 
> Why: Landlord has raised an unapproved dog flap and a possible lock change; our record shows neither approved.

## Escalation
_None: no decision here needs a human._

## What this does not establish
- The messages do not establish who fitted the dog flap, whether consent existed, or whether the lock was changed.
- They do not decide any remedy, charge or deposit deduction.
- The sender's identity as landlord is unconfirmed.

## Remaining work
- Await tenant's answers and landlord's identity confirmation and wishes (agency, review 22 Feb)
- Get spare key lodged
- Tenant to remove Bedroom 1 sticker marks and make good; follow up
- Escalate to a human if the dog flap becomes a consent or deduction dispute

## Missing or unavailable information
- Who changed the lock and when
- Dog flap consent history
- Whether Felix Clarke is authorised for this landlord
- Report says the inspection was on 16 Feb while the booked visit was 15 Feb

## Conflicts between sources
- Event 017 said no issues, but the report records a dog flap and one defect; I trusted the report.
- Landlord of record is Oliver Bennett; the sender is named Felix Clarke.
- Visit dates: 13/02 (original) vs 15/02 (reschedule) vs report dated 16/02; I treated the 15/02 reschedule as current.
- Event 006 says Friday 15th but 15 Feb 2024 was a Thursday.

## Answers to the case questions
**1. Where does this case stand right now, and what is outstanding?**

The inspection is complete and the report is filed. Outstanding: the landlord's identity, the dog flap consent, the lock change and spare key, and the Bedroom 1 make-good.

**2. What is the next action, who is it for, and through which channel?**

Emails are sent to the landlord (correction and identity check) and to the tenant (questions and spare key request), with a review on 22 Feb.

**3. Does anything need a human decision, and why?**

Not yet. If the dog flap or lock change turns into a dispute over consent or deposit deductions, that goes to a human.

## Actions taken (from the verified action ledger)
| # | Action | Key arguments | Attempts | Status | Evidence |
|---|---|---|---|---|---|
| A1 | `send_message` | {"recipient_name":"Landlord (name on file: Oliver Bennett)","recipient_role":"landlord","channel":"email","contact":"existing thread (event … | 1 | ✅ verified | MSG-101 found in the send_message log |
| A2 | `request_information` | {"recipient_name":"Tenant","recipient_role":"tenant","channel":"email","contact":"existing thread (event 006 email)","why":"Landlord has rai… | 1 | ✅ verified | REQ-102 found in the request_information log |
| A3 | `add_note` | {"entity":"NBL-020-inspection-findings","note":"Event 017 told landlord 'no issues' but report records dog flap and Bedroom 1 sticker marks … | 1 | ✅ verified | NOTE-103 found in the add_note log |
| A4 | `schedule_follow_up` | {"ticket_ref":"NBL-020-inspection-findings","due_on":"2024-02-22","purpose":"Review landlord identity confirmation and tenant answers on dog… | 1 | ✅ verified | FUP-104 found in the schedule_follow_up log |
| A5 | `resume_auto` | {"ticket_ref":"NBL-020-inspection-findings"} | 1 | ✅ verified | Ticket NBL-020-inspection-findings read back after resume_auto |

## Failed or unverified actions
_None._
